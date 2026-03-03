"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Monitor, Gamepad2, Code2, Cpu } from "lucide-react";

const services = [
  {
    title: "Business Websites",
    description:
      "High-performance, SEO-optimized websites built with Astro and Next.js.",
    Icon: Monitor,
    color: "text-blue-400",
    glow: "group-hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]",
  },
  {
    title: "Game Development",
    description:
      "Cross-platform immersive experiences powered by Unity and C#.",
    Icon: Gamepad2,
    color: "text-purple-400",
    glow: "group-hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]",
  },
  {
    title: "Custom Software",
    description:
      "Scalable backend systems and full-stack solutions tailored to your goals.",
    Icon: Code2,
    color: "text-emerald-400",
    glow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]",
  },
  {
    title: "AI-Based Systems",
    description:
      "Intelligent automation and ML pipelines integrated into your products.",
    Icon: Cpu,
    color: "text-orange-400",
    glow: "group-hover:shadow-[0_0_20px_rgba(251,146,60,0.15)]",
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
            whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
            className={`group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-[#2D2D44] bg-[#1A1A2E]/50 p-6 backdrop-blur-sm transition-[border-color,box-shadow] hover:border-[#C084FC]/20 ${s.glow}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#2D2D44] bg-[#0A0A0F] transition-colors group-hover:border-[#C084FC]/20">
              <s.Icon className={`h-6 w-6 ${s.color}`} />
            </div>
            <h3 className="font-heading font-bold text-[#E5E7EB]">{s.title}</h3>
            <p className="text-sm leading-relaxed text-[#9CA3AF]">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}
