// The tomoe 巴: a comma whose round head leads and whose tail follows round the edge of the circle it is laid in.
import { C0, R } from "../construct/geo.ts";
import { DEG, arcTo, circleCircle, nearest, onPage, toPath, touch } from "../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../construct/compass.ts";
import { RING_GAP } from "../construct/builder.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { defineCrest, fam } from "./util.ts";

// The three-comma tomoe as the compass lays it out, the outer circle 100 about the centre and one unit a hundredth of its radius.
// On each of three spokes a third of a turn apart stand two circles that touch the outer circle from inside at the spoke's end:
// the head, 45, on the grid point 55 out, and the swirl, 66, on the grid point 34 out. A comma is three arcs: the outer circle
// from the end of the spoke behind to the end of its own; its head, from there round its leading side to where the swirl of the
// spoke behind cuts it; and that swirl back. So the white is one shape of three horns, each the crescent between a swirl and its
// head, pinched to nothing where both touch the outer circle, and each tail thins to a point there too; the outer edge stays whole.
// The proportions (head 0.45 of the radius, swirl 0.66) were measured from pictures of the solid crest.
export const RIM: Circle = { c: [0, 0], r: 100 };
const spoke = (r: number, deg: number): V => [r * Math.cos((90 - deg) * DEG), r * Math.sin((90 - deg) * DEG)];
export const head = (deg: number): Circle => ({ c: spoke(55, deg), r: 45 });
export const swirl = (deg: number): Circle => ({ c: spoke(34, deg), r: 66 });

/** The comma whose head stands on the spoke at clock angle `deg`: its tail runs back, counter-clockwise, to the end of the spoke behind. */
export const comma = (deg: number): Region => {
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

export const futatsuBuild = (c: Parameters<(typeof hidariMitsuTomoe)["build"]>[0], mirror: boolean, ro = R): void => {
  const placing: Placing = { k: ro / RIM.r, mirror };
  c.guideCircle(C0, ro);
  c.guideSpokes(2, 0, ro);
  for (const circ of [head2(0), swirl2(0)]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
  for (const deg of [0, 180]) c.fill("tomoe", toPath([comma2(deg)], placing));
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
    futatsuBuild(c, false);
  },
});

// The one-comma tomoe, 左り一ツ巴 of the 1892 crest book (frame 11): one comma that fills the outer circle, its tail wrapping all the
// way round its own head to a point on the outer circle, at the upper right. The outer circle stays whole and the white is one horn,
// each of its edges two arcs that run on from one another: where two circles touch, the pen passes from one to the other. On the
// spoke through the grid point (60, 80) stand two circles that touch the outer circle from inside at that point, the tail's tip:
// the sweep, 75 on (15, 20), which is the tail's inner edge, and the back, 70 on (18, 24), which is the head's edge beside it, so
// that the white between them opens from nothing at the tip. The hook, 51 on (15, -4), touches the sweep from inside at its lowest
// point and carries the tail's edge on round, up the left. The head, 53 on (26, 9), touches the back from inside at the lower
// right and carries the head's edge on round, under the head, until the hook crosses it: the horn's other point, at the upper left.
// Measured from the book's cell as circles through the edges of its horn, in hundredths of the outer radius: the head 56 on
// (32, 12), the tail's edge 72 on (18, 17) and then 47 on (13, -6), the tip 43 degrees clockwise from the top.
const TIP: V = [60, 80];
const SWEEP: Circle = { c: [15, 20], r: 75 };
const BACK: Circle = { c: [18, 24], r: 70 };
const HOOK: Circle = { c: [15, -4], r: 51 };
const HEAD: Circle = { c: [26, 9], r: 53 };

