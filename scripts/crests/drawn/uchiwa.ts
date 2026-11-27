import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { carve, carveWhere, circleThrough, DEG, disc, inside, mirrored, rotated, seg, shortArc, thickArc, toPath, arcA, circleCircle, moved, onCircle, thickSeg, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Region, V, Circle, Piece } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

/** The handle is ruled between two parallel sides and cut square at the butt. */
const handle = (width: number, butt: number, top: number): Region => [
  seg([-width, butt], [width, butt]),
  seg([width, butt], [width, top]),
  seg([width, top], [-width, top]),
  seg([-width, top], [-width, butt]),
];

export const mitsuUchiwaBuild = (c: Builder): void => {
  const centre: V = [0, 53];
  const pivot: V = [0, 3];
  const paper = disc(centre, 42);
  const margin = disc(centre, 40);
  const bound = disc(pivot, 41);
  const binding = disc(pivot, 39.4);
  const directions = Array.from({ length: 11 }, (_, i) => (i - 5) * 9);
  const ray = (angle: number): V => [pivot[0] + 44 * Math.sin(angle * DEG), pivot[1] + 44 * Math.cos(angle * DEG)];
  const ribs = directions.flatMap((angle) => [seg(pivot, ray(angle - 1.15)), seg(pivot, ray(angle + 1.15))]);
  const white = (point: V): boolean => {
    if (!inside(margin, point) || !inside(bound, point)) return false;
    const angle = Math.atan2(point[0] - pivot[0], point[1] - pivot[1]) / DEG;

    return !inside(binding, point) || directions.some((rib) => Math.abs(angle - rib) < 1.15);
  };

  const stem = handle(5, -93, 24);
  const underNext = handle(5 + WEIGHT.hair, -93 - WEIGHT.hair, 24).map((edge) => rotated(edge, -120 * DEG));
  const regions = carveWhere(
    [...paper, ...margin, ...bound, ...binding, ...ribs, ...stem, ...underNext],
    (point) => ((inside(paper, point) && !white(point)) || inside(stem, point)) && !inside(underNext, point),
  );
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) c.fill("round-fan", toPath(regions, { k: 1, turn }));
};

const bow = (from: V, to: V, radius: number, centreSide: V): Region[number] =>
  shortArc(circleThrough(from, to, radius, centreSide), from, to);

/** One scroll-edged half of the fan, seam at the left. */
interface FanProfile {
  width: number;
  crown: number;
  foot: number;
  ribs: number;
  ribSpacing: number;
}

const chineseFanHalf = (profile: FanProfile): Region[] => {
  const { width, ribs: ribCount, ribSpacing } = profile;
  const at = (x: number, y: number): V => [x * width, y];
  const crown = at(37, profile.crown);
  const shoulder = at(70, 40);
  const waist = at(55, -10);
  const heel = at(60, -53);
  const toe = at(33, profile.foot);
  const seamTop: V = [9, 49];
  const seamBottom: V = [9, -69];
  const face: Region = [
    bow(seamTop, crown, 35, at(16, 30)),
    bow(crown, shoulder, 29, at(40, 37)),
    bow(shoulder, waist, 85, at(-15, 25)),
    bow(waist, heel, 85, at(134, -29)),
    bow(heel, toe, 28, at(33, -54)),
    bow(toe, seamBottom, 24, at(33, -59)),
    seg(seamBottom, seamTop),
  ];
  const upperCurl = thickArc(at(23, 46), Math.round(12 * width), WEIGHT.thread, 29 * DEG, -243 * DEG);
  const lowerCurl = thickArc(at(22, -57), Math.round(8 * width), WEIGHT.thread, 190 * DEG, -75 * DEG);
  const ribs = Array.from({ length: ribCount }, (_, i) =>
    thickArc(at(56, -41 - i * ribSpacing), 72, WEIGHT.hair, Math.acos((-47 * width) / 72), 94 * DEG)
  );

  return carve([face], [upperCurl, lowerCurl, ...ribs]);
};

