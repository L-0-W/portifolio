import type { Figure } from "@/content/figures";
import { rainLines } from "@/lib/figures";
import type { CSSProperties } from "react";

const RAIN_COUNT = 8;

export function FragmentRain({ figure }: { figure: Figure | null }) {
  if (!figure) return null;

  const lines = rainLines(figure.fragments, RAIN_COUNT);

  return (
    <div className="fragment-rain" aria-hidden="true">
      {lines.map((line, index) => (
        <span
          key={`${figure.id}-${index}`}
          className="fragment"
          style={
            {
              left: `${4 + ((index * 12) % 86)}%`,
              animationDuration: `${11 + (index % 4) * 1.7}s`,
              animationDelay: `${-index * 1.45}s`,
              opacity: 0.16 + (index % 3) * 0.05,
              "--i": index,
            } as CSSProperties
          }
        >
          {line}
        </span>
      ))}
    </div>
  );
}
