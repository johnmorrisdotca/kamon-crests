import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, thickArc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const mutsuKanBuild = (c: Builder): void => {
  const k = R / 160;
  const apart = 122 * k;
  const crown = 49 * k;
  const width = 15 * k;
  const curl = 11 * k;
  const reach = 115 * DEG;
  c.guideCircle(C0, R);
  for (let i = 0; i < 6; i += 1) {
    const out: V = [Math.sin(i * 60 * DEG), Math.cos(i * 60 * DEG)];
    const centre: V = [apart * out[0], apart * out[1]];
    const inward = Math.atan2(-out[1], -out[0]);
    const end = (angle: number): V => [centre[0] + crown * Math.cos(angle), centre[1] + crown * Math.sin(angle)];
    const hook = (angle: number): V => [centre[0] + (crown - curl) * Math.cos(angle), centre[1] + (crown - curl) * Math.sin(angle)];
    const [left, right] = [inward - reach, inward + reach];
    const band = carve([
      thickArc(centre, crown, width, left, right),
      thickArc(hook(right), curl, width, right, right + 250 * DEG),
      thickArc(hook(left), curl, width, left - 250 * DEG, left),
      disc(end(right), width / 2),
      disc(end(left), width / 2),
    ], []);
    c.fill("curled-band", toPath(band, { k: 1 }));
  }
};
