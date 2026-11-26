import type { Builder } from "../../construct/builder.ts";
import {
  carve, circleThrough, onPage, seg, shortArc, thickArc, thickSeg, toPath,
} from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const placing = { k: .545 };
const sourcePoint = ([x, y]: V): V => [x - 172, 185 - y];
type Arc = Extract<Piece, { t: "A" }>;

function drawnArc(from: V, to: V, radius: number, centreSide: V) {
  const a = sourcePoint(from);
  const b = sourcePoint(to);
  const circle = circleThrough(a, b, radius, sourcePoint(centreSide));
  return { circle, edge: shortArc(circle, a, b) as Arc };
}

const contour = [
  drawnArc([190, 25], [177, 119], 194, [0, 59]),
  drawnArc([177, 119], [259, 84], 145, [152, 15]),
  drawnArc([259, 84], [193, 150], 111, [152, 61]),
  drawnArc([193, 150], [244, 196], 105, [169, 247]),
  drawnArc([244, 196], [177, 195], 104, [207, 101]),
  drawnArc([175, 204], [133, 194], 64, [153, 136]),
  drawnArc([133, 194], [82, 206], 85, [103, 127]),
  drawnArc([82, 206], [96, 170], 89, [173, 209]),
  drawnArc([96, 170], [48, 148], 75, [49, 227]),
  drawnArc([48, 148], [93, 119], 90, [19, 73]),
  drawnArc([93, 119], [72, 62], 76, [133, 68]),
  drawnArc([72, 62], [127, 115], 84, [56, 142]),
  drawnArc([127, 115], [190, 25], 118, [242, 131]),
];
const edges: Region = [
  ...contour.slice(0, 5).map(({ edge }) => edge),
  seg(sourcePoint([177, 195]), sourcePoint([175, 204])),
  ...contour.slice(5).map(({ edge }) => edge),
];
const whiteArcs = [
  drawnArc([100, 188], [158, 183], 34, [128, 201]),
  drawnArc([142, 163], [173, 56], 184, [291, 150]),
  drawnArc([142, 163], [87, 87], 146, [-12, 148]),
  drawnArc([142, 163], [68, 150], 103, [108, 237]),
  drawnArc([142, 163], [220, 110], 152, [244, 247]),
  drawnArc([142, 163], [220, 187], 132, [146, 295]),
];
const veins = whiteArcs.map(({ circle, edge }) => {
  const a = Math.min(edge.a0, edge.a1);
  const b = Math.max(edge.a0, edge.a1);
  return thickArc(circle.c, circle.r, 2.8, a, b);
});

type StreamRun = [start: number, rightRadius: number, leftX: number, outletY: number, end: number];
const STREAM: StreamRun[] = [[15, 28, 50, 274, 320], [45, 20, 63, 265, 306], [73, 12, 78, 255, 285]];

function streamRun(c: Builder, [start, rightRadius, leftX, outletY, endX]: StreamRun): Region[] {
  const bendX = 285;
  const bendY = 182;
  const upperY = bendY - rightRadius;
  const middleY = bendY + rightRadius;
  const leftY = (middleY + outletY) / 2;
  const leftRadius = (outletY - middleY) / 2;
  const right = sourcePoint([bendX, bendY]);
  const left = sourcePoint([leftX, leftY]);
  const lines: [V, V][] = [
    [sourcePoint([start, upperY]), sourcePoint([bendX+.5, upperY])],
    [sourcePoint([leftX-.5, middleY]), sourcePoint([bendX+.5, middleY])],
    [sourcePoint([leftX-.5, outletY]), sourcePoint([endX, outletY])],
  ];
  for (const [p, q] of lines) c.guideLine(onPage(p, placing), onPage(q, placing));
  c.guideCircle(onPage(right, placing), rightRadius * placing.k);
  c.guideCircle(onPage(left, placing), leftRadius * placing.k);
  return [
    ...lines.map(([p, q]) => thickSeg(p, q, 5.5)),
    thickArc(right, rightRadius, 5.5, -Math.PI / 2, Math.PI / 2),
    thickArc(left, leftRadius, 5.5, Math.PI / 2, 3 * Math.PI / 2),
  ];
}

export function tatsutagawaBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const placedGuide = ({ c: centre, r }: Circle) => c.guideCircle(onPage(centre, placing), r * placing.k);
  for (const { circle } of [...contour, ...whiteArcs]) placedGuide(circle);
  // The small outline around the leaf keeps the stream's bends legible where they pass behind its lobes.
  const base = sourcePoint([140, 166]);
  const gap = edges.map((edge) => {
    const enlarge = ([x, y]: V): V => [base[0] + (x - base[0]) * 1.037, base[1] + (y - base[1]) * 1.037];
    return edge.t === "A" ? { ...edge, c: enlarge(edge.c), r: edge.r * 1.037 } : seg(enlarge(edge.a), enlarge(edge.b));
  });
  const water = STREAM.flatMap((run) => streamRun(c, run));
  c.fill("stream", toPath(carve(water, [gap]), placing), "evenodd");
  c.fill("maple", toPath(carve([edges], veins), placing), "evenodd");
}
