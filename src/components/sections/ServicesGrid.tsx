"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Monitor, Gamepad2, Code2, Cpu } from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const services = [
  {
    title: "Business Websites",
    description:
      "High-performance, SEO-optimized websites built with Astro and Next.js.",
    icon: Monitor,
  },
  {
    title: "Game Development",
    description:
      "Cross-platform immersive experiences powered by Unity and C#.",
    icon: Gamepad2,
  },
  {
    title: "Custom Software",
    description:
      "Scalable backend systems and full-stack solutions tailored to your goals.",
    icon: Code2,
  },
  {
    title: "AI-Based Systems",
    description:
      "Intelligent automation and ML pipelines integrated into your products.",
    icon: Cpu,
  },
];

export default function ServicesGrid() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="h-full flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
          >
            <FeatureCard
              feature={s}
              className="h-full rounded-xl border border-[#2D2D44] bg-[#0A0A0F]/50 transition-all hover:bg-[#1A1A2E] hover:border-[#7C3AED]/30"
            />
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}

