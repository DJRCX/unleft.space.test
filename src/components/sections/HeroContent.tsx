"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { ChevronRight, MoveRight } from "lucide-react";

export default function HeroContent() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-[#C084FC]/20 bg-[#7C3AED]/10 px-4 py-1.5 text-sm font-medium text-[#C084FC]"
        >
          <span className="mr-2">🚀</span>
          Engineering the Future. Beyond Software.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-6xl font-bold tracking-tight text-[#E5E7EB] md:text-7xl lg:text-8xl"
          style={{ lineHeight: 1.05 }}
        >
          UN<span className="text-[#7C3AED]">LEFT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 max-w-2xl mx-auto text-lg leading-relaxed text-[#9CA3AF] md:text-xl"
        >
          We build scalable digital systems, high-performance websites, and
          cross-platform games. Innovation meets performance in every line of
          code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-8 py-4 text-base font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
          >
            Start a Project <ChevronRight className="ml-2 h-4 w-4" />
          </motion.a>

          <motion.a
            href="/projects"
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 rounded-lg border border-[#2D2D44] bg-[#1A1A2E]/50 px-8 py-4 text-base font-medium text-[#E5E7EB] backdrop-blur-sm transition-all hover:border-[#C084FC]/30 hover:bg-[#1A1A2E]/80"
          >
            Explore Our Work <MoveRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-[#2D2D44] p-1"
        >
          <div className="h-2 w-0.5 rounded-full bg-[#9CA3AF]" />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
