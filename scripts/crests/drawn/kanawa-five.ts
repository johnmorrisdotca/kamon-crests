import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, carve, circleCircle, disc, onPage, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const plain = { k: 1 };

export function itsutsuKanawaBuild(c: Builder): void {
  const k = R / 466;
  const spread = 263 * k;
  const outer = 203 * k;
  const band = 27 * k;
  const inner = outer - band;
  const gap = 1.4;
  const mid = outer - band / 2;
  const centres = [0, 1, 2, 3, 4].map((i): V => [spread * Math.sin(i * 72 * DEG), spread * Math.cos(i * 72 * DEG)]);
  const angleAt = (from: V, to: V): number => Math.atan2(to[1] - from[1], to[0] - from[0]);
  // Where ring `a` meets ring `b`: the crossing farther from the middle, and the one nearer it.
  const crossings = (a: V, b: V): [V, V] => {
    const [p, q] = circleCircle(a, mid, b, mid);
    return Math.hypot(...p) > Math.hypot(...q) ? [p, q] : [q, p];
  };
  const over = (ring: V, point: V): Region => thickArc(ring, mid, band + 2 * gap, angleAt(ring, point) - 16 * DEG, angleAt(ring, point) + 16 * DEG);
  c.guideCircle(C0, R);
  c.guideLine(onPage([0, -R], plain), onPage([0, R], plain));
  centres.forEach((centre, i) => {
    const before = centres[(i + 4) % 5];
    const after = centres[(i + 1) % 5];
    const cuts = [over(before, crossings(before, centre)[0]), over(after, crossings(centre, after)[1])];
    for (const other of [before, after]) {
      c.gapCircle(onPage(other, plain), outer + gap);
      c.gapCircle(onPage(other, plain), inner - gap);
    }
    c.fill("linked-rings", toPath(carve([disc(centre, outer)], [disc(centre, inner), ...cuts]), plain), "evenodd");
  });
}
