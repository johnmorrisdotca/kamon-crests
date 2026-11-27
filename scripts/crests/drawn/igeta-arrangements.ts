import type { Builder } from "../../construct/builder.ts";
import { R } from "../../construct/geo.ts";
import { carve, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { centred } from "./arms.ts";

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
