// Chrysanthemum constructions measured from the 1892 book, in a plane with y up.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, circleThrough, DEG, disc, onCircle, onPage, rotated, seg, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

const CENTRE: V = [0, 0];

const at = (r: number, direction: number): V => [r * Math.sin(direction * DEG), r * Math.cos(direction * DEG)];
const mirror = ([x, y]: V): V => [-x, y];

/** The rounded tip is the circle tangent to both sides of a petal's sector. */
const chrysanthemumPetal = (base: number, reach: number, halfAngle: number): { region: Region; cap: Circle } => {
  const angle = halfAngle * DEG;
  const sin = Math.sin(angle);
  const gap = 0.9;
  const centre = (reach + gap) / (1 + sin);
  const cap: Circle = { c: [0, centre], r: centre * sin - gap };
  const shoulder = onCircle(cap.c, cap.r, -angle);
  const foot = at(base, halfAngle - Math.asin(gap / base) / DEG);
  const region = [
    seg(foot, shoulder), arcTo(cap, shoulder, mirror(shoulder), true),
    seg(mirror(shoulder), mirror(foot)), shortArc({ c: CENTRE, r: base }, mirror(foot), foot),
  ];
  return { region, cap };
};

const riverBend = (from: number, to: number, right: number, left: number, top: number, middle: number, bottom: number, w: number): Region => {
  const upper: V = [right, (top + middle) / 2];
  const lower: V = [left, (middle + bottom) / 2];
  const upperRadius = (top - middle) / 2;
  const lowerRadius = (middle - bottom) / 2;
  return [
    seg([from, top + w], [right, top + w]),
    arcTo({ c: upper, r: upperRadius + w }, [right, top + w], [right, middle - w], false),
    seg([right, middle - w], [left, middle - w]),
    arcTo({ c: lower, r: lowerRadius - w }, [left, middle - w], [left, bottom + w], true),
    seg([left, bottom + w], [to, bottom + w]),
    arcTo({ c: [to, bottom], r: w }, [to, bottom + w], [to, bottom - w], false),
    seg([to, bottom - w], [left, bottom - w]),
    arcTo({ c: lower, r: lowerRadius + w }, [left, bottom - w], [left, middle + w], false),
    seg([left, middle + w], [right, middle + w]),
    arcTo({ c: upper, r: upperRadius - w }, [right, middle + w], [right, top - w], true),
    seg([right, top - w], [from, top - w]),
    arcTo({ c: [from, top], r: w }, [from, top - w], [from, top + w], false),
  ];
};

/** The innermost return on the lower side starts behind the crossings and straightens to the right. */
const riverCorner = (centre: V, radius: number, halfWidth: number, end: number): Region => {
  const [x, y] = centre;
  const outer = { c: centre, r: radius + halfWidth };
  const inner = { c: centre, r: radius - halfWidth };
  const outerBottom: V = [x, y - outer.r];
  const innerBottom: V = [x, y - inner.r];
  return [
    arcTo(outer, [x - outer.r, y], outerBottom, true), seg(outerBottom, [end, outerBottom[1]]),
    seg([end, outerBottom[1]], [end, innerBottom[1]]), seg([end, innerBottom[1]], innerBottom),
    arcTo(inner, innerBottom, [x - inner.r, y], false), seg([x - inner.r, y], [x - outer.r, y]),
  ];
};

