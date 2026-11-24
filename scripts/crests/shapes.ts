// Plain crests of squares, discs and bars, the second round: each is the space between full-length ruled lines, or discs struck
// on the crossings of them. The proportions are numbers measured from public pictures of the crests, never traced; the sources
// are named beside each build and in docs/provenance.md.
import { RING_GAP } from "../construct/builder.ts";
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, Path, R } from "../construct/geo.ts";
import { carve, disc, onPage, seg, toPath } from "../construct/compass.ts";
import type { Placing, Region, V } from "../construct/compass.ts";
import { defineCrest } from "./util.ts";

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));
/** A lozenge about the upright line: its top corner, its side corners `w` out at height `y`, its bottom corner. */
const lozenge = (top: number, w: number, y: number, bottom: number): V[] => [[0, top], [w, y], [0, bottom], [-w, y]];

/**
 * The nail-puller 釘抜: a square stood on its corner with a small square hole in the middle. In the crest's own frame (the
 * centre at 0, y up, the layout circle at 100) the four corners stand on the circle of 100 where the upright and the level line
 * through the centre meet it, and the hole's four corners on the same lines 20 out; each side is a line ruled full length.
 */
const kuginukiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const [corner, hole] = [100, 20];
  const diamond = (r: number): V[] => [[0, r], [r, 0], [0, -r], [-r, 0]];
  c.guideCircle(C0, reach);
  c.guideCircle(C0, hole * placing.k);
  c.guideLine(onPage([0, -corner], placing), onPage([0, corner], placing));
  c.guideLine(onPage([-corner, 0], placing), onPage([corner, 0], placing));
  for (const r of [corner, hole]) c.guidePath(toPath([polygon(diamond(r))], placing));
  c.fill(part, toPath(carve([polygon(diamond(corner))], [polygon(diamond(hole))]), placing));
};

