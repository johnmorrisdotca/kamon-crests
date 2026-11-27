import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";

type Blade = { base: V; tip: V; radius: number; stripe?: [V, V] };

const motif = "bamboo-grass";
const edge = (a: V, b: V, radius: number, near: V) => shortArc(circleThrough(a, b, radius, near), a, b);

function outline({ base, tip, radius }: Blade, widen = 0): Region {
  const normal: V = [tip[1] - base[1], base[0] - tip[0]];
  const x = (base[0] + tip[0]) / 2;
  const y = (base[1] + tip[1]) / 2;

  return [
    edge(base, tip, radius - widen, [x + normal[0], y + normal[1]]),
    edge(tip, base, radius - widen, [x - normal[0], y - normal[1]]),
  ];
}

function foliage(c: Builder, blades: Blade[], k: number): void {
  blades.forEach((blade, i) => {
    const rib = thickSeg(blade.base, blade.tip, 2.15);
    const mark = blade.stripe ? [thickSeg(...blade.stripe, 1.55)] : [];
    const exposed = carve([outline(blade)], [rib, ...mark, ...blades.slice(i + 1).map((front) => outline(front, 1.9))]);
    c.fill(motif, toPath(exposed, { k }), "evenodd");
  });
}

const common: Blade[] = [
  { base: [-5, 31], tip: [-96, -5], radius: 92 },
  { base: [11, 30], tip: [96, -14], radius: 95 },
  { base: [14, 30], tip: [73, -61], radius: 81 },
  { base: [-7, 31], tip: [-83, -40], radius: 72 },
  { base: [24, 28], tip: [-62, -70], radius: 94 },
];

function snow(c: Builder, blades: Blade[], k: number, slim: boolean): void {
  const outer = [
    disc([0, 67], 28), disc([-29, 61], 27), disc([29, 61], 27),
    disc([-53, 49], 24), disc([53, 49], 24),
    disc([-73, 37], 16), disc([73, 37], 16),
  ];
  const bladeMasks = blades.map((blade) => outline(blade, 1.8));
  const cuts = [
    disc([-45, 70], 5.1), disc([45, 70], 5.1),
    thickSeg([-55, 39], [-67, 49], 1.7), thickSeg([-55, 39], [-54, 58], 1.7),
    thickSeg([55, 39], [67, 49], 1.7), thickSeg([55, 39], [54, 58], 1.7),
    thickSeg([0, 29], [0, 73], 1.8), thickSeg([0, 51], [-20, 64], 1.65), thickSeg([0, 51], [20, 64], 1.65),
    ...bladeMasks,
  ];
  const roots = slim ? [-22, -11, 0, 11, 22] : [-48, -32, -16, 0, 16, 32, 48];
  const stalks = roots.map((x) => thickSeg([x * 1.28, -5], [x, -93 + Math.abs(x) * 0.11], 5.9));

  c.fill(motif, toPath(carve(stalks, bladeMasks), { k }), "evenodd");
  c.fill(motif, toPath(carve(outer, cuts), { k }), "evenodd");
  foliage(c, blades, k);
}

export function yukimochiNeZasaBuild(c: Builder): void {
  c.precision(3);
  c.guideSpokes(4, 0, R);
  snow(c, common, 0.94, true);
}
