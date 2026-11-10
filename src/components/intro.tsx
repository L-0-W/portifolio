"use client";

import { InlineText } from "@/components/inline-text";
import { SocialLinks } from "@/components/social-links";
import { FigureGrid } from "@/components/stage/figure-grid";
import { FragmentRain } from "@/components/stage/fragment-rain";
import { figures } from "@/content/figures";
import { profile } from "@/content/portfolio";
import {
  GLITCH_HOLD_MS,
  STREAK_GAP_MS,
  emptyStreak,
  figureById,
  registerClick,
  selectFigure,
  type ClickStreak,
} from "@/lib/figures";
import { useEffect, useRef, useState } from "react";

export function Intro() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [glitch, setGlitch] = useState<{ id: string; token: number } | null>(null);
  const streak = useRef<ClickStreak>(emptyStreak);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!glitch) return;
    const timer = window.setTimeout(() => setGlitch(null), GLITCH_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [glitch]);

  function onPick(id: string) {
    setSelectedId((current) => selectFigure(figures, current, id));
    const now = Date.now();
    const result = registerClick(streak.current, id, now);
    streak.current = result.streak;
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
    if (result.fire) {
      setGlitch((current) => ({ id, token: (current?.token ?? 0) + 1 }));
      return;
    }
    resetTimer.current = window.setTimeout(() => {
      streak.current = emptyStreak;
      resetTimer.current = null;
    }, STREAK_GAP_MS);
  }

  const shown = glitch ? figureById(figures, glitch.id) : null;
  const selected = figureById(figures, selectedId);

  return (
    <>
      <FragmentRain figure={selected} />
      <header className={shown ? "intro plate-hero mast is-glitching" : "intro plate-hero mast"}>
        <div className="poster-slot">
          <FigureGrid figures={figures} selectedId={selectedId} onPick={onPick} />
        </div>
        <div className="plate-copy">
          <p className="mast-kicker">{profile.kicker}</p>
          <ul className="stickers" aria-label="Ofício">
            {profile.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="bio">
            {shown ? (
              <p>{shown.fame}</p>
            ) : (
              profile.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  <InlineText parts={paragraph} />
                </p>
              ))
            )}
          </div>
          <div className="plate-foot">
            <p className="mast-trade">{profile.trade}</p>
            <h1 className="plate-name">{shown?.name ?? profile.name}</h1>
            <SocialLinks />
          </div>
        </div>
      </header>
    </>
  );
}
