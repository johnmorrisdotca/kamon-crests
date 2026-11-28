// The vine arabesque flower in the 1892 book: the plain flower with a forked vine laid along each gap between its petals.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, disc } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { vineFork } from "../library/vine-fork.ts";
import { FIVE_LOBES, petalRegion } from "./karahana.ts";

const FLOWER = "karahana";
const HEART = 12;
// The petals reach 94 where the vines reach 100.
const PETALS = 0.94;
const VINE_ROOT = 8;

export function tsuruKarahanaBuild(c: Builder): void {
  c.precision(3);
  const k = R / 100;
  const petal = petalRegion(FIVE_LOBES, 5);
  const length = (100 - VINE_ROOT) * k;
  const middle = (100 + VINE_ROOT) / 2 * k;

  c.guideCircle(C0, R);
  c.guideSpokes(10, 0, R);
  layerParts(c, () => {
    for (let i = 0; i < 5; i += 1) fillPart(c, FLOWER, petal, { k: k * PETALS, turn: 72 * i });
    for (let i = 0; i < 5; i += 1) {
      const turn = 36 + 72 * i;
      const at: V = [middle * Math.sin(turn * DEG), middle * Math.cos(turn * DEG)];
      vineFork.build(c, at, turn, length, { motif: FLOWER, keyline: PAPER, width: 0.065, stem: 0.78 });
    }
    fillPart(c, FLOWER, [disc([0, 0], HEART)], { k: k * PETALS }, PAPER);
  });
}
