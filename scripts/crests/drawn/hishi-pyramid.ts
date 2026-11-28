import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { carve, onPage, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));

const plain = { k: 1 };

export function mitsumoriSangaiBishiBuild(c: Builder): void {
  const right: V[] = [[48, 24], [27, 36.5], [73, 58], [45, 74], [80, 93], [0, 136]];
  const left: V[] = right.slice(0, -1).reverse().map(([x, y]): V => [-x, y]);
  const k = R / Math.hypot(160, 71.5);
  const at = ([x, y]: V, [dx, dy]: V = [0, 0]): V => [(x + dx) * k, (114.5 - y - dy) * k];
  const lozenge = (apex: V): V[] => [[0, 0] as V, ...right, ...left].map((p): V => at(p, apex));
  const top = lozenge([0, 0]);
  const lowerLeft = lozenge([-80, 93]);
  const lowerRight = lozenge([80, 93]);
  const seam = (from: V, to: V) => thickSeg(at(from), at(to), 4.8 * k);
  c.guideCircle(C0, R);
  c.guideLine(onPage([0, at([0, 0])[1]], plain), onPage([0, at([0, 136])[1]], plain));
  c.fill("diamond", toPath([polygon(top)], plain), "evenodd");
  c.fill("diamond", toPath(carve([polygon(lowerLeft)], [seam([-84, 91], [4, 138])]), plain), "evenodd");
  c.fill("diamond", toPath(carve([polygon(lowerRight)], [seam([84, 91], [-4, 138])]), plain), "evenodd");
}
