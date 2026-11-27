import type { Builder } from "../../construct/builder.ts";
import { circleCircle, nearest, shortArc, pieceEnd, toPath, carve, carveWhere, inside, disc, seg, thickArc, DEG, rotated } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type BandArc = [centre: V, radius: number, start: V];
// Whole compass widths and intersections for the white cut inside the upper ring.
const outline: BandArc[] = [
  [[7, 44], 49, [-3, 92]],
  [[1, 41], 45, [-38, 63]],
  [[3, 44], 48, [-41, 24]],
  [[-6, 33], 34, [-22, 3]],
  [[-3, 36], 36, [6, 2]],
  [[15, 37], 20, [31, 25]],
  [[-1, 63], 23, [21, 56]],
  [[-3, 66], 26, [-2, 40]],
  [[-10, 65], 20, [-25, 51]],
  [[6, 53], 40, [-26, 77]],
];

function profile(): Region {
  const circles = outline.map(([c, r]): Circle => ({ c, r }));
  const joins = circles.map((circle, i) => {
    const prior = circles[(i + circles.length - 1) % circles.length];
    return nearest(circleCircle(prior.c, prior.r, circle.c, circle.r), outline[i][2]);
  });
  return circles.map((circle, i) => shortArc(circle, joins[i], joins[(i + 1) % joins.length]));
}

export function kanawaTomoeBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const band = carve([disc([0, 36], 58)], [profile()]);
  const width = 6;
  const turned = (loop: Region, angle: number): Region => loop.map((piece) => rotated(piece, angle * DEG));
  const clearance = (loops: Region[]): Region[] => loops.flatMap((loop) => loop.flatMap((piece) => piece.t === "A" ? [thickArc(piece.c, piece.r, width, piece.a0, piece.a1), disc(pieceEnd(piece), width / 2)] : []));
  const overlaps = (loops: Region[], p: V): boolean => loops.filter((loop) => inside(loop, p)).length % 2 === 1;
  const left = band.map((loop) => turned(loop, 120));
  const right = band.map((loop) => turned(loop, -120));
  const leftGap = clearance(left);
  const rightGap = clearance(right);
  // In the upper ring’s frame, this line falls between the outer and inner crossings.
  const divideAt = -44;
  const divide: Region = [seg([-120, -120 - divideAt], [120 + divideAt, 120])];
  const ink = carveWhere([...band.flat(), ...left.flat(), ...right.flat(), ...leftGap.flat(), ...rightGap.flat(), ...divide, ...turned(divide, -120)], (p) => {
    const [x, y] = p;
    const relative = -(1 + Math.sqrt(3)) * x / 2 + (1 - Math.sqrt(3)) * y / 2;
    const behindLeft = x - y > divideAt && (overlaps(left, p) || leftGap.some((loop) => inside(loop, p)));
    const behindRight = relative <= divideAt && (overlaps(right, p) || rightGap.some((loop) => inside(loop, p)));
    return overlaps(band, p) && !behindLeft && !behindRight;
  });
  for (const turn of [0, 120, 240]) c.fill("tomoe", toPath(ink, { k: 1, turn }), "evenodd");
}