export const kikuSuiBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const flower: Placing = { at: [0, 2 * k], k };
  const petal = chrysanthemumPetal(13, 70, 10);
  const angles = [-80, -60, -40, -20, 0, 20, 40, 60, 80];
  const heart = [arcTo({ c: CENTRE, r: 10 }, [10, 0], [-10, 0], true), seg([-10, 0], [10, 0])];
  const farBend = riverBend(-88, 89, 65, -31, -6, -34, -68, 4.3);
  const nearBend = riverBend(-97, -46, 11, -72, -22, -40, -60, 4.0);
  const outerGap = riverBend(-88, 89, 65, -31, -6, -34, -68, 6.0);
  const innerGap = riverBend(-97, -46, 11, -72, -22, -40, -60, 5.7);
  const innerBend = thickArc([24, -20], 12, 7, -84 * DEG, 84 * DEG);
  const lowerReturn = riverCorner([-12, -41], 12, 3.5, 97);
  const ribbons = [
    farBend,
    ...carve([nearBend], [outerGap]),
    ...carve([innerBend], [outerGap, innerGap]),
    ...carve([lowerReturn], [outerGap, innerGap]),
  ];

  c.guideCircle([100, 100], 96);
  for (const r of [70, 13, 10]) c.guideCircle(onPage(CENTRE, flower), r * k);
  for (const turn of angles) c.guideCircle(onPage(petal.cap.c, { ...flower, turn }), petal.cap.r * k);
  for (const ribbon of ribbons) {
    for (const piece of ribbon) {
      if (piece.t === "A") c.guideCircle(onPage(piece.c, { k }), piece.r * k);
    }
  }
  c.group(() => {
    for (const turn of angles) c.fill("chrysanthemum", toPath([petal.region], { ...flower, turn }));
  });
  c.fill("chrysanthemum", toPath([heart], flower));
  for (const ribbon of ribbons) c.fill("wave", toPath([ribbon], { k }));
};
/** Divide the flower into sixteen equal sectors; strike each of the tip circles on its own spoke. */
const sixteenPetals = (c: Builder, k: number, base: number, turns: number[], reaches: number[]): Region[][] => {
  const petals = reaches.map((reach) => chrysanthemumPetal(base, reach, 11.25));
  turns.forEach((turn, i) => {
    const { cap } = petals[i];
    c.guideCircle(onPage(cap.c, { k, turn }), cap.r * k);
  });
  return petals.map(({ region }) => [region]);
};

export const uraGikuBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const turns = Array.from({ length: 16 }, (_, i) => 11.25 + 22.5 * i);
  // The short stalk bends around a compass centre offset from the flower's vertical axis.
  const calyx = Array.from({ length: 12 }, (_, i) => at(i % 2 === 0 ? 19 : 13, 30 * i));
  const sepals = calyx.map((point, i) => {
    const next = calyx[(i + 1) % calyx.length];
    const edge = circleThrough(point, next, 18, CENTRE);
    return shortArc(edge, point, next);
  });
  const stalkCentre: V = [17, -23];
  const stalk = thickArc(stalkCentre, 16.5, 5, 132 * DEG, 224 * DEG);
  const clearance = thickArc(stalkCentre, 16.5, 10, 126 * DEG, 231 * DEG);
  for (const r of [100, 24, 19, 13]) c.guideCircle([100, 100], r * k);
  c.guideSpokes(16, 0, reach);
  const petals = sixteenPetals(c, k, 24, turns, turns.map(() => 100));
  c.guideCircle(onPage(stalkCentre, { k }), 19 * k);
  c.guideCircle(onPage(stalkCentre, { k }), 14 * k);
  c.group(() => petals.forEach((petal, i) => {
    const turned = petal.map((loop) => loop.map((piece) => rotated(piece, -turns[i] * DEG)));
    c.fill("chrysanthemum", toPath(carve(turned, [clearance]), { k }));
  }));
  c.fill("chrysanthemum", toPath(carve([sepals, stalk], []), { k }));
};

export const kikuBishiBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const turns = Array.from({ length: 16 }, (_, i) => 22.5 * i);
  const reaches = [77, 75, 78, 85, 100, 85, 78, 75, 77, 75, 78, 85, 100, 85, 78, 75];
  for (const r of [100, 13, 10]) c.guideCircle([100, 100], r * k);
  c.guideSpokes(16, 11.25, reach);
  const petals = sixteenPetals(c, k, 13, turns, reaches);
  c.group(() => petals.forEach((petal, i) => c.fill("chrysanthemum", toPath(petal, { k, turn: turns[i] }))));
  c.fill("chrysanthemum", toPath([disc(CENTRE, 10)], { k }));
};

