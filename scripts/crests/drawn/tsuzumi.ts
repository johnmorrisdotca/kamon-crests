// A tied hand drum measured from frame 22 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, arcA, carve, circleThrough, disc, mirrored, onCircle, reversedRun, rotated, shortArc, thickArc, thickSeg, toPath, type Piece, type Region, type V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const tassel = (paperLine?: number): Region[] => {
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
  const stroke = thickSeg([2, 2], [4.7, -10], paperLine ?? .9);
  return carve(silk, [stroke, stroke.map(mirrored), thickSeg([0, 2], [0, -10.5], paperLine ?? .85)]);
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

const band = (a: V, b: V, r: number, hint: V, width: number): Region => {
  const line = shortArc(circleThrough(a, b, r, hint), a, b) as Extract<Piece, { t: "A" }>;

  return thickArc(line.c, line.r, width, line.a0, line.a1);
};

export const tsuzumiFrontBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const rear: V = [0, 13];
  const front: V = [0, -15];
  const rearRadius = 73;
  const clearanceRadius = 75;
  const y = (clearanceRadius ** 2 - rearRadius ** 2 - 56) / 56;
  const x = Math.sqrt(rearRadius ** 2 - (y - rear[1]) ** 2);
  const backAngle = Math.atan2(y - rear[1], x);
  const frontAngle = Math.atan2(y - front[1], x);
  const crescent = [
    arcA(rear, rearRadius, backAngle, Math.PI - backAngle),
    arcA(front, clearanceRadius, Math.PI - frontAngle, frontAngle),
  ];
  const backLace = [thickSeg([-47, 65], [-45, 47], 2.3), thickSeg([-44, 64], [-35, 54], 2.2)];
  c.fill("hand-drum", toPath([crescent, ...backLace, ...backLace.map((item) => item.map(mirrored))], { k: 0.96 }), "evenodd");

  const cord = band([-47, -74], [-76, -52], 45, [-40, -35], 5.7);
  const cordLight = band([-47, -74], [-76, -52], 45, [-40, -35], 2);
  const knot = disc([-78, -48], 8.1);
  const silk = [
    thickSeg([-80, -43], [-81, -50], 1.8), thickSeg([-77, -43], [-78, -51], 1.8),
    thickSeg([-74, -44], [-75, -52], 1.7),
  ];
  const tie = [cord, cordLight, knot, ...silk];
  c.fill("hand-drum", toPath(tie, { k: 0.96 }), "evenodd");
  c.fill("hand-drum", toPath(tie.map((item) => item.map(mirrored)), { k: 0.96 }), "evenodd");

  const centre: V = [0, 0];
  const face = [disc(centre, 72), disc(centre, 68.3), disc(centre, 65.4), disc(centre, 28.5)];
  const lace = [
    thickSeg([0, 65], [0, 57], 2.2),
    thickSeg([-4.2, 65], [-6, 58.4], 1.9),
    thickSeg([4.2, 65], [6, 58.4], 1.9),
  ];
  const knots = [0, 60, 120, 180, 240, 300].flatMap((turn) =>
    lace.map((shape) => shape.map((part) => rotated(part, turn * DEG))),
  );

  c.fill("hand-drum", toPath([...face, ...knots], { k: 0.96, at: [0, -14.4] }), "evenodd");
};
