import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

type Joint = [number, number, number];
type Beam = { from: Joint; to: Joint; halfWidth: number; extension: number };

/** Project two horizontal directions and the upright at the angle of the ruled print. */
const project = ([x, y, z]: Joint): V => [x - y, -0.53 * (x + y) - z];

const beamFace = ({ from, to, halfWidth, extension }: Beam, gap = 0): Region => {
  const a = project(from);
  const b = project(to);
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const x = (b[0] - a[0]) / length;
  const y = (b[1] - a[1]) / length;
  const end = extension + gap;
  const h = halfWidth + gap;
  const points: V[] = [
    [a[0] - x * end - y * h, a[1] - y * end + x * h],
    [b[0] + x * end - y * h, b[1] + y * end + x * h],
    [b[0] + x * end + y * h, b[1] + y * end - x * h],
    [a[0] - x * end + y * h, a[1] - y * end - x * h],
  ];
  return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
};

const inkBeam = (c: Builder, one: Beam, covers: Beam[], cuts: Region[] = []): void => {
  const clipped = carve([beamFace(one)], [...covers.map((above) => beamFace(above, 1.25)), ...cuts]);
  if (clipped.length > 0) c.fill("well-frame", toPath(clipped, { k: 1 }), "evenodd");
};

export const karaIzutsuBuild = (c: Builder): void => {
  c.precision(3);
  const a = 29;
  const z = 27;
  const rail = (from: Joint, to: Joint): Beam => ({ from, to, halfWidth: 8, extension: 18 });
  const tier = (height: number): Beam[] => [
    rail([-a, -a, height], [a, -a, height]),
    rail([a, -a, height], [a, a, height]),
    rail([-a, a, height], [a, a, height]),
    rail([-a, -a, height], [-a, a, height]),
  ];
  const roof = tier(-z);
  const floor = tier(z);
  const corners = [[-a, -a], [-a, a], [a, -a], [a, a]];
  const post = (x: number, y: number): Beam => ({ from: [x, y, -z], to: [x, y, z], halfWidth: 7.1, extension: 0 });
  const posts = corners.map(([x, y]) => post(x, y));
  for (const [i, rail] of floor.entries()) inkBeam(c, rail, [...roof, floor[(i + 1) % 4], ...posts]);
  for (const [i, one] of posts.entries()) {
    const [x, y] = corners[i];
    const seam = beamFace({
      from: [x + 2, y, -z + 2], to: [x + 2, y, z - 2], halfWidth: 0.85, extension: 0,
    });
    inkBeam(c, one, roof, [seam]);
  }
  for (const [i, rail] of roof.entries()) inkBeam(c, rail, [roof[(i + 1) % 4]]);
};

export const kumiawaseMitsuIgetaBuild = (c: Builder): void => {
  c.precision(3);
  const a = 32;
  const z = 35;
  const horizontal = (from: Joint, to: Joint): Beam => ({ from, to, halfWidth: 7.2, extension: 17 });
  const upright = (x: number, y: number): Beam => ({ from: [x, y, -z - 14], to: [x, y, z + 13], halfWidth: 7.8, extension: 14 });
  const high: Beam = horizontal([-a, -a, -z], [a, -a, -z]);
  const middle: Beam = horizontal([-a, a, -z], [a, a, -z]);
  const low: Beam = horizontal([-a, a, z], [a, a, z]);
  const highAcross: Beam = horizontal([-a, -a, -z], [-a, a, -z]);
  const middleAcross: Beam = horizontal([a, -a, -z], [a, a, -z]);
  const lowAcross: Beam = horizontal([a, -a, z], [a, a, z]);
  const left = upright(-a, a);
  const centre: Beam = { ...upright(a, a), from: [a, a, -z - 17], to: [a, a, z + 8] };
  const right = upright(a, -a);

  // At each joined corner, the foremost bar cuts a white clearance through the ones beneath.
  inkBeam(c, high, [right]);
  inkBeam(c, middle, [highAcross]);
  inkBeam(c, low, [left]);
  inkBeam(c, highAcross, [high]);
  inkBeam(c, middleAcross, [right, middle]);
  inkBeam(c, lowAcross, [low]);
  inkBeam(c, left, [highAcross, middle]);
  inkBeam(c, centre, [middle, low]);
  inkBeam(c, right, [lowAcross]);
};
