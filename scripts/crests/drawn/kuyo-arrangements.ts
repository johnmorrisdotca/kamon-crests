// Three nine-luminary arrangements from frame 10 of the 1892 crest book.
import { WEIGHT, type Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, onCircle, toPath, vdist, type V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const centre: V = [0, 0];
const angles = [90, 45, 0, -45, -90, -135, -180, -225];

export const oboroKuyoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);

  const bays = angles.map((angle) => disc(onCircle(centre, 110, angle * DEG), 40));
  const middle = 59.5;
  c.fill("star", toPath(carve([disc(centre, R)], [...bays, disc(centre, middle + WEIGHT.thread)]), { k: 1 }));
  c.fill("star", toPath([disc(centre, middle)], { k: 1 }));
};

export const wariKuyoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);

  c.fill("star", toPath([disc(centre, 58.5)], { k: 1 }));
  for (const angle of angles) {
    const at = onCircle(centre, 97, angle * DEG);
    const radius = 37;
    const cap = carveWhere([...disc(centre, R), ...disc(at, radius)], (p) => vdist(p, centre) < R && vdist(p, at) < radius);
    c.fill("star", toPath(cap, { k: 1 }));
  }
};

export const kageKasaneKuyoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const middle = 47.7;
  const outer = 35;
  const run = R - outer;
  const gap = 1.5;
  c.fill("star", toPath([disc(centre, middle), disc(centre, middle - 6.6)], { k: 1 }), "evenodd");

  for (const angle of angles) {
    const at = onCircle(centre, run, angle * DEG);
    const next = onCircle(centre, run, (angle - 45) * DEG);
    const ring = carve([disc(at, outer)], [disc(at, outer - 6.4), disc(next, outer + gap), disc(centre, middle + gap)]);
    c.fill("star", toPath(ring, { k: 1 }));
  }
};
