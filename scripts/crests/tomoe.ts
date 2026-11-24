// The tomoe 巴: a comma whose round head leads and whose tail follows round the edge of the circle it is laid in.
import { C0, R } from "../construct/geo.ts";
import { DEG, arcTo, carve, circleCircle, disc, nearest, onPage, toPath } from "../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../construct/compass.ts";
import { RING_GAP } from "../construct/builder.ts";
import { defineCrest, fam } from "./util.ts";

// The three-comma tomoe as the compass lays it out, the outer circle 100 about the centre and one unit a hundredth of its radius.
// On each of three spokes a third of a turn apart stand two circles that touch the outer circle from inside at the spoke's end:
// the head, 45, on the grid point 55 out, and the swirl, 66, on the grid point 34 out. A comma is three arcs: the outer circle
// from the end of the spoke behind to the end of its own; its head, from there round its leading side to where the swirl of the
// spoke behind cuts it; and that swirl back. So the white is one shape of three horns, each the crescent between a swirl and its
// head, pinched to nothing where both touch the outer circle, and each tail thins to a point there too; the outer edge stays whole.
// The proportions (head 0.45 of the radius, swirl 0.66) were measured from pictures of the solid crest.
const RIM: Circle = { c: [0, 0], r: 100 };
const spoke = (r: number, deg: number): V => [r * Math.cos((90 - deg) * DEG), r * Math.sin((90 - deg) * DEG)];
const head = (deg: number): Circle => ({ c: spoke(55, deg), r: 45 });
const swirl = (deg: number): Circle => ({ c: spoke(34, deg), r: 66 });

/** The comma whose head stands on the spoke at clock angle `deg`: its tail runs back, counter-clockwise, to the end of the spoke behind. */
const comma = (deg: number): Region => {
  const own = spoke(100, deg);
  const behind = spoke(100, deg - 120);
  const cut = nearest(circleCircle(head(deg).c, 45, swirl(deg - 120).c, 66), spoke(40, deg - 75));

  return [arcTo(RIM, behind, own, false), arcTo(head(deg), own, cut, false), arcTo(swirl(deg - 120), cut, behind, true)];
};

/** Lays out the tomoe in the circle of radius `ro` on the page: the outer circle, the three spokes, each spoke's head and swirl, then the commas one by one. The heads lead clockwise; `mirror` turns the whole the other way. */
const tomoeBuild = (c: Parameters<(typeof hidariMitsuTomoe)["build"]>[0], ro: number, mirror: boolean): void => {
  const placing: Placing = { k: ro / RIM.r, mirror };
  c.guideCircle(C0, ro);
  c.guideSpokes(3, 0, ro);
  for (const circ of [head(0), swirl(0)]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
  for (const deg of [0, 120, 240]) c.fill("tomoe", toPath([comma(deg)], placing));
};

export const hidariMitsuTomoe = defineCrest({
  id: "hidari-mitsu-tomoe",
  name: { en: "Left three-comma tomoe", ja: "左三つ巴" },
  reading: "ひだりみつどもえ",
  romaji: "hidari mitsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial", turn: "left" }],
  families: [fam("Hachiman shrines", "八幡社", "はちまんしゃ")],
  aliases: ["mitsudomoe", "three tomoe"],
  construction: {
    en: "On each of three spokes a third of a turn apart stand two circles that touch the outer circle from inside at the spoke's end: the head, 0.45 of the radius, and the swirl, 0.66. A comma is three arcs: the outer circle from the end of the spoke behind to its own, its head, and the swirl of the spoke behind. The white is three horns, each the crescent between a swirl and its head, and each tail thins to a point on the outer circle, which stays whole.",
    ja: "120度ずつ離れた三本の線の上に、線の端で外円に内側から接する円を二つずつ置きます。頭の円は半径の0.45、渦の円は0.66です。巴一つは三つの弧でできます。後ろの線の端から自分の線の端までの外円、頭の円、そして後ろの線の渦の円です。白い部分は三本の角の形で、それぞれ渦の円と頭の円の間の三日月です。尾は外円の上で細くなって尖り、外円は欠けません。",
  },
  build(c) {
    tomoeBuild(c, R, false);
  },
});

export const migiMitsuTomoe = defineCrest({
  id: "migi-mitsu-tomoe",
  name: { en: "Right three-comma tomoe", ja: "右三つ巴" },
  reading: "みぎみつどもえ",
  romaji: "migi mitsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial", turn: "right" }],
  families: [],
  aliases: ["mitsudomoe", "three tomoe"],
  construction: {
    en: "The left three-comma tomoe turned the other way: the same compass circles, mirrored, so that the heads lead counter-clockwise and the tails flow clockwise behind them.",
    ja: "左三つ巴と同じコンパスの円を左右に返したもので、頭が反時計回りに進み、尾がそのあとを時計回りに流れます。",
  },
  build(c) {
    tomoeBuild(c, R, true);
  },
});

export const maruNiHidariMitsuTomoe = defineCrest({
  id: "maru-ni-hidari-mitsu-tomoe",
  name: { en: "Left three-comma tomoe in a circle", ja: "丸に左三つ巴" },
  reading: "まるにひだりみつどもえ",
  romaji: "maru ni hidari mitsudomoe",
  frame: "ring-medium",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial", turn: "left" }],
  families: [fam("Hachiman shrines", "八幡社", "はちまんしゃ")],
  aliases: ["mitsudomoe in ring"],
  construction: {
    en: "The three-comma tomoe laid out in the room inside a ring about a tenth of the diameter thick, a narrow white line between them.",
    ja: "直径の約10分の1の太さの輪の内側に、細い白線を残して三つ巴を割り付けます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    tomoeBuild(c, inner - RING_GAP, false);
  },
});

