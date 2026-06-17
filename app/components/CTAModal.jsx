"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  AtSign,
  Building2,
  CheckCircle2,
  ChevronLeft,
  Lock,
  Phone,
  Send,
  Target,
  UserCheck,
  Wallet,
  X,
} from "lucide-react";
import { TELEGRAM_URL } from "./stations";
import { EASE } from "../lib/motion";

const INDUSTRIES = [
  "Savdo / Retail",
  "Xizmatlar",
  "HoReCa",
  "Ta'lim",
  "Ishlab chiqarish",
  "Boshqa",
];
const GOALS = [
  "Savdoni oshirish",
  "Brend tanilishi",
  "Lidlar oqimi",
  "Kompleks o'sish",
];
const BUDGETS = ["$300–500", "$500–1000", "$1000–2500", "$2500+"];
const CALL_TIMES = ["Ertalab", "Tushdan keyin", "Kechqurun"];

const EMPTY_FORM = {
  company: "",
  industry: "",
  instagram: "",
  goal: "",
  budget: "",
  name: "",
  phone: "",
  callTime: "",
};

function buildTelegramLink(form) {
  const lines = [
    "Assalomu alaykum! O'N yo'l xaritasi sayti orqali yozyapman.",
    `Kompaniya: ${form.company}${form.industry ? ` (${form.industry})` : ""}`,
    form.instagram ? `Instagram: ${form.instagram}` : null,
    `Maqsad: ${form.goal} · Byudjet: ${form.budget}`,
    `Ism: ${form.name} · Tel: ${form.phone}`,
    form.callTime ? `Qulay vaqt: ${form.callTime}` : null,
  ].filter(Boolean);
  return `${TELEGRAM_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
        selected
          ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
          : "border-white/[0.1] bg-white/[0.04] text-slate-300 hover:border-white/25"
      }`}
    >
      {label}
    </button>
  );
}

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon
        size={15}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
      />
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.06]"
      />
    </div>
  );
}

const STEP_TITLES = ["Biznesingiz haqida", "Maqsad va byudjet", "Bog'lanish"];

export default function CTAModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [tgLink, setTgLink] = useState(TELEGRAM_URL);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Modal yopilgach formani toza holatga qaytaramiz
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStep(0);
      setSubmitted(false);
      setForm(EMPTY_FORM);
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const stepValid = [
    form.company.trim().length > 1 && form.industry,
    form.goal && form.budget,
    form.name.trim().length > 1 && form.phone.trim().length >= 7,
  ][step];

  const next = () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    const link = buildTelegramLink(form);
    setTgLink(link);
    window.open(link, "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4">
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative my-6 w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-[#0a0f12] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

            <div className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-400"
                  >
                    <CheckCircle2 size={34} />
                  </motion.span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-50">
                    Telegram ochildi!
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
                    Xabar tayyor holda turibdi — yuborish tugmasini bossangiz
                    kifoya. Muallif tez orada javob beradi.
                  </p>
                  <a
                    href={tgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex h-11 items-center gap-2 rounded-full bg-emerald-400 px-6 text-[13px] font-semibold text-emerald-950 transition hover:bg-emerald-300"
                  >
                    <Send size={15} />
                    Telegram ochilmadimi? Bu yerni bosing
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
                  >
                    Xaritaga qaytish
                  </button>
                </div>
              ) : (
                <>
                  {/* Sarlavha + qadam indikatori */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[10px] font-semibold tracking-[0.25em] text-emerald-400">
                        BEPUL KONSULTATSIYA
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-50">
                        {STEP_TITLES[step]}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Yopish"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mt-4 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                      >
                        <motion.div
                          className="h-full rounded-full bg-emerald-400"
                          initial={false}
                          animate={{ width: i <= step ? "100%" : "0%" }}
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 min-h-64">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -28 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="space-y-4"
                      >
                        {step === 0 && (
                          <>
                            <Field
                              icon={Building2}
                              placeholder="Kompaniya nomi *"
                              value={form.company}
                              onChange={(e) => set("company")(e.target.value)}
                            />
                            <div>
                              <p className="mb-2 text-[11px] font-medium text-slate-500">
                                Faoliyat sohasi *
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {INDUSTRIES.map((ind) => (
                                  <Chip
                                    key={ind}
                                    label={ind}
                                    selected={form.industry === ind}
                                    onClick={() => set("industry")(ind)}
                                  />
                                ))}
                              </div>
                            </div>
                            <Field
                              icon={AtSign}
                              placeholder="Instagram sahifangiz (ixtiyoriy)"
                              value={form.instagram}
                              onChange={(e) => set("instagram")(e.target.value)}
                            />
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <div>
                              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                <Target size={12} />
                                Asosiy maqsadingiz *
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {GOALS.map((g) => (
                                  <Chip
                                    key={g}
                                    label={g}
                                    selected={form.goal === g}
                                    onClick={() => set("goal")(g)}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                <Wallet size={12} />
                                Oylik marketing byudjeti *
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {BUDGETS.map((b) => (
                                  <Chip
                                    key={b}
                                    label={b}
                                    selected={form.budget === b}
                                    onClick={() => set("budget")(b)}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <>
                            <Field
                              icon={UserCheck}
                              placeholder="Ismingiz *"
                              value={form.name}
                              onChange={(e) => set("name")(e.target.value)}
                            />
                            <Field
                              icon={Phone}
                              type="tel"
                              placeholder="+998 __ ___ __ __ *"
                              value={form.phone}
                              onChange={(e) => set("phone")(e.target.value)}
                            />
                            <div>
                              <p className="mb-2 text-[11px] font-medium text-slate-500">
                                Qo&apos;ng&apos;iroq uchun qulay vaqt
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {CALL_TIMES.map((t) => (
                                  <Chip
                                    key={t}
                                    label={t}
                                    selected={form.callTime === t}
                                    onClick={() => set("callTime")(t)}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigatsiya */}
                  <div className="mt-5 flex items-center gap-3">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="flex h-12 items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 text-xs font-medium text-slate-300 transition hover:border-white/25"
                      >
                        <ChevronLeft size={15} />
                        Orqaga
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={next}
                      disabled={!stepValid}
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-400 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500"
                    >
                      {step === 2 ? (
                        <>
                          Telegram&apos;da yuborish
                          <Send size={15} />
                        </>
                      ) : (
                        <>
                          Davom etish
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
                    <Lock size={10} />
                    Ma&apos;lumotlaringiz uchinchi tomonga berilmaydi
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
