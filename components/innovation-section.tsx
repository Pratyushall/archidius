"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Droplet, Wind, Zap } from "lucide-react";

type TabKey = "energy" | "water" | "air" | "ai";

const TABS: Record<
  TabKey,
  {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    hue: string;
  }
> = {
  energy: { label: "Energy", icon: Zap, hue: "#9B47B8" },
  water: { label: "Water", icon: Droplet, hue: "#64B847" },
  air: { label: "Air", icon: Wind, hue: "#12A1FF" },
  ai: { label: "AI", icon: Cpu, hue: "#F0B429" },
};

export function InnovationSection() {
  const [tab, setTab] = useState<TabKey>("energy");

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      {/* Subtle tech grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <header className="mb-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Innovation & Research —{" "}
            <span className="text-white/70">Sandbox</span>
          </h2>
          <p className="mt-3 text-lg text-white/70">
            Touch the systems that make ArchiDius buildings self-sufficient.
          </p>
        </header>

        {/* Tabs */}
        <nav className="mx-auto mb-10 grid grid-cols-4 max-w-2xl gap-3">
          {(Object.keys(TABS) as TabKey[]).map((k) => {
            const Icon = TABS[k].icon;
            const active = tab === k;
            return (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={[
                  "group flex items-center justify-center gap-2 rounded-2xl px-4 py-3 border transition",
                  active
                    ? "border-white/20 bg-white/10 backdrop-blur"
                    : "border-white/10 hover:border-white/20 hover:bg-white/5",
                ].join(" ")}
                aria-pressed={active}
              >
                <Icon className="h-5 w-5 text-white/90" />
                <span className="font-medium">{TABS[k].label}</span>
              </button>
            );
          })}
        </nav>

        {/* Panels */}
        <AnimatePresence mode="wait">
          {tab === "energy" && (
            <motion.div
              key="energy"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <MiniSimEnergy />
              <Metrics
                hue={TABS.energy.hue}
                items={[
                  ["Annual surplus", "18–42%"],
                  ["Peak shaving", "−35%"],
                  ["Autonomy days", "3.2"],
                ]}
                note="PV + thermal mass + demand shifting deliver net-positive energy."
              />
            </motion.div>
          )}

          {tab === "water" && (
            <motion.div
              key="water"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <MiniSimWater />
              <Metrics
                hue={TABS.water.hue}
                items={[
                  ["Reuse rate", "60–90%"],
                  ["Harvest capacity", "80k L"],
                  ["Irrigation cut", "−75%"],
                ]}
                note="Greywater + rain harvesting + native planting close the loop."
              />
            </motion.div>
          )}

          {tab === "air" && (
            <motion.div
              key="air"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <MiniSimAir />
              <Metrics
                hue={TABS.air.hue}
                items={[
                  ["Passive hours", "68%"],
                  ["ACH (natural)", "4.5"],
                  ["Cooling load", "−28%"],
                ]}
                note="Stack effect + night purge + shading cut mechanical loads."
              />
            </motion.div>
          )}

          {tab === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <MiniSimAI />
              <Metrics
                hue={TABS.ai.hue}
                items={[
                  ["Comfort score", "97%"],
                  ["Energy saved", "−22%"],
                  ["Anomaly alerts", "real-time"],
                ]}
                note="AI tunes setpoints & schedules; learns per space & season."
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lab notes */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            ["Facade daylight study", "DA(300lx) → 62%"],
            ["Roof water routing", "First-flush diverter v3"],
            ["Heat-pump schedule", "COP window 09:00–14:30"],
          ].map(([title, meta]) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur hover:bg-white/[0.1] transition"
            >
              <h4 className="font-display text-lg">{title}</h4>
              <p className="mt-2 text-sm text-white/70">{meta}</p>
              <div className="mt-4 text-xs text-white/50">
                Notebook excerpt — experiments that shape our standards.
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RIGHT-SIDE METRICS ---------- */
function Metrics({
  hue,
  items,
  note,
}: {
  hue: string;
  items: [string, string][];
  note: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur">
      <div
        aria-hidden
        className="absolute -inset-px opacity-30"
        style={{
          background: `radial-gradient(600px 160px at 80% -40%, ${hexToRgba(
            hue,
            0.25
          )}, transparent)`,
        }}
      />
      <div className="relative p-8">
        <h3 className="font-display text-2xl mb-4">Key Outcomes</h3>
        <ul className="grid grid-cols-3 gap-4">
          {items.map(([k, v]) => (
            <li
              key={k}
              className="rounded-xl border border-white/10 bg-white/[0.08] p-4 text-center"
            >
              <div className="text-sm text-white/70">{k}</div>
              <div className="mt-1 text-xl font-semibold">{v}</div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-white/60">{note}</p>
      </div>
    </div>
  );
}

/* ---------- MINI SIMS (LIGHTWEIGHT, FUN) ---------- */
function MiniSimEnergy() {
  const [hour, setHour] = useState(10); // 0..23
  const sun = useMemo(() => {
    const angle = ((hour - 6) / 12) * Math.PI; // rises ~6, peaks ~12–14
    const y = Math.max(0.1, Math.sin(angle)); // elevation
    const intensity = Math.max(0, Math.min(1, y));
    const output = Math.round(intensity * 120); // kW (illustrative)
    return { intensity, output };
  }, [hour]);

  return (
    <Panel
      title="PV + Demand Shifting"
      subtitle="Drag the sun; watch output respond."
    >
      <div className="relative h-56 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] overflow-hidden">
        {/* Horizon */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-black/30" />
        {/* Sun glow */}
        <motion.div
          className="absolute size-12 rounded-full"
          style={{
            left: `${(hour / 24) * 100}%`,
            top: `${30 + (1 - sun.intensity) * 35}%`,
          }}
          animate={{
            boxShadow: `0 0 80px 20px rgba(255,200,60,${
              0.35 + sun.intensity * 0.5
            })`,
          }}
        />
        {/* Bars = PV strings */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          {[...Array(10)].map((_, i) => {
            const h = Math.max(
              6,
              sun.intensity * 96 * Math.cos((i / 10) * Math.PI)
            );
            return (
              <div
                key={i}
                style={{ height: `${h}px` }}
                className="flex-1 rounded-md bg-gradient-to-t from-amber-400/50 to-fuchsia-400/60"
              />
            );
          })}
        </div>
      </div>

      <Slider value={hour} onChange={setHour} min={0} max={23} label="Hour" />
      <StatRow
        items={[
          ["PV Output", `${sun.output} kW`],
          ["Battery", sun.output > 85 ? "Charging" : "Idle"],
          ["Grid", sun.output < 20 ? "Import" : "Sell"],
        ]}
      />
    </Panel>
  );
}

function MiniSimWater() {
  const [rain, setRain] = useState(0.4); // 0..1
  const capture = Math.round(80000 * rain * 0.65); // L
  return (
    <Panel
      title="Rain + Greywater Loop"
      subtitle="Slide rainfall; storage & reuse update."
    >
      <div className="relative h-56 rounded-xl border border-white/10 bg-white/[0.05] overflow-hidden">
        {/* tank */}
        <div className="absolute left-6 bottom-6 w-28 h-40 rounded-xl border border-white/15 bg-black/40" />
        <motion.div
          className="absolute left-6 bottom-6 w-28 rounded-b-xl bg-cyan-400/50"
          style={{ height: `${40 + rain * 120}px` }}
        />
        {/* rain */}
        <div className="absolute inset-0">
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] bg-cyan-300/50"
              style={{
                left: `${(i / 120) * 100}%`,
                top: `${Math.random() * 20}%`,
                height: `${8 + Math.random() * 24}px`,
              }}
              animate={{ y: ["0%", "120%"], opacity: [0.9, 0] }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random(),
              }}
            />
          ))}
        </div>
      </div>

      <Slider
        value={rain}
        onChange={setRain}
        min={0}
        max={1}
        step={0.01}
        label="Rainfall"
      />
      <StatRow
        items={[
          ["Captured", `${capture.toLocaleString()} L`],
          ["Reuse", `${Math.round(capture * 0.6).toLocaleString()} L`],
          ["Irrigation", "Native only"],
        ]}
      />
    </Panel>
  );
}

function MiniSimAir() {
  const [shading, setShading] = useState(0.5); // 0..1
  const [vent, setVent] = useState(0.6); // 0..1
  const cool = Math.round((shading * 0.6 + vent * 0.4) * 28); // %
  return (
    <Panel title="Passive Cooling" subtitle="Tune shading & ventilation.">
      <div className="relative h-56 rounded-xl border border-white/10 bg-gradient-to-br from-sky-400/10 to-fuchsia-400/10 overflow-hidden">
        {/* facade */}
        <div className="absolute inset-y-6 left-6 right-6 rounded-xl border border-white/10 bg-black/30" />
        {/* louvers */}
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-8 right-8 h-[6px] bg-white/20"
            style={{ top: `${30 + i * 12}px` }}
            animate={{ opacity: 0.3 + shading * 0.6 }}
          />
        ))}
        {/* airflow */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] bg-cyan-300/70"
            style={{ left: "-10%", right: "60%", top: `${20 + (i % 6) * 12}%` }}
            animate={{ x: ["0%", "140%"], opacity: [0, 1, 0] }}
            transition={{
              duration: 2 - vent * 0.9,
              repeat: Infinity,
              delay: (i % 6) * 0.2,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Slider
          value={shading}
          onChange={setShading}
          min={0}
          max={1}
          step={0.01}
          label="Shading"
        />
        <Slider
          value={vent}
          onChange={setVent}
          min={0}
          max={1}
          step={0.01}
          label="Ventilation"
        />
      </div>
      <StatRow
        items={[
          ["Cooling load ↓", `${cool}%`],
          ["ACH", (3 + vent * 3).toFixed(1)],
          ["Glare", shading > 0.6 ? "Low" : "Med"],
        ]}
      />
    </Panel>
  );
}

function MiniSimAI() {
  const [occupancy, setOcc] = useState(0.5); // 0..1
  const [comfortBias, setBias] = useState(0.6);
  const save = Math.round((1 - comfortBias) * 28 + (1 - occupancy) * 12); // %
  return (
    <Panel
      title="AI Building Brain"
      subtitle="Balance comfort vs energy with a dial."
    >
      <div className="relative h-56 rounded-xl border border-white/10 bg-white/[0.05] overflow-hidden">
        {/* dial */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            className="h-40 w-40 rounded-full border-4 border-white/15"
            animate={{
              boxShadow: `0 0 60px rgba(240,180,41,${
                0.25 + (1 - comfortBias) * 0.4
              })`,
            }}
          />
          <motion.div
            className="absolute h-1 w-16 origin-left bg-white"
            style={{ rotate: -90 + comfortBias * 180 }}
          />
          <div className="absolute top-6 text-xs text-white/60">Energy</div>
          <div className="absolute bottom-6 text-xs text-white/60">Comfort</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Slider
          value={comfortBias}
          onChange={setBias}
          min={0}
          max={1}
          step={0.01}
          label="Comfort bias"
        />
        <Slider
          value={occupancy}
          onChange={setOcc}
          min={0}
          max={1}
          step={0.01}
          label="Occupancy"
        />
      </div>
      <StatRow
        items={[
          ["Energy saved", `${save}%`],
          ["Comfort score", `${Math.round(92 + comfortBias * 5)}%`],
          ["Mode", comfortBias > 0.55 ? "Cozy" : "Eco"],
        ]}
      />
    </Panel>
  );
}

/* ---------- UI bits ---------- */
function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-white/70">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-white/60">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-white"
      />
    </label>
  );
}

function StatRow({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {items.map(([k, v]) => (
        <div
          key={k}
          className="rounded-xl border border-white/10 bg-white/[0.08] p-3 text-center"
        >
          <div className="text-[11px] uppercase tracking-wide text-white/60">
            {k}
          </div>
          <div className="mt-1 text-lg font-semibold">{v}</div>
        </div>
      ))}
    </div>
  );
}

/* util */
function hexToRgba(hex: string, a = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${a})`;
}
