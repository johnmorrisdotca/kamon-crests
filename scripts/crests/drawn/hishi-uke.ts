import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { carve, onPage, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));
const plain = { k: 1 };

export function ukeBishiBuild(c: Builder): void {
  const half = 76.4 / 100 * R;
  const at = (s: number, t: number): V => [(s - t) * R, -(s + t) * half];
  const width = 2.2;
  const run = (points: [number, number][]): Region => {
    const line = points.map(([s, t]) => at(s, t));
    const [first, last] = [line[0], line[line.length - 1]];
    const unit = (a: V, b: V): V => [(b[0] - a[0]) / Math.hypot(b[0] - a[0], b[1] - a[1]), (b[1] - a[1]) / Math.hypot(b[0] - a[0], b[1] - a[1])];
    const lead = unit(line[1], first);
    const tail = unit(line[line.length - 2], last);
    line[0] = [first[0] + lead[0] * 14, first[1] + lead[1] * 14];
    line[line.length - 1] = [last[0] + tail[0] * 14, last[1] + tail[1] * 14];
    const sides = (sign: number): V[] => line.map((p, i): V => {
      const before = i > 0 ? unit(line[i - 1], p) : unit(p, line[i + 1]);
      const after = i < line.length - 1 ? unit(p, line[i + 1]) : before;
      const [n1, n2]: V[] = [[-before[1], before[0]], [-after[1], after[0]]];
      const scale = (sign * width) / 2 / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
      return [p[0] + (n1[0] + n2[0]) * scale, p[1] + (n1[1] + n2[1]) * scale];
    });
    return polygon([...sides(1), ...sides(-1).reverse()]);
  };
  const lozenge = polygon([at(-.5, -.5), at(.5, -.5), at(.5, .5), at(-.5, .5)]);
  const first = run([[-.5, -.25], [-.25, -.25], [-.25, 0], [.25, 0], [.25, .25], [.5, .25]]);
  const second = run([[-.25, .5], [-.25, .25], [0, .25], [0, -.25], [.25, -.25], [.25, -.5]]);
  c.guideCircle(C0, R);
  c.guideLine(onPage([-R, 0], plain), onPage([R, 0], plain));
  c.guideLine(onPage([0, -half], plain), onPage([0, half], plain));
  c.guidePath(toPath([lozenge], plain));
  c.fill("diamond", toPath(carve([lozenge], [first, second]), plain), "evenodd");
}
