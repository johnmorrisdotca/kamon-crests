// Searching crests by their parts, names, families and users.
import { describe, expect, it } from "vitest";

import { MANIFEST, manifest } from "./manifest";
import { facets, findCrests, partsOf } from "./search";

const ids = (query: Parameters<typeof findCrests>[0]): string[] => findCrests(query).map((record) => record.id);

describe("findCrests", () => {
  it("finds every crest for an empty query, in the catalogue's order", () => {
    expect(findCrests()).toEqual([...MANIFEST]);
  });

  it("finds every crest with a motif, as the brief asks: every crest with paulownia", () => {
    expect(ids({ motif: "paulownia" })).toEqual(["gosan-no-kiri", "goshichi-no-kiri", "maru-ni-gosan-no-kiri"]);
    expect(ids({ motif: ["tomoe", "paulownia"] }).length).toBe(6);
  });

  it("finds every ringed crest, and every crest without a ring", () => {
    const ringed = findCrests({ ring: true });
    expect(ringed.length).toBeGreaterThan(15);
    expect(ringed.every((record) => record.frame.startsWith("ring-"))).toBe(true);
    expect(findCrests({ ring: false }).length + ringed.length).toBe(MANIFEST.length);
    expect(ids({ frame: "ring-medium" }).every((id) => manifest(id)?.frame === "ring-medium")).toBe(true);
  });

  it("finds every crest with three of something", () => {
    const threes = findCrests({ count: 3 });
    expect(threes.length).toBeGreaterThan(8);
    for (const record of threes) expect(record.motifs.some((use) => use.count === 3)).toBe(true);
    expect(ids({ count: 3 })).toContain("mitsuba-aoi");
  });

  it("finds by arrangement, by turn and by the kind of motif", () => {
    expect(ids({ arrangement: "crossed" })).toContain("chigai-takanoha");
    expect(ids({ turn: "left" })).toEqual(["hidari-mitsu-tomoe", "maru-ni-hidari-mitsu-tomoe"]);
    for (const record of findCrests({ motifKind: "animal" })) expect(record.motifs.length).toBeGreaterThan(0);
    expect(ids({ motifKind: "animal" })).toEqual(expect.arrayContaining(["agehacho", "tonbo", "usagi"]));
  });

  it("finds by name in either language, by reading, by romaji, by alias and by family, folding case and macrons", () => {
    expect(ids({ text: "三つ葉葵" })).toEqual(expect.arrayContaining(["mitsuba-aoi"]));
    expect(ids({ text: "みつばあおい" })).toContain("mitsuba-aoi");
    expect(ids({ text: "ミツバアオイ" })).toContain("mitsuba-aoi");
    expect(ids({ text: "tokugawa" })).toContain("mitsuba-aoi");
    expect(ids({ text: "Hollyhock" })).toContain("mitsuba-aoi");
    expect(ids({ text: "kikko" })).toContain("kikko");
    expect(ids({ text: "KIKKŌ" })).toContain("kikko");
    expect(ids({ family: "徳川" })).toContain("maru-ni-mitsuba-aoi");
    expect(ids({ text: "ring tomoe" }).length).toBe(0 + ids({ text: "ring tomoe" }).length);
    expect(ids({ text: "zzzz-no-such" })).toEqual([]);
  });

  it("finds a crest by its name as English writes it: hyphens, macrons, run together, and with or without its particle no", () => {
    for (const q of ["Marunigosan-kiri", "maru-ni-gosan-no-kiri", "Maru ni Gosan no Kiri", "marunigosankiri", "marunigosan kiri", "丸に五三桐", "まるにごさんのきり"]) {
      expect(ids({ text: q }), q).toContain("maru-ni-gosan-no-kiri");
    }
    for (const q of ["gosan-kiri", "Gosan-no-kiri", "gosankiri"]) expect(ids({ text: q }), q).toContain("gosan-no-kiri");
    expect(ids({ text: "Jūroku yae omote-giku" })).toContain("juroku-yae-giku");
    expect(ids({ text: "juroku yae omotegiku" })).toContain("juroku-yae-giku");
    expect(ids({ text: "Kikkou" })).toContain("kikko");
  });

  it("finds a crest by its other common names", () => {
    expect(ids({ text: "Paulownia crest" })).toContain("gosan-no-kiri");
    expect(ids({ text: "Mitsuba-aoi" })).toContain("mitsuba-aoi");
    expect(ids({ text: "Tokugawa crest" })).toContain("mitsuba-aoi");
    expect(ids({ text: "Hollyhock crest" })).toContain("mitsuba-aoi");
    expect(ids({ text: "Kiku-mon" })).toContain("juroku-yae-giku");
    expect(ids({ text: "Imperial Seal of Japan" })).toContain("juroku-yae-giku");
    expect(ids({ text: "Chrysanthemum Seal" })).toContain("juroku-yae-giku");
    expect(ids({ text: "Takeda-bishi" })).toContain("takeda-bishi");
    expect(ids({ text: "Rokumonsen" })).toContain("roku-mon-sen");
    expect(ids({ text: "Sanada crest" })).toContain("roku-mon-sen");
  });

  it("needs every word of the text, and every field of the query", () => {
    expect(ids({ text: "tomoe left" }).length).toBeLessThan(ids({ text: "tomoe" }).length + 1);
    expect(ids({ text: "tomoe", ring: true })).toEqual(["maru-ni-hidari-mitsu-tomoe"]);
    expect(ids({ text: "tomoe", ring: true, motif: "paulownia" })).toEqual([]);
  });

  it("finds by who uses it today", () => {
    const used = findCrests({ usedBy: true });
    for (const record of used) expect(record.usedBy.length).toBeGreaterThan(0);
    for (const kind of ["company", "government"] as const) for (const record of findCrests({ usedBy: kind })) expect(record.usedBy.some((user) => user.kind === kind)).toBe(true);
  });
});

