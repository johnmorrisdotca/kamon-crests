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
