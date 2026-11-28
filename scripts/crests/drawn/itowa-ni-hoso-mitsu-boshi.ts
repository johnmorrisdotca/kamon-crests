// Three discs round a hub in a thread ring, a sword-shaped blade in each gap, from frame 10 of the 1892 crest book.
import { RING_GAP } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { arcA, bowedArc, disc, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

export const itowaNiHosoMitsuBoshiBuild = (c: Builder): void => {
  c.precision(3);
  const room = c.ring("ring-thread") - RING_GAP;
  const k = room / 90.1;
  const hub = 14.8;
  const reach = 53.9;
  const radius = 31.2;
  const neck = 2.7;
  const foot = Math.sqrt(hub * hub - neck * neck);
  const half = Math.atan2(foot, neck);
  const apex: V = [0, 90.1];
  const right: V = [22, 73.9];
  const left: V = [-22, 73.9];
  const blade: Region = [
    bowedArc([neck, foot], right, 3.2),
    seg(right, apex),
    seg(apex, left),
    bowedArc(left, [-neck, foot], 3.2),
    arcA([0, 0], hub, Math.PI - half, half),
  ];
  c.fill("star", toPath([disc([0, 0], hub)], { k }));
  for (let i = 0; i < 3; i += 1) c.fill("star", toPath([disc([0, reach], radius)], { k, turn: 120 * i }));
  for (let i = 0; i < 3; i += 1) c.fill("sword", toPath([blade], { k, turn: 60 + 120 * i }));
};
