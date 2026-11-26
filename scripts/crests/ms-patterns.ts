// Pattern and shape crests from the 1892 crest book: squares set on their corner, and the three eyes. Every shape is the space
// between full-length ruled lines, and every proportion is a number measured from the book's own cell, never traced.
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, R, poly } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

const READ_AT = "2026-11-26";

/** The four corners of a square stood on its corner: `h` out from `at` along the upright and level lines. */
const diamond = (h: number, at: Pt = C0): Pt[] => [[at[0], at[1] - h], [at[0] + h, at[1]], [at[0], at[1] + h], [at[0] - h, at[1]]];

/**
 * The square frame stood on its corner 隅立ち角: two diamonds about the centre, the outer one's corners on the layout circle and the
 * inner one's on a circle struck inside it, the black between them. The upright and level lines through the centre meet the two
 * circles in the eight corners, and the eight sides are ruled full length through them.
 */
const sumitachiBuild = (c: Builder, outer: number, inner: number): void => {
  c.guideCircle(C0, outer);
  c.guideCircle(C0, inner);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.fill("square-frame", poly(diamond(outer)).join(poly(diamond(inner))), "evenodd");
};

export const sumitachiKaku = defineCrest({
  id: "sumitachi-kaku",
  measured:
    "The 1892 crest book's すみたち角 (frame 19, right page, row 1, column 3 from the right), a square stood on its corner and drawn as two outlines, read as the positions of its corners in the frame's own pixels: the outer diamond 300 across and 303 high, the inner one 219 across and 217 high, so the inner is 0.72 of the outer and the band between them 29 thick at right angles to its sides, 0.14 of the outer side. The drawing takes the outer corners on the outer circle and a band 26 of the 96 across the corners.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 19,
    place: {
      en: "right page, row 1, third column from the right: すみたち角 (measured, and drawn with compass and ruler)",
      ja: "右頁、一段目、右から三列目「すみたち角」（寸法を測り、コンパスと定規で描いたもの）",
    },
    read: READ_AT,
    measured: true,
  },
  name: { en: "Square on its corner", ja: "隅立ち角" },
  reading: "すみたちかく",
  romaji: "sumitachi kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["隅立て角", "sumitate kaku", "square on a corner", "diamond frame"],
  construction: {
    en: "A square frame stood on its corner: the outer corners on the outer circle, the inner corners on a circle 26 inside it, the black between them. The upright and level lines through the centre meet the two circles in the eight corners, and the eight sides are ruled full length.",
    ja: "角で立てた正方形の枠です。外側の角は外円の上、内側の角は外円より26内側の円の上に置き、その間を黒くします。中心を通る縦と横の直線が二つの円と交わる八つの点が角で、八つの辺は端から端まで引きます。",
  },
  build(c) {
    // 96 to the outer corners and 70 to the inner: the book's 151 and 109 in its own pixels, 0.72.
    sumitachiBuild(c, 96, 70);
  },
});

