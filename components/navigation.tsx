"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const LINKS = [
  { href: "/about", label: "About", hint: "Vision, team, ethos" },
  { href: "/work", label: "Work", hint: "Selected case studies" },
  { href: "/philosophy", label: "Philosophy", hint: "Principles & process" },
  { href: "/innovation", label: "Innovation", hint: "Systems & R&D" },
  { href: "/blog", label: "Blog", hint: "Notes from the studio" },
  { href: "/contact", label: "Contact", hint: "Start a conversation" },
];

export type NavigationProps = {
  /** Provide a full custom node for the center logo (e.g. <YourLogo />). */
  centerLogoNode?: React.ReactNode;
  /** Or provide an image src and we’ll render it nicely (public/ path like `/images/logo.svg`). */
  centerLogoSrc?: string;
  centerLogoAlt?: string;
};

export function Navigation({
  centerLogoNode,
  centerLogoSrc,
  centerLogoAlt = "ArchiDius Logo",
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Scroll style
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock + ESC to close + restore focus to trigger
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      buttonRef.current?.focus();
    };
  }, [isOpen]);

  // Close when clicking outside panel
  useEffect(() => {
    if (!isOpen) return;
    function onClick(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    window.addEventListener("mousedown", onClick, true);
    return () => window.removeEventListener("mousedown", onClick, true);
  }, [isOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        data-scrolled={isScrolled}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          // Elegant glass header (transparent but readable)
          "bg-white/20 backdrop-blur-md backdrop-saturate-150 border-b border-white/10",
          "data-[scrolled=true]:bg-white/55 data-[scrolled=true]:backdrop-blur-xl",
          "data-[scrolled=true]:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)]"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-7xl px-6 lg:px-12",
            "grid grid-cols-3 items-center",
            "h-20 data-[scrolled=true]:h-16"
          )}
          data-scrolled={isScrolled}
        >
          {/* Left: wordmark + tiny subtitle */}
          <Link
            href="/"
            className="justify-self-start group inline-flex flex-col leading-tight"
            aria-label="ArchiDius — Home"
          >
            <span className="font-display text-2xl md:text-3xl tracking-tight text-[#2d2d2d]/90">
              ArchiDius
              <span className="ml-1 inline-block w-[1px] h-[1em] align-[-0.15em] bg-[#2d2d2d]/60 animate-pulse" />
            </span>
            <span className="mt-0.5 text-[10px] md:text-[11px] tracking-wide text-[#2d2d2d]/60">
              The Valor of Space
            </span>
          </Link>

          {/* Center: logo (node > src > fallback tile) */}
          <Link
            href="/"
            aria-label="ArchiDius Home"
            className={cn(
              "justify-self-center relative grid place-items-center",
              "h-12 w-12 rounded-2xl",
              !centerLogoNode &&
                !centerLogoSrc &&
                "bg-gradient-to-br from-[#c97456] to-[#a85a3f] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_24px_-12px_rgba(0,0,0,0.35)]",
              "transition-transform duration-300 will-change-transform",
              "hover:scale-[1.02] hover:rotate-[3deg]"
            )}
          >
            {centerLogoNode ? (
              <span className="grid place-items-center">{centerLogoNode}</span>
            ) : centerLogoSrc ? (
              <span className="relative h-12 w-12">
                <Image
                  src={centerLogoSrc} // ✅ uses your prop now
                  alt={centerLogoAlt}
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </span>
            ) : (
              <span className="text-white font-display text-xl">A</span>
            )}
          </Link>

          {/* Right: hamburger */}
          <div className="justify-self-end">
            <button
              ref={buttonRef}
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls="site-menu"
              onClick={() => setIsOpen((s) => !s)}
              className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-white/70 border border-black/10 backdrop-blur-sm shadow-sm hover:bg-white/80 transition"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-[#2d2d2d]" aria-hidden />
              ) : (
                <Menu className="h-5 w-5 text-[#2d2d2d]" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer under fixed header */}
      <div className={cn("h-20", isScrolled && "md:h-16")} />

      {/* Overlay + Panel */}
      <div
        className={cn(
          "fixed inset-0 z-50",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Dim overlay */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            "bg-black/20 backdrop-blur-[2px]",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Slide-out panel (right) */}
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          ref={panelRef}
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-sm",
            "bg-[#faf8f5]/95 backdrop-blur-xl border-l border-black/10",
            "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]",
            "transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full",
            "flex flex-col"
          )}
        >
          {/* Header inside panel */}
          <div className="flex items-center justify-between p-5 border-b border-black/10">
            <span className="font-display text-xl text-[#2d2d2d]">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="h-10 w-10 grid place-items-center rounded-lg bg-white/70 border border-black/10 hover:bg-white/80 transition"
            >
              <X className="h-5 w-5 text-[#2d2d2d]" aria-hidden />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto p-5">
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group block rounded-xl p-4 border border-black/5 bg-white/60 hover:bg-white/80",
                      "transition-colors"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#2d2d2d]">
                        {l.label}
                      </span>
                      <span className="text-sm text-[#2d2d2d]/50 group-hover:text-[#c97456] transition-colors">
                        →
                      </span>
                    </div>
                    {l.hint && (
                      <p className="mt-1 text-sm text-[#2d2d2d]/60">{l.hint}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="p-5 border-t border-black/10">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-[#c97456] to-[#a85a3f] hover:from-[#a85a3f] hover:to-[#8b4a35] text-white rounded-xl py-6"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
