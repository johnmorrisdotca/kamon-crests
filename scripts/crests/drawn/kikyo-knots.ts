import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, lineLine, seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";

const BELLFLOWER = "bellflower";
const polar = (reach: number, angle: number): V => [reach * Math.cos(angle * DEG), reach * Math.sin(angle * DEG)];

export function itsutsuKikyoGumiBuild(c: Builder): void {
  const tip: V = [0, 96];
  const notch = polar(55, 54);
  const gap = WEIGHT.thread / 2;
  const [alongX, alongY] = polar(1, 54);
  const displaced: V = [-gap * alongY, gap * alongX];
  const shoulder = lineLine(displaced, [displaced[0] + alongX, displaced[1] + alongY], notch, tip);
  const root: V = [0, gap / alongX];
  const otherShoulder: V = [-shoulder[0], shoulder[1]];
  const petal = [seg(root, otherShoulder), seg(otherShoulder, tip), seg(tip, shoulder), seg(shoulder, root)];

  for (let i = 0; i < 5; i += 1) c.fill(BELLFLOWER, toPath([petal], { k: 1, turn: 72 * i }));
}
