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
