import type { Builder } from "../../construct/builder.ts";
import { carve, pieceEnd, pieceStart, rotated, seg, toPath, thickSeg, DEG, arcTo, onCircle } from "../../construct/compass.ts";
import type { Region, V, Circle } from "../../construct/compass.ts";
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

const turn = (regions: Region[], degrees: number): Region[] => regions.map((region) => region.map((piece) => rotated(piece, degrees * DEG)));

/** Frame 6, right r3c4. Three stepped regions fill a thread ring and meet around a small hexagonal opening. */
export const itowaMitsuwariIgetaBuild = (c: Builder, reach: number): void => {
  const rim: Circle = { c: [0, 0], r: reach };
  const edge = onCircle(rim.c, reach, 30 * DEG);
  const innerRadius = Math.round(0.208 * reach * 2) / 2;
  c.stepRound(innerRadius);
  const at = (x: number, y: number): V => [x * reach, y * reach];
  const notch: V[] = [edge, at(0.56, 0.323), at(0.68, 0.2), at(0.46, 0.07), at(0.46, 0.214), at(0.25, 0.145), onCircle(rim.c, innerRadius, 30 * DEG)];
  const oppose = notch.map(([x, y]): V => [-x / 2 - y * Math.sqrt(3) / 2, x * Math.sqrt(3) / 2 - y / 2]);
  const lines = (points: V[]): Region => points.slice(0, -1).map((point, i) => seg(point, points[i + 1]));
  const inner: V[] = [oppose[oppose.length - 1], [0, innerRadius], notch[notch.length - 1]];
  const cap = [arcTo(rim, edge, oppose[0], true), ...lines(oppose), ...lines(inner), ...lines(notch.slice().reverse())];
  const clearance = [notch, oppose].flatMap((points) => points.slice(0, -1).map((point, i) => thickSeg(point, points[i + 1], 2)));
  const bend: V = [0, 0.64 * reach];
  const outerNotch = [67, 113].map((angle) => thickSeg(bend, onCircle(rim.c, 1.04 * reach, angle * DEG), 1.8));
  const unit = carve([cap], [...clearance, ...outerNotch]);
  for (const angle of [0, 120, 240]) c.fill(PART, toPath(turn(unit, -angle), { k: 1 }), "evenodd");
};
