"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Send,
  UserCheck,
  X,
} from "lucide-react";
import MetricsPanel from "./MetricsPanel";

export default function StationDetail({
  station,
  total,
  onClose,
  onNavigate,
  onCTA,
}) {
  const Icon = station.icon;

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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        layoutId={`station-${station.id}`}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="relative my-6 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/12 bg-[#0a1114]/95 backdrop-blur-2xl sm:my-0"
        style={{ boxShadow: `0 0 80px -16px ${station.accent}55` }}
      >
        {/* Tepa aksent chizig'i */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${station.accent}, transparent)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.12, duration: 0.3 }}
          className="p-5 sm:p-7"
        >
          {/* Sarlavha */}
          <div className="flex items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
              style={{
                borderColor: `${station.accent}55`,
                backgroundColor: `${station.accent}1a`,
                color: station.accent,
              }}
            >
              <Icon size={24} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="font-mono text-[10px] font-bold tracking-[0.3em]"
                style={{ color: station.accent }}
              >
                BEKAT {station.code} / 0{total}
              </p>
              <h2 className="mt-0.5 text-xl font-bold text-slate-50 sm:text-2xl">
                {station.title}
              </h2>
              <p className="text-xs text-slate-400 sm:text-sm">{station.tagline}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Yopish"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-white/25 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Bekat tavsifi */}
          {station.description && (
            <p className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] p-3.5 text-[13px] leading-relaxed text-slate-300">
              {station.description}
            </p>
          )}

          {/* Holat chiplari */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1.5 text-[11px] font-medium text-sky-300">
              <Clock size={12} />
              {station.time.label}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1.5 text-[11px] font-medium text-teal-300">
              <UserCheck size={12} />
              {`Sizdan: ${station.clientInput}`}
            </span>
          </div>

          {/* Asosiy qatlam: qadamlar + ko'rsatkichlar */}
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold tracking-[0.2em] text-slate-500">
                BOSQICH QADAMLARI
              </p>
              <ul className="space-y-2.5">
                {station.subSteps.map((step, i) => (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-3"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: station.accent }}
                    />
                    <span className="text-[13px] leading-snug text-slate-200">
                      {step}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <MetricsPanel station={station} />
          </div>

          {/* Pastki navigatsiya */}
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={() => onNavigate(station.id - 1)}
              disabled={station.id === 1}
              className="flex h-11 items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs font-medium text-slate-300 transition hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={15} />
              <span className="hidden sm:inline">Oldingi</span>
            </button>

            <button
              type="button"
              onClick={onCTA}
              className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 px-4 text-xs font-bold text-black shadow-[0_0_24px_-6px_rgba(45,212,191,0.7)] transition hover:brightness-110 sm:px-6 sm:text-sm"
            >
              <Send size={15} />
              Muallif bilan suhbatlashish
            </button>

            <button
              type="button"
              onClick={() => onNavigate(station.id + 1)}
              disabled={station.id === total}
              className="flex h-11 items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs font-medium text-slate-300 transition hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span className="hidden sm:inline">Keyingi</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
