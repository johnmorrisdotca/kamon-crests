// Crests of arms and tools, ruled and struck: arrows, the arrow's nock, axes and sickles. Each is set out in its own frame, the
// centre at (0, 0), x to the right and y up, and scaled so that its farthest point stands on the layout circle. Their proportions
// were measured from the crest book of 1892 (伊呂波分新撰紋帳) and from public pictures of the crests; the drawing is this construction.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcTo, carve, circleCircle, circleThrough, disc, lineLine, moved, nearest, onCircle, onPage, rotated, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));
/** A region turned `deg` clockwise about the frame's centre, then moved by `by`. */
const put = (region: Region, deg: number, by: V = [0, 0]): Region => region.map((p) => moved(rotated(p, -deg * DEG), by));
const putAll = (regions: Region[], deg: number, by: V = [0, 0]): Region[] => regions.map((region) => put(region, deg, by));
/** Points round some outlines: every corner, and each arc every few degrees. */
const pointsOf = (regions: Region[]): V[] =>
  regions.flatMap((region) => region.flatMap((p) => (p.t === "L" ? [p.a] : Array.from({ length: 25 }, (_, i) => onCircle(p.c, p.r, p.a0 + ((p.a1 - p.a0) * i) / 24)))));
/**
 * Where a crest that is the same left and right stands in the layout circle: how far up the middle of the smallest circle about
 * a point of the upright line that holds it all is, and that circle's radius.
 */
const fit = (regions: Region[]): { up: number; reach: number } => {
  const points = pointsOf(regions);
  const reach = (up: number): number => Math.max(...points.map((p) => Math.hypot(p[0], p[1] - up)));
  let [lo, hi] = [-100, 100];
  for (let i = 0; i < 60; i += 1) {
    const [a, b] = [lo + (hi - lo) / 3, hi - (hi - lo) / 3];
    if (reach(a) < reach(b)) hi = b;
    else lo = a;
  }

  return { up: (lo + hi) / 2, reach: reach((lo + hi) / 2) };
};
/** The outlines (the ink, the white cut from it, the ink, and so on) moved so that the middle of the ink's circle is the centre, and the scale that brings that circle to `reach`. */
export const centred = (sets: Region[][], reach: number, keep = false): { sets: Region[][]; placing: Placing; up: number } => {
  const ink = sets.filter((_, i) => i % 2 === 0).flat();
  // `keep` leaves the frame's own centre where it is: a crossed pair in a ring crosses on the centre.
  const at = keep ? { up: 0, reach: Math.max(...pointsOf(ink).map((p) => Math.hypot(...p))) } : fit(ink);

  return { sets: sets.map((regions) => putAll(regions, 0, [0, -at.up])), placing: { k: reach / at.reach }, up: at.up };
};

/**
 * The fletched end of an arrow, upright, its shaft on the y axis and the nock at the top. Each vane is the space between four
 * ruled lines: the white beside the shaft, the outer edge leaning out towards the nock, and a top and a bottom that rise outwards at
 * one slope, so the top is a notch and the bottom a point. Bands of white lines cross each vane at the same slope.
 */
interface Fletch {
  /** Half the shaft's width, and the white between the shaft and a vane. */
  shaft: number;
  gap: number;
  /** The shaft's ends. */
  nock: number;
  foot: number;
  /** A vane's outer edge: its distance from the axis at y = 0, and how much farther out it stands for each unit up. */
  wide: number;
  lean: number;
  /** The rise of the vane's top, bottom and bands for each unit out, and where the top and the bottom lines cross the axis. */
  slope: number;
  top: number;
  bottom: number;
  /** The white lines across a vane: where each one's middle crosses the axis, and their width measured along the shaft. */
  bands: number[];
  band: number;
  /** White lines ruled level across the shaft (the bindings), and their width. */
  ties?: number[];
  /** The slit of the nock: its width and its depth. */
  slit?: [number, number];
}

