// Bar crests (引両) from the 1892 crest book: bars across an eight-sided frame, and two bars crossed. Every shape is the space between full-length ruled lines, and every
// proportion is a number measured from the book's own cell, never traced.
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, Path, R, poly } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest, fam } from "./util.ts";

/** The corners of an eight-sided frame about the middle, clockwise from the top left: sides upright and level at `half` out, flat sides `flat` long to each side of the axes. */
const octagon = (half: number, flat: number): Pt[] =>
  [[-flat, -half], [flat, -half], [half, -flat], [half, flat], [flat, half], [-flat, half], [-half, flat], [-half, -flat]].map(([x, y]) => [CX + x, CY + y] as Pt);

/** The part of a convex polygon on the inner side of the line through `a` and `b` (clockwise polygon, y down: the right of a to b). */
const keepRight = (points: Pt[], a: Pt, b: Pt): Pt[] => {
  const side = (p: Pt): number => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const out: Pt[] = [];
  points.forEach((p, i) => {
    const q = points[(i + 1) % points.length];
    const [sp, sq] = [side(p), side(q)];
    if (sp >= 0) out.push(p);
    if ((sp > 0 && sq < 0) || (sp < 0 && sq > 0)) {
      const t = sp / (sp - sq);
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  });

  return out;
};

/** A strip between two slanting lines `near` and `far` from the middle (measured at right angles, the lines running down to the right), cut to a convex frame. */
const stripIn = (frame: Pt[], near: number, far: number): Pt[] => {
  const h = Math.SQRT1_2;
  // A point `p` across from the middle along the normal (h, -h) is `p` at right angles to the lines; the lines run along (h, h).
  const through = (p: number): [Pt, Pt] => [[CX + h * p, CY - h * p], [CX + h * p + h, CY - h * p + h]];
  const [n1, n2] = [through(near), through(far)];
  // Keep what is on the far side of `near` and on the near side of `far`: a polygon clipped by each line in turn.
  const upper = keepRight(frame, n1[1], n1[0]);

  return keepRight(upper, n2[0], n2[1]);
};

/** Where the line through `p` along `d` meets the line through `q` along `e`. */
const meet = (p: Pt, d: Pt, q: Pt, e: Pt): Pt => {
  const t = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / (d[0] * e[1] - d[1] * e[0]);

  return [p[0] + d[0] * t, p[1] + d[1] * t];
};

/**
 * Two bars crossed: each is `width` across and runs `length` from end to end through the middle, at `slant` degrees from the level
 * line, one falling to the right and one rising. The outline of the two together is the eight corners of the ends and the four
 * points where their edges cross, taken in order round the middle.
 */
const crossedBars = (c: Builder, width: number, length: number, slant: number): void => {
  const a = (slant * Math.PI) / 180;
  const [d1, d2]: [Pt, Pt] = [[Math.cos(a), Math.sin(a)], [Math.cos(a), -Math.sin(a)]];
  const [n1, n2]: [Pt, Pt] = [[-d1[1], d1[0]], [-d2[1], d2[0]]];
  const hw = width / 2;
  const at = (x: number, y: number): Pt => [CX + x, CY + y];
  const corners: Pt[] = [];
  for (const [d, n] of [[d1, n1], [d2, n2]] as [Pt, Pt][]) {
    for (const end of [-1, 1]) for (const side of [-1, 1]) corners.push(at(end * (length / 2) * d[0] + side * hw * n[0], end * (length / 2) * d[1] + side * hw * n[1]));
  }
  for (const s1 of [-1, 1]) for (const s2 of [-1, 1]) corners.push(meet(at(s1 * hw * n1[0], s1 * hw * n1[1]), d1, at(s2 * hw * n2[0], s2 * hw * n2[1]), d2));
  const round = (p: Pt): number => Math.atan2(p[0] - CX, CY - p[1]);
  corners.sort((p, q) => round(p) - round(q));
  c.guideCircle(C0, R);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.fill("line", poly(corners));
};

export const niwaChigaiBo = defineCrest({
  id: "niwa-chigai-bo",
  measured:
    "The 1892 crest book's 丹羽ちがひ棒 (frame 43, left page, row 4, column 4 from the right), two bars crossed, each with square ends, read as the positions of their corners in the frame's own pixels: each bar 62 across and 322 and 308 long from end to end, one falling to the right at 41 degrees from the level line and the other rising at 35, so the outer corners stand 160 from the middle. The drawing makes the two bars alike and mirrored, each 37 across and 188.4 long, at 38 degrees, the ends' corners on the outer circle.",
  source: cell(43, "left page, row 4, fourth column from the right: 丹羽ちがひ棒", "左頁、四段目、右から四列目「丹羽ちがひ棒」"),
  name: { en: "Niwa crossed bars", ja: "丹羽違い棒" },
  reading: "にわちがいぼう",
  romaji: "niwa chigai bō",
  frame: "none",
  motifs: [{ motif: "line", count: 2, arrangement: "crossed" }],
  families: [fam("Niwa", "丹羽", "にわ")],
  aliases: ["丹羽ちがひ棒", "niwa chigai bo", "crossed bars"],
  construction: {
    en: "Two bars crossed in an X, each a fifth as wide as it is long, at 38 degrees above and below the level line, the corners of their ends on the outer circle. Every edge is ruled full length, and the crest is the space where the bars lie.",
    ja: "二本の棒をX字に交差させます。棒の太さは長さの約5分の1で、水平から上下に38度ずつ傾け、両端の角は外円の上に置きます。辺はどれも端から端まで引き、棒の重なった形が家紋になります。",
  },
  build(c) {
    const width = 37;
    crossedBars(c, width, 2 * Math.sqrt(R * R - (width / 2) ** 2), 38);
  },
});

export const sumikiriKakuNiMitsuHikiryo = defineCrest({
  id: "sumikiri-kaku-ni-mitsu-hikiryo",
  measured:
    "The 1892 crest book's 角切ニ三ッ引 (frame 43, left page, row 3, column 4 from the right), an eight-sided frame drawn as two outlines with six lines running from top left to bottom right across the inside, read as the positions of those lines in the frame's own pixels, counted along a line at half a right angle to them from the middle: the two slanting sides of the inner outline (144 and 152 out, one each side) and four lines between them (109 and 38 out on one side, 38 and 109 on the other), so that three bars lie between pairs of lines (a bar 35 across at each end and one 76 across in the middle, the two ends touching the corners of the frame) and a white about 70 across lies between the bars. The outer outline is 287 across with its flat sides 145 long and the inner 188 across with flat sides 109, so the inner is 0.65 of the outer. The drawing puts the outer corners on the outer circle (the outer eight-sided frame 83.4 out to its sides, the inner 0.654 of it) and the bars 45 and 16 each side of the middle across the slant, and, where the book's single line parts a bar from the frame, a narrow white line of 2, so that the three bars stand apart from the frame and from each other.",
  source: cell(43, "left page, row 3, fourth column from the right: 角切ニ三ッ引", "左頁、三段目、右から四列目「角切ニ三ッ引」"),
  name: { en: "Three bars in a cut-corner square", ja: "隅切り角に三つ引両" },
  reading: "すみきりかくにみつひきりょう",
  romaji: "sumikiri kaku ni mitsu hikiryō",
  frame: "none",
  motifs: [{ motif: "cut-corner-square", count: 1, arrangement: "single" }, { motif: "line", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["隅切り角に三つ引き", "角切に三つ引", "隅切角に三つ引", "sumikiri kaku ni mitsu hiki", "three bars in an octagon"],
  construction: {
    en: "A frame of eight sides, its corners on the outer circle, about a sixth of its width thick, and inside it three separate bars from top left to bottom right at half a right angle: a middle bar 31 across and a bar 16 across at each end, a white of about 29 across between the bars, and a narrow white line between the bars and the frame. The frame's inner outline is the outer one scaled by 0.65. Every side is ruled full length.",
    ja: "角が外円の上にある八角形の枠で、太さは幅の約6分の1です。その内側を、左上から右下へ斜め45度に、離れた三本の棒が入ります。真ん中の棒は幅31、両端の棒は幅16で、棒の間には幅29ほどの白があり、棒と枠の間には細い白線が一本あります。枠の内側の輪郭は外側の輪郭を0.65倍にしたもので、辺はどれも端から端まで引きます。",
  },
  build(c) {
    const half = 83.4;
    const flat = Math.sqrt(R * R - half * half);
    const scale = 0.654;
    const inner = octagon(half * scale, flat * scale);
    // Inside the frame by a narrow white line: each side moved in 2, so a slanting side moves in 2 across and the flat sides 2 less than the slant is long.
    const gap = 2;
    const apart = octagon(half * scale - gap, flat * scale - gap * (Math.SQRT2 - 1));
    c.guideCircle(C0, R);
    c.guideLine([CX, CY - R], [CX, CY + R]);
    c.guideLine([CX - R, CY], [CX + R, CY]);
    c.fill("cut-corner-square", poly(octagon(half, flat)).join(poly(inner)), "evenodd");
    // The bars, clockwise from the top right: the one at the top right, the middle one, the one at the bottom left.
    for (const [near, far] of [[45, 200], [-16, 16], [-200, -45]]) c.fill("line", poly(stripIn(apart, near, far)));
  },
});

export const maruNiHanareMitsuHikiryo = defineCrest({
  id: "maru-ni-hanare-mitsu-hikiryo",
  measured:
    "The 1892 crest book's 丸ニはなれ三ッ引 (frame 43, left page, row 3, column 3 from the right: the cell stands to the left of its label, which is on its right), three bars inside a ring drawn as two outlines, read as the positions of its lines in the frame's own pixels: the ring's outer outline 312 across (156 out) and its inner one 265 across (132 out), so the ring is 0.075 of the diameter thick, between the package's thin ring (0.033) and its medium one (0.087) and nearer the medium; three bars of 53, 56 and 53 high with a white of 29 between them, centred on the ring; the bars' ends 8 to 10 short of the ring's inner outline at the sides, and the top and bottom bars' outer edges 20 short of it. The drawing uses the package's medium ring, and bars between level lines at 17.5, 35 and 67.5 from the middle, each bar ending on a circle of 73.5 about the centre, 5.7 inside the ring, so that every bar stands clear of it.",
  source: cell(43, "left page, row 3, third column from the right: 丸ニはなれ三ッ引", "左頁、三段目、右から三列目「丸ニはなれ三ッ引」"),
  name: { en: "Three separate bars in a circle", ja: "丸に離れ三つ引両" },
  reading: "まるにはなれみつひきりょう",
  romaji: "maru ni hanare mitsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["丸に離れ三つ引", "丸ニはなれ三ッ引", "丸に離れ三つ引き", "separate three bars in a circle"],
  construction: {
    en: "Three level bars, the middle one 35 high and the others 32.5, 17.5 of white between them, standing clear of a ring about a tenth of the diameter thick: each bar's ends are arcs of one circle 5.7 inside the ring. Six level lines are ruled full length.",
    ja: "水平な棒を三本、間に17.5の白をはさんで並べます。真ん中の棒は高さ35、上下の棒は32.5です。直径の約10分の1の太さの輪の内側に収め、棒の両端は、輪の5.7内側にある一つの円の弧で、輪には触れません。水平の直線六本を端から端まで引きます。",
  },
  build(c) {
    c.ring("ring-medium");
    const clip = 73.5;
    const half = (y: number): number => Math.sqrt(clip * clip - y * y);
    for (const [near, far] of [[-67.5, -35], [-17.5, 17.5], [35, 67.5]]) {
      const [top, foot] = [CY + near, CY + far];
      c.guideLine([CX - R, top], [CX + R, top]);
      c.guideLine([CX - R, foot], [CX + R, foot]);
      c.fill("line", new Path().M([CX - half(near), top]).L([CX + half(near), top]).A(clip, 0, 1, [CX + half(far), foot]).L([CX - half(far), foot]).A(clip, 0, 1, [CX - half(near), top]).Z());
    }
  },
});
