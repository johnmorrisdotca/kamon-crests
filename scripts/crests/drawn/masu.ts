import type { Builder } from "../../construct/builder.ts";
import { carveWhere, inside, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));
const rectangle = (half: number, low: number, high: number): Region => polygon([[-half, low], [half, low], [half, high], [-half, high]]);

const square = (half: number): Region => rectangle(half, -half, half);

const boxFace = (half: number, rim: number, y: number, stripe: number): Region[] => {
  const room = half - rim;
  const outer = rectangle(half, y - half, y + half);
  const hole = rectangle(room, y - room, y + room);
  const cornerBrace = thickSeg([-half, y - half], [half, y + half], stripe);

  return carveWhere([outer, hole, cornerBrace].flat(), (p) =>
    inside(outer, p) && (!inside(hole, p) || inside(cornerBrace, p)),
  );
};

export const kageNoMasuBuild = (c: Builder): void => {
  const half = R / Math.SQRT2;
  c.guideCircle(C0, R);
  c.fill("measuring-box", toPath([square(half), square(half - 6.1)], { k: 1 }), "evenodd");
  c.fill("measuring-box", toPath(boxFace(45, 5.6, 0, 4.2), { k: 1 }), "evenodd");
};
