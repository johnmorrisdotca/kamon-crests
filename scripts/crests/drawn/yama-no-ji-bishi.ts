// A lozenge with two bitten round openings and a flat triangular opening, from frame 29 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { bowedArc, carve, disc, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const yamaNoJiBishiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const corners: V[] = [[-96, 0], [0, 77], [96, 0], [0, -77]];
  const lozenge: Region = corners.map((corner, index) => seg(corner, corners[(index + 1) % corners.length]));
  const eye = (side: 1 | -1): Region[] => carve([disc([32 * side, 23.4], 19.2)], [disc([13.2 * side, -28.8], 41.2)]);
  const left: V = [-26, -21];
  const right: V = [26, -20];
  const mouth: Region = [bowedArc(left, right, 7.5), seg(right, [0, -39]), seg([0, -39], left)];
  c.fill("yama-no-ji", toPath(carve([lozenge], [...eye(-1), ...eye(1), mouth]), { k: 1 }), "evenodd");
};
