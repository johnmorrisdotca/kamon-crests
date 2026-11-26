import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { carveWhere, disc, inside, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const squareHole = ([x, y]: V, h: number): Region => polygon([[x - h, y - h], [x + h, y - h], [x + h, y + h], [x - h, y + h]]);

export const nimonSenBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const left: V = [-37, 0];
  const right: V = [37, 0];
  const clipping = disc(left, 58 + WEIGHT.hair);
  for (const [i, centre] of [right, left].entries()) {
    const edge = disc(centre, 58);
    const rim = disc(centre, 53);
    const face = disc(centre, 51);
    const hole = squareHole(centre, 11);
    const innerRule = squareHole(centre, 17);
    const outerRule = squareHole(centre, 19);
    const behind = i === 0 ? [clipping] : [];
    const ink = carveWhere(
      [edge, rim, face, hole, innerRule, outerRule, ...behind].flat(),
      (p) => (
        inside(edge, p) &&
        (!inside(rim, p) || inside(face, p)) &&
        (!inside(outerRule, p) || inside(innerRule, p)) &&
        !inside(hole, p) &&
        !behind.some((region) => inside(region, p))
      ),
    );
    c.fill("coin", toPath(ink, { k: 1 }), "evenodd");
  }
};
