import type { Builder } from "../../construct/builder.ts";
import { carve, DEG, disc, mirrored, onPage, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";
import { chrysanthemumPetal, pointedPetal } from "./kiku.ts";

const HUB: V = [0, 0];
const spoke = (radius: number, degrees: number): V => [radius * Math.sin(degrees * DEG), radius * Math.cos(degrees * DEG)];
const threeTurns = [0, 120, 240];

const leaf = (): Region[] => {
  const lobes = [[10.5, 31, 9.1], [13.8, 48, 11.6], [12, 67, 10.4], [8, 83, 8.1]];
  const curves = lobes.flatMap(([x, y, r]) => [disc([x, y], r), disc([-x, y], r)]);
  const side = lobes.slice(0, 3).map(([x, y]) => thickSeg([0, y - 9], [x + 3, y + 7], 4.1));
  const veins = [thickSeg([0, 12], [0, 93], 4.5), ...side, ...side.map((region) => region.map(mirrored))];
  return carve([pointedPetal(0, 100, 16), ...curves], veins);
};

const ovalHead = (c: Builder, place: Placing, tall: number, broad: number, count: number, heart: number): void => {
  const step = 360 / count;
  c.guideCircle(onPage(HUB, place), tall * place.k);
  c.group(() => {
    for (let i = 0; i < count; i += 1) {
      const turn = i * step;
      const [x, y] = spoke(1, turn);
      const length = 1 / Math.hypot(x / broad, y / tall);
      const { region } = chrysanthemumPetal(heart + 2, length, step / 2);
      c.fill("chrysanthemum", toPath([region], { ...place, turn: (place.turn ?? 0) + turn }));
    }
    c.fill("chrysanthemum", toPath([disc(HUB, heart)], place));
  });
};

export const ouchiKikuGurumaBuild = (c: Builder): void => {
  c.precision(2);
  c.guideCircle([100, 100], 96);
  const leaves = leaf();
  for (const angle of threeTurns) {
    const flower = angle + 60;
    const centre = spoke(60, flower);
    const base = spoke(13, angle);
    c.guideLine([100, 100], onPage(spoke(96, angle), { k: 1 }));
    c.fill("chrysanthemum", toPath([thickSeg(spoke(10, flower), centre, 5.5)], { k: 1 }));
    c.fill("chrysanthemum", toPath(leaves, { at: base, k: 0.76, turn: angle }));
    ovalHead(c, { at: centre, k: 1, turn: flower }, 33, 33.5, 10, 12.0);
  }
  c.fill("chrysanthemum", toPath([disc(HUB, 12.5)], { k: 1 }));
};
