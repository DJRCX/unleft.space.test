"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { HoverButton } from "@/components/ui/hover-button";
import { useScroll } from "@/hooks/use-scroll";
import {
  Home,
  Layers,
  FolderOpen,
  Cpu,
  Users,
  Mail,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation config ────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Tech", href: "/tech", icon: Cpu },
  { label: "About", href: "/about", icon: Users },
  { label: "Contact", href: "/contact", icon: Mail },
];

/** Returns the nav index for the current pathname. Home is an exact match only. */
function getActiveIndex(): number | null {
  if (typeof window === "undefined") return null;
  const path = window.location.pathname;
  const idx = navLinks.findIndex((l) =>
    l.href === "/"
      ? path === "/"
      : path === l.href || path.startsWith(l.href + "/"),
  );
  return idx >= 0 ? idx : null;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function UnleftLogo() {
  return (
    <a
      href="/"
      aria-label="Unleft — home"
      className="flex items-center gap-1.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      <img 
        src="/logos/unleft_logo.png" 
        alt="" 
        className="h-6 w-auto brightness-110 contrast-125 saturate-0 invert" 
      />
      <span
        style={{ fontFamily: "'Bruno Ace SC', sans-serif" }}
        className="text-sm font-normal tracking-widest text-foreground leading-none select-none"
      >
        UNLEFT.LLC
      </span>
      <span
        className="size-1.5 rounded-full bg-primary flex-shrink-0 mb-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

// ─── Get-In-Touch CTA ─────────────────────────────────────────────────────────

function ContactCTA({ compact = false }: { compact?: boolean }) {
  return (
    <HoverButton
      onClick={() => (window.location.href = "/contact")}
      className={cn(
        "rounded-full flex-shrink-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        compact ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
      )}
    >
      Get In Touch
    </HoverButton>
  );
}

// ─── Desktop nav — ExpandableTabs ────────────────────────────────────────────

function DesktopNav({ compact = false }: { compact?: boolean }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    getActiveIndex,
  );

  // Update active tab when Astro View Transitions navigates to a new page
  React.useEffect(() => {
    const onNav = () => setActiveIndex(getActiveIndex());
    document.addEventListener("astro:page-load", onNav);
    return () => document.removeEventListener("astro:page-load", onNav);
  }, []);

  const tabs = navLinks.map((l) => ({
    title: l.label,
    icon: l.icon,
    href: l.href,
  }));

  return (
    <div className="hidden items-center gap-2 md:flex">
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-primary"
        activeIndex={activeIndex}
        className={cn(
          "border-border/50 transition-colors duration-300",
          compact
            ? "bg-transparent border-transparent shadow-none p-0.5"
            : "bg-background/60 backdrop-blur-sm",
        )}
      />
      <ContactCTA compact={compact} />
    </div>
  );
}

// ─── Header shell animation constants ─────────────────────────────────────────

/**
 * Smooth, non-bouncy spring. High damping prevents overshoot.
 * mass > 1 adds pleasant inertia without the jank.
 */
const navTransition = {
  type: "spring" as const,
  damping: 50,
  stiffness: 180,
  mass: 1.2,
} as const;

// ─── Main Header ──────────────────────────────────────────────────────────────

/**
 * Scroll behavior:
 *   At top  → centered container (not full-bleed), ~1080px, slight rounding
 *   Scrolled → narrower pill (~800px), fully rounded, floats higher with border
 */
export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  // Close mobile menu on Astro page transitions
  React.useEffect(() => {
    const onNav = () => setOpen(false);
    document.addEventListener("astro:before-preparation", onNav);
    return () =>
      document.removeEventListener("astro:before-preparation", onNav);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isPill = scrolled && !open;

  return (
    <>
      {/* Outer wrapper: fixed full-width, used as flex centering container */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        aria-label="Site header"
      >
        <motion.div
          initial={false}
          animate={isPill ? "pill" : "default"}
          variants={{
            default: {
              maxWidth: "1400px",
              marginTop: "10px",
              borderRadius: "16px",
              paddingLeft: "24px",
              paddingRight: "24px",
              backgroundColor: "rgba(10,10,15,0.0)",
              borderColor: "rgba(45,45,68,0.0)",
              boxShadow: "none",
            },
            pill: {
              maxWidth: "1200px",
              marginTop: "14px",
              borderRadius: "9999px",
              paddingLeft: "16px",
              paddingRight: "16px",
              backgroundColor: "rgba(10,10,15,0.6)",
              borderColor: "rgba(45,45,68,0.65)",
              boxShadow: "0 4px 28px rgba(0,0,0,0.30)",
            },
          }}
          transition={navTransition}
          style={{
            width: "100%",
            border: "1px solid transparent",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          className="pointer-events-auto"
        >
          <nav
            className={cn(
              "flex w-full items-center justify-between transition-[height] duration-300 ease-out",
              isPill ? "h-12" : "h-14",
            )}
          >
            <UnleftLogo />
            <DesktopNav compact={isPill} />

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              className={cn(
                "md:hidden inline-flex size-9 items-center justify-center rounded-full",
                "border border-border/50 bg-background/60 backdrop-blur-sm text-foreground",
                "hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <MenuToggleIcon open={open} className="size-4" duration={250} />
            </button>
          </nav>
        </motion.div>
      </div>

      {/* Mobile drawer — full-screen overlay, separate from morphing bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-background/97 backdrop-blur-md pt-16"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-1 px-6 pt-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3.5 rounded-md text-sm font-medium",
                      "text-muted-foreground hover:text-foreground hover:bg-muted",
                      "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    <Icon
                      size={18}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="mt-auto px-6 pb-8">
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/85 transition-colors"
              >
                <Mail size={16} aria-hidden="true" />
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
