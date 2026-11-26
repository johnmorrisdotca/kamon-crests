import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { carveWhere, DEG, disc, inside, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
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

export const hasebeZeniBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.fill("coin", toPath([disc([0, 0], 43), squareHole([0, 0], 12)], { k: 1 }), "evenodd");
  for (let i = 0; i < 8; i += 1) {
    const angle = i * 45 * DEG;
    const centre: V = [69 * Math.sin(angle), 69 * Math.cos(angle)];
    c.fill("coin", toPath([disc(centre, 26), squareHole(centre, 7)], { k: 1 }), "evenodd");
  }
};

export const shimonSenBuild = (c: Builder): void => {
  const outer = disc([0, 0], 96);
  const rim = disc([0, 0], 89);
  const field = disc([0, 0], 86);
  const hole = squareHole([0, 0], 12);
  const insetSquare = squareHole([0, 0], 18);
  const outerSquare = squareHole([0, 0], 20);
  const lower = disc([0, -130], 111);
  const aboveLower = disc([0, -130], 111 + WEIGHT.thread);
  const upper = polygon([[-19, 19], [19, 19], [101, 100], [-101, 100]]);
  const upperSeparators = [
    thickSeg([-19, 19], [-100, 99], WEIGHT.hair),
    thickSeg([19, 19], [100, 99], WEIGHT.hair),
  ];
  const sideBands: Circle[] = [{ c: [126, -92], r: 125 }, { c: [101, -65], r: 67 }];
  const sections: Circle[][] = [
    [{ c: [0, -119], r: 159 }, { c: [0, -119], r: 183 }],
    sideBands,
    [{ c: [0, -130], r: 91 }, { c: [0, -130], r: 63 }],
    sideBands.map(({ c, r }) => ({ c: [-c[0], c[1]], r })),
  ];
  const seams = sections.flat().flatMap(({ c, r }) => [disc(c, r), disc(c, r + WEIGHT.hair)]);
  const boundaries = [outer, rim, field, hole, insetSquare, outerSquare, lower, aboveLower, upper, ...upperSeparators, ...seams];
  const ink = carveWhere(boundaries.flat(), (p) => {
    if (!inside(outer, p) || inside(hole, p)) return false;
    if (!inside(rim, p)) return true;
    if (!inside(field, p)) return false;
    if (inside(outerSquare, p)) return inside(insetSquare, p);
    if (inside(aboveLower, p) && !inside(lower, p)) return false;
    if (upperSeparators.some((gap) => inside(gap, p))) return false;
    const section = inside(lower, p) ? 2 : inside(upper, p) ? 0 : p[0] > 0 ? 1 : 3;
    return !sections[section].some(({ c, r }) => {
      const reach = Math.hypot(p[0] - c[0], p[1] - c[1]);

      return reach > r && reach < r + WEIGHT.hair;
    });
  });
  c.guideCircle(C0, R);
  c.fill("coin", toPath(ink, { k: 1 }), "evenodd");
};
