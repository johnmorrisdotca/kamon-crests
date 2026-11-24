// The tomoe 巴: a comma whose round head leads and whose tail follows round the edge of the circle it is laid in.
import { C0, R } from "../construct/geo.ts";
import { DEG, arcTo, circleCircle, nearest, onPage, toPath } from "../construct/compass.ts";
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
