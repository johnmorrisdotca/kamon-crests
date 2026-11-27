import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-clusters.ts";
import { defineCrest } from "./util.ts";

export const saizuchiBishi = defineCrest({
  id: "saizuchi-bishi",
  name: { en: "Mallet lozenge with a flower", ja: "才槌菱" },
  reading: "さいづちびし",
  romaji: "saizuchi bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 1, arrangement: "quartered" }, { motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["さいづちひし"],
  construction: {
    en: "A lozenge has rectangular bites in each side. White diagonal seams lead to the four-petalled flower in its centre. The small white outline around the flower keeps it distinct from the notched field.",
    ja: "菱の四辺に角形の切り欠きを入れます。斜めの白い筋は中央の花菱に向かいます。花菱のまわりに細い白線を残し、外側の菱と分けます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, third row, second column from the right: さいづちひし", ja: "右頁、三段目、右から二列目「さいづちひし」" }, read: "2026-11-27", measured: true },
  measured: "The notched frame is about 317 by 258 pixels. The flower spans roughly half to three fifths of the outer width. Four small bites along each side regularise the printed notches.",
  build: drawn.saizuchiBishiBuild,
});
