import type { Builder } from "../../construct/builder.ts";
import { carve, disc, lineLine, seg, thickSeg, toPath, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const railSide = (points: V[], inset: number): V[] => {
  const lines = points.slice(1).map((to, i): [V, V] => {
    const from = points[i];
    const along = vunit(vsub(to, from));
    const across = vmul([-along[1], along[0]], inset);

    return [vadd(from, across), vadd(to, across)];
  });
  const corners = lines.slice(1).map((line, i) => lineLine(...lines[i], ...line));

  return [lines[0][0], ...corners, lines[lines.length - 1][1]];
};

export const kagiBishiBuild = (c: Builder): void => {
  const onLozenge = ([u, v]: V): V => [u + v, (u - v) * 0.8];
  const corners: V[] = [[44, -44], [-44, -44], [-44, 26], [26, 26], [26, -10], [-10, -10], [-10, 10]];
  const rail = corners.map(onLozenge);
  const boundary = [...railSide(rail, 2.8), ...railSide(rail, -2.8).reverse()];
  const body: Region = boundary.map((p, i) => seg(p, boundary[(i + 1) % boundary.length]));
  const grip = thickSeg(rail[0], onLozenge([-6, -44]), 10);
  const pin = disc(onLozenge([38, -44]), 1.8);
  const key = carve([body, grip], [pin]);

  c.guideCircle(C0, R);
  for (const turn of [0, 180]) c.fill("key", toPath(key, { k: 1, turn }), "evenodd");
};
