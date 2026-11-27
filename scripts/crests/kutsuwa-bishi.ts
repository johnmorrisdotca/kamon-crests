import { SHINSEN_MONCHO } from "./books.ts";
import { kutsuwaBishiBuild } from "./drawn/kutsuwa-bishi.ts";
import { defineCrest } from "./util.ts";

export const kutsuwaBishi = defineCrest({
  id: "kutsuwa-bishi",
  name: { en: "Horse bit on a lozenge", ja: "轡菱" },
  reading: "くつわびし",
  romaji: "kutsuwa bishi",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["くつわびし"],
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, fourth row, third column from the right: くつわびし", ja: "左頁、四段目、右から三列目「くつわびし」" }, read: "2026-11-27", measured: true },
  measured: "Four small triangular eyes cross inside a broad lozenge. The horizontal and vertical inner edges leave a wide cross. Each triangle's long edge runs parallel to the nearest outer side.",
  construction: {
    en: "Rule the outer lozenge and four equal right triangles. Set their shorter edges along the upright and horizontal directions, with their long edges parallel to the outer sides. Leave the cross in ink.",
    ja: "外の菱形を引き、内側に同じ大きさの直角三角形を四つ配します。短い辺を縦横にそろえ、長い辺を外の菱の辺と平行にします。中央の十字を黒く残します。",
  },
  build: kutsuwaBishiBuild,
});
