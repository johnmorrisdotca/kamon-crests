import type { Builder } from "../../construct/builder.ts";
import { circleThrough, mirrored, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arc = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);
const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

export const mitsuTabaneNoshiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const curveCrown: V = [0, 93];
  const broadShoulder: V = [91, 14];
  const broadHip: V = [78, -49];
  const outerTie: V = [11, -85];
  const innerTie: V = [11, -76];
  const innerHip: V = [68, -45];
  const innerShoulder: V = [76, 13];
  const crownFoot: V = [11, 66];
  const outside = [
    arc(curveCrown, broadShoulder, 92, [0, 1]),
    arc(broadShoulder, broadHip, 90, [2, -12]),
    arc(broadHip, outerTie, 86, [8, 1]),
    seg(outerTie, innerTie),
    arc(innerTie, innerHip, 75, [5, -2]),
    arc(innerHip, innerShoulder, 80, [-1, -8]),
    arc(innerShoulder, crownFoot, 71, [11, -5]),
    arc(crownFoot, curveCrown, 57, [61, 91]),
  ];

  const middle = [
    seg([37, 22], [67, 22]),
    arc([67, 22], [61, -46], 72, [0, -10]),
    arc([61, -46], [11, -73], 70, [8, -5]),
    seg([11, -73], [11, -63]),
    arc([11, -63], [50, -36], 59, [-6, -10]),
    arc([50, -36], [37, 22], 58, [-6, -17]),
  ];
  const inner = [
    arc([31, 5], [38, -32], 34, [6, -16]),
    arc([38, -32], [11, -59], 41, [6, -21]),
    seg([11, -59], [11, -48]),
    arc([11, -48], [30, -28], 33, [3, -15]),
    arc([30, -28], [24, -1], 30, [2, -17]),
    seg([24, -1], [31, 5]),
  ];
  const turnBack = polygon([[0, 22], [13, 35], [34, 28], [47, 17], [32, 13], [15, -1], [4, 6], [20, 20]]);
  const sideTail = polygon([[87, -9], [94, -5], [93, -29], [85, -37]]);
  const bottomTail = polygon([[10, -80], [37, -87], [47, -91], [30, -91], [12, -86]]);
  const right = [outside, middle, inner, turnBack, sideTail, bottomTail];
  const binding = [-9, -3, 3].map((x) => polygon([[x, -87], [x + 4, -87], [x + 4, -48], [x, -48]]));
  const placement = { k: 0.9 };

  c.fill("noshi", toPath(right, placement));
  c.fill("noshi", toPath(right.map((part) => part.map(mirrored)), placement));
  c.fill("noshi", toPath(binding, placement));
};
