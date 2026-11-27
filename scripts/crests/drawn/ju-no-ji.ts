import type { Builder } from "../../construct/builder.ts";
import { DEG, arcA, onPage, pieceEnd, pieceStart, seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";

export function maruNiJuNoJiBuild(c: Builder): void {
  const part = "ju-no-ji";
  const placing = { k: 1 };
  const head: V = [-4, 75];
  const leftShoulder: V = [-28, 57];

  const rightShoulder = arcA([6, 55], 7, 50 * DEG, -45 * DEG);
  const upperRightJoin = arcA([14, 29], 5, 180 * DEG, 270 * DEG);
  const rightEnd = arcA([59, 12], 16, 120 * DEG, -78 * DEG);
  const lowerRightJoin = arcA([14, -1], 5, 90 * DEG, 180 * DEG);
  const rightFoot = arcA([-1, -59], 15, 0, -90 * DEG);
  const leftFoot = arcA([-6, -63], 11, -90 * DEG, -180 * DEG);
  const lowerLeftJoin = arcA([-24, -1], 5, 0, 90 * DEG);
  const leftEnd = arcA([-59, 12], 13, -75 * DEG, -242 * DEG);
  const upperLeftJoin = arcA([-25, 29], 5, -90 * DEG, 0);

  const curves = [rightShoulder, upperRightJoin, rightEnd, lowerRightJoin, rightFoot, leftFoot, lowerLeftJoin, leftEnd, upperLeftJoin];
  const outline = [
    seg(head, pieceStart(rightShoulder)),
    ...curves.flatMap((arc, i) => [arc, seg(pieceEnd(arc), curves[i + 1] === undefined ? leftShoulder : pieceStart(curves[i + 1]))]),
    seg(leftShoulder, head),
  ];

  c.ring("ring-thin");
  c.zoom(1.06);
  for (const arc of curves) if (arc.t === "A") c.guideCircle(onPage(arc.c, placing), arc.r);
  for (const edge of outline) if (edge.t === "L") c.guideLine(onPage(edge.a, placing), onPage(edge.b, placing));
  c.fill(part, toPath([outline], placing));
}
