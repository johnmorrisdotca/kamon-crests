import type { Builder } from "../../construct/builder.ts";
import { DEG, angleOf, carve, circleThrough, disc, mirrored, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const reflect = (shape: Region): Region => shape.map(mirrored);

const curvedLine = (a: V, b: V, r: number, centreHint: V, width = 1.8): Region => {
  const circle = circleThrough(a, b, r, centreHint);
  const start = angleOf(circle.c, a);
  let end = angleOf(circle.c, b);
  if (end - start > Math.PI) end -= 2 * Math.PI;
  if (end - start < -Math.PI) end += 2 * Math.PI;
  return thickArc(circle.c, r, width, start, end);
};

/** Compass-rounded ends around the sides and foot of the well's broad skirt. */
const scallops = (): Region[] => {
  const left = [63, 75, 87, 99, 111, 123, 135, 147, 159, 171].map((angle) => {
    const at: V = [-89.3 * Math.sin(angle * DEG), 89.3 * Math.cos(angle * DEG) - 2];
    return disc(at, 5.5);
  });
  return [...left, ...left.map(reflect)];
};

const sleeveLines = (): Region[] => {
  const seams = [
    curvedLine([-62, 65], [-37, 12], 55, [-15, 55]),
    curvedLine([-68, -8], [-28, -8], 86, [-46, 78]),
    curvedLine([-58, -43], [-33, -20], 62, [-20, -70]),
    curvedLine([-58, -64], [-16, -18], 80, [-87, -15]),
    curvedLine([-58, -64], [-11, -43], 61, [-46, -2]),
    curvedLine([-24, -69], [-8, -39], 56, [28, -77]),
  ];
  const eyes: V[] = [[-76, 33], [-79, -29], [-29, -82]];
  const holes = eyes.flatMap((eye) => {
    const length = Math.hypot(...eye);
    const [x, y] = eye;
    return [disc(eye, 4.25), thickSeg(eye, [x * 97 / length, y * 97 / length], 1.45)];
  });
  return [...seams, ...holes];
};

export const fusenIzutsuBuild = (c: Builder): void => {
  c.precision(3);
  const aperture: V = [0, 43];
  const knot: V = [0, -7];
  const jacket = [disc([0, -2], 93), ...scallops()];
  const seams = sleeveLines();
  const holes = [disc(aperture, 44), thickSeg([0, 78], [0, 99], 16), disc(knot, 15),
    thickSeg([0, -78], [0, -36], 1.75), ...seams, ...seams.map(reflect)];
  const sleeve = carve(jacket, holes);
  const tip: V = [39.5 * Math.cos(101 * DEG), 43 + 39.5 * Math.sin(101 * DEG)];
  const stem = [thickArc(aperture, 39.5, 3.7, 101 * DEG, 254 * DEG), disc(tip, 5.0)];
  const scroll = carve(stem, [disc([tip[0] + 0.5, tip[1] - 2.9], 2.6)]);
  c.guideCircle(C0, R);
  for (const lobes of [sleeve, scroll, scroll.map(reflect), [disc(knot, 12.8)]]) {
    c.fill("well-frame", toPath(lobes, { k: 0.98 }), "evenodd");
  }
};
