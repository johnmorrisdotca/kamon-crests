import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { carve, circleCircle, circleThrough, DEG, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));
const paperTab = polygon([[-9, -65], [9, -65], [14, -87], [-14, -87]]);
const fanHub = [disc([0, -57], 17), disc([20, -65], 12), disc([-20, -65], 12)];
const hubClearance = [disc([0, -57], 19), disc([20, -65], 14), disc([-20, -65], 14)];
const scroll = thickArc([16, -69], 6, WEIGHT.hair, 160 * DEG, -115 * DEG);
const hubInk = (): Region[] => carve([...fanHub, paperTab], [scroll, scroll.map(mirrored)]);

interface Feather {
  root: V;
  tip: V;
  radius: number;
}

const FEATHERS: Feather[] = [
  { root: [0, -40], tip: [0, 92], radius: 97 },
  { root: [9, -43], tip: [40, 83], radius: 132 },
  { root: [17, -47], tip: [70, 64], radius: 142 },
  { root: [24, -53], tip: [85, 22], radius: 135 },
  { root: [29, -60], tip: [90, -22], radius: 98 },
  { root: [31, -68], tip: [79, -54], radius: 61 },
];

/** Where two compass circles overlap, the two arcs between their crossings make a pointed feather. */
const lens = (left: Circle, right: Circle): Region => {
  const [a, b] = circleCircle(left.c, left.r, right.c, right.r);

  return [shortArc(left, a, b), shortArc(right, b, a)];
};

interface FanBlade {
  region: Region;
  margin: Region;
  gaps: Region[];
}

const feather = ({ root, tip, radius }: Feather): FanBlade => {
  const axis = vunit(vsub(tip, root));
  const [dx, dy] = axis;
  const left = circleThrough(root, tip, radius, vadd(root, [-dy, dx]));
  const right = circleThrough(root, tip, radius, vadd(root, [dy, -dx]));
  const gap = WEIGHT.hair;

  return {
    region: lens(left, right),
    margin: lens({ ...left, r: radius + gap }, { ...right, r: radius + gap }),
    gaps: [thickSeg(vadd(root, vmul(axis, 6)), vadd(tip, vmul(axis, -12)), gap)],
  };
};

const layBlades = (c: Builder, [centre, ...sides]: FanBlade[]): void => {
  const right = sides.flatMap((blade, i) => {
    const over = [centre.margin, ...sides.slice(0, i).map((part) => part.margin), ...hubClearance];

    return carve([blade.region], [...blade.gaps, ...over]);
  });
  const left = right.map((region) => region.map(mirrored));
  c.guideCircle(C0, R);
  c.fill("round-fan", toPath(carve([centre.region], [...centre.gaps, ...hubClearance]), { k: 1 }));
  c.fill("round-fan", toPath(right, { k: 1 }));
  c.fill("round-fan", toPath(left, { k: 1 }));
  c.fill("round-fan", toPath(hubInk(), { k: 1 }));
};

export const haUchiwaBuild = (c: Builder): void => layBlades(c, FEATHERS.map(feather));
