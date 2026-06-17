"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { STATIONS, TELEGRAM_URL } from "./stations";
import StationDetail from "./StationDetail";
import CTAModal from "./CTAModal";
import ClientsSection from "./ClientsSection";
import PortfolioSection from "./PortfolioSection";
import StageCard from "./StageCard";
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

// Premium CTA — bitta toza emerald
function CTAButton({ onClick, children, size = "md", className = "" }) {
  const pad = size === "lg" ? "h-12 px-7 text-sm" : "h-11 px-5 text-[13px]";
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

export default function SMMRoadmap() {
  const [activeId, setActiveId] = useState(null);
  const [visitedMax, setVisitedMax] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

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
      {/* Scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-emerald-400/70"
        style={{ scaleX }}
      />

      {/* Yuqori panel */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-[#0b0c0e]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Logo />
          <CTAButton onClick={() => setModalOpen(true)}>
            <span className="hidden sm:inline">Bepul konsultatsiya</span>
            <span className="sm:hidden">Bog&apos;lanish</span>
          </CTAButton>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero — chap tomonga tekislangan, minimal */}
        <section className="mx-auto max-w-5xl px-5 pb-20 pt-24 sm:pt-32">
          <Reveal as="p" className="font-mono text-[11px] tracking-[0.25em] text-emerald-400/80">
            O&apos;N AGY. — O&apos;SISH NUQTASINI ANIQLAYDIGAN AGENTLIK
          </Reveal>
          <Reveal
            as="h1"
            delay={0.08}
            className="mt-5 max-w-3xl text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.025em] text-slate-50 sm:text-[3.5rem]"
          >
            O&apos;sish nuqtangizni{" "}
            <span className="text-emerald-400">topamiz.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400"
          >
            Tasodifiy postlar emas — strategiya, kontent va oylik tahlildan
            iborat aniq jarayon. Biznesingizni A nuqtadan (tartibsiz kontent) B
            nuqtaga (tizimli, o&apos;lchanadigan savdo) olib chiqamiz.
          </Reveal>
          <Reveal delay={0.24} className="mt-9">
            <CTAButton size="lg" onClick={() => setModalOpen(true)}>
              Bepul konsultatsiya olish
            </CTAButton>
          </Reveal>
        </section>

        {/* Jarayon — 3 bosqich */}
        <section className="mx-auto max-w-5xl px-5 pb-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-slate-500">
              JARAYON
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-50 sm:text-[2rem]">
              3 bosqichda tizimli o&apos;sish
            </h2>
            <p className="mt-2 max-w-lg text-[13px] text-slate-500">
              Har bir bosqichni bosing — vaqt, byudjet taqsimoti va ishonch
              ko&apos;rsatkichlari ochiladi.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {STATIONS.map((station, i) => (
              <StageCard
                key={station.id}
                station={station}
                index={i}
                isVisited={visitedMax >= station.id}
                onSelect={selectStation}
              />
            ))}
          </div>

          <Reveal
            delay={0.1}
            className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-3 text-center text-[12px] text-slate-500"
          >
            <span className="text-rose-300/70">A nuqta — kontent bor, tizim yo&apos;q</span>
            <ArrowUpRight size={14} className="rotate-45 text-emerald-400/60" />
            <span className="text-amber-200/70">B nuqta — tizimli, o&apos;lchanadigan o&apos;sish</span>
          </Reveal>
        </section>

        <ClientsSection />
        <PortfolioSection />

        {/* Yakuniy chaqiruv */}
        <section className="mx-auto max-w-5xl px-5 pb-24">
          <Reveal className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <p className="font-mono text-[11px] tracking-[0.25em] text-emerald-400/80">
              KEYINGI QADAM
            </p>
            <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-slate-50 sm:text-[2rem]">
              Qayerda o&apos;sish imkoni borligini bilmoqchimisiz?
            </h2>
            <div className="mt-8 flex justify-center">
              <CTAButton size="lg" onClick={() => setModalOpen(true)}>
                Bepul konsultatsiya olish
              </CTAButton>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] py-10 text-center">
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

      <CTAModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
