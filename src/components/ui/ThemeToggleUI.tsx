"use client";

import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $themeId, type ThemeId } from "@/store/theme";

const themes: { id: ThemeId; label: string; emoji: string }[] = [
  { id: "default", label: "Midnight", emoji: "🌌" },
  { id: "silver", label: "Silver", emoji: "⚙️" },
  { id: "platinum", label: "Platinum", emoji: "💎" },
];

export function ThemeToggleUI() {
  const active = useStore($themeId);
  const [open, setOpen] = useState(false);

  const select = (id: ThemeId) => {
    $themeId.set(id);
    setOpen(false);
  };

  const current = themes.find((t) => t.id === active)!;

  return (
    <div
      className="fixed top-24 right-10 z-60 flex flex-col items-end gap-3"
      style={{ pointerEvents: "all" }}
    >
      {/* Options popup */}
      {open && (
        <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-card/60 p-2.5 backdrop-blur-xl">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => select(theme.id)}
              title={theme.label}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                active === theme.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_var(--color-primary)]"
                  : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              <span className="text-base leading-none">{theme.emoji}</span>
              {theme.label}
            </button>
          ))}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Change theme"
        aria-label="Toggle theme"
        className="flex h-11 items-center gap-2 rounded-full border border-border bg-background/50 px-4.5 text-xs font-medium text-foreground/70 backdrop-blur-xl transition-all duration-200 hover:border-primary/50 hover:text-foreground hover:shadow-[0_0_16px_var(--color-primary)] active:scale-95"
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
