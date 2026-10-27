"use client";

import { ReadingList } from "@/components/reading-list";
import { Roster } from "@/components/roster/roster";
import { WritingList } from "@/components/writing-list";
import {
  projects,
  readings,
  rosterSlots,
  sections,
  writings,
  type SectionId,
} from "@/content/portfolio";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

function isSectionId(value: string): value is SectionId {
  return sections.some((section) => section.id === value);
}

function sectionFromHash(): SectionId | null {
  const hash = window.location.hash.replace("#", "");
  return isSectionId(hash) ? hash : null;
}

export function PortfolioTabs() {
  const [current, setCurrent] = useState<SectionId>("projetos");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollLock = useRef<number | null>(null);
  const section = sections.find((item) => item.id === current) ?? sections[0];

  useEffect(() => {
    function syncFromHash() {
      const next = sectionFromHash();
      if (next) setCurrent(next);
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // Trocar a seção remove o miolo antes de pintar o próximo. O navegador
  // encolhe a página nesse intervalo e sobe o scroll, como um atalho para o topo.
  useLayoutEffect(() => {
    const y = scrollLock.current;
    if (y === null) return;
    scrollLock.current = null;
    if (window.scrollY !== y) window.scrollTo(0, y);
  }, [current]);

  function select(id: SectionId, shouldFocus = false) {
    if (id !== current) scrollLock.current = window.scrollY;
    setCurrent(id);
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      history.replaceState(null, "", nextHash);
    }

    const index = sections.findIndex((item) => item.id === id);
    if (shouldFocus) tabRefs.current[index]?.focus({ preventScroll: true });
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = sections.length - 1;
    let next = index;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    select(sections[next].id, true);
  }

  return (
    <section id="secoes" aria-labelledby="tab-heading" className="caderno">
      <h2 id="tab-heading" className="sr-only">
        Caderno
      </h2>
      <div role="tablist" aria-label="Seções" className="tablist">
        {sections.map((item, index) => {
          const selected = item.id === current;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className="tab"
              onClick={() => select(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        key={section.id}
        id={`panel-${section.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${section.id}`}
        className="panel"
      >
        <p className="dek">{section.dek}</p>
        {section.id === "projetos" ? (
          <Roster projects={projects} slots={rosterSlots} />
        ) : null}
        {section.id === "escrituras" ? (
          <WritingList writings={writings} />
        ) : null}
        {section.id === "lendo" ? <ReadingList readings={readings} /> : null}
      </div>
    </section>
  );
}
