"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Zap, Gauge, Palette, Shield } from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const differentiators = [
  {
    title: "Startup Speed",
    description:
      "We move fast. Rapid prototyping and agile execution to get you to market quicker.",
    icon: Zap,
  },
  {
    title: "Performance First",
    description:
      "Every site we build aims for >90 Lighthouse scores and sub-2s load times.",
    icon: Gauge,
  },
  {
    title: "Deep UX Focus",
    description:
      "Beautiful aesthetics combined with intuitive user journeys for maximum engagement.",
    icon: Palette,
  },
  {
    title: "Future-Proof",
    description:
      "Scalable architecture that grows with your business, from MVP to Enterprise.",
    icon: Shield,
  },
];

export default function DifferentiatorsGrid() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-6 sm:grid-cols-2">
        {differentiators.map((item, i) => (
          <motion.div
            key={item.title}
            className="h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
          >
            <FeatureCard
              feature={item}
              className="h-full rounded-xl border border-border bg-background/50 transition-all hover:bg-card"
            />
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}
