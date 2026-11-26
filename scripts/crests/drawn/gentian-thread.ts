import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, mirrored, reversed, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const GENTIAN = "gentian";

function outline(points: V[]): Region {
  return points.map((point, index) => seg(point, points[(index + 1) % points.length]));
}

function lens(start: V, end: V, radius: number): Region {
  const x = (start[0] + end[0]) / 2;
  const y = (start[1] + end[1]) / 2;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const bow = (near: V) => shortArc(circleThrough(start, end, radius, near), start, end);
  return [bow([x - dy, y + dx]), reversed(bow([x + dy, y - dx]))];
}

function stamen(start: V, end: V, r: number, toward: V): Region {
  const circle = circleThrough(start, end, r, toward);
  const a = shortArc(circle, start, end);
  if (a.t !== "A") throw new Error("The stamen needs a compass arc");
  return thickArc(circle.c, circle.r, WEIGHT.thread, a.a0, a.a1);
}

export function itowaNiMitsuWariRindoBuild(c: Builder): void {
  const leaf = [lens([-15, 88], [-73, 48], 70), thickSeg([-23, 82], [-65, 54], WEIGHT.thread)];
  const bud = lens([-14, 87], [14, 87], 21);
  const stalk = thickSeg([0, 46], [0, 82], WEIGHT.thin);
  const flowerRim = outline([[0, 35], [12, 25], [19, 16], [35, 12], [26, 5], [17, 2], [20, -15], [12, -15], [0, -9], [-12, -15], [-20, -15], [-17, 2], [-26, 5], [-35, 12], [-19, 16], [-12, 25]]);
  const fork = stamen([0, 1], [17, 10], 32, [19, -19]);
  const flower = carve([flowerRim], [thickSeg([0, 0], [0, 25], WEIGHT.thread), fork, fork.map(mirrored)]);

  c.ring("ring-thread");
  for (const turn of [0, 120, 240]) {
    c.fill(GENTIAN, toPath(leaf, { k: 1, turn }), "evenodd");
    c.fill(GENTIAN, toPath(leaf.map((piece) => piece.map(mirrored)), { k: 1, turn }), "evenodd");
    c.fill(GENTIAN, toPath([bud, stalk], { k: 1, turn }));
    const angle = turn * DEG;
    const at: V = [37 * Math.sin(angle), 37 * Math.cos(angle)];
    c.fill(GENTIAN, toPath(flower, { k: 0.99, at, turn: turn + 180 }), "evenodd");
  }
}
