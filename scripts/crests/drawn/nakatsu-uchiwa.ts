import type { Builder } from "../../construct/builder.ts";
import { carveWhere, circleThrough, inside, mirrored, moved, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const arc = (a: V, b: V, r: number, hint: V) => shortArc(circleThrough(a, b, r, hint), a, b);

const rightPanel = (inset: number): Region => {
  const head: V = [9 + inset, 73 - inset];
  const crown: V = [43, 90 - inset];
  const edge: V = [77 - inset, 55];
  const waist: V = [71 - inset, -6];
  const heel: V = [70 - inset, -63];
  const base: V = [42, -90 + inset];
  const foot: V = [9 + inset, -76 + inset];
  return [arc(head, crown, 38, [39, 51]), arc(crown, edge, 37, [40, 54]),
    arc(edge, waist, 112, [-34, 15]), arc(waist, heel, 153, [-57, -38]),
    arc(heel, base, 39, [40, -54]), arc(base, foot, 45, [39, -45]), seg(foot, head)];
};

/** A low pine crown and the two spreading tips of its trunk. */
const pine = (): Region => {
  const left: V = [-17.2, 0];
  const crown: V = [0, 11.5];
  const right: V = [17.2, 0];
  const stem: V[] = [right, [8, -2.5], [7, -6], [10, -10], [4, -13], [0, -9.5],
    [-4, -13], [-10, -10], [-7, -6], [-8, -2.5], left];
  return [arc(left, crown, 20, [-1, -9]), arc(crown, right, 20, [1, -9]),
    ...stem.slice(1).map((point, i) => seg(stem[i], point))];
};

export const nakatsuUchiwaBuild = (c: Builder): void => {
  c.precision(3);
  const face = rightPanel(0);
  const outerSeam = rightPanel(5.5);
  const innerSeam = rightPanel(7.25);
  const handle = polygon([[-6.6, -95], [6.6, -95], [6.6, 92], [-6.6, 92]]);
  const tree = pine();
  const needles = [-10, -5, 0, 5, 10].map((x) =>
    thickSeg([x, 1.7], [x * 1.10, 7 - Math.abs(x) * 0.25], 1.45));
  const centres: V[] = [65, 33, 1, -31, -62].flatMap((y) => [[-43, y], [43, y]] as V[]);
  const at = (loop: Region, centre: V): Region => loop.map((edge) => moved(edge, centre));
  const eyes = centres.map((centre) => at(tree, centre));
  const sides = [face, face.map(mirrored), handle];
  const rims = [[outerSeam, innerSeam], [outerSeam.map(mirrored), innerSeam.map(mirrored)]];
  const outlines = [...sides.flat(), ...rims.flat(2), ...eyes.flat()];
  const filled = carveWhere(outlines, (at) => sides.some((side) => inside(side, at)) &&
    !rims.some(([outer, inner]) => inside(outer, at) && !inside(inner, at)) && !eyes.some((eye) => inside(eye, at)));
  c.fill("round-fan", toPath(filled, { k: 1 }), "evenodd");
  const treeDetails = centres.flatMap((centre) => needles.map((needle) => at(needle, centre)));
  c.fill("pine", toPath(treeDetails, { k: 1 }), "evenodd");
};
