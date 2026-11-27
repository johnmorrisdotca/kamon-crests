import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuHanaChoBuild } from "./drawn/cho-flight.ts";
import { defineCrest } from "./util.ts";

export const mitsuHanaCho = defineCrest({
  id: "mitsu-hana-cho",
  name: { en: "Three flower butterflies", ja: "三つ花蝶" },
  reading: "みつはなちょう",
  romaji: "mitsu hana chō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三ッ花てふ"],
  construction: {
    en: "Three butterflies of increasing size fly along a diagonal. Each has long pointed forewings, smaller hindwings and two extended antennae.",
    ja: "大きさの異なる三羽の蝶を斜めに並べます。前の羽は長くとがり、後ろの羽は小さく、触角は二本とも長く伸びます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 34, place: { en: "right page, fourth row, second column from the right: 三ッ花てふ", ja: "右頁、四段目、右から二列目「三ッ花てふ」" }, read: "2026-11-27", measured: true },
  measured: "The long forewings, narrower hindwings, lines and dots follow the middle butterfly in frame 34. The three sizes and the offset of their bodies follow the diagonal in the cell.",
  build: mitsuHanaChoBuild,
});
