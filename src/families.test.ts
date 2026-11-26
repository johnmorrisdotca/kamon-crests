// The books' order: every crest has a family, a base, a kind and a rank; the catalogue numbers are given once and never change; a frame
// variant differs from its plain twin by its frame alone; and a family's name finds the family first.
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { NUMBERS } from "../scripts/crests/numbers";
import { CHAPTERS, MANIFEST, MOTIF_FAMILIES, manifest, motifFamily, variantsOf } from "./manifest";
import type { CrestRecord, VariantKind } from "./manifest";
import { STEP_LOADERS } from "./data/loaders.data";
import { findCrests } from "./search";

const KINDS: VariantKind[] = ["base", "form", "tone", "count", "frame", "arrangement", "combination", "house"];
const at = (id: string): number => MANIFEST.findIndex((record) => record.id === id);
const record = (id: string): CrestRecord => manifest(id) as CrestRecord;
const hira = /^[ぁ-ゖー]+$/;

/** Each crest's catalogue number as it stood when the numbers were first given. A number is never changed, so this list only ever grows: a crest added later is added here with the next number. */
const SNAPSHOT: Record<string, number> = {
  "mitsuba-aoi": 1,
  "maru-ni-mitsuba-aoi": 2,
  "asa-no-ha": 3,
  "mitsu-icho": 4,
  "maru-ni-mitsu-icho": 5,
  "ume-bachi": 6,
  "maru-ni-ume-bachi": 7,
  "omodaka": 8,
  "maru-ni-omodaka": 9,
  "momiji": 10,
  "mitsu-gashiwa": 11,
  "maru-ni-mitsu-gashiwa": 12,
  "katabami": 13,
  "maru-ni-katabami": 14,
  "kikko-ni-katabami": 15,
  "kikyo": 16,
  "maru-ni-kikyo": 17,
  "juroku-yae-giku": 18,
  "maru-ni-kiku": 19,
  "gosan-no-kiri": 20,
  "goshichi-no-kiri": 21,
  "maru-ni-gosan-no-kiri": 22,
  "yamazakura": 23,
  "maru-ni-yamazakura": 24,
  "tachibana": 25,
  "maru-ni-tachibana": 26,
  "sagari-fuji": 27,
  "maru-ni-sagari-fuji": 28,
  "fuji-no-maru": 29,
  "oda-mokko": 30,
  "sasa-rindo": 31,
  "usagi": 32,
  "karigane": 33,
  "mukai-hashiai-karigane": 34,
  "chigai-takanoha": 35,
  "maru-ni-chigai-takanoha": 36,
  "chidori": 37,
  "agehacho": 38,
  "maru-ni-agehacho": 39,
  "tonbo": 40,
  "kuyo": 41,
  "maru-ni-kuyo": 42,
  "kaku-kuyo": 43,
  "shichiyo": 44,
  "maru-ni-shichiyo": 45,
  "mikazuki": 46,
  "mitsu-boshi": 47,
  "maru-ni-mitsu-boshi": 48,
  "ichimonji-mitsuboshi": 49,
  "uchiwa": 50,
  "maru-ni-uchiwa": 51,
  "ogi": 52,
  "gohonbone-ogi": 53,
  "maru-ni-gohonbone-ogi": 54,
  "hinomaru-ogi": 55,
  "kuginuki": 56,
  "maru-ni-kuginuki": 57,
  "genji-guruma": 58,
  "roku-mon-sen": 59,
  "hokake-bune": 60,
  "chigai-ya": 61,
  "yahazu": 62,
  "maru-ni-chigai-ya": 63,
  "maru-ni-yahazu": 64,
  "narabi-ya": 65,
  "maru-ni-narabi-ya": 66,
  "igeta": 67,
  "maru-ni-igeta": 68,
  "izutsu": 69,
  "maru-ni-izutsu": 70,
  "ichimonji": 71,
  "mitsu-uroko": 72,
  "maru-ni-mitsu-uroko": 73,
  "sumikiri-kaku": 74,
  "kagome": 75,
  "maru-ni-kagome": 76,
  "kikko": 77,
  "shippo": 78,
  "janome": 79,
  "jumonji": 80,
  "maru-ni-juji": 81,
  "maru-ni-jumonji": 82,
  "hidari-hitotsu-tomoe": 83,
  "migi-hitotsu-tomoe": 84,
  "hidari-futatsu-tomoe": 85,
  "migi-futatsu-tomoe": 86,
  "hidari-mitsu-tomoe": 87,
  "migi-mitsu-tomoe": 88,
  "maru-ni-hidari-mitsu-tomoe": 89,
  "maru-ni-migi-mitsu-tomoe": 90,
  "futatsu-hikiryo": 91,
  "maru-ni-hitotsu-hikiryo": 92,
  "mitsu-hikiryo": 93,
  "ni-hikiryo": 94,
  "maru-ni-mitsu-hikiryo": 95,
  "maru-ni-tate-futatsu-hikiryo": 96,
  "maru-ni-tate-mitsu-hikiryo": 97,
  "hitotsu-bishi": 98,
  "matsukawa-bishi": 99,
  "maru-ni-hitotsu-bishi": 100,
  "sangai-bishi": 101,
  "kasane-sangai-bishi": 102,
  "takeda-bishi": 103,
  "maru-ni-wari-bishi": 104,
  "hidari-manji": 105,
  "migi-manji": 106,
  "maru-ni-hidari-manji": 107,
  "yotsume-yui": 108,
  "maru-ni-sumitate-yotsume": 109,
  "hira-yotsume": 110,
  "itowa": 111,
  "hosowa": 112,
  "chuwa": 113,
  "kokumochi": 114,
  "wachigai": 115,
  "maru-ni-wachigai": 116,
};

