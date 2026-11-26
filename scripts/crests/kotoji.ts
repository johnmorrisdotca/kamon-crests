import { SHINSEN_MONCHO } from "./books.ts";
import { oshiKotojiBuild } from "./drawn/kotoji.ts";
import { defineCrest } from "./util.ts";

export const oshiKotoji = defineCrest({
  id: "oshi-kotoji",
  name: { en: "Upright koto bridge", ja: "押し琴柱" },
  reading: "おしことじ",
  romaji: "oshi kotoji",
  frame: "none",
  motifs: [{ motif: "koto-bridge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["おしことぢ"],
  construction: {
    en: "A single koto bridge has a squared head, outward shoulders and two feet divided by a long rounded opening.",
    ja: "一つの琴柱の頭を角形にし、肩を外に広げます。二本の足の間には上端が丸い長いすき間があります。",
  },
  measured: "The plain bridge spreads about 246 across its feet and rises about 250 in the cell. Its head is about 31 across. The two shoulders and the arch between the feet have been centered on the upright.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, second row, first column from the right: おしことぢ", ja: "左頁、二段目、右から一列目「おしことぢ」" }, read: "2026-11-26", measured: true },
  build: oshiKotojiBuild,
});
