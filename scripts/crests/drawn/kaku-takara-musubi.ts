import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, thickSeg, vdist, vmul } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "knot";
const width = 10.5;
const slope = .8;
const spacing = 33;
const lead = 9;
const overlap = .45;
const unit = Math.hypot(1, slope);
const along: V = [lead / unit, lead * slope / unit];
const join: V = [(lead - overlap) / unit, (lead - overlap) * slope / unit];
const flipX = ([x, y]: V): V => [-x, y];
const opposite = (point: V): V => vmul(point, -1);

const corner: V = [24, 24 * slope + spacing];
const returnX = corner[0] + spacing / (2 * slope);
const inner: V = [returnX, slope * returnX];
const shoulder: V = [62, 62 * slope - spacing];
const point: V = [shoulder[0] + shoulder[1] / slope, 0];
const move = ([x, y]: V, [dx, dy]: V): V => [x - dx, y - dy];
const cornerTurn = [move(corner, along), corner, inner, move(inner, along)];
const sideTurn = [move(shoulder, along), shoulder, point, flipX(opposite(shoulder)), flipX(opposite(move(shoulder, along)))];
const turns = [cornerTurn, cornerTurn.map(flipX), cornerTurn.map(opposite), cornerTurn.map((p) => flipX(opposite(p))),
  sideTurn, sideTurn.map(flipX)];
const positive: [V, V][] = [
  [opposite(move(shoulder, join)), move(corner, join)],
  [opposite(move(inner, join)), move(inner, join)],
  [opposite(move(corner, join)), move(shoulder, join)],
];
const courses = [...positive, ...positive.map(([a, b]): [V, V] => [flipX(a), flipX(b)])];

// The first course passes over the second, with paper along both of its edges.
const crossings: [number, number][] = [[0, 5], [4, 0], [0, 3], [3, 1], [1, 4], [5, 1], [2, 5], [4, 2], [2, 3]];

function ruledTurn(c: Builder, points: V[]): void {
  let heading = 0;
  let firstHeading = 0;
  const runs = points.slice(1).map(([x, y], index) => {
    const [px, py] = points[index];
    const next = Math.atan2(y - py, x - px) / DEG;
    const mitre = (heading - next + 540) % 360 - 180;
    if (index === 0) firstHeading = next;
    heading = next;
    const length = vdist([px, py], [x, y]);
    return index === 0 ? { length } : { length, mitre };
  });
  const length = runs.reduce((sum, run) => sum + run.length, 0);
  cordBand.build(c, points[0], 90 - firstHeading, length, { motif, width, paper: PAPER, runs });
}

export const kakuTakaraMusubiBuild = (c: Builder): void => {
  c.precision(3);
  c.group(() => {
    for (const [index, [a, b]] of courses.entries()) {
      const over = crossings.filter(([, under]) => under === index).map(([strand]) =>
        thickSeg(...courses[strand], width + 2 * PAPER));
      fillPart(c, motif, carve([thickSeg(a, b, width)], over), { k: 1 });
    }
    for (const turn of turns) ruledTurn(c, turn);
  });
};
