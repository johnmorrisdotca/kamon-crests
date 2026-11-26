// The arabesque flower in the 1892 book. Local coordinates rise from the centre and its layout radius is 100.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, circleCircle, circleThrough, disc, inside, mirrored, nearest, onPage, reversed, rotated, seg, shortArc, thickArc, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";

const MIDDLE = 12;
const HEART = disc([0, 0], MIDDLE + 2.5);
const FIVE_LOBES = [[0, 0, 81], [0, 77, 23], [-31, 68, 21], [31, 68, 21]] as const;
const SIX_LOBES = [[0, 0, 86], [0, 80, 20], [-26, 72, 18], [26, 72, 18]] as const;
type Lobe = readonly [x: number, y: number, radius: number];

const petalRegion = (lobes: readonly Lobe[], count: number): Region[] => {
  const halfSector = Math.PI / count;
  const sin = Math.sin(halfSector);
  const cos = Math.cos(halfSector);
  const stamen = thickSeg([0, 0], [0, 43], 3.2);
  const edges: V[] = [[-100 * sin, 100 * cos], [100 * sin, 100 * cos]];
  const petalSides = edges.map(([x, y]) => {
    const foot = (-Math.sign(x) * 1.25) / cos;
    return seg([foot, 0], [foot + x, y]);
  });

  return carveWhere(
    [...lobes.flatMap(([x, y, r]) => disc([x, y], r)), ...petalSides, ...HEART, ...stamen],
    ([x, y]) => y * sin - Math.abs(x) * cos > 1.25 &&
      vdist([0, 0], [x, y]) > MIDDLE + 2.5 &&
      lobes.some(([cx, cy, r]) => vdist([cx, cy], [x, y]) < r) &&
      !(Math.abs(x) < 1.6 && y < 43),
  );
};

export const karahanaBuild = (c: Builder, reach: number, petals: 5 | 6 = 5): void => {
  const placing: Placing = { k: reach / 100 };
  const petal = petalRegion(petals === 5 ? FIVE_LOBES : SIX_LOBES, petals);

  c.guideCircle(C0, reach);
  c.guideSpokes(petals * 2, 0, reach);
  for (let i = 0; i < petals; i += 1) c.fill("karahana", toPath(petal, { ...placing, turn: i * 360 / petals }));
  c.fill("karahana", toPath([disc([0, 0], MIDDLE)], placing));
};

/** Three round lobes, with two arcs running from the shoulders to the heart. */
const scallopedPetal = (
  tip: V, tipRadius: number, shoulder: V, shoulderRadius: number, flankRadius: number, gap = 0,
): Region => {
  const middle = tipRadius + gap;
  const side = shoulderRadius + gap;
  const topCentre: V = [0, tip[1] - tipRadius];
  const tipJoin = nearest(circleCircle(topCentre, middle, shoulder, side), [shoulder[0] / 2, tip[1]]);
  const flankJoin: V = [shoulder[0] + side * 0.8, shoulder[1] - side * 0.6];
  const foot: V = [3 + gap, 4];
  const flank = circleThrough(foot, flankJoin, flankRadius, [flankRadius, 8]);
  const peak: V = [0, tip[1] + gap];
  const right = [shortArc(flank, foot, flankJoin), shortArc({ c: shoulder, r: side }, flankJoin, tipJoin), shortArc({ c: topCentre, r: middle }, tipJoin, peak)];

  return [...right, ...right.map(mirrored).map(reversed).reverse(), seg([-foot[0], foot[1]], foot)];
};

const turnBy = (region: Region, degrees: number): Region => region.map((piece) => rotated(piece, degrees * DEG));
const ruledBlade = (coordinates: V[]): Region => coordinates.map((point, i) => seg(point, coordinates[(i + 1) % coordinates.length]));

/** In the sword flower lozenge the side petals are longer than the upright petals. */
export const kenHanabishiBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const heart = disc([0, 0], 13.5);
  const upright = (gap: number): Region => scallopedPetal([0, 80], 17, [19, 57], 17, 126, gap);
  const sideways = (gap: number): Region => scallopedPetal([0, 100], 15, [14, 69], 18, 142, gap);
  const up = carve([upright(0)], [heart, thickSeg([0, 0], [0, 40], 4.5)]);
  const side = carve([sideways(0)], [heart, thickSeg([0, 0], [0, 45], 4.5)]);
  const blade = ruledBlade([[2, 2], [66, 31], [60, 53], [40, 62]]);
  const clear = carve([blade], [upright(2), turnBy(sideways(2), -90), heart]);
  const opposite = clear.map((loop) => turnBy(loop, 180));
  const mirror = (loop: Region): Region => loop.map(mirrored).map(reversed).reverse();

  c.guideCircle(C0, reach);
  c.guideSpokes(4, 0, reach);
  for (const angle of [0, 180]) {
    c.fill("flower-lozenge", toPath(up, { ...placing, turn: angle }));
    c.fill("flower-lozenge", toPath(side, { ...placing, turn: angle + 90 }));
  }
  c.fill("flower-lozenge", toPath(carve([disc([0, 0], 11)], [disc([0, 0], 1.5)]), placing));
  for (const blade of [clear, clear.map(mirror), opposite, opposite.map(mirror)]) c.fill("sword", toPath(blade, placing));
};

