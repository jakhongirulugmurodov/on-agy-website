"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

function DockButton({ station, isActive, isVisited, onSelect, vertical }) {
  const Icon = station.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(station.id)}
      aria-label={`${station.code}-bekat: ${station.title}`}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all"
      style={{
        borderColor: isActive
          ? station.accent
          : isVisited
            ? "rgba(52,211,153,0.4)"
            : "rgba(255,255,255,0.12)",
        backgroundColor: isActive
          ? `${station.accent}22`
          : isVisited
            ? "rgba(52,211,153,0.08)"
            : "rgba(255,255,255,0.04)",
        color: isActive
          ? station.accent
          : isVisited
            ? "#34d399"
            : "#64748b",
        transform: isActive ? "scale(1.12)" : "scale(1)",
      }}
    >
      {isVisited && !isActive ? <Check size={15} /> : <Icon size={16} />}

      {/* Tooltip (faqat desktop, dock o'ng tomonda) */}
      {vertical && (
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 lg:block">
          {station.code} · {station.title}
        </span>
      )}
    </button>
  );
}

export default function MiniMapDock({ stations, activeId, visitedMax, onSelect }) {
  const progress = Math.round((visitedMax / stations.length) * 100);

  return (
    <>
      {/* Desktop: o'ng tomonda vertikal mini-xarita */}
      <motion.nav
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        aria-label="Yo'l xaritasi bo'ylab navigatsiya"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-black/50 p-3 backdrop-blur-xl lg:flex"
      >
        <span className="font-mono text-[10px] font-semibold tracking-widest text-rose-300/80">
          A
        </span>
        {stations.map((s) => (
          <DockButton
            key={s.id}
            station={s}
            isActive={activeId === s.id}
            isVisited={visitedMax >= s.id}
            onSelect={onSelect}
            vertical
          />
        ))}
        <span className="font-mono text-[10px] font-semibold tracking-widest text-amber-200/80">
          B
        </span>
        <span className="mt-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-slate-400">
          {progress}%
        </span>
      </motion.nav>

      {/* Mobil: pastda gorizontal dock */}
      <motion.nav
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        aria-label="Yo'l xaritasi bo'ylab navigatsiya"
        className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-1 rounded-2xl border border-white/[0.08] bg-black/70 px-3 py-2.5 backdrop-blur-xl lg:hidden"
      >
        <span className="font-mono text-[10px] font-semibold text-rose-300/80">A</span>
        {stations.map((s) => (
          <DockButton
            key={s.id}
            station={s}
            isActive={activeId === s.id}
            isVisited={visitedMax >= s.id}
            onSelect={onSelect}
          />
        ))}
        <span className="font-mono text-[10px] font-semibold text-amber-200/80">B</span>
      </motion.nav>
    </>
  );
}