/** One vane's outline, `grow` wider all round: `side` is 1 for the right vane and -1 for the left. */
const vane = (f: Fletch, side: number, grow = 0): Region => {
  const inner = f.shaft + f.gap - grow;
  const across = grow * Math.hypot(1, f.slope);
  const out = grow * Math.hypot(1, f.lean);
  const edge = (y: number): V => [f.wide + out + f.lean * y, y];
  const level = (cut: number, x: number): V => [x, cut + f.slope * x];
  const corner = (cut: number): V => lineLine(edge(0), edge(1), level(cut, 0), level(cut, 1));
  const points: V[] = [level(f.top + across, inner), corner(f.top + across), corner(f.bottom - across), level(f.bottom - across, inner)];

  return polygon(points.map(([x, y]): V => [side * x, y]));
};

const shaftOf = (f: Fletch, grow = 0): Region => polygon([[-f.shaft - grow, f.foot - grow], [f.shaft + grow, f.foot - grow], [f.shaft + grow, f.nock + grow], [-f.shaft - grow, f.nock + grow]]);

/** The ink of a fletched end and the white lines cut from it. */
const fletched = (f: Fletch): { black: Region[]; white: Region[] } => {
  const white: Region[] = [];
  for (const side of [1, -1]) for (const cut of f.bands) white.push(thickSeg([side * (f.shaft + f.gap / 2), cut + f.slope * (f.shaft + f.gap / 2)], [side * 2 * f.wide, cut + f.slope * 2 * f.wide], f.band / Math.hypot(1, f.slope)));
  for (const y of f.ties ?? []) white.push(thickSeg([-f.shaft - f.gap / 2, y], [f.shaft + f.gap / 2, y], f.band * 0.75));
  if (f.slit !== undefined) white.push(polygon([[-f.slit[0] / 2, f.nock - f.slit[1]], [f.slit[0] / 2, f.nock - f.slit[1]], [f.slit[0] / 2, f.nock + 2], [-f.slit[0] / 2, f.nock + 2]]));

  return { black: [vane(f, 1), vane(f, -1), shaftOf(f)], white };
};

/**
 * Two arrows side by side, 並び矢. Measured from a public picture of the crest in units of half the shaft's length: the shafts
 * stand 45.65 either side of the middle and are 7.7 wide, a white of 1.5 each side; a vane is 38.4 out at the middle of the shaft
 * and leans out 0.058 for each unit up; its top, its bottom and its bands rise two in three; three white lines 2 wide, 12 apart,
 * cross it near each end; two bindings are ruled across the shaft at the vanes' top and one at their foot, and the nock is slit.
 */
const SIDE_BY_SIDE: Fletch = { shaft: 3.85, gap: 1.5, nock: 100, foot: -100, wide: 38.4, lean: 0.058, slope: 2 / 3, top: 65.5, bottom: -89, bands: [-65, -53, -41, 13.5, 25.5, 37.5], band: 2, ties: [69, 73.6, -87], slit: [1.6, 5] };
const APART = 45.65;

export const narabiYaBuild = (c: Builder, part: string, reach: number): void => {
  const one = fletched(SIDE_BY_SIDE);
  const { sets, placing, up } = centred([-APART, APART].flatMap((x) => [putAll(one.black, 0, [x, 0]), putAll(one.white, 0, [x, 0])]), reach);
  c.guideCircle(C0, reach);
  for (const x of [-APART, APART]) c.guideLine(onPage([x, -100 - up], placing), onPage([x, 100 - up], placing));
  for (const i of [0, 2]) c.group(() => c.fill(part, toPath(carve(sets[i], sets[i + 1]), placing)));
};

/**
 * Two fletched ends crossed, 違い矢, as the ringed crest has them: each half a right angle from upright, the one whose nock is
 * at the upper right in front. Measured from a public picture of the ringed crest in units of the ring's outer radius: the shaft
 * 4.8 wide, reaching 71 to the nock and 78.5 to the foot, a white of 2.3 each side of it; a vane 27.3 out at the crossing, leaning
 * out 0.05 for each unit up; three white lines 2.7 wide, 7.7 apart, near each end; and a white of 2.3 where one passes under.
 */
