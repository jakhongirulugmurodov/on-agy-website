"use client";

import { ArrowUpRight, Check, Clock } from "lucide-react";
import Reveal from "./Reveal";

// Minimal bosqich kartasi — bosilganda batafsil oyna ochiladi
export default function StageCard({ station, index, isVisited, onSelect }) {
  const Icon = station.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <button
        type="button"
        onClick={() => onSelect(station.id)}
        aria-label={`${station.code}-bosqich: ${station.title}`}
        className="group flex h-full w-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.035]"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-3xl font-semibold text-white/[0.07] transition-colors duration-300 group-hover:text-emerald-400/30">
            {station.code}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300">
            <Icon size={18} strokeWidth={1.7} />
          </span>
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-slate-50">
          {station.title}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-slate-400">
          {station.tagline}
        </p>

        <ul className="mt-5 space-y-2">
          {station.subSteps.slice(0, 4).map((step) => (
            <li
              key={step}
              className="flex items-start gap-2.5 text-[12.5px] leading-snug text-slate-300"
            >
              <Check
                size={13}
                strokeWidth={2.5}
                className="mt-0.5 shrink-0 text-emerald-400/70"
              />
              {step}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock size={12} className="text-emerald-400/70" />
            {station.time.label}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 transition-colors duration-300 group-hover:text-emerald-300">
            {isVisited ? "Yana ko'rish" : "Batafsil"}
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </button>
    </Reveal>
  );
}
