import type { Builder } from "../../construct/builder.ts";
import { carve, DEG, disc, mirrored, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { pointedPetal } from "./kiku.ts";

const HUB: V = [0, 0];
const spoke = (radius: number, degrees: number): V => [radius * Math.sin(degrees * DEG), radius * Math.cos(degrees * DEG)];
const threeTurns = [0, 120, 240];

const leaf = (): Region[] => {
  const lobes = [[11.5, 31, 9.5], [14.5, 48, 12], [12.5, 67, 11.5], [8.3, 83, 9]];
  const curves = lobes.flatMap(([x, y, r]) => [disc([x, y], r), disc([-x, y], r)]);
  const side = lobes.slice(0, 3).map(([x, y]) => thickSeg([0, y - 9], [x + 3, y + 7], 4.1));
  const veins = [thickSeg([0, 12], [0, 93], 4.5), ...side, ...side.map((region) => region.map(mirrored))];
  return carve([pointedPetal(0, 100, 16), ...curves], veins);
};

export const hatsukiKikuGurumaBuild = (c: Builder): void => {
  c.precision(2);
  c.guideCircle([100, 100], 96);
  const leaves = leaf();
  const lengths = [46, 52, 53, 51, 53, 52, 46];
  const angles = [-77, -55, -31, 0, 31, 55, 77];
  for (const angle of threeTurns) {
    const flower = angle + 60;
    const base = spoke(47, flower);
    c.fill("chrysanthemum", toPath([thickSeg(spoke(10, flower), base, 6.5)], { k: 1 }));
    c.fill("chrysanthemum", toPath(leaves, { at: spoke(13, angle), k: 0.86, turn: angle }));
    c.group(() => lengths.forEach((length, i) => {
      const petal = pointedPetal(5.5, length, 3.6 + length / 34);
      c.fill("chrysanthemum", toPath([petal], { at: base, k: 1, turn: flower + angles[i] }));
    }));
  }
  c.fill("chrysanthemum", toPath([disc(HUB, 13.5)], { k: 1 }));
};
