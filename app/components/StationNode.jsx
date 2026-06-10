"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";

export default function StationNode({
  station,
  pos,
  index,
  isActive,
  isVisited,
  isNext,
  isDesktop,
  onSelect,
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = station.icon;
  // Pastki qatordagi orollar uchun hover-panel yuqoriga ochiladi
  const flip = pos.y > 50;

  return (
    <div
      className="absolute z-20"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 22,
          delay: 0.2 + index * 0.15,
        }}
        className="relative"
      >
        {isNext && !isActive && (
          <span
            className="absolute -inset-3 rounded-full animate-ping opacity-25"
            style={{ backgroundColor: station.accent }}
          />
        )}

        <motion.button
          type="button"
          layoutId={`station-${station.id}`}
          onClick={() => onSelect(station.id)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.08, y: -5 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`${station.code}-bekat: ${station.title}`}
          className="relative flex w-36 cursor-pointer flex-col items-center gap-1.5 sm:w-44"
        >
          {/* Bosqich markeri */}
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 bg-[#0b1518]/90 backdrop-blur-md transition-shadow sm:h-16 sm:w-16"
            style={{
              borderColor: `${station.accent}66`,
              color: station.accent,
              boxShadow:
                hovered || isActive
                  ? `0 0 38px -4px ${station.accent}88`
                  : `0 0 22px -8px ${station.accent}55`,
            }}
          >
            <Icon size={24} strokeWidth={1.8} />
          </span>

          <span className="font-mono text-[9px] tracking-[0.25em] text-slate-500">
            BEKAT {station.code}
          </span>
          <span className="text-center text-xs font-semibold leading-tight text-slate-100 sm:text-[13px]">
            {station.title}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-slate-400 backdrop-blur">
            <Clock size={10} />
            {station.time.label}
          </span>

          {isVisited && !isActive && (
            <span className="absolute -right-1 top-7 rounded-full bg-[#05060a]">
              <CheckCircle2 size={18} className="text-emerald-400" />
            </span>
          )}
        </motion.button>

        {/* Hoverda chuqurroq qatlam: qadamlar (faqat desktop) */}
        <AnimatePresence>
          {isDesktop && hovered && !isActive && (
            <motion.div
              initial={{ opacity: 0, y: flip ? 10 : -10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: flip ? 6 : -6, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={`absolute left-1/2 z-30 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a1114]/95 p-4 backdrop-blur-xl ${
                flip ? "bottom-full mb-3" : "top-full mt-3"
              }`}
              style={{ boxShadow: `0 0 40px -8px ${station.accent}40` }}
            >
              <p
                className="mb-2 font-mono text-[10px] tracking-[0.2em]"
                style={{ color: station.accent }}
              >
                BU BEKATDA
              </p>
              <ul className="space-y-1.5">
                {station.subSteps.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-2 text-[11px] leading-snug text-slate-300"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: station.accent }}
                    />
                    {step}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-white/10 pt-2 text-[10px] text-slate-500">
                Bosing — vaqt, byudjet va ishonch ko&apos;rsatkichlari ochiladi
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
