"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { ChevronRight, MoveRight } from "lucide-react";
import { HoverButton } from "@/components/ui/hover-button";

export default function HeroContent() {
  const headlineWords = ["Engineering", "the", "Future,"];
  const accentWords = ["Beyond", "Software."];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.2 },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl"
          style={{ lineHeight: 1.1, fontFamily: "'Gupter', serif" }}
        >
          <div className="flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden pb-1">
            {headlineWords.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden pb-1">
            {accentWords.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                className="inline-block text-primary"
              >
                {w}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          We combine the creativity of a game studio with the precision of
          enterprise software engineering. Our mission is to empower businesses
          with the technology of tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <HoverButton
              onClick={() => (window.location.href = "/contact")}
              className="inline-flex items-center shadow-[0_0_20px_rgba(124,58,237,0.2)]"
            >
              Start a Project <ChevronRight className="ml-2 h-4 w-4" />
            </HoverButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <HoverButton
              onClick={() => (window.location.href = "/projects")}
              className="inline-flex items-center [--circle-start:var(--color-accent-glow)] [--circle-end:var(--color-accent-secondary)] bg-primary/10 text-white border border-ring/30 hover:bg-primary/20 shadow-[0_0_20px_var(--color-accent-primary)]"
            >
              Explore Our Work <MoveRight className="ml-2 h-4 w-4" />
            </HoverButton>
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
