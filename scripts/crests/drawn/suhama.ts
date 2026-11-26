import type { Builder } from "../../construct/builder.ts";
import { disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const origin: V = [0, 0];

export const hanagataSuhamaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const crown = [disc([0, 59], 33), disc([-29, 48], 23), disc([29, 48], 23)];
  c.fill("sandbar", toPath([disc(origin, 48)], { k: 1 }));
  for (const turn of [0, 120, 240]) c.fill("sandbar", toPath(crown, { k: 1, turn }));
};
