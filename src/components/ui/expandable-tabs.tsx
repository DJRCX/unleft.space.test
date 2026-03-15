"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  href?: never;
  onClick?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
  /** Index of the currently active page — keeps that tab's label always visible */
  activeIndex?: number | null;
}

const buttonVariants = {
  initial: { gap: 0, paddingLeft: ".5rem", paddingRight: ".5rem" },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition: Transition = {
  delay: 0.1,
  type: "spring",
  bounce: 0,
  duration: 0.6,
};

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
  activeIndex,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(
    activeIndex ?? null,
  );
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  // Keep selected in sync when activeIndex changes (e.g. on navigation)
  React.useEffect(() => {
    setSelected(activeIndex ?? null);
  }, [activeIndex]);

  // On outside click, collapse back to the active page tab (not null)
  useOnClickOutside(outsideClickRef as React.RefObject<HTMLElement>, () => {
    const fallback = activeIndex ?? null;
    setSelected(fallback);
    // CRITICAL FIX: Only update visual selection, do NOT trigger onChange here.
    // Triggering onChange with programmatic navigation caused "click anywhere reloads page" bug.
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
    tabs[index]?.onClick?.();
  };

  const SeparatorEl = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <SeparatorEl key={`separator-${index}`} />;
        }

        const Icon = tab.icon;

        // Use motion.a if href is provided to allow native SPA routing interception (like Astro ViewTransitions)
        const isLink = !!tab.href;

        // Note: motion.a and motion.button have slightly different intrinstic types,
        // using Any type cast to mollify strict DOM generic constraints when switching dynamically.
        const MotionComponent = (isLink ? motion.a : motion.button) as any;
        const tagProps = isLink ? { href: tab.href } : {};

        const isActive = selected === index;
        return (
          <MotionComponent
            {...tagProps}
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isActive}
            onClick={() => handleSelect(index)}
            transition={transition}
            aria-label={tab.title}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              isActive
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon size={20} aria-hidden="true" />
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden font-heading font-normal"
                  aria-hidden="true"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </MotionComponent>
        );
      })}
    </div>
  );
}
