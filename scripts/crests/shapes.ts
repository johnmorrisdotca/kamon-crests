// Plain crests of squares, discs and bars, the second round: each is the space between full-length ruled lines, or discs struck
// on the crossings of them. The proportions are numbers measured from public pictures of the crests, never traced; the sources
// are named beside each build and in docs/provenance.md.
import { RING_GAP } from "../construct/builder.ts";
import { discsBuild } from "./drawn/families.ts";
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, Path, R } from "../construct/geo.ts";
import { carve, disc, onPage, seg, shortArc, toPath } from "../construct/compass.ts";
import type { Circle, Placing, Piece, Region, V } from "../construct/compass.ts";
import { yukiwaBuild } from "./drawn/yukiwa.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
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
  measured: "Two public pictures of the ringed crest, read as distances along the level line through the centre: the Wikimedia Commons picture Japanese Crest Maru ni Kuginuki (hole 0.148 of the diamond across) and the repository's reference sheet of ringed crests (0.249); the drawing takes the middle, 0.20. No unringed picture was found, so the diamond is the ringed crest's, 0.78 to 0.80 of the ring's diameter.",
  name: { en: "Nail-puller", ja: "釘抜" },
  reading: "くぎぬき",
  romaji: "kuginuki",
  frame: "none",
  motifs: [{ motif: "nail-puller", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["nail puller", "nail extractor", "kuginuki-mon"],
  construction: {
    en: "A square stood on its corner, its four corners on the outer circle where the upright and the level line through the centre meet it, with a small square hole in the middle whose corners lie 0.2 of the way out on the same two lines. Each side is a line ruled full length.",
    ja: "正方形を角で立てます。四つの角は、中心を通る縦の線と横の線が外円と交わる点です。真ん中に小さな四角い穴をあけ、穴の四つの角は、同じ二本の線の上、中心から半径の0.2の距離に置きます。辺はどれも端から端まで引いた直線です。",
  },
  build(c) {
    // The hole's corners are 0.152 of the way out to the square's in a public picture of the ringed crest (Wikimedia Commons, Japanese Crest Maru ni Kuginuki) and 0.249 in the repository's reference sheet of ringed crests; the drawing takes 0.20, between them.
    kuginukiBuild(c, "nail-puller", R);
  },
});

