import { Compass, Clapperboard, TrendingUp } from "lucide-react";

// 90 kunlik yo'l: timeline.start / timeline.end — foiz (%) sifatida
export const JOURNEY_DAYS = 90;

export const TELEGRAM_URL = "https://t.me/sp_business_agency";

export const STATIONS = [
  {
    id: 1,
    code: "01",
    title: "Strategiya tuzish",
    tagline: "Avval tushunamiz, keyin harakat",
    description:
      "Siz bilan uchrashib, strategiya tuzish uchun kerak bo'lgan savollarga javob olamiz. Strategiya tuzib olib, tasdiqlaganingizdan keyin keyingi bosqichga o'tamiz.",
    icon: Compass,
    accent: "#2dd4bf",
    subSteps: [
      "Brifing — sizni va maqsadingizni eshitamiz",
      "Raqobat va auditoriya tahlili",
      "Brend pozitsiyasi va taklif",
      "Kontent yo'nalishi va KPI",
    ],
    clientInput: "2 ta uchrashuv",
    time: { label: "7–10 kun", detail: "1–10-kunlar" },
    timeline: { start: 0, end: 11 },
    budget: [
      { label: "Strateg-tahlilchi", value: 50 },
      { label: "Tadqiqot vositalari", value: 30 },
      { label: "Raqobat ma'lumotlari", value: 20 },
    ],
    safety: {
      percent: 96,
      reason:
        "Tahlilsiz hech narsa boshlanmaydi — pulingiz taxminga emas, ma'lumotga tayanadi.",
    },
  },
  {
    id: 2,
    code: "02",
    title: "Kontent ishlab chiqarish",
    tagline: "Sahifangiz siz ishlamasangiz ham ishlaydi",
    description: null,
    icon: Clapperboard,
    accent: "#38bdf8",
    subSteps: [
      "Kontent-plan va ssenariylar",
      "Syomka",
      "Montaj",
      "Joylash va tarqatish",
    ],
    clientInput: "Oyiga 1–2 soat — faqat tasdiqlash",
    time: { label: "Oylik uzluksiz sikl", detail: "11-kundan boshlab doimiy" },
    timeline: { start: 12, end: 95 },
    budget: [
      { label: "Prodakshn jamoasi", value: 50 },
      { label: "Texnika va studiya", value: 25 },
      { label: "Reklama va tarqatish", value: 25 },
    ],
    safety: {
      percent: 95,
      reason:
        "Har bir kontent sizning tasdig'ingizdan o'tadi — brendingizga zid narsa chiqmaydi.",
    },
  },
  {
    id: 3,
    code: "03",
    title: "O'sish nuqtasini aniqlash",
    tagline: "Raqamlar nima ishlaganini aytadi",
    description:
      "Oy oxirida analiz qilamiz va keyingi kontent-planlarni aniqlashtirib, yanada aniqroq ishlashni boshlaymiz.",
    icon: TrendingUp,
    accent: "#fbbf24",
    subSteps: [
      "Oylik analitika — nima ishladi, nima yo'q",
      "O'sish nuqtasini topish",
      "Tahlil asosida keyingi oy kontent-plani",
    ],
    clientInput: "Oyiga 1 hisobot uchrashuvi",
    time: { label: "Har oy yakunida", detail: "30-kundan boshlab, har oy" },
    timeline: { start: 33, end: 100 },
    budget: [
      { label: "Analitik mutaxassis", value: 50 },
      { label: "Hisobot tizimlari", value: 30 },
      { label: "Strategiya yangilash", value: 20 },
    ],
    safety: {
      percent: 99,
      reason:
        "Pulingiz nima olib kelganini har oy ochiq raqamlarda ko'rasiz. Ishlamagani to'xtatiladi, ishlagani kuchaytiriladi.",
    },
  },
];

export const CLIENTS = [
  { name: "Zumarbooks", niche: "kitob do'koni" },
  { name: "Khusniddin Razikov", niche: "meditsina" },
  { name: "ADS UZ", niche: "poligrafiya" },
  { name: "Asoschilar Club", niche: "biznes jamoasi" },
  { name: "Nur Brand", niche: "kiyim do'koni" },
];

// views: null — raqam mijozdan kelgach qo'yiladi
export const PORTFOLIO = [
  {
    type: "youtube",
    href: "https://youtu.be/Y6Bt9pp4rqQ",
    title: "Suv ichish haqida ulkan yolg'on",
    client: "Hayot Balansi — Khusniddin Razikov",
    views: "98 412",
    thumb: "https://i.ytimg.com/vi/Y6Bt9pp4rqQ/hqdefault.jpg",
  },
  {
    type: "reels",
    href: "https://www.instagram.com/reels/C-meyckuRPG/",
    title: "Reels namunasi",
    client: "Instagram loyihasi",
    views: null,
    thumb: null,
  },
  {
    type: "reels",
    href: "https://www.instagram.com/reels/DTHqb-yjGz0/",
    title: "Reels namunasi",
    client: "Instagram loyihasi",
    views: null,
    thumb: null,
  },
  {
    type: "reels",
    href: "https://www.instagram.com/reels/DT5bxTujb3e/",
    title: "Reels namunasi",
    client: "Instagram loyihasi",
    views: null,
    thumb: null,
  },
  {
    type: "reels",
    href: "https://www.instagram.com/reels/DVbFMMvjJlE/",
    title: "Reels namunasi",
    client: "Instagram loyihasi",
    views: null,
    thumb: null,
  },
  {
    type: "reels",
    href: "https://www.instagram.com/reels/DVtNrwRiHRJ/",
    title: "Reels namunasi",
    client: "Instagram loyihasi",
    views: null,
    thumb: null,
  },
  {
    type: "reels",
    href: "https://www.instagram.com/reels/DYXWXFhi8-I/",
    title: "Reels namunasi",
    client: "Instagram loyihasi",
    views: null,
    thumb: null,
  },
];
