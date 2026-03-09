"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Monitor, Gamepad2, Code2, Cpu, Smartphone } from "lucide-react";
import CardFlip from "@/components/ui/flip-card";

interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "Business Websites": Monitor,
  "Game Development": Gamepad2,
  "Custom Software": Code2,
  "AI-Based Systems": Cpu,
  "Mobile Applications": Smartphone,
};

export default function ServicesFlipGrid({ services }: { services: ServiceItem[] }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* Single unified flip card grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {services.map((service, i) => {
          const Icon = iconMap[service.title] ?? Monitor;
          return (
            <motion.div
              key={service.title}
              className="w-full max-w-[340px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CardFlip
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                features={service.features}
                color={service.color}
                icon={<Icon className="h-7 w-7" />}
                backIcon={<Icon className="h-4 w-4" />}
                ctaLabel="Get Started"
                ctaHref="/contact"
              />
            </motion.div>
          );
        })}
      </div>
    </MotionConfig>
  );
}
