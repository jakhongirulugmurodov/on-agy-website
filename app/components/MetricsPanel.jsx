"use client";

import { motion } from "framer-motion";
import { Clock, Coins, ShieldCheck } from "lucide-react";

const BUDGET_COLORS = ["#fbbf24", "#2dd4bf", "#38bdf8"];

function HudCard({ icon: Icon, label, color, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 24 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}1f`, color }}
        >
          <Icon size={15} />
        </span>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-400">
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

export default function MetricsPanel({ station }) {
  const { time, timeline, budget, safety } = station;

  // Donut geometriyasi
  const R = 34;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const segments = budget.map((item, i) => {
    const seg = {
      ...item,
      color: BUDGET_COLORS[i % BUDGET_COLORS.length],
      dash: (item.value / 100) * C,
      offset: -acc * (C / 100),
    };
    acc += item.value;
    return seg;
  });

  // Ishonch halqasi
  const r2 = 21;
  const c2 = 2 * Math.PI * r2;

  return (
    <div className="flex flex-col gap-3">
      {/* 1 — VAQT */}
      <HudCard icon={Clock} label="VAQT" color="#38bdf8" delay={0.2}>
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold text-slate-100">{time.label}</p>
          <p className="text-[11px] text-slate-500">{time.detail}</p>
        </div>
        <div className="mt-2.5">
          <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute top-0 h-full rounded-full"
              style={{
                left: `${timeline.start}%`,
                background: "linear-gradient(90deg, #38bdf8, #2dd4bf)",
                boxShadow: "0 0 12px rgba(45,212,191,0.6)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${timeline.end - timeline.start}%` }}
              transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px] text-slate-600">
            <span>KUN 0</span>
            <span>90 KUNLIK YO&apos;LDAGI O&apos;RNI</span>
            <span>KUN 90+</span>
          </div>
        </div>
      </HudCard>

      {/* 2 — BYUDJET TAQSIMOTI */}
      <HudCard icon={Coins} label="BYUDJET TAQSIMOTI" color="#fbbf24" delay={0.3}>
        <div className="flex items-center gap-4">
          <motion.svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            className="shrink-0 -rotate-90"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 220, damping: 18 }}
          >
            <circle cx="44" cy="44" r={R} stroke="rgba(255,255,255,0.07)" strokeWidth="9" fill="none" />
            {segments.map((s) => (
              <circle
                key={s.label}
                cx="44"
                cy="44"
                r={R}
                stroke={s.color}
                strokeWidth="9"
                fill="none"
                strokeDasharray={`${s.dash} ${C - s.dash}`}
                strokeDashoffset={s.offset}
                strokeLinecap="butt"
              />
            ))}
          </motion.svg>
          <ul className="flex-1 space-y-1.5">
            {segments.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-[11px]">
                <span
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span className="flex-1 text-slate-300">{s.label}</span>
                <span className="font-mono font-bold text-slate-100">
                  {s.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </HudCard>

      {/* 3 — ISHONCH */}
      <HudCard icon={ShieldCheck} label="ISHONCH" color="#2dd4bf" delay={0.4}>
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
              <circle cx="28" cy="28" r={r2} stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
              <motion.circle
                cx="28"
                cy="28"
                r={r2}
                stroke="#2dd4bf"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={c2}
                initial={{ strokeDashoffset: c2 }}
                animate={{ strokeDashoffset: c2 * (1 - safety.percent / 100) }}
                transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 6px rgba(45,212,191,0.7))" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-teal-300">
              {safety.percent}%
            </span>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold text-teal-300">
              Nega ishonish mumkin:
            </p>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {safety.reason}
            </p>
          </div>
        </div>
      </HudCard>
    </div>
  );
}
