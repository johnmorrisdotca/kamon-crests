// Additional ivy arrangements from frame 22 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carve, circleThrough, disc, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const ivyBow = (from: V, to: V, radius: number, hint: V): Region[number] =>
  shortArc(circleThrough(from, to, radius, hint), from, to);

const ivyStroke = (piece: Region[number], width: number): Region => piece.t === "A"
  ? thickArc(piece.c, piece.r, width, piece.a0, piece.a1)
  : thickSeg(piece.a, piece.b, width);

const toothedIvy = (): Region[] => {
  const centre: V = [0, 17];
  const tip: V = [0, -94];
  const side: V[] = [[0, 62], [31, 80], [52, 81], [45, 68], [76, 73], [65, 60], [80, 59], [68, 51], [95, 33], [88, 29],
    [101, 6], [89, 9], [91, -20], [78, -15], [73, -42], [58, -35], [57, -56], [41, -47], [35, -69], [24, -62], [20, -78], [0, -94]];
  const full = [...side, ...side.slice(1, -1).reverse().map(([x, y]): V => [-x, y])];
  const boundary = full.map((point, index) => seg(point, full[(index + 1) % full.length]));
  const white: Region[] = [disc(centre, 8.6), thickSeg([0, 63], [0, -86], 2.15)];
  for (const sign of [-1, 1]) {
    white.push(ivyStroke(ivyBow(centre, [sign * 89, 22], 111, [sign * 30, -80]), 2.5));
    white.push(ivyStroke(ivyBow(centre, [sign * 67, -36], 85, [-sign * 10, -67]), 2.37));
    for (const [offset, x, y] of [[5, 24, -64], [14, 27, -51], [22, 38, -38], [30, 50, -25], [38, 71, -13]]) {
      const foot: V = [0, tip[1] + offset * 1.52];
      const end: V = [sign * x, y];
      white.push(ivyStroke(ivyBow(foot, end, 94, [sign * 86, foot[1] - 15]), 1.85));
    }
    for (const [x, y] of [[20, 66], [39, 63], [53, 54], [66, 43]]) {
      white.push(ivyStroke(ivyBow([sign * 8.5, 23], [sign * x, y], 79, [sign * 82, 14]), 1.95));
    }
  }
  return [...carve([boundary], white), disc(centre, 6.55)];
};


/** The book prints the pointed pattern again inside a medium ring. */
export const chuwaNiOniTsutaBuild = (c: Builder, inner: number): void => {
  c.precision(3);
  c.guideLine([100, 4], [100, 196]);
  c.fill("ivy", toPath(toothedIvy(), { k: (inner - 2.8) / 105 }));
};
