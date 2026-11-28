import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { carve, onPage, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));
const plain = { k: 1 };

export function manjiBishiBuild(c: Builder): void {
  const half = 74.3 / 100 * R;
  const at = (s: number, t: number): V => [(s - t) * R, -(s + t) * half];
  const lozenge = polygon([at(-.5, -.5), at(.5, -.5), at(.5, .5), at(-.5, .5)]);
  const reach = .16;
  const outside = .56;
  const slit = (from: [number, number], to: [number, number]): Region => thickSeg(at(...from), at(...to), 3);
  const slits = [
    slit([-outside, -reach], [-reach, -reach]),
    slit([reach, -outside], [reach, -reach]),
    slit([outside, reach], [reach, reach]),
    slit([-reach, outside], [-reach, reach]),
  ];
  c.guideCircle(C0, R);
  c.guideLine(onPage([-R, 0], plain), onPage([R, 0], plain));
  c.guideLine(onPage([0, -half], plain), onPage([0, half], plain));
  c.guidePath(toPath([lozenge], plain));
  c.fill("manji", toPath(carve([lozenge], slits), plain), "evenodd");
}
