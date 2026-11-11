export const GLITCH_HOLD_MS = 2200;
export const STREAK_GAP_MS = 2000;
export const STREAK_CLICKS = 4;

export type ClickStreak = {
  id: string | null;
  count: number;
  lastAt: number;
};

export const emptyStreak: ClickStreak = { id: null, count: 0, lastAt: 0 };

export function registerClick(
  streak: ClickStreak,
  id: string,
  now: number,
): { streak: ClickStreak; fire: boolean } {
  const continues =
    streak.id === id && streak.count > 0 && now - streak.lastAt < STREAK_GAP_MS;
  const count = continues ? streak.count + 1 : 1;
  if (count >= STREAK_CLICKS) {
    return { streak: emptyStreak, fire: true };
  }
  return { streak: { id, count, lastAt: now }, fire: false };
}

export function selectFigure<T extends { id: string }>(
  figures: readonly T[],
  currentId: string | null,
  nextId: string,
): string | null {
  if (!figures.some((figure) => figure.id === nextId)) return currentId;
  return nextId;
}

export function figureById<T extends { id: string }>(
  figures: readonly T[],
  id: string | null,
): T | null {
  if (!id) return null;
  return figures.find((figure) => figure.id === id) ?? null;
}

export type FigureShelf = {
  carousel: boolean;
  short: boolean;
  medium: boolean;
};

export function figureShown(tier: 0 | 1 | 2, shelf: FigureShelf): boolean {
  if (shelf.carousel) return true;
  if (shelf.short) return tier === 0;
  if (shelf.medium) return tier < 2;
  return true;
}

export function keptSelection<T extends { id: string; tier: 0 | 1 | 2 }>(
  figures: readonly T[],
  selectedId: string | null,
  shelf: FigureShelf,
): string | null {
  if (!selectedId) return null;
  const figure = figures.find((item) => item.id === selectedId);
  if (!figure || !figureShown(figure.tier, shelf)) return null;
  return selectedId;
}

export function rainLines(fragments: readonly string[], count: number): string[] {
  if (fragments.length === 0 || count <= 0) return [];
  return Array.from({ length: count }, (_, index) => {
    const line = fragments[index % fragments.length];
    return line ?? "";
  });
}
