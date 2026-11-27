import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, mirrored, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const origin: V = [0, 0];

export const hanagataSuhamaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const crown = [disc([0, 59], 33), disc([-29, 48], 23), disc([29, 48], 23)];
  c.fill("sandbar", toPath([disc(origin, 48)], { k: 1 }));
  for (const turn of [0, 120, 240]) c.fill("sandbar", toPath(crown, { k: 1, turn }));
};

/** One white cut between two rules, from the hub's shoulder to the inside of the rim. */
const ribCut = (): Region => {
  const hub = { c: origin, r: 25 };
  const rim = { c: origin, r: 91 };
  const point = (x: number, radius: number): V => [x, Math.sqrt(radius * radius - x * x)];
  const footLeft = point(1, hub.r);
  const footRight = point(2.8, hub.r);
  const tipLeft = point(2.6, rim.r);
  const tipRight = point(8.5, rim.r);

  return [
    seg(footLeft, tipLeft),
    shortArc(rim, tipLeft, tipRight),
    seg(tipRight, footRight),
    shortArc(hub, footRight, footLeft),
  ];
};

export const suhamaKirikuchiBuild = (c: Builder): void => {
  const right = ribCut();
  const pair = [right, right.map(mirrored)];
  const ribs = Array.from({ length: 12 }, (_, i) => (15 + i * 30) * DEG)
    .flatMap((angle) => pair.map((cut) => cut.map((edge) => rotated(edge, angle))));

  c.guideCircle(C0, R);
  c.fill("sandbar", toPath([disc(origin, R), disc(origin, 22), ...ribs], { k: 1 }), "evenodd");
};