export const kuginuki = defineCrest({
  id: "kuginuki",
  name: { en: "Nail-puller", ja: "釘抜" },
  reading: "くぎぬき",
  romaji: "kuginuki",
  frame: "none",
  motifs: [{ motif: "nail-puller", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["nail puller", "nail extractor", "kuginuki-mon"],
  construction: {
    en: "A square stood on its corner, its four corners on the outer circle where the upright and the level line through the centre meet it, with a small square hole in the middle whose corners lie 0.2 of the way out on the same two lines. Each side is a line ruled full length.",
    ja: "正方形を角で立てます。四つの角は、中心を通る縦の線と横の線が外円と交わる点です。真ん中に小さな四角い穴をあけ、その角は同じ二本の線の上、中心から0.2の距離に置きます。辺はどれも端から端まで引いた直線です。",
  },
  build(c) {
    // The hole's corners are 0.152 of the way out to the square's in a public picture of the ringed crest (Wikimedia Commons, Japanese Crest Maru ni Kuginuki) and 0.249 in the repository's reference sheet of ringed crests; the drawing takes 0.20, between them.
    kuginukiBuild(c, "nail-puller", R);
  },
});

export const maruNiKuginuki = defineCrest({
  id: "maru-ni-kuginuki",
  name: { en: "Nail-puller in a circle", ja: "丸に釘抜" },
  reading: "まるにくぎぬき",
  romaji: "maru ni kuginuki",
  frame: "ring-medium",
  motifs: [{ motif: "nail-puller", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["kuginuki in a ring", "nail puller in a circle"],
  construction: {
    en: "The nail-puller laid out inside a ring about a tenth of the diameter thick, its corners a narrow white from the ring.",
    ja: "直径の約10分の1の太さの輪の内側に、角が輪に触れないよう細い白を残して釘抜を割り付けます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    kuginukiBuild(c, "nail-puller", inner - RING_GAP);
  },
});

/**
 * The flat four eyes 平四つ目: four squares, two by two, with their sides upright and level, each with a square hole. Seven
 * units across: a square is 3, its hole 1, and the white between two squares 1, so the eight lines through the crossings stand
 * 0.5, 1.5, 2.5 and 3.5 units either side of the centre, upright and level. The outer corners stand on the layout circle.
 */
export const hiraYotsume = defineCrest({
  id: "hira-yotsume",
  name: { en: "Flat four eyes", ja: "平四つ目" },
  reading: "ひらよつめ",
  romaji: "hira yotsume",
  frame: "none",
  motifs: [{ motif: "four-eyes", count: 4, arrangement: "rows" }],
  families: [],
  aliases: ["four squares", "yotsume", "nanatsuwari hira yotsume", "七つ割平四つ目"],
  construction: {
    en: "Four squares set two by two with their sides upright and level, a square hole in the middle of each. Across the crest it is seven parts: a square is three, its hole one, and the white between neighbours one. Eight lines are ruled full length, upright and level, at 0.5, 1.5, 2.5 and 3.5 parts either side of the centre, and the outer corners stand on the outer circle.",
    ja: "四つの正方形を、辺を縦横にそろえて二つずつ並べ、それぞれの真ん中に四角い穴をあけます。全体の幅を7とすると、正方形は3、穴は1、となり合う正方形の間の白は1です。中心から左右・上下に0.5、1.5、2.5、3.5の位置に、縦と横の直線を端から端まで八本引き、いちばん外の角は外円の上に置きます。",
  },
  build(c) {
    // Measured as numbers from a public picture of the crest (Wikimedia Commons, Nanatsuwari-hira-yotsume): the square 4150 across, its hole 1380, the white between 1382: 3, 1 and 1.
    const placing: Placing = { k: R / 100 };
    const u = 100 / Math.hypot(3.5, 3.5);
    const lines = [0.5, 1.5, 2.5, 3.5];
    c.guideCircle(C0, R);
    for (const n of lines) for (const side of [-1, 1]) {
      c.guideLine(onPage([side * n * u, -100], placing), onPage([side * n * u, 100], placing));
      c.guideLine(onPage([-100, side * n * u], placing), onPage([100, side * n * u], placing));
    }
    const box = (cx: number, cy: number, h: number): Region => polygon([[(cx - h) * u, (cy + h) * u], [(cx + h) * u, (cy + h) * u], [(cx + h) * u, (cy - h) * u], [(cx - h) * u, (cy - h) * u]]);
    // Clockwise from the top: the upper right, the lower right, the lower left, the upper left.
    for (const [x, y] of [[2, 2], [2, -2], [-2, -2], [-2, 2]]) c.fill("four-eyes", toPath(carve([box(x, y, 1.5)], [box(x, y, 0.5)]), placing));
  },
});

/**
 * The nine discs in a square 角九曜: three rows of three, each disc 0.4888 of the spacing of the centres, so a narrow white lies
 * between neighbours. The six lines through the centres are ruled full length, upright and level, a circle of the spacing marks
 * where they stand, and a disc is struck on each crossing. The outermost points of the corner discs stand on the layout circle.
 */
export const kakuKuyo = defineCrest({
  id: "kaku-kuyo",
  name: { en: "Nine luminaries in a square", ja: "角九曜" },
  reading: "かくくよう",
  romaji: "kaku kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 9, arrangement: "rows" }],
  families: [],
  aliases: ["nine discs", "square kuyo", "nine stars in a square", "kaku kuyou"],
  construction: {
    en: "Nine discs of one size in three rows of three. A circle of the spacing of the centres is struck about the middle, and the upright and level lines through its crossings with the two axes are ruled full length; a disc 0.49 of the spacing across the radius is struck on each of the nine crossings, so a narrow white lies between neighbours. The outermost points of the four corner discs stand on the outer circle.",
    ja: "同じ大きさの円を、三段に三つずつ、九つ並べます。中央に、円の中心どうしの間隔を半径とする円を描き、その円と縦横の中心線との交点を通る縦と横の直線を端から端まで引きます。九つの交点にそれぞれ、半径が間隔の0.49の円を置き、となり合う円の間に細い白を残します。四隅の円のいちばん外の点は、外円の上に置きます。",
  },
  build(c) {
    // Measured as numbers from a public picture of the crest (Wikimedia Commons, Japanese Crest kaku Kuyoh): each disc 91.3 across the radius, the centres 186.8 apart: 0.4888 of the spacing.
    const placing: Placing = { k: R / 100 };
    const d = 100 / (Math.SQRT2 + 0.4888);
    const r = 0.4888 * d;
    c.guideCircle(C0, R);
    c.guideCircle(C0, d * placing.k);
    for (const side of [-1, 1]) {
      c.guideLine(onPage([side * d, -100], placing), onPage([side * d, 100], placing));
      c.guideLine(onPage([-100, side * d], placing), onPage([100, side * d], placing));
    }
    c.guideLine(onPage([0, -100], placing), onPage([0, 100], placing));
    c.guideLine(onPage([-100, 0], placing), onPage([100, 0], placing));
    const at: V[] = [[0, 0], [0, d], [d, d], [d, 0], [d, -d], [0, -d], [-d, -d], [-d, 0], [-d, d]];
    for (const p of at) c.guideCircle(onPage(p, placing), r * placing.k);
    for (const p of at) c.fill("star", toPath([disc(p, r)], placing));
  },
});

/**
 * Upright bars across a ring 竪引両: each bar is the space between two upright lines ruled the full height of the layout circle,
 * and it ends on that circle, under the ring. `offsets` are the bars' centres from the middle, `w` the width of one.
 */
const tateHikiryoBuild = (c: Builder, part: string, offsets: number[], w: number): void => {
  c.ring("ring-medium");
  // Half of the chord the layout circle cuts from an upright line at `x`.
  const half = (x: number): number => Math.sqrt(R * R - (x - CX) ** 2);
  for (const dx of offsets) {
    const [left, right] = [CX + dx - w / 2, CX + dx + w / 2];
    c.guideLine([left, CY - R], [left, CY + R]);
    c.guideLine([right, CY - R], [right, CY + R]);
    c.fill(part, new Path().M([left, CY - half(left)]).A(R, 0, 1, [right, CY - half(right)]).L([right, CY + half(right)]).A(R, 0, 1, [left, CY + half(left)]).L([left, CY - half(left)]).Z());
  }
};

export const maruNiTateFutatsuHikiryo = defineCrest({
  id: "maru-ni-tate-futatsu-hikiryo",
  name: { en: "Two upright bars in a circle", ja: "丸に竪二つ引両" },
  reading: "まるにたてふたつひきりょう",
  romaji: "maru ni tate futatsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["tate futatsu hikiryo", "two upright lines", "two vertical bars", "丸に立二つ引両"],
  construction: {
    en: "Two upright bars across a ring about a tenth of the diameter thick, each bar as wide as the white between them.",
    ja: "直径の約10分の1の太さの輪に、縦棒を二本渡します。棒の幅は、二本の間の白と同じです。",
  },
  build(c) {
    // Measured as numbers from a public picture of the crest (Wikimedia Commons, Maru ni tate futatsu hikiryo): of the ring's radius, bars 0.333 wide, their centres 0.333 either side of the middle.
    tateHikiryoBuild(c, "line", [-32, 32], 32);
  },
});

export const maruNiTateMitsuHikiryo = defineCrest({
  id: "maru-ni-tate-mitsu-hikiryo",
  name: { en: "Three upright bars in a circle", ja: "丸に竪三つ引両" },
  reading: "まるにたてみつひきりょう",
  romaji: "maru ni tate mitsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["tate mitsu hikiryo", "three upright lines", "three vertical bars", "丸に立三つ引両"],
  construction: {
    en: "Three upright bars across a ring about a tenth of the diameter thick, each bar a little narrower than the white between them.",
    ja: "直径の約10分の1の太さの輪に、縦棒を三本渡します。棒は、間の白より少し細くします。",
  },
  build(c) {
    // Measured as numbers from a public picture of the crest (Wikimedia Commons, Maru ni tate mitu Hiki): of the ring's radius, bars 0.233 wide, 0.478 apart.
    tateHikiryoBuild(c, "line", [-45.9, 0, 45.9], 22.4);
  },
});

/**
 * The three-storey lozenge 三階菱: three lozenges stood one on another, each larger than the last, so that the two sides step out
 * at each storey. Their corners, in the crest's own frame (the centre at 0, y up, the layout circle at 100): the top lozenge's at
 * 80.6 above and 31.5 below (its side corners 40.9 out, 56.1 up), the middle one's at 56.0 and -17.4 (64.1 out, 19.3 up), the
 * lowest one's at 32.9 and -80.6 (97.1 out, 23.9 down, on the layout circle). The outline is the three taken together: the white
 * of the notches is where one lozenge's lower side meets the next one's upper side.
 */
export const sangaiBishi = defineCrest({
  id: "sangai-bishi",
  name: { en: "Three-storey lozenge", ja: "三階菱" },
  reading: "さんがいびし",
  romaji: "sangai-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["sangaibishi", "three-tier lozenge", "stepped lozenge", "三階菱"],
  construction: {
    en: "Three lozenges stood one on another on the upright line through the centre, the top one the smallest, so that the two sides step out at each storey. Their widths are 0.41, 0.64 and 0.97 of the radius, and their side corners stand 0.56, 0.19 above and 0.24 below the centre, in that order. The lowest lozenge's side corners stand on the outer circle, and each lozenge's sides are lines ruled full length.",
    ja: "三つの菱形を、中心を通る縦の線の上に、いちばん上を最も小さくして重ねます。上の段で出ていた両側が、段ごとに外へ出ていきます。菱の幅は、半径に対して上から0.41、0.64、0.97です。横の角の高さは、上の菱から順に、中心から上へ0.56、上へ0.19、下へ0.24の位置です。いちばん下の菱の横の角は外円の上に置き、どの菱も辺は端から端まで引いた直線です。",
  },
  build(c) {
    // Measured as numbers from a public picture of the crest standing over five nail-pullers (Wikimedia Commons, Japanese crest Sanngai Hisi ni itutu Kuginuki): the three lozenges' widths 100, 157 and 238 to the half-width, 59, 90 and 139 high, their side corners at 165, 255 and 361 down from the top of 105 to 500.
    const placing: Placing = { k: R / 100 };
    const storeys = [lozenge(80.6, 40.9, 56.1, 31.5), lozenge(56, 64.1, 19.3, -17.4), lozenge(32.9, 97.1, -23.9, -80.6)];
    c.guideCircle(C0, R);
    c.guideLine(onPage([0, -100], placing), onPage([0, 100], placing));
    for (const shape of storeys) c.guidePath(toPath([polygon(shape)], placing));
    c.fill("diamond", toPath(carve(storeys.map(polygon), []), placing));
  },
});
