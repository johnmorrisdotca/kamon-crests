// Four tilted squares with eyes round a hub, a sword-shaped blade in each gap, from frame 20 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { bowedArc, disc, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

export const kenYotsumeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const hub = 12.9;
  const reach = 60.4;
  const tilt = (4 * Math.PI) / 180;
  const diamond = (centre: V, half: number): Region =>
    polygon([0, 1, 2, 3].map((i): V => [centre[0] + half * Math.sin(tilt + (i * Math.PI) / 2), centre[1] + half * Math.cos(tilt + (i * Math.PI) / 2)]));
  const stem = polygon([[-7.5, 10], [7.5, 10], [7.5, 36], [-7.5, 36]]);
  const tip: V = [0, hub];
  const right: V = [28.5, 80.4];
  const left: V = [-28.5, 80.4];
  const point: V = [0, R];
  const blade: Region = [bowedArc(tip, right, 8), seg(right, point), seg(point, left), bowedArc(left, tip, 8)];
  c.fill("knot-eye", toPath([disc([0, 0], hub)], { k: 1 }));
  for (let i = 0; i < 4; i += 1) c.fill("knot-eye", toPath([stem], { k: 1, turn: 90 * i }));
  for (let i = 0; i < 4; i += 1) c.fill("knot-eye", toPath([diamond([0, reach], 29.7), diamond([0, reach], 8.7)], { k: 1, turn: 90 * i }), "evenodd");
  for (let i = 0; i < 4; i += 1) c.fill("sword", toPath([blade], { k: 1, turn: 45 + 90 * i }));
};