describe("the catalogue numbers", () => {
  it("are those first given, for every crest that was numbered then", () => {
    for (const [id, no] of Object.entries(SNAPSHOT)) expect(record(id).no, id).toBe(no);
    expect(Object.keys(SNAPSHOT)).toHaveLength(116);
  });

  it("are unique, from 1, and a crest added later takes a number after those given", () => {
    const numbers = MANIFEST.map((one) => one.no);
    expect(new Set(numbers).size).toBe(MANIFEST.length);
    expect(Math.min(...numbers)).toBe(1);
    for (const one of MANIFEST) if (SNAPSHOT[one.id] === undefined) expect(one.no, one.id).toBeGreaterThan(Math.max(...Object.values(SNAPSHOT)));
  });

  it("are the ledger's, which holds a number for every crest and never uses one twice", () => {
    for (const one of MANIFEST) expect(NUMBERS[one.id], one.id).toBe(one.no);
    expect(new Set(Object.values(NUMBERS)).size).toBe(Object.keys(NUMBERS).length);
    for (const [id, no] of Object.entries(SNAPSHOT)) expect(NUMBERS[id], id).toBe(no);
  });

  it("began in the books' order: the first numbers go by chapter, family and variant, and a crest added later stands in its place among them", () => {
    const first = Object.entries(SNAPSHOT).sort((a, b) => a[1] - b[1]);
    for (let i = 1; i < first.length; i += 1) expect(at(first[i][0]), first[i][0]).toBeGreaterThan(at(first[i - 1][0]));
  });
});

describe("the families", () => {
  it("are in the books' order: by chapter, then by the reading of the name, gojūon", () => {
    const collator = new Intl.Collator("ja");
    const chapters = CHAPTERS.map((chapter) => chapter.id);
    for (let i = 1; i < MOTIF_FAMILIES.length; i += 1) {
      const [before, after] = [MOTIF_FAMILIES[i - 1], MOTIF_FAMILIES[i]];
      const [cb, ca] = [chapters.indexOf(before.chapter), chapters.indexOf(after.chapter)];
      expect(cb, `${before.id} then ${after.id}`).toBeLessThanOrEqual(ca);
      if (cb === ca) expect(collator.compare(before.reading, after.reading), `${before.id} then ${after.id}`).toBeLessThanOrEqual(0);
    }
    for (const family of MOTIF_FAMILIES) expect(family.reading, family.id).toMatch(hira);
  });

  it("each have a base that exists, is in the family, and is its plain form: the one crest of the kind base", () => {
    for (const family of MOTIF_FAMILIES) {
      const base = manifest(family.base);
      expect(base, `${family.id}'s base ${family.base}`).not.toBeNull();
      expect(base?.family, family.id).toBe(family.id);
      expect(base?.base, family.id).toBe(base?.id);
      expect(base?.variantKind, family.id).toBe("base");
      expect(MANIFEST.filter((one) => one.family === family.id && one.variantKind === "base").map((one) => one.id), family.id).toEqual([family.base]);
    }
  });

  it("agree with the coverage list on their names, readings and chapters", () => {
    const entries = JSON.parse(readFileSync("docs/coverage/kamon.json", "utf8")) as { chapter: string; family: string; familyReading: string; familyEn: string }[];
    for (const family of MOTIF_FAMILIES) {
      const same = entries.filter((entry) => entry.chapter === family.chapter && entry.family === family.ja);
      expect(same.length, `${family.id} (${family.ja}) is a family in the coverage list`).toBeGreaterThan(0);
      expect(same[0].familyReading, family.id).toBe(family.reading);
      expect(same[0].familyEn, family.id).toBe(family.en);
    }
  });
});

