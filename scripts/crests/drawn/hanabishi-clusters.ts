import type { Builder } from "../../construct/builder.ts";
import { DEG, carveWhere, disc, inside, mirrored, reversedRun, rotated, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Region } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { outline } from "./eiraku.ts";
import { HANABISHI_SIDE } from "./hanabishi.ts";

const part = "flower-lozenge";
const quarters = [0, 90, 180, 270];
const atTurn = (loop: Region, turn: number): Region => loop.map((piece) => rotated(piece, turn * DEG));
const symmetric = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];

export const hanabishiKuzushiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(8);
  const quarter = outline([
    "0,92 20,66 13,82",
    "20,66 61,52 44,64",
    "61,52 68,19 68,37",
    "68,19 92,0 82,13",
  ]);
  const perimeter = quarters.flatMap((turn) => atTurn(quarter, -turn));
  const eye = symmetric(outline(["0,39 0,66 6,52"]));
  const eyes = quarters.map((turn) => atTurn(eye, turn + 45));
  c.fill(part, toPath([perimeter, ...eyes], { k: 1 }), "evenodd");
};

const outerTie = symmetric(outline([
  "0,56 16,66 7,63",
  "16,66 37,56 29,64",
  "37,56 40,39 41,48",
  "40,39 24,24 34,31",
  "24,24 0,9 11,16",
]));
const innerTie = symmetric(outline([
  "0,50 11,42 1,44",
  "11,42 16,48 15,44",
  "16,48 13,52 13,49",
  "13,52 27,57 20,58",
  "27,57 34,44 34,53",
  "34,44 21,30 29,36",
  "21,30 0,16 11,25",
]));

/** The plain side petal is kept, with the other pair replaced by open tied loops. */
export const musubiHanabishiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(4);
  const lobes = [{ c: [0, 0] as const, r: 67 }, ...HANABISHI_SIDE.lobes];
  const circles = lobes.flatMap((circle) => disc([...circle.c], circle.r));
  const slots = symmetric(outline(["0,17 0,40 2.4,31"]));
  const eye = atTurn(slots, -90);
  const seams = [seg([14, -200], [14, 200]), seg([-6, -2], [103, 75]), seg([-6, 2], [103, -75])];
  const petal = carveWhere([...circles, ...eye, ...seams], (p) => p[0] > 14 && Math.abs(p[1]) < (p[0] + 6) * (77 / 109) - 2 && lobes.some((one) => vdist(p, [...one.c]) < one.r) && !inside(eye, p));
  for (const turn of [0, 180]) {
    c.fill(part, toPath(petal, { k: .96, turn }), "evenodd");
    c.fill(part, toPath([outerTie, innerTie], { k: .96, turn }), "evenodd");
  }
  c.fill(part, toPath([disc([0, 0], 10.8), disc([0, 0], 1.8)], { k: 1 }), "evenodd");
};
