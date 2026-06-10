"use client";

import { motion } from "framer-motion";
import { Clapperboard, Eye, ExternalLink, MonitorPlay, Play } from "lucide-react";
import { PORTFOLIO } from "./stations";

function WorkCard({ item, index }) {
  const isYoutube = item.type === "youtube";
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.08 }}
      whileHover={{ y: -5 }}
      className="group relative w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition hover:border-teal-400/30 sm:w-auto sm:shrink"
    >
      {/* Muqova */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#0a1a1c] to-[#0d1422]">
        {item.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumb}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-[1.04] group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Clapperboard size={34} className="text-teal-400/30" />
          </div>
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur transition group-hover:scale-110 group-hover:border-teal-300/60 group-hover:text-teal-300">
            <Play size={18} className="ml-0.5" />
          </span>
        </span>
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-medium text-slate-300 backdrop-blur">
          {isYoutube ? <MonitorPlay size={11} /> : <Clapperboard size={11} />}
          {isYoutube ? "YouTube" : "Instagram Reels"}
        </span>
      </div>

      {/* Ma'lumot */}
      <div className="p-4">
        <p className="truncate text-[13px] font-semibold text-slate-100">
          {item.title}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-slate-500">{item.client}</p>
        <div className="mt-3 flex items-center justify-between">
          {item.views ? (
            <span className="flex items-center gap-1.5 rounded-full border border-teal-400/25 bg-teal-400/10 px-2.5 py-1 text-[11px] font-bold text-teal-300">
              <Eye size={12} />
              {`${item.views} ko'rish`}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-400">
              <Eye size={12} />
              Natijani ko&apos;ring
            </span>
          )}
          <ExternalLink
            size={14}
            className="text-slate-600 transition group-hover:text-teal-300"
          />
        </div>
      </div>
    </motion.a>
  );
}

export default function PortfolioSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <h2 className="text-center text-xl font-bold text-slate-100 sm:text-2xl">
        Qilingan ishlardan misollar
      </h2>
      <p className="mt-2 text-center text-xs text-slate-500">
        Kartani bosing — asl video yangi oynada ochiladi
      </p>
      <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {PORTFOLIO.map((item, i) => (
          <WorkCard key={item.href} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
