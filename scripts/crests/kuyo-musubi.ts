import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kuyo-musubi.ts";
import { defineCrest } from "./util.ts";

export const musubiKuyo = defineCrest({
  id: "musubi-kuyo",
  name: { en: "Knotted kuyo circles", ja: "結び九曜" },
  reading: "むすびくよう",
  romaji: "musubi kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 7, arrangement: "ring" }],
  families: [],
  aliases: ["結び九よう"],
  construction: {
    en: "Seven equal thin circle outlines, each of radius half the layout radius. One stands on the middle, and six stand with their centres on that one's rim, at sixths of a turn from the top, so every circle passes through the middle and the farthest points stand on the outer circle. The outlines cross freely, each a band of the package's thread weight.",
    ja: "半径が外円の半分の細い円の輪郭を七つ描きます。一つは中心に置き、残りの六つは、その輪の上に、真上から六分の一回転ずつ中心を置きます。どの円も中心を通り、いちばん遠い点が外円の上に来ます。輪郭は交わったままにし、どれも糸の太さの帯です。",
  },
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "right page, fourth row, third column counted from the right: 結び九よう (seven equal circle outlines crossing at the middle; measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から三列目「結び九よう」（中心で交わる同じ大きさの七つの円の輪郭。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell each circle is about 147 pixels across at its outer edge, with a line about 3 thick. The central circle's rim carries the six centres, spaced about 60 degrees apart (the printed first one stands about 5 degrees right of the top), and each outer circle passes through the middle, so the whole figure is about 294 across. The printed circles are hand-drawn and each is off by a few pixels.",
  build: drawn.musubiKuyoBuild,
});
