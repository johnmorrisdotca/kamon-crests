// Drawing a crest from pieces vectorised from a period crest book (scripts/crests/traced/): each piece is one part of the
// crest's fundamental half or wedge, cleaned and written once; the crest is made whole by mirroring and turning it exactly,
// so its symmetry is the construction's, not the woodblock's.
import type { Builder } from "./builder.ts";
import { parsePath } from "./geo.ts";

/** A mirror-symmetric crest from its left half: each piece is drawn with its mirror image as one step of the animation. */
export const mirrored = (c: Builder, part: string, pieces: readonly string[]): void => {
  c.precision(1);
  for (const d of pieces) {
    const left = parsePath(d);
    c.group(() => {
      c.fill(part, left, "evenodd");
      c.fill(part, left.mirror(), "evenodd");
    });
  }
};

/**
 * A crest of `n` like parts turned about the centre, each mirror-symmetric about its own axis: the pieces are the left half of
 * the part standing straight up, and each part (both halves) is one step of the animation.
 */
export const turned = (c: Builder, part: string, pieces: readonly string[], n: number): void => {
  c.precision(1);
  const halves = pieces.map(parsePath);
  for (let k = 0; k < n; k += 1) {
    const deg = (360 * k) / n;
    c.group(() => {
      for (const half of halves) {
        c.fill(part, half.rotate(deg), "evenodd");
        c.fill(part, half.mirror().rotate(deg), "evenodd");
      }
    });
  }
};
