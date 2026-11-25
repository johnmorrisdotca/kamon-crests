// Four-lobed 木瓜, measured from the 1892 crest book (frame 44). The flower and curled band follow the same
// construction as the five-lobed Oda quince, with a wide side and a short upright side read separately from the book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, carveWhere, circleCircle, disc, nearest, onCircle, rotated, seg, shortArc, toPath, touch, vdist } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

interface Scallops {
  tip: Circle;
  shoulder: Circle;
}

interface Lobe {
  crown: Circle;
  shoulderWidth: number;
  shoulderX: number;
  cut: Circle;
  band: Circle;
  bandHalfWidth: number;
  bandAngle: number;
  petalTip: Circle;
  petalShoulder: Circle;
  petalJoin: number;
  seam: number;
  stamenLength: number;
  scallops?: Scallops;
}

const UPRIGHT: Lobe = {
  crown: { c: [0, -5], r: 85 }, shoulderWidth: 27, shoulderX: 27,
  cut: { c: [0, 2], r: 52 }, band: { c: [0, 1], r: 44 }, bandHalfWidth: 4, bandAngle: 51,
  petalTip: { c: [0, 29], r: 9 }, petalShoulder: { c: [12, 21], r: 10 }, petalJoin: 22, seam: 0.84, stamenLength: 20,
};
const SIDE: Lobe = {
  crown: { c: [0, 55], r: 45 }, shoulderWidth: 25, shoulderX: 18,
  cut: { c: [0, 4], r: 58 }, band: { c: [0, 4], r: 48 }, bandHalfWidth: 4, bandAngle: 54,
  petalTip: { c: [0, 38], r: 10 }, petalShoulder: { c: [12, 27], r: 11 }, petalJoin: 26, seam: 1 / UPRIGHT.seam, stamenLength: 24,
};

const RINGED_UPRIGHT: Lobe = {
  ...UPRIGHT, crown: { c: [0, 9], r: 85 }, shoulderX: 29, cut: { c: [0, 4], r: 53 },
};

const HUT_UPRIGHT: Lobe = { ...UPRIGHT, crown: { c: [0, -1], r: 85 }, shoulderX: 28 };
const HUT_BOTTOM: Lobe = {
  ...UPRIGHT, crown: { c: [0, -7], r: 85 }, shoulderX: 26, band: { c: [0, 0], r: 44 },
  petalTip: { c: [0, 27], r: 9 }, stamenLength: 19,
};

const KARA_UPRIGHT: Lobe = { ...UPRIGHT, scallops: { tip: { c: [0, 58], r: 20 }, shoulder: { c: [27, 47], r: 21 } } };
const KARA_SIDE: Lobe = { ...SIDE, scallops: { tip: { c: [0, 76], r: 24 }, shoulder: { c: [22, 58], r: 23 } } };

const HOTTA_UPRIGHT: Lobe = {
  ...UPRIGHT, crown: { c: [0, 62], r: 34 }, shoulderWidth: 27, shoulderX: 5,
  cut: { c: [0, 12], r: 58 }, band: { c: [0, 12], r: 50 }, bandAngle: 51,
  petalTip: { c: [0, 43], r: 9 }, petalShoulder: { c: [12, 32], r: 11 }, petalJoin: 26, seam: 1.22, stamenLength: 25,
};
const HOTTA_SIDE: Lobe = {
  ...SIDE, crown: { c: [0, 14], r: 70 }, shoulderWidth: 24, shoulderX: 29,
  cut: { c: [0, 7], r: 49 }, band: { c: [0, 7], r: 42 }, bandAngle: 53,
  petalTip: { c: [0, 31], r: 8 }, petalShoulder: { c: [14, 22], r: 10 }, petalJoin: 23, seam: 1 / HOTTA_UPRIGHT.seam, stamenLength: 20,
};

const LOBES = {
  plain: [UPRIGHT, SIDE, UPRIGHT, SIDE],
  ringed: [RINGED_UPRIGHT, SIDE, RINGED_UPRIGHT, SIDE],
  hut: [HUT_UPRIGHT, SIDE, HUT_BOTTOM, SIDE],
  kara: [KARA_UPRIGHT, KARA_SIDE, KARA_UPRIGHT, KARA_SIDE],
};
const CENTRE: V = [0, 0];
const QUARTERS = [0, 90, 180, 270];
const HEART_RADIUS = 9;
const HEART_GAP = 2;
const STEM_HALF_WIDTH = 2;
const mirror = ([x, y]: V): V => [-x, y];
const mirroredCircle = (circle: Circle): Circle => ({ c: mirror(circle.c), r: circle.r });

/** The concave inside edge of a lobe meets two round shoulders tangent to its broad crown. */
const shell = ({ crown, shoulderWidth, shoulderX, cut }: Lobe): Region => {
  const tangentDistance = crown.r - shoulderWidth;
  const right: Circle = { c: [shoulderX, crown.c[1] + Math.sqrt(tangentDistance ** 2 - shoulderX ** 2)], r: shoulderWidth };
  const left = mirroredCircle(right);
  const crownJoin = touch(crown, right);
  const cutJoin = nearest(circleCircle(right.c, right.r, cut.c, cut.r), [52, 23]);

  return [shortArc(crown, mirror(crownJoin), crownJoin), shortArc(right, crownJoin, cutJoin), shortArc(cut, cutJoin, mirror(cutJoin)), shortArc(left, mirror(cutJoin), mirror(crownJoin))];
};

