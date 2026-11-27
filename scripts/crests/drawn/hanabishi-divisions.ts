import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, inside, mirrored, onCircle, reversedRun, rotated, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { outline } from "./eiraku.ts";
import { shihoHanabishiBuild } from "./hanabishi.ts";

const part = "flower-lozenge";
const quarters = [0, 90, 180, 270];
const thirds = [0, 120, 240];
const origin: V = [0, 0];

const turn = (region: Region, angle: number): Region => region.map((edge) => rotated(edge, angle * DEG));

/** A three-lobed flower panel begins at the rim and points in toward the open field. */
const half = outline([
  "0,108 49,67 29,94",
  "49,67 37,53 45,57",
  "37,53 18,48 27,49",
  "18,48 12,37 19,41",
  "12,37 0,31 7,33",
]);
const lobes = [...half, ...reversedRun(half.map(mirrored))];
const cuts = [disc([0, 98], 11), thickSeg([0, 91], [0, 62], 1.8), thickSeg([5, 95], [34, 71], 1.8), thickSeg([-5, 95], [-34, 71], 1.8)];

/** Resize first, then clip the panel on the circle or the four ruled sides of the field. */
const panel = (k: number, lift: number, fence: Region): Region[] => {
  const place = (loop: Region): Region => loop.map((piece) => {
    const moved = ([x, y]: V): V => [x * k, y * k + lift];
    return piece.t === "L" ? seg(moved(piece.a), moved(piece.b)) : { ...piece, c: moved(piece.c), r: piece.r * k };
  });
  const body = place(lobes);
  const white = cuts.map(place);
  return carveWhere([...body, ...fence, ...white.flat()], (p) => inside(fence, p) && inside(body, p) && !white.some((one) => inside(one, p)));
};

const circleLine = (): Region[] => [disc(origin, R), disc(origin, R - 2.7)];
/** Three small curved arms fill the field between adjacent outer panels. */
const scroll = (): Region[] => {
  const hooked = thickArc([4.5, 6], 5.8, 2.2, -142 * DEG, 116 * DEG);
  return carve(thirds.map((angle) => turn(hooked, angle)), []);
};

export const hanabishiFusenRyoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(8);
  const section = panel(.65, 34, disc(origin, R - 2.7));
  const curls = scroll();
  c.fill(part, toPath(circleLine(), { k: 1 }), "evenodd");
  for (const angle of quarters) {
    c.fill(part, toPath(section, { k: 1, turn: angle }), "evenodd");
    c.fill(part, toPath(curls, { k: 1, at: onCircle(origin, 57, (45 - angle) * DEG), turn: angle }), "evenodd");
  }
  shihoHanabishiBuild(c, part, 45);
};
