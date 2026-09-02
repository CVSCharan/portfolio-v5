"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HackerTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");
  const secretCode = "hacker";

  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Global key listener for the secret code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if they are typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      setTypedKeys((prev) => {
        const next = prev + key;
        if (next.includes(secretCode)) {
          setIsOpen(true);
          return "";
        }
        // keep only the last N characters to avoid memory leak
        return next.slice(-secretCode.length);
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Boot sequence effect
  useEffect(() => {
    if (!isOpen) return;

    const sequence = [
      "INITIATING SYSTEM OVERRIDE...",
      "BYPASSING SECURITY PROTOCOLS...",
      "ACCESSING MAINFRAME...",
      "...",
      "SUCCESS.",
      "WELCOME TO THE ANTIGRAVITY TERMINAL.",
      "USER: CVS CHARAN",
      "STATUS: ONLINE",
      "DB_CONNECTION: SECURE",
      "TYPE 'exit' TO CLOSE CONNECTION.",
      "> _"
    ];

    let currentLine = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines([]);

    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setLines((prev) => [...prev, sequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Scroll to bottom when new lines appear
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Terminal input handling (just to close it)
  useEffect(() => {
    if (!isOpen) return;

    const handleTerminalInput = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleTerminalInput);
    return () => window.removeEventListener("keydown", handleTerminalInput);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black text-[#00ff00] font-mono p-4 md:p-8 overflow-hidden pointer-events-auto flex flex-col"
          style={{ textShadow: "0 0 5px #00ff00" }}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-10" />
          
          <div className="relative z-20 flex-1 overflow-y-auto" ref={containerRef}>
            {lines.map((line, i) => (
              <div key={i} className="mb-2">
                {line}
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-[#00ff00] hover:text-white border border-[#00ff00] px-4 py-1 text-sm uppercase transition-colors z-30"
          >
            Disconnect
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
