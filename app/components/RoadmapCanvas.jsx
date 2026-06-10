"use client";

import { motion } from "framer-motion";
import { Flag, RefreshCw } from "lucide-react";
import StationNode from "./StationNode";

const deg = (a) => (a * Math.PI) / 180;

// Desktop: kvadrat keng sahna; mobil: bo'yiga cho'zilgan, tugunlar siqilmasligi uchun
const GEOMETRY = {
  desktop: {
    viewW: 800,
    viewH: 800,
    cx: 400,
    cy: 400,
    r: 240,
    angles: [-90, 30, 150],
    rings: [130, 315],
    entry: "M 120 186 C 200 152, 258 148, 322 158",
    entryLabel: { x: 15, y: 23 },
    cycleLabel: { y: 706, size: 15, text: "OYLIK SIKL — HAR OY TAKRORLANADI" },
  },
  mobile: {
    viewW: 400,
    viewH: 560,
    cx: 200,
    cy: 300,
    r: 150,
    angles: [-90, 40, 140],
    rings: [80, 195],
    entry: "M 52 96 C 95 70, 130 85, 160 116",
    entryLabel: { x: 15, y: 16 },
    cycleLabel: { y: 508, size: 13, text: "OYLIK SIKL" },
  },
};

const SEGMENT_COLORS = ["#2dd4bf", "#38bdf8", "#fbbf24"];

