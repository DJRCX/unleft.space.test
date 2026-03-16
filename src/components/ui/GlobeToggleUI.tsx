"use client";

import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $globeId, type GlobeId } from "@/store/globe";

const globes: { id: GlobeId; label: string; emoji: string }[] = [
  { id: "dotted", label: "Wireframe", emoji: "🕸️" },
  { id: "realistic", label: "Realistic", emoji: "🌍" },
];

export function GlobeToggleUI() {
  const active = useStore($globeId);
  const [open, setOpen] = useState(false);

  const select = (id: GlobeId) => {
    $globeId.set(id);
    setOpen(false);
  };

  const current = globes.find((g) => g.id === active)!;

  return (
    <div
      className="fixed bottom-10 right-10 z-60 flex flex-col items-end gap-3"
      style={{ pointerEvents: "all" }}
    >
      {/* Options popup */}
      {open && (
        <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-card/60 p-2.5 backdrop-blur-xl">
          {globes.map((globe) => (
            <button
              key={globe.id}
              onClick={() => select(globe.id)}
              title={globe.label}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                active === globe.id
                  ? "bg-primary text-white shadow-[0_0_12px_var(--color-accent-primary)]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base leading-none">{globe.emoji}</span>
              {globe.label}
            </button>
          ))}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Change globe style"
        aria-label="Toggle globe style"
        className="flex h-11 items-center gap-2 rounded-full border border-border bg-background/50 px-4.5 text-xs font-medium text-foreground/70 backdrop-blur-xl transition-all duration-200 hover:border-primary/50 hover:text-foreground hover:shadow-[0_0_16px_var(--color-accent-primary)] active:scale-95"
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
