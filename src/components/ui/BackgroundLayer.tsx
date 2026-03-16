"use client";

import { useStore } from "@nanostores/react";
import { $backgroundId } from "@/store/background";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { HexagonBackground } from "@/components/ui/HexagonBackground";
import { NovatrixBackground } from "@/components/ui/NovatrixBackground";
import { GrainientBackground } from "@/components/ui/GrainientBackground";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ReactBeamsBackground } from "@/components/ui/ReactBeamsBackground";
import { DarkVeilBackground } from "@/components/ui/DarkVeilBackground";

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
    case "aurora":
      return <AuroraBackground className={layerClass} />;
    case "react-beams":
      return <ReactBeamsBackground className={layerClass} />;
    case "darkveil":
      return <DarkVeilBackground className={layerClass} />;
    default:
      return <GrainientBackground className={layerClass} />;
  }
}

