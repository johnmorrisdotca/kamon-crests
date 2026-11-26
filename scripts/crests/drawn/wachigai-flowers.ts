// Flower-bearing ring forms from frames 14 and 15 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, carveWhere, circleThrough, DEG, disc, inside, rotated, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";
import { C0, CX, CY, R } from "../../construct/geo.ts";

const centre: V = [0, 0];
const quarters = [0, 90, 180, 270];
const turns = (outline: Region, angle: number): Region => outline.map((edge) => rotated(edge, -angle * DEG));

/** The four lenses share a layout circle and leave the curved diamond between them open. */
const circularPanels = (): Region[] => {
  const top: V = [0, R];
  const right: V = [R, 0];
  const lens = [shortArc({ c: centre, r: R }, top, right), shortArc({ c: [R, R], r: R }, right, top)];
  return quarters.map((angle) => turns(lens, angle));
};

const flower = (c: Builder, placing: Placing): void => {
  const lobes = [disc([0, 0], 32), disc([0, 33], 10), disc([11, 26], 9), disc([-11, 26], 9)];
  const heart = disc(centre, 9.5);
  const stamen = thickSeg([0, 7], [0, 23], 2.8);
  const side = 1.5;
  const seams = [seg([-100, side - 100], [100, side + 100]), seg([-100, side + 100], [100, side - 100])];
  const petal = carveWhere([...lobes.flat(), ...heart, ...stamen, ...seams], (p) =>
    p[1] > Math.abs(p[0]) + side && lobes.some((lobe) => inside(lobe, p)) && !inside(heart, p) && !inside(stamen, p),
  );

  for (const angle of quarters) c.fill("karahana", toPath(petal.map((loop) => turns(loop, angle)), placing));
  c.fill("karahana", toPath(carve([disc(centre, 7.35)], [disc(centre, 1.35)]), placing));
};

export const hanaWachigaiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const panel of circularPanels()) c.fill("linked-rings", toPath([panel], { k: 1 }));
  flower(c, { k: 1 });
};

export const hishiWachigaiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.guideLine([CX, CY - R], [CX, CY + R]);

  const ends: V[] = [[0, 70], [R, 0], [0, -70], [-R, 0]];
  const diagonals: V[] = [[96, 78], [96, -78], [-96, -78], [-96, 78]];
  ends.forEach((a, i) => {
    const b = ends[(i + 1) % ends.length];
    const inward = circleThrough(b, a, 99, diagonals[i]);
    c.fill("linked-rings", toPath([[seg(a, b), shortArc(inward, b, a)]], { k: 1 }));
  });
  flower(c, { k: 0.89 });
};
