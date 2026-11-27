import type { Builder } from "../../construct/builder.ts";
import { C0, R, poly, polar, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

export function chuwaNiFutatsuUrokoBuild(c: Builder): void {
  c.ring("ring-medium");
  const upper: Pt[] = [[46, 49], [154, 49], [100, 98.5]];
  for (const angle of [0, 180]) c.fill("scale", poly(upper.map((point) => turn(point, angle))));
}

export function hosowaNiItsutsuUrokoBuild(c: Builder): void {
  c.ring("ring-thin");
  const ray = 82;
  c.guideCircle(C0, ray);
  c.guideCircle(C0, 54);
  c.guideSpokes(5, 90, ray);
  const vane: Pt[] = [C0, polar(ray, 90), polar(54, 126)];
  for (const angle of [0, 72, 144, 216, 288]) c.fill("scale", poly(vane.map((point) => turn(point, angle))));
}

export function seimeiUrokoBuild(c: Builder): void {
  c.stepRound(R);
  const notch = R / Math.sqrt(3);
  c.guideCircle(C0, notch);
  const point: Pt[] = [polar(R, 0), polar(notch, 30), polar(notch, -30)];
  for (const angle of [0, 60, 120, 180, 240, 300]) c.fill("scale", poly(point.map((corner) => turn(corner, angle))));
}
