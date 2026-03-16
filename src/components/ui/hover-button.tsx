"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  href?: string
  target?: string
  rel?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

const HoverButton = React.forwardRef<HTMLElement, HoverButtonProps>(
  ({ className, children, href, target, rel, disabled, type = "button", ...props }, ref) => {
    const internalRef = React.useRef<HTMLElement>(null)
    const activeRef = (ref as React.MutableRefObject<HTMLElement>) || internalRef
    
    const [isListening, setIsListening] = React.useState(false)
    const [circles, setCircles] = React.useState<Array<{
      id: number
      x: number
      y: number
      color: string
      fadeState: "in" | "out" | null
    }>>([])
    const lastAddedRef = React.useRef(0)

    const createCircle = React.useCallback((x: number, y: number) => {
      const buttonWidth = activeRef.current?.offsetWidth || 0
      const xPos = x / buttonWidth
      const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${
        xPos * 100
      }%)`

      setCircles((prev) => [
        ...prev,
        { id: Date.now(), x, y, color, fadeState: null },
      ])
    }, [activeRef])

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLElement>) => {
        if (!isListening || disabled) return
        
        const currentTime = Date.now()
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime
          const rect = event.currentTarget.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          createCircle(x, y)
        }
      },
      [isListening, createCircle, disabled]
    )

    const handlePointerEnter = React.useCallback(() => {
      if (!disabled) setIsListening(true)
    }, [disabled])

    const handlePointerLeave = React.useCallback(() => {
      setIsListening(false)
    }, [])

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "in" } : c
              )
            )
          }, 0)

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "out" } : c
              )
            )
          }, 1000)

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id))
          }, 2200)
        }
      })
    }, [circles])

    const sharedClasses = cn(
      "relative isolate px-8 py-3 rounded-3xl group",
      "text-foreground font-medium text-base leading-6",
      "backdrop-blur-lg bg-card/10",
      "cursor-pointer overflow-hidden",
      "flex items-center justify-center gap-2 transition-all duration-300",
      "before:content-[''] before:absolute before:inset-0",
      "before:rounded-[inherit] before:pointer-events-none",
      "before:z-[1]",
      "before:shadow-[inset_0_0_0_1px_var(--color-border-subtle),inset_0_0_16px_0_var(--color-accent-glow)/10,inset_0_-3px_12px_0_var(--color-accent-glow)/15,0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]",
      "before:mix-blend-multiply before:transition-transform before:duration-300",
      "active:scale-[0.98] active:before:scale-[0.975]",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      className
    )

    const sharedStyle = {
      "--circle-start": "var(--color-accent-glow)",
      "--circle-end": "var(--color-accent-primary)",
      ...(props.style as React.CSSProperties),
    } as React.CSSProperties

    const content = (
      <>
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              "absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
              "blur-lg pointer-events-none z-[-1] transition-opacity duration-300",
              fadeState === "in" && "opacity-75",
              fadeState === "out" && "opacity-0 duration-[1.2s]",
              !fadeState && "opacity-0"
            )}
            style={{
              left: x,
              top: y,
              background: color,
            }}
          />
        ))}
        {children}
      </>
    )

    if (href) {
      return (
        <a
          ref={activeRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={sharedClasses}
          style={sharedStyle}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          {...(props as any)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={activeRef as React.RefObject<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={sharedClasses}
        style={sharedStyle}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...(props as any)}
      >
        {content}
      </button>
    )
  }
)

HoverButton.displayName = "HoverButton"

export { HoverButton }