const CROSSED: Fletch = { shaft: 2.4, gap: 2.3, nock: 71, foot: -78.5, wide: 27.3, lean: 0.05, slope: 2 / 3, top: 46.5, bottom: -75.7, bands: [-51.7, -43.9, -36.1, 7.8, 15.6, 23.4], band: 2.7 };
const PARTING = 2.3;

/** The two lines the shafts of a crossed pair lie on, `deg` each side of upright, through the point `up` above the centre. */
const crossLines = (c: Builder, placing: Placing, deg: number, up: number): void => {
  for (const side of [-1, 1]) c.guideLine(onPage([-side * 100 * Math.sin(deg * DEG), -100 * Math.cos(deg * DEG) + up], placing), onPage([side * 100 * Math.sin(deg * DEG), 100 * Math.cos(deg * DEG) + up], placing));
};

export const chigaiYaBuild = (c: Builder, part: string, reach: number): void => {
  const one = fletched(CROSSED);
  const over = [vane(CROSSED, 1, PARTING), vane(CROSSED, -1, PARTING), shaftOf(CROSSED, PARTING)];
  const { sets, placing, up } = centred([putAll(one.black, -45), [...putAll(one.white, -45), ...putAll(over, 45)], putAll(one.black, 45), putAll(one.white, 45)], reach, true);
  c.guideCircle(C0, reach);
  crossLines(c, placing, 45, -up);
  for (const i of [0, 2]) c.group(() => c.fill(part, toPath(carve(sets[i], sets[i + 1]), placing)));
};

/**
 * Two whole arrows crossed, 違い矢, as the crest book of 1892 has them (frame 29): each 50 degrees from upright and crossing well
 * below their middles, the fletched ends up; the arrow in front, its nock at the upper right, ends in a forked head, and the one
 * behind in a leaf-shaped head with a drop cut from it. In units of half the crest's width, from the crossing: the nock 98 up the
 * shaft and the head's foot 73 down it; the shaft 4 wide; a vane out to 29 from the shaft's middle, from 9 to 83 up the shaft, its ends rising 0.54 outwards;
 * two bands of three white lines across each vane.
 */
const WHOLE: Fletch = { shaft: 2, gap: 1.5, nock: 98, foot: -78, wide: 29, lean: 0, slope: 0.54, top: 81, bottom: 7, bands: [61, 56, 51, 34, 29, 24], band: 1.6 };
const LEAN = 50;
/** The forked head: the black between a circle of 16 and a circle of 15 struck 8 farther down the shaft, which meet in the two points. */
const fork = (): Region[] => carve([disc([0, -91], 16)], [disc([0, -99], 15)]);
/**
 * The leaf head: a circle of 17 on the shaft, and a point 25 beyond its centre, joined to it by the arcs of two circles of 12 that
 * touch the circle from outside. A drop is cut from it: a circle of 5 and the two lines from a point 10 beyond its centre that touch it.
 */
const leaf = (): { black: Region; white: Region } => {
  const body: Circle = { c: [0, -90], r: 17 };
  const tip: V = [0, -115];
  const side: Circle = { c: nearest(circleCircle(body.c, body.r + 12, tip, 12), [20, -116]), r: 12 };
  const other: Circle = { c: [-side.c[0], side.c[1]], r: 12 };
  const touch = (circle: Circle): V => [body.c[0] + ((circle.c[0] - body.c[0]) * body.r) / (body.r + 12), body.c[1] + ((circle.c[1] - body.c[1]) * body.r) / (body.r + 12)];
  const hole: Circle = { c: [0, -89], r: 5 };
  const point: V = [0, -99];
  const lift = Math.acos(hole.r / 10);
  const [right, left] = [onCircle(hole.c, hole.r, -Math.PI / 2 + lift), onCircle(hole.c, hole.r, -Math.PI / 2 - lift)];

  return {
    black: [arcTo(body, touch(other), touch(side), false), shortArc(side, touch(side), tip), shortArc(other, tip, touch(other))],
    white: [arcTo(hole, left, right, false), seg(right, point), seg(point, left)],
  };
};

