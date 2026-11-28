import type { Builder } from "../../construct/builder.ts";
import {
  DEG, angleOf, arcA, arcTo, circleCircle, nearest, onCircle, onPage, pieceEnd, pieceStart,
  reversed, shortArc, vadd, vmul, vsub,
} from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { turn as rotate } from "../../construct/geo.ts";
import { foamFinger } from "../library/foam-finger.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { RIM, comma, head, swirl } from "../tomoe.ts";

const SCALE = .95;
const PAPER = 1.15;
const CROWN = head(0);
const RAIL = 23;
const CROWN_ENTRY = -7;
const CROWN_EXIT = -150;
const TRANSITION = 23;
const FOAM_ANGLES = [-28, -72, -116];
const FOAM_RADIUS = 12;
const BANDS = [[6, -5], [14, -20], [23, -39]] as const;

// Keep the tomoe's tail point and enlarge the circle within it to open the channel between adjacent arms.
const [rim, commaHead, commaTail] = comma(0);
const under = swirl(-120);
const CHANNEL_RADIUS = 69;
const channel = { c: vmul(under.c, (RIM.r - CHANNEL_RADIUS) / (RIM.r - under.r)), r: CHANNEL_RADIUS };
const headEnd = nearest(circleCircle(CROWN.c, CROWN.r, channel.c, channel.r), pieceEnd(commaHead));
const dot = (a: V, b: V): number => a[0] * b[0] + a[1] * b[1];

function tangentArc(from: V, to: V, direction: V) {
  const normal: V = [-direction[1], direction[0]];
  const chord = vsub(to, from);
  const offset = dot(chord, chord) / (2 * dot(chord, normal));
  return shortArc({ c: vadd(from, vmul(normal, offset)), r: Math.abs(offset) }, from, to);
}

/** Join the head and its smaller foam rail with two arcs sharing the tangent at their meeting point. */
function shoulder(start: number, r0: number, end: number, r1: number): Region {
  const a = onCircle(CROWN.c, r0, start * DEG);
  const b = onCircle(CROWN.c, r1, end * DEG);
  const u = onCircle(RIM.c, 1, (start - 90) * DEG);
  const v = onCircle(RIM.c, 1, (end - 90) * DEG);
  const chord = vsub(b, a);
  const square = dot(chord, chord);
  const along = dot(chord, vadd(u, v));
  const distance = square / (along + Math.sqrt(along * along + 2 * (1 - dot(u, v)) * square));
  const join = vmul(vadd(vadd(a, b), vmul(vsub(u, v), distance)), .5);
  return [tangentArc(a, join, u), reversed(tangentArc(b, join, vmul(v, -1)))];
}

/** Equal-width paper between parallel circles, with two semicircles closing its ends. */
function band(offset: number, end: number): Region {
  const half = PAPER / (2 * SCALE);
  const rimRadius = RIM.r - offset;
  const headRadius = CROWN.r - offset;
  const crossing = nearest(
    circleCircle(RIM.c, rimRadius - half, channel.c, channel.r),
    onCircle(RIM.c, rimRadius - half, 160 * DEG),
  );
  const start = angleOf(RIM.c, crossing) - 3 * DEG;
  const finish = end * DEG;
  const top = Math.PI / 2;
  const outerRim = arcA(RIM.c, rimRadius + half, start, top);
  const outerHead = arcA(CROWN.c, headRadius + half, top, finish);
  const innerHead = arcA(CROWN.c, headRadius - half, finish, top);
  const innerRim = arcA(RIM.c, rimRadius - half, top, start);
  const headCap = arcTo(
    { c: onCircle(CROWN.c, headRadius, finish), r: half }, pieceEnd(outerHead), pieceStart(innerHead), false,
  );
  const tailCap = arcTo(
    { c: onCircle(RIM.c, rimRadius, start), r: half }, pieceEnd(innerRim), pieceStart(outerRim), false,
  );
  return [outerRim, outerHead, headCap, innerHead, innerRim, tailCap];
}

export function namiDomoeBuild(c: Builder): void {
  const entry = CROWN_ENTRY - TRANSITION;
  const exit = CROWN_EXIT + TRANSITION;
  const arm: Region = [
    rim,
    arcA(CROWN.c, CROWN.r, Math.PI / 2, CROWN_ENTRY * DEG),
    ...shoulder(CROWN_ENTRY, CROWN.r, entry, RAIL),
    arcA(CROWN.c, RAIL, entry * DEG, exit * DEG),
    ...shoulder(exit, RAIL, CROWN_EXIT, CROWN.r),
    arcTo(CROWN, onCircle(CROWN.c, CROWN.r, CROWN_EXIT * DEG), headEnd, false),
    arcTo(channel, headEnd, pieceEnd(commaTail), true),
  ];
  const ink = [arm, ...BANDS.map(([offset, end]) => band(offset, end))];

  c.precision(3);
  c.guideCircle(onPage(RIM.c, { k: SCALE }), RIM.r * SCALE);
  c.guideSpokes(3, 0, RIM.r * SCALE);
  for (const turn of [0, 120, 240]) {
    const place = { k: SCALE, turn };
    c.group(() => {
      for (const circle of [CROWN, channel, { c: CROWN.c, r: RAIL }]) {
        c.guideCircle(onPage(circle.c, place), SCALE * circle.r);
      }
      fillPart(c, "wave", ink, place);
      layerParts(c, () => {
        for (const angle of FOAM_ANGLES) {
          const root = vmul(onCircle(CROWN.c, RAIL, angle * DEG), SCALE);
          const at = rotate(root, -turn, RIM.c);
          foamFinger.build(c, at, turn - 90 - angle, FOAM_RADIUS * SCALE, {
            motif: "wave", sweep: 231, inner: .46, keyline: PAPER,
          });
        }
      });
    });
  }
}
