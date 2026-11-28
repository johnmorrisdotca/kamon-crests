import type { Builder } from "../../construct/builder.ts";
import { carve, onCircle, rotated, seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]) => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
/** A spool: its ends `half` either side of its upright, `high` above and below its waist, which is `waist` either side. */
const spoolOf = (half: number, high: number, waist: number, x = 0, y = 0) =>
  polygon([[x - half, y + high], [x + half, y + high], [x + waist, y], [x + half, y - high], [x - half, y - high], [x - waist, y]]);
const spool = spoolOf(50.5, 80, 7.2);

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

/** Two tall spools side by side, their ends' inner corners meeting on the upright (frame 13, left r2c3). */
export function futatsuRyugoBuild(c: Builder): void {
  const [half, high, waist] = [55, 127, 9.75];
  const placing = { k: R / Math.hypot(2 * half, high) };
  c.guideCircle(C0, R);
  for (const x of [-half, half]) c.fill("spool-toy", toPath([spoolOf(half, high, waist, x)], placing));
}

/**
 * Three spools nested (frame 13, left r3c3): one above, two below it 65.5 to either side and 84.5 lower, so that the upper one's
 * foot stands in the notch between them, a narrow white from them.
 */
export function mitsuIrekoRyugoBuild(c: Builder): void {
  const [half, high, waist, across, down] = [48.7, 83.5, 10.5, 65.5, 84.5];
  const placing = { k: R / Math.hypot(across + half, high + down / 2) };
  c.guideCircle(C0, R);
  c.fill("spool-toy", toPath([spoolOf(half, high, waist, 0, down / 2)], placing));
  for (const x of [-across, across]) c.fill("spool-toy", toPath([spoolOf(half, high, waist, x, -down / 2)], placing));
}
