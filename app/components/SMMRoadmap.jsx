"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { STATIONS, TELEGRAM_URL } from "./stations";
import { useIsDesktop } from "./useIsDesktop";
import { EASE, stagger } from "../lib/motion";
import RoadmapCanvas from "./RoadmapCanvas";
import StationDetail from "./StationDetail";
import MiniMapDock from "./MiniMapDock";
import CTAModal from "./CTAModal";
import ClientsSection from "./ClientsSection";
import PortfolioSection from "./PortfolioSection";
import Reveal from "./Reveal";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/10 text-[13px] font-semibold tracking-tight text-emerald-300">
        O&apos;N
      </span>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold tracking-tight text-slate-100">
          O&apos;N agy.
        </p>
        <p className="font-mono text-[9px] tracking-[0.18em] text-slate-500">
          O&apos;SISH NUQTASINI ANIQLAYMIZ
        </p>
      </div>
    </div>
  );
}

// Premium CTA — bitta toza emerald, neon kamalak emas
function CTAButton({ onClick, children, size = "md", className = "" }) {
  const pad = size === "lg" ? "h-13 px-7 text-sm" : "h-11 px-5 text-[13px]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 font-semibold text-emerald-950 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_10px_30px_-12px_rgba(52,211,153,0.6)] active:scale-[0.98] ${pad} ${className}`}
    >
      {children}
      <ArrowUpRight
        size={size === "lg" ? 17 : 15}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  );
}

// Sarlavha — so'zma-so'z ko'tarilib chiqadi
const HEADLINE = [
  { text: "Biznesingizning", accent: false },
  { text: "o'sish nuqtasini", accent: true },
  { text: "topamiz", accent: false },
];

const wordVariant = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function SMMRoadmap() {
  const [activeId, setActiveId] = useState(null);
  const [visitedMax, setVisitedMax] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { mounted, isDesktop } = useIsDesktop();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const selectStation = useCallback((id) => {
    if (id < 1 || id > STATIONS.length) return;
    setActiveId(id);
    setVisitedMax((v) => Math.max(v, id));
  }, []);

  const closeStation = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    document.body.style.overflow = activeId || modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId, modalOpen]);

  const activeStation = activeId ? STATIONS[activeId - 1] : null;

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Scroll progress — yuqorida ingichka emerald chiziq */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-emerald-400/70"
        style={{ scaleX }}
      />

      {/* Yuqori panel */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-[#060709]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <CTAButton onClick={() => setModalOpen(true)}>
            <span className="hidden sm:inline">Bepul konsultatsiya</span>
            <span className="sm:hidden">Konsultatsiya</span>
          </CTAButton>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Kirish */}
        <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:pt-24">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium tracking-wide text-slate-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            O&apos;N agy. — o&apos;sish nuqtasini aniqlaydigan agentlik
          </motion.span>

          <motion.h1
            variants={stagger(0.13, 0.2)}
            initial="hidden"
            animate="show"
            className="mt-6 text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-slate-50 sm:text-[3.25rem]"
          >
            {HEADLINE.map((word) => (
              <motion.span
                key={word.text}
                variants={wordVariant}
                className={`mr-[0.25em] inline-block ${
                  word.accent ? "text-emerald-400" : ""
                }`}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400"
          >
            Tasodifiy postlar emas — aniq jarayon. Quyidagi 3 bosqichli siklni
            bosib o&apos;rganing: har birida vaqt, byudjet va natija
            ko&apos;rsatkichlari ochiladi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-col items-center gap-1.5 text-slate-600"
          >
            <span className="font-mono text-[10px] tracking-[0.25em]">
              BEKATNI BOSIB ICHINI KO&apos;RING
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </motion.div>
        </section>

        {/* Sikl diagrammasi */}
        <section className="mx-auto max-w-3xl px-3 pb-12 pt-10 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#080b0d]"
          >
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
                  YUKLANMOQDA…
                </span>
              </div>
            )}
          </motion.div>
        </section>

        <ClientsSection />
        <PortfolioSection />

        {/* Yakuniy chaqiruv */}
        <section className="mx-auto max-w-4xl px-4 pb-28 lg:pb-20">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0a0d10] px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <Reveal
              delay={0.1}
              as="p"
              className="font-mono text-[11px] tracking-[0.25em] text-emerald-400/80"
            >
              KEYINGI QADAM
            </Reveal>
            <Reveal
              delay={0.18}
              as="h2"
              className="mx-auto mt-4 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-slate-50 sm:text-[2rem]"
            >
              Qayerda o&apos;sish imkoni borligini bilmoqchimisiz?
            </Reveal>
            <Reveal delay={0.26} className="mt-8 flex justify-center">
              <CTAButton size="lg" onClick={() => setModalOpen(true)}>
                Bepul konsultatsiya olish
              </CTAButton>
            </Reveal>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] pb-24 pt-8 text-center lg:pb-8">
        <p className="text-[13px] font-semibold tracking-tight text-slate-300">
          O&apos;N agy.
        </p>
        <p className="mx-auto mt-1 max-w-xs text-[11px] text-slate-600">
          o&apos;sish nuqtasini aniqlaydigan agentlik
        </p>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-mono text-[10px] tracking-widest text-slate-500 transition hover:text-emerald-400"
        >
          T.ME/SP_BUSINESS_AGENCY
        </a>
        <p className="mt-3 font-mono text-[10px] tracking-widest text-slate-700">
          © 2026
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
