import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiMitsuKotojiBuild, oshiKotojiBuild } from "./drawn/kotoji.ts";
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

export const maruNiMitsuKotoji = defineCrest({
  id: "maru-ni-mitsu-kotoji",
  name: { en: "Three koto bridges in a circle", ja: "丸に三つ琴柱" },
  reading: "まるにみつことじ",
  romaji: "maru ni mitsu kotoji",
  frame: "ring-medium",
  motifs: [{ motif: "koto-bridge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸に三ッことぢ"],
  construction: {
    en: "Three bridges point their small ends toward the centre of the ring. Their arched openings face out.",
    ja: "三つの琴柱の細い頭を輪の中心へ向けます。足の間のアーチは外へ向けます。",
  },
  measured: "The small heads meet near the centre of the printed ring. Each bridge has an outward opening and two feet. The three bridges are balanced at 120-degree turns and set inside the catalogue medium ring.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, first row, second column from the right: 丸に三ッことぢ", ja: "左頁、一段目、右から二列目「丸に三ッことぢ」" }, read: "2026-11-26", measured: true },
  build: maruNiMitsuKotojiBuild,
});
