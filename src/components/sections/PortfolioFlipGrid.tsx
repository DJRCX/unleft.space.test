"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Code2, Gamepad2, Database } from "lucide-react";
import CardFlip from "@/components/ui/flip-card";

interface ProjectItem {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tech: string[];
  extendedTech: string[];
  status: string;
  color: string;
}

const categoryIconMap: Record<string, React.ReactNode> = {
  "System Design": <Code2 className="h-7 w-7" />,
  "Game": <Gamepad2 className="h-7 w-7" />,
  "SaaS": <Database className="h-7 w-7" />,
};

const categoryIconMapSm: Record<string, React.ReactNode> = {
  "System Design": <Code2 className="h-4 w-4" />,
  "Game": <Gamepad2 className="h-4 w-4" />,
  "SaaS": <Database className="h-4 w-4" />,
};

export default function PortfolioFlipGrid({ projects }: { projects: ProjectItem[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="w-full max-w-[360px]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
          >
            <CardFlip
              title={project.title}
              subtitle={`${project.category} · ${project.status}`}
              description={project.description}
              features={project.extendedTech}
              color={project.color}
              icon={categoryIconMap[project.category]}
              backIcon={categoryIconMapSm[project.category]}
              ctaLabel="View Case Study"
              ctaHref="/contact"
            />
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}
