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
