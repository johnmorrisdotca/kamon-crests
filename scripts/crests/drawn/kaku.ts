import type { Builder } from "../../construct/builder.ts";
import { carveWhere, inside, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, CX, CY, R, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

const polygon = (corners: V[]): Region => corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));
const upright = ([x, y]: V, half: number): Region => polygon([[x - half, y + half], [x + half, y + half], [x + half, y - half], [x - half, y - half]]);
const diamond = ([x, y]: V, half: number): Region => polygon([[x, y + half], [x + half, y], [x, y - half], [x - half, y]]);

type Frame = [outer: Region, inner: Region];
const within = (frames: Frame[], p: V): boolean => frames.some(([outer, inner]) => inside(outer, p) && !inside(inner, p));

/** At the top-left crossing, the second frame is above. That order repeats every quarter turn. */
const secondAbove = ([x, y]: V): boolean => x * y * (x * x - y * y) > 0;

const interleave = (c: Builder, first: Frame[], second: Frame[], firstGaps: Frame[], secondGaps: Frame[]): void => {
  const sectors = [seg([-R, 0], [R, 0]), seg([0, -R], [0, R]), seg([-R, -R], [R, R]), seg([-R, R], [R, -R])];
  const forward = carveWhere([...first.flat(2), ...secondGaps.flat(2), ...sectors], (p) => within(first, p) && !(secondAbove(p) && within(secondGaps, p)));
  const backward = carveWhere([...second.flat(2), ...firstGaps.flat(2), ...sectors], (p) => within(second, p) && !(!secondAbove(p) && within(firstGaps, p)));
  c.guideCircle(C0, R);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.fill("square-frame", toPath(forward, { k: 1 }), "evenodd");
  c.fill("square-frame", toPath(backward, { k: 1 }), "evenodd");
};

export const crossedSquares = (c: Builder): void => {
  const half = R * Math.SQRT1_2;
  const width = 12;
  const gap = 1.5;
  const square = (extra: number): Frame => [upright([0, 0], half + extra), upright([0, 0], half - width - extra)];
  const cornerUp = (extra: number): Frame => [diamond([0, 0], R + extra * Math.SQRT2), diamond([0, 0], R - (width + extra) * Math.SQRT2)];
  interleave(c, [square(0)], [cornerUp(0)], [square(gap)], [cornerUp(gap)]);
};

export const foldedSquare = (c: Builder): void => {
  const halfWidth = 6 * Math.SQRT1_2;
  const inset = 13 * Math.SQRT1_2;
  const mid = R / 2;
  const edge: Pt[] = [
    [CX, CY - R],
    [CX + mid - halfWidth, CY - mid - halfWidth],
    [CX + mid - halfWidth - inset, CY - mid - halfWidth + inset],
    [CX + mid + halfWidth - inset, CY - mid + halfWidth + inset],
    [CX + mid + halfWidth, CY - mid + halfWidth],
  ];
  const angles = [0, 90, 180, 270];
  const path = poly(angles.flatMap((angle) => edge.map((point) => turn(point, angle))));
  const inner = 43;
  const eye = 11;
  const holes = [diamond([0, 0], inner), diamond([0, inner + eye], eye), diamond([inner + eye, 0], eye), diamond([0, -inner - eye], eye), diamond([-inner - eye, 0], eye)];
  c.guideCircle(C0, R);
  c.guideCircle(C0, inner);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.fill("square-frame", path.join(toPath(holes, { k: 1 })), "evenodd");
};
