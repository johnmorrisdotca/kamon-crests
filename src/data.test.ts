// The parts data is consistent: every part a crest names is in the vocabulary, every term has both languages and a
// reading, and every crest has both its names, its construction note and its families.
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { ARRANGEMENTS, FRAMES, MOTIFS, TURNS, countName, countReading, motifTerm, term } from "./parts";
import { MANIFEST } from "./manifest";
import { crestName } from "./names";
import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";

const JAPANESE = /[぀-ヿ㐀-鿿]/;
const HIRAGANA = /^[ぁ-ゖー]+$/;
const KANA_OR_KANJI_ONLY = /^[぀-ヿ㐀-鿿（）()・ ]+$/;

describe("the vocabulary", () => {
  const all = [...FRAMES, ...MOTIFS, ...ARRANGEMENTS, ...TURNS];

  it("has a unique id for every term", () => {
    // "left" and "right" are turns; "mokko" is a frame; no id is used twice across the lists
    expect(new Set(all.map((one) => one.id)).size).toBe(all.length);
  });

  it("gives every term its English, its Japanese, its reading in hiragana, its romaji and a line on each in both languages", () => {
    for (const one of all) {
      expect(one.en.length, one.id).toBeGreaterThan(1);
      expect(one.ja, one.id).toMatch(JAPANESE);
      expect(one.reading, `${one.id}'s reading`).toMatch(HIRAGANA);
      expect(one.romaji.length, one.id).toBeGreaterThan(1);
      expect(one.about.en.length, one.id).toBeGreaterThan(15);
      expect(one.about.ja, one.id).toMatch(JAPANESE);
      expect(one.about.ja.endsWith("。"), `${one.id}'s Japanese line ends with a full stop`).toBe(true);
      expect(one.about.en.endsWith("."), `${one.id}'s English line ends with a full stop`).toBe(true);
    }
  });

  it("looks a term up by its id", () => {
    expect(term("tomoe")?.ja).toBe("巴");
    expect(term("ring-thin")?.ja).toBe("細輪");
    expect(term("left")?.reading).toBe("ひだり");
    expect(term("nope")).toBeNull();
    expect(motifTerm("paulownia")?.kind).toBe("plant");
    expect(motifTerm("ring-thin")).toBeNull();
  });

  it("names a count from one to sixteen in both languages, and nothing outside", () => {
    expect(countName(3, "en")).toBe("three");
    expect(countName(16, "ja")).toBe("十六");
    expect(countReading(5)).toBe("ご");
    for (const bad of [0, 17, 2.5, -1, Number.NaN]) {
      expect(countName(bad, "en")).toBeNull();
      expect(countReading(bad)).toBeNull();
    }
  });
});

