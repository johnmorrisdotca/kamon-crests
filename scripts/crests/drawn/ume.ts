// Plum forms measured from labelled cells in the 1892 crest book, in a plane with its y axis up.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, circleThrough, disc, inside, mirrored, reversed, shortArc, onPage, rotated, seg, thickArc, thickSeg, toPath, touch, vdist } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

const CENTRE: V = [0, 0];
const PETAL_ANGLES = [0, 72, 144, 216, 288];
const s = Math.sin(36 * DEG);
const t = Math.cos(36 * DEG);

/** A rounded front petal sits between two ruled seams. A little paper opens above its circular heart. */
const frontPetal = (gap: number): Region[] => {
  const crown: V = [0, 57];
  const offset = (1.25 - gap) / s;
  const edge = (x: number): V => [x, offset + Math.abs(x) * t / s];
  return carveWhere([
    ...disc(crown, 43 + gap), ...disc(CENTRE, 16), seg([0, offset], edge(90)), seg([0, offset], edge(-90)),
  ], ([x, y]) => y * s - Math.abs(x) * t > 1.25 - gap && vdist(crown, [x, y]) < 43 + gap && vdist(CENTRE, [x, y]) > 16);
};

export const yaeUmeBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const placing = { k: reach / 100 };
  const front = longLast(carve(frontPetal(0), [thickSeg(CENTRE, [0, 43], 4)]));
  const clearance = frontPetal(2);
  const neighbours = [-36, 36].flatMap((degrees) => clearance.map((loop) => loop.map((piece) => rotated(piece, degrees * DEG))));
  const rear = longLast(carve([disc([0, 59], 37)], neighbours));

  c.guideCircle(C0, reach);
  c.guideSpokes(10, 0, reach);
  c.guideCircle(C0, 16 * placing.k);
  for (const turn of PETAL_ANGLES) c.guideCircle(onPage([0, 59], { ...placing, turn: turn + 36 }), 37 * placing.k);
  for (const turn of PETAL_ANGLES) c.guideCircle(onPage([0, 57], { ...placing, turn }), 43 * placing.k);
  for (const turn of PETAL_ANGLES) c.fill("plum", toPath(rear, { ...placing, turn: turn + 36 }));
  for (const turn of PETAL_ANGLES) c.fill("plum", toPath(front, { ...placing, turn }));
  c.fill("plum", toPath([disc(CENTRE, 13.5)], placing));
};

/** The calyx and its hooked stalk are visible between five separate petals. */
export const utenaPlumBuild = (c: Builder, reach: number): void => {
  const placing = { k: reach / 100 };
  const oval = (tip: number): Region[] => {
    const top = { c: [0, tip - 26] as V, r: 26 };
    const bottom = { c: [0, 50] as V, r: 26 };
    const mid = (top.c[1] + bottom.c[1]) / 2;
    const side = { c: [-Math.sqrt(28 ** 2 - (top.c[1] - mid) ** 2), mid] as V, r: 54 };
    const upper = touch(side, top);
    const lower = touch(side, bottom);
    const right = shortArc(side, upper, lower);
    const petal = [shortArc(top, [-upper[0], upper[1]], upper), right, shortArc(bottom, lower, [-lower[0], lower[1]]), reversed(mirrored(right))];

    return carve([petal], [disc(CENTRE, 31)]);
  };
  const points: V[] = [[0, 37], [11, 15], [36, 10], [19, -5], [24, -25], [2, -16], [-19, -28], [-17, -6], [-37, 6], [-15, 13]];
  const calyx = points.map((point, i) => seg(point, points[(i + 1) % points.length]));
  const stalk = thickArc([26, 0], 26, 7, 180 * DEG, 242 * DEG);
  const full = oval(100);
  const lower = oval(92);

  c.guideCircle(C0, reach);
  for (const turn of PETAL_ANGLES) c.fill("plum", toPath(turn === 144 || turn === 216 ? lower : full, { ...placing, turn }));
  c.fill("plum", toPath(carve([calyx, stalk], []), placing));
};