// The two-comma tomoe, laid out like the three-comma one but with two spokes, half a turn apart: on each stand a head circle and
// a swirl circle that touch the outer circle from inside at the spoke's end. The comma's three arcs are the outer circle from the
// end of the other spoke round to its own, its head, and the swirl of the other spoke. The proportions were measured from two
// public pictures of the crest, read off as distances along its axis and across its horns (never traced): the head is 0.45 of the
// radius in one and 0.49 in the other, the swirl 0.62 and 0.75; the drawing takes 0.48 and 0.66, between them.
const head2 = (deg: number): Circle => ({ c: spoke(52, deg), r: 48 });
const swirl2 = (deg: number): Circle => ({ c: spoke(34, deg), r: 66 });
const comma2 = (deg: number): Region => {
  const own = spoke(100, deg);
  const behind = spoke(100, deg - 180);
  const cut = nearest(circleCircle(head2(deg).c, 48, swirl2(deg - 180).c, 66), spoke(40, deg - 112.5));

  return [arcTo(RIM, behind, own, false), arcTo(head2(deg), own, cut, false), arcTo(swirl2(deg - 180), cut, behind, true)];
};

export const hidariFutatsuTomoe = defineCrest({
  id: "hidari-futatsu-tomoe",
  name: { en: "Left two-comma tomoe", ja: "左二つ巴" },
  reading: "ひだりふたつどもえ",
  romaji: "hidari futatsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 2, arrangement: "radial", turn: "left" }],
  families: [],
  aliases: ["futatsudomoe", "futatsu tomoe", "two tomoe", "二つ巴"],
  construction: {
    en: "On each of two spokes half a turn apart stand two circles that touch the outer circle from inside at the spoke's end: the head, 0.48 of the radius, and the swirl, 0.66. A comma is three arcs: the outer circle from the end of the other spoke round to its own, its head, and the swirl of the other spoke. The white is two horns, each the crescent between a swirl and a head, and each tail thins to a point where the circles part; the outer circle stays whole.",
    ja: "180度離れた二本の線の上に、線の端で外円に内側から接する円を二つずつ置きます。頭の円は半径の0.48、渦の円は0.66です。巴一つは三つの弧でできます。もう一方の線の端から自分の線の端までの外円、頭の円、そしてもう一方の線の渦の円です。白い部分は二本の角の形で、それぞれ渦の円と頭の円の間の三日月です。尾は二つの円が離れるところで細くなって尖り、外円は欠けません。",
  },
  build(c) {
    const placing: Placing = { k: R / RIM.r };
    c.guideCircle(C0, R);
    c.guideSpokes(2, 0, R);
    for (const circ of [head2(0), swirl2(0)]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
    for (const deg of [0, 180]) c.fill("tomoe", toPath([comma2(deg)], placing));
  },
});

// The one-comma tomoe: a black disc and a single white horn. Two circles of one width, 0.50 of the radius, touch the outer circle
// from inside, one at the bottom and one an eighteenth of a turn (20 degrees) round from it; the white is the crescent of the second
// that the first leaves uncovered, its two points where the circles cross. Measured from a public picture of the crest: the head's
// widest reach (0.50 of the radius), the horn's outer edge (0.67 across, at 0.48 down), the horn's thickness there (0.18).
const head1: Circle = { c: spoke(50, 180), r: 50 };
const swirl1: Circle = { c: spoke(50, 160), r: 50 };

export const hidariHitotsuTomoe = defineCrest({
  id: "hidari-hitotsu-tomoe",
  name: { en: "Left one-comma tomoe", ja: "左一つ巴" },
  reading: "ひだりひとつどもえ",
  romaji: "hidari hitotsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 1, arrangement: "single", turn: "left" }],
  families: [],
  aliases: ["hitotsudomoe", "hitotsu tomoe", "one tomoe", "一つ巴"],
  construction: {
    en: "Two circles of one width, 0.50 of the radius, touch the outer circle from inside: the head at the bottom and the swirl an eighteenth of a turn (20 degrees) round from it. The white is the crescent of the swirl that the head does not cover, its two points where the two circles cross; the rest is black, and the outer circle stays whole.",
    ja: "同じ大きさの円を二つ、外円に内側から接するように置きます。半径はどちらも外円の半径の0.50で、頭の円をいちばん下に、渦の円をそこから18分の1回転（20度）回ったところに置きます。白い部分は、渦の円のうち頭の円に覆われない三日月で、二つの円が交わる二点で尖ります。ほかはすべて黒で、外円は欠けません。",
  },
  build(c) {
    const placing: Placing = { k: R / RIM.r };
    c.guideCircle(C0, R);
    c.guideLine(C0, onPage(spoke(100, 180), placing));
    c.guideLine(C0, onPage(spoke(100, 160), placing));
    for (const circ of [head1, swirl1]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
    const lune = carve([disc(swirl1.c, swirl1.r)], [disc(head1.c, head1.r)]);
    c.fill("tomoe", toPath(carve([disc([0, 0], 100)], lune), placing));
  },
});
