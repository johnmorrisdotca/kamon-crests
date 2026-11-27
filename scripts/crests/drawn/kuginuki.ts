import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { interleave } from "./kaku.ts";

const PART = "nail-puller";
const polygon = (corners: V[]): Region => corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));
const box = (x: number, y: number): Region => polygon([[-x, y], [x, y], [x, -y], [-x, -y]]);

/** The two interlocking brackets in 違い釘抜, in their original square grid. */
const BRACKET: V[] = [[0, 0], [42, 0], [42, 14], [32, 14], [32, 10], [10, 10], [10, 32], [32, 32], [32, 28], [42, 28], [42, 42], [0, 42]];
const stood = ([u, v]: V): V => [(u - 29 + (v - 29)) / Math.SQRT2, (u - 29 - (v - 29)) / Math.SQRT2];

/** The published pair of hooked brackets, at full scale or placed in a ring. */
export const chigaiKuginukiBuild = (c: Builder, reach: number): void => {
  const placing = { k: reach / (29 * Math.SQRT2) };
  const first = BRACKET.map(stood);
  const second = first.map(([x, y]): V => [-x, -y]);
  c.guideCircle(C0, reach);
  c.guidePath(toPath([polygon(first)], placing));
  c.guidePath(toPath([polygon(second)], placing));
  c.fill(PART, toPath([polygon(first)], placing));
  c.fill(PART, toPath([polygon(second)], placing));
};

/** Frame 27, right r1c2. Two rectangular frames alternate above and below at their four crossings. */
export const kuginukiKuzushiBuild = (c: Builder): void => {
  const band = 12.5;
  const frame = (width: number, height: number, gap = 0): [Region, Region] => [
    box(width + gap, height + gap),
    box(width - band - gap, height - band - gap),
  ];
  interleave(c, [frame(90, 30)], [frame(48, 65)], [frame(90, 30, 1.6)], [frame(48, 65, 1.6)], 0, PART);
};
