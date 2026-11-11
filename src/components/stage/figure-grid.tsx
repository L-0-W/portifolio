"use client";

import { fieldLabel, type Figure } from "@/content/figures";
import Image from "next/image";
import { useRef } from "react";

export function FigureGrid({
  figures,
  selectedId,
  onPick,
}: {
  figures: readonly Figure[];
  selectedId: string | null;
  onPick: (id: string) => void;
}) {
  const scroller = useRef<HTMLUListElement>(null);

  function scrollByCard(direction: number) {
    const list = scroller.current;
    if (!list) return;
    const card = list.querySelector("li");
    const width = card?.getBoundingClientRect().width ?? 120;
    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({
      left: direction * (width + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <div className="figure-carousel">
      <button
        type="button"
        className="figure-nav"
        aria-label="Pessoas anteriores"
        onClick={() => scrollByCard(-1)}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <ul
        ref={scroller}
        className="figure-grid"
        aria-label="Pessoas da física, da matemática e da computação"
      >
        {figures.map((figure) => {
          const pressed = figure.id === selectedId;
          return (
            <li key={figure.id}>
              <button
                type="button"
                className="mast-card figure-card"
                aria-pressed={pressed}
                aria-label={`${figure.name}, ${fieldLabel[figure.field]}`}
                onClick={() => onPick(figure.id)}
              >
                {figure.src ? (
                  <Image
                    src={figure.src}
                    alt=""
                    fill
                    sizes="8rem"
                    className="mast-card-img"
                  />
                ) : null}
                <span className={figure.src ? "figure-name is-caption" : "figure-name"}>
                  {figure.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="figure-nav"
        aria-label="Próximas pessoas"
        onClick={() => scrollByCard(1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
