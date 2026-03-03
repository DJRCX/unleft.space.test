"use client";

import React, { useEffect, useState } from "react";

const CONSENT_KEY = "unleft_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no consent choice recorded yet
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = (type: "all" | "essential") => {
    localStorage.setItem(CONSENT_KEY, type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-[#2D2D44] bg-[#0A0A0F]/95 backdrop-blur-md px-6 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            We use <span className="text-[#C084FC]">essential cookies</span> for
            site functionality and optional analytics cookies to improve our
            service.{" "}
            <a
              href="/legal/cookies"
              className="underline hover:text-[#E5E7EB] transition-colors"
            >
              Learn more
            </a>
            .
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            onClick={() => accept("essential")}
            className="rounded-lg border border-[#2D2D44] px-4 py-2 text-sm font-medium text-[#9CA3AF] transition-all hover:bg-[#1A1A2E] hover:text-[#E5E7EB]"
          >
            Essential Only
          </button>
          <button
            onClick={() => accept("all")}
            className="rounded-lg bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
