// The coverage list: the crests the books name (docs/coverage/kamon.json) set beside the crests the package has drawn.
// `coverage()` is the data, shared by scripts/coverage.mjs (docs/coverage.md) and scripts/site.mjs (the Coverage page).
// A dev-only tool: nothing here is in the package.
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { CHAPTERS } from "./crests/families.ts";

const root = join(import.meta.dirname, "..");

// The seven chapters of the crest books, in their order: the package's own (scripts/crests/families.ts), so that the catalogue and this list agree.
export { CHAPTERS };

// A motif's chapter, for a crest of ours the list does not name. Its kind says it (plant, animal, sky, made thing, shape);
// these are the motifs the books file elsewhere: tomoe, bars, rings and the tortoise shell are patterns, stars are sky, the hawk
// feather is an animal's, a well frame is a building and the character 一 is a character.
const MOTIF_CHAPTER = {
  tomoe: "patterns",
  line: "patterns",
  "linked-rings": "patterns",
  "seven-treasures": "patterns",
  "tortoise-shell": "patterns",
  star: "nature",
  "hawk-feather": "animals",
  "well-frame": "buildings",
  bar: "characters",
};
const KIND_CHAPTER = { plant: "plants", animal: "animals", sky: "nature", object: "objects", shape: "patterns" };

const hiragana = (text) => text.replace(/[ァ-ヶ]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60));
// Variant kanji and spellings of one name, folded to one: the old forms, and the other ways to write a plant.
const VARIANTS = [
  [/澤/g, "沢"], [/龍/g, "竜"], [/劍/g, "剣"], [/櫻/g, "桜"], [/錢/g, "銭"], [/萬/g, "万"], [/廣/g, "広"], [/圓/g, "円"],
  [/酢漿草|傍食/g, "片喰"], [/公孫樹/g, "銀杏"], [/鷹羽/g, "鷹の羽"],
];
// The crests' own words for one thing: ちがい/違い/違ひ, 立ち/立, 下がり/下り, 抱き/抱, 向かい/向い, and 三/三つ.
const SAME = [
  [/違[いひ]|ちがい/g, "違"], [/立ち/g, "立"], [/下がり|下り|さがり/g, "下"], [/抱き/g, "抱"], [/向かい|向い/g, "向"],
  [/([一二三四五六七八九十])つ/g, "$1"],
];

/** A Japanese name with the spelling taken out: no spaces, old kana made new, katakana made hiragana, 違い and 三つ made alike. */
export function normal(text) {
  let name = hiragana(String(text).normalize("NFKC").replace(/[\s・·]+/g, "")).replace(/っ/g, "つ").replace(/ゐ/g, "い").replace(/ゑ/g, "え");
  // The old ひ for い at the end of a word: ちがひ.
  name = name.replace(/(?<=[ぁ-ん])ひ(?![ぁ-ん])/g, "い");
  for (const [from, to] of VARIANTS) name = name.replace(from, to);
  for (const [from, to] of SAME) name = name.replace(from, to);

  return name;
}
/** The forms one name is compared by, from the exact to the loose: as it is, without の, and without 左 (a left tomoe is the plain one). */
export function forms(text) {
  const exact = normal(text);
  const bare = exact.replace(/の/g, "");

  return [exact, bare, bare.replace(/左(?=[一二三四五六七八九]巴)/, "")];
}

const hasJapanese = (text) => /[぀-ヿ㐀-鿿]/.test(text);

/**
 * Every named crest, each marked with the crest of ours that is it (`have`: our id, or null) and how it was matched (`by`),
 * and our own crests that no entry names added as entries of their own (`extra: true`, `tier: null`).
 * `entries` is docs/coverage/kamon.json, `ours` the manifest's records, `motifs` the package's motif vocabulary.
 */
