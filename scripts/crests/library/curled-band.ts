import {
  DEG, arcA, arcTo, mirrored, onCircle, pieceEnd, reversedRun, tangentCircle, touch,
} from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";
import { curledBand as bowlGeometry } from "../drawn/quince-band.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface CurledBandOptions extends PartOptions {
  /** A simple curved bowl or a crown between two rolled shoulders. */
  profile?: "bowl" | "crown";
  /** Structural band width divided by size. */
  thickness?: number;
  /** Angle between the two tip circle centres in the bowl, in degrees. */
  sweep?: number;
}

type Arc = Extract<Piece, { t: "A" }>;
const origin: V = [0, 0];

function crownGeometry(width: number): Region[] {
  // The ratios are the crown and shoulders of 四つ唐環菱, with the crown's centre at the origin.
  const crown: Circle = { c: origin, r: 22 / 47 };
  const shoulder: Circle = { c: [28 / 47, -7 / 47], r: 15 / 47 };
  const blend = tangentCircle(crown, 1, shoulder, 1, 6.4 / 47, [.42, .36]);
  const top = onCircle(crown.c, crown.r, Math.PI / 2);
  const crownTouch = touch(crown, blend);
  const shoulderTouch = touch(shoulder, blend);
  const end = onCircle(shoulder.c, shoulder.r, -95 * DEG);
  const right = [
    arcTo(crown, top, crownTouch, false),
    arcTo(blend, crownTouch, shoulderTouch, true),
    arcTo(shoulder, shoulderTouch, end, false),
  ] as Arc[];
  const axis = [...reversedRun(right.map(mirrored)), ...right] as Arc[];
  const half = width / 2;
  const offset = (distance: number) => axis.map((arc) =>
    arcA(arc.c, arc.r + Math.sign(arc.a0 - arc.a1) * distance, arc.a0, arc.a1),
  );
  const outer = offset(half);
  const inner = reversedRun(offset(-half));
  const outerEnd = pieceEnd(outer[outer.length - 1]);
  const innerEnd = pieceEnd(inner[inner.length - 1]);
  const mirror = ([x, y]: V): V => [-x, y];
  const rightCap = arcTo({ c: end, r: half }, outerEnd, mirror(innerEnd), false);
  const leftCap = arcTo({ c: mirror(end), r: half }, innerEnd, mirror(outerEnd), false);
  return [[...outer, rightCap, ...inner, leftCap]];
}

/** Size is the outside radius of the bowl, or the same reference scale for a crowned band. */
export const curledBand = definePart<CurledBandOptions>({
  id: "curled-band",
  name: { en: "Tangent curled band", ja: "巻き端の帯" },
  description: {
    en: "A compass bowl or joined crown with rounded ends that roll into the opening.",
    ja: "弧で描く鉢形か中央に山のある帯で、丸い両端が内側へ巻き込みます。",
  },
  families: ["kan", "mokko"],
  sources: [
    { frame: 27, page: "L", row: 2, col: 1, label: "三ッくワん" },
    { frame: 27, page: "L", row: 3, col: 2, label: "四ッ唐くワんひし" },
  ],
  stock: true,
  sampleSize: 77,
  sampleOptions: { motif: "curled-band" },
  build(c, centre, turn, size, { motif, keyline, profile = "bowl", thickness = 9 / 47, sweep = 186 }) {
    if (!Number.isFinite(thickness) || thickness < .12 || thickness > .26) {
      throw new Error("curled-band: thickness must be between .12 and .26 of size");
    }
    if (!Number.isFinite(sweep) || sweep < 90 || sweep > 210) {
      throw new Error("curled-band: the bowl sweep must be between 90 and 210 degrees");
    }
    const inner: Circle = { c: origin, r: 1 - thickness };
    const bulb: Circle = {
      c: onCircle(origin, inner.r + 1 / 47, (90 - sweep / 2) * DEG),
      r: 9.7 / 47 + .75 * (thickness - 9 / 47),
    };
    const ink = profile === "crown"
      ? crownGeometry(thickness)
      : bowlGeometry({ c: origin, r: 1 }, inner, bulb, 4.8 / 47, 0);
    fillPart(c, motif, ink, { k: size, at: centre, turn }, keyline);
  },
});

export default curledBand;
