"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  UserCheck,
  X,
} from "lucide-react";
import MetricsPanel from "./MetricsPanel";
import { EASE } from "../lib/motion";

const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function StationDetail({
  station,
  total,
  onClose,
  onNavigate,
  onCTA,
}) {
  const Icon = station.icon;
  const accent = station.accent;

  // Modal AnimatePresence ichida ichki reveal'lar CSS bilan beriladi
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(false);
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, [station.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(station.id + 1);
      if (e.key === "ArrowLeft") onNavigate(station.id - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [station.id, onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-6">
      <motion.div
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative my-6 w-full max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#0a0f12]/95 backdrop-blur-2xl sm:my-0"
        style={{ boxShadow: "0 40px 100px -30px rgba(0,0,0,0.9)" }}
      >
        {/* Tepa aksent chizig'i */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        <div className="p-5 sm:p-7">
          {/* Sarlavha */}
          <div className="flex items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
              style={{
                borderColor: `${accent}44`,
                backgroundColor: `${accent}14`,
                color: accent,
              }}
            >
              <Icon size={23} strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="font-mono text-[10px] font-semibold tracking-[0.3em]"
                style={{ color: accent }}
              >
                BEKAT {station.code} / 0{total}
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-[-0.01em] text-slate-50 sm:text-2xl">
                {station.title}
              </h2>
              <p className="text-xs text-slate-400 sm:text-[13px]">
                {station.tagline}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Yopish"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Bekat tavsifi */}
          {station.description && (
            <p className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-[13px] leading-relaxed text-slate-300">
              {station.description}
            </p>
          )}

          {/* Holat chiplari */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-300">
              <Clock size={12} className="text-emerald-400" />
              {station.time.label}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[11px] font-medium text-emerald-300">
              <UserCheck size={12} />
              {`Sizdan: ${station.clientInput}`}
            </span>
          </div>

          {/* Asosiy qatlam: qadamlar + ko'rsatkichlar */}
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="mb-3 font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-500">
                BOSQICH QADAMLARI
              </p>
              <ul className="space-y-2.5">
                {station.subSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                    style={{
                      opacity: shown ? 1 : 0,
                      transform: shown ? "translateX(0)" : "translateX(-12px)",
                      transition: `opacity 0.45s ${EASE_CSS} ${0.1 + i * 0.08}s, transform 0.45s ${EASE_CSS} ${0.1 + i * 0.08}s`,
                    }}
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${accent}1f`, color: accent }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[13px] leading-snug text-slate-200">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <MetricsPanel station={station} />
          </div>

          {/* Pastki navigatsiya */}
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
            <button
              type="button"
              onClick={() => onNavigate(station.id - 1)}
              disabled={station.id === 1}
              className="flex h-11 items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 text-xs font-medium text-slate-300 transition hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={15} />
              <span className="hidden sm:inline">Oldingi</span>
            </button>

            <button
              type="button"
              onClick={onCTA}
              className="group flex h-11 items-center gap-2 rounded-full bg-emerald-400 px-5 text-xs font-semibold text-emerald-950 transition-all duration-300 hover:bg-emerald-300 sm:px-6 sm:text-[13px]"
            >
              Bepul konsultatsiya
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            <button
              type="button"
              onClick={() => onNavigate(station.id + 1)}
              disabled={station.id === total}
              className="flex h-11 items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 text-xs font-medium text-slate-300 transition hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span className="hidden sm:inline">Keyingi</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
