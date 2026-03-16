"use client";

import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $backgroundId, type BackgroundId } from "@/store/background";

const backgrounds: { id: BackgroundId; label: string; emoji: string }[] = [
  { id: "beams", label: "Beams", emoji: "✦" },
  { id: "hexagon", label: "Hexagon", emoji: "⬡" },
  { id: "novatrix", label: "Novatrix", emoji: "◈" },
  { id: "grainient", label: "Grainient", emoji: "◉" },
  { id: "aurora", label: "Aurora", emoji: "🌌" },
  { id: "react-beams", label: "Beams 3D", emoji: "⟨⟩" },
  { id: "darkveil", label: "Dark Veil", emoji: "◫" },
];

export function BackgroundToggleUI() {
  const active = useStore($backgroundId);
  const [open, setOpen] = useState(false);

  const select = (id: BackgroundId) => {
    $backgroundId.set(id);
    setOpen(false);
  };

  const current = backgrounds.find((b) => b.id === active)!;

  return (
    <div
      className="fixed bottom-10 left-10 z-50 flex flex-col items-start gap-3"
      style={{ pointerEvents: "all" }}
    >
      {/* Options popup */}
      {open && (
        <div className="flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-black/60 p-2.5 backdrop-blur-xl">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => select(bg.id)}
              title={bg.label}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                active === bg.id
                  ? "bg-violet-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.6)]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base leading-none">{bg.emoji}</span>
              {bg.label}
            </button>
          ))}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Change background"
        aria-label="Toggle background style"
        className="flex h-11 items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4.5 text-xs font-medium text-white/70 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/50 hover:text-white hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] active:scale-95"
      >
        <span className="text-sm leading-none">{current.emoji}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
