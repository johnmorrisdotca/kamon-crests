// Four ruled mountain bands from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, CX, CY, R } from "../../construct/geo.ts";

const outline = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

const mountainBand = (c: Builder, halfWidth: number, halfHeight: number, width: number): void => {
  const side = Math.hypot(halfWidth, halfHeight);
  const end = (fraction: number): V => [halfWidth * fraction, halfHeight * (1 - fraction)];
  const intoBand = ([x, y]: V): V => [x - (width * halfHeight) / side, y - (width * halfWidth) / side];
  const leftOf = ([x, y]: V): V => [-x, y];
  const below = ([x, y]: V): V => [x, -y];
  const halfGap = 1.55 / side;
  const upperEnd = end(0.5 - halfGap);
  const outerEnd = end(0.5 + halfGap);
  const upperInner = intoBand(upperEnd);
  const outerInner = intoBand(outerEnd);
  const innerTop = halfHeight - (width * side) / halfWidth;
  const innerSide = halfWidth - (width * side) / halfHeight;
  const top = outline([[0, halfHeight], upperEnd, upperInner, [0, innerTop], leftOf(upperInner), leftOf(upperEnd)]);
  const right = outline([[halfWidth, 0], below(outerEnd), below(outerInner), [innerSide, 0], outerInner, outerEnd]);
  for (const turn of [0, 180]) {
    c.fill("mountain", toPath([top], { k: 1, turn }));
    c.fill("mountain", toPath([right], { k: 1, turn }));
  }
};

export const yotsuYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  mountainBand(c, 94, 73, 11.5);
};

export const yotsuIrekoYamabishiBuild = (c: Builder): void => {
  c.precision(3);
  const bands = [[R, 72], [67, 43], [38, 17]] as const;
  for (const [outer, inner] of bands) {
    c.guideCircle(C0, outer);
    c.guideCircle(C0, inner);
  }
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  for (const [outer, inner] of bands) {
    mountainBand(c, outer, outer, (outer - inner) / Math.SQRT2);
  }
};
