"use client";

import { sections, type InlinePart } from "@/content/portfolio";
import {
  anchorProps,
  guardPlaceholder,
  scrollCadernoIntoView,
} from "@/lib/links";
import type { MouseEvent } from "react";

function isSectionHref(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : "";
  return sections.some((section) => section.id === id);
}

function onInlineClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  guardPlaceholder(event, href);
  if (window.location.hash !== href || !isSectionHref(href)) return;
  event.preventDefault();
  scrollCadernoIntoView();
}

export function InlineText({ parts }: { parts: InlinePart[] }) {
  return parts.map((part, index) => {
    if (!part.href) return part.text;

    const className = part.badge ? "badge" : undefined;

    return (
      <a
        key={`${part.text}-${index}`}
        href={part.href}
        className={className}
        {...anchorProps(part.href)}
        onClick={(event) => onInlineClick(event, part.href ?? "#")}
      >
        {part.text}
      </a>
    );
  });
}
