import type { Builder } from "../../construct/builder.ts";
import { RING_GAP, WEIGHT } from "../../construct/builder.ts";
import { carve, carveWhere, inside, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { owariBuild } from "./tsuta-lobes.ts";

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));
const rectangle = (half: number, low: number, high: number): Region => polygon([[-half, low], [half, low], [half, high], [-half, high]]);

const square = (half: number): Region => rectangle(half, -half, half);

const boxFace = (half: number, rim: number, y: number, stripe: number): Region[] => {
  const room = half - rim;
  const outer = rectangle(half, y - half, y + half);
  const hole = rectangle(room, y - room, y + room);
  const cornerBrace = thickSeg([-half, y - half], [half, y + half], stripe);

  return carveWhere([outer, hole, cornerBrace].flat(), (p) =>
    inside(outer, p) && (!inside(hole, p) || inside(cornerBrace, p)),
  );
};

export const kageNoMasuBuild = (c: Builder): void => {
  const half = R / Math.SQRT2;
  c.guideCircle(C0, R);
  c.fill("measuring-box", toPath([square(half), square(half - 6.1)], { k: 1 }), "evenodd");
  c.fill("measuring-box", toPath(boxFace(45, 5.6, 0, 4.2), { k: 1 }), "evenodd");
};

export const chuwaNiMasuBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  const placement = { k: reach / R };
  c.fill("measuring-box", toPath([rectangle(50, 40, 56)], placement));
  c.fill("measuring-box", toPath(boxFace(50, 15.8, -16, 4), placement), "evenodd");
};

interface Tier {
  half: number;
  depth: number;
  rise: number;
  y: number;
}

const tierOuter = ({ half, depth, rise, y }: Tier, n = 0): Region => polygon([
  [0, y + depth + n], [-half - n, y], [-half - n, y - rise - n],
  [0, y - depth - rise - n], [half + n, y - rise - n], [half + n, y],
]);

const tierJoins = ({ half, depth, rise, y }: Tier): Region[] => {
  const front = y - depth;

  return [
    thickSeg([-half - 4, y + 2], [0, front], WEIGHT.thread),
    thickSeg([0, front], [half + 4, y + 2], WEIGHT.thread),
    thickSeg([0, front + 1], [0, front - rise - 3], WEIGHT.thread),
  ];
};

export const itowaNiSangaiMasuBuild = (c: Builder): void => {
  const width = c.ring("ring-thin") - RING_GAP;
  const tiers: Tier[] = [
    { half: 80, depth: 35, rise: 48, y: -8 },
    { half: 58, depth: 27, rise: 38, y: 40 },
    { half: 33, depth: 17, rise: 24, y: 79 },
  ];
  tiers.forEach((tier, i) => {
    const joins = tierJoins(tier);
    const above = tiers[i + 1];
    if (above !== undefined) joins.push(tierOuter(above, 2.4));

    c.fill("measuring-box", toPath(carve([tierOuter(tier)], joins), { k: width / R }), "evenodd");
  });
};

/** Nested outlines share one centre within the printed medium ring. */
export const chuwaNiHitotsuKasaneMasuBuild = (c: Builder): void => {
  const half = (c.ring("ring-medium") - RING_GAP) / Math.SQRT2;
  const layers = [1, .82, .757, .499].map((width) => square(width * half));
  c.fill("measuring-box", toPath(layers, { k: 1 }), "evenodd");
};

export const mitsuMasuOwariTsutaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  for (const [outer, inner] of [[R, 86], [81, 61.5], [56.5, 45]]) {
    const band = [square(outer / Math.SQRT2), square(inner / Math.SQRT2)];
    c.fill("measuring-box", toPath(band, { k: 1, turn: 45 }), "evenodd");
  }
  owariBuild(c, "ivy", 32.8, [0, -6]);
};