/** The three round ends of a scalloped lobe run into the same concave cut as the plain lobe. */
const outerLobe = (lobe: Lobe): Region[] => {
  if (lobe.scallops === undefined) return [shell(lobe)];
  const { tip, shoulder } = lobe.scallops;
  const cut = lobe.cut;

  return carve([tip, shoulder, mirroredCircle(shoulder)].map(({ c, r }) => disc(c, r)), [disc(cut.c, cut.r)]);
};

/** The curled band is a pair of concentric arcs closed by two round ends. */
const curl = ({ band: { c, r }, bandHalfWidth, bandAngle }: Lobe): Region => {
  const angle = bandAngle * Math.PI / 180;
  const outer = { c, r: r + bandHalfWidth };
  const inner = { c, r: r - bandHalfWidth };
  const at = (circle: Circle, a: number): V => onCircle(circle.c, circle.r, a);
  const right = { c: onCircle(c, r, angle), r: bandHalfWidth };
  const left = mirroredCircle(right);
  const outerRight = at(outer, angle);
  const innerRight = at(inner, angle);

  return [shortArc(outer, mirror(outerRight), outerRight), arcTo(right, outerRight, innerRight, false), shortArc(inner, innerRight, mirror(innerRight)), arcTo(left, mirror(innerRight), mirror(outerRight), false)];
};

/** The petal's three round ends, the seam beside each neighbour, and the narrow, round-ended stamen. */
const petal = ({ petalTip, petalShoulder, petalJoin, seam, stamenLength }: Lobe): Region[] => {
  const lobes = [petalTip, petalShoulder, mirroredCircle(petalShoulder)];
  const stamen: V = [0, stamenLength];
  const halfSeam = Math.hypot(1, seam) * 0.85;
  const inside = (circle: Circle, point: V): boolean => vdist(circle.c, point) < circle.r;

  return carveWhere([
    ...disc(CENTRE, HEART_RADIUS + HEART_GAP), ...disc(CENTRE, petalJoin), ...lobes.flatMap(({ c, r }) => disc(c, r)), ...disc(stamen, STEM_HALF_WIDTH),
    seg([0, halfSeam], [100, seam * 100 + halfSeam]), seg([0, halfSeam], [-100, seam * 100 + halfSeam]),
    seg([STEM_HALF_WIDTH, 0], [STEM_HALF_WIDTH, stamenLength]), seg([-STEM_HALF_WIDTH, 0], [-STEM_HALF_WIDTH, stamenLength]),
  ], (point) => {
    const [x, y] = point;
    const d = vdist(CENTRE, point);
    const inStamen = Math.abs(x) < STEM_HALF_WIDTH && y < stamenLength || vdist(stamen, point) < STEM_HALF_WIDTH;

    return y > Math.abs(x) * seam + halfSeam && d > HEART_RADIUS + HEART_GAP && !inStamen && (d < petalJoin || lobes.some((circle) => inside(circle, point)));
  });
};

export const fourLobedMokko = (c: Builder, reach: number, at: V = CENTRE, form: keyof typeof LOBES = "plain"): void => {
  const units = LOBES[form].map((lobe) => ({ frame: [...outerLobe(lobe), curl(lobe)], flower: petal(lobe) }));
  const placing: Placing = { k: reach / 100, at };
  for (const turn of QUARTERS) c.fill("quince-lobes", toPath(units[turn / 90].frame, { ...placing, turn }));
  for (const turn of QUARTERS) c.fill("flower-lozenge", toPath(units[turn / 90].flower, { ...placing, turn }));
  c.fill("flower-lozenge", toPath([disc(CENTRE, HEART_RADIUS)], placing));
};

/** Hotta's disc has four white cut-outs and a clear field for the bands and the upright flower. */
export const hottaMokkoBuild = (c: Builder, reach: number): void => {
  const lobes = [HOTTA_UPRIGHT, HOTTA_SIDE, HOTTA_UPRIGHT, HOTTA_SIDE];
  const placement: Placing = { k: reach / 100 };
  const openings = QUARTERS.map((turn, index) => shell(lobes[index]).map((piece) => rotated(piece, -turn * Math.PI / 180)));
  const centreField = [...[-19, 19].map((y) => disc([0, y], 47)), disc(CENTRE, 52)];
  const paperAroundBands = QUARTERS.map((turn, index) => {
    const lobe = lobes[index];
    const gap = curl({ ...lobe, bandHalfWidth: lobe.bandHalfWidth + 4 });

    return gap.map((piece) => rotated(piece, -turn * Math.PI / 180));
  });
  c.fill("black-disc", toPath(carve([disc(CENTRE, 100)], [...openings, ...centreField, ...paperAroundBands]), placement));
  for (const turn of QUARTERS) c.fill("quince-lobes", toPath([curl(lobes[turn / 90])], { ...placement, turn }));
  for (const turn of QUARTERS) c.fill("flower-lozenge", toPath(petal(lobes[turn / 90]), { ...placement, turn }));
  c.fill("flower-lozenge", toPath([disc(CENTRE, HEART_RADIUS)], placement));
};
