"use client";

import React, { useId } from "react";
import type { CSSProperties } from "react";

// Type definitions
interface ResponsiveImage {
  src: string;
  alt?: string;
  srcSet?: string;
}

interface AnimationConfig {
  preview?: boolean;
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface ShadowOverlayProps {
  type?: "preset" | "custom";
  presetIndex?: number;
  customImage?: ResponsiveImage;
  sizing?: "fill" | "stretch";
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
): number {
  if (fromLow === fromHigh) {
    return toLow;
  }
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  const cleanId = id.replace(/:/g, "");
  const instanceId = `shadowoverlay-${cleanId}`;
  return instanceId;
};

// --- PERFORMANCE TOGGLE ---
const SHOW_SHADOW = true; // Set to false to disable globally in code
// --------------------------

export function EtheralShadow({
  sizing = "fill",
  color = "rgba(124, 58, 237, 0.5)", // Increased from 0.15 to 0.5 for more visibility
  animation = { scale: 100, speed: 90 },
  noise = { opacity: 1, scale: 1.2 },
  style,
  className,
  children,
  zIndex = -1,
  position = "fixed",
}: ShadowOverlayProps & { zIndex?: number; position?: "fixed" | "absolute" }) {
  const id = useInstanceId();
  const [isEnabled, setIsEnabled] = React.useState(SHOW_SHADOW);

  // Allow overriding via URL for quick benchmarking: ?shadow=false or ?shadow=off
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shadowParam = params.get("shadow");
    if (shadowParam === "false" || shadowParam === "off") {
      setIsEnabled(false);
    }
  }, []);

  if (!isEnabled) return null;

  const animationEnabled = animation && animation.scale > 0;

  const displacementScale = animation
    ? mapRange(animation.scale, 1, 100, 20, 100)
    : 0;

  // Calculate duration string for CSS/SVG animation (e.g., "4s")
  const animationDurationStr = animation
    ? `${mapRange(animation.speed, 1, 100, 40, 2)}s`
    : "10s";

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        position: position, // Respect prop but default is fixed
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: zIndex, // Behind everything
        pointerEvents: "none", // Don't block interaction
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -displacementScale,
          filter: animationEnabled ? `url(#${id}) blur(4px)` : "none",
          willChange: animationEnabled ? "filter, transform" : "auto",
          transform: "translateZ(0)", // Force GPU composite layer
        }}
      >
        {animationEnabled && (
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id={id}>
                {/* Reduced numOctaves from 2 to 1 for performance */}
                <feTurbulence
                  result="undulation"
                  numOctaves="1"
                  baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  in="undulation"
                  type="hueRotate"
                  values="180"
                >
                  <animate
                    attributeName="values"
                    from="0"
                    to="360"
                    dur={animationDurationStr}
                    repeatCount="indefinite"
                  />
                </feColorMatrix>
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={displacementScale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Removed the central h1 tag to act as a proper background */}

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: noise.scale * 200,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
          }}
        />
      )}
      {children}
    </div>
  );
}
