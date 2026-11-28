// Three bent ruled bands set together, from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const mitsuKumiawaseYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const length = 93.9;
  const width = 36;
  const gap = 2;
  const up: V = [0, 1];
  const lowerRight: V = [Math.sin(Math.PI * 2 / 3), Math.cos(Math.PI * 2 / 3)];
  const corner: V = [gap, gap / Math.sqrt(3)];
  const at = (a: number, b: number): V => [corner[0] + a * up[0] + b * lowerRight[0], corner[1] + a * up[1] + b * lowerRight[1]];
  const outline: V[] = [at(0, 0), at(length, 0), at(length, width), at(width, width), at(width, length), at(0, length)];
  const band: Region = outline.map((point, index) => seg(point, outline[(index + 1) % outline.length]));
  for (const turn of [0, 120, 240]) c.fill("mountain", toPath([band], { k: 1, turn }));
};