export const jurokuUragikuBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const turns = Array.from({ length: 16 }, (_, i) => 11.25 + i * 22.5);
  for (const r of [100, 25, 22, 9, 4]) c.guideCircle([100, 100], r * k);
  c.guideSpokes(16, 0, reach);
  const main = sixteenPetals(c, k, 25, turns, turns.map(() => 100));
  const calyx = chrysanthemumPetal(6.9, 21, 22.5);
  for (let turn = 0; turn < 360; turn += 45) c.guideCircle(onPage(calyx.cap.c, { k, turn }), calyx.cap.r * k);
  c.group(() => main.forEach((petal, i) => c.fill("chrysanthemum", toPath(petal, { k, turn: turns[i] }))));
  c.group(() => {
    for (let turn = 0; turn < 360; turn += 45) c.fill("chrysanthemum", toPath([calyx.region], { k, turn }));
  });
  c.fill("chrysanthemum", toPath([disc(CENTRE, 4)], { k }));
};

/** Two circles through the tip and foot, with the compass centre of each on the perpendicular bisector. */
const pointedPetal = (base: number, reach: number, halfWidth: number): Region => {
  const from: V = [0, base];
  const tip: V = [0, reach];
  const halfLength = (reach - base) / 2;
  const radius = (halfLength * halfLength + halfWidth * halfWidth) / (2 * halfWidth);
  const right = circleThrough(from, tip, radius, [-radius, base + halfLength]);
  const left: Circle = { c: mirror(right.c), r: radius };
  return [shortArc(right, from, tip), shortArc(left, tip, from)];
};

const positioned = (region: Region, turn: number): Region => region.map((piece) => rotated(piece, -turn * DEG));

export const yaeUragikuBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const main = pointedPetal(17, 100, 10.5);
  const back = pointedPetal(17, 96, 9.6);
  const hub = carve([disc(CENTRE, 20), ...Array.from({ length: 6 }, (_, i) => disc(at(17, i * 60), 7))], []);
  const leaves = Array.from({ length: 8 }, (_, i) => positioned(main, 11.25 + i * 45));
  const rear = Array.from({ length: 8 }, (_, i) => positioned(back, 33.75 + i * 45));
  const frontGaps = Array.from({ length: 8 }, (_, i) => positioned(pointedPetal(15, 101, 12.6), 11.25 + i * 45));
  for (const r of [100, 96, 27, 17]) c.guideCircle([100, 100], r * k);
  c.guideSpokes(16, 0, reach);
  for (const petal of rear) c.fill("chrysanthemum", toPath(carve([petal], frontGaps), { k }));
  for (const petal of leaves) c.fill("chrysanthemum", toPath(carve([petal], [disc(CENTRE, 25)]), { k }));
  c.fill("chrysanthemum", toPath(hub, { k }));
};

export const uraKikuBishiBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const lengths = [80, 74, 66, 65, 100, 65, 66, 74, 80, 74, 66, 65, 100, 65, 66, 74];
  const stalkCentre: V = [17, -23];
  const stalk = thickArc(stalkCentre, 16.5, 5.5, 132 * DEG, 232 * DEG);
  const crown = carve([disc(CENTRE, 15.8), ...Array.from({ length: 5 }, (_, i) => disc(at(15, 72 * i), 6))], []);
  const centre = carve([...crown, stalk], []);
  const separation = [disc(CENTRE, 24), thickArc(stalkCentre, 16.5, 10, 125 * DEG, 239 * DEG)];
  for (const r of [100, 80, 24, 15]) c.guideCircle([100, 100], r * k);
  c.guideSpokes(16, 0, reach);
  lengths.forEach((tip, i) => {
    const petal = positioned(pointedPetal(14, tip, tip * 0.087), i * 22.5);
    c.fill("chrysanthemum", toPath(carve([petal], separation), { k }));
  });
  c.fill("chrysanthemum", toPath(centre, { k }));
};