export default function RoadmapCanvas({
  stations,
  activeId,
  visitedMax,
  isDesktop,
  onSelect,
}) {
  const G = isDesktop ? GEOMETRY.desktop : GEOMETRY.mobile;
  const pt = (angle, r = G.r) => ({
    x: G.cx + r * Math.cos(deg(angle)),
    y: G.cy + r * Math.sin(deg(angle)),
  });

  // Ikki bosqich orasidagi yoy (tugun atrofida bo'sh joy qoldiriladi)
  const arcPath = (fromAngle, toAngle) => {
    const a = pt(fromAngle + 17);
    const b = pt(toAngle - 17);
    const large = toAngle - fromAngle - 34 > 180 ? 1 : 0;
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${G.r} ${G.r} 0 ${large} 1 ${b.x.toFixed(
      1
    )} ${b.y.toFixed(1)}`;
  };

  const [a1, a2, a3] = G.angles;
  const segments = [
    { d: arcPath(a1, a2), color: SEGMENT_COLORS[0] },
    { d: arcPath(a2, a3), color: SEGMENT_COLORS[1] },
    { d: arcPath(a3, a1 + 360), color: SEGMENT_COLORS[2] },
  ];

  const nodePcts = G.angles.map((a) => {
    const p = pt(a);
    return { x: (p.x / G.viewW) * 100, y: (p.y / G.viewH) * 100 };
  });

  const progress = visitedMax / stations.length;
  const activePct = activeId ? nodePcts[activeId - 1] : null;

  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: `${G.viewW} / ${G.viewH}` }}
    >
      {/* Kamera: bosqich tanlanganda diagramma o'sha tomonga zumlanadi */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: activeId ? 1.08 : 1,
          filter: activeId
            ? "blur(5px) brightness(0.45)"
            : "blur(0px) brightness(1)",
        }}
        transition={{ type: "spring", stiffness: 160, damping: 26 }}
        style={{
          transformOrigin: activePct
            ? `${activePct.x}% ${activePct.y}%`
            : "50% 50%",
        }}
      >
        {/* Fon: yulduz-zarralar va yumshoq nur dog'lari */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(226,232,240,0.5) 0.8px, transparent 0.8px)",
            backgroundSize: "110px 90px",
          }}
        />
        <div className="float-slow absolute left-[12%] top-[14%] h-52 w-72 rounded-full bg-teal-500/[0.06] blur-3xl" />
        <div className="float-slow absolute bottom-[12%] right-[10%] h-56 w-80 rounded-full bg-sky-500/[0.05] blur-3xl [animation-delay:-2.5s]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.05] blur-3xl" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${G.viewW} ${G.viewH}`}
          fill="none"
        >
          <defs>
            <filter id="particle-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="cycle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <path
              id="cycle-orbit"
              d={`M ${G.cx} ${G.cy - G.r} A ${G.r} ${G.r} 0 1 1 ${G.cx - 0.1} ${
                G.cy - G.r
              } Z`}
            />
            {segments.map((s, i) => (
              <marker
                key={i}
                id={`cycle-arrow-${i}`}
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={s.color} />
              </marker>
            ))}
            <marker
              id="entry-arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#fb7185" />
            </marker>
          </defs>

          {/* Orbita halqalari */}
          <circle cx={G.cx} cy={G.cy} r={G.rings[0]} stroke="rgba(148,163,184,0.08)" strokeDasharray="3 8" />
          <circle cx={G.cx} cy={G.cy} r={G.r} stroke="rgba(148,163,184,0.1)" />
          <circle cx={G.cx} cy={G.cy} r={G.rings[1]} stroke="rgba(148,163,184,0.06)" strokeDasharray="2 10" />

          {/* Sikl oqimi: bosqichdan bosqichga harakatlanuvchi yoylar */}
          {segments.map((s, i) => (
            <g key={i}>
              <path d={s.d} stroke={s.color} strokeWidth="10" strokeLinecap="round" opacity="0.07" />
              <path
                d={s.d}
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 12"
                opacity="0.8"
                className="path-flow"
                markerEnd={`url(#cycle-arrow-${i})`}
              />
            </g>
          ))}

          {/* Bosib o'tilgan progress: tepa nuqtadan soat yo'nalishida to'ladi */}
          <motion.circle
            cx={G.cx}
            cy={G.cy}
            r={G.r}
            stroke="url(#cycle-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(-90 ${G.cx} ${G.cy})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* A nuqtadan siklga kirish yo'li */}
          <path
            d={G.entry}
            stroke="rgba(251,113,133,0.55)"
            strokeWidth="2"
            strokeDasharray="5 8"
            strokeLinecap="round"
            className="path-flow"
            markerEnd="url(#entry-arrow)"
          />

          {/* Sikl yorlig'i */}
          <text
            x={G.cx}
            y={G.cycleLabel.y}
            fill="#2dd4bf"
            opacity="0.7"
            fontSize={G.cycleLabel.size}
            fontFamily="var(--font-geist-mono)"
            letterSpacing="4"
            textAnchor="middle"
          >
            {G.cycleLabel.text}
          </text>

          {/* Orbita bo'ylab uchuvchi zarralar */}
          {[
            { fill: "#2dd4bf", dur: "12s", begin: "0s", r: 3.5 },
            { fill: "#38bdf8", dur: "16s", begin: "-6s", r: 3 },
            { fill: "#fbbf24", dur: "21s", begin: "-13s", r: 3.5 },
          ].map((p, i) => (
            <circle key={i} r={p.r} fill={p.fill} opacity="0.9" filter="url(#particle-glow)">
              <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite">
                <mpath href="#cycle-orbit" />
              </animateMotion>
            </circle>
          ))}
        </svg>

        {/* A nuqta — boshlanish */}
        <div
          className="absolute z-10 text-center"
          style={{
            left: `${G.entryLabel.x}%`,
            top: `${G.entryLabel.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="relative mx-auto flex h-5 w-5 items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-rose-500/50" />
            <span className="relative h-3 w-3 rounded-full bg-rose-500" />
          </span>
          <p className="mt-1.5 font-mono text-[10px] font-bold tracking-widest text-rose-400">
            A NUQTA
          </p>
          <p className="w-24 text-[10px] leading-tight text-slate-500 sm:w-28">
            Hozir: kontent bor, tizim yo'q
          </p>
        </div>

        {/* Markaz — B nuqta, o'sish nuqtasi */}
        <div
          className="pointer-events-none absolute z-10 text-center"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span className="float-slow mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/50 bg-amber-400/10 text-amber-300 shadow-[0_0_44px_-6px_rgba(251,191,36,0.6)] sm:h-20 sm:w-20">
            <Flag size={24} />
          </span>
          <p className="mt-2 font-mono text-[10px] font-bold tracking-widest text-amber-400 sm:text-[11px]">
            B NUQTA
          </p>
          <p className="mx-auto hidden w-36 text-[10px] leading-tight text-slate-400 sm:block">
            O'sish nuqtasi: tizimli, o'lchanadigan o'sish
          </p>
        </div>

        {/* 3 bosqich */}
        {stations.map((station, i) => (
          <StationNode
            key={station.id}
            station={station}
            pos={nodePcts[i]}
            index={i}
            isActive={activeId === station.id}
            isVisited={visitedMax >= station.id}
            isNext={visitedMax + 1 === station.id}
            isDesktop={isDesktop}
            onSelect={onSelect}
          />
        ))}
      </motion.div>

      {/* Burchak yorlig'i */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-widest text-slate-500 backdrop-blur">
        <RefreshCw size={11} />
        O&apos;SISH SIKLI · 90 KUN
      </div>
    </div>
  );
}
