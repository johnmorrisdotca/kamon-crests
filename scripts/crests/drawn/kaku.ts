import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, CX, CY, R, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

const polygon = (corners: V[]): Region => corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));
const diamond = ([x, y]: V, half: number): Region => polygon([[x, y + half], [x + half, y], [x, y - half], [x - half, y]]);

export const foldedSquare = (c: Builder): void => {
  const halfWidth = 6 * Math.SQRT1_2;
  const inset = 13 * Math.SQRT1_2;
  const mid = R / 2;
  const edge: Pt[] = [
    [CX, CY - R],
    [CX + mid - halfWidth, CY - mid - halfWidth],
    [CX + mid - halfWidth - inset, CY - mid - halfWidth + inset],
    [CX + mid + halfWidth - inset, CY - mid + halfWidth + inset],
    [CX + mid + halfWidth, CY - mid + halfWidth],
  ];
  const angles = [0, 90, 180, 270];
  const path = poly(angles.flatMap((angle) => edge.map((point) => turn(point, angle))));
  const inner = 43;
  const eye = 11;
  const holes = [diamond([0, 0], inner), diamond([0, inner + eye], eye), diamond([inner + eye, 0], eye), diamond([0, -inner - eye], eye), diamond([-inner - eye, 0], eye)];
  c.guideCircle(C0, R);
  c.guideCircle(C0, inner);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.fill("square-frame", path.join(toPath(holes, { k: 1 })), "evenodd");
};
