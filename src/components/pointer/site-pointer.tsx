"use client";

import {
  hitFromClosest,
  pointerChrome,
  shouldUseSitePointer,
} from "@/lib/pointer";
import { useEffect, useRef } from "react";

function readHit(target: EventTarget | null) {
  if (!(target instanceof Element)) return hitFromClosest(() => false);
  return hitFromClosest((selector) => target.closest(selector) !== null);
}

export function SitePointer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const forced = window.matchMedia("(forced-colors: active)");

    const hide = () => {
      delete node.dataset.live;
    };

    // A posição muda a cada movimento. Estado do React repintaria a árvore.
    const follow = (event: PointerEvent) => {
      if (
        !shouldUseSitePointer({
          pointerType: event.pointerType,
          forcedColors: forced.matches,
        })
      ) {
        hide();
        return;
      }

      const choice = pointerChrome(readHit(event.target));
      if (choice.chrome !== "custom") {
        hide();
        return;
      }

      node.dataset.live = "on";
      node.dataset.state = choice.state;
      node.style.setProperty("--x", `${event.clientX}px`);
      node.style.setProperty("--y", `${event.clientY}px`);
    };

    const onModeChange = () => {
      if (forced.matches) hide();
    };

    forced.addEventListener("change", onModeChange);
    window.addEventListener("pointermove", follow, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      hide();
      forced.removeEventListener("change", onModeChange);
      window.removeEventListener("pointermove", follow);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div ref={ref} className="site-pointer" aria-hidden="true">
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
        <path d="M1.15 1.15 1.15 14.55 5.05 10.65 8.35 16.55 10.75 15.35 7.45 9.45 12.55 9.45Z" />
      </svg>
    </div>
  );
}
