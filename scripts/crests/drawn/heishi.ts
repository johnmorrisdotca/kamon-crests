import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arc = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

const strip = (from: V, to: V, radius: number, hint: V, width: number): Region => {
  const edge = arc(from, to, radius, hint) as Extract<Piece, { t: "A" }>;

  return thickArc(edge.c, edge.r, width, edge.a0, edge.a1);
};

const bottle = (c: Builder, placing: Placing): void => {
  const left: V = [-25, -73];
  const right: V = [25, -73];
  const a: V = [-39, 15];
  const b: V = [39, 15];
  const neck: V = [18, 53];
  const otherNeck: V = [-18, 53];
  const pouch = [
    seg(left, right), arc(right, b, 143, [-84, -3]), arc(b, neck, 72, [-30, -7]),
    seg(neck, otherNeck), arc(otherNeck, a, 72, [30, -7]), arc(a, left, 143, [84, -3]),
  ];
  const returnMark = strip([5, 49], [16, -13], 94, [68, 39], 2.25);
  const marks = [returnMark, returnMark.map(mirrored), thickSeg([0, 50], [0, -46], 1.65)];
  const silk = [
    disc([-31, 59], 12), disc([31, 59], 12), disc([-17, 68], 12), disc([17, 68], 12),
    disc([0, 76], 13), thickSeg([-37, 53], [37, 53], 9),
  ];
  const rib = strip([32, 59], [6, 63], 53, [19, 105], 1.9);
  const cap = carve(silk, [rib, rib.map(mirrored), thickSeg([0, 55], [0, 81], 2)]);
  const cord = strip([23, 51], [48, -42], 104, [-50, 2], 3.9);
  const tassels = [disc([48, -43], 4.7), disc([48, -53], 6.8), thickSeg([48, -55], [48, -63], 5.2)];
  const cords = [cord, cord.map(mirrored), ...tassels, ...tassels.map((part) => part.map(mirrored))];
  c.group(() => {
    c.fill("sake-flask", toPath(carve([pouch], marks), placing), "evenodd");
    c.fill("sake-flask", toPath(cap, placing), "evenodd");
    c.fill("sake-flask", toPath(carve(cords, [pouch]), placing), "evenodd");
  });
};

export const futatsuHeishiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  bottle(c, { k: 0.77, at: [-43, 0] });
  bottle(c, { k: 0.77, at: [43, 0] });
};

/** Two flasks stand within the printed cut-corner square. */
export const sumikiriKakuNiFutatsuHeishiBuild = (c: Builder): void => {
  c.precision(3);
  const flat = 30;
  const half = Math.sqrt(R * R - flat * flat);
  const points: V[] = [[-flat, half], [flat, half], [half, flat], [half, -flat], [flat, -half], [-flat, -half], [-half, -flat], [-half, flat]];
  const outline = points.map((point, index) => seg(point, points[(index + 1) % points.length]));
  c.guideCircle(C0, R);
  const outer = toPath([outline], { k: 1 });
  const opening = toPath([outline], { k: .715 });
  c.fill("cut-corner-square", outer.join(opening), "evenodd");
  bottle(c, { k: .54, at: [-25.5, -1] });
  bottle(c, { k: .54, at: [25.5, -1] });
};
