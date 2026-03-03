"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", content: "UNLEFT OS v2.0.0" },
    { type: "system", content: 'Type "help" to see available commands.' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "user", content: cmd }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "system",
          content:
            "Available commands: about, services, contact, clear, reboot",
        });
        break;
      case "about":
        newHistory.push({
          type: "system",
          content: "UNLEFT LLC: Beyond Software. Engineering the Future.",
        });
        break;
      case "services":
        newHistory.push({
          type: "system",
          content: "Web Dev, Game Dev, Custom Software, AI Systems.",
        });
        break;
      case "contact":
        newHistory.push({
          type: "system",
          content: "Redirecting to contact page... (hello@unleft.space)",
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "reboot":
        window.location.reload();
        return;
      default:
        newHistory.push({
          type: "error",
          content: `Command not found: ${cmd}`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-[#2D2D44] bg-[#0A0A0F] overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A2E] border-b border-[#2D2D44]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-accent-glow" />
          <span className="text-xs font-mono text-text-secondary">
            unleft@terminal: ~
          </span>
        </div>
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/50"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/50"></div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto p-6 font-mono text-sm space-y-2 selection:bg-accent-primary/30"
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "user"
                ? "text-text-primary"
                : line.type === "error"
                  ? "text-red-400"
                  : "text-accent-glow"
            }
          >
            {line.type === "user" && (
              <span className="mr-2 text-text-secondary">$</span>
            )}
            {line.content}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center">
          <span className="mr-2 text-text-secondary">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-text-primary"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
