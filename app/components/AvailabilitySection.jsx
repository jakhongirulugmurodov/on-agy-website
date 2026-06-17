"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import Reveal from "./Reveal";

// Kalendar loyihasi bilan bir hostda (jakhongirulugmurodov.github.io) — CORS muammosi yo'q
const KAL_SITE = "https://jakhongirulugmurodov.github.io/kalendar/";
const EVENTS_URL = "https://jakhongirulugmurodov.github.io/kalendar/events.json";

const WD = ["Yak", "Du", "Se", "Cho", "Pay", "Ju", "Sha"];
const MONTHS = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

// Toshkent vaqti bo'yicha bugungi sana (YYYY-MM-DD)
function tashkentTodayParts() {
  const s = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Tashkent" });
  return s.split("-").map(Number); // [Y, M, D]
}

const STATUS = {
  bosh: { label: "Bo'sh", cls: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" },
  qisman: { label: "Qisman", cls: "border-amber-300/30 bg-amber-300/[0.08] text-amber-200" },
  band: { label: "Band", cls: "border-white/10 bg-white/[0.03] text-slate-500" },
};

export default function AvailabilitySection() {
  const [days, setDays] = useState(null); // null = yuklanmoqda

  useEffect(() => {
    let alive = true;
    fetch(EVENTS_URL, { cache: "no-store" })
      .then((r) => r.json())
      .then((events) => {
        if (!alive) return;
        const [Y, M, D] = tashkentTodayParts();
        const base = new Date(Date.UTC(Y, M - 1, D));
        const out = [];
        for (let i = 0; i < 14 && out.length < 7; i++) {
          const dt = new Date(base);
          dt.setUTCDate(dt.getUTCDate() + i);
          const ds = dt.toISOString().slice(0, 10);
          const evs = events.filter((e) => e.date === ds);
          const fullDay = evs.some((e) => !e.time);
          const status = fullDay ? "band" : evs.length ? "qisman" : "bosh";
          out.push({
            ds,
            wd: WD[dt.getUTCDay()],
            day: dt.getUTCDate(),
            month: MONTHS[dt.getUTCMonth()],
            status,
            today: i === 0,
          });
        }
        setDays(out);
      })
      .catch(() => setDays([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-5 pb-20">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.25em] text-slate-500">
          UCHRASHUV
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-50 sm:text-[2rem]">
          Bo&apos;sh kunlarni ko&apos;rib, uchrashuvga yoziling
        </h2>
        <p className="mt-2 flex items-center gap-2 text-[13px] text-slate-500">
          <span className="flex h-1.5 w-1.5 items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Jonli kalendar — quyidagi kunlar real bandlikka ko&apos;ra yangilanadi
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-7">
        {days === null ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-[104px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              />
            ))}
          </div>
        ) : days.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center text-[13px] text-slate-400">
            Kalendarni hozir yuklab bo&apos;lmadi.{" "}
            <a
              href={KAL_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 underline-offset-2 hover:underline"
            >
              To&apos;liq kalendarni oching
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
            {days.map((d) => {
              const st = STATUS[d.status];
              const clickable = d.status !== "band";
              const Wrapper = clickable ? "a" : "div";
              return (
                <Wrapper
                  key={d.ds}
                  {...(clickable
                    ? {
                        href: `${KAL_SITE}?kun=${d.ds}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className={`group flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all duration-300 ${
                    clickable
                      ? "cursor-pointer border-white/[0.07] bg-white/[0.02] hover:-translate-y-1 hover:border-emerald-400/30"
                      : "border-white/[0.05] bg-white/[0.015] opacity-60"
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-widest text-slate-500">
                    {d.wd}
                  </span>
                  <span className="text-lg font-semibold leading-none text-slate-100">
                    {d.day}
                  </span>
                  <span className="text-[10px] text-slate-500">{d.month}</span>
                  <span
                    className={`mt-0.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${st.cls}`}
                  >
                    {d.today ? "Bugun" : st.label}
                  </span>
                </Wrapper>
              );
            })}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.18} className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
        <p className="text-[13px] text-slate-400">
          Bo&apos;sh kunni tanlang — vaqtni belgilab, so&apos;rov yuborasiz.
          Tasdiqni Telegram orqali olasiz.
        </p>
        <a
          href={KAL_SITE}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-emerald-400 px-5 text-[13px] font-semibold text-emerald-950 transition-all duration-300 hover:bg-emerald-300"
        >
          <CalendarCheck size={16} />
          Uchrashuvga yozilish
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </Reveal>
    </section>
  );
}