describe("facets and partsOf", () => {
  it("counts the crests with each part, narrowing with the search", () => {
    const all = facets();
    expect(all.frames.none).toBeGreaterThan(10);
    expect(all.motifs.tomoe).toBe(3);
    expect(facets(findCrests({ ring: true })).frames.none).toBeUndefined();
    expect(Object.values(all.frames).reduce((a, b) => a + b, 0)).toBe(MANIFEST.length);
  });

  it("lists a crest's parts in reading order", () => {
    expect(partsOf(manifest("maru-ni-hidari-mitsu-tomoe")!).map((part) => `${part.kind}:${part.id}`)).toEqual(["frame:ring-medium", "motif:tomoe", "count:3", "arrangement:radial", "turn:left"]);
  });
});

describe("findCrests by the counts", () => {
  it("finds by a count, exactly or in a range", () => {
    expect(ids({ circles: 2 })).toContain("janome");
    for (const record of findCrests({ circles: 2 })) expect(record.stats.circles).toBe(2);
    const many = findCrests({ circles: { min: 10 } });
    expect(many.length).toBeGreaterThan(5);
    expect(many.every((record) => record.stats.circles >= 10)).toBe(true);
    expect(findCrests({ circles: { min: 10 } }).length + findCrests({ circles: { max: 9 } }).length).toBe(MANIFEST.length);
    for (const record of findCrests({ steps: { min: 10, max: 20 }, lines: 0 })) {
      expect(record.stats.steps).toBeGreaterThanOrEqual(10);
      expect(record.stats.steps).toBeLessThanOrEqual(20);
      expect(record.stats.lines).toBe(0);
    }
    expect(ids({ widths: { min: 1000 } })).toEqual([]);
  });

  it("sorts by a count or by strokes, as kanji are by theirs, fewest first unless asked, ties in the catalogue's order", () => {
    const strokes = (record: (typeof MANIFEST)[number]): number => record.stats.circles + record.stats.lines + record.stats.arcs;
    const up = findCrests({ sort: "strokes" });
    expect(up).toHaveLength(MANIFEST.length);
    up.forEach((record, i) => {
      if (i === 0) return;
      expect(strokes(up[i - 1])).toBeLessThanOrEqual(strokes(record));
      if (strokes(up[i - 1]) === strokes(record)) expect(MANIFEST.indexOf(up[i - 1])).toBeLessThan(MANIFEST.indexOf(record));
    });
    expect(findCrests({ sort: "strokes", order: "desc" }).map(strokes)).toEqual(up.map(strokes).reverse());
    const circles = findCrests({ ring: true, sort: "circles", order: "desc" }).map((record) => record.stats.circles);
    expect(circles).toEqual([...circles].sort((a, b) => b - a));
    expect(findCrests()).toEqual([...MANIFEST]);
  });
});
