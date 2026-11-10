"use client";

import { fieldLabel, type Figure } from "@/content/figures";
import Image from "next/image";

export function FigureGrid({
  figures,
  selectedId,
  onPick,
}: {
  figures: readonly Figure[];
  selectedId: string | null;
  onPick: (id: string) => void;
}) {
  return (
    <ul className="figure-grid" aria-label="Pessoas da física, da matemática e da computação">
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
  );
}