/** The same rounded-tip construction, with five narrow petals and five ruled swords between them. */
export const kenKarahanaBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const shape = (gap: number): Region => scallopedPetal([0, 100], 18, [22, 75], 16, 160, gap);
  const petal = carve([shape(0)], [HEART, thickSeg([0, 0], [0, 44], 3)]);
  const blade = ruledBlade([[-9, 8], [-24, 89], [0, 100], [24, 89], [9, 8]]);
  const clear = carve([blade], [turnBy(shape(2.5), -36), turnBy(shape(2.5), 36), HEART]);

  c.guideCircle(C0, reach);
  c.guideSpokes(10, 0, reach);
  for (let i = 0; i < 5; i += 1) c.fill("karahana", toPath(petal, { ...placing, turn: 72 * i }));
  c.fill("karahana", toPath([disc([0, 0], MIDDLE)], placing));
  for (let i = 0; i < 5; i += 1) c.fill("sword", toPath(clear, { ...placing, turn: 36 + 72 * i }));
};

/** Three small arabesque flowers stand together without their petal edges touching. */
export const mitsumoriKarahanaBuild = (c: Builder, reach: number): void => {
  const petal = petalRegion(FIVE_LOBES, 5);
  const blossom = Array.from({ length: 5 }, (_, i) => petal.map((loop) => turnBy(loop, -72 * i))).flat();
  blossom.push(disc([0, 0], MIDDLE));
  const centreDistance = reach * 0.55;
  const placing: Placing = { k: reach * 0.0045 };

  c.guideCircle(C0, reach);
  c.guideCircle(C0, centreDistance);
  c.guideSpokes(3, 0, reach);
  for (const turn of [0, 120, 240]) {
    const at: V = [centreDistance * Math.sin(turn * DEG), centreDistance * Math.cos(turn * DEG)];
    c.guideCircle(onPage([0, 0], { ...placing, at }), reach * 0.45);
    c.fill("karahana", toPath(blossom, { ...placing, at }));
  }
};

/** The sword is reserved as paper inside each lobe of the stylized flower. */
export const kenKarahanaKuzushiBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const blade = ruledBlade([[-1, 12], [-6, 46], [-15, 61], [0, 79], [15, 61], [6, 46], [1, 12]]);
  const shape = scallopedPetal([0, 100], 18, [22, 73], 19, 215);
  const petal = carve([shape], [disc([0, 0], 14.5), blade]);

  c.guideCircle(C0, reach);
  c.guideSpokes(10, 0, reach);
  for (let i = 0; i < 5; i += 1) c.fill("karahana", toPath(petal, { ...placing, turn: 36 + 72 * i }));
  c.fill("karahana", toPath([disc([0, 0], 11.5)], placing));
};

const arabesqueAngles = [0, 72, 144, 216, 288];
const arabesqueCentre: V = [0, 0];
const aroundArabesque = (reach: number, angle: number): V =>
  [reach * Math.sin(angle * DEG), reach * Math.cos(angle * DEG)];

const arcBand = (piece: Region[number], width: number): Region => piece.t === "A"
  ? thickArc(piece.c, piece.r, width, piece.a0, piece.a1)
  : thickSeg(piece.a, piece.b, width);

/** A white calyx and its bent stalk open in the solid scalloped blossom. */
export const uraKarahanaBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.96;
  const outer = arabesqueAngles.flatMap((turn) => [
    disc(aroundArabesque(75.5, turn), 23.5),
    disc(aroundArabesque(70, turn - 23.5), 23.6),
    disc(aroundArabesque(71, turn + 23.5), 23.6),
  ]);
  const calyx = ruledBlade([[0, 36], [11.8, 21], [37, 14], [23, 1], [23.6, -20], [5, -14], [-23.6, -20], [-21, 0], [-37, 12], [-14, 20]]);
  const stem = shortArc(circleThrough([-6, 12], [22, -53], 50.6, [39, -24]), [-6, 12], [22, -53]);
  const paper = [calyx, arcBand(stem, 9.1)];
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  c.fill("karahana", toPath(carve([disc(arabesqueCentre, 78), ...outer], paper), { k }));
};
const placeArabesque = (region: Region, turn: number, k: number, lift: number): Region =>
  turnBy(region, turn).map((piece) => {
    const move = ([x, y]: V): V => [k * x, lift + k * y];
    return piece.t === "L" ? seg(move(piece.a), move(piece.b))
      : { ...piece, c: move(piece.c), r: piece.r * k };
  });

const clipArabesque = (parts: Region[], radius: number): Region[] =>
  carveWhere([...parts.flat(), ...disc(arabesqueCentre, radius)],
    (point) => vdist(arabesqueCentre, point) < radius && parts.some((part) => inside(part, point)));


const floatingFlower = (): Region[] => [
  ...arabesqueAngles.flatMap((turn) => petalRegion(FIVE_LOBES, 5).map((loop) => turnBy(loop, -turn))),
  disc(arabesqueCentre, MIDDLE),
];

const borderFlower = (reach: number, scale: number): Region[] =>
  clipArabesque(floatingFlower().map((loop) => placeArabesque(loop, 180, scale, 102)), reach);

/** Five cut flowers stand inside the outer circle and face the small central flower. */
export const karahanaFusenRyoBuild = (c: Builder): void => {
  c.precision(3);
  const k = 1;
  const border = carve([disc(arabesqueCentre, 96)], [disc(arabesqueCentre, 94.2)]);
  const centre = floatingFlower();
  const brim = borderFlower(92.8, 0.50);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  c.fill("karahana", toPath(border, { k }));
  for (const turn of arabesqueAngles) c.fill("karahana", toPath(brim, { k, turn }));
  c.fill("karahana", toPath(centre, { k: 0.51 }));
};
