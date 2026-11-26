import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { arcA, carve, DEG, disc, mirrored, onCircle, rotated, seg, shortArc, thickSeg, toPath, vadd, vmul, vunit, vsub } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

interface ClosedFan {
  /** Distances from the arrangement's centre along the fan's axis. */
  tip: number;
  shoulder: number;
  butt: number;
  /** Half-widths of the paper at the tip and shoulder, and of the spine. */
  outer: number;
  inner: number;
  spine: number;
}

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const rectangle = (left: number, right: number, bottom: number, top: number): Region =>
  polygon([[left, bottom], [right, bottom], [right, top], [left, top]]);

/** Two tapered leaves of paper, separated from the straight spine by a ruled gap on either side. */
const fanPanels = (fan: ClosedFan, roundButt = false): Region[] => {
  const { tip, shoulder, butt, outer, inner, spine } = fan;
  const seam = spine + WEIGHT.hair;
  const stem = roundButt
    ? [
        arcA([0, butt + spine], spine, Math.PI, 2 * Math.PI),
        seg([spine, butt + spine], [spine, tip]),
        seg([spine, tip], [-spine, tip]),
        seg([-spine, tip], [-spine, butt + spine]),
      ]
    : rectangle(-spine, spine, butt, tip);

  return [
    polygon([[-outer, tip], [-seam, tip], [-seam, shoulder], [-inner, shoulder]]),
    stem,
    polygon([[seam, tip], [outer, tip], [inner, shoulder], [seam, shoulder]]),
  ];
};

const TRIO: ClosedFan = { tip: 91, shoulder: 20, butt: 4, outer: 21, inner: 16, spine: 3.5 };

export const mitsuKumiawaseOgiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  for (const turn of [0, 112.5, 247.5]) c.fill("fan", toPath(fanPanels(TRIO), { k: 1, turn }));
};

const CROSSED: ClosedFan = { tip: 87, shoulder: 17, butt: -72, outer: 22, inner: 16, spine: 3 };

export const sanbonChigaiOgiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const panels = fanPanels(CROSSED, true);
  const bottomPanels = fanPanels({ ...CROSSED, outer: 20 }, true);
  // The two fans to the back lose ink alongside the spine that crosses them.
  const { butt, shoulder, spine } = CROSSED;
  const clearance = rectangle(-spine - WEIGHT.hair, spine + WEIGHT.hair, butt - WEIGHT.hair, shoulder);
  const turn = (region: Region, degrees: number): Region => region.map((edge) => rotated(edge, -degrees * DEG));
  const left = 300;
  const right = 60;
  const overLeft = turn(clearance, right);
  const overBottom = turn(clearance, left);
  const fill = (regions: Region[]): void => c.fill("fan", toPath(regions, { k: 1 }));

  fill(carve(bottomPanels.map((region) => turn(region, 180)), [overBottom, overLeft]));
  fill(carve(panels.map((region) => turn(region, left)), [overLeft]));
  fill(panels.map((region) => turn(region, right)));
};

const WHEEL: ClosedFan = { tip: 93, shoulder: 21, butt: 12, outer: 19, inner: 9, spine: 3 };

export const ogiGurumaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.fill("fan", toPath([disc([0, 0], 10)], { k: 1 }));
  for (let turn = 0; turn < 360; turn += 45) c.fill("fan", toPath(fanPanels(WHEEL), { k: 1, turn }));
};

/** From the point of the pivot to a distance along one of the rules radiating from it. */
const ray = (pivot: V, reach: number, angle: number): V => onCircle(pivot, reach, (90 - angle) * DEG);

/** The chosen outer edge, the radial edges, and the circular inner cut that exposes the bones. */
const openPaper = (pivot: V, inner: number, outer: Region): Region => {
  const left = outer[0].t === "L" ? outer[0].a : onCircle(outer[0].c, outer[0].r, outer[0].a0);
  const last = outer[outer.length - 1];
  const right = last.t === "L" ? last.b : onCircle(last.c, last.r, last.a1);
  const near = (point: V): V => vadd(pivot, vmul(vunit(vsub(point, pivot)), inner));
  const [nearLeft, nearRight] = [near(left), near(right)];

  return [seg(nearLeft, left), ...outer, seg(right, nearRight), shortArc({ c: pivot, r: inner }, nearRight, nearLeft)];
};

const roundStrip = (butt: V, tip: V, width: number): Region[] => [thickSeg(butt, tip, width), disc(butt, width / 2)];

