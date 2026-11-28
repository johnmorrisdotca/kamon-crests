import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { carve, onPage, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));
const plain = { k: 1 };

export function chigaiBishiBuild(c: Builder): void {
  const apart = 49;
  const outer: V = [114.5, 82];
  const inner: V = [70, 53];
  const k = R / (apart + outer[0]);
  const gap = 3;
  const lozenge = (cx: number, [a, b]: V, grow = 0): Region => {
    const s = 1 + grow / (a * b / Math.hypot(a, b));
    return polygon([[cx - a * s, 0], [cx, b * s], [cx + a * s, 0], [cx, -b * s]].map(([x, y]): V => [x * k, y * k]));
  };
  const chevron = (cx: number, up: 1 | -1): Region => {
    const [a, b] = outer;
    const so = 1 + gap / (a * b / Math.hypot(a, b));
    const [p, q] = inner;
    const si = 1 - gap / (p * q / Math.hypot(p, q));
    return polygon([[cx - a * so, 0], [cx, up * b * so], [cx + a * so, 0], [cx + p * si, 0], [cx, up * q * si], [cx - p * si, 0]].map(([x, y]): V => [x * k, y * k]));
  };
  c.guideCircle(C0, R);
  c.guideLine(onPage([-R, 0], plain), onPage([R, 0], plain));
  for (const cx of [-apart, apart]) {
    c.guidePath(toPath([lozenge(cx, outer)], plain));
    c.guidePath(toPath([lozenge(cx, inner)], plain));
  }
  c.fill("diamond", toPath(carve([lozenge(-apart, outer)], [lozenge(-apart, inner), chevron(apart, 1)]), plain), "evenodd");
  c.fill("diamond", toPath(carve([lozenge(apart, outer)], [lozenge(apart, inner), chevron(-apart, -1)]), plain), "evenodd");
}
