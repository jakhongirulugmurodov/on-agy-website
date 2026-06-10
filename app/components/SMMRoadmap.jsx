"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { STATIONS, TELEGRAM_URL } from "./stations";
import { useIsDesktop } from "./useIsDesktop";
import RoadmapCanvas from "./RoadmapCanvas";
import StationDetail from "./StationDetail";
import MiniMapDock from "./MiniMapDock";
import CTAModal from "./CTAModal";
import ClientsSection from "./ClientsSection";
import PortfolioSection from "./PortfolioSection";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 text-sm font-black tracking-tight text-white ring-1 ring-teal-400/30">
        O&apos;N
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold tracking-tight text-slate-50">O&apos;N</p>
        <p className="font-mono text-[9px] tracking-[0.22em] text-teal-500">
          O&apos;SISH NUQTASI
        </p>
      </div>
    </div>
  );
}

export default function SMMRoadmap() {
  const [activeId, setActiveId] = useState(null);
  const [visitedMax, setVisitedMax] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { mounted, isDesktop } = useIsDesktop();

  const selectStation = useCallback((id) => {
    if (id < 1 || id > STATIONS.length) return;
    setActiveId(id);
    setVisitedMax((v) => Math.max(v, id));
  }, []);

  const closeStation = useCallback(() => setActiveId(null), []);

  // Overlay ochiq paytda fon aylanmasin
  useEffect(() => {
    document.body.style.overflow = activeId || modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId, modalOpen]);

  const activeStation = activeId ? STATIONS[activeId - 1] : null;

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Yuqori panel */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#05060a]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 px-4 text-xs font-bold text-black shadow-[0_0_28px_-8px_rgba(45,212,191,0.8)] transition hover:brightness-110 sm:px-5 sm:text-sm"
          >
            <Send size={15} />
            <span className="hidden sm:inline">Muallif bilan suhbatlashish</span>
            <span className="sm:hidden">Suhbatlashish</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Kirish */}
        <section className="mx-auto max-w-3xl px-4 pt-12 text-center sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-teal-400/25 bg-teal-400/10 px-4 py-1.5 text-[11px] font-medium tracking-wide text-teal-300">
              O&apos;N — O&apos;sish Nuqtasi
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-50 sm:text-5xl">
              Biznesingizning{" "}
              <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                o&apos;sish nuqtasini
              </span>{" "}
              topamiz
            </h1>
            <p className="mt-7 animate-pulse font-mono text-[10px] tracking-[0.3em] text-slate-600">
              ▼ HAR BIR BEKATNI BOSIB, ICHINI KO&apos;RING ▼
            </p>
          </motion.div>
        </section>

        {/* Xarita */}
        <section className="mx-auto max-w-3xl px-3 pb-12 pt-6 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#060a0d]">
            {mounted ? (
              <RoadmapCanvas
                stations={STATIONS}
                activeId={activeId}
                visitedMax={visitedMax}
                isDesktop={isDesktop}
                onSelect={selectStation}
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center">
                <span className="font-mono text-xs tracking-widest text-slate-600">
                  XARITA YUKLANMOQDA…
                </span>
              </div>
            )}
          </div>
        </section>

        <ClientsSection />
        <PortfolioSection />

        {/* Yakuniy chaqiruv */}
        <section className="mx-auto max-w-4xl px-4 pb-28 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            className="relative overflow-hidden rounded-3xl border border-teal-400/20 bg-gradient-to-br from-[#0a1416] to-[#0c1119] p-8 text-center sm:p-12"
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
            <h2 className="relative text-2xl font-bold text-slate-50 sm:text-3xl">
              Qayerda o&apos;sish imkoni borligini bilmoqchimisiz?
            </h2>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="relative mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_-8px_rgba(45,212,191,0.8)] transition hover:scale-[1.03] hover:brightness-110"
            >
              <Send size={17} />
              Muallif bilan suhbatlashish
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/5 pb-24 pt-6 text-center lg:pb-6">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] tracking-widest text-slate-600 transition hover:text-teal-400"
        >
          TELEGRAM: T.ME/SP_BUSINESS_AGENCY
        </a>
        <p className="mt-2 font-mono text-[10px] tracking-widest text-slate-700">
          O&apos;N — O&apos;SISH NUQTASI © 2026
        </p>
      </footer>

      <MiniMapDock
        stations={STATIONS}
        activeId={activeId}
        visitedMax={visitedMax}
        onSelect={selectStation}
      />

      <AnimatePresence>
        {activeStation && (
          <StationDetail
            key={activeStation.id}
            station={activeStation}
            total={STATIONS.length}
            onClose={closeStation}
            onNavigate={selectStation}
            onCTA={() => {
              setActiveId(null);
              setModalOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <CTAModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
