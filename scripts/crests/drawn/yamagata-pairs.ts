// Paired curved and ruled mountain forms from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type ThreePoints = [V, V, V];

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const curve = ([from, through, to]: ThreePoints) => {
  const centre = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c: centre, r: dist(centre, from) }, from, to, turn);
};

const arch = (offset: number, extra = 0): Region => {
  const point = (x: number, y: number): V => [x + offset, y];
  return [
    curve([point(-65 - extra, -70 - extra), point(-58 - extra, -32), point(-42 - extra, -7)]),
    curve([point(-42 - extra, -7), point(-29 - extra, 45), point(-1, 69 + extra)]),
    curve([point(-1, 69 + extra), point(25 + extra, 44), point(35 + extra, -5)]),
    curve([point(35 + extra, -5), point(55 + extra, -32), point(60 + extra, -70 - extra)]),
    seg(point(60 + extra, -70 - extra), point(42 - extra, -70 - extra)),
    curve([point(42 - extra, -70 - extra), point(35 - extra, -34), point(22 - extra, -14)]),
    curve([point(22 - extra, -14), point(14 - extra, 34), point(-1, 49 - extra)]),
    curve([point(-1, 49 - extra), point(-17 + extra, 28), point(-28 + extra, -14)]),
    curve([point(-28 + extra, -14), point(-44 + extra, -36), point(-47 + extra, -70 - extra)]),
    seg(point(-47 + extra, -70 - extra), point(-65 - extra, -70 - extra)),
  ];
};

export const hanaYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const near = arch(-25);
  const far = arch(25);
  c.fill("mountain", toPath(carve([far], [arch(-25, 1.45)]), { k: 0.84 }));
  c.fill("mountain", toPath([near], { k: 0.84 }));
};
