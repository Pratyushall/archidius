"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f5f1e8] via-[#faf8f5] to-[#f4e4e0]">
      {/* TRUE black & white checks */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect x='0' y='0' width='40' height='40' fill='%23000'/%3E%3Crect x='40' y='0' width='40' height='40' fill='%23fff'/%3E%3Crect x='0' y='40' width='40' height='40' fill='%23fff'/%3E%3Crect x='40' y='40' width='40' height='40' fill='%23000'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Hero image frame */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-6 md:p-14">
        <div className="relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-8 border-white/50">
          <img
            src="/images/arc1.png"
            alt="ArchiDius — self-sufficient architectural project"
            className="w-full h-full object-cover"
          />

          {/* Legibility gradients: stronger on bottom/right */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/35 via-transparent to-transparent" />

          {/* TEXT — pinned to upper-right inside the image */}
          <div
            className={[
              "absolute top-4 right-4 md:top-8 md:right-8 max-w-[75%] md:max-w-[52%] text-right z-10",
              "transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            <h1 className="font-display text-[32px] leading-tight sm:text-[56px] md:leading-[1.05] font-semibold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">
              Crafting Tomorrow&apos;s
              <br />
              <span className="text-[#0f0f0f]">World Today</span>
            </h1>

            {/* subtle accent underline using your colors */}
            <span className="mt-2 inline-block h-[3px] w-28 rounded-full bg-gradient-to-r from-[#9B47B8] to-[#64B847] md:w-36" />

            <p className="mt-2 md:mt-4 text-sm sm:text-base text-[#171717]/85 leading-relaxed font-normal">
              We design self-sufficient, sustainable spaces that don’t just
              exist in the future—they create it.
            </p>
          </div>

          {/* CTA — pinned to lower-right inside the image */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border border-black/20 text-[#111] hover:bg-[#111] hover:text-white bg-white/85 backdrop-blur-[1px] rounded-full px-5 py-4"
            >
              <Link href="#featured-projects">Explore our work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
