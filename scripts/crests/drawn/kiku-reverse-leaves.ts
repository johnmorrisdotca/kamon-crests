import type { Builder } from "../../construct/builder.ts";
import { carve, DEG, disc, mirrored, onPage, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";
import { chrysanthemumPetal, pointedPetal } from "./kiku.ts";

const HUB: V = [0, 0];
const spoke = (radius: number, degrees: number): V => [radius * Math.sin(degrees * DEG), radius * Math.cos(degrees * DEG)];
const threeTurns = [0, 120, 240];

const leaf = (): Region[] => {
  const lobes = [[15, 31, 12], [19, 48, 15], [15, 67, 14], [9, 83, 10]];
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

export const mitsubaUraHonGikuBuild = (c: Builder): void => {
  c.precision(2);
  c.guideCircle([100, 100], 96);
  c.zoom(0.94);
  const leaves = leaf();
  c.group(() => {
    for (const angle of threeTurns) {
      for (const spread of [-38, 0, 40]) {
        const turn = angle + spread;
        const k = spread === 0 ? 0.65 : 0.55;
        c.fill("chrysanthemum", toPath(leaves, { at: spoke(37, turn), k, turn }));
      }
    }
  });
  ovalHead(c, { k: 1, at: [0, -4] }, 49, 52, 11, 28);
};
