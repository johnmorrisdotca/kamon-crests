// Five ruled mountain bands round a pentagon, from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const itsutsuYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const band = 16;
  const gap = 7;
  const reach = R * Math.cos(Math.PI / 5);
  const innerReach = (reach - band) / Math.cos(Math.PI / 5);
  const next: V = [R * Math.sin((2 * Math.PI) / 5), R * Math.cos((2 * Math.PI) / 5)];
  const length = Math.hypot(next[0], R - next[1]);
  const along: V = [next[0] / length, (next[1] - R) / length];
  const inward: V = [along[1], -along[0]];
  const half = length / 2 - gap / 2;
  const endOuter: V = [along[0] * half, R + along[1] * half];
  const endInner: V = [endOuter[0] + inward[0] * band, endOuter[1] + inward[1] * band];
  const mirror = ([x, y]: V): V => [-x, y];
  const outline: V[] = [mirror(endOuter), [0, R], endOuter, endInner, [0, innerReach], mirror(endInner)];
  const unit: Region = outline.map((point, index) => seg(point, outline[(index + 1) % outline.length]));
  for (let i = 0; i < 5; i += 1) c.fill("mountain", toPath([unit], { k: 1, turn: 72 * i }));
};
