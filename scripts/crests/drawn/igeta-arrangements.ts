import type { Builder } from "../../construct/builder.ts";
import { carve, pieceEnd, pieceStart, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { centred } from "./arms.ts";
import { igetaBars } from "./plain.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

const signedArea = (loop: Region): number => loop.reduce((area, edge) => {
  const [ax, ay] = pieceStart(edge);
  const [bx, by] = pieceEnd(edge);
  return area + ax * by - ay * bx;
}, 0);

export const kasaneIgetaBuild = (c: Builder): void => {
  const beams = igetaBars();
  const laid = ([x, y]: V, shift: number): V => [1.2 * x, 0.84 * (y + shift)];
  const stacked = [-21, 21].flatMap((shift) =>
    beams.map((beam) => beam.map((edge) => seg(laid(pieceStart(edge), shift), laid(pieceEnd(edge), shift)))));
  const { placing } = centred([stacked], R, true);
  const outside = carve(stacked, []).filter((loop) => signedArea(loop) > 0);
  const side = polygon([[42, 0], [57, 11], [72, 0], [57, -11]]);
  const centre = polygon([[-6, 0], [0, 5], [6, 0], [0, -5]]);
  const upper = polygon([[-42, 22], [0, 50], [42, 22], [31, 13], [25, 17], [31, 22], [12, 35], [0, 28],
    [-12, 35], [-31, 22], [-25, 17], [-31, 13]]);
  const opposite = (loop: Region): Region => loop.map((edge) => rotated(edge, Math.PI));

  c.guideCircle(C0, R);
  const openings = [side, opposite(side), centre, upper, opposite(upper)];
  c.fill("well-frame", toPath(outside, placing).join(toPath(openings, { k: 1 })), "evenodd");
};
