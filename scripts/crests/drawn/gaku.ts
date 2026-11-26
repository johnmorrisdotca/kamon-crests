import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { arcTo, mirrored, onCircle, pieceEnd, pieceStart, reversedRun, rotated, seg, thickSeg, toPath, touch } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

const PLAQUE = "framed-plaque";

const rectangle = (x: number, y: number): Region => [
  seg([-x, y], [x, y]),
  seg([x, y], [x, -y]),
  seg([x, -y], [-x, -y]),
  seg([-x, -y], [-x, y]),
];

const halfTurn = (outline: Region): Region => outline.map((edge) => rotated(edge, Math.PI));

export function sonobeGakuBuild(c: Builder): void {
  // Tangent circles alternate between the crest of each roll and the shallow bay next to it.
  const topRadius = 12;
  const topStep = 16;
  const topHeight = 54;
  const crown: Circle = { c: [0, topHeight], r: topRadius };
  const corner: Circle = { c: [2 * topStep, topHeight], r: topRadius };
  const topBay: Circle = { c: [topStep, topHeight + Math.sqrt((2 * topRadius) ** 2 - topStep ** 2)], r: topRadius };
  const crownJoin = touch(crown, topBay);
  const cornerJoin = touch(corner, topBay);
  const halfTop = [
    arcTo(crown, [0, topHeight + topRadius], crownJoin, false),
    arcTo(topBay, crownJoin, cornerJoin, true),
    arcTo(corner, cornerJoin, [44, topHeight], false),
  ];
  const top = [...reversedRun(halfTop.map(mirrored)), ...halfTop];

  const sideRadius = 16;
  const sideStep = 15;
  const shoulder: Circle = { c: [31, 2 * sideStep], r: sideRadius };
  const sideMiddle: Circle = { c: [31, 0], r: sideRadius };
  const sideBay: Circle = { c: [31 + Math.sqrt((2 * sideRadius) ** 2 - sideStep ** 2), sideStep], r: sideRadius };
  const shoulderJoin = touch(shoulder, sideBay);
  const middleJoin = touch(sideMiddle, sideBay);
  const halfSide = [
    arcTo(shoulder, onCircle(shoulder.c, sideRadius, Math.PI / 4), shoulderJoin, false),
    arcTo(sideBay, shoulderJoin, middleJoin, true),
    arcTo(sideMiddle, middleJoin, [47, 0], false),
  ];
  const rightSide = [...halfSide, ...reversedRun(halfTurn(halfSide.map(mirrored)))];
  const topAndRight = [
    ...top,
    seg(pieceEnd(top[top.length - 1]), pieceStart(rightSide[0])),
    ...rightSide,
    seg(pieceEnd(rightSide[rightSide.length - 1]), [-pieceStart(top[0])[0], -pieceStart(top[0])[1]]),
  ];
  const outside = [...topAndRight, ...halfTurn(topAndRight)];
  const bevels = [1, -1].flatMap((x) => [1, -1].map((y) => {
    const from: V = [28 * x, 50 * y];
    const to: V = [39 * x, 60 * y];

    return thickSeg(from, to, WEIGHT.hair);
  }));

  c.ring("ring-medium");
  const placing = { k: 1, at: [0, -1] satisfies V };
  c.fill(PLAQUE, toPath([outside, rectangle(27, 49), ...bevels], placing), "evenodd");
  c.fill(PLAQUE, toPath([rectangle(22, 44), rectangle(16, 38)], placing), "evenodd");
}
