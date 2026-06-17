// Umumiy motion tili — barcha komponentlar shu tokenlardan foydalanadi.
// Maqsad: bir xil, "premium" his beruvchi sekin-tezlanish egri chiziqlari.

// Expo-out: kuchli start, yumshoq to'xtash — kirish animatsiyalari uchun
export const EASE = [0.22, 1, 0.36, 1];
// Yumshoq quintic-out — kichik mikro-harakatlar uchun
export const EASE_SOFT = [0.33, 1, 0.68, 1];
// Simmetrik in-out — kamera/zum uchun
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

// Yagona brend aksenti (o'sish = emerald). Rang intizomi: kamalak yo'q.
export const ACCENT = "#34d399";
// A nuqta (joriy holat) va B nuqta (maqsad) — ma'noli, muloyim ikkilamchi ranglar
export const COLOR_START = "#fb7185"; // muted rose — hozirgi tartibsizlik
export const COLOR_GOAL = "#e3b873"; // muted gold — maqsad

// Byudjet donuti uchun emerald tonal ramp (oilada qoladi, lekin ajraladi)
export const RAMP = ["#6ee7b7", "#2dd4bf", "#0d9488"];

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

// Ota konteyner — bolalarni navbatma-navbat ochadi
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// whileInView uchun umumiy ko'rinish sozlamasi
export const inView = { once: true, margin: "-80px" };
