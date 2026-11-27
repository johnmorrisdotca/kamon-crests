import { DEG, carve, disc, thickSeg } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface TwigOptions extends PartOptions {
  /** Leave the middle prong when there are three. */
  branches?: 2 | 3;
  /** Position of the split from the base, as a fraction of the length. */
  forkAt?: number;
  /** Full stem width divided by the length. */
  width?: number;
  /** Clockwise turn from upright to the right prong, in degrees. */
  spread?: number;
  /** Side prong length relative to the middle prong. */
  sideReach?: number;
  /** Optional round end, in crest units. */
  tipRadius?: number;
}

/** Size is the distance from the base to the middle tip before the part turns. */
export const twigFork = definePart<TwigOptions>({
  id: "twig-fork",
  name: { en: "Forked twig", ja: "先の分かれた小枝" },
  description: { en: "A ruled stem divides into two matching side prongs and an optional upright prong.", ja: "定規で引いた茎を左右同じ形の枝に分けます。中央にも一本置けます。" },
  families: ["sasa", "yukiwa"],
  sources: [
    { frame: 38, page: "R", row: 2, col: 1, label: "笹くるま" },
    { frame: 41, page: "L", row: 4, col: 2, label: "つららゆきワ" },
  ],
  stock: true,
  sampleSize: 146,
  sampleOptions: { motif: "bamboo-grass" },
  build(c, centre, turn, size, { motif, keyline, branches = 3, forkAt = .67, width = .057, spread = 44, sideReach = .78, tipRadius = 0 }) {
    if (![forkAt, width, spread, sideReach, tipRadius].every(Number.isFinite) || forkAt <= 0 || forkAt >= 1 || width <= 0 || width >= .5 || spread <= 0 || spread >= 90 || sideReach <= 0 || tipRadius < 0) {
      throw new Error("twig-fork: invalid fork, width, spread or prong dimensions");
    }
    const base: V = [0, -.5];
    const fork: V = [0, forkAt - .5];
    const reach = (1 - forkAt) * sideReach;
    const x = reach * Math.sin(spread * DEG);
    const y = fork[1] + reach * Math.cos(spread * DEG);
    const ends: V[] = [[-x, y], [x, y]];
    if (branches === 3) ends.push([0, .5]);

    const stems = [thickSeg(base, fork, width), ...ends.map((end) => thickSeg(fork, end, width))];
    const caps = tipRadius === 0 ? [] : ends.map((end) => disc(end, tipRadius / size));
    fillPart(c, motif, carve([...stems, ...caps], []), { k: size, at: centre, turn }, keyline);
  },
});

export default twigFork;
