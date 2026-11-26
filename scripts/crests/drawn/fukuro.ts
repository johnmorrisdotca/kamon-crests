import type { Builder } from "../../construct/builder.ts";
import { circleThrough, mirrored, reversedRun, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arc = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);

const seam = (a: V, b: V, radius: number, hint: V, weight: number): Region => {
  const edge = arc(a, b, radius, hint) as Extract<Piece, { t: "A" }>;
  return thickArc(edge.c, edge.r, weight, edge.a0, edge.a1);
};

const reflectedSide = (side: Region): Region => reversedRun(side.map(mirrored));

const bag = (c: Builder, placement: Placing): void => {
  const crownLeft: Region = [
    arc([-64, 9], [-84, 22], 23, [-58, 33]), arc([-84, 22], [-76, 47], 38, [-42, 20]),
    arc([-76, 47], [-62, 64], 26, [-47, 40]), arc([-62, 64], [-42, 75], 24, [-48, 52]),
    arc([-42, 75], [-20, 82], 22, [-28, 59]), arc([-20, 82], [0, 85], 24, [0, 64]),
  ];
  const crown = [...crownLeft, ...reflectedSide(crownLeft), arc([64, 9], [-64, 9], 460, [0, 470])];
  const bodyLeft: Region = [
    arc([-61, 4], [-83, -25], 57, [-38, -37]), arc([-83, -25], [-79, -49], 32, [-56, -29]),
    arc([-79, -49], [-57, -60], 24, [-61, -37]), arc([-57, -60], [-43, -53], 21, [-57, -41]),
    arc([-43, -53], [-28, -76], 39, [-10, -45]), arc([-28, -76], [0, -85], 46, [-3, -48]),
  ];
  const body = [...bodyLeft, ...reflectedSide(bodyLeft), arc([61, 4], [-61, 4], 442, [0, 452])];
  const crownFold = seam([-32, 57], [-18, 15], 77, [-71, 18], 2.5);
  const bodyFold = seam([-22, -3], [-27, -42], 67, [-83, -17], 2.2);
  const crownCuts = [crownFold, crownFold.map(mirrored), thickSeg([0, 70], [0, 16], 2.2)];
  const bodyCuts = [bodyFold, bodyFold.map(mirrored), thickSeg([0, -5], [0, -54], 2)];
  const leftLoop = seam([-65, 16], [-74, -20], 22, [-61, -2], 5.5);
  c.fill("bag", toPath([leftLoop, leftLoop.map(mirrored)], placement));
  c.fill("bag", toPath([crown, ...crownCuts], placement), "evenodd");
  c.fill("bag", toPath([body, ...bodyCuts], placement), "evenodd");
  const band = seam([-67, 8], [67, 8], 428, [0, 440], 6.2);
  const bandOpening = seam([-62, 7.25], [62, 7.25], 428, [0, 440], 1.4);
  c.fill("bag", toPath([band, bandOpening], placement), "evenodd");
};

export const fukuroBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  bag(c, { k: 1 });
};
