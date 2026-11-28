import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { snowLobe } from "../library/snow-lobe.ts";

const origin: V = [0, 0];
const rim = 59;
const seat = rim - 1;

export function hanagurumaYukiwaBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  c.fill("snow-ring", toPath([disc(origin, rim), disc(origin, 51.5)], { k: 1 }), "evenodd");
  for (const turn of [0, 60, 120, 180, 240, 300]) {
    const point: V = [seat * Math.sin(turn * DEG), seat * Math.cos(turn * DEG)];
    snowLobe.build(c, point, turn, 72, { motif: "snow-ring", seatRadius: seat, slotWidth: 7.5 });
  }
  c.fill("snow-ring", toPath([disc(origin, 16)], { k: 1 }));
}
