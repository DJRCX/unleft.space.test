"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { ChevronRight, MoveRight } from "lucide-react";
import { HoverButton } from "@/components/ui/hover-button";

export default function HeroContent() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative z-10 flex flex-col items-start">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-5xl font-bold tracking-tight text-[#E5E7EB] md:text-6xl lg:text-7xl"
          style={{ lineHeight: 1.1 }}
        >
          Engineering the Future, <br />
          <span className="text-[#7C3AED]">Beyond Software.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-[#9CA3AF] md:text-xl"
        >
          We combine the creativity of a game studio with the precision of
          enterprise software engineering. Our mission is to empower businesses
          with the technology of tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col justify-start gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <HoverButton
              onClick={() => (window.location.href = "/contact")}
              className="inline-flex items-center shadow-[0_0_20px_rgba(124,58,237,0.4)]"
            >
              Start a Project <ChevronRight className="ml-2 h-4 w-4" />
            </HoverButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <HoverButton
              onClick={() => (window.location.href = "/projects")}
              className="inline-flex items-center shadow-[0_0_20px_rgba(124,58,237,0.4)]"
            >
              Explore Our Work <MoveRight className="ml-2 h-4 w-4" />
            </HoverButton>
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
