"use client";

import { motion } from "framer-motion";
import { Flag, RefreshCw } from "lucide-react";
import StationNode from "./StationNode";
import { ACCENT, COLOR_GOAL, COLOR_START, EASE_IN_OUT } from "../lib/motion";

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
    cycleLabel: { y: 706, size: 13, text: "OYLIK SIKL — HAR OY TAKRORLANADI" },
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
    cycleLabel: { y: 508, size: 12, text: "OYLIK SIKL" },
  },
};

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
  const segments = [arcPath(a1, a2), arcPath(a2, a3), arcPath(a3, a1 + 360)];

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
          scale: activeId ? 1.07 : 1,
          filter: activeId
            ? "blur(4px) brightness(0.5)"
            : "blur(0px) brightness(1)",
        }}
        transition={{ duration: 0.7, ease: EASE_IN_OUT }}
        style={{
          transformOrigin: activePct
            ? `${activePct.x}% ${activePct.y}%`
            : "50% 50%",
        }}
      >
        {/* Fon: nozik zarralar va bitta muloyim emerald nur */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(226,232,240,0.45) 0.7px, transparent 0.7px)",
            backgroundSize: "120px 100px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.04] blur-3xl" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${G.viewW} ${G.viewH}`}
          fill="none"
        >
          <defs>
            <filter id="particle-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <path
              id="cycle-orbit"
              d={`M ${G.cx} ${G.cy - G.r} A ${G.r} ${G.r} 0 1 1 ${G.cx - 0.1} ${
                G.cy - G.r
              } Z`}
            />
            <marker
              id="cycle-arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
            </marker>
            <marker
              id="entry-arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={COLOR_START} />
            </marker>
          </defs>

          {/* Orbita halqalari — nozik */}
          <circle cx={G.cx} cy={G.cy} r={G.rings[0]} stroke="rgba(148,163,184,0.07)" strokeDasharray="2 9" />
          <circle cx={G.cx} cy={G.cy} r={G.r} stroke="rgba(148,163,184,0.09)" />
          <circle cx={G.cx} cy={G.cy} r={G.rings[1]} stroke="rgba(148,163,184,0.05)" strokeDasharray="2 11" />

          {/* Sikl oqimi: yagona emerald, bosqichdan bosqichga */}
          {segments.map((d, i) => (
            <g key={i}>
              <path d={d} stroke={ACCENT} strokeWidth="9" strokeLinecap="round" opacity="0.05" />
              <path
                d={d}
                stroke={ACCENT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 13"
                opacity="0.65"
                className="path-flow"
                markerEnd="url(#cycle-arrow)"
              />
            </g>
          ))}

          {/* Bosib o'tilgan progress: tepa nuqtadan soat yo'nalishida to'ladi */}
          <motion.circle
            cx={G.cx}
            cy={G.cy}
            r={G.r}
            stroke={ACCENT}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(-90 ${G.cx} ${G.cy})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress }}
            transition={{ duration: 1.1, ease: EASE_IN_OUT }}
          />

          {/* A nuqtadan siklga kirish yo'li */}
          <path
            d={G.entry}
            stroke={`${COLOR_START}88`}
            strokeWidth="1.6"
            strokeDasharray="4 9"
            strokeLinecap="round"
            className="path-flow"
            markerEnd="url(#entry-arrow)"
          />

          {/* Sikl yorlig'i */}
          <text
            x={G.cx}
            y={G.cycleLabel.y}
            fill={ACCENT}
            opacity="0.55"
            fontSize={G.cycleLabel.size}
            fontFamily="var(--font-geist-mono)"
            letterSpacing="3"
            textAnchor="middle"
          >
            {G.cycleLabel.text}
          </text>

          {/* Orbita bo'ylab uchuvchi zarralar — kam va nozik */}
          {[
            { dur: "16s", begin: "0s", r: 2.6 },
            { dur: "22s", begin: "-9s", r: 2.2 },
          ].map((p, i) => (
            <circle key={i} r={p.r} fill={ACCENT} opacity="0.85" filter="url(#particle-glow)">
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
          <span className="relative mx-auto flex h-4 w-4 items-center justify-center">
            <span
              className="breathe absolute h-full w-full rounded-full"
              style={{ backgroundColor: `${COLOR_START}55` }}
            />
            <span
              className="relative h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLOR_START }}
            />
          </span>
          <p
            className="mt-1.5 font-mono text-[10px] font-semibold tracking-widest"
            style={{ color: COLOR_START }}
          >
            A NUQTA
          </p>
          <p className="w-24 text-[10px] leading-tight text-slate-500 sm:w-28">
            Hozir: kontent bor, tizim yo&apos;q
          </p>
        </div>

        {/* Markaz — B nuqta, o'sish nuqtasi */}
        <div
          className="pointer-events-none absolute z-10 text-center"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span
            className="float-slow mx-auto flex h-14 w-14 items-center justify-center rounded-full border sm:h-[72px] sm:w-[72px]"
            style={{
              borderColor: `${COLOR_GOAL}55`,
              backgroundColor: `${COLOR_GOAL}12`,
              color: COLOR_GOAL,
              boxShadow: `0 0 32px -10px ${COLOR_GOAL}66`,
            }}
          >
            <Flag size={22} strokeWidth={1.6} />
          </span>
          <p
            className="mt-2 font-mono text-[10px] font-semibold tracking-widest sm:text-[11px]"
            style={{ color: COLOR_GOAL }}
          >
            B NUQTA
          </p>
          <p className="mx-auto hidden w-36 text-[10px] leading-tight text-slate-400 sm:block">
            O&apos;sish nuqtasi: tizimli, o&apos;lchanadigan o&apos;sish
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
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-widest text-slate-500 backdrop-blur">
        <RefreshCw size={11} />
        O&apos;SISH SIKLI · 90 KUN
      </div>
    </div>
  );
}
