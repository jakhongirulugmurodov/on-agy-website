"use client";

import { Clapperboard, Eye, ArrowUpRight, MonitorPlay, Play } from "lucide-react";
import { PORTFOLIO } from "./stations";
import Reveal from "./Reveal";

function WorkCard({ item, index }) {
  const isYoutube = item.type === "youtube";
  return (
    <Reveal
      delay={(index % 3) * 0.08}
      className="w-64 shrink-0 snap-start sm:w-auto sm:shrink"
    >
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/25"
      >
        {/* Muqova */}
        <div className="relative aspect-video overflow-hidden bg-[#0a1113]">
          {item.thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumb}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-100"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Clapperboard size={32} className="text-emerald-400/25" />
            </div>
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-300/60 group-hover:text-emerald-300">
              <Play size={17} className="ml-0.5" />
            </span>
          </span>
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] font-medium text-slate-300 backdrop-blur">
            {isYoutube ? <MonitorPlay size={11} /> : <Clapperboard size={11} />}
            {isYoutube ? "YouTube" : "Instagram Reels"}
          </span>
        </div>

        {/* Ma'lumot */}
        <div className="p-4">
          <p className="truncate text-[13px] font-semibold text-slate-100">
            {item.title}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-slate-500">
            {item.client}
          </p>
          <div className="mt-3 flex items-center justify-between">
            {item.views ? (
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                <Eye size={12} />
                {`${item.views} ko'rish`}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-400">
                <Eye size={12} />
                Natijani ko&apos;ring
              </span>
            )}
            <ArrowUpRight
              size={15}
              className="text-slate-600 transition-colors duration-300 group-hover:text-emerald-300"
            />
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export default function PortfolioSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-20">
      <Reveal className="text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] text-slate-500">
          NATIJALAR
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-slate-100 sm:text-2xl">
          Qilingan ishlardan misollar
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Kartani bosing — asl video yangi oynada ochiladi
        </p>
      </Reveal>

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {PORTFOLIO.map((item, i) => (
          <WorkCard key={item.href} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
