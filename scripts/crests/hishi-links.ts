import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-links.ts";
import { defineCrest } from "./util.ts";

export const chigaiBishi = defineCrest({
  id: "chigai-bishi",
  name: { en: "Two linked lozenge rings", ja: "違い菱" },
  reading: "ちがいびし",
  romaji: "chigai bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["ちがひひし"],
  construction: {
    en: "Two equal lozenge rings stand side by side on a level line, their centres 49 each side of the middle, and each reaches the layout circle with its outer side corner. A ring is the band between a lozenge and a smaller one inside it. The right ring passes over the left one at the upper crossing and under it at the lower, with a narrow white gap on both sides of the upper band.",
    ja: "同じ大きさの菱の輪を二つ、横の線の上に並べます。中心は全体の中心から左右に49離し、どちらも外側の横の角を外の円まで届かせます。輪は、菱とその内側の小さな菱の間の帯です。上の交わりでは右の輪が左の輪の上を、下の交わりでは下を通り、上を通る帯の両側に細い白いすき間を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, fourth row, second column counted from the right: 違い菱 (two linked lozenge rings; measured, and drawn with compass and ruler)", ja: "左頁、四段目、右から二列目「ちがひひし」（二つの菱の輪のつながり。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell each ring's outer lozenge is about 230 pixels wide and 164 high and its inner one 140 wide and 106 high, so the band is about 45 across at the side corners and 28 at the top and bottom. The two centres are about 98 apart on a level line. At the upper crossing the right ring's lines run through and the left ring's stop at them and start again inside, and at the lower crossing the left ring's lines run through.",
  build: drawn.chigaiBishiBuild,
});
