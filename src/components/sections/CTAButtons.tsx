"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HoverButton } from "@/components/ui/hover-button";

export default function CTAButtons() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <HoverButton
            onClick={() => (window.location.href = "/contact")}
            className="h-14 px-10 text-lg font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)]"
          >
            Start a Project
          </HoverButton>
        </motion.div>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.03 }}
          className="group flex items-center gap-2 text-[#E5E7EB] transition-colors hover:text-[#C084FC]"
        >
          Contact Us
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </MotionConfig>
  );
}
