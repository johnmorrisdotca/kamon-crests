// Four ruled mountain bands woven in pairs, from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

export const yotsuYamagataOriBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const gap = 1.6;
  const seam = 1.5;
  const sideSlope = 0.9;
  const sideApex = -94;
  const sideInner = -66;
  const sideOuterEnd = sideSlope * (-seam - sideApex);
  const sideInnerEnd = sideSlope * (-seam - sideInner);
  const side = polygon([[sideApex, 0], [-seam, sideOuterEnd], [-seam, sideInnerEnd], [sideInner, 0], [-seam, -sideInnerEnd], [-seam, -sideOuterEnd]]);

  const hookSlope = 1.1;
  const hookInner = -27.2;
  const capOuter = -64;
  const capInner = -74.2;
  const outerCap = -hookSlope * capOuter;
  const innerCap = hookSlope * (-capInner + hookInner);
  const hook = polygon([[capOuter, outerCap], [0, 0], [capOuter, -outerCap], [capInner, -innerCap], [hookInner, 0], [capInner, innerCap]]);

  const hookRise = gap * Math.hypot(1, hookSlope);
  const hookIn = (x: number): number => hookSlope * (-x + hookInner) - hookRise;
  const hookOut = (x: number): number => hookSlope * -x + hookRise;
  const hookLeg = polygon([[-80, hookIn(-80)], [-5, hookIn(-5)], [-5, hookOut(-5)], [-80, hookOut(-80)]]);
  const sideRise = gap * Math.hypot(1, sideSlope);
  const sideLeg = polygon([[-90, -sideSlope * (-90 - sideApex) - sideRise], [-5, -sideSlope * (-5 - sideApex) - sideRise], [-5, -sideSlope * (-5 - sideInner) + sideRise], [-90, -sideSlope * (-90 - sideInner) + sideRise]]);

  for (const turn of [0, 180]) {
    c.fill("mountain", toPath(carve([side], [hookLeg]), { k: 1, turn }));
    c.fill("mountain", toPath(carve([hook], [sideLeg]), { k: 1, turn }));
  }
};
