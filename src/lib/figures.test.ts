import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { figures } from "../content/figures.ts";
import {
  GLITCH_HOLD_MS,
  STREAK_CLICKS,
  STREAK_GAP_MS,
  emptyStreak,
  figureById,
  figureShown,
  keptSelection,
  rainLines,
  registerClick,
  selectFigure,
} from "./figures.ts";

describe("pessoas da grade", () => {
  it("publica dezesseis cartas, com mais computação", () => {
    assert.equal(figures.length, 16);
    const count = (field: string) => figures.filter((figure) => figure.field === field).length;
    assert.equal(count("computacao"), 9);
    assert.equal(count("fisica"), 4);
    assert.equal(count("matematica"), 3);
    const ids = new Set(figures.map((figure) => figure.id));
    assert.equal(ids.size, figures.length);
    for (const figure of figures) {
      assert.ok(figure.name.length > 0);
      assert.ok(figure.fame.length > 20);
      assert.ok(figure.fragments.length >= 4);
    }
  });

  it("guarda oito cartas na grade curta, quatro na média e quatro na cheia", () => {
    const ids = (tier: number) =>
      figures.filter((figure) => figure.tier === tier).map((figure) => figure.id);
    assert.deepEqual(ids(0), [
      "lovelace",
      "turing",
      "hopper",
      "neumann",
      "shannon",
      "dijkstra",
      "knuth",
      "newton",
    ]);
    assert.deepEqual(ids(1), ["hamilton", "berners-lee", "maxwell", "curie"]);
    assert.deepEqual(ids(2), ["feynman", "euler", "gauss", "noether"]);
  });

  it("solta a carta que a largura esconde e mantém a do carrossel", () => {
    const wide = { carousel: false, short: false, medium: false };
    const medium = { carousel: false, short: false, medium: true };
    const short = { carousel: false, short: true, medium: true };
    const carousel = { carousel: true, short: true, medium: true };
    assert.equal(figureShown(2, wide), true);
    assert.equal(figureShown(2, medium), false);
    assert.equal(figureShown(1, medium), true);
    assert.equal(figureShown(1, short), false);
    assert.equal(figureShown(0, short), true);
    assert.equal(figureShown(2, carousel), true);
    assert.equal(keptSelection(figures, "feynman", medium), null);
    assert.equal(keptSelection(figures, "newton", short), "newton");
    assert.equal(keptSelection(figures, "feynman", carousel), "feynman");
    assert.equal(keptSelection(figures, null, short), null);
  });

  it("escolhe só uma carta que existe", () => {
    assert.equal(selectFigure(figures, null, "newton"), "newton");
    assert.equal(selectFigure(figures, "newton", "turing"), "turing");
    assert.equal(selectFigure(figures, "newton", "ausente"), "newton");
    assert.equal(figureById(figures, "euler")?.name, "Leonhard Euler");
    assert.equal(figureById(figures, null), null);
    assert.equal(figureById(figures, "ausente"), null);
  });

  it("repete os fragmentos até encher a chuva", () => {
    assert.deepEqual(rainLines(["F = ma", "v = u + at"], 5), [
      "F = ma",
      "v = u + at",
      "F = ma",
      "v = u + at",
      "F = ma",
    ]);
    assert.deepEqual(rainLines([], 4), []);
    assert.deepEqual(rainLines(["bit"], 0), []);
  });
});

describe("rajada do glitch", () => {
  const t0 = 1_700_000_000_000;

  it("segura o nome por pouco mais de dois segundos", () => {
    assert.equal(GLITCH_HOLD_MS, 2200);
    assert.equal(STREAK_GAP_MS, 2000);
    assert.equal(STREAK_CLICKS, 4);
  });

  it("dispara no quarto clique rápido e zera a contagem", () => {
    let streak = emptyStreak;
    let fire = false;
    for (let step = 0; step < 3; step += 1) {
      const next = registerClick(streak, "newton", t0 + step * 180);
      streak = next.streak;
      fire = next.fire;
    }
    assert.equal(fire, false);
    assert.equal(streak.count, 3);
    assert.equal(streak.id, "newton");

    const fourth = registerClick(streak, "newton", t0 + 540);
    assert.equal(fourth.fire, true);
    assert.deepEqual(fourth.streak, emptyStreak);

    const again = registerClick(fourth.streak, "newton", t0 + 700);
    assert.equal(again.fire, false);
    assert.equal(again.streak.count, 1);
  });

  it("dois cliques e uma pausa de dois segundos recomeçam do um", () => {
    const first = registerClick(emptyStreak, "turing", t0);
    const second = registerClick(first.streak, "turing", t0 + 400);
    assert.equal(second.fire, false);
    assert.equal(second.streak.count, 2);

    const late = registerClick(second.streak, "turing", t0 + 400 + STREAK_GAP_MS);
    assert.equal(late.fire, false);
    assert.equal(late.streak.count, 1);
    assert.equal(late.streak.id, "turing");
  });

  it("ainda conta o clique que chega um instante antes da pausa", () => {
    const streak = { id: "shannon", count: 3, lastAt: t0 };
    const next = registerClick(streak, "shannon", t0 + STREAK_GAP_MS - 1);
    assert.equal(next.fire, true);
  });

  it("trocar de carta zera a rajada", () => {
    const streak = { id: "newton", count: 3, lastAt: t0 };
    const next = registerClick(streak, "knuth", t0 + 120);
    assert.equal(next.fire, false);
    assert.equal(next.streak.id, "knuth");
    assert.equal(next.streak.count, 1);
  });
});
