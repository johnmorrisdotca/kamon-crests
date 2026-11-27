// The alternating curls of the vine ring in frame 15 of the 1892 crest book.
import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, disc, mirrored, moved, onCircle, rotated, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const centre: V = [0, 0];
const backbone = 76;
const stemWidth = WEIGHT.thin;

const stem = (left: number, right: number, radius: number, side: number): Region => {
  const from = onCircle(centre, backbone, left * DEG);
  const to = onCircle(centre, backbone, right * DEG);
  const hint = onCircle(centre, side, ((left + right) / 2) * DEG);
  const { c } = circleThrough(from, to, radius, hint);
  const fromAngle = Math.atan2(from[1] - c[1], from[0] - c[0]);
  const toAngle = Math.atan2(to[1] - c[1], to[0] - c[0]);
  const sweep = Math.atan2(Math.sin(toAngle - fromAngle), Math.cos(toAngle - fromAngle));
  const overlap = Math.sign(sweep) * DEG;
  return thickArc(c, radius, stemWidth, fromAngle - overlap, fromAngle + sweep + overlap);
};

const returnAt = (outward: boolean): Region[] => {
  const first: V = [-8, 7];
  const radius = Math.hypot(...first);
  const start = Math.atan2(-first[1], -first[0]);
  const turn = 208 * DEG;
  const end = 362 * DEG;
  const inner = 5;
  const coil = onCircle(first, radius - inner, turn);
  const strip = [
    thickArc(first, radius, stemWidth, start - 2 * DEG, turn + 2 * DEG),
    thickArc(coil, inner, 4.5, turn - 2 * DEG, end),
    disc(onCircle(coil, inner, end), 2.25),
  ];
  return strip.map((edge) => edge.map((piece) => {
    const oriented = outward ? piece : rotated(mirrored(piece), Math.PI);
    return moved(oriented, [0, backbone]);
  }));
};


export const karakusaWaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const span = 0.98;
  c.guideCircle(C0, backbone * span);
  const sweep = [stem(90, 67.5, 23, 45), stem(67.5, 45, 49, 112)];
  const outer = returnAt(true);
  const inner = returnAt(false);
  // The first outward scroll in the book sits to the left of the upright axis.
  const phase = -8;
  for (let turn = 0; turn < 360; turn += 45) {
    c.group(() => {
      for (const edge of [...sweep, ...outer]) c.fill("curled-band", toPath([edge], { k: span, turn: turn + phase }));
      for (const edge of inner) c.fill("curled-band", toPath([edge], { k: span, turn: turn + phase + 22.5 }));
    });
  }
};
