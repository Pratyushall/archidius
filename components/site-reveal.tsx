"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SiteReveal
 * Stages:
 * 0 → Image + yellow dot (click)
 * 1 → Ambient embers
 * 2 → White dust burst + pulses
 * 3 → Typewriter title/subtitle
 * 4 → Reveal children (sessionStorage skip next visits)
 */
export default function SiteReveal({
  children,
  /** Optional background video for the reveal overlay */
  videoSrc = "/videos/herov.mp4",
  /** Optional poster image for the video */
  videoPoster,
  /** Add a subtle dim over the video [0..1] */
  videoDim = 0.55,
}: {
  children: React.ReactNode;
  videoSrc?: string;
  videoPoster?: string;
  videoDim?: number;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  /** ---------- Controls (updated for your timing) ---------- */
  const HERO_SRC = "/images/nodot.png"; // change as you like
  const IMAGE_WIDTH_MOBILE = 200;
  const DOT_IMAGE_GAP_PX = 12; // tiny gap between image and dot
  const DOT_STACK_SHIFT_Y = 28; // nudge the pair slightly downward

  // Dust feel
  const PARTICLE_COUNT = 900; // heavy dust
  const MAX_DISTANCE = 620; // how far dust travels
  const PARTICLE_TRAVEL_MIN = 3.2; // seconds
  const PARTICLE_TRAVEL_MAX = 5.0; // seconds

  // Stage delays
  const STAGE2_DELAY = 0; // burst immediately on click
  const STAGE3_DELAY = 150; // start type almost right away

  // Typewriter (≈5s total across both lines)
  const lines = ["ArchiDius", "The Valor of Space"];
  const TYPEWRITER_TOTAL_MS = 5000;
  const GAP_BETWEEN_LINES_MS = 200;

  /** ---------- Pre-generate particle params ---------- */
  const particles = useMemo(() => {
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + rand(-0.08, 0.08);
      const distance = rand(MAX_DISTANCE * 0.55, MAX_DISTANCE);
      const delay = rand(0, 0.28);
      const size = rand(1, 2.2);
      const blur = Math.random() < 0.35 ? rand(0.5, 2.8) : 0;
      const opacityPeak = rand(0.4, 0.9);
      const rotate = rand(-55, 55);
      const duration = rand(PARTICLE_TRAVEL_MIN, PARTICLE_TRAVEL_MAX);
      return {
        angle,
        distance,
        delay,
        size,
        blur,
        opacityPeak,
        rotate,
        duration,
      };
    });
  }, []);

  /** ---------- Skip animation if already revealed ---------- */
  useEffect(() => {
    const hasRevealed =
      typeof window !== "undefined" && sessionStorage.getItem("siteRevealed");
    if (hasRevealed) {
      setIsRevealed(true);
      setAnimationStage(4);
    }
  }, []);

  /** ---------- Click → start sequence ---------- */
  const handleReveal = () => {
    setAnimationStage(1); // embers
    setTimeout(() => setAnimationStage(2), STAGE2_DELAY); // burst immediately
    setTimeout(() => setAnimationStage(3), STAGE3_DELAY); // typewriter
    // Stage 4 is triggered when Typewriter finishes (onDone)
  };

  if (isRevealed && animationStage === 4) return <>{children}</>;

  return (
    <>
      <AnimatePresence>
        {animationStage < 4 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950 overflow-hidden"
          >
            {/* Background video */}
            <div className="absolute inset-0 -z-10">
              <video
                key={videoSrc}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={videoPoster}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              {/* Dim layer over video */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: `rgba(0,0,0,${Math.min(
                    Math.max(videoDim, 0),
                    0.92
                  )})`,
                }}
              />
            </div>

            {/* Stage 1: ambient micro-embers */}
            {animationStage >= 1 && (
              <div className="absolute inset-0">
                {Array.from({ length: 70 }).map((_, i) => {
                  const x = (Math.random() - 0.5) * 240;
                  const y = (Math.random() - 0.5) * 240;
                  const delay = Math.random() * 2.2;
                  const size = Math.random() * 1.6 + 0.5;
                  const opacity = Math.random() * 0.6 + 0.1;
                  return (
                    <motion.span
                      key={`ember-${i}`}
                      className="absolute rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: size,
                        height: size,
                        background:
                          "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,255,255,0) 80%)",
                        filter: "blur(0.7px)",
                      }}
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{
                        x: [0, x, x * 0.6, 0],
                        y: [0, y, y * 0.6, 0],
                        opacity: [0, opacity, opacity * 0.6, 0],
                        scale: [0.85, 1, 1, 0.85],
                      }}
                      transition={{
                        duration: 3.8 + Math.random() * 2.2,
                        delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Stage 2: dust burst + pulses */}
            {animationStage >= 2 && (
              <>
                {/* brief brand-yellow core flash */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(250,204,21,0.42) 0%, rgba(250,204,21,0.18) 35%, rgba(250,204,21,0) 70%)",
                    filter: "blur(18px)",
                  }}
                  initial={{ width: 12, height: 12, opacity: 0 }}
                  animate={{
                    width: ["12px", "60vmax"],
                    height: ["12px", "60vmax"],
                    opacity: [0, 0.55, 0],
                  }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* soft white pulse glow */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0) 70%)",
                    filter: "blur(22px)",
                  }}
                  initial={{ width: 10, height: 10, opacity: 0 }}
                  animate={{
                    width: ["10px", "145vmax"],
                    height: ["10px", "145vmax"],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* crisp ring outline */}
                <motion.div
                  className="absolute rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,0.22)" }}
                  initial={{ width: 10, height: 10, opacity: 0 }}
                  animate={{
                    width: ["10px", "185vmax"],
                    height: ["10px", "185vmax"],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* white dust particles */}
                {particles.map((p, i) => {
                  const x = Math.cos(p.angle) * p.distance;
                  const y = Math.sin(p.angle) * p.distance;
                  return (
                    <motion.span
                      key={`p-${i}`}
                      className="absolute rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: p.size,
                        height: p.size,
                        background:
                          Math.random() < 0.35
                            ? "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0.12) 90%, rgba(255,255,255,0) 100%)"
                            : "rgba(255,255,255,0.9)",
                        filter: p.blur
                          ? `blur(${p.blur}px) drop-shadow(0 0 2px rgba(255,255,255,0.35))`
                          : "drop-shadow(0 0 1px rgba(255,255,255,0.22))",
                        willChange: "transform, opacity",
                      }}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0.55 }}
                      animate={{
                        x,
                        y,
                        opacity: [0, p.opacityPeak, p.opacityPeak * 0.35, 0],
                        scale: [0.55, 1, 0.9, 0.65],
                        rotate: [0, p.rotate],
                      }}
                      transition={{
                        duration: p.duration,
                        delay: p.delay,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}
              </>
            )}

            {/* Stage 3: typewriter */}
            {animationStage >= 3 && (
              <motion.div
                className="absolute z-10 text-center"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Typewriter
                  lines={lines}
                  totalDurationMs={TYPEWRITER_TOTAL_MS}
                  lineGapMs={GAP_BETWEEN_LINES_MS}
                  classNameTitle="text-5xl md:text-7xl font-semibold text-white tracking-tight"
                  classNameSubtitle="text-lg md:text-2xl text-white/70 mt-3 font-light tracking-wide"
                  onDone={() => {
                    setAnimationStage(4);
                    setIsRevealed(true);
                    sessionStorage.setItem("siteRevealed", "true");
                  }}
                />
              </motion.div>
            )}

            {/* Stage 0: image + dot (tiny gap) + cursor directly under dot */}
            {animationStage === 0 && (
              <div
                className="relative z-20 flex flex-col items-center"
                style={{ transform: `translateY(${DOT_STACK_SHIFT_Y}px)` }}
              >
                {/* Top image */}
                <motion.img
                  src={HERO_SRC}
                  alt=""
                  aria-hidden
                  loading="eager"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: IMAGE_WIDTH_MOBILE }}
                  className="md:w-[280px] pointer-events-none select-none"
                />

                {/* tiny gap */}
                <div style={{ height: DOT_IMAGE_GAP_PX }} />

                {/* wrapper so we can place the cursor relative to the dot */}
                <div className="relative">
                  {/* Yellow dot button */}
                  <motion.button
                    onClick={handleReveal}
                    className="relative w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_34px_rgba(250,204,21,0.5)] cursor-pointer hover:scale-[2] active:scale-75 transition-all duration-300 border border-yellow-300/60"
                    animate={{
                      boxShadow: [
                        "0 0 34px rgba(250,204,21,0.5), 0 0 68px rgba(250,204,21,0.28)",
                        "0 0 54px rgba(250,204,21,0.6), 0 0 110px rgba(250,204,21,0.34)",
                        "0 0 34px rgba(250,204,21,0.5), 0 0 68px rgba(250,204,21,0.28)",
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    aria-label="Reveal ArchiDius"
                  >
                    <span className="sr-only">Reveal ArchiDius</span>
                  </motion.button>

                  {/* Elegant, small cursor: centered directly BELOW the dot with a small gap */}
                  <CursorHintBelow gapPx={8} />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={
          animationStage === 4
            ? { scale: 1, opacity: 1 }
            : { scale: 0.92, opacity: 0 }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}

/* -------------------- Cursor (below the dot) -------------------- */
/** Centers an elegant SVG cursor directly under the dot with a tiny gap. */
function CursorHintBelow({ gapPx = 8 }: { gapPx?: number }) {
  return (
    <motion.div
      className="absolute left-1/2"
      style={{ top: `calc(100% + ${gapPx}px)`, transform: "translateX(-50%)" }}
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{
        opacity: [0, 1, 0.9, 1],
        y: [6, 0, 1, 0],
        scale: [0.98, 1, 0.995, 1],
      }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      {/* Minimal, crisp pointer with subtle glow */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[0_0_4px_rgba(255,255,255,0.35)]"
      >
        <path
          d="M4 3 L17 14 L12.4 14 L14.6 20.5 L12.7 21.2 L10.4 14.9 L7.2 17.6 Z"
          fill="transparent"
          stroke="white"
          strokeOpacity="0.9"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/* -------------------- Typewriter (5s total) -------------------- */
function Typewriter({
  lines,
  totalDurationMs = 5000,
  lineGapMs = 200,
  classNameTitle,
  classNameSubtitle,
  onDone,
}: {
  lines: string[];
  totalDurationMs?: number;
  lineGapMs?: number;
  classNameTitle?: string;
  classNameSubtitle?: string;
  onDone?: () => void;
}) {
  const [display, setDisplay] = useState<string[]>(["", ""]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;

    // compute per-character speed to fit ≈ totalDurationMs
    const totalChars = lines.join("").length;
    const charBudget = Math.max(totalDurationMs - lineGapMs, 800);
    const speedMs = Math.max(
      Math.floor(charBudget / Math.max(totalChars, 1)),
      24
    );

    const runTyping = async () => {
      await typeLine(lines[0], 0, speedMs);
      await wait(lineGapMs);
      await typeLine(lines[1], 1, speedMs);
      if (mounted) {
        setDone(true);
        onDone?.();
      }
    };

    const typeLine = (text: string, idx: number, spd: number) =>
      new Promise<void>((resolve) => {
        let i = 0;
        const id = setInterval(() => {
          if (!mounted) {
            clearInterval(id);
            return;
          }
          i++;
          setDisplay((prev) => {
            const next = [...prev];
            next[idx] = text.slice(0, i);
            return next;
          });
          if (i >= text.length) {
            clearInterval(id);
            resolve();
          }
        }, spd);
      });

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    runTyping();
    return () => {
      mounted = false;
    };
  }, [lines, totalDurationMs, lineGapMs, onDone]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <span className={classNameTitle}>{display[0]}</span>
        <BlinkingCursor visible={!done || display[1].length === 0} size="lg" />
      </div>
      <div className="flex items-center">
        <span className={classNameSubtitle}>{display[1]}</span>
        <BlinkingCursor visible={!done} size="sm" />
      </div>
    </div>
  );
}

function BlinkingCursor({
  visible,
  size = "sm",
}: {
  visible: boolean;
  size?: "sm" | "lg";
}) {
  if (!visible) return null;
  const height = size === "lg" ? "h-[1.4em]" : "h-[1.1em]";
  const width = "w-[1.5px]"; // thinner, elegant
  return (
    <motion.span
      className={`ml-1 inline-block ${width} ${height} bg-white/90 rounded-sm`}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
