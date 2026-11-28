import {
  DEG, angleOf, arcA, arcTo, carve, moved, onCircle, pieceEnd, pieceStart, rotated, seg, shortArc, thickArc, touch, vmul,
} from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { foamFingerOutline } from "./foam-finger.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface CurvedSwell {
  /** Signed clockwise sweep of the bank, in degrees. Negative mirrors the bank. */
  sweep: number;
  /** Width of the bank divided by its outside radius. */
  width: number;
  /** Start the bank at full width for an arch; otherwise the two edges touch at its tail. */
  roundTail?: boolean;
  /** Fit the curls to the outer bank, or along the inner lip of the opening. */
  curlSide?: "outer" | "inner";
  /** Stations measured along the chosen lip from the tail, and curl radii in crest units. */
  fingers?: readonly { station: number; radius: number }[];
}

interface SwellOptions extends PartOptions {
  /** Height of the upper swell divided by the distance between its two ends. */
  rise?: number;
  /** Depth of the lower bank divided by the same distance. */
  dip?: number;
  /** Paper arcs running just inside the upper swell. */
  bands?: 0 | 1 | 2 | 3;
  curve?: CurvedSwell;
}

const origin: V = [0, 0];

/** The circle standing a signed height above or below a unit chord. */
function bank(height: number): Circle {
  const r = (.25 + height * height) / (2 * Math.abs(height));
  return { c: [0, height - Math.sign(height) * r], r };
}

function curvedOutline(span: number, width: number, roundTail: boolean) {
  const inner: Circle = { c: [roundTail ? 0 : width, 0], r: 1 - width };
  const outer = arcA(origin, 1, 0, -span);
  const cosine = Math.cos(span);
  const capRadius = roundTail ? width / 2 : width * (1 - cosine) / (2 - width * (1 + cosine));
  const head: Circle = { c: onCircle(origin, 1 - capRadius, -span), r: capRadius };
  const innerEnd = touch(inner, head);
  const innerAngle = angleOf(inner.c, innerEnd);
  const returnArc = arcA(inner.c, inner.r, innerAngle, 0);
  const cap = arcTo(head, pieceEnd(outer), innerEnd, false);
  const edges = [outer, cap, returnArc];
  if (roundTail) {
    const tail = { c: [1 - width / 2, 0] as V, r: width / 2 };
    edges.push(arcTo(tail, pieceEnd(returnArc), pieceStart(outer), false));
  }
  return { edges, inner, innerAngle };
}

function foamAt(rail: Circle, angle: number, size: number, inward: boolean): Region {
  const root = onCircle(rail.c, rail.r, angle);
  const tangent = angle + (inward ? -Math.PI / 2 : Math.PI / 2);
  return foamFingerOutline(231, .46).map((edge) => {
    const scaled = edge.t === "L"
      ? seg(vmul(edge.a, size), vmul(edge.b, size))
      : arcA(vmul(edge.c, size), edge.r * size, edge.a0, edge.a1);
    return moved(rotated(scaled, tangent), root);
  });
}

function curvedPaper(radius: number, width: number, from: number, to: number): Region {
  const half = width / 2;
  const outer = arcA(origin, radius + half, -from, -to);
  const inner = arcA(origin, radius - half, -to, -from);
  const head = { c: onCircle(origin, radius, -to), r: half };
  const tail = { c: onCircle(origin, radius, -from), r: half };
  return [
    outer, arcTo(head, pieceEnd(outer), pieceStart(inner), false),
    inner, arcTo(tail, pieceEnd(inner), pieceStart(outer), false),
  ];
}