describe("every crest's place in its family", () => {
  it("names a family and a kind, its family's reading, and a base in the same family", () => {
    for (const one of MANIFEST) {
      const family = motifFamily(one.family);
      expect(family, `${one.id}'s family ${one.family}`).not.toBeNull();
      expect(one.familyReading, one.id).toBe(family?.reading);
      expect(KINDS, one.id).toContain(one.variantKind);
      expect(manifest(one.base)?.family, `${one.id}'s base ${one.base}`).toBe(one.family);
      expect(Number.isInteger(one.variantRank) && one.variantRank >= 1, one.id).toBe(true);
    }
  });

  it("is a base only if it is its own base, and its own base only if it is a base", () => {
    for (const one of MANIFEST) expect(one.base === one.id, one.id).toBe(one.variantKind === "base");
  });

  it("has a rank that is its place among the crests of its family of its kind, from 1 and with no gap", () => {
    for (const family of MOTIF_FAMILIES) {
      for (const kind of KINDS) {
        const ranks = MANIFEST.filter((one) => one.family === family.id && one.variantKind === kind).map((one) => one.variantRank);
        expect(ranks, `${family.id} ${kind}`).toEqual(ranks.map((_, i) => i + 1));
      }
    }
  });

  it("is in the books' order: family by family, and in a family the kinds in order, each by rank", () => {
    const family = (one: CrestRecord): number => MOTIF_FAMILIES.findIndex((other) => other.id === one.family);
    // A frame variant whose plain twin stands after the frames (an arrangement, a combination) follows its twin instead: it never comes before it.
    const follows = (one: CrestRecord): boolean => one.variantKind === "frame" && KINDS.indexOf(record(one.base).variantKind) > KINDS.indexOf("frame");
    const kept = MANIFEST.filter((one) => !follows(one));
    for (let i = 1; i < kept.length; i += 1) {
      const [before, after] = [kept[i - 1], kept[i]];
      expect(family(before), `${before.id} then ${after.id}`).toBeLessThanOrEqual(family(after));
      if (family(before) !== family(after)) continue;
      const [kb, ka] = [KINDS.indexOf(before.variantKind), KINDS.indexOf(after.variantKind)];
      expect(kb, `${before.id} then ${after.id}`).toBeLessThanOrEqual(ka);
      if (kb === ka) expect(before.variantRank, `${before.id} then ${after.id}`).toBeLessThan(after.variantRank);
    }
    for (const one of MANIFEST.filter(follows)) {
      const before = MANIFEST[at(one.id) - 1];
      expect(before.id === one.base || (before.variantKind === "frame" && before.base === one.base), `${one.id} follows ${one.base}`).toBe(true);
    }
  });

  it("stands after its plain twin, so 下がり藤 comes before 丸に下がり藤 and 橘 before 丸に橘", () => {
    expect(at("sagari-fuji")).toBeLessThan(at("maru-ni-sagari-fuji"));
    expect(at("tachibana")).toBeLessThan(at("maru-ni-tachibana"));
    for (const one of MANIFEST.filter((other) => other.variantKind === "frame")) expect(at(one.base), one.id).toBeLessThan(at(one.id));
  });

  it("shares a family and a base across the wisteria, and keeps them apart from the crests of other motifs", () => {
    const family = MANIFEST.filter((one) => one.family === "fuji");
    expect(variantsOf("maru-ni-sagari-fuji")).toEqual(family);
    expect(family[0].id).toBe("sagari-fuji");
    expect(variantsOf("fuji-no-maru")).toEqual(variantsOf("sagari-fuji"));
    expect(variantsOf("nope")).toEqual([]);
    expect(record("fuji-no-maru")).toMatchObject({ family: "fuji", base: "sagari-fuji", variantKind: "arrangement" });
    expect(record("maru-ni-sagari-fuji")).toMatchObject({ family: "fuji", base: "sagari-fuji", variantKind: "frame" });
    expect(record("ichimonji-mitsuboshi")).toMatchObject({ family: "hoshi", variantKind: "combination" });
    expect(record("hinomaru-ogi")).toMatchObject({ family: "ogi", variantKind: "combination" });
    expect(record("mukai-hashiai-karigane")).toMatchObject({ family: "karigane", variantKind: "arrangement" });
  });
});

