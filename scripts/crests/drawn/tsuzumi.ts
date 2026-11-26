// A tied hand drum measured from frame 22 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, onCircle, reversedRun, shortArc, thickArc, thickSeg, toPath, type Region, type V } from "../../construct/compass.ts";

const tassel = (): Region[] => {
  const knot: V = [0, 9];
  const shoulder: V = [5, 2];
  const corner: V = [11, -8];
  const hem: V = [0, -14];
  const bow = (from: V, to: V, r: number, hint: V) => shortArc(circleThrough(from, to, r, hint), from, to);
  const half = [
    bow(knot, shoulder, 12, [-5, 1]),
    bow(shoulder, corner, 19, [17, 5]),
    bow(corner, hem, 11, [4, -6]),
  ];
  const silk = [[...half, ...reversedRun(half.map(mirrored))]];
  const stroke = thickSeg([2, 2], [4.7, -10], .9);
  return carve(silk, [stroke, stroke.map(mirrored), thickSeg([0, 2], [0, -10.5], .85)]);
};

/** A drumhead faces forward, with its tied cord looping behind it. */
export const himotsukiTsuzumiBuild = (c: Builder): void => {
  c.precision(3);
  const centre: V = [0, 20];
  const cords: [V, number, number, number][] = [
    [[-46, -11], 38, 151, 301],
    [[-18, 34], 86, 228, 280],
    [[47, -1], 42, -137, 81],
    [[22, -24], 54, -54, 21],
  ];
  for (const [at, radius, from, to] of cords) {
    const wide = thickArc(at, radius, 5.9, from * DEG, to * DEG);
    const strand = thickArc(at, radius, 1.45, (from + 2) * DEG, (to - 2) * DEG);
    c.fill("hand-drum", toPath(carve([wide], [strand]), { k: 1 }));
  }
  c.fill("hand-drum", toPath(tassel(), { k: .9, at: [-78, -29], turn: -142 }));
  c.fill("hand-drum", toPath(tassel(), { k: 1, at: [49, -73], turn: 42 }));
  const holes = [disc(centre, 29)];
  for (const a of [90, 150, 210, 270, 330, 390]) {
    holes.push(thickArc(centre, 68.8, 2, (a + 3) * DEG, (a + 57) * DEG));
    const at = onCircle(centre, 66, a * DEG);
    for (const delta of [-13, 13]) {
      holes.push(thickSeg(at, onCircle(centre, 57, (a + delta / 4) * DEG), 1.3));
    }
  }
  c.guideLine([100, 4], [100, 196]);
  c.fill("hand-drum", toPath(carve([disc(centre, 72)], holes), { k: 1 }));
};
