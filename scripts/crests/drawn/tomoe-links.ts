import type { Builder } from "../../construct/builder.ts";
import { circleCircle, nearest, shortArc, toPath, carveWhere, inside, seg, thickArc, DEG, rotated } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type BandArc = [centre: V, radius: number, start: V];
// The centres, widths and choice of intersections for the upper comma in frame 11.
const outline: BandArc[] = [
  [[-23, 43], 35, [-54, 26]],
  [[1, 38], 55, [-42, 72]],
  [[-10, 37], 57, [0, 93]],
  [[-56, 27], 103, [47, 33]],
  [[-74, 21], 112, [13, -49]],
  [[-1, -57], 9, [-3, -66]],
  [[-120, 63], 160, [-8, -51]],
  [[-64, 34], 97, [24, -6]],
  [[3, 63], 25, [27, 65]],
  [[1, 70], 18, [3, 88]],
  [[-2, 68], 20, [17, 62]],
  [[-2, 66], 18, [-2, 48]],
  [[-11, 32], 25, [-17, 56]],
  [[-59, 37], 24, [-37, 31]],
  [[-39, 24], 15, [-51, 15]],
];

function profile(): Region {
  const circles = outline.map(([c, r]): Circle => ({ c, r }));
  const joins = circles.map((circle, i) => {
    const prior = circles[(i + circles.length - 1) % circles.length];
    return nearest(circleCircle(prior.c, prior.r, circle.c, circle.r), outline[i][2]);
  });
  return circles.map((circle, i) => shortArc(circle, joins[i], joins[(i + 1) % joins.length]));
}

export function musubiTomoeBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const band = profile();
  const turned = (loop: Region, angle: number): Region => loop.map((piece) => rotated(piece, angle * DEG));
  const clearance = (loop: Region): Region[] => loop.flatMap((piece) => piece.t === "A" ? [thickArc(piece.c, piece.r, 7, piece.a0, piece.a1)] : []);
  const left = turned(band, 120);
  const right = turned(band, -120);
  const leftInk = [left, ...clearance(left)];
  const rightInk = [right, ...clearance(right)];
  // At the first crossing the upper comma goes behind the left band. At the other
  // crossing the order reverses. These dividers run between the crossing areas.
  const divideAt = 12;
  const divide: Region = [seg([divideAt, -R], [divideAt, R])];
  const ink = carveWhere([...band, ...leftInk.flat(), ...rightInk.flat(), ...divide, ...turned(divide, -120)], (p) => {
    const behindLeft = p[0] < divideAt && leftInk.some((loop) => inside(loop, p));
    const behindRight = -(p[0] + Math.sqrt(3) * p[1]) / 2 >= divideAt && rightInk.some((loop) => inside(loop, p));
    return inside(band, p) && !behindLeft && !behindRight;
  });
  for (const turn of [0, 120, 240]) c.fill("tomoe", toPath(ink, { k: 1, turn }), "evenodd");
}
