import { describe, expect, it } from "vitest";

import { make } from "../scripts/construct/make";
import type { CrestDef } from "../scripts/crests/types";
import { repeatedPlacement, singlePlacement } from "../scripts/fixtures/repeated-placement";
import { stepsModuleSource } from "../scripts/steps-module";

const fixture: CrestDef = {
  id: "placement-fixture",
  name: { en: "Berry placements", ja: "実の置き方" },
  reading: "みのおきかた",
  romaji: "mi no okikata",
  frame: "none",
  motifs: [{ motif: "nanten", count: 84, arrangement: "single" }],
  families: [],
  build: repeatedPlacement,
  construction: { en: "Place a row of compass berries seven times.", ja: "コンパスで描いた実を七列並べます。" },
  placementBuild: {
    module: new URL("../scripts/fixtures/repeated-placement.ts", import.meta.url),
    export: "repeatedPlacement",
  },
};

describe("library placement steps", () => {
  it("keeps a smaller steps module byte-identical to the ordinary literal", async () => {
    const single = { ...fixture, build: singlePlacement };
    const construction = make(single);
    const literal = await stepsModuleSource("", { ...single, placementBuild: undefined }, construction, true);

    await expect(stepsModuleSource("", single, construction, true)).resolves.toBe(literal);
  });

  it("bundles and verifies an exact replay when the literal library construction exceeds the ceiling", async () => {
    const construction = make(fixture);
    expect(Buffer.byteLength(JSON.stringify(construction))).toBeGreaterThan(50 * 1024);
    const compact = await stepsModuleSource("", fixture, construction, true);

    expect(compact).toContain('make({ build: placement["repeatedPlacement"] })');
    expect(compact).not.toContain(JSON.stringify(construction));
    await expect(stepsModuleSource("", fixture, construction, false)).resolves.toContain(JSON.stringify(construction));
  });

  it("rejects a placement export that replays a different construction", async () => {
    const different = { ...fixture, placementBuild: { ...fixture.placementBuild!, export: "singlePlacement" } };

    await expect(stepsModuleSource("", different, make(fixture), true)).rejects.toThrow("its placement replay changed the construction");
  });
});