export const mitsuKikuBishiBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const flowerK = k * 0.55;
  const placements: Placing[] = [{ at: [0, 43 * k], k: flowerK }, { at: [35 * k, -21 * k], k: flowerK, turn: 111 }, { at: [-35 * k, -21 * k], k: flowerK, turn: -111 }];
  const lengths = [65, 64, 68, 79, 100, 79, 68, 64, 65, 64, 68, 79, 100, 79, 68, 64];
  const petals = lengths.map((tip) => chrysanthemumPetal(13, tip, 11.25));
  for (const r of [96, 43 * k]) c.guideCircle([100, 100], r);
  for (const flower of placements) {
    for (const radius of [100, 13, 10]) c.guideCircle(onPage(CENTRE, flower), radius * flowerK);
    petals.forEach(({ cap }, i) => c.guideCircle(onPage(cap.c, { ...flower, turn: (flower.turn ?? 0) + i * 22.5 }), cap.r * flowerK));
  }
  for (const flower of placements) c.group(() => {
    petals.forEach(({ region }, i) => c.fill("chrysanthemum", toPath([region], { ...flower, turn: (flower.turn ?? 0) + i * 22.5 })));
    c.fill("chrysanthemum", toPath([disc(CENTRE, 10)], flower));
  });
};

export const kokonoeGikuBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const petals = [100, 70, 41].map((tip) => chrysanthemumPetal(17, tip, 11.25));
  const [outer, middle, inner] = petals;
  const clearances = [middle, inner].map(({ cap }) => disc(cap.c, cap.r + 2.2));
  const bands = [
    carve([outer.region], [disc(CENTRE, 58), clearances[0]]),
    carve([middle.region], [disc(CENTRE, 32), clearances[1]]),
    [inner.region],
  ];
  for (const r of [100, 70, 58, 41, 32, 17, 14]) c.guideCircle([100, 100], r * k);
  c.guideSpokes(16, 0, reach);
  bands.forEach((band) => c.group(() => {
    for (let i = 0; i < 16; i += 1) c.fill("chrysanthemum", toPath(band, { k, turn: 11.25 + i * 22.5 }));
  }));
  c.fill("chrysanthemum", toPath([disc(CENTRE, 14)], { k }));
};

export const kikuIchiBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const k = reach / 100;
  const flower: Placing = { k, at: [0, 2 * k] };
  const half = [arcTo({ c: CENTRE, r: 10 }, [10, 0], [-10, 0], true), seg([-10, 0], [10, 0])];
  const petals = chrysanthemumPetal(13, 64, 10);
  const corners: V[] = [[-79, -7], [-79, -37], [79, -37], [79, -7]];
  const bar = corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));
  const ends: V[] = [[-78, -22], [78, -22]];
  const ground = carve([bar, ...ends.map((point) => disc(point, 19))], []);
  c.guideCircle([100, 100], 96);
  for (const r of [64, 13, 10]) c.guideCircle(onPage(CENTRE, flower), r * k);
  for (let turn = -80; turn <= 80; turn += 20) c.guideCircle(onPage(petals.cap.c, { ...flower, turn }), petals.cap.r * k);
  for (const point of ends) c.guideCircle(onPage(point, { k }), 19 * k);
  c.group(() => {
    for (let turn = -80; turn <= 80; turn += 20) c.fill("chrysanthemum", toPath([petals.region], { ...flower, turn }));
  });
  c.fill("chrysanthemum", toPath([half], flower));
  c.fill("bar", toPath(ground, { k }));
};

export const kokumochiJushiGikuBuild = (c: Builder): void => {
  c.precision(3);
  const step = 360 / 14;
  const petals = chrysanthemumPetal(20, 88, step / 2);
  const openings = Array.from({ length: 14 }, (_, i) => positioned(petals.region, i * step));
  for (const r of [96, 90, 88, 20, 13, 7]) c.guideCircle([100, 100], r);
  c.guideSpokes(14, step / 2, 96);
  for (let i = 0; i < 14; i += 1) c.guideCircle(onPage(petals.cap.c, { k: 1, turn: i * step }), petals.cap.r);
  c.fill("black-disc", toPath([disc(CENTRE, 96), disc(CENTRE, 90)], { k: 1 }), "evenodd");
  c.fill("chrysanthemum", toPath([disc(CENTRE, 90), ...openings, disc(CENTRE, 13), disc(CENTRE, 7)], { k: 1 }), "evenodd");
};
