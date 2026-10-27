export const pointerSelectors = {
  textual: "input, textarea, select, [contenteditable='true']",
  forbidden: ":disabled, [aria-disabled='true'], .is-closed",
  interactive:
    "a, button, summary, label, [role='button'], [role='tab'], [role='link']",
} as const;

export type PointerChrome = "custom" | "native";
export type PointerState = "default" | "pointer";

export type CursorHit = {
  textual: boolean;
  forbidden: boolean;
  interactive: boolean;
};

const native = { chrome: "native", state: "default" } as const;

export function hitFromClosest(
  matches: (selector: string) => boolean,
): CursorHit {
  return {
    textual: matches(pointerSelectors.textual),
    forbidden: matches(pointerSelectors.forbidden),
    interactive: matches(pointerSelectors.interactive),
  };
}

export function pointerChrome(hit: CursorHit): {
  chrome: PointerChrome;
  state: PointerState;
} {
  if (hit.textual || hit.forbidden) return native;
  if (hit.interactive) return { chrome: "custom", state: "pointer" };
  return { chrome: "custom", state: "default" };
}

export function shouldUseSitePointer(input: {
  pointerType: string;
  forcedColors: boolean;
}): boolean {
  return input.pointerType === "mouse" && !input.forcedColors;
}
