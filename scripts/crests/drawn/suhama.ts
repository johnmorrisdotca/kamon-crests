import type { Builder } from "../../construct/builder.ts";
import { disc, thickSeg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const origin: V = [0, 0];

export const hanagataSuhamaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const crown = [disc([0, 59], 33), disc([-29, 48], 23), disc([29, 48], 23)];
  c.fill("sandbar", toPath([disc(origin, 48)], { k: 1 }));
  for (const turn of [0, 120, 240]) c.fill("sandbar", toPath(crown, { k: 1, turn }));
};

export const suhamaKirikuchiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(12, 15, R);
  c.fill("sandbar", toPath([disc(origin, 94), disc(origin, 90)], { k: 1 }), "evenodd");
  c.fill("sandbar", toPath([disc(origin, 24), disc(origin, 20)], { k: 1 }), "evenodd");
  const rays = [
    thickSeg([-2.2, 23], [-7.4, 91], 2.2),
    thickSeg([0, 23], [0, 91], 2.5),
    thickSeg([2.2, 23], [7.4, 91], 2.2),
  ];
  for (let i = 0; i < 12; i += 1) c.fill("sandbar", toPath(rays, { k: 1, turn: 15 + i * 30 }));
};
