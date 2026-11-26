import { SHINSEN_MONCHO } from "./books.ts";
import { sangaiJigamiBuild } from "./drawn/jigami.ts";
import { defineCrest } from "./util.ts";

export const sangaiJigami = defineCrest({
  id: "sangai-jigami",
  name: { en: "Three tiers of fan paper", ja: "三階地紙" },
  reading: "さんがいじがみ",
  romaji: "sangai jigami",
  frame: "none",
  motifs: [{ motif: "fan-paper", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三がい地紙"],
  construction: {
    en: "Three sheets overlap up one axis. Their upper arcs show in tiers, while the lowest sheet shows its notch.",
    ja: "三枚の地紙を一つの軸に沿って重ねます。上の弧を段にして見せ、一番下にくぼみを出します。",
  },
  measured: "The upper edges are three similarly bowed arcs of nearly equal span. The lowest sheet is in front and shows both bevelled sides and the smaller lower arc.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, fourth row, third column from the right: 三がい地紙", ja: "右頁、四段目、右から三列目「三がい地紙」" }, read: "2026-11-26", measured: true },
  build: sangaiJigamiBuild,
});
