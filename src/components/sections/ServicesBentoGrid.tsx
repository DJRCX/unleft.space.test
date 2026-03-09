"use client";

import React, { useState } from "react";
import { Monitor, Gamepad2, Code2, Cpu, Smartphone } from "lucide-react";
import BentoServiceCard from "@/components/ui/bento-service-card";

interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
}

const iconMap: Record<string, React.ReactNode> = {
  "Business Websites": <Monitor className="h-6 w-6" />,
  "Game Development": <Gamepad2 className="h-6 w-6" />,
  "Custom Software": <Code2 className="h-6 w-6" />,
  "AI-Based Systems": <Cpu className="h-6 w-6" />,
  "Mobile Applications": <Smartphone className="h-6 w-6" />,
};

export default function ServicesBentoGrid({ services }: { services: ServiceItem[] }) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const handleHover = (id: string) => {
    if (!revealedIds.has(id)) {
      setRevealedIds((prev) => new Set(prev).add(id));
    }
  };

  const revealAll = () => {
    const allIds = new Set(services.map((s) => s.title));
    setRevealedIds(allIds);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* The Bento Grid: cards are attached via a negative margin/border-collapse feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 -space-x-px -space-y-px">
        {/* Row 1: 3 cards (2 columns each) */}
        {services.slice(0, 3).map((service) => (
          <BentoServiceCard
            key={service.title}
            {...service}
            icon={iconMap[service.title] || <Code2 className="h-6 w-6" />}
            isRevealed={revealedIds.has(service.title)}
            onHover={() => handleHover(service.title)}
            className="lg:col-span-2"
          />
        ))}

        {/* Row 2: 2 cards (3 columns each for a balanced bento look) */}
        {services.slice(3, 5).map((service) => (
          <BentoServiceCard
            key={service.title}
            {...service}
            icon={iconMap[service.title] || <Code2 className="h-6 w-6" />}
            isRevealed={revealedIds.has(service.title)}
            onHover={() => handleHover(service.title)}
            className="lg:col-span-3"
          />
        ))}
      </div>
    </div>
  );
}