/** The peeping bowl rises from behind the lower rim. Its cropped discs follow one strike of the inside circle. */
export const nozokiPlumBuild = (c: Builder, inner: number): void => {
  const placing = { k: inner / 100 };
  const ground = disc(CENTRE, 98);
  const heads: Region[] = [disc([-65, -64], 37), disc([0, -38], 31), disc([65, -64], 37)];
  const heart = disc([0, -108], 21);
  const rays: Region[] = [[-33, -96], [-20, -79], [-8, -75], [8, -75], [20, -79], [33, -96]].map(([x, y]) => thickSeg([x * 0.55, -102], [x, y], 4));
  const clipped = (shape: Region): Region[] => carveWhere([...shape, ...ground], (p) => vdist(CENTRE,p) < 98 && inside(shape,p));

  c.guideCircle(C0, inner * 0.98);
  for (const set of [heads, rays, [heart]]) c.fill("plum", toPath(set.flatMap(clipped), placing));
};

/** Twenty equally spaced curved stamens turn in the same direction as the seams. */
export const nejiPlumBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const placing = { k: reach / 100 };
  const at = (radius: number, angle: number): V => [radius * Math.sin(angle * DEG), radius * Math.cos(angle * DEG)];
  const curved = (a: V, b: V, span: number, width: number): Region => {
    const circle = circleThrough(a, b, span, [58, 7]);
    const arc = shortArc(circle, a, b);
    return arc.t === "A" ? thickArc(circle.c, circle.r, width, arc.a0, arc.a1) : thickSeg(a, b, width);
  };
  const divide = curved([0, 10], at(87, -36), 86, 2.8);
  const tip = at(54, 21);
  const foot = at(12, 40);
  const stamen = [curved(foot, tip, 46, 2.1), disc(tip, 2.45)];
  const turn = (loops: Region[], angle: number): Region[] => loops.map((loop) => loop.map((piece) => rotated(piece, -angle * DEG)));
  const leaves = [disc(CENTRE, 32), ...PETAL_ANGLES.map((angle) => disc(at(60, angle), 40))];
  const seams = PETAL_ANGLES.flatMap((angle) => turn([divide], angle));
  const threads = Array.from({ length: 20 }, (_, i) => turn(stamen, i * 18)).flat();
  const paper = [...seams, ...threads];
  const image = longLast(carve(leaves, [...paper, disc(CENTRE, 14)]));

  c.guideCircle(C0, reach);
  c.guideCircle(C0, 14 * placing.k);
  c.fill("plum", toPath(image, placing));
  c.fill("plum", toPath([disc(CENTRE, 11.5)], placing));
};

/** A front-facing corolla with dotted stamens in one circle, above a second row of petals. */
export const yaeMukoUmeBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const placing = { k: reach / 100 };
  const at = (r: number, a: number): V => [r * Math.sin(a * DEG), r * Math.cos(a * DEG)];
  const crowns = PETAL_ANGLES.map((angle) => disc(at(60, angle), 40));
  const rear = PETAL_ANGLES.map((angle) => disc(at(57, angle + 36), 38));
  const clearance = PETAL_ANGLES.map((angle) => disc(at(60, angle), 42));
  const rays = Array.from({ length: 30 }, (_, i) => {
    const angle = i * 12;
    const cap = at(54, angle);
    return [thickSeg(at(11, angle), cap, 1.9), disc(cap, 2.1)];
  }).flat();
  const fore = longLast(carve([...crowns, disc(CENTRE, 28)], [disc(CENTRE, 14), ...rays]));
  const behind = longLast(carve(rear, [...clearance, disc(CENTRE, 61)]));

  c.guideCircle(C0, reach);
  for (const radius of [54, 28, 14, 11.5]) c.guideCircle(C0, radius * placing.k);
  for (const angle of PETAL_ANGLES) {
    c.guideCircle(onPage(at(60, angle), placing), 40 * placing.k);
    c.guideCircle(onPage(at(57, angle + 36), placing), 38 * placing.k);
  }
  c.fill("plum", toPath(behind, placing));
  c.fill("plum", toPath(fore, placing));
  c.fill("plum", toPath([disc(CENTRE, 11.5)], placing));
};

