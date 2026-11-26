import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, circleThrough, lineCircle, mirrored, nearest, onCircle, pieceEnd, pieceStart, reversedRun, rotated, seg, shortArc, thickArc, thickSeg, toPath, touch, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
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

function brushBar(left: V, right: V, r: number): Region {
  const d = vunit(vsub(right, left));
  const normal: V = [-d[1], d[0]];
  const upperLeft = vadd(left, vmul(normal, r));
  const lowerLeft = vadd(left, vmul(normal, -r));
  const upperRight = vadd(right, vmul(normal, r));
  const lowerRight = vadd(right, vmul(normal, -r));

  return [
    seg(upperLeft, upperRight), arcTo({ c: right, r }, upperRight, lowerRight, false),
    seg(lowerRight, lowerLeft), arcTo({ c: left, r }, lowerLeft, upperLeft, false),
  ];
}

export function gakuNiNihachiBuild(c: Builder): void {
  const topY = 79;
  const topNotch: Circle = { c: [30, 83], r: 7 };
  const sideNotch: Circle = { c: [63, 0], r: 14 };
  const corner: Circle = { c: [44, 69], r: 10 };
  const topIntersections = lineCircle([0, topY], [44, topY], topNotch.c, topNotch.r);
  const sideIntersections = lineCircle([54, 70], [54, -70], sideNotch.c, sideNotch.r);
  const topLeft = nearest(topIntersections, [24, 79]);
  const topRight = nearest(topIntersections, [36, 79]);
  const upperSide = nearest(sideIntersections, [54, 11]);
  const lowerSide = nearest(sideIntersections, [54, -11]);

  const halfTop: Region = [
    seg([0, topY], topLeft),
    arcTo(topNotch, topLeft, topRight, true),
    seg(topRight, [44, topY]),
  ];
  const upperAndRight: Region = [
    ...reversedRun(halfTop.map(mirrored)), ...halfTop,
    arcTo(corner, [44, topY], [54, 69], false),
    seg([54, 69], upperSide),
    arcTo(sideNotch, upperSide, lowerSide, true),
    seg(lowerSide, [54, -69]),
    arcTo({ c: [44, -69], r: 10 }, [54, -69], [44, -topY], false),
  ];
  const outside = [...upperAndRight, ...halfTurn(upperAndRight)];
  const bevels = [1, -1].flatMap((x) => [1, -1].map((y) =>
    thickSeg([33 * x, 61 * y], [47 * x, 74 * y], WEIGHT.hair)
  ));
  const topCurl = thickArc([7, 75], 4, 2, -Math.PI / 2, 3 * Math.PI / 4);
  const upperSideCurl = thickArc([52, 38], 4, 2, Math.PI / 2, 7 * Math.PI / 4);
  const lowerSideCurl = thickArc([52, 26], 4, 2, -7 * Math.PI / 4, -Math.PI / 2);
  const upperCuts = [topCurl, upperSideCurl, lowerSideCurl].flatMap((cut) => [cut, cut.map(mirrored)]);
  const curls = [...upperCuts, ...upperCuts.map(halfTurn)];

  c.fill(PLAQUE, toPath([...carve([outside], curls), rectangle(31, 59), ...bevels], { k: 1 }), "evenodd");

  c.fill(PLAQUE, toPath([rectangle(27, 55), rectangle(25, 53)], { k: 1 }), "evenodd");

  const leftTip: V = [-21, -39];
  const leftCap: Circle = { c: [-7, -24], r: 4 };
  const leftStart = onCircle(leftCap.c, leftCap.r, 3 * Math.PI / 4);
  const leftEnd = onCircle(leftCap.c, leftCap.r, -Math.PI / 8);
  const leftEight = [seg(leftTip, leftStart), arcTo(leftCap, leftStart, leftEnd, false), seg(leftEnd, leftTip)];

  const rightStart: V = [-3, -12];
  const rightShoulder: V = [7, -18];
  const rightTip: V = [25, -39];
  const rightHeel: V = [9, -39];
  const outsideEight = circleThrough(rightShoulder, rightTip, 25, [31, -16]);
  const insideEight = circleThrough(rightHeel, rightStart, 36, [-26, -37]);
  const rightEight = [
    seg(rightStart, rightShoulder), shortArc(outsideEight, rightShoulder, rightTip),
    seg(rightTip, rightHeel), shortArc(insideEight, rightHeel, rightStart),
  ];
  c.fill(PLAQUE, toPath([
    brushBar([-10, 36], [15, 38], 3),
    brushBar([-16, 14], [19, 16], 4),
    leftEight,
    rightEight,
  ], { k: 1 }));
}
