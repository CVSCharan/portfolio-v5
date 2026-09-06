"use client";

import { Link2, Check } from "lucide-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa6";
import { useState } from "react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  // We construct the full URL on the client to avoid SSR mismatch
  const fullUrl = typeof window !== "undefined" ? window.location.href : url;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy link");
    }
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    }
  ];

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCopy}
        className="p-2.5 rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
      
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
