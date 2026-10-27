import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hitFromClosest,
  pointerChrome,
  pointerSelectors,
  shouldUseSitePointer,
} from "./pointer.ts";

describe("ponteiro", () => {
  it("desenha a seta comum fora de controle", () => {
    assert.deepEqual(
      pointerChrome({ textual: false, forbidden: false, interactive: false }),
      { chrome: "custom", state: "default" },
    );
  });

  it("inverte a seta em link e botão", () => {
    assert.deepEqual(
      pointerChrome({ textual: false, forbidden: false, interactive: true }),
      { chrome: "custom", state: "pointer" },
    );
  });

  it("devolve o cursor nativo em texto e em controle fechado", () => {
    assert.deepEqual(
      pointerChrome({ textual: true, forbidden: false, interactive: true }),
      { chrome: "native", state: "default" },
    );
    assert.deepEqual(
      pointerChrome({ textual: false, forbidden: true, interactive: true }),
      { chrome: "native", state: "default" },
    );
  });

  it("consulta o alvo mockado na ordem texto, fechado, interativo", () => {
    const seen: string[] = [];
    const hit = hitFromClosest((selector) => {
      seen.push(selector);
      return selector === pointerSelectors.interactive;
    });

    assert.deepEqual(seen, [
      pointerSelectors.textual,
      pointerSelectors.forbidden,
      pointerSelectors.interactive,
    ]);
    assert.deepEqual(pointerChrome(hit), { chrome: "custom", state: "pointer" });
  });

  it("só liga a seta no mouse e fora do alto contraste", () => {
    assert.equal(
      shouldUseSitePointer({ pointerType: "mouse", forcedColors: false }),
      true,
    );
    assert.equal(
      shouldUseSitePointer({ pointerType: "touch", forcedColors: false }),
      false,
    );
    assert.equal(
      shouldUseSitePointer({ pointerType: "pen", forcedColors: false }),
      false,
    );
    assert.equal(
      shouldUseSitePointer({ pointerType: "mouse", forcedColors: true }),
      false,
    );
  });
});
