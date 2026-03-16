"use client";

import { useStore } from "@nanostores/react";
import { $globeId } from "@/store/globe";
import GlobeCanvas from "@/components/ui/wireframe-dotted-globe";
import RealisticGlobe from "@/components/ui/realistic-globe";

export function InteractiveGlobe() {
  const currentGlobe = useStore($globeId);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentGlobe === "dotted" ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* We keep the inner div with exactly the same classes as the previous GlobeWrapper.astro for the dotted globe */}
        <div className="w-full h-full [&_canvas]:bg-transparent! [&>div:last-child]:hidden">
          <GlobeCanvas width={800} height={800} className="w-full h-full" />
        </div>
      </div>
      
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          currentGlobe === "realistic" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* We constrain the realistic globe here */}
        <div className="scale-[2.5] sm:scale-[3] lg:scale-[3.2] pointer-events-none select-none">
          <RealisticGlobe />
        </div>
      </div>
    </div>
  );
}