function curvedSwell(curve: CurvedSwell, size: number, paper: number, count: number): Region[] {
  const { sweep, width, roundTail = false, curlSide = "outer", fingers = [] } = curve;
  const span = Math.abs(sweep) * DEG;
  if (!Number.isFinite(span) || span < 45 * DEG || span > Math.PI
    || !Number.isFinite(width) || width <= 0 || width >= .5) {
    throw new Error("wave-swell: use a 45–180 degree sweep and a width under half the radius");
  }
  const { edges, inner, innerAngle } = curvedOutline(span, width, roundTail);
  const cuts: Region[] = [];
  const step = Math.max(1.5 * paper, .19 * width);
  for (let i = 1; i <= count; i += 1) {
    const radius = 1 - i * step;
    const edge = radius - paper / 2;
    if (edge <= 1 - width) throw new Error("wave-swell: the paper lines do not fit the bank");
    // The pointed bank opens gradually. The inside of each line must clear the displaced inner circle.
    const cosine = (edge * edge + width * width - (1 - width) ** 2) / (2 * edge * width);
    const clearance = roundTail ? 0 : Math.acos(Math.max(-1, Math.min(1, cosine)));
    const from = Math.max(.12 * span, clearance + paper);
    const to = span - Math.max(.11 * span, 2 * paper);
    if (from >= to) throw new Error("wave-swell: the paper lines do not fit the sweep");
    cuts.push(curvedPaper(radius, paper, from, to));
  }
  const inward = curlSide === "inner";
  const rail = inward ? inner : { c: origin, r: 1 };
  const end = inward ? innerAngle : -span;
  const foam = fingers.map(({ station, radius }) => {
    if (!Number.isFinite(station) || station <= 0 || station > 1
      || !Number.isFinite(radius) || radius <= 0 || radius >= .4 * size) {
      throw new Error("wave-swell: place each curl along the bank and size it under .4 of the outside radius");
    }
    return foamAt(rail, end * station, radius / size, inward);
  });
  return foam.length === 0 ? [edges, ...cuts] : carve([edges, ...foam], cuts);
}

/** Size is the distance between the ends, or the curved bank's outside radius with its tail on the right. */
export const waveSwell = definePart<SwellOptions>({
  id: "wave-swell",
  name: { en: "Wave swell", ja: "波のうねり" },
  description: {
    en: "A rounded swell or long turning bank with parallel paper lines and tangent foam curls.",
    ja: "丸い盛り上がり、または長く曲がる波です。平行な白い波筋と、弧に接する巻きを入れられます。",
  },
  families: ["nami"],
  sources: [
    { frame: 23, page: "L", row: 2, col: 1, label: "おひかけなみ" },
    { frame: 23, page: "L", row: 2, col: 2, label: "三ッワリなみ" },
    { frame: 23, page: "L", row: 1, col: 1, label: "立ち波兎" },
    { frame: 23, page: "L", row: 4, col: 1, label: "浪ともゑ" },
  ],
  stock: true,
  sampleSize: 150,
  sampleOptions: { motif: "wave", bands: 2 },
  // The lower bank and rise of the swelling arm in おひかけなみ together cover about half its span.
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, rise = .40, dip = .12, bands = 2, curve }) {
    if (curve !== undefined) {
      const ink = curvedSwell(curve, size, paper / size, bands);
      fillPart(c, motif, ink, { k: size, at: centre, turn, mirror: curve.sweep < 0 }, keyline);
      return;
    }
    if (!Number.isFinite(rise) || !Number.isFinite(dip) || rise <= 0 || rise >= .5 || dip <= 0 || dip >= .5) {
      throw new Error("wave-swell: the rise and dip must be between zero and half the span");
    }
    const right: V = [.5, 0];
    const left: V = [-.5, 0];
    const crown = bank(rise);
    const start = Math.atan2(-crown.c[1], .5);
    const end = Math.PI - start;
    const outline = [arcA(crown.c, crown.r, start, end), shortArc(bank(-dip), left, right)];
    const cuts: Region[] = [];
    const localPaper = paper / size;
    if (bands > 0 && localPaper >= rise * .22) throw new Error("wave-swell: the paper lines are too wide for this rise");
    for (let i = 0; i < bands; i += 1) {
      const radius = crown.r - rise * (.23 + i * .22);
      const margin = (end - start) * (.14 + i * .06);
      cuts.push(thickArc(crown.c, radius, localPaper, start + margin, end - margin));
    }

    fillPart(c, motif, [outline, ...cuts], { k: size, at: centre, turn }, keyline);
  },
});

export default waveSwell;
