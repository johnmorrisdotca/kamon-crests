import type { Builder } from "../../construct/builder.ts";
import { carve, mirrored, reversedRun, rotated, seg, thickArc, toPath } from "../../construct/compass.ts";
import type { Region } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { cottonBinding, draftArc } from "./yuiwata.ts";
import type { ArcDraft } from "./yuiwata.ts";

const upperEdge: ArcDraft[] = [
  [[0, 84], [7, 82], [12, 76]],
  [[12, 76], [24, 73], [26, 62]],
  [[26, 62], [37, 61], [43, 54]],
  [[43, 54], [52, 52], [56, 43]],
  [[56, 43], [66, 41], [71, 33]],
  [[71, 33], [81, 30], [84, 22]],
  [[84, 22], [93, 16], [96, 6]],
  [[96, 6], [84, 6.2], [72, 9]],
  [[72, 9], [54, 14.5], [35, 16]],
  [[35, 16], [24, 14], [17, 7]],
];

const fanFolds: ArcDraft[] = [
  [[6, 6], [10, 36], [27, 63]],
  [[14, 6], [31, 28], [57, 44]],
];

const tailEdge: ArcDraft[] = [
  [[17, 0], [27, 10], [39, 11.3]],
  [[39, 11.3], [68, 7.2], [94, 0]],
];

export function yuiwataBishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(4);
  const edge = upperEdge.map(draftArc);
  const upper = [...edge, seg([17, 7], [-17, 7]), ...reversedRun(edge.map(mirrored))];
  const grooves = fanFolds.map((draft): Region => {
    const arc = draftArc(draft);
    if (arc.t !== "A") throw new Error("Cotton folds use compass arcs");
    return thickArc(arc.c, arc.r, 2.05, arc.a0, arc.a1);
  });
  const fan = carve([upper], [...grooves, ...grooves.map((loop) => loop.map(mirrored))]);
  const tailUpper = tailEdge.map(draftArc);
  const tail = [...tailUpper, ...reversedRun(tailUpper.map((piece) => rotated(mirrored(piece), Math.PI)))];
  const part = "cotton-bundle";
  c.fill(part, toPath(fan, { k: 1 }), "evenodd");
  c.fill(part, toPath(fan, { k: 1, turn: 180 }), "evenodd");
  c.fill(part, toPath([tail], { k: 1 }));
  c.fill(part, toPath([tail], { k: 1, mirror: true }));
  c.fill(part, toPath(cottonBinding(.71, .82), { k: 1 }));
}
