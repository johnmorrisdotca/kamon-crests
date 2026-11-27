import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, mirrored, pieceEnd, pieceStart, reversedRun, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./hosowa-ni-mitsu-kaji-parts/layers.ts";
import { scallopedMulberryLeaf } from "./hosowa-ni-mitsu-kaji-parts/scalloped-mulberry-leaf.ts";

type Arc = Extract<Piece, { t: "A" }>;

const paper = 1.15;
const motif = "paper-mulberry";
const radians = Math.PI / 180;
const crown = { at: [0, 44.2] as V, k: .394 };
const wing = { at: [-46.5, 4.6] as V, k: .332, turn: -27 };
const wingAngle = wing.turn * radians;
const wingRoot: V = [
  wing.at[0] - 74 * wing.k * Math.sin(wingAngle),
  wing.at[1] - 74 * wing.k * Math.cos(wingAngle),
];

function tangentRun(at: V, heading: number, end: V): { arc: Arc; heading: number } {
  const x = end[0] - at[0];
  const y = end[1] - at[1];
  const normal: V = [-Math.sin(heading), Math.cos(heading)];
  const radius = (x * x + y * y) / (2 * (x * normal[0] + y * normal[1]));
  const centre: V = [at[0] + radius * normal[0], at[1] + radius * normal[1]];
  const start = heading - Math.sign(radius) * Math.PI / 2;
  const direction = Math.atan2(y, x);
  const sweep = 2 * Math.atan2(Math.sin(direction - heading), Math.cos(direction - heading));

  return { arc: arcA(centre, Math.abs(radius), start, start + sweep) as Arc, heading: heading + sweep };
}

const armMiddle: V = [-21.3, -43.3];
const approach = tangentRun([-32.5, -68.5], 48 * radians, armMiddle);
const rise = tangentRun(armMiddle, approach.heading, wingRoot);
const rail = (width: number) => [approach.arc, rise.arc].map(({ c, r, a0, a1 }) =>
  arcA(c, r - Math.sign(a1 - a0) * width, a0, a1));
const inner = rail(2.65);
const outer = reversedRun(rail(-2.65));
const arm = [
  ...inner,
  seg(pieceEnd(inner[1]), pieceStart(outer[0])),
  ...outer,
  seg(pieceEnd(outer[1]), pieceStart(inner[0])),
];
const foot = -66;
// The crown support enters the square stalk recess and ends below the first veins.
const end = crown.at[1] - 55 * crown.k + .45;
const trunk = [
  seg([-6, foot], [6, foot]),
  seg([6, foot], [3.55, -57]),
  seg([3.55, -57], [3.55, end]),
  seg([3.55, end], [-3.55, end]),
  seg([-3.55, end], [-3.55, -57]),
  seg([-3.55, -57], [-6, foot]),
];
const floor = thickSeg([-65, foot - 4], [65, foot - 4], 8);
const wooden = carve([trunk, arm, arm.map(mirrored)], [floor]);
const ring = thickArc([0, 0], 88.3, 3.3, 0, 2 * Math.PI);

export function hosowaNiMitsuKajiBuild(c: Builder): void {
  c.precision(2);
  c.group(() => {
    c.fill("frame", toPath([ring], { k: 1 }), "evenodd");
    fillPart(c, motif, wooden, { k: 1 });
    layerParts(c, () => {
      const options = { motif, paper, stalkFoot: -77 };
      scallopedMulberryLeaf.build(c, wing.at, wing.turn, wing.k * 100, options);
      scallopedMulberryLeaf.build(c, [-wing.at[0], wing.at[1]], -wing.turn, wing.k * 100, { ...options, mirror: true });
      scallopedMulberryLeaf.build(c, crown.at, 0, crown.k * 100, { ...options, keyline: paper });
    });
  });
}
