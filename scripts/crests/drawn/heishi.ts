import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, circleThrough, disc, lineLine, mirrored, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";

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

/** The arc from `a` through `m` to `b`, its circle struck through the three. */
const arcVia = (a: V, m: V, b: V): Extract<Piece, { t: "A" }> => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const turn = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
  const centre = lineLine(mid(a, m), turn(mid(a, m), m), mid(m, b), turn(mid(m, b), b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) }, a, b, cross > 0) as Extract<Piece, { t: "A" }>;
};
const bandVia = (a: V, m: V, b: V, w: number): Region => {
  const arc = arcVia(a, m, b);
  return thickArc(arc.c, arc.r, w, arc.a0, arc.a1);
};

/**
 * 丸に瓶子 (frame 10, left r1c3): a broad flask in a ring drawn at the cell's width. In the book's pixels from the ring's centre,
 * the flask's upright 11.5 to its left: the ring from 125 to 147.5; the pouch 85 across its foot 117.5 down, 112 across at 27.5
 * down and 80 under its tie 40 up; the tie 12 deep; the cap of folded silk in three lobes up to 120 and 92 to either side; a cord
 * from each end of the tie hanging outside the pouch to a tassel 80 out.
 */
export const maruNiHeishiBuild = (c: Builder): void => {
  const [outer, inner, shift] = [147.5, 125, -11.5];
  const k = R / outer;
  c.guideCircle(C0, R);
  c.guideCircle(C0, inner * k);
  c.fill("frame", circle(C0, R).join(circle(C0, inner * k)), "evenodd");
  const pouch: Region = [seg([-42.5, -117.5], [42.5, -117.5]), arcVia([42.5, -117.5], [56, -27.5], [40, 40]), seg([40, 40], [-40, 40]), arcVia([-40, 40], [-56, -27.5], [-42.5, -117.5])];
  const tie: Region = [seg([-40, 42.5], [40, 42.5]), seg([40, 42.5], [40, 52]), seg([40, 52], [-40, 52]), seg([-40, 52], [-40, 42.5])];
  const lobes = [disc([-58, 72], 27), disc([58, 72], 27), disc([0, 90], 32), disc([-30, 100], 18), disc([30, 100], 18)];
  const below: Region = [seg([-120, 54.5], [120, 54.5]), seg([120, 54.5], [120, -200]), seg([120, -200], [-120, -200]), seg([-120, -200], [-120, 54.5])];
  const curls = [bandVia([-70, 60], [-76, 78], [-58, 89], 2.5), bandVia([70, 60], [76, 78], [58, 89], 2.5)];
  const folds = [thickSeg([0, 40], [0, -108], 2.5), bandVia([-16, 38], [-30, -40], [-24, -108], 2.5), bandVia([16, 38], [30, -40], [24, -108], 2.5)];
  const cords = [bandVia([-40, 47], [-70, 12], [-80, -66], 5), bandVia([40, 47], [70, 12], [80, -66], 5)];
  const tassels = [disc([-80, -76], 9), disc([-80, -94], 10.5), disc([80, -76], 9), disc([80, -94], 10.5)];
  const placing = { k, at: [shift * k, 0] as V };
  c.group(() => {
    c.fill("sake-flask", toPath(carve([pouch], folds), placing));
    c.fill("sake-flask", toPath([tie], placing));
    c.fill("sake-flask", toPath(carve(lobes, [below, ...curls]), placing));
    c.fill("sake-flask", toPath(carve([...cords, ...tassels], [pouch]), placing));
  });
};
