"use client";

import { useEffect, useRef, useState } from "react";

const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

// Scroll-reveal: IntersectionObserver + CSS transition.
// Framer-motion'ning whileInView'i bu setupda ishonchsiz, shuning uchun
// barcha scroll-reveal'lar shu komponent orqali beriladi.
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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}s ${EASE_CSS} ${delay}s, transform ${duration}s ${EASE_CSS} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
