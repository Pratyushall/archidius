"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <img
        src="/images/arhero.png"
        alt="ArchiDius architectural atmosphere"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_52%,rgba(0,0,0,0.62)_100%)]" />

      <div
        aria-label="Architecture gives time a place to live."
        className={[
          "absolute inset-0 z-10 font-sans font-black uppercase leading-[0.86] text-white",
          "transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        ].join(" ")}
      >
        <span className="group pointer-events-auto absolute left-[6vw] top-[18vh] block cursor-crosshair select-none text-[11vw] opacity-90 mix-blend-screen transition duration-300 hover:-translate-y-2 hover:rotate-[-2deg] hover:scale-105 hover:text-[#facc15] hover:drop-shadow-[0_0_22px_rgba(250,204,21,0.45)] md:text-[7vw] lg:text-[5.8vw]">
          Architecture
        </span>
        <span className="group pointer-events-auto absolute left-[10vw] top-[38vh] block cursor-crosshair select-none text-[15vw] opacity-95 mix-blend-screen transition duration-300 hover:-translate-y-3 hover:rotate-[3deg] hover:scale-110 hover:text-[#fff2bf] hover:drop-shadow-[0_0_26px_rgba(255,242,191,0.38)] md:text-[8vw] lg:text-[6.7vw]">
          gives
        </span>
        <span className="group pointer-events-auto absolute right-[8vw] top-[33vh] block cursor-crosshair select-none text-[14vw] opacity-85 mix-blend-screen transition duration-300 hover:translate-y-2 hover:rotate-[-4deg] hover:scale-110 hover:text-[#d8ecff] hover:drop-shadow-[0_0_26px_rgba(216,236,255,0.35)] md:text-[7.5vw] lg:text-[6vw]">
          time
        </span>
        <span className="group pointer-events-auto absolute left-[34vw] top-[57vh] block cursor-crosshair select-none text-[12vw] opacity-95 mix-blend-screen transition duration-300 hover:-translate-x-2 hover:rotate-[2deg] hover:scale-105 hover:text-[#facc15] hover:drop-shadow-[0_0_22px_rgba(250,204,21,0.38)] md:text-[7vw] lg:text-[5.8vw]">
          a place
        </span>
        <span className="group pointer-events-auto absolute bottom-[9vh] left-[7vw] block cursor-crosshair select-none text-[14vw] opacity-90 mix-blend-screen transition duration-300 hover:-translate-y-2 hover:rotate-[-2deg] hover:scale-105 hover:text-white hover:drop-shadow-[0_0_24px_rgba(255,255,255,0.38)] md:text-[8vw] lg:text-[6.5vw]">
          to live.
        </span>
      </div>

      <div className="absolute bottom-8 right-6 z-20 md:right-10">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="rounded-full border-white/30 bg-black/20 px-5 py-4 text-white backdrop-blur-md hover:bg-white hover:text-black"
        >
          <Link href="#featured-projects">Explore our work</Link>
        </Button>
      </div>
    </section>
  );
}
