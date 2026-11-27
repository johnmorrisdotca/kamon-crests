import type { Builder } from "../../construct/builder.ts";
import { carve, pieceEnd, pieceStart, rotated, seg, toPath, thickSeg } from "../../construct/compass.ts";
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

const PART = "well-frame";

interface SquareFace {
  readonly u: V;
  readonly v: V;
}

/** The four beams of a well face in its two projected directions. */
const faceRails = ({ u, v }: SquareFace, depth: number, width = 8): [Region[], Region[]] => {
  const origin: V = [0, 23 + depth];
  const point = (a: number, b: number): V => [origin[0] + u[0] * a + v[0] * b, origin[1] + u[1] * a + v[1] * b];
  const rail = (from: V, to: V): Region => thickSeg(from, to, width);
  const along = [11, 61].map((t) => rail(point(-7, t), point(79, t)));
  const across = [11, 61].map((t) => rail(point(t, -7), point(t, 79)));
  return [along, across];
};

/** Frame 6, right r2c4. Three open well faces meet at the front corner of an isometric figure. */
export const mitsuIgetaBuild = (c: Builder): void => {
  const a: V = [-Math.sqrt(3) / 2, 0.5];
  const b: V = [Math.sqrt(3) / 2, 0.5];
  const down: V = [0, -1];
  const faces: SquareFace[] = [{ u: a, v: b }, { u: a, v: down }, { u: b, v: down }];
  const bands = faces.map((face) => faceRails(face, 0, 9.5));
  const { placing } = centred([bands.flat(2)], R, true);
  for (let i = 0; i < bands.length; i += 1) {
    const [over, under] = bands[i];
    const [clearance] = faceRails(faces[i], 0, 12.8);
    c.group(() => {
      c.fill(PART, toPath(carve(under, clearance), placing));
      c.fill(PART, toPath(over, placing));
    });
  }
};
