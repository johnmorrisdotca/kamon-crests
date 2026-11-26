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
