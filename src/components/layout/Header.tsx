"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Rocket } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/tech", label: "Tech" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#2D2D44] bg-[#0A0A0F]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="/"
          className="group flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-[#E5E7EB]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#9333EA] shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all group-hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]">
            <Rocket className="h-4 w-4 text-white" />
          </div>
          <span>UNLEFT</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-[#9CA3AF] transition-colors hover:text-[#E5E7EB]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[#2D2D44] bg-[#0A0A0F]/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-[#9CA3AF] transition-colors hover:bg-[#1A1A2E] hover:text-[#E5E7EB]"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="/contact"
                className="block rounded-md bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-3 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Start a Project
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
