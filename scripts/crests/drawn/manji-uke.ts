import type { Builder } from "../../construct/builder.ts";
import { R } from "../../construct/geo.ts";
import { carve, onPage, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));
const plain = { k: 1 };

export function maruNiUkeBuild(c: Builder): void {
  c.ring("ring-medium");
  const half = 57.3;
  const width = 2.2;
  const at = (s: number, t: number): V => [s * 2 * half, -t * 2 * half];
  const run = (points: [number, number][]): Region => {
    const line = points.map(([s, t]) => at(s, t));
    const unit = (a: V, b: V): V => [(b[0] - a[0]) / Math.hypot(b[0] - a[0], b[1] - a[1]), (b[1] - a[1]) / Math.hypot(b[0] - a[0], b[1] - a[1])];
    const [first, last] = [line[0], line[line.length - 1]];
    const lead = unit(line[1], first);
    const tail = unit(line[line.length - 2], last);
    line[0] = [first[0] + lead[0] * 10, first[1] + lead[1] * 10];
    line[line.length - 1] = [last[0] + tail[0] * 10, last[1] + tail[1] * 10];
    const sides = (sign: number): V[] => line.map((p, i): V => {
      const before = i > 0 ? unit(line[i - 1], p) : unit(p, line[i + 1]);
      const after = i < line.length - 1 ? unit(p, line[i + 1]) : before;
      const [n1, n2]: V[] = [[-before[1], before[0]], [-after[1], after[0]]];
      const scale = (sign * width) / 2 / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
      return [p[0] + (n1[0] + n2[0]) * scale, p[1] + (n1[1] + n2[1]) * scale];
    });
    return polygon([...sides(1), ...sides(-1).reverse()]);
  };
  const square = polygon([at(-.5, -.5), at(.5, -.5), at(.5, .5), at(-.5, .5)]);
  const first = run([[-.5, -.25], [-.25, -.25], [-.25, 0], [.25, 0], [.25, .25], [.5, .25]]);
  const second = run([[-.25, .5], [-.25, .25], [0, .25], [0, -.25], [.25, -.25], [.25, -.5]]);
  c.guideLine(onPage([-R, 0], plain), onPage([R, 0], plain));
  c.guideLine(onPage([0, -R], plain), onPage([0, R], plain));
  c.guidePath(toPath([square], plain));
  c.fill("square-frame", toPath(carve([square], [first, second]), plain), "evenodd");
}
