import { RING_GAP } from "../construct/builder.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { bookArrowRowsBuild } from "./drawn/arms.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const maruNiIpponYa = defineCrest({
  id: "maru-ni-ippon-ya",
  name: { en: "One arrow in a circle", ja: "丸に一本矢" },
  reading: "まるにいっぽんや",
  romaji: "maru ni ippon ya",
  frame: "ring-medium",
  motifs: [{ motif: "arrow", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["single fletched arrow in a ring"],
  construction: {
    en: "An upright shaft carries a straight-edged vane to either side. Two groups of diagonal white lines follow the slant of the vanes, and the ends of the shaft approach the ring.",
    ja: "縦の軸の左右に直線で囲んだ羽を置きます。羽の傾きに沿って白い線を上下に入れ、軸の両端を輪の内側に近づけます。",
  },
  measured: "The upright shaft spans the inner circle. Each vane is about a fifth of its length wide, with a shallow slope at its ends. The two slanted bands are separated by the blank middle of each vane.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "right page, third row, fourth column from the right: 丸ニ一本矢", ja: "右頁、三段目、右から四列目「丸ニ一本矢」" }, read: READ, measured: true },
  build(c) {
    bookArrowRowsBuild(c, "arrow", c.ring("ring-medium") - RING_GAP, [0]);
  },
});
