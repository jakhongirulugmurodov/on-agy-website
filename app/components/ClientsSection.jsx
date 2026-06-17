"use client";

import { CLIENTS } from "./stations";
import Reveal from "./Reveal";

export default function ClientsSection() {
  // Uzluksiz lenta uchun ro'yxat ikki marta takrorlanadi
  const row = [...CLIENTS, ...CLIENTS];

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-4">
      <Reveal className="text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] text-slate-500">
          BIZGA ISHONGANLAR
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-slate-100 sm:text-2xl">
          Ishlagan mijozlarimiz
        </h2>
      </Reveal>

      <Reveal
        delay={0.1}
        className="marquee group relative mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center gap-4">
          {row.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex min-w-44 flex-col items-center gap-0.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 opacity-55 transition-all duration-500 hover:border-emerald-400/25 hover:bg-emerald-400/[0.04] hover:opacity-100"
            >
              <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-slate-100">
                {c.name}
              </span>
              <span className="whitespace-nowrap text-[10px] tracking-wider text-slate-500">
                {c.niche}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
