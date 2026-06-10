"use client";

import { useEffect, useState } from "react";

export function useIsDesktop() {
  const [state, setState] = useState({ mounted: false, isDesktop: true });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setState({ mounted: true, isDesktop: mq.matches });
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return state;
}
