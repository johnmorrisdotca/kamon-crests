// Four discs round a hub, with a sword-shaped blade in each gap, from frame 10 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { bowedArc, disc, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const kenYotsuBoshiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const hub = 12.9;
  const reach = 58.3;
  const radius = 27.5;
  const tip: V = [0, hub];
  const right: V = [21.3, 80];
  const left: V = [-21.3, 80];
  const point: V = [0, R];
  const blade: Region = [bowedArc(tip, right, 5.5), seg(right, point), seg(point, left), bowedArc(left, tip, 5.5)];
  c.fill("star", toPath([disc([0, 0], hub)], { k: 1 }));
  for (let i = 0; i < 4; i += 1) c.fill("star", toPath([disc([0, reach], radius)], { k: 1, turn: 90 * i }));
  for (let i = 0; i < 4; i += 1) c.fill("sword", toPath([blade], { k: 1, turn: 45 + 90 * i }));
};
