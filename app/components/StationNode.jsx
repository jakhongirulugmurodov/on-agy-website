"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Clock } from "lucide-react";
import { EASE, EASE_SOFT } from "../lib/motion";

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
  const accent = station.accent;
  // Pastki qatordagi tugunlar uchun hover-panel yuqoriga ochiladi
  const flip = pos.y > 50;
  const lifted = hovered || isActive;

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
        initial={{ opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.6 + index * 0.14 }}
        className="relative"
      >
        {/* Keyingi bekat — sokin nafas (ping emas) */}
        {isNext && !isActive && (
          <span
            className="breathe pointer-events-none absolute left-1/2 top-7 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full sm:top-8 sm:h-16 sm:w-16"
            style={{ boxShadow: `0 0 0 1px ${accent}55` }}
          />
        )}

        <motion.button
          type="button"
          onClick={() => onSelect(station.id)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: EASE_SOFT }}
          aria-label={`${station.code}-bekat: ${station.title}`}
          className="relative flex w-36 cursor-pointer flex-col items-center gap-2 sm:w-44"
        >
          {/* Bosqich markeri */}
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full border bg-[#0a1013]/90 backdrop-blur-md transition-all duration-300 sm:h-16 sm:w-16"
            style={{
              borderColor: lifted ? `${accent}aa` : `${accent}3a`,
              color: accent,
              boxShadow: lifted
                ? `0 0 28px -8px ${accent}99`
                : "0 6px 18px -10px rgba(0,0,0,0.8)",
            }}
          >
            <Icon size={23} strokeWidth={1.6} />
          </span>

          <span className="font-mono text-[9px] tracking-[0.25em] text-slate-500">
            BEKAT {station.code}
          </span>
          <span
            className="text-center text-[13px] font-semibold leading-tight transition-colors duration-300"
            style={{ color: lifted ? "#f1f5f9" : "#cbd5e1" }}
          >
            {station.title}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/30 px-2 py-0.5 text-[10px] text-slate-400 backdrop-blur">
            <Clock size={10} />
            {station.time.label}
          </span>

          {isVisited && !isActive && (
            <span
              className="absolute -right-0.5 top-7 flex h-5 w-5 items-center justify-center rounded-full bg-[#060709]"
              style={{ color: accent }}
            >
              <Check size={13} strokeWidth={2.5} />
            </span>
          )}
        </motion.button>

        {/* Hoverda chuqurroq qatlam — qadamlar (faqat desktop) */}
        <AnimatePresence>
          {isDesktop && hovered && !isActive && (
            <motion.div
              initial={{ opacity: 0, y: flip ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: flip ? 5 : -5 }}
              transition={{ duration: 0.28, ease: EASE }}
              className={`absolute left-1/2 z-30 w-64 -translate-x-1/2 rounded-2xl border border-white/[0.08] bg-[#0a0f12]/95 p-4 backdrop-blur-xl ${
                flip ? "bottom-full mb-3" : "top-full mt-3"
              }`}
              style={{ boxShadow: "0 20px 50px -20px rgba(0,0,0,0.9)" }}
            >
              <p
                className="mb-2.5 font-mono text-[10px] tracking-[0.2em]"
                style={{ color: accent }}
              >
                BU BEKATDA
              </p>
              <ul className="space-y-2">
                {station.subSteps.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-2.5 text-[11px] leading-snug text-slate-300"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {step}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-white/[0.08] pt-2.5 text-[10px] text-slate-500">
                Bosing — vaqt, byudjet va ishonch ko&apos;rsatkichlari
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