export const hitotsuKaraUchiwaBuild = (c: Builder): void => {
  const right = chineseFanHalf({ width: 1, crown: 66, foot: -83, ribs: 9, ribSpacing: 9 });
  const left = right.map((region) => region.map(mirrored));
  const vertex: V = [0, 91];
  const rightPoint: V = [23, 80];
  const leftPoint: V = [-23, 80];
  const stem: Region = [
    seg([-6, -93], [6, -93]),
    seg([6, -93], [6, 57]),
    bow([6, 57], rightPoint, 24, [30, 61]),
    bow(rightPoint, vertex, 26, [15, 103]),
    bow(vertex, leftPoint, 26, [-15, 103]),
    bow(leftPoint, [-6, 57], 24, [-30, 61]),
    seg([-6, 57], [-6, -93]),
  ];
  c.guideCircle(C0, R);
  c.fill("kara-uchiwa", toPath([stem, ...right, ...left], { k: 1 }), "evenodd");
};

export const hosowaNiNihonUchiwaBuild = (c: Builder): void => {
  c.ring("ring-thin");
  const right = chineseFanHalf({ width: 0.72, crown: 73, foot: -86, ribs: 4, ribSpacing: 22 });
  const left = right.map((region) => region.map(mirrored));
  const stem: Region = [seg([-6, -92], [6, -92]), seg([6, -92], [6, 92]), seg([6, 92], [-6, 92]), seg([-6, 92], [-6, -92])];
  for (const x of [-41, 41]) c.fill("kara-uchiwa", toPath([stem, ...right, ...left], { k: 0.68, at: [x, 0] }), "evenodd");
};

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

const paperTab = polygon([[-9, -65], [9, -65], [14, -87], [-14, -87]]);

const fanHub = [disc([0, -57], 17), disc([20, -65], 12), disc([-20, -65], 12)];

const hubClearance = [disc([0, -57], 19), disc([20, -65], 14), disc([-20, -65], 14)];

const scroll = thickArc([16, -69], 6, WEIGHT.hair, 160 * DEG, -115 * DEG);

const hubInk = (): Region[] => carve([...fanHub, paperTab], [scroll, scroll.map(mirrored)]);

interface Feather {
  root: V;
  tip: V;
  radius: number;
}

const FEATHERS: Feather[] = [
  { root: [0, -40], tip: [0, 92], radius: 97 },
  { root: [9, -43], tip: [40, 83], radius: 132 },
  { root: [17, -47], tip: [70, 64], radius: 142 },
  { root: [24, -53], tip: [85, 22], radius: 135 },
  { root: [29, -60], tip: [90, -22], radius: 98 },
  { root: [31, -68], tip: [79, -54], radius: 61 },
];

/** Where two compass circles overlap, the two arcs between their crossings make a pointed feather. */
const lens = (left: Circle, right: Circle): Region => {
  const [a, b] = circleCircle(left.c, left.r, right.c, right.r);

  return [shortArc(left, a, b), shortArc(right, b, a)];
};

interface FanBlade {
  region: Region;
  margin: Region;
  gaps: Region[];
}

const feather = ({ root, tip, radius }: Feather): FanBlade => {
  const axis = vunit(vsub(tip, root));
  const [dx, dy] = axis;
  const left = circleThrough(root, tip, radius, vadd(root, [-dy, dx]));
  const right = circleThrough(root, tip, radius, vadd(root, [dy, -dx]));
  const gap = WEIGHT.hair;

  return {
    region: lens(left, right),
    margin: lens({ ...left, r: radius + gap }, { ...right, r: radius + gap }),
    gaps: [thickSeg(vadd(root, vmul(axis, 6)), vadd(tip, vmul(axis, -12)), gap)],
  };
};

const layBlades = (c: Builder, [centre, ...sides]: FanBlade[]): void => {
  const right = sides.flatMap((blade, i) => {
    const over = [centre.margin, ...sides.slice(0, i).map((part) => part.margin), ...hubClearance];

    return carve([blade.region], [...blade.gaps, ...over]);
  });
  const left = right.map((region) => region.map(mirrored));
  c.guideCircle(C0, R);
  c.fill("round-fan", toPath(carve([centre.region], [...centre.gaps, ...hubClearance]), { k: 1 }));
  c.fill("round-fan", toPath(right, { k: 1 }));
  c.fill("round-fan", toPath(left, { k: 1 }));
  c.fill("round-fan", toPath(hubInk(), { k: 1 }));
};

