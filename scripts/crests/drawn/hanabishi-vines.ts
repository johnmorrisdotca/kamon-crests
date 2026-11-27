import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, carveWhere, DEG, disc, inside, mirrored, onCircle, reversedRun, rotated, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { HANABISHI_UP } from "./hanabishi.ts";

const PAPER = 2;
const CENTRE = 11;
const VINE_WIDTH = 5.8;
const FORK_RADIUS = 2.8;
const DIAGONAL = Math.PI / 4;
const MIDDLE = CENTRE + PAPER;
const ORIGIN: V = [0, 0];

// The first curve leaves the ruled stem along its tangent. Each smaller circle starts on the
// same normal as the previous one ends on, so the two edges retain their common tangent too.
const BEND: Circle = { c: [66, 30], r: 30 };
const TURN_TO_CURL = 34 * DEG;
const TURN_TO_TIP = 165 * DEG;
const END_TURN = 320 * DEG;
const normal = (turn: number): number => turn - Math.PI / 2;
const nextCircle = (previous: Circle, turn: number, radius: number): Circle => ({
  c: onCircle(previous.c, previous.r - radius, normal(turn)),
  r: radius,
});
const CURL = nextCircle(BEND, TURN_TO_CURL, 8.8);
const TIP = nextCircle(CURL, TURN_TO_TIP, 5.6);
const TIP_CENTRE = onCircle(TIP.c, TIP.r, normal(END_TURN));

const vine = (clearance = 0): Region => {
  const half = VINE_WIDTH / 2 + clearance;
  const forkRadius = FORK_RADIUS - clearance;
  const forkX = BEND.c[0] + Math.sqrt((BEND.r + half + forkRadius) ** 2 - BEND.r ** 2);
  const forkTurn = Math.atan2(forkX - BEND.c[0], BEND.r);
  const rootX = Math.sqrt(MIDDLE ** 2 - half ** 2);
  const rootTurn = Math.asin(half / MIDDLE);
  const halfOutline: Region = [
    seg([rootX, half], [BEND.c[0], half]),
    arcA(BEND.c, BEND.r - half, normal(0), normal(TURN_TO_CURL)),
    arcA(CURL.c, CURL.r - half, normal(TURN_TO_CURL), normal(TURN_TO_TIP)),
    arcA(TIP.c, TIP.r - half, normal(TURN_TO_TIP), normal(END_TURN)),
    arcA(TIP_CENTRE, half, normal(END_TURN) + Math.PI, normal(END_TURN)),
    arcA(TIP.c, TIP.r + half, normal(END_TURN), normal(TURN_TO_TIP)),
    arcA(CURL.c, CURL.r + half, normal(TURN_TO_TIP), normal(TURN_TO_CURL)),
    arcA(BEND.c, BEND.r + half, normal(TURN_TO_CURL), normal(forkTurn)),
  ];

  return [
    ...halfOutline,
    arcA([forkX, 0], forkRadius, normal(forkTurn) + Math.PI, Math.PI - normal(forkTurn)),
    ...reversedRun(halfOutline.map((piece) => rotated(mirrored(piece), Math.PI))),
    arcA(ORIGIN, MIDDLE, -rootTurn, rootTurn),
  ].map((piece) => rotated(piece, DIAGONAL));
};

// Use the plain 花菱 petal's three lobes and its lens-shaped stamen. The centre lobe has two
// mirrored arcs in this cell, giving it a shallow point, and the shoulders are fuller.
const [crown, right, left] = HANABISHI_UP.lobes;
const crownRadius = crown.r + 3.5;
const crownHeight = crown.c[1] + 17.5;
const crownHalf = crown.r * 0.22;
const peaks = [disc([crownHalf, crownHeight], crownRadius), disc([-crownHalf, crownHeight], crownRadius)];
const shoulders = [right, left].map(({ c, r }) => disc([c[0] * 0.9, c[1] + 5], r + 4));
const foot = disc(ORIGIN, 60);
const middle = disc(ORIGIN, MIDDLE);
const stamen = HANABISHI_UP.stamen.map(({ c, r }) => disc([c[0], c[1] + 2.5], r));
const clearance = vine(PAPER);
const mirroredClearance = clearance.map(mirrored);
const bounds = [seg([-200, -200], [200, 200]), seg([-200, 200], [200, -200])];
const petal = carveWhere([foot, middle, ...peaks, ...shoulders, ...stamen, clearance, mirroredClearance, bounds].flat(), (p) =>
  p[1] > Math.abs(p[0]) && vdist(ORIGIN, p) > MIDDLE &&
  (inside(foot, p) || peaks.every((peak) => inside(peak, p)) || shoulders.some((shoulder) => inside(shoulder, p))) &&
  !stamen.every((edge) => inside(edge, p)) && !inside(clearance, p) && !inside(mirroredClearance, p),
);
const bead = carve([disc(ORIGIN, CENTRE)], [disc(ORIGIN, PAPER)]);
const fork = vine();

export function shihoTsuruHanabishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 90, 180, 270]) {
    c.fill("flower-lozenge", toPath(petal, { k: 1, turn }), "evenodd");
    c.fill("flower-lozenge", toPath([fork], { k: 1, turn }), "evenodd");
  }
  c.fill("flower-lozenge", toPath(bead, { k: 1 }), "evenodd");
}
