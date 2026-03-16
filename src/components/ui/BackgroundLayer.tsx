"use client";

import { useStore } from "@nanostores/react";
import { $backgroundId } from "@/store/background";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { HexagonBackground } from "@/components/ui/HexagonBackground";
import { NovatrixBackground } from "@/components/ui/NovatrixBackground";
import { GrainientBackground } from "@/components/ui/GrainientBackground";

export function BackgroundLayer() {
  const active = useStore($backgroundId);

  // We use fixed positioning here. Even though it's inside the scroll-container,
  // fixed positioning relative to the viewport is correctly clipped by the 
  // parent's clip-path: inset(0) during the Reveal scroll animation.
  const layerClass = "fixed inset-0 -z-10 w-full h-full overflow-hidden";

  switch (active) {
    case "beams":
      return <BeamsBackground className={layerClass} />;
    case "hexagon":
      return <HexagonBackground className={layerClass} />;
    case "novatrix":
      return <NovatrixBackground className={layerClass} mouseReact />;
    case "grainient":
      return <GrainientBackground className={layerClass} />;
    default:
      return <GrainientBackground className={layerClass} />;
  }
}
