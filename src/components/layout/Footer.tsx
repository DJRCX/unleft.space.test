"use client";
import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Company",
    links: [
      { title: "Services", href: "/services" },
      { title: "Projects", href: "/projects" },
      { title: "Tech", href: "/tech" },
      { title: "About", href: "/about" },
      { title: "Pricing", href: "/pricing" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Legal",
    links: [
      { title: "Privacy Policy", href: "/legal/privacy" },
      { title: "Terms & Conditions", href: "/legal/terms" },
      { title: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
  {
    label: "Social",
    links: [
      { title: "GitHub", href: "https://github.com/Unleft", icon: Github },
      {
        title: "LinkedIn",
        href: "https://linkedin.com/company/Unleft",
        icon: Linkedin,
      },
      { title: "Email", href: "mailto:hello@Unleft.space", icon: Mail },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-border/40 overflow-hidden pb-0 bg-background z-20">
      {/* Top glow line */}
      <div className="bg-primary/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md" />

      {/* Footer content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-16 grid w-full gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedContainer className="space-y-6">
          <a
            href="/"
            className="group flex flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm w-fit"
            aria-label="Unleft — home"
          >
            <div className="flex items-center gap-3">
              <img
                src="/logos/unleft_logo.png"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="h-6 w-auto brightness-110 contrast-125 saturate-0 invert"
              />
              <span
                style={{ fontFamily: "'Bruno Ace SC', sans-serif" }}
                className="text-lg font-normal tracking-widest text-[#E5E7EB] leading-none select-none transition-colors group-hover:text-primary"
              >
                UNLEFT.LLC
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              Beyond Software.
            </p>
          </a>

          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Engineering the Future. Bangladesh-based, globally ambitious
            software solutions.
          </p>

          <p className="text-muted-foreground/60 text-xs">
            © {year} Unleft. All rights reserved. <br /> Dhaka, Bangladesh.
          </p>
        </AnimatedContainer>

        {footerLinks.map((section, index) => (
          <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
            <div className="mb-0">
              <h3 className="text-sm tracking-[0.2em] uppercase font-heading font-normal text-foreground/90">
                {section.label}
              </h3>
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      aria-label={link.title}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="hover:text-primary inline-flex items-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
                    >
                      {link.icon && <link.icon className="me-2 size-4" />}
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContainer>
        ))}
      </div>

    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