const hitotsuBuild = (c: Parameters<(typeof hidariMitsuTomoe)["build"]>[0], mirror: boolean): void => {
  const placing: Placing = { k: R / RIM.r, mirror };
  const low = touch(SWEEP, HOOK);
  const under = touch(BACK, HEAD);
  const point = nearest(circleCircle(HOOK.c, HOOK.r, HEAD.c, HEAD.r), [-22, 31]);
  c.guideCircle(C0, R);
  c.guideLine(C0, onPage(TIP, placing));
  for (const circ of [SWEEP, BACK, HOOK, HEAD]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
  // The outer circle, whole, and then the horn: down the sweep and up the hook to its point, and back under the head to the tip.
  c.fill("tomoe", toPath([[arcTo(RIM, TIP, TIP, true), arcTo(SWEEP, TIP, low, false), arcTo(HOOK, low, point, false), arcTo(HEAD, point, under, true), arcTo(BACK, under, TIP, true)]], placing));
};

export const hidariHitotsuTomoe = defineCrest({
  id: "hidari-hitotsu-tomoe",
  measured: "The 1892 crest book's cell (frame 11, 左り一ツ巴), read as circles through the two edges of its white horn, in hundredths of the outer circle's radius, the centre at (0, 0), x to the right and y up. The edge beside the head is one circle to within 1: 56 on (32, 12). The tail's inner edge is two arcs, one running on from the other: 72 on (18, 17), which touches the outer circle at the tail's tip, about 43 degrees clockwise from the top, and then 47 on (13, -6). The horn's other point is at (-25, 26), and the horn is about 10 across at its widest, at the lower left. Beside the tip the book's two lines run as one, so the head's edge cannot be read there. The drawing takes whole numbers on grid points: the tip at (60, 80), 37 degrees from the top; the sweep 75 on (15, 20) and the hook 51 on (15, -4); the head 53 on (26, 9); and beside the tip the back, 70 on (18, 24), which stands 5 inside the sweep at its farthest, so that the white opens from nothing at the tip.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "right page, second row, fourth column: 左り一ツ巴 (measured, and drawn with compass and ruler)", ja: "右頁、二段目の四列目「左り一ツ巴」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  name: { en: "Left one-comma tomoe", ja: "左一つ巴" },
  reading: "ひだりひとつどもえ",
  romaji: "hidari hitotsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 1, arrangement: "single", turn: "left" }],
  families: [],
  aliases: ["hitotsudomoe", "hitotsu tomoe", "one tomoe", "一つ巴"],
  construction: {
    en: "One comma fills the outer circle: its tail wraps all the way round its own head and thins to a point on the outer circle, at the upper right. The outer circle stays whole, and the white is one horn. Two circles touch the outer circle from inside at the tail's tip: the sweep, 0.75 of the radius, and the back, 0.70. The hook, 0.51, touches the sweep from inside at its lowest point, and the head, 0.53, touches the back from inside at the lower right. The horn's outer edge is the sweep, from the tip down to its lowest point, and then the hook, up the left. Its inner edge is the back and then the head. The hook and the head cross at the upper left, and that is the horn's other point.",
    ja: "巴一つで外円をいっぱいに使います。尾は頭のまわりをぐるりと回り、右上で細くなって、外円の上で尖ります。外円は欠けず、白い部分は角の形が一本だけです。円の大きさは、どれも外円の半径に対する割合で表します。まず、尾の先の点で外円に内側から接する円を二つ置きます。大きい円は0.75、小さい円は0.70です。次に、大きい円のいちばん下の点で内側から接するかぎの円（0.51）と、小さい円の右下で内側から接する頭の円（0.53）を置きます。白い角の外側の縁は、尾の先から大きい円に沿っていちばん下まで下り、そこからかぎの円に沿って左側を上がります。内側の縁は、小さい円に沿い、続けて頭の円に沿います。かぎの円と頭の円は左上で交わり、そこが角のもう一方の先になります。",
  },
  build(c) {
    hitotsuBuild(c, false);
  },
});

export const migiFutatsuTomoe = defineCrest({
  id: "migi-futatsu-tomoe",
  measured: "None of its own: it is the left two-comma tomoe's circles (head 0.48 and swirl 0.66 of the radius) struck the other way round, which that crest took from between two public pictures. Read against both, turned left to right (Wikimedia Commons, Tomoe Variations second of four, and Japanese Crest Hidarifutatsudomoe 1): along the level line through the centre the white is 0.565 of the diameter across in ours, 0.452 in the first and 0.702 in the second.",
  name: { en: "Right two-comma tomoe", ja: "右二つ巴" },
  reading: "みぎふたつどもえ",
  romaji: "migi futatsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 2, arrangement: "radial", turn: "right" }],
  families: [],
  aliases: ["futatsudomoe", "futatsu tomoe", "two tomoe", "二つ巴"],
  construction: {
    en: "The left two-comma tomoe turned the other way: the same compass circles, struck in place the other way round, so that the heads lead counter-clockwise and the tails flow clockwise behind them.",
    ja: "左二つ巴と同じコンパスの円を、左右に返して同じ位置に描いたもので、頭が反時計回りに進み、尾がそのあとを時計回りに流れます。",
  },
  build(c) {
    futatsuBuild(c, true);
  },
});

export const migiHitotsuTomoe = defineCrest({
  id: "migi-hitotsu-tomoe",
  measured: "None of its own: it is the left one-comma tomoe's circles struck the other way round, so its proportions are that crest's (the sweep 0.75, the back 0.70, the head 0.53 and the hook 0.51 of the radius; see the left crest). The 1892 crest book's cell (frame 11, 左り一ツ巴) was read turned left to right.",
  name: { en: "Right one-comma tomoe", ja: "右一つ巴" },
  reading: "みぎひとつどもえ",
  romaji: "migi hitotsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 1, arrangement: "single", turn: "right" }],
  families: [],
  aliases: ["hitotsudomoe", "hitotsu tomoe", "one tomoe", "一つ巴"],
  construction: {
    en: "The left one-comma tomoe turned the other way: the same circles, struck in place the other way round, so that the tail wraps round the head the other way and thins to a point on the outer circle at the upper left.",
    ja: "左一つ巴と同じ円を、左右に返して同じ位置に描いたものです。尾は頭のまわりを逆向きに回り、左上で細くなって、外円の上で尖ります。",
  },
  build(c) {
    hitotsuBuild(c, true);
  },
});

export const maruNiMigiMitsuTomoe = defineCrest({
  id: "maru-ni-migi-mitsu-tomoe",
  measured: "None of its own: it is the right three-comma tomoe set inside the package's measured ring and white, as the left one is. Read against the Wikimedia Commons pictures Migi mitsudomoe (a right three-comma tomoe whose head is 153 over a radius of 344, 0.445, as in ours) and Tomoe Variations, third of four, turned left to right (a thin ring of 0.028 of the diameter, against the package's 0.087).",
  name: { en: "Right three-comma tomoe in a circle", ja: "丸に右三つ巴" },
  reading: "まるにみぎみつどもえ",
  romaji: "maru ni migi mitsudomoe",
  frame: "ring-medium",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial", turn: "right" }],
  families: [],
  aliases: ["mitsudomoe in ring", "migi mitsudomoe in a ring"],
  construction: {
    en: "The right three-comma tomoe laid out in the room inside a ring about a tenth of the diameter thick, a narrow white line between them.",
    ja: "直径の約10分の1の太さの輪の内側に、細い白線を残して右三つ巴を割り付けます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    tomoeBuild(c, inner - RING_GAP, true);
  },
});

// The nine-tomoe cluster of the 1892 crest book (frame 11), 板倉巴: one three-comma tomoe at the centre and eight smaller ones round it,
// each in the same turn as the next, none turned about the centre. Read off the book's cell as circles through each unit's outer edge,
// in hundredths of the layout radius: the middle one 35 on the centre, the eight round it 24.6 to 26.3 on a ring of 68 to 70.
const CLUSTER_MIDDLE = 35;
const CLUSTER_SIDE = 26;
const CLUSTER_RING = 69;

export const itakuraTomoe = defineCrest({
  id: "itakura-tomoe",
  name: { en: "Itakura tomoe", ja: "板倉巴" },
  reading: "いたくらともえ",
  romaji: "Itakura tomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 9, arrangement: "ring" }],
  families: [fam("Itakura", "板倉", "いたくら")],
  aliases: ["Itakura mitsudomoe", "nine tomoe", "九つ巴"],
  construction: {
    en: "Nine three-comma tomoe: one in the middle, and eight round it, each set out on its own centre in the same way, none turned. The eight stand on a ring of 69 about the centre at every eighth of a turn, from the top clockwise, each of radius 26 and a narrow white gap from the next; the middle one has radius 35.",
    ja: "三つ巴を九つ並べます。一つは真ん中、あとの八つはそのまわりです。どれもその場で、同じ向きの三つ巴を作図します。八つは中心から69の円の上に、上から時計回りに八分の一周ごとに置き、半径はどれも26です。となりとの間には細い白いすき間を残します。真ん中の一つは半径35です。",
  },
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, second row, first column counted from the right: 板倉ともゑ (nine three-comma tomoe, one in the middle and eight round it; measured, and drawn with compass and ruler)", ja: "左頁、二段目、右から一列目「板倉ともゑ」（真ん中に一つ、まわりに八つの三つ巴。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    const unit = (at: V, ro: number): void => {
      const placing: Placing = { k: ro / RIM.r, at };
      const centre = onPage([0, 0], placing);
      c.guideCircle(centre, ro);
      c.guideSpokes(3, 0, ro, centre);
      for (const circ of [head(0), swirl(0)]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
      for (const deg of [0, 120, 240]) c.fill("tomoe", toPath([comma(deg)], placing));
    };
    unit([0, 0], CLUSTER_MIDDLE);
    for (let i = 0; i < 8; i += 1) unit([CLUSTER_RING * Math.sin(i * 45 * DEG), CLUSTER_RING * Math.cos(i * 45 * DEG)], CLUSTER_SIDE);
  },
});
