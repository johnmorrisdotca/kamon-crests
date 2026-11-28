import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, onPage, seg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const plain = { k: 1 };
const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));

export function hizumiKakuNiSanBuild(c: Builder): void {
  const lobeAt = 56.05;
  const lobeRadius = 39.95;
  const sideRadius = 52.65;
  const sideAt = (lobeAt + Math.sqrt(2 * (lobeRadius + sideRadius) ** 2 - lobeAt ** 2)) / 2;
  const band = 16.1;
  const lobes: V[] = [[0, lobeAt], [lobeAt, 0], [0, -lobeAt], [-lobeAt, 0]];
  const sides: V[] = [[sideAt, sideAt], [sideAt, -sideAt], [-sideAt, -sideAt], [-sideAt, sideAt]];
  const outline = (lobeRadius: number, sideRadius: number): Region => {
    const touch = (from: V, to: V, r: number, other: number): V => [from[0] + (to[0] - from[0]) * r / (r + other), from[1] + (to[1] - from[1]) * r / (r + other)];
    const pieces: Piece[] = [];
    lobes.forEach((lobe, i) => {
      const before = sides[(i + 3) % 4];
      const after = sides[i];
      const next = lobes[(i + 1) % 4];
      const start = touch(lobe, before, lobeRadius, sideRadius);
      const end = touch(lobe, after, lobeRadius, sideRadius);
      pieces.push(arcTo({ c: lobe, r: lobeRadius }, start, end, false));
      pieces.push(arcTo({ c: after, r: sideRadius }, end, touch(next, after, lobeRadius, sideRadius), true));
      c.guideCircle(onPage(lobe, plain), lobeRadius);
      c.guideCircle(onPage(after, plain), sideRadius);
    });
    return pieces;
  };
  const outer = outline(lobeRadius, sideRadius);
  const inner = outline(lobeRadius - band, sideRadius + band);
  const bars = [31, 0, -31].map((y): Region => polygon([[-31.3, y + 8.75], [31.3, y + 8.75], [31.3, y - 8.75], [-31.3, y - 8.75]]));
  c.guideCircle(C0, R);
  c.guideSpokes(4);
  c.fill("square-frame", toPath(carve([outer], [inner]), plain), "evenodd");
  for (const bar of bars) {
    c.guidePath(toPath([bar], plain));
    c.fill("line", toPath([bar], plain), "evenodd");
  }
}
