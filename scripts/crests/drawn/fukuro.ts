import type { Builder } from "../../construct/builder.ts";
import { circleThrough, disc, mirrored, reversedRun, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

const pairedBag = (c: Builder, placement: Placing): void => {
  const flapLeft: Region = [
    arc([-24, 47], [-63, 45], 62, [-42, -11]),
    arc([-63, 45], [-69, 49], 8, [-62, 47]),
    arc([-69, 49], [-48, 68], 58, [-29, 29]),
    arc([-48, 68], [-34, 69], 16, [-41, 56]),
    arc([-34, 69], [-22, 79], 15, [-21, 64]),
    arc([-22, 79], [-10, 77], 12, [-15, 69]),
    arc([-10, 77], [0, 84], 12, [-1, 74]),
  ];
  const flap = [...flapLeft, ...reflectedSide(flapLeft), arc([24, 47], [-24, 47], 150, [0, 194])];
  const pouchLeft: Region = [
    arc([-24, 42], [-43, 26], 48, [-5, -2]),
    arc([-43, 26], [-37, 13], 17, [-28, 28]),
    arc([-37, 13], [-19, 4], 41, [-14, 35]),
    arc([-19, 4], [0, 2], 49, [-6, 46]),
  ];
  const pouch = [...pouchLeft, ...reflectedSide(pouchLeft), arc([24, 42], [-24, 42], 136, [0, 174])];
  const mouthFold = seam([-26, 66], [-14, 50], 29, [-40, 42], 1.8);
  const innerPleat = seam([-9, 38], [-14, 19], 51, [34, 15], 1.9);
  const outerPleat = seam([-16, 39], [-27, 21], 52, [25, 4], 1.9);
  const binding = thickSeg([-25, 43.8], [25, 43.8], 5.6);
  const bindingWhite = thickSeg([-22, 43.8], [22, 43.8], 1.2);
  const sideLoop = seam([-27, 48], [-38, 31], 14, [-25, 34], 2.4);
  const cord = seam([-44, 48], [-61, 20], 63, [-13, 10], 2.2);
  const knot: Region = [
    arc([-62, 14], [-69, 10], 6.5, [-63, 8]),
    arc([-69, 10], [-70, 3], 6.5, [-65, 5]),
    arc([-70, 3], [-62, 5], 6.5, [-66, 8]),
    arc([-62, 5], [-62, 14], 7.2, [-67, 10]),
  ];
  const strings = [sideLoop, cord, knot, disc([-61, 17], 1.9)];

  c.group(() => {
    c.fill("bag", toPath([...strings, ...strings.map((part) => part.map(mirrored))], placement));
    c.fill("bag", toPath([flap, mouthFold, mouthFold.map(mirrored), thickSeg([0, 66], [0, 51], 1.8),
      disc([-27, 72], 2.25), disc([27, 72], 2.25)], placement), "evenodd");
    c.fill("bag", toPath([pouch, innerPleat, innerPleat.map(mirrored), outerPleat, outerPleat.map(mirrored),
      thickSeg([0, 37], [0, 19], 1.9)], placement), "evenodd");
    c.fill("bag", toPath([binding, bindingWhite], placement), "evenodd");
  });
};

export const hosowaNiFutatsuFukuroBuild = (c: Builder): void => {
  c.ring("ring-thin");
  pairedBag(c, { k: 1 });
  pairedBag(c, { k: 1, turn: 180 });
};
