import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const itsutsuGomaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const halfSpacing = Math.PI / 5;
  const joinRadius = 43;
  const joinX = joinRadius * Math.sin(halfSpacing);
  const joinY = joinRadius * Math.cos(halfSpacing);
  const points: V[] = [[-38, 88], [38, 88], [joinX, joinY], [0, 24], [-joinX, joinY]];
  const top = points.map((point, i) => seg(point, points[(i + 1) % points.length]));
  for (const turn of [0, 72, 144, 216, 288]) c.fill("spinning-top", toPath([top], { k: 1, turn }));
};
