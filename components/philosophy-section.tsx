"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Target, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Key = "self" | "excellence" | "future";

// Type for lucide icons (SVG React components)
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const NODES: Record<
  Key,
  {
    title: string;
    blurb: string;
    icon: IconType;
    accentFrom: string;
    accentTo: string;
    examples: { label: string; value: string }[];
  }
> = {
  self: {
    title: "Self-Sufficient Living",
    blurb:
      "Energy positive shells, closed-loop water, and micro-ecologies that give more than they take.",
    icon: Leaf,
    accentFrom: "#64B847",
    accentTo: "#9B47B8",
    examples: [
      { label: "Annual Surplus Energy", value: "18–42%" },
      { label: "Rainwater Reused", value: "60–90%" },
      { label: "Operable Days (No HVAC)", value: "120+" },
    ],
  },
  excellence: {
    title: "Universal Excellence",
    blurb:
      "Clarity in plan, generosity in section, and craft that travels across climates and cultures.",
    icon: Target,
    accentFrom: "#9B47B8",
    accentTo: "#64B847",
    examples: [
      { label: "Comfort Range Met", value: "97%" },
      { label: "Change Orders", value: "−35%" },
      { label: "Local Fabrication", value: "80%" },
    ],
  },
  future: {
    title: "Future-Proof Design",
    blurb:
      "Adaptable grids, repairable details, and systems that evolve without waste.",
    icon: Zap,
    accentFrom: "#64B847",
    accentTo: "#64B847",
    examples: [
      { label: "Modular Swap Time", value: "< 2h" },
      { label: "Lifecycle Extension", value: "+25 yrs" },
      { label: "Recyclable Mass", value: "70%" },
    ],
  },
};

export function PhilosophySection() {
  const [active, setActive] = useState<Key>("self");
  const ActiveIcon = NODES[active].icon; // ✅ get component first

  return (
    <section className="relative overflow-hidden py-28 bg-slate-50">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Our Philosophy, Made Visible
          </h2>
          <p className="mt-3 text-lg text-[#2d2d2d]/70">
            Explore the triad that shapes every decision we make.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Interactive Triad */}
          <div className="relative h-[420px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 420"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <path
                d="M150,350 L400,80 L650,350 Z"
                fill="none"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1.5"
              />
              <motion.path
                d={
                  active === "self"
                    ? "M400,80 L150,350"
                    : active === "excellence"
                    ? "M400,80 L650,350"
                    : "M150,350 L650,350"
                }
                fill="none"
                stroke="url(#grad)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9B47B8" />
                  <stop offset="100%" stopColor="#64B847" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            <TriadNode
              x="150"
              y="350"
              label="Self-Sufficient"
              active={active === "self"}
              onClick={() => setActive("self")}
              Icon={NODES.self.icon}
              from={NODES.self.accentFrom}
              to={NODES.self.accentTo}
            />
            <TriadNode
              x="400"
              y="80"
              label="Excellence"
              active={active === "excellence"}
              onClick={() => setActive("excellence")}
              Icon={NODES.excellence.icon}
              from={NODES.excellence.accentFrom}
              to={NODES.excellence.accentTo}
            />
            <TriadNode
              x="650"
              y="350"
              label="Future-Proof"
              active={active === "future"}
              onClick={() => setActive("future")}
              Icon={NODES.future.icon}
              from={NODES.future.accentFrom}
              to={NODES.future.accentTo}
            />

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-[#2d2d2d]/50">
              Click a node to explore the principle
            </div>
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]"
            >
              <div
                className="absolute -inset-px opacity-30"
                style={{
                  background:
                    "radial-gradient(600px 160px at 80% -40%, rgba(155,71,184,0.25), transparent), radial-gradient(600px 160px at -20% 120%, rgba(100,184,71,0.25), transparent)",
                }}
                aria-hidden
              />
              <div className="relative p-8">
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, ${NODES[active].accentFrom}, ${NODES[active].accentTo})`,
                    }}
                  >
                    {/* ✅ dynamic icon via local variable */}
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    {NODES[active].title}
                  </h3>
                </div>

                <p className="mt-4 text-[#2d2d2d]/75 leading-relaxed">
                  {NODES[active].blurb}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {NODES[active].examples.map((e) => (
                    <div
                      key={e.label}
                      className="rounded-xl border border-black/10 bg-white/70 p-4 text-center"
                    >
                      <div className="text-sm text-[#2d2d2d]/60">{e.label}</div>
                      <div className="mt-1 font-display text-xl">{e.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-xs text-[#2d2d2d]/50">
                  Metrics shown are indicative ranges from comparable projects.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TriadNode({
  x,
  y,
  label,
  active,
  onClick,
  Icon,
  from,
  to,
}: {
  x: string;
  y: string;
  label: string;
  active: boolean;
  onClick: () => void;
  Icon: IconType; // ✅ proper type
  from: string;
  to: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group absolute -translate-x-1/2 -translate-y-1/2 select-none focus:outline-none"
      style={{ left: `${x}px`, top: `${y}px` }}
      initial={false}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="grid h-20 w-20 place-items-center rounded-2xl shadow-lg border border-black/10"
        style={{
          background: active
            ? `linear-gradient(135deg, ${from}, ${to})`
            : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
        }}
      >
        <Icon
          className={`h-8 w-8 ${
            active
              ? "text-white"
              : "text-[#2d2d2d]/70 group-hover:text-[#2d2d2d]"
          }`}
        />
      </div>
      <div className="mt-2 text-center text-sm text-[#2d2d2d]/75">{label}</div>
    </motion.button>
  );
}