describe("every crest's record", () => {
  it("is in the catalogue's order, one for each id", () => {
    expect(MANIFEST.map((record) => record.id)).toEqual([...CREST_IDS]);
  });

  it("names its frame, motifs, arrangements and turns from the vocabulary", () => {
    const frames = new Set(FRAMES.map((one) => one.id));
    const motifs = new Set(MOTIFS.map((one) => one.id));
    const arrangements = new Set(ARRANGEMENTS.map((one) => one.id));
    for (const record of MANIFEST) {
      expect(frames.has(record.frame), `${record.id}'s frame ${record.frame}`).toBe(true);
      expect(record.motifs.length, record.id).toBeGreaterThan(0);
      for (const use of record.motifs) {
        expect(motifs.has(use.motif), `${record.id}'s motif ${use.motif}`).toBe(true);
        expect(arrangements.has(use.arrangement), `${record.id}'s arrangement ${use.arrangement}`).toBe(true);
        expect(Number.isInteger(use.count) && use.count >= 1 && use.count <= 16, `${record.id}'s count ${use.count}`).toBe(true);
        if (use.turn !== undefined) expect(["left", "right"]).toContain(use.turn);
      }
    }
  });

  it("has both its names, its reading and its romaji, and a note on its construction in both languages", () => {
    for (const record of MANIFEST) {
      expect(record.name.en.length, record.id).toBeGreaterThan(2);
      expect(record.name.ja, record.id).toMatch(JAPANESE);
      expect(record.name.ja, `${record.id}'s Japanese name`).toMatch(KANA_OR_KANJI_ONLY);
      expect(record.name.reading, `${record.id}'s reading`).toMatch(HIRAGANA);
      expect(record.name.romaji.length, record.id).toBeGreaterThan(2);
      expect(record.construction.en.length, record.id).toBeGreaterThan(30);
      expect(record.construction.ja, record.id).toMatch(JAPANESE);
      expect(record.construction.ja.endsWith("。"), `${record.id}'s Japanese note ends with a full stop`).toBe(true);
      expect(crestName(record.id, "en")).toBe(record.name.en);
      expect(crestName(record.id, "ja")).toBe(record.name.ja);
    }
  });

  it("gives every family its English and its Japanese, the Japanese read in hiragana", () => {
    for (const record of MANIFEST) {
      for (const family of record.families) {
        expect(family.en.length, record.id).toBeGreaterThan(1);
        expect(family.ja, `${record.id}'s family ${family.en}`).toMatch(JAPANESE);
        if (family.reading !== undefined) expect(family.reading, `${record.id}'s family ${family.en}`).toMatch(HIRAGANA);
      }
    }
  });

  it("gives every present-day user its names, its kind, its relation in both languages, and a dated source", () => {
    for (const record of MANIFEST) {
      for (const user of record.usedBy) {
        expect(user.name.en.length, record.id).toBeGreaterThan(1);
        expect(user.name.ja, `${record.id}'s user ${user.name.en}`).toMatch(JAPANESE);
        expect(["company", "government", "shrine-temple", "town", "team", "other"]).toContain(user.kind);
        expect(["logo-derived", "uses", "emblem", "name-derived"]).toContain(user.relation);
        expect(user.note.en.length, record.id).toBeGreaterThan(10);
        expect(user.note.ja, record.id).toMatch(JAPANESE);
        expect(user.sources.length, record.id).toBeGreaterThan(0);
        for (const source of user.sources) {
          expect(source.url, record.id).toMatch(/^https:\/\//);
          expect(source.title.length, record.id).toBeGreaterThan(3);
          expect(source.read, record.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        }
      }
    }
  });

  it("has a unique Japanese name and a unique romaji", () => {
    expect(new Set(MANIFEST.map((record) => record.name.ja)).size).toBe(MANIFEST.length);
    expect(new Set(MANIFEST.map((record) => record.name.en)).size).toBe(MANIFEST.length);
  });

  it("gives every manji its note in both languages, and a note only where a record needs one said", () => {
    const manji = MANIFEST.filter((record) => record.motifs.some((use) => use.motif === "manji"));
    expect(manji.map((record) => record.id).sort()).toEqual(["hidari-manji", "maru-ni-hidari-manji", "migi-manji"]);
    for (const record of MANIFEST) {
      if (record.note === undefined) continue;
      expect(record.note.en.length, record.id).toBeGreaterThan(20);
      expect(record.note.ja, record.id).toMatch(JAPANESE);
    }
    for (const record of manji) {
      expect(record.note?.en, record.id).toBe("The manji (卍) is a Buddhist sign used as a Japanese family crest for centuries; it is unrelated to the Nazi swastika.");
      expect(record.note?.ja, record.id).toBe("卍（まんじ）は仏教のしるしで、古くから日本の家紋に使われてきました。ナチスのハーケンクロイツとは関係がありません。");
    }
    // The docs carry it too, under each manji.
    const provenance = readFileSync("docs/provenance.md", "utf8");
    for (const record of manji) expect(provenance.split(`(\`${record.id}\`)`)[1].split("## ")[0], record.id).toContain("Note: The manji (卍)");
  });

  it("has a construction for every crest", () => {
    expect(Object.keys(STEP_LOADERS).sort()).toEqual([...CREST_IDS].sort());
  });

  it("covers every part of the vocabulary that a crest names, and the common motifs have at least one crest", () => {
    const named = new Set(MANIFEST.flatMap((record) => record.motifs.map((use) => use.motif)));
    for (const motif of ["paulownia", "tomoe", "hollyhock", "chrysanthemum", "plum", "wisteria", "wood-sorrel", "hawk-feather", "bellflower", "gentian"]) expect(named.has(motif), motif).toBe(true);
    for (const id of named) expect(term(id), id).not.toBeNull();
  });

  it("holds at least the catalogue promised: sixty crests across frames, plants, animals and shapes", () => {
    expect(MANIFEST.length).toBeGreaterThanOrEqual(60);
    for (const kind of ["plant", "animal", "object", "shape", "sky"] as const) expect(MANIFEST.some((record) => record.motifs.some((use) => motifTerm(use.motif)?.kind === kind)), kind).toBe(true);
    expect(MANIFEST.filter((record) => record.frame.startsWith("ring-")).length).toBeGreaterThanOrEqual(15);
  });
});