export const hachihonboneHinomaruOgiBuild = (c: Builder): void => {
  const pivot: V = [0, -54];
  const arc = { c: pivot, r: 116 };
  const paper = openPaper(pivot, 57, [shortArc(arc, ray(pivot, 116, -54), ray(pivot, 116, 54))]);
  const sun: V = [0, 32];
  const guard = roundStrip(ray(pivot, -18, 54), ray(pivot, 114, 54), 4);
  const clearance = thickSeg(ray(pivot, -21, 54), ray(pivot, 117, 54), 4 + 2 * WEIGHT.hair);
  c.guideCircle(C0, R);
  c.fill("fan", toPath(carve([paper], [clearance, disc(sun, 27 + WEIGHT.hair)]), { k: 1 }));
  c.group(() => {
    for (const angle of [-54, -38, -22, -7, 7, 22, 38]) {
      const ribs = roundStrip(ray(pivot, -19, angle), ray(pivot, 58, angle), 3.5);
      c.fill("fan", toPath(carve(ribs, [clearance]), { k: 1 }));
    }
  });
  c.fill("fan", toPath(carve(guard, []), { k: 1 }));
  c.fill("sun-disc", toPath([disc(sun, 27)], { k: 1 }));
};

const ruledEdge = (points: V[]): Region => points.slice(1).map((point, i) => seg(points[i], point));

export const gangiOgiBuild = (c: Builder): void => {
  const pivot: V = [0, -52];
  const right: V[] = [[0, 72], [22, 56], [43, 63], [54, 43], [73, 44], [76, 21], [93, 9]];
  const left: V[] = right.slice(1).map(([x, y]): V => [-x, y]).reverse();
  const paper = openPaper(pivot, 53, ruledEdge([...left, ...right]));
  const guardAngle = Math.atan2(93, 61) / DEG;
  const clearance = thickSeg(ray(pivot, -20, guardAngle), [94, 10], 4 + 2 * WEIGHT.hair);
  const guard = roundStrip(ray(pivot, -17, guardAngle), [92, 8], 4);
  c.guideCircle(C0, R);
  c.fill("fan", toPath(carve([paper], [clearance]), { k: 1 }));
  c.group(() => {
    for (const angle of [-guardAngle, -37, -19, 0, 19, 37]) {
      const ribs = roundStrip(ray(pivot, -16, angle), ray(pivot, 54, angle), 4);
      c.fill("fan", toPath(carve(ribs, [clearance]), { k: 1 }));
    }
  });
  c.fill("fan", toPath(carve(guard, []), { k: 1 }));
};

export const nakahirakiChigaiOgiBuild = (c: Builder): void => {
  const pivot: V = [-59, -54];
  const tip: V = [81, 2];
  const steps: V[] = [[31, 65], [33, 53], [53, 52], [52, 36], [68, 28], tip];
  const face = openPaper(pivot, 47, ruledEdge(steps));
  const axis = vunit(vsub(tip, pivot));
  const butt = vadd(pivot, vmul(axis, -13));
  const guard = roundStrip(butt, tip, 4);
  const gap = thickSeg(vadd(pivot, vmul(axis, -15)), vadd(tip, vmul(axis, 2)), 4 + 2 * WEIGHT.hair);
  const outline = polygon([pivot, ...steps]);
  const ribs = [37, 47, 57].map((angle) => roundStrip(ray(pivot, -11, angle), ray(pivot, 48, angle), 3.5));
  const seamAngles = [57, 63];
  const folds = seamAngles.map((angle) => thickSeg(ray(pivot, 46, angle), ray(pivot, 156, angle), WEIGHT.hair));
  const between = thickSeg(pivot, steps[0], 2 * WEIGHT.hair);
  const backCuts = [outline, gap, between, ...folds.map((region) => region.map(mirrored))];
  const front = [[face], ...ribs, guard];
  c.guideCircle(C0, R);
  c.group(() => {
    for (const part of front) c.fill("fan", toPath(carve(part.map((region) => region.map(mirrored)), backCuts), { k: 1 }));
  });
  c.group(() => {
    c.fill("fan", toPath(carve([face], [gap, ...folds]), { k: 1 }));
    for (const part of ribs) c.fill("fan", toPath(carve(part, [gap]), { k: 1 }));
    c.fill("fan", toPath(carve(guard, []), { k: 1 }));
  });
};
