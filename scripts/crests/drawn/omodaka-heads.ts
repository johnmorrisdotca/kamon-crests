// The three standing water plantains, 三つ立ち沢瀉, struck and ruled in their own frame: the centre at (0, 0), x to the right, y up, the
// layout circle at 100. Their proportions were measured from the crest book of 1892 (伊呂波分新撰紋帳, frame 14, 三ッ立ちおもだか).
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, circleThrough, disc, seg, thickArc, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: the vein of a lobe, the ring round a head's middle, and the gap round a piece that lies over another. */
const LINE = 2;
/** What one crest of three heads is made of. */
interface Heads {
  /** The small ring each head stands on, and where each of its three lobes ends; the central head first. */
  heads: { ring: V; tips: V[] }[];
  /** A lobe is the lens between two arcs; its half-width is this fraction of its length. */
  width: number;
  /** The stalk: a bar this wide, at this x, from its foot up to this level. */
  stalk: { x: number; half: number; foot: number; top: number };
  /** The band behind the heads: a band of this width along an arc of this circle, between these angles. */
  bowl: { c: V; r: number; width: number; from: number; to: number };
  /** The sprays: each a stem from one end to the other, and the round florets on it. */
  sprays?: { stem: [V, V]; florets: V[] }[];
}

const TACHI: Heads = {
  heads: [
    { ring: [-5, 27], tips: [[-1, 99], [-44, -6], [38, -5]] },
    { ring: [-53, -9], tips: [[-59, 51], [-81, -49], [-21, -36]] },
    { ring: [45, -12], tips: [[49, 44], [79, -54], [10, -43]] },
  ],
  width: 0.26,
  stalk: { x: -4, half: 4.5, foot: -83, top: 24 },
  bowl: { c: [0, -20], r: 49, width: 7, from: 188, to: 352 },
};

const SPRAYED: Heads = {
  heads: [
    { ring: [-3, -2], tips: [[-1, 64], [-51, -50], [50, -50]] },
    { ring: [-52, 10], tips: [[-52, 78], [-79, -35], [-46, -17]] },
    { ring: [52, -3], tips: [[51, 70], [85, -44], [40, -17]] },
  ],
  width: 0.18,
  stalk: { x: -3, half: 4, foot: -76, top: -2 },
  bowl: { c: [0, -8], r: 46, width: 3.5, from: 205, to: 335 },
  sprays: [
    { stem: [[-58, 10], [-80, 40]], florets: [[-80, 40], [-71, 35], [-86, 29], [-69, 24], [-86, 16]] },
    { stem: [[-28, 0], [-30, 37]], florets: [[-30, 37], [-37, 29], [-22, 32], [-35, 17], [-21, 14]] },
    { stem: [[25, 2], [26, 35]], florets: [[26, 35], [17, 28], [31, 24], [15, 17], [31, 12]] },
    { stem: [[56, -3], [76, 38]], florets: [[76, 38], [84, 27], [66, 30], [82, 15], [65, 16]] },
  ],
};

/** A white line: the vein of a lobe, the ring round a head's middle, and the gap round a piece that lies over another. */
const FLORET = 4.5;
const SPRAY_STEM = 2.4;

/** The lens from a ring to a tip, `grow` wider all round. */
const lobe = (from: V, to: V, width: number, grow: number): Region[] => {
  const len = vdist(from, to);
  const half = width * len;
  const r = (half * half + (len / 2) * (len / 2)) / (2 * half);
  const mid: V = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
  const across: V = [-(to[1] - from[1]), to[0] - from[0]];
  const a = circleThrough(from, to, r, [mid[0] + across[0], mid[1] + across[1]]);
  const b = circleThrough(from, to, r, [mid[0] - across[0], mid[1] - across[1]]);
  const circles: Circle[] = [a, b].map((circ) => ({ c: circ.c, r: circ.r + grow }));

  return carveWhere(circles.flatMap((circ) => disc(circ.c, circ.r)), (p) => circles.every((circ) => vdist(circ.c, p) < circ.r));
};

const threeHeads = (c: Builder, part: string, reach: number, spec: Heads): void => {
  const placing: Placing = { k: reach / 100 };
  const ringWhite = 6.5;
  const { heads: places, width, stalk: post, bowl: arc } = spec;
  const heads = places.map(({ ring, tips }) =>
    tips.flatMap((tip): Region[] => {
      const end = [ring[0] + (tip[0] - ring[0]) * 0.9, ring[1] + (tip[1] - ring[1]) * 0.9] as V;

      return carve(lobe(ring, tip, width, 0), [thickSeg(ring, end, LINE), disc(ring, ringWhite)]);
    }),
  );
  const around = (at: number): Region[] => places[at].tips.flatMap((tip) => lobe(places[at].ring, tip, width, LINE));
  const bowl = thickArc(arc.c, arc.r, arc.width, arc.from * DEG, arc.to * DEG);
  const bar: Region = [seg([post.x - post.half, post.foot], [post.x + post.half, post.foot]), seg([post.x + post.half, post.foot], [post.x + post.half, post.top]), seg([post.x + post.half, post.top], [post.x - post.half, post.top]), seg([post.x - post.half, post.top], [post.x - post.half, post.foot])];
  const every = [0, 1, 2].flatMap(around);
  const stalk = carve([bar], [...around(0), disc(places[0].ring, ringWhite + LINE)]);
  const band = carve([bowl], every);
  c.fill(part, toPath(longLast(band), placing));
  c.fill(part, toPath(longLast(stalk), placing));
  for (const { stem, florets } of spec.sprays ?? []) {
    // Each floret hangs from the nearest point of the stem by a twig.
    const [a, b] = stem;
    const along = (p: V): V => {
      const d: V = [b[0] - a[0], b[1] - a[1]];
      const t = Math.min(1, Math.max(0, ((p[0] - a[0]) * d[0] + (p[1] - a[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1])));

      return [a[0] + d[0] * t, a[1] + d[1] * t];
    };
    const stems = [thickSeg(a, b, SPRAY_STEM), ...florets.flatMap((at) => (vdist(along(at), at) > FLORET ? [thickSeg(along(at), at, SPRAY_STEM)] : [])), ...florets.map((at) => disc(at, FLORET))];
    c.fill(part, toPath(longLast(carve(stems, [...every, ...places.map(({ ring }) => disc(ring, ringWhite + LINE))])), placing));
  }
  for (const [at, loops] of heads.entries()) {
    // A side head's lobes are cut a white line short of the central head's, which lies over them.
    for (const one of at === 0 ? loops.map((r) => [r]) : loops.map((r) => carve([r], around(0)))) if (one.length > 0) c.fill(part, toPath(longLast(one), placing));
    c.fill(part, toPath([disc(places[at].ring, ringWhite - LINE)], placing));
  }
};

/**
 * Three standing water plantains, 三つ立ち沢瀉: three heads of three pointed lobes each, a white vein up each lobe and a small ring where
 * a head's lobes meet; a long bar for the stalk, up the middle, and a curved band behind the heads. The band is built first, then the
 * stalk, then the central head, then the left and the right one where they stand, each cut a white line short of the band behind it.
 */
export const mitsuTachiOmodakaBuild = (c: Builder, part: string, reach: number): void => threeHeads(c, part, reach, TACHI);

/**
 * Three water plantains with sprays, 三つ沢瀉: a central head, larger and lower, over two heads that stand higher on each side, a
 * spray of five round florets on a stem each side of each of the side heads, a thin curved band behind and a stalk under the middle.
 */
export const mitsuOmodakaBuild = (c: Builder, part: string, reach: number): void => threeHeads(c, part, reach, SPRAYED);
