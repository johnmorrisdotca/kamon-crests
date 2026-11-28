import type { Builder } from "../../construct/builder.ts";
import { arcTo, disc, lineLine, mirrored, reversedRun, seg, vdist } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "anchor";
const rim = 92;
const eye: V = [0, 85];
const root: V = [7.5, 84];

function bisector(a: V, b: V): [V, V] {
  const mid: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return [mid, [mid[0] - b[1] + a[1], mid[1] + b[0] - a[0]]];
}

function curve(a: V, through: V, b: V) {
  const centre = lineLine(...bisector(a, through), ...bisector(through, b));
  const cross = (through[0] - a[0]) * (b[1] - a[1]) - (through[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: vdist(centre, a) }, a, b, cross > 0);
}

const flank = [
  curve(root, [16, 52], [40, 35]),
  curve([40, 35], [26, 29], [16, 36]),
  curve([16, 36], [20, 24], [24, 17]),
  curve([24, 17], [13, 18], [0, 25]),
];
const anchor: Region = [...flank, ...reversedRun(flank.map(mirrored)), seg([-7.5, 84], root)];

export const mitsuTsunaIkariBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => cordBand.build(c, [0, -rim], 90, 2 * Math.PI * rim, {
    motif, width: 6, paper: PAPER, twist: { pitch: 6.85, angle: 32 },
    runs: [{ length: 1, bend: -180 }, { length: 1, bend: -180 }],
  }));
  for (const turn of [30, 150, 270]) c.group(() => {
    fillPart(c, motif, [anchor], { k: 1, turn });
    fillPart(c, motif, [disc(eye, 10.3), disc(eye, 5.4)], { k: 1, turn });
  });
};
