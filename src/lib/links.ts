import type { MouseEvent } from "react";

export const cadernoId = "secoes";

export function scrollCadernoIntoView() {
  document.getElementById(cadernoId)?.scrollIntoView({ block: "start" });
}

export function anchorProps(href: string): {
  target?: "_blank";
  rel?: string;
} {
  if (!href.startsWith("http")) return {};
  return { target: "_blank", rel: "noopener noreferrer" };
}

export function guardPlaceholder(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (href === "#") event.preventDefault();
}
