"use client";

import React, { useState } from "react";
import { Code2, Gamepad2, Database } from "lucide-react";
import BentoServiceCard from "@/components/ui/bento-service-card";

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
  "System Design": <Code2 className="h-6 w-6" />,
  "Game": <Gamepad2 className="h-6 w-6" />,
  "SaaS": <Database className="h-6 w-6" />,
};

export default function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const handleHover = (id: string) => {
    if (!revealedIds.has(id)) {
      setRevealedIds((prev) => new Set(prev).add(id));
    }
  };

  const revealAll = () => {
    const allIds = new Set(projects.map((p) => p.title));
    setRevealedIds(allIds);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -space-x-px -space-y-px border-[#2D2D44]/30">
        {projects.map((project) => (
          <BentoServiceCard
            key={project.title}
            title={project.title}
            subtitle={`${project.category} · ${project.status}`}
            description={project.description}
            features={project.extendedTech}
            icon={categoryIconMap[project.category] || <Code2 className="h-6 w-6" />}
            color={project.color}
            isRevealed={revealedIds.has(project.title)}
            onHover={() => handleHover(project.title)}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
}
