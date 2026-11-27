import { arcA, onCircle, thickArc } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface BambooJointOptions extends PartOptions {
  /** Physical height of the collar. The default is 19% of its width. */
  height?: number;
}

/** A curved solid collar with circular caps, and the clear band that leaves paper beside it. */
export function bambooJointGeometry(halfWidth: number, halfHeight: number, paper = PAPER) {
  if (!Number.isFinite(halfWidth) || !Number.isFinite(halfHeight) || halfWidth <= 0 || halfHeight <= 0 || halfHeight >= halfWidth) {
    throw new Error("bamboo-joint: the collar height must be positive and smaller than its width");
  }
  const radius = 5.5 * halfWidth;
  const centre: V = [0, radius];
  const span = Math.asin((halfWidth - halfHeight) / radius);
  const from = -Math.PI / 2 - span;
  const to = -Math.PI / 2 + span;
  const ink = [
    arcA(centre, radius + halfHeight, from, to),
    arcA(onCircle(centre, radius, to), halfHeight, to, to + Math.PI),
    arcA(centre, radius - halfHeight, to, from),
    arcA(onCircle(centre, radius, from), halfHeight, from + Math.PI, from + 2 * Math.PI),
  ];
  // The clearance must span the stalk even when the collar is used at a small scale.
  const clearSpan = Math.asin(Math.min(1, (halfWidth + paper) / radius));
  const clearance = thickArc(centre, radius, 2 * (halfHeight + paper), -Math.PI / 2 - clearSpan, -Math.PI / 2 + clearSpan);

  return { ink, clearance };
}

/** Size is the collar's full width. */
export const bambooJoint = definePart<BambooJointOptions>({
  id: "bamboo-joint",
  name: { en: "Curved bamboo joint", ja: "弧を描く竹の節" },
  description: {
    en: "A solid curved collar ends in two semicircles and stands clear of the stalk above and below.",
    ja: "弧を描く節の両端を半円に丸め、上下の幹とのあいだに白いすき間を残します。",
  },
  families: ["take"],
  sources: [{ frame: 37, page: "L", row: 3, col: 2, label: "二本竹" }],
  stock: true,
  sampleSize: 125,
  sampleOptions: { motif: "bamboo" },
  build(c, centre, turn, size, { motif, keyline, height = .19 * size, paper = PAPER }) {
    const { ink } = bambooJointGeometry(size / 2, height / 2, paper);
    fillPart(c, motif, [ink], { k: 1, at: centre, turn }, keyline);
  },
});

export default bambooJoint;
