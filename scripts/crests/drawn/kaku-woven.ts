// The four interwoven square frames in the thread ring on frame 16 of the 1892 book.
import type { Builder } from "../../construct/builder.ts";
import { seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { interleave } from "./kaku.ts";

type Frame = [outer: Region, inner: Region];
const square = ([x, y]: V, half: number): Region => {
  const corners: V[] = [[x - half, y + half], [x + half, y + half], [x + half, y - half], [x - half, y - half]];

  return corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));
};

export const itowaNiYotsuKakuChigaiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thread");
  const centres: V[] = [[-34, 34], [34, 34], [34, -34], [-34, -34]];
  const weave = (extra: number): Frame[] => centres.map((centre) => [square(centre, 30 + extra), square(centre, 23.2 - extra)]);
  const joining = (extra: number): Frame[] => [[square([0, 0], 32.6 + extra), square([0, 0], 26.7 - extra)]];
  interleave(c, weave(0), joining(0), weave(1.3), joining(1.3), 45);
};
