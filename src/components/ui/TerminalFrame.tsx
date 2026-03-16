"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TerminalFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function TerminalFrame({
  children,
  title = "unleft@os: ~/projects",
  className,
}: TerminalFrameProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-border/60 shadow-2xl",
        "bg-background",
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111118] border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
          <div className="h-3 w-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
        </div>
        <span className="text-xs font-mono text-muted-foreground/70 tracking-wide">
          {title}
        </span>
        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <div className="relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
