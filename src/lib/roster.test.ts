import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  craftMarks,
  posterIds,
  projects,
  rosterSlots,
} from "../content/portfolio.ts";
import {
  buildRoster,
  initialSelection,
  selectRoster,
  selectedProject,
} from "./roster.ts";

describe("elenco", () => {
  const items = buildRoster(projects, rosterSlots);

  it("publica só o portal", () => {
    assert.deepEqual(
      items.map((item) => item.id),
      ["portal-administrativo"],
    );
    for (const project of projects) {
      const found = items.find((item) => item.id === project.slug);
      assert.equal(found?.kind, "project");
    }
  });

  it("abre no projeto marcado como novo", () => {
    assert.equal(initialSelection(items), "portal-administrativo");
    const fresh = items.filter((item) => item.kind === "project" && item.fresh);
    assert.deepEqual(
      fresh.map((item) => item.id),
      ["portal-administrativo"],
    );
  });

  it("troca só entre projetos abertos", () => {
    const portal = projects[0];
    const mixed = buildRoster(
      [
        { ...portal, slug: "um" },
        { ...portal, slug: "dois", mark: undefined },
      ],
      [
        { kind: "project", slug: "um" },
        { kind: "project", slug: "dois" },
        { kind: "held", id: "gaveta", title: "Gaveta" },
        { kind: "sealed", id: "reserva" },
      ],
    );
    assert.equal(selectRoster(mixed, "um", "dois"), "dois");
    assert.equal(selectRoster(mixed, "dois", "um"), "um");
    assert.equal(selectRoster(mixed, "um", "gaveta"), "um");
    assert.equal(selectRoster(mixed, "um", "reserva"), "um");
    assert.equal(selectRoster(mixed, "um", "ausente"), "um");
    assert.equal(selectedProject(items, "portal-administrativo").title, "Portal Administrativo");
  });

  it("recusa um slug que não está no caderno", () => {
    assert.throws(() =>
      buildRoster(projects, [{ kind: "project", slug: "ausente" }]),
    );
  });

  it("dá três atributos, quatro ofícios e um poster a cada projeto", () => {
    for (const project of projects) {
      assert.deepEqual(new Set(project.tags).size, 3, project.slug);
      for (const tag of project.tags) assert.ok(tag.trim(), project.slug);
      assert.equal(project.marks.length, 4, project.slug);
      for (const mark of project.marks) {
        assert.ok(craftMarks.includes(mark), mark);
      }
      assert.ok(posterIds.includes(project.poster), project.poster);
    }
  });
});
