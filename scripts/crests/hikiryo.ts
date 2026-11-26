// Bar crests (引両) from the 1892 crest book: two bars crossed. Every shape is the space between full-length ruled lines, and every
// proportion is a number measured from the book's own cell, never traced.
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, R, poly } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest, fam } from "./util.ts";

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
