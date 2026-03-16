"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe, ArrowRight, Database, Code2, Gamepad2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import TerminalFrame from "@/components/ui/TerminalFrame";

interface ProjectItem {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tech: string[];
  extendedTech: string[];
  status: string;
  color: string;
  image?: string;
  links?: {
    github?: string;
    website?: string;
  };
}

const categoryIconMap: Record<string, React.ReactNode> = {
  "System Design": <Code2 className="h-4 w-4" />,
  "Game": <Gamepad2 className="h-4 w-4" />,
  "SaaS": <Database className="h-4 w-4" />,
};

function statusColor(status: string) {
  if (status === "Live") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (status === "In Development") return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  return "bg-blue-500/20 text-blue-400 border-blue-500/30";
}

function GlowVisual({
  image,
  title,
  color,
  terminalTitle,
}: {
  image?: string;
  title: string;
  color: string;
  terminalTitle: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Ambient glow behind the frame */}
      <div
        className="absolute -inset-4 rounded-2xl blur-3xl opacity-20 transition-opacity duration-700 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />

      {/* Spotlight Card Border Effect */}
      <div
        ref={cardRef}
        data-glow
        style={
          {
            "--base": 210,
            "--spread": 250,
            "--radius": "12",
            "--border": "1",
            "--backdrop": "hsl(0 0% 6% / 0.7)",
            "--backup-border": "rgba(45,45,68,0.6)",
            "--size": "300",
            "--outer": "1",
            "--border-size": "calc(var(--border, 1) * 1px)",
            "--spotlight-size": "calc(var(--size, 150) * 1px)",
            "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
            backgroundImage: `radial-gradient(
              var(--spotlight-size) var(--spotlight-size) at
              calc(var(--x, 0) * 1px)
              calc(var(--y, 0) * 1px),
              hsl(var(--hue, 210) 100% 70% / 0.06), transparent
            )`,
            backgroundAttachment: "fixed",
            border: "1px solid rgba(45,45,68,0.6)",
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
          } as React.CSSProperties & Record<string, any>
        }
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            [data-glow]::before, [data-glow]::after {
              pointer-events: none; content: ""; position: absolute;
              inset: calc(var(--border-size) * -1);
              border: var(--border-size) solid transparent;
              border-radius: calc((var(--radius) * 1px) + var(--border-size));
              background-attachment: fixed;
              background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
              background-repeat: no-repeat; background-position: 50% 50%;
              mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
              mask-clip: padding-box, border-box; mask-composite: intersect;
            }
            [data-glow]::before {
              background-image: radial-gradient(calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) 100% 50% / 1), transparent 100%);
              filter: brightness(2);
            }
            [data-glow]::after {
              background-image: radial-gradient(calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(0 100% 100% / 1), transparent 100%);
            }
          `
        }} />

        <TerminalFrame title={terminalTitle}>
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full object-cover aspect-video select-none"
              draggable={false}
            />
          ) : (
            <div
              className="w-full aspect-video flex items-center justify-center"
              style={{ backgroundColor: `${color}10` }}
            >
              <span className="text-4xl font-mono font-bold opacity-20">{title}</span>
            </div>
          )}
        </TerminalFrame>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const isOdd = index % 2 !== 0;
  const terminalTitle = `unleft@os: ~/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="group relative w-full"
    >
      {/* Connector line for each project */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-10 hidden lg:block"
        style={{ background: `linear-gradient(to bottom, transparent, ${project.color}, transparent)` }}
      />

      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
          isOdd && "lg:[direction:rtl] *:lg:[direction:ltr]"
        )}
      >
        {/* Visual Column */}
        <GlowVisual
          image={project.image}
          title={project.title}
          color={project.color}
          terminalTitle={terminalTitle}
        />

        {/* Info Column */}
        <div className="flex flex-col gap-6">
          {/* Status & Category Chips */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                statusColor(project.status)
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {project.status}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-card/80 text-muted-foreground border border-border/60">
              {categoryIconMap[project.category] ?? <Code2 className="h-4 w-4" />}
              {project.category}
            </span>
          </div>

          {/* Title */}
          <div>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-none mb-3"
            >
              <span style={{ color: project.color }}>{project.title}</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-md text-xs font-mono text-muted-foreground border border-border/60 bg-background/60"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Feature List */}
          <div className="grid grid-cols-2 gap-2">
            {project.extendedTech.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          {project.links && (
            <div className="flex items-center gap-4 pt-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
                >
                  <Github className="h-4 w-4" />
                  <span>View Source</span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                </a>
              )}
              {project.links.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 group/btn"
                  style={{
                    borderColor: `${project.color}40`,
                    backgroundColor: `${project.color}10`,
                    color: project.color,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${project.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${project.color}10`;
                  }}
                >
                  <Globe className="h-4 w-4" />
                  Live Site
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectShowcase({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="relative">
      {/* Subtle vertical track */}
      <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 hidden lg:block w-px bg-gradient-to-b from-transparent via-[#2D2D44]/30 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-28 lg:gap-36">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
