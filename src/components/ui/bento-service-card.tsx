"use client";

import React from "react";
import { Github, Globe, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  isRevealed: boolean;
  onHover: () => void;
  className?: string;
  image?: string;
  links?: {
    github?: string;
    website?: string;
  };
}

export default function BentoServiceCard({
  title,
  subtitle,
  description,
  features,
  icon,
  color,
  isRevealed,
  onHover,
  className,
  image,
  links,
}: BentoServiceCardProps) {
  const p = genDeterministicPattern(title);

  return (
    <motion.div
      onMouseEnter={onHover}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border-border bg-background/70 transition-all duration-500",
        "border-[0.5px] hover:z-10",
        isRevealed ? "bg-[#0D0D14]" : "hover:bg-[#0D0D14]",
        className
      )}
      layout
    >
      {/* Background Image with Overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
            style={{ backgroundColor: `${color}10` }}
          />
        </div>
      )}

      {/* Deterministic Grid Pattern (from Grid Feature Cards) */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-foreground/1 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full fill-foreground/5 stroke-foreground/25 mix-blend-overlay"
          />
        </div>
      </div>

      {/* Glow at top */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-32 w-32 rounded-full blur-[60px] opacity-10 transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        {/* Top Section: Icon and Title */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-border transition-all duration-500 group-hover:scale-110 group-hover:border-[var(--primary)]/40"
              style={{ backgroundColor: `${color}15`, color }}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground font-light">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Revealed Content */}
        <div className="mt-6 flex flex-col justify-end overflow-hidden">
          <AnimatePresence initial={false}>
            {isRevealed && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: 10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-4"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div className="h-1 w-1 rounded-full" style={{ backgroundColor: color }} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                  </div>

                  {/* Links Section */}
                  {links && (links.github || links.website) && (
                    <div className="mt-4 flex gap-4">
                      {links.github && (
                        <a
                          href={links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {links.website && (
                        <a
                          href={links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="h-4 w-4" />
                          <span>Website</span>
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// grid pattern components & logic helpers (copied from flip-card.tsx for local usage)
function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

function getSeedFromString(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function genDeterministicPattern(seedStr: string, length = 5): number[][] {
  const seed = getSeedFromString(seedStr);
  return Array.from({ length }, (_, i) => [
    ((seed + i * 7) % 4) + 7, // deterministic x between 7 and 10
    ((seed + i * 11) % 6) + 1, // deterministic y between 1 and 6
  ]);
}
