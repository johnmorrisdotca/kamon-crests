import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/china-pink.ts";
import { defineCrest } from "./util.ts";

export const sekichiku = defineCrest({
  id: "sekichiku",
  name: { en: "China pink", ja: "石竹" },
  reading: "せきちく",
  romaji: "sekichiku",
  frame: "none",
  motifs: [{ motif: "china-pink", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["せきちく"],
  construction: {
    en: "Five broad serrated petals surround a round heart. Each petal has a straight vein, curved veins on either side and a narrow white division from the next petal.",
    ja: "丸い花芯のまわりに、縁に刻みのある幅広い花弁を五枚並べます。各花弁にはまっすぐな中筋と両側の弧の筋を入れ、隣の花弁と細い白線で分けます。",
  },
  measured: "The printed bloom spans about 310 pixels, with a heart of about 45 pixels. The drawing gives all five petals equal turns and opens their dark printed veins as white cuts.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, third row, third column from the right: せきちく", ja: "右頁、三段目、右から三列目「せきちく」" }, read: "2026-11-26", measured: true },
  build: drawn.sekichikuBuild,
});

export const maruNiSekichiku = defineCrest({
  id: "maru-ni-sekichiku",
  name: { en: "China pink in a circle", ja: "丸に石竹" },
  reading: "まるにせきちく",
  romaji: "maru ni sekichiku",
  frame: "ring-medium",
  motifs: [{ motif: "china-pink", count: 1, arrangement: "single" }],
  families: [],
  aliases: [],
  construction: {
    en: "The five-petal China pink is set inside a circle. The serrated edge stands a small distance inside the rim.",
    ja: "五枚花弁の石竹を丸輪に収めます。花弁の刻みは輪の内側に小さな間を空けて並びます。",
  },
  measured: "The source ring surrounds the same five-petal flower as the plain cell. The drawing uses the standard medium ring and gives the tooth tips a narrow, even clearance.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, fourth row, third column from the right: 丸に石竹", ja: "右頁、四段目、右から三列目「丸に石竹」" }, read: "2026-11-26", measured: true },
  build: drawn.maruSekichikuBuild,
});