export const haUchiwaBuild = (c: Builder): void => layBlades(c, FEATHERS.map(feather));

interface PalmBlade {
  root: V;
  tip: V;
  radius: number;
}

const PALM_BLADES: PalmBlade[] = [
  { root: [0, -44], tip: [0, 90], radius: 16 },
  { root: [9, -46], tip: [39, 85], radius: 16 },
  { root: [18, -50], tip: [68, 62], radius: 17 },
  { root: [24, -56], tip: [85, 29], radius: 16 },
  { root: [29, -63], tip: [88, -10], radius: 15 },
  { root: [31, -67], tip: [77, -43], radius: 12 },
];

const pleatedBlade = ({ root, tip, radius }: PalmBlade): FanBlade => {
  const difference = vsub(tip, root);
  const length = Math.hypot(...difference);
  const turn = Math.atan2(difference[1], difference[0]) - Math.PI / 2;
  const place = (region: Region): Region => region.map((edge) => moved(rotated(edge, turn), root));
  const baseWidth = 4;
  const cap = length - radius;
  const outline = (gap: number): Region => [
    seg([-baseWidth - gap, 0], [-radius - gap, cap]),
    arcA([0, cap], radius + gap, Math.PI, 0),
    seg([radius + gap, cap], [baseWidth + gap, 0]),
    seg([baseWidth + gap, 0], [-baseWidth - gap, 0]),
  ];
  const vein = thickSeg([0, 5], [0, length - 2], WEIGHT.hair);
  const folds = [0.32, 0.56, 0.79].flatMap((t) => {
    const height = length * t;

    return [thickSeg([0, height], [-radius, height + 8], WEIGHT.hair), thickSeg([0, height], [radius, height + 8], WEIGHT.hair)];
  });

  return { region: place(outline(0)), margin: place(outline(WEIGHT.hair)), gaps: [vein, ...folds].map(place) };
};

export const shuroUchiwaBuild = (c: Builder): void => layBlades(c, PALM_BLADES.map(pleatedBlade));

export const mitsuKenKaraUchiwaBuild = (c: Builder): void => {
  const right = chineseFanHalf({ width: 0.88, crown: 64, foot: -78, ribs: 6, ribSpacing: 12 });
  const left = right.map((loop) => loop.map(mirrored));
  const stem = polygon([[-5, -72], [5, -72], [5, 70], [-5, 70]]);
  const sword = polygon([[-3, 15], [3, 15], [10, 67], [17, 83], [0, 92], [-17, 83], [-10, 67]]);
  c.guideCircle(C0, R);
  c.fill("round-fan", toPath([disc([0, 0], 11)], { k: 1 }));
  for (const turn of [0, 120, 240]) {
    const at: V = [50 * Math.sin(turn * DEG), 50 * Math.cos(turn * DEG)];
    c.fill("round-fan", toPath([stem, ...right, ...left], { turn, at, k: 0.55 }), "evenodd");
  }
  for (const turn of [60, 180, 300]) c.fill("sword", toPath([sword], { turn, k: 1 }));
};

export const mitsuKaraUchiwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);
  const right = chineseFanHalf({ width: 1.02, crown: 72, foot: -76, ribs: 4, ribSpacing: 15 });
  const left = right.map((part) => part.map(mirrored));
  const stem = handle(2.8, 3, 94);
  for (const turn of [0, 120, 240]) {
    const at: V = [49 * Math.sin(turn * DEG), 49 * Math.cos(turn * DEG)];
    c.fill("kara-uchiwa", toPath([...right, ...left], { k: 0.60, turn, at }), "evenodd");
    c.fill("kara-uchiwa", toPath([stem], { k: 1, turn }));
  }
  c.fill("kara-uchiwa", toPath([disc([0, 0], 10), disc([0, 0], 3.7)], { k: 1 }), "evenodd");
};

const playCord = (from: V, to: V, radius: number, bend: V): Region[] => {
  const line = shortArc(circleThrough(from, to, radius, bend), from, to) as Extract<Piece, { t: "A" }>;

  return [
    thickArc(line.c, line.r, 5.3, line.a0, line.a1),
    thickArc(line.c, line.r, 1.65, line.a0, line.a1),
  ];
};