const SWORD_ARROW: Fletch = {
  shaft: 2.65, gap: 1.25, nock: 147, foot: 16.8, wide: 27, lean: 0.13,
  slope: 0.33, top: 130, bottom: 33, bands: [51, 56, 61, 91, 96, 101], band: 1.6,
};

/** Three flared blades alternate with three feathered ends around the central disc, frame 29 left r1c3. */
export const mitsuKenYaBuild = (c: Builder, reach: number): void => {
  const one = fletched(SWORD_ARROW);
  const fletch = carve(one.black, one.white);
  const foot: V = [4.4, 15];
  const shoulder: V = [43, 132];
  const tip: V = [0, 149];
  const backFoot: V = [-foot[0], foot[1]];
  const backShoulder: V = [-shoulder[0], shoulder[1]];
  const blade = [
    shortArc(circleThrough(foot, shoulder, 157, [150, 45]), foot, shoulder),
    shortArc(circleThrough(shoulder, tip, 71, [42, 195]), shoulder, tip),
    shortArc(circleThrough(tip, backShoulder, 71, [-42, 195]), tip, backShoulder),
    shortArc(circleThrough(backShoulder, backFoot, 157, [-150, 45]), backShoulder, backFoot),
    seg(backFoot, foot),
  ];
  const layout = [...fletch, put(blade, 60), put(blade, 180), put(blade, 300), ...putAll(fletch, 120), ...putAll(fletch, 240)];
  const { placing } = centred([layout], reach, true);
  c.guideSpokes(6);
  for (const angle of [0, 120, 240]) {
    c.group(() => c.fill("arrow", toPath(putAll(fletch, angle), placing)));
    c.group(() => c.fill("sword", toPath([put(blade, angle + 60)], placing)));
  }
  c.fill("arrow", toPath([disc([0, 0], 13.4)], placing));
};

export const chigaiYaWholeBuild = (c: Builder, part: string, reach: number): void => {
  const one = fletched(WHOLE);
  const head = leaf();
  const over = [vane(WHOLE, 1, PARTING), vane(WHOLE, -1, PARTING), shaftOf(WHOLE, PARTING)];
  const { sets, placing, up } = centred(
    [putAll([...one.black, head.black], -LEAN), [...putAll([...one.white, head.white], -LEAN), ...putAll(over, LEAN)], putAll([...one.black, ...fork()], LEAN), putAll(one.white, LEAN)],
    reach,
  );
  c.guideCircle(C0, reach);
  crossLines(c, placing, LEAN, -up);
  for (const i of [0, 2]) c.group(() => c.fill(part, toPath(carve(sets[i], sets[i + 1]), placing)));
};

/**
 * The arrow's nock, 矢筈: the end of the arrow that takes the string, drawn as one broad vane with a notch in its top and a point
 * at its foot. Measured from a public picture of the ringed crest in units of the ring's outer radius: its sides 29.65 out at the
 * middle, leaning out 0.098 for each unit up; the notch's foot 52.9 up and the point 78.4 down, their lines rising 0.48 outwards.
 */
export const yahazuBuild = (c: Builder, part: string, reach: number, keep = false): void => {
  const [wide, lean, slope, top, bottom] = [29.65, 0.098, 0.48, 52.9, -78.4];
  const corner = (cut: number): V => lineLine([wide, 0], [wide + lean, 1], [0, cut], [1, cut + slope]);
  const right = [corner(top), corner(bottom)];
  const { sets, placing } = centred([[polygon([[0, top], right[0], right[1], [0, bottom], [-right[1][0], right[1][1]], [-right[0][0], right[0][1]]])]], reach, keep);
  c.guideCircle(C0, reach);
  c.guideLine(onPage([0, -100], placing), onPage([0, 100], placing));
  c.fill(part, toPath(sets[0], placing));
};
