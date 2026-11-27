import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, seg, shortArc, thickArc, thickSeg, toPath, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const scale = 0.57;
const at = ([x, y]: V): V => [(x - 158) * scale, (157 - y) * scale];
const cut = (a: V, b: V) => seg(at(a), at(b));
const fold = (a: V, b: V, radius: number, near: V) =>
  shortArc(circleThrough(at(a), at(b), radius * scale, at(near)), at(a), at(b));

/** A paper strip with a cut outer end and two circular edges meeting the knot. */
const paperStrip = (root: V, tipA: V, tipB: V, curve: number, neck: number): Region => {
  const end = vmul(vadd(tipA, tipB), 0.5);
  const air = vunit(vsub(end, root));
  const normal: V = [-air[1], air[0]];
  const sign = (tipA[0] - end[0]) * normal[0] + (tipA[1] - end[1]) * normal[1] < 0 ? -1 : 1;
  const a = vadd(root, vmul(normal, sign * neck / 2));
  const b = vadd(root, vmul(normal, -sign * neck / 2));
  const hint = vadd(root, vmul(normal, curve > 0 ? 380 : -380));

  return [fold(a, tipA, Math.abs(curve), hint), cut(tipA, tipB), fold(tipB, b, Math.abs(curve) - 5, hint), cut(b, a)];
};

const loop = (centre: V, radius: number, width: number, first: number, end: number): Region =>
  thickArc(at(centre), radius * scale, width * scale, first * DEG, end * DEG);

export const noshiChoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const strips = [
    paperStrip([139, 229], [15, 145], [43, 131], 205, 4.8),
    paperStrip([143, 228], [56, 122], [79, 127], 205, 4.8),
    paperStrip([147, 228], [93, 109], [114, 117], 238, 4.8),
    paperStrip([150, 225], [115, 20], [145, 42], 578, 4.8),
    paperStrip([154, 223], [174, 43], [198, 75], -337, 4.8),
    paperStrip([158, 224], [209, 91], [231, 114], -309, 4.8),
    paperStrip([160, 227], [280, 80], [277, 131], -337, 4.8),
    paperStrip([162, 231], [301, 151], [291, 183], -413, 4.8),
    paperStrip([163, 235], [290, 200], [300, 240], -450, 4.8),
  ];
  const curl = [
    loop([78, 82], 27, 5.4, -44, 234),
    loop([62, 78], 11.8, 5.4, 146, 424),
    thickSeg(at([96, 102]), at([104, 114]), 5.4 * scale),
  ];
  c.fill("noshi", toPath(carve(curl, strips), { k: 1 }), "evenodd");
  for (const strip of strips) c.fill("noshi", toPath([strip], { k: 1 }));

  const tails = [
    paperStrip([149, 238], [70, 276], [98, 277], -307, 7.5),
    paperStrip([156, 242], [119, 294], [134, 303], -212, 7.5),
  ];
  c.fill("noshi", toPath(tails, { k: 1 }));
  const loops = [
    loop([82, 215], 30, 5.4, 142, 316),
    loop([94, 223], 24, 5.4, 98, 306),
    loop([180, 224], 28, 5.4, 215, 403),
    loop([229, 220], 24, 5.4, 183, 329),
  ];
  const aroundKnot = disc(at([151, 235]), 14 * scale);
  c.fill("noshi", toPath(carve(loops, [...strips, ...tails, aroundKnot]), { k: 1 }), "evenodd");

  const tilt = (a: V, b: V, width: number): Region => thickSeg(at(a), at(b), width * scale);
  const knot = [tilt([143, 229], [154, 243], 7), tilt([153, 226], [162, 238], 7)];
  c.fill("noshi", toPath(knot, { k: 1 }));
};
