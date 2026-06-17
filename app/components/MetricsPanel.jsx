"use client";

import { useEffect, useState } from "react";
import { Clock, Coins, ShieldCheck } from "lucide-react";
import { RAMP } from "../lib/motion";
import { useCountUp } from "../lib/useCountUp";

// Modal AnimatePresence ichida framer enter-animatsiyalari ishonchsiz ishlaydi,
// shuning uchun ichki reveal'lar CSS transition (mount-trigger) bilan beriladi.
const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

function HudCard({ icon: Icon, label, shown, delay, children }) {
  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ${EASE_CSS} ${delay}s, transform 0.5s ${EASE_CSS} ${delay}s`,
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
          <Icon size={15} />
        </span>
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-400">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function MetricsPanel({ station }) {
  const { time, timeline, budget, safety } = station;

  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, [station.id]);

  // Donut geometriyasi
  const R = 34;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const segments = budget.map((item, i) => {
    const seg = {
      ...item,
      color: RAMP[i % RAMP.length],
      dash: (item.value / 100) * C,
      offset: -acc * (C / 100),
    };
    acc += item.value;
    return seg;
  });

  // Ishonch halqasi
  const r2 = 21;
  const c2 = 2 * Math.PI * r2;
  const safetyOffset = c2 * (1 - safety.percent / 100);
  const safetyVal = useCountUp(shown ? safety.percent : 0, 1200);

  return (
    <div className="flex flex-col gap-3">
      {/* 1 — VAQT */}
      <HudCard icon={Clock} label="VAQT" shown={shown} delay={0.05}>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-base font-semibold text-slate-100">{time.label}</p>
          <p className="text-[11px] text-slate-500">{time.detail}</p>
        </div>
        <div className="mt-3">
          <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="absolute top-0 h-full rounded-full bg-emerald-400"
              style={{
                left: `${timeline.start}%`,
                width: shown ? `${timeline.end - timeline.start}%` : "0%",
                transition: `width 0.9s ${EASE_CSS} 0.25s`,
              }}
            />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[9px] text-slate-600">
            <span>KUN 0</span>
            <span>90 KUNLIK YO&apos;LDA</span>
            <span>90+</span>
          </div>
        </div>
      </HudCard>

      {/* 2 — BYUDJET TAQSIMOTI */}
      <HudCard icon={Coins} label="BYUDJET TAQSIMOTI" shown={shown} delay={0.13}>
        <div className="flex items-center gap-4">
          <svg
            width="84"
            height="84"
            viewBox="0 0 88 88"
            className="shrink-0 -rotate-90"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "rotate(-90deg) scale(1)" : "rotate(-90deg) scale(0.75)",
              transformOrigin: "center",
              transition: `opacity 0.6s ${EASE_CSS} 0.2s, transform 0.6s ${EASE_CSS} 0.2s`,
            }}
          >
            <circle cx="44" cy="44" r={R} stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
            {segments.map((s) => (
              <circle
                key={s.label}
                cx="44"
                cy="44"
                r={R}
                stroke={s.color}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${s.dash} ${C - s.dash}`}
                strokeDashoffset={s.offset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          <ul className="flex-1 space-y-1.5">
            {segments.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-[11px]">
                <span
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span className="flex-1 text-slate-300">{s.label}</span>
                <span className="font-mono font-semibold text-slate-100">
                  {s.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </HudCard>

      {/* 3 — ISHONCH */}
      <HudCard icon={ShieldCheck} label="ISHONCH" shown={shown} delay={0.21}>
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <svg width="54" height="54" viewBox="0 0 56 56" className="-rotate-90">
              <circle cx="28" cy="28" r={r2} stroke="rgba(255,255,255,0.07)" strokeWidth="4" fill="none" />
              <circle
                cx="28"
                cy="28"
                r={r2}
                stroke="#34d399"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={c2}
                style={{
                  strokeDashoffset: shown ? safetyOffset : c2,
                  transition: `stroke-dashoffset 1s ${EASE_CSS} 0.3s`,
                }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-emerald-300">
              {Math.round(safetyVal)}%
            </span>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold text-emerald-300">
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
