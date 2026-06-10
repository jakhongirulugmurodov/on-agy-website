"use client";

import { CLIENTS } from "./stations";

export default function ClientsSection() {
  // Uzluksiz lenta uchun ro'yxat ikki marta takrorlanadi
  const row = [...CLIENTS, ...CLIENTS];

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <h2 className="text-center text-xl font-bold text-slate-100 sm:text-2xl">
        Ishlagan mijozlarimiz
      </h2>
      <div
        className="marquee group relative mt-7 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center gap-4">
          {row.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex min-w-44 flex-col items-center gap-0.5 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-4 opacity-60 transition duration-300 hover:border-teal-400/30 hover:bg-teal-400/[0.06] hover:opacity-100"
            >
              <span className="whitespace-nowrap text-sm font-bold tracking-wide text-slate-100">
                {c.name}
              </span>
              <span className="whitespace-nowrap text-[10px] tracking-wider text-slate-500">
                {c.niche}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