const playTassel = (): Region[] => {
  const head = [
    shortArc(circleThrough([-3.8, 2], [0, 10], 9, [3, 2]), [-3.8, 2], [0, 10]),
    shortArc(circleThrough([0, 10], [7, 3], 9, [-1, 2]), [0, 10], [7, 3]),
    shortArc(circleThrough([7, 3], [4.5, -4], 13, [-5, 0]), [7, 3], [4.5, -4]),
    seg([4.5, -4], [-4.5, -4]),
    shortArc(circleThrough([-4.5, -4], [-3.8, 2], 9, [3, -2]), [-4.5, -4], [-3.8, 2]),
  ];

  return [head, thickSeg([-1.5, 3.5], [-2.5, -1.4], 1.25), thickSeg([2.6, 4.5], [1.6, -1.5], 1.25)];
};

export const teasobiUchiwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const k = 0.96;
  const cords: [V, V, number, V][] = [
    [[-68, 23], [-61, -30], 48, [-25, 0]],
    [[-61, -30], [-25, -47], 44, [-28, -1]],
    [[-25, -47], [-7, -35], 26, [-18, -23]],
    [[-55, 6], [-43, -45], 62, [4, -11]],
    [[-43, -45], [-21, -70], 35, [-9, -45]],
    [[56, 11], [70, -18], 40, [29, -18]],
    [[70, -18], [41, -37], 38, [35, 5]],
    [[41, -37], [18, -29], 45, [36, 10]],
    [[58, -22], [49, -54], 61, [-1, -25]],
    [[49, -54], [36, -73], 41, [8, -48]],
  ];
  for (const [from, to, radius, bend] of cords) {
    c.fill("round-fan", toPath(playCord(from, to, radius, bend), { k }), "evenodd");
  }

  const leftKnot: V = [-68, 27];
  const rightKnot: V = [36, -73];
  c.fill("round-fan", toPath([disc(leftKnot, 5.4), disc(leftKnot, 2.2)], { k }), "evenodd");
  c.fill("round-fan", toPath([disc(rightKnot, 5.4), disc(rightKnot, 2.25)], { k }), "evenodd");
  c.fill("round-fan", toPath(playTassel(), { k, at: [-69, 32], turn: -10 }), "evenodd");
  c.fill("round-fan", toPath(playTassel(), { k, at: [32, -80], turn: 154 }), "evenodd");

  const grip: Region = [
    seg([-7, -31], [7, -31]),
    shortArc(circleThrough([7, -31], [13, -62], 54, [57, -40]), [7, -31], [13, -62]),
    shortArc(circleThrough([13, -62], [25, -69], 22, [11, -84]), [13, -62], [25, -69]),
    shortArc(circleThrough([25, -69], [16, -82], 10, [17, -72]), [25, -69], [16, -82]),
    shortArc(circleThrough([16, -82], [0, -94], 16, [1, -79]), [16, -82], [0, -94]),
    shortArc(circleThrough([0, -94], [-16, -82], 16, [-1, -79]), [0, -94], [-16, -82]),
    shortArc(circleThrough([-16, -82], [-25, -69], 10, [-17, -72]), [-16, -82], [-25, -69]),
    shortArc(circleThrough([-25, -69], [-13, -62], 22, [-11, -84]), [-25, -69], [-13, -62]),
    shortArc(circleThrough([-13, -62], [-7, -31], 54, [-57, -40]), [-13, -62], [-7, -31]),
  ];
  c.fill("round-fan", toPath([grip, disc([0, -43], 2.7)], { k }), "evenodd");
  const pivot: V = [0, -33];
  const folds = [34, 45, 56, 67, 78, 90, 102, 113, 124, 135, 146].map((a) =>
    thickSeg(onCircle(pivot, 3.5, a * DEG), onCircle(pivot, 41.9, a * DEG), 1.6),
  );
  const shell = thickArc(pivot, 43.2, 1.9, 31 * DEG, 149 * DEG);
  c.fill("round-fan", toPath([disc([0, 26], 63.5), shell, ...folds], { k }), "evenodd");
};
