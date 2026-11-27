import type { Builder } from "../../construct/builder.ts";
import { C0, R, polar } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, disc, rotated, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Region } from "../../construct/compass.ts";
import { HANABISHI_SIDE, hanabishiBuild } from "./hanabishi.ts";

const part = "flower-lozenge";

export function itowaNiHanabishiBuild(c: Builder): void {
  c.ring("ring-thread");
  hanabishiBuild(c, part, 82);
}

const shadowTop: Circle[] = [{ c: [0, 53], r: 28 }, { c: [32, 48], r: 22 }, { c: [-32, 48], r: 22 }];

const hollowPetal = (): Region[] => {
  const lobes: Circle[] = [{ c: [0, 39], r: 15 }, { c: [13, 32], r: 13 }, { c: [-13, 32], r: 13 }];
  const stamen = disc([0, 22], 3.3);
  const stem = [seg([-3.3, 11], [3.3, 11]), seg([3.3, 11], [3.3, 22]), seg([3.3, 22], [-3.3, 22]), seg([-3.3, 22], [-3.3, 11])];
  const shell = [...disc([0, 0], 29), ...disc([0, 0], 14), ...lobes.flatMap((lobe) => disc(lobe.c, lobe.r)), ...stamen, ...stem];
  const splits = [seg([-100, -98], [100, 102]), seg([100, -98], [-100, 102])];
  return carveWhere([...shell, ...splits], (p) => {
    const [x, y] = p;
    const r = Math.hypot(x, y);
    const inStem = Math.abs(x) < 3.3 && y > 11 && y < 22;
    return y > Math.abs(x) + 2 && r > 14 && (r < 29 || lobes.some((lobe) => vdist(p, lobe.c) < lobe.r)) && !inStem && vdist(p, [0, 22]) > 3.3;
  });
};

export function futokageHanabishiBuild(c: Builder): void {
  const up = shadowTop.map((lobe) => disc(lobe.c, lobe.r));
  const side = HANABISHI_SIDE.lobes.map((lobe) => disc(lobe.c, lobe.r));
  const mirror = (loop: Region): Region => loop.map((edge) => rotated(edge, Math.PI));
  const outline = carve([disc([0, 0], 66), ...up, ...side, ...up.map(mirror), ...side.map(mirror)], []);
  const petal = hollowPetal();
  const holes = [disc([0, 0], 12), ...[0, 90, 180, 270].flatMap((angle) => petal.map((loop) => loop.map((piece) => rotated(piece, angle * DEG))))];
  c.guideCircle(C0, R);
  c.guideSpokes(4);
  c.fill(part, toPath([...outline, ...holes], { k: R / 100 }), "evenodd");
}
