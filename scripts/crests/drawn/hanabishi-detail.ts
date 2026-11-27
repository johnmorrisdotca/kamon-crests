import { type Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, mirrored, onCircle, reversedRun, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { outline } from "./eiraku.ts";
import { HANABISHI_FOUR, shihoHanabishiBuild } from "./hanabishi.ts";

const part = "flower-lozenge";
const quarters = [0, 90, 180, 270];
const bothSides = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];
const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

/** The angular petal crests and spade-like cuts occupy the room inside the medium ring. */
export const maruNiOniHanabishiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-medium");
  const wing = outline([
    "0,69 15,52 8,62",
    "15,52 32,58 24,56",
    "32,58 24,36 30,47",
    "24,36 0,14 14,24",
  ]);
  const petal = bothSides(wing);
  const stamen = polygon([[-1.5, 20], [1.5, 20], [1.5, 36], [5.5, 40], [0, 46], [-5.5, 40], [-1.5, 36]]);
  for (const turn of quarters) c.fill(part, toPath([petal, stamen], { k: 1, turn }), "evenodd");
  c.fill(part, toPath([disc([0, 0], 12), disc([0, 0], 2.2)], { k: 1 }), "evenodd");
};

/** A row of rear scallops is visible between the standard four-way petals. */
export const uraHanabishiBuild = (c: Builder): void => {
  c.precision(3);
  const flowerReach = 92;
  const scale = flowerReach / 100;
  const edge = Array.from({ length: 24 }, (_, i) => disc(onCircle([0, 0], 85, i * 15 * DEG), 10.8));
  const frontQuarter = HANABISHI_FOUR.lobes.map((lobe) => disc([lobe.c[0] * scale, lobe.c[1] * scale], lobe.r * scale + 2.1));
  const front = [disc([0, 0], 66 * scale), ...quarters.flatMap((turn) => frontQuarter.map((loop) => loop.map((piece) => rotated(piece, turn * DEG))))];
  c.guideCircle(C0, R);
  c.fill(part, toPath(carve([disc([0, 0], 86), ...edge], front), { k: 1 }), "evenodd");
  shihoHanabishiBuild(c, part, flowerReach);
};
