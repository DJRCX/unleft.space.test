"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Monitor, Gamepad2, Code2, Cpu } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const services = [
  {
    title: "Business Websites",
    description:
      "High-performance, SEO-optimized websites built with Astro and Next.js.",
    Icon: Monitor,
    glowColor: "blue" as const,
  },
  {
    title: "Game Development",
    description:
      "Cross-platform immersive experiences powered by Unity and C#.",
    Icon: Gamepad2,
    glowColor: "purple" as const,
  },
  {
    title: "Custom Software",
    description:
      "Scalable backend systems and full-stack solutions tailored to your goals.",
    Icon: Code2,
    glowColor: "green" as const,
  },
  {
    title: "AI-Based Systems",
    description:
      "Intelligent automation and ML pipelines integrated into your products.",
    Icon: Cpu,
    glowColor: "orange" as const,
  },
];

export default function ServicesGrid() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
          >
            <GlowCard
              glowColor={s.glowColor}
              customSize
              className="h-full flex flex-col gap-4 !aspect-auto"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#2D2D44] bg-[#0A0A0F]">
                <s.Icon className="h-6 w-6 text-foreground/75" />
              </div>
              <h3 className="font-heading font-bold text-[#E5E7EB]">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#9CA3AF]">
                {s.description}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}
