import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, R, poly } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

export const kutsuwaBishiBuild = (c: Builder): void => {
  const width = R - 0.8;
  const height = width * 0.78;
  const shape = poly([[CX - width, CY], [CX, CY - height], [CX + width, CY], [CX, CY + height]]);
  const aperture: Pt[] = [[12.6, 12.6], [42, 12.6], [12.6, 35.5]];
  const eyes = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([signX, signY]) =>
    poly(aperture.map(([x, y]): Pt => [CX + x * signX, CY + y * signY])));
  c.guideCircle(C0, R);
  c.fill("horse-bit", shape.join(...eyes), "evenodd");
};
