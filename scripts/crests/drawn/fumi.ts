import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (corners: V[]): Region => corners.map((corner, i) => seg(corner, corners[(i + 1) % corners.length]));

export const tamazusaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const panels = [
    polygon([[-82, -41], [-34, 9], [-18, -17], [-40, -44]]),
    polygon([[-31, 12], [-4, 43], [25, -10], [-16, -14]]),
    polygon([[8, 32], [22, 44], [89, -31], [59, -44], [28, -12]]),
    polygon([[0, 46], [18, 46], [7, 36]]),
  ];
  c.fill("folded-letter", toPath(panels, { k: 1 }));
};
