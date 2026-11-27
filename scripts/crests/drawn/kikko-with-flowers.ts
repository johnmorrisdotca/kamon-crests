import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, inside, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const hexagon = (x: number, r: number): Region => {
  const points: V[] = Array.from({ length: 6 }, (_, i) => [x + r * Math.cos(i * 60 * DEG), r * Math.sin(i * 60 * DEG)]);
  return points.map((p, i) => seg(p, points[(i + 1) % points.length]));
};
const side = 43.5;
const outer = hexagon(side, 41.5);
const channel = hexagon(side, 26);
const rim = hexagon(side, 22);
const hollow = hexagon(side, 19);
const hex = [...carve([outer], [channel]), ...carve([rim], [hollow])];

// A flatter shoulder and a narrower lower petal leave paper beside the shell.
const lip = [
  disc([0,23],10), disc([12,18],8), disc([-12,18],8), disc([0,9],15),
];
const wing = [
  disc([45,0],10), disc([34,9],11), disc([34,-9],11), disc([10,0],19),
];
const middle = disc([0,0],12);
const lines = [
  seg([-120,-67],[120,65]), seg([-120,-65],[120,67]),
  seg([-120,67],[120,-65]), seg([-120,65],[120,-67]),
];
const topStamen = [disc([26,17],27),disc([-26,17],27)];
const sideStamen = [disc([24,42],43),disc([24,-42],43)];
const petal = (borders: Region[], stamen: Region[], within: (p: V) => boolean): Region[] =>
  carveWhere([...borders, ...lines, middle, ...stamen].flat(), (p) =>
    within(p) && borders.some((region) => inside(region, p)) && !inside(middle, p) &&
    !stamen.every((region) => inside(region, p)),
  );
const vertical = petal(lip, topStamen, ([x, y]) => y > .55 * Math.abs(x) + 1);
const horizontal = petal(wing, sideStamen, ([x, y]) => Math.abs(y) < .55 * x - 1);
const button = carve([disc([0,0],10)],[disc([0,0],2.1)]);
const upperPetals = [...vertical, ...horizontal];
const lowerPetals = upperPetals.map((loop) => loop.map((piece) => rotated(piece, Math.PI)));
const bloom = [...upperPetals, ...lowerPetals, ...button];

export function itowaNiKikkoKuzushiBuild(c: Builder): void {
  c.precision(3);
  c.ring("ring-thread");
  for (const turn of [0, 180]) c.fill("tortoise-shell", toPath(hex, { k: 1, turn }), "evenodd");
  c.fill("flower-lozenge", toPath(bloom, { k: 1, at: [0, 57], turn: 0 }), "evenodd");
  c.fill("flower-lozenge", toPath(bloom, { k: 1, at: [0, -57], turn: 180 }), "evenodd");
}
