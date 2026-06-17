"use client";

import { useEffect, useRef, useState } from "react";

const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

// Scroll-reveal: IntersectionObserver + CSS keyframe animatsiya.
// CSS transition'lar bu setupda (yuklanishda) muzlab qoladi, shuning uchun
// keyframe animatsiya ishlatamiz — u ishonchli o'ynaydi.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  as: Tag = "div",
  className = "",
  style = {},
  once = true,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const animStyle = shown
    ? {
        animation: `reveal-rise ${duration}s ${EASE_CSS} ${delay}s both`,
        "--reveal-y": `${y}px`,
      }
    : { opacity: 0 };

  return (
    <Tag ref={ref} className={className} style={{ ...style, ...animStyle }}>
      {children}
    </Tag>
  );
}
