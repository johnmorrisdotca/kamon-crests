import type { Builder } from "../../construct/builder.ts";
import { carve, onCircle, rotated, seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]) => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const spool = polygon([[-50.5, 80], [50.5, 80], [7.2, 0], [50.5, -80], [-50.5, -80], [-7.2, 0]]);

export function ryugoBuild(c: Builder): void {
  c.guideCircle(C0, R);
  c.fill("spool-toy", toPath([spool], { k: 1 }));
}

export function maruNiRyugoBuild(c: Builder): void {
  c.ring("ring-thin");
  c.fill("spool-toy", toPath([spool], { k: 0.85 }));
}

export function mitsuRyugoBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const tipRadius = 95;
  const notchRadius = tipRadius / Math.sqrt(3);
  const tips = Array.from({ length: 12 }, (_, i) =>
    onCircle([0, 0], i % 2 === 0 ? tipRadius : notchRadius, i * Math.PI / 6),
  );
  const outline = polygon(tips);
  const gap = polygon([[-5, 61], [-5, 49], [-45, 27], [-43, 24], [-5, 44], [-5, 20], [5, 20],
    [5, 44], [43, 24], [45, 27], [5, 49], [5, 61]]);
  const crossbar = polygon([[-2.7, 82], [-2.7, 22.5], [2.7, 22.5], [2.7, 82]]);
  const turns = [0, 120, 240];
  const openings = turns.map((degrees) => gap.map((edge) => rotated(edge, degrees * Math.PI / 180)));

  c.group(() => {
    c.fill("spool-toy", toPath(carve([outline], openings), { k: 1 }), "evenodd");
    for (const turn of turns) c.fill("spool-toy", toPath([crossbar], { k: 1, turn }));
  });
}

/**
 * Six spools about a small hexagon (frame 13, left r3c4): each runs out from an edge of the small hexagon to an edge of the large
 * one, its waist nearer the middle. In the book's pixels from the middle: the large hexagon's corners 148.5 out, the small one's
 * 43.8 above and below and 35.4 to either side; the side spools' waists 55 out and 20 across; the slanting spools' waists drawn
 * towards the upright, from 16.3 out at 54.3 up to 35.3 out at 49.5 up. So the white left between them is a narrow kite above and
 * below and a broad triangle at each side corner, as the book has it.
 */
export function mutsuKasaneRyugoBuild(c: Builder): void {
  const outer = 148.5;
  const flat = (outer * Math.sqrt(3)) / 2;
  const [top, up, side] = [43.8, 21.9, 35.4];
  const mirror = (points: V[], sx: number, sy: number) => points.map(([x, y]): V => [x * sx, y * sy]).reverse();
  const sideSpool: V[] = [[flat, outer / 2], [flat, -outer / 2], [55, -10], [side, -up], [side, up], [55, 10]];
  const slantSpool: V[] = [[0, outer], [flat, outer / 2], [35.3, 49.5], [side, up], [0, top], [16.3, 54.3]];
  const spools = [slantSpool, sideSpool, mirror(slantSpool, 1, -1), mirror(slantSpool, -1, -1), mirror(sideSpool, -1, 1), mirror(slantSpool, -1, 1)];
  const placing = { k: R / outer };
  c.guideCircle(C0, R);
  for (const points of spools) c.fill("spool-toy", toPath([polygon(points)], placing));
}
