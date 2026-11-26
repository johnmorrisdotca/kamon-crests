import type { Builder } from "../../construct/builder.ts";
import { circleThrough, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arc = (a: V, b: V, r: number, hint: V) => shortArc(circleThrough(a, b, r, hint), a, b);

const plectrum = (c: Builder, placement: Placing): void => {
  const upperLeft: V = [-29, 10];
  const upperRight: V = [29, 10];
  const lowerRight: V = [32, -17];
  const lowerLeft: V = [-32, -17];
  const rimLeft: V = [-24, 10];
  const rimRight: V = [24, 10];
  const body: Region = [arc(upperLeft, upperRight, 51, [0, -32]), seg(upperRight, lowerRight),
    arc(lowerRight, lowerLeft, 90, [0, 66]), seg(lowerLeft, upperLeft)];
  const rim: Region = [arc(rimLeft, rimRight, 54, [0, -36]), arc(rimRight, rimLeft, 47, [0, 50])];
  const stem: Region = [seg([-9, 17], [-8, 41]), arc([-8, 41], [8, 41], 8.5, [0, 37]),
    seg([8, 41], [9, 17]), seg([9, 17], [-9, 17])];
  c.fill("koto-plectrum", toPath([stem], placement));
  c.fill("koto-plectrum", toPath([body, rim], placement), "evenodd");
};

export const kotoNoTsumeBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  plectrum(c, { k: 1, at: [0, 41] });
  plectrum(c, { k: 1, at: [-50, -25], turn: 12 });
  plectrum(c, { k: 1, at: [50, -25], turn: -12 });
};
