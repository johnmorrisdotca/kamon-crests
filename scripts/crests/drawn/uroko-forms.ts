import type { Builder } from "../../construct/builder.ts";
import { poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

export function chuwaNiFutatsuUrokoBuild(c: Builder): void {
  c.ring("ring-medium");
  const upper: Pt[] = [[46, 49], [154, 49], [100, 98.5]];
  for (const angle of [0, 180]) c.fill("scale", poly(upper.map((point) => turn(point, angle))));
}