const cluster = (c: Builder, reach: number, flower: Region[], upright: boolean): void => {
  const k = reach / 100;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, k * 55);
  for (let i = 0; i < 3; i += 1) {
    const phi = i * 120;
    const at: V = [k * 55 * Math.sin(phi * DEG), k * 55 * Math.cos(phi * DEG)];
    c.fill("plum", toPath(flower, { k: reach * (upright ? 0.007 : 0.0062), at, turn: upright ? 0 : phi }));
  }
};

/** A small plum has three upper lobes, two petals below, and straight stamens opening out from their meeting point. */
export const mitsumoriUmeBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const lobes = [disc([0,40],28), disc([-36,19],31),disc([36,19],31)];
  const lower = [disc([-19,-36],23), disc([19,-36],23)];
  const lowerClear = [disc([-19,-36],26), disc([19,-36],26)];
  const rays = Array.from({ length: 9 }, (_, i) => {
    const a = (i - 4) * 12 * DEG;
    const tip: V = [51 * Math.sin(a), -17 + 51 * Math.cos(a)];
    return [thickSeg([0,-21],tip,2.6), disc(tip,3.4)];
  }).flat();
  const flower = longLast([...carve(lobes,[...lowerClear,...rays]), ...lower]);

  cluster(c, reach, flower, true);
};

/** The back of one plum, with five round petals, the calyx, and the short stalk folded inwards. */
const plumFromBehind = (): Region[] => {
  const ears: V[] = [[-44, 15], [44, 15]];
  const crowns: V[] = [[-25, 37], [0, 43], [25, 37]];
  const earPetals = ears.map((centre) => disc(centre, 24));
  const crownPetals = crowns.map((centre) => disc(centre, 22));
  const earLines = ears.map((centre) => ({ outside: disc(centre, 18), inside: disc(centre, 15.8) }));
  const crownLines = { outside: crowns.map((centre) => disc(centre, 17.3)), inside: crowns.map((centre) => disc(centre, 15.0)) };
  const calyx = [disc([-10, 6], 23), disc([10, 6], 23)];
  const calyxPaper = [disc([-8, 7], 15.5), disc([8, 7], 15.5)];
  const stemCentre: V = [21, -9];
  const stalk = thickArc(stemCentre, 20, 15, 131 * DEG, 253 * DEG);
  const stalkPaper = thickArc(stemCentre, 20, 5.8, 130 * DEG, 250 * DEG);
  const filament = Array.from({ length: 8 }, (_, i) => {
    const angle = (59 + i * 9) * DEG;
    const at = (r: number): V => [r * Math.cos(angle), 10 + r * Math.sin(angle)];
    return thickSeg(at(29), at(45), 2.3);
  });
  const outline = [...earPetals, ...crownPetals, ...calyx, stalk];
  const veins = [...earLines.flatMap((line) => [line.outside, line.inside]), ...crownLines.outside, ...crownLines.inside, ...filament];
  return longLast(carveWhere([...outline, ...veins, ...calyxPaper, stalkPaper].flat(), (point) => {
    if (calyxPaper.some((region) => inside(region, point)) || inside(stalkPaper, point)) return false;
    if (calyx.some((region) => inside(region, point)) || inside(stalk, point)) return true;
    if (earLines.some((line) => inside(line.outside, point) && !inside(line.inside, point))) return false;
    if (earPetals.some((region) => inside(region, point))) return true;
    const inCrown = crownPetals.some((region) => inside(region, point));
    const onCrownLine = crownLines.outside.some((region) => inside(region, point)) && !crownLines.inside.some((region) => inside(region, point));
    return inCrown && !onCrownLine && !filament.some((region) => inside(region, point));
  }));
};

export const mitsuYoseUraUmeBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const centreRadius = 31 * k;
  const flower = plumFromBehind();
  c.guideCircle(C0, 96);
  c.guideCircle(C0, centreRadius);
  c.guideSpokes(3, 0, centreRadius);
  for (const turn of [0, 120, 240]) {
    const angle = turn * DEG;
    const at: V = [centreRadius * Math.sin(angle), centreRadius * Math.cos(angle)];
    c.fill("plum", toPath(flower, { k: k * 0.89, at, turn }));
  }
};

const plumPoint = (radius: number, angle: number): V => [radius * Math.sin(angle * DEG), radius * Math.cos(angle * DEG)];

const plumBow = (from: V, to: V, radius: number, toward: V) =>
  shortArc(circleThrough(from, to, radius, toward), from, to);

const twistedPlumPetal = (inset: number): Region[] =>
  carve([disc([0, 54], 42 - inset)], [disc(plumPoint(54, -72), 43.8 + inset), disc(CENTRE, 13.9 + inset)]);

const plumEdge = (edge: Region, width: number): Region[] => edge.map((piece) => piece.t === "A"
  ? thickArc(piece.c, piece.r, width, piece.a0, piece.a1)
  : thickSeg(piece.a, piece.b, width));

/** The shadow form leaves paper between the bowed petal rims and the hooked filaments. */
export const kageNejiUmeBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.987;
  const edge = carve(twistedPlumPetal(0), twistedPlumPetal(2));
  const echo = carve(twistedPlumPetal(6), twistedPlumPetal(7.8));
  const hook = [
    plumBow([-1.9, 13.1], [-14, 42.6], 34, [16, 38]),
    plumBow([-14, 42.6], [-7, 45.6], 4.45, [-10, 41]),
    plumBow([-7, 45.6], [2.3, 13], 36.7, [-22, 24]),
  ];
  const filament = plumEdge(hook, 1.72);
  const heart = carve([disc(CENTRE, 15.1)], [disc(CENTRE, 13.05)]);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  for (const turn of PETAL_ANGLES) {
    c.fill("plum", toPath([...edge, ...echo], { k, turn }));
    c.fill("plum", toPath(filament, { k, turn }));
  }
  c.fill("plum", toPath(heart, { k }));
};

/** A shallow fan stands behind three ringed lobes and a hooked stalk. */
export const chuKageEbiraUmeBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.994;
  const sideCentre: V = [-61, 10];
  const sidePetal = carve([disc(sideCentre, 30)], [disc(sideCentre, 23), disc([0, -3], 40)]);
  const mirrorPetal = sidePetal.map((loop) => loop.map(mirrored).reverse().map(reversed));
  const frontCentre: V = [0, -1.7];
  const front = carve([disc(frontCentre, 40.0)], [disc(frontCentre, 32), disc([0, -40], 18)]);
  const belly = [0, -38] as V;
  const cap = plumBow([-58, 35], [58, 35], 77.2, [0, -17]);
  const flute = [
    plumBow([-26, -25.7], [0, -18], 31.4, [-10, -8.7]),
    plumBow([0, -18], [27, -25.7], 31.4, [10, -8.7]),
    plumBow([27, -25.7], [6, -34], 29.4, [10, -7]),
    plumBow([6, -34], [29, -66], 41.5, [44, -30]),
    seg([29, -66], [17, -67.2]), plumBow([17, -67.2], belly, 37, [31, -31]),
    plumBow(belly, [-26, -25.7], 33, [-1, -8]),
  ];
  const stems = Array.from({ length: 11 }, (_, i) => {
    const angle = (i - 5) * 8.5;
    const base = plumPoint(40, angle);
    const tip = plumPoint(54, angle);
    return [thickSeg(base, tip, 1.45), disc(tip, 1.75)];
  }).flat();
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  c.fill("plum", toPath(carve([...sidePetal, ...mirrorPetal], []), { k }));
  c.fill("plum", toPath([...front, ...plumEdge([cap], 2.1), ...stems], { k }));
  c.fill("plum", toPath(plumEdge(flute, 2.1), { k }));
};