export function match(entries, ours, motifs) {
  const list = entries.map((entry) => ({ ...entry, have: null, by: null }));
  const taken = new Set();
  const claim = (record, entry, by) => {
    entry.have = record.id;
    entry.by = by;
    taken.add(record.id);
  };
  // The name first, then the other names, then the reading; each from the exact form to the loosest. An entry is one crest's, and a crest one entry's.
  const passes = [
    ["name", (record) => [record.name.ja], (entry) => [entry.ja]],
    ["alias", (record) => record.aliases.filter(hasJapanese), (entry) => [entry.ja]],
    ["reading", (record) => [record.name.reading], (entry) => [entry.reading ?? ""]],
  ];
  for (const [by, namesOf, entryNames] of passes) {
    for (let level = 0; level < 3; level += 1) {
      for (const record of ours) {
        if (taken.has(record.id)) continue;
        const wanted = new Set(namesOf(record).map((name) => forms(name)[level]));
        const found = list.find((entry) => entry.have === null && entryNames(entry).some((name) => name !== "" && wanted.has(forms(name)[level])));
        if (found !== undefined) claim(record, found, level === 0 ? by : `${by} (loose)`);
      }
    }
  }
  for (const record of ours) {
    if (taken.has(record.id)) continue;
    const use = record.motifs[0];
    const motif = motifs.find((one) => one.id === use.motif);
    const chapter = MOTIF_CHAPTER[use.motif] ?? KIND_CHAPTER[motif.kind];
    list.push({
      ja: record.name.ja,
      reading: record.name.reading,
      romaji: record.name.romaji,
      en: record.name.en,
      chapter,
      family: motif.ja,
      familyReading: motif.reading,
      familyEn: motif.en,
      tier: null,
      sources: [],
      houses: record.families.map((one) => one.ja),
      note: "",
      have: record.id,
      by: "ours only",
      extra: true,
    });
  }

  return list;
}

/** The counts of a set of entries: how many, how many drawn, and the tier 1 and tier 2 still missing. */
export function count(entries) {
  const have = entries.filter((entry) => entry.have !== null).length;
  const missing = (tier) => entries.filter((entry) => entry.have === null && entry.tier === tier).length;

  return { have, total: entries.length, missing: entries.length - have, tier1: missing(1), tier2: missing(2), percent: entries.length === 0 ? 0 : (100 * have) / entries.length };
}

/**
 * The whole list: `entries` marked, `chapters` with their counts and their families (thinnest first: the most still to draw, then the
 * fewest drawn), `total` for all of it. `built` is dist/manifest.js and dist/parts.js, as the package is built.
 */
export async function coverage() {
  const entries = JSON.parse(readFileSync(join(root, "docs", "coverage", "kamon.json"), "utf8"));
  const { MANIFEST } = await import(new URL("../dist/manifest.js", import.meta.url).href);
  const { MOTIFS } = await import(new URL("../dist/parts.js", import.meta.url).href);
  const marked = match(entries, MANIFEST, MOTIFS);
  const known = new Set(CHAPTERS.map((chapter) => chapter.id));
  const unknown = marked.filter((entry) => !known.has(entry.chapter));
  if (unknown.length > 0) throw new Error(`Not a chapter: ${[...new Set(unknown.map((entry) => `${entry.ja} (${entry.chapter})`))].join(", ")}`);
  const chapters = CHAPTERS.map((chapter) => {
    const inside = marked.filter((entry) => entry.chapter === chapter.id);
    const families = [...new Set(inside.map((entry) => entry.family))].map((family) => {
      const own = inside.filter((entry) => entry.family === family);
      const first = own.find((entry) => entry.familyEn !== undefined) ?? own[0];

      return { family, reading: first.familyReading ?? "", en: first.familyEn ?? "", entries: own, ...count(own) };
    });
    families.sort((a, b) => b.missing - a.missing || a.have - b.have || a.family.localeCompare(b.family, "ja"));

    return { ...chapter, entries: inside, families, ...count(inside) };
  });

  return { entries: marked, chapters, total: count(marked), ours: MANIFEST.length };
}