export const maruNiKuginuki = defineCrest({
  id: "maru-ni-kuginuki",
  measured: "The same two pictures as the nail-puller, read as parts of the ring's diameter: ring 0.090 in both (the package's 0.087), white between ring and diamond 0.019 and 0.011 (the package's 0.018), diamond across 0.782 and 0.798.",
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
 * units across: a square is 3, its hole 1, and the white between two squares 1, so the sixteen lines through the crossings stand
 * 0.5, 1.5, 2.5 and 3.5 units either side of the centre, eight upright and eight level. The outer corners stand on the layout circle.
 */
export const hiraYotsume = defineCrest({
  id: "hira-yotsume",
  measured: "The Wikimedia Commons picture Nanatsuwari-hira-yotsume, as numbers in its own units: each square 4150 across, each hole 1380, the white between squares 1382; that is 3, 1 and 1 in seven parts, and the same in ours to a thousandth of the width.",
  name: { en: "Flat four eyes", ja: "平四つ目" },
  reading: "ひらよつめ",
  romaji: "hira yotsume",
  frame: "none",
  motifs: [{ motif: "four-eyes", count: 4, arrangement: "rows" }],
  families: [],
  aliases: ["four squares", "yotsume", "nanatsuwari hira yotsume", "七つ割平四つ目"],
  construction: {
    en: "Four squares set two by two with their sides upright and level, a square hole in the middle of each. Across the crest it is seven parts: a square is three, its hole one, and the white between neighbours one. Sixteen lines are ruled full length, eight upright and eight level, at 0.5, 1.5, 2.5 and 3.5 parts either side of the centre, and the outer corners stand on the outer circle.",
    ja: "四つの正方形を、辺を縦横にそろえて二つずつ並べ、それぞれの真ん中に四角い穴をあけます。全体の幅を7とすると、正方形の一辺は3、穴の一辺は1、となり合う正方形の間の白は1です。中心から左右・上下に0.5、1.5、2.5、3.5の位置に、縦の直線と横の直線を八本ずつ、端から端まで引き、いちばん外の角は外円の上に置きます。",
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
  measured: "The Wikimedia Commons picture Japanese Crest kaku Kuyoh, as numbers in its own units: each disc 91.3 across the radius, the centres 186.8 apart (0.4888); the white between neighbours is 0.0075 of the crest's width.",
  name: { en: "Nine luminaries in a square", ja: "角九曜" },
  reading: "かくくよう",
  romaji: "kaku kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 9, arrangement: "rows" }],
  families: [],
  aliases: ["nine discs", "square kuyo", "nine stars in a square", "kaku kuyou"],
  construction: {
    en: "Nine discs of one size in three rows of three. A circle of the spacing of the centres is struck about the middle, and the upright and level lines through its crossings with the two axes are ruled full length; a disc of radius 0.49 of the spacing is struck on each of the nine crossings, so a narrow white lies between neighbours. The outermost points of the four corner discs stand on the outer circle.",
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
  measured: "The Wikimedia Commons picture Maru ni tate futatsu hikiryo, read along the level line through the centre as parts of the ring's diameter: ring 0.084, each bar 0.167 wide with the same of white between, the bars' centres 0.167 either side of the middle.",
  name: { en: "Two upright bars in a circle", ja: "丸に竪二つ引両" },
  reading: "まるにたてふたつひきりょう",
  romaji: "maru ni tate futatsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["tate futatsu hikiryo", "two upright lines", "two vertical bars", "丸に立二つ引両", "丸に縦二つ引両"],
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
  measured: "The Wikimedia Commons picture Maru ni tate mitu Hiki, as numbers in its own units: bars 80 wide, their centres 164 apart, the ring's outer radius 343: of the ring's radius, bars 0.233 wide and 0.478 apart. Its ring is thicker (0.102 of the diameter) than the package's 0.087, which is kept.",
  name: { en: "Three upright bars in a circle", ja: "丸に竪三つ引両" },
  reading: "まるにたてみつひきりょう",
  romaji: "maru ni tate mitsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["tate mitsu hikiryo", "three upright lines", "three vertical bars", "丸に立三つ引両", "丸に縦三つ引両"],
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
  measured: "Two public pictures: the Wikimedia Commons pictures Japanese crest Sanngai Hisi ni itutu Kuginuki (the three storeys read off row by row, the five nail-pullers below them left out) and Japanese crest sanngai bisi. In both the storeys' half-widths are 0.42, 0.66 and 1 of the lowest's (the two agree to 0.003), their side corners 0.15, 0.38 and 0.65 of the height down, and the height 0.83 and 0.82 of the width.",
  name: { en: "Three-storey lozenge", ja: "三階菱" },
  reading: "さんがいびし",
  romaji: "sangai-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["sangaibishi", "three-tier lozenge", "stepped lozenge", "三階菱"],
  construction: {
    en: "Three lozenges stood one on another on the upright line through the centre, the top one the smallest, so that the two sides step out at each storey. Their side corners stand 0.41, 0.64 and 0.97 of the radius out from the upright line, and their side corners stand 0.56, 0.19 above and 0.24 below the centre, in that order. The lowest lozenge's side corners stand on the outer circle, and each lozenge's sides are lines ruled full length.",
    ja: "三つの菱形を、中心を通る縦の線の上に、いちばん上を最も小さくして重ねます。上から下へ、段ごとに両側が外へ広がります。横の角は、上の菱から順に、中心を通る縦の線から左右に、半径の0.41、0.64、0.97の距離にあります。その高さは、中心から上へ0.56、上へ0.19、下へ0.24の位置です。いちばん下の菱の横の角は外円の上に置き、どの菱も辺は端から端まで引いた直線です。",
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

/**
 * A single lozenge 菱, wider than it is high: its side corners at the ends of the level line through the centre, on the circle of
 * `reach`, and its top and bottom corners on the upright line, 0.69 of that out (the proportion of a ringed lozenge measured as
 * 0.798 across the half-width and 0.551 up the half-height). Each side is a line ruled full length.
 */
const hitotsuBishiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const [a, b] = [100, 69];
  c.guideCircle(C0, reach);
  c.guideCircle(C0, b * placing.k);
  c.guideLine(onPage([-a, 0], placing), onPage([a, 0], placing));
  c.guideLine(onPage([0, -b], placing), onPage([0, b], placing));
  const lozenge: V[] = [[0, b], [a, 0], [0, -b], [-a, 0]];
  c.guidePath(toPath([polygon(lozenge)], placing));
  c.fill(part, toPath([polygon(lozenge)], placing));
};

export const hitotsuBishi = defineCrest({
  id: "hitotsu-bishi",
  measured: "The Wikimedia Commons picture Kamon Maru ni Hitotsubishi, read along the level and upright lines through the centre as parts of the ring's diameter: the lozenge 0.798 across and 0.551 high, so 0.69; its ring 0.090. No unringed picture was found, so the lozenge is the ringed crest's.",
  name: { en: "Single lozenge", ja: "一つ菱" },
  reading: "ひとつびし",
  romaji: "hitotsu-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["one lozenge", "lozenge", "hishi", "hitotsubishi", "ichimai bishi"],
  construction: {
    en: "One lozenge wider than it is high. Its side corners are where the level line through the centre meets the outer circle, and its top and bottom corners are where the upright line meets a circle 0.69 of the radius; each side is a line ruled full length.",
    ja: "横の長い菱形を一つ置きます。左右の角は、中心を通る横の線が外円と交わる点、上下の角は、縦の線が半径の0.69の円と交わる点です。辺はどれも端から端まで引いた直線です。",
  },
  build(c) {
    // Proportion measured from a public picture of the ringed crest (Wikimedia Commons, Kamon Maru ni Hitotsubishi): across 0.798 of the ring's diameter, up 0.551: 0.69.
    hitotsuBishiBuild(c, "diamond", R);
  },
});

export const maruNiHitotsuBishi = defineCrest({
  id: "maru-ni-hitotsu-bishi",
  measured: "The same picture as the single lozenge: ring 0.088 to 0.092 of the diameter, white between ring and lozenge 0.012, lozenge 0.798 across and 0.551 high.",
  name: { en: "Single lozenge in a circle", ja: "丸に一つ菱" },
  reading: "まるにひとつびし",
  romaji: "maru ni hitotsu-bishi",
  frame: "ring-medium",
  motifs: [{ motif: "diamond", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hitotsu-bishi in a ring", "lozenge in a circle", "ringed lozenge"],
  construction: {
    en: "The single lozenge laid out inside a ring about a tenth of the diameter thick, its side corners a narrow white from the ring.",
    ja: "直径の約10分の1の太さの輪の内側に、左右の角が輪に触れないよう細い白を残して、一つ菱を割り付けます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    hitotsuBishiBuild(c, "diamond", inner - RING_GAP);
  },
});

export const maruNiShichiyo = defineCrest({
  id: "maru-ni-shichiyo",
  name: { en: "Seven luminaries in a circle", ja: "丸に七曜" },
  reading: "まるにしちよう",
  romaji: "maru ni shichiyō",
  frame: "ring-medium",
  motifs: [{ motif: "star", count: 7, arrangement: "ring" }],
  families: [],
  aliases: ["seven stars ring", "shichiyo ring", "shichiyou in a circle"],
  construction: {
    en: "A disc with six more round it, all of one size, laid out inside a ring about a tenth of the diameter thick: the compass is stepped round the circle of the six centres from the top, and each disc stands a narrow white from its neighbours, from the middle one and from the ring.",
    ja: "同じ大きさの円を七つ、一つを中央に、六つをそのまわりに置き、直径の約10分の1の太さの輪の内側に割り付けます。六つの中心を通る円の上を、コンパスの幅を変えずに12時の位置から時計回りに進めて中心を決め、どの円も、となりの円、中央の円、輪との間に細い白を残します。",
  },
  measured: "The seven discs are those of the seven luminaries (the Wikimedia Commons picture Shichiyoumon: discs 0.328 of the outer circle, the six 0.673 out), set inside the package's measured ring and white; no picture of the ringed crest was found to read them from.",
  build(c) {
    const inner = c.ring("ring-medium");
    discsBuild(c, "star", inner - RING_GAP, { n: 6, ring: 67.5, r: 32.5, centre: 32.5 });
  },
});

/**
 * The bar 一文字 as the brush writes it: a level top, a slightly bowed underside, a heavy round heel at the left and a rising,
 * rounded end at the right. In the crest's own frame (the centre at 0, y up, the layout circle at 100, which the two ends touch)
 * it is nine pieces: the ruled top, the arc that lifts it into the right end's peak, the right end's two arcs, a ruled slant, the
 * underside's wide arc, the heel's two arcs and the hollow arc that runs down from the left end's peak. Each arc is the circle
 * through three points set out from the measured picture, and the top and the slant are lines ruled full length.
 */
const ichimonjiBuild = (c: Builder, part: string): void => {
  const placing: Placing = { k: R / 100 };
  // Points of the picture (a 1000 px picture, the bar 807 px long), set into the frame: 100 is 404 px, the bar's own centre the origin.
  const at = (x: number, y: number): V => [(x - 499.5) * (100 / 404), (500 - y) * (100 / 404)];
  const through = (a: V, b: V, d: V): Circle => circleThrough3(a, b, d);
  const [top0, top1, peak, farRight, footRight, slantEnd, join, heel1, tipLeft] = [at(227, 444), at(600, 444), at(812, 398), at(903, 534), at(820, 602), at(728, 582), at(236, 595), at(113, 540), at(105, 413)];
  const rise = through(top1, at(736, 432), peak);
  const bulgeU = through(peak, at(860, 438), farRight);
  const bulgeL = through(farRight, at(888, 576), footRight);
  const under = through(slantEnd, at(570, 577), join);
  const heelL = through(join, at(153, 582), heel1);
  const heelU = through(heel1, at(98, 444), tipLeft);
  const hollow = through(tipLeft, at(149, 432), top0);
  const outline: Piece[] = [seg(top0, top1), shortArc(rise, top1, peak), shortArc(bulgeU, peak, farRight), shortArc(bulgeL, farRight, footRight), seg(footRight, slantEnd), shortArc(under, slantEnd, join), shortArc(heelL, join, heel1), shortArc(heelU, heel1, tipLeft), shortArc(hollow, tipLeft, top0)];
  c.guideCircle(C0, R);
  c.guideLine(onPage(top0, placing), onPage(top1, placing));
  c.guideLine(onPage(footRight, placing), onPage(slantEnd, placing));
  for (const circ of [rise, bulgeU, bulgeL, under, heelL, heelU, hollow]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
  c.fill(part, toPath([outline], placing));
};

/** The circle through three points. */
const circleThrough3 = (a: V, b: V, d: V): Circle => {
  const k = 2 * (a[0] * (b[1] - d[1]) + b[0] * (d[1] - a[1]) + d[0] * (a[1] - b[1]));
  const sq = (p: V): number => p[0] * p[0] + p[1] * p[1];
  const x = (sq(a) * (b[1] - d[1]) + sq(b) * (d[1] - a[1]) + sq(d) * (a[1] - b[1])) / k;
  const y = (sq(a) * (d[0] - b[0]) + sq(b) * (a[0] - d[0]) + sq(d) * (b[0] - a[0])) / k;

  return { c: [x, y], r: Math.hypot(a[0] - x, a[1] - y) };
};

export const ichimonji = defineCrest({
  id: "ichimonji",
  name: { en: "Single bar", ja: "一文字" },
  reading: "いちもんじ",
  romaji: "ichimonji",
  frame: "none",
  motifs: [{ motif: "bar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["one", "the character one", "brush bar", "ichimonji-mon"],
  construction: {
    en: "The character 一 as the brush writes it, from side to side of the outer circle: a level top ruled across, a bowed underside, a heavy round heel at the left and a rising rounded end at the right. Its nine edges are two lines ruled full length and seven arcs of circles struck for them; the two ends touch the outer circle.",
    ja: "筆で書いた「一」の字を、外円の左端から右端まで、横いっぱいに置きます。上は水平に引いた直線、下はゆるく反った弧で、左の端は筆を置いた重い丸み、右の端は反り上がる丸い終わりです。九つの辺は、端から端まで引いた二本の直線と、そのために描いた七つの円の弧です。両端は外円に接します。",
  },
  measured: "The Wikimedia Commons picture Japanese Crest Ichimonji, read row by row as the outline's positions in its own pixels (the bar 807 across and about 200 high, the top level from 227 to 600 at 444, the underside bowed 5 to 8 up in the middle, the heel's leftmost point at 96 and the right end's at 903). The seven arcs are the circles through three of those positions each, and the other positions lie within 0.7 of the circle's radius of 100.",
  build(c) {
    ichimonjiBuild(c, "bar");
  },
});

/**
 * The stacked three-storey lozenge 重ね三階菱: three whole lozenges set one over another down the upright line, each larger than
 * the one above and lying under it, a narrow white left between neighbours. In the crest's own frame (the centre at 0, y up, the
 * layout circle at 100, on which the side corners of the lowest lozenge stand): the lozenges' top corners are at 86.05, 58.65
 * and 31.23, their side corners 57.25, 77 and 96 out at 51.13, 12 and -27.4, and the white is 1.85 across. The white round a lozenge is the same lozenge struck larger about its own centre, so that its sides run parallel to
 * the lozenge's at that distance; the lozenge beneath is cut by it.
 */
export const kasaneSangaiBishi = defineCrest({
  id: "kasane-sangai-bishi",
  name: { en: "Stacked three-storey lozenge", ja: "重ね三階菱" },
  reading: "かさねさんがいびし",
  romaji: "kasane sangai-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["kasane sangaibishi", "layered three-tier lozenge", "stacked lozenges", "重ね三階菱"],
  construction: {
    en: "Three whole lozenges, one over another on the upright line through the centre, each larger than the one above and lying under it, with a narrow white between neighbours. Their side corners stand 0.57, 0.77 and 0.96 of the radius out, and the white is the lozenge above struck a little larger about its own centre, so that its sides run parallel to the lozenge's at that distance. Every side is a line ruled full length.",
    ja: "三つの菱形を、中心を通る縦の線の上に、一つずつ下に重ねて置きます。下の菱ほど大きく、上の菱の下に隠れ、となり合う菱の間に細い白を残します。横の角は、上の菱から順に、中心を通る縦の線から左右に、半径の0.57、0.77、0.96の距離にあります。白は、上の菱を、その中心はそのままに少し大きく広げた形で、辺はもとの菱の辺と平行に、一定の間隔を置いて走ります。辺はどれも端から端まで引いた直線です。",
  },
  measured: "The Wikimedia Commons picture Japanese Crest kasane Sanngai Hisi, read row by row in its own pixels (the crest 808 across): the three lozenges' side corners 240, 324 and 404 out at 285, 449 and 615 down, their top corners at 138, 253 and 368 (the lowest one's bottom corner then 861, as far below the middle as the top is above it), their sides all at the same slope (1.65 across to 1), and the white 15 across the level, 7.8 at right angles to the sides.",
  build(c) {
    const placing: Placing = { k: R / 100 };
    const lozenges = [lozenge(86.05, 57.25, 51.13, 16.21), lozenge(58.65, 77, 12, -34.65), lozenge(31.23, 96, -27.4, -86.03)];
    // A lozenge struck larger about its own centre, by `g` out at right angles to its sides.
    const grown = (top: number, w: number, y: number, g: number): V[] => {
      const h = top - y;
      const f = 1 + (g * Math.hypot(w, h)) / (w * h);

      return lozenge(y + h * f, w * f, y, y - h * f);
    };
    c.guideCircle(C0, R);
    c.guideLine(onPage([0, -100], placing), onPage([0, 100], placing));
    const white = [grown(86.05, 57.25, 51.13, 1.85), grown(58.65, 77, 12, 1.85)];
    for (const shape of [...lozenges, ...white]) c.guidePath(toPath([polygon(shape)], placing));
    c.fill("diamond", toPath([polygon(lozenges[0])], placing));
    c.fill("diamond", toPath(carve([polygon(lozenges[1])], [polygon(white[0])]), placing));
    c.fill("diamond", toPath(carve([polygon(lozenges[2])], [polygon(white[1])]), placing));
  },
});

export const yukiwa = defineCrest({
  id: "yukiwa",
  measured: "The ゆきわ of the 1892 crest book (frame 15, left page, row 4, column 1), read along lines from the centre as parts of the outer radius: the band is 0.095 across between the middle of its two lines, rises and falls in bumps that reach 0.96 to 1.0 and notch to 0.93, and has six ears, each a curl that reaches in to 0.72 to 0.74 with a small drop in it. The book draws it in outline and by hand: the ears stand about 35 degrees from upright and 60 apart, and two or three bumps lie between them. The Wikimedia Commons picture Yukiwa (Japanese crest, inverted) was read the same way, for comparison only: twelve bumps, big and small in turn, the ears on the big ones at 30 degrees and 60 apart, the band 0.083 across, and a curl 0.12 across. The drawing has a big bump of 45 about 53 out and a small one of 27 about 73 out, a band 9 wide, and a curl of 12 about 87 out holding a white drop of 5.",
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "left page, fourth row, first column: ゆきわ (measured, and drawn with compass and ruler)", ja: "左頁、四段目の一列目「ゆきわ」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  name: { en: "Snow ring", ja: "雪輪" },
  reading: "ゆきわ",
  romaji: "yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["snow circle", "snowflake ring"],
  construction: {
    en: "A band that rises and falls in twelve round bumps, a big one and a small one in turn. Every bump is a circle, and the band is the space between it and the same circle taken in by 9. Each big bump curls into an ear, a round curl with a small white drop in it that points out. One unit, a small bump and the big one after it, is built in full, and the other five where they stand, clockwise.",
    ja: "大小の丸い山が交互に十二ならぶ帯です。山はどれも円の弧で、帯は、その円と、中心が同じで幅9だけ小さい円との間です。大きい山は内側に巻いて耳になり、耳の中には、外へ向かう小さな白いしずくがあります。小さい山と、そのあとの大きい山を一組として一つ作図し、残り五つはその場で時計回りに作図します。",
  },
  build(c) {
    yukiwaBuild(c, "snow-ring", R);
  },
});
