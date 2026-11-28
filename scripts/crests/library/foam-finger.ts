import { arcA, arcTo, DEG, onCircle, pieceEnd, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface FoamOptions extends PartOptions {
  /** How far the hook curls round from its root, in degrees. */
  sweep?: number;
  /** Radius of the inside arc divided by the radius of the outside arc. */
  inner?: number;
  mirror?: boolean;
}

/** The complete unplaced hook, with its outer root at the origin and pointing right. */
export function foamFingerOutline(sweep = 235, inner = .55): Region {
  if (!Number.isFinite(sweep) || sweep <= 180 || sweep >= 300 || !Number.isFinite(inner) || inner <= 0 || inner >= 1) {
    throw new Error("foam-finger: sweep must be between 180 and 300 degrees and the inner radius ratio between zero and one");
  }
  const start = Math.PI / 2;
  const end = start - sweep * DEG;
  const outside: V = [0, -1];
  const inside = onCircle(outside, 1 - inner, end);
  const outer = arcA(outside, 1, start, end);
  const innerArc = arcA(inside, inner, end, start);
  const root: V = [0, 0];
  const innerRoot = pieceEnd(innerArc);
  // Ease off the inner circle's horizontal tangent and into the swell beneath the rim.
  const heel: V = [innerRoot[0] - inner, .22];
  const height = heel[1] - innerRoot[1];
  const rootRadius = (inner * inner + height * height) / (2 * height);
  const bank = arcTo({ c: [innerRoot[0], innerRoot[1] + rootRadius], r: rootRadius }, innerRoot, heel, false);
  return [outer, innerArc, bank, seg(heel, root)];
}

/** Size is the outside radius. The centre is the outer root, with its tangent pointing right when unturned. */
export const foamFinger = definePart<FoamOptions>({
  id: "foam-finger",
  name: { en: "Wave foam finger", ja: "波頭の巻き" },
  description: {
    en: "A broad-rooted hook that rolls under towards a narrowing tip where its two circles touch.",
    ja: "広い付け根から内側へ巻き込み、二つの円が接する先で細くなる波頭です。",
  },
  families: ["nami"],
  sources: [
    { frame: 23, page: "L", row: 2, col: 2, label: "三ッワリなみ" },
    { frame: 23, page: "L", row: 2, col: 1, label: "おひかけなみ" },
    { frame: 23, page: "L", row: 4, col: 1, label: "浪ともゑ" },
  ],
  stock: true,
  sampleSize: 39,
  sampleOptions: { motif: "wave" },
  // The lower right curl in 三ッワリなみ turns about two thirds of a circle; its return is about half as wide.
  build(c, centre, turn, size, { motif, keyline, sweep, inner, mirror = false }) {
    fillPart(c, motif, [foamFingerOutline(sweep, inner)], { k: size, at: centre, turn, mirror }, keyline);
  },
});

export default foamFinger;
