"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  globeScale?: number
}

/** Yield control back to the browser for one frame */
const yieldToMain = () => new Promise<void>((r) => setTimeout(r, 0))

export default function RotatingEarth({
  width = 800,
  height = 800,
  className = "",
  globeScale = 1.0,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = width
    const containerHeight = height
    const radius = (Math.min(containerWidth, containerHeight) / 2) * globeScale

    // Cap pixel ratio to avoid over-rendering on hi-DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    // ─── Helpers ────────────────────────────────────────────────────────────────

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const { geometry } = feature
      if (geometry.type === "Polygon") {
        const [outer, ...holes] = geometry.coordinates
        if (!pointInPolygon(point, outer)) return false
        return !holes.some((hole: number[][]) => pointInPolygon(point, hole))
      }
      if (geometry.type === "MultiPolygon") {
        return geometry.coordinates.some((poly: number[][][]) => {
          const [outer, ...holes] = poly
          if (!pointInPolygon(point, outer)) return false
          return !holes.some((hole: number[][]) => pointInPolygon(point, hole))
        })
      }
      return false
    }

    // ─── Render ─────────────────────────────────────────────────────────────────

    interface DotData {
      lng: number
      lat: number
    }

    const allDots: DotData[] = []
    let landFeatures: any = null

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const sf = currentScale / radius

      // Globe circle
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.strokeStyle = "rgba(255,255,255,0.15)"
      context.lineWidth = 1 * sf
      context.stroke()

      if (!landFeatures) return

      // Graticule
      const graticule = d3.geoGraticule()
      context.beginPath()
      path(graticule())
      context.strokeStyle = "#ffffff"
      context.lineWidth = 1 * sf
      context.globalAlpha = 0.25
      context.stroke()
      context.globalAlpha = 1

      // Land outlines
      context.beginPath()
      landFeatures.features.forEach((f: any) => path(f))
      context.strokeStyle = "#ffffff"
      context.lineWidth = 1 * sf
      context.stroke()

      // Dots
      const r = 1.2 * sf
      context.fillStyle = "#999999"
      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat])
        if (
          projected &&
          projected[0] >= 0 &&
          projected[0] <= containerWidth &&
          projected[1] >= 0 &&
          projected[1] <= containerHeight
        ) {
          context.beginPath()
          context.arc(projected[0], projected[1], r, 0, 2 * Math.PI)
          context.fill()
        }
      })
    }

    // ─── Async chunked dot generation ───────────────────────────────────────────
    // Processes one land feature at a time, yielding between each to avoid
    // blocking the main thread (fixes the "lag spike" on load).

    const DOT_SPACING = 16
    const STEP = DOT_SPACING * 0.08

    const generateDotsForFeature = (feature: any): [number, number][] => {
      const dots: [number, number][] = []
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
      for (let lng = minLng; lng <= maxLng; lng += STEP) {
        for (let lat = minLat; lat <= maxLat; lat += STEP) {
          const p: [number, number] = [lng, lat]
          if (pointInFeature(p, feature)) dots.push(p)
        }
      }
      return dots
    }

    async function buildDots(features: any[]) {
      for (const feature of features) {
        const dots = generateDotsForFeature(feature)
        dots.forEach(([lng, lat]) => allDots.push({ lng, lat }))
        // Yield after each feature so the browser can repaint/handle events
        await yieldToMain()
      }
    }

    // ─── Rotation ───────────────────────────────────────────────────────────────

    const rotation: [number, number] = [0, 0]
    let autoRotate = true
    let scrollVelocity = 0
    const scrollDecay = 0.90
    const scrollSensitivity = 0.02
    let lastScrollY = window.scrollY

    const rotate = () => {
      if (!isVisibleRef.current) return
      if (Math.abs(scrollVelocity) > 0.01) {
        rotation[0] += scrollVelocity
        scrollVelocity *= scrollDecay
        projection.rotate(rotation as [number, number])
        render()
      } else if (autoRotate) {
        rotation[0] += 0.1
        projection.rotate(rotation as [number, number])
        render()
      }
    }

    const rotationTimer = d3.timer(rotate)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY
      scrollVelocity += delta * scrollSensitivity
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      scrollVelocity = 0
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        rotation[0] = startRotation[0] + dx * 0.5
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - dy * 0.5))
        projection.rotate(rotation as [number, number])
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => { autoRotate = true }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    canvas.addEventListener("mousedown", handleMouseDown)

    // ─── IntersectionObserver — pause timer when off-screen ─────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    // ─── Load world data ────────────────────────────────────────────────────────

    let aborted = false

      ; (async () => {
        try {
          const res = await fetch(
            "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
          )
          if (!res.ok || aborted) return
          landFeatures = await res.json()
          if (aborted) return
          // Build dots asynchronously, yielding between features
          await buildDots(landFeatures.features)
        } catch {
          // Silently degrade — globe still renders in wireframe mode
        }
      })()

    return () => {
      aborted = true
      rotationTimer.stop()
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
      canvas.removeEventListener("mousedown", handleMouseDown)
    }
  }, [width, height, globeScale])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full aspect-square h-auto ${className}`}
      style={{ maxWidth: "100%", height: "auto", aspectRatio: "1/1", background: "transparent" }}
    />
  )
}