describe("a frame variant", () => {
  const frames = MANIFEST.filter((one) => one.variantKind === "frame");

  it("is there to be tested: a crest in a circle or another frame, for each family that has one", () => {
    expect(frames.length).toBeGreaterThan(30);
  });

  it("differs from its base only by its frame: the same motifs, counts, arrangements and turns, a base with no frame, and a different frame", () => {
    for (const one of frames) {
      const base = record(one.base);
      expect(base.family, one.id).toBe(one.family);
      expect(base.frame, `${one.id}'s base has no frame`).toBe("none");
      expect(one.frame, one.id).not.toBe("none");
      expect(one.motifs, `${one.id} has the motifs of ${base.id}`).toEqual(base.motifs);
      expect(base.variantKind, `${one.id}'s base is not itself a frame variant`).not.toBe("frame");
    }
  });

  it("draws the same motif as its base: as many shapes outside the frame", async () => {
    for (const one of frames) {
      const [own, base] = await Promise.all([STEP_LOADERS[one.id](), STEP_LOADERS[one.base]()]);
      const motif = (shapes: { part: string }[]): number => shapes.filter((shape) => shape.part !== "frame").length;
      expect(motif(own.default.shapes), `${one.id} draws the motif of ${one.base}`).toBe(motif(base.default.shapes));
    }
  });

  it("is never a crest of more than one motif, and no crest that combines, counts, sets out or forms differently is one", () => {
    for (const one of frames) expect(one.motifs.length, one.id).toBe(record(one.base).motifs.length);
    for (const one of MANIFEST.filter((other) => ["combination", "arrangement", "count", "house", "form"].includes(other.variantKind) && other.frame === "none")) expect(one.variantKind, one.id).not.toBe("frame");
    // The crests whose parts are those of a plain crest in a frame, but which are drawn differently, are not frame variants.
    for (const id of ["maru-ni-kiku", "maru-ni-tate-futatsu-hikiryo", "maru-ni-tate-mitsu-hikiryo", "maru-ni-hitotsu-hikiryo"]) expect(record(id).variantKind, id).not.toBe("frame");
  });
});

describe("a search for a family", () => {
  it("puts the family's crests first, the plain form leading, for its name in any of its forms", () => {
    const wisteria = MANIFEST.filter((one) => one.family === "fuji");
    expect(wisteria[0].id).toBe("sagari-fuji");
    for (const word of ["fuji", "藤", "wisteria", "ふじ", "Fuji"]) {
      expect(findCrests({ text: word }).slice(0, wisteria.length), word).toEqual(wisteria);
    }
    expect(findCrests({ text: "kiri" })[0].id).toBe("gosan-no-kiri");
    expect(findCrests({ text: "hollyhock" })[0].id).toBe("mitsuba-aoi");
    expect(findCrests({ text: "wood sorrel" }).slice(0, 3).map((one) => one.family)).toEqual(["katabami", "katabami", "katabami"]);
  });

  it("keeps every crest that matched and lists none twice, and leaves the order alone when no family is named", () => {
    const found = findCrests({ text: "fuji" });
    expect(new Set(found.map((one) => one.id)).size).toBe(found.length);
    expect(findCrests({ text: "tokugawa" }).map((one) => one.id)).toEqual(MANIFEST.filter((one) => findCrests({ text: "tokugawa" }).includes(one)).map((one) => one.id));
  });

  it("finds a family by its id", () => {
    expect(findCrests({ motifFamily: "fuji" })).toEqual(MANIFEST.filter((one) => one.family === "fuji"));
    expect(findCrests({ motifFamily: ["fuji", "kiri"] })).toEqual(MANIFEST.filter((one) => one.family === "fuji" || one.family === "kiri"));
    expect(findCrests({ motifFamily: "nope" })).toEqual([]);
  });
});
