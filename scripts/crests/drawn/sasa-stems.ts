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

const bear: Blade[] = [
  { base: [-4, 33], tip: [-97, -1], radius: 73, stripe: [[-37, 25], [-90, 2]] },
  { base: [4, 33], tip: [97, -1], radius: 73, stripe: [[37, 25], [90, 2]] },
  { base: [-6, 34], tip: [-70, -49], radius: 66, stripe: [[-21, 16], [-60, -46]] },
  { base: [6, 34], tip: [70, -49], radius: 66, stripe: [[21, 16], [60, -46]] },
  { base: [0, 34], tip: [0, -56], radius: 54, stripe: [[-14, 20], [-15, -37]] },
];

export function sanmaiKumaZasaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(4, 0, R);
  const fork: [V, V, number][] = [
    [[0, 31], [0, 92], 7.2], [[0, 44], [-27, 75], 5.7], [[0, 44], [27, 75], 5.7],
    [[-52, 27], [-71, 58], 5.8], [[-55, 36], [-45, 67], 5.6],
    [[52, 27], [71, 58], 5.8], [[55, 36], [45, 67], 5.6],
  ];
  c.fill(motif, toPath(carve(fork.map(([a, b, w]) => thickSeg(a, b, w)), bear.map((blade) => outline(blade, 1.85))), { k: 0.98 }), "evenodd");
  foliage(c, bear, 0.98);
}
