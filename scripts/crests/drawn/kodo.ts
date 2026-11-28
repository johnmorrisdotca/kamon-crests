// The bodies of hand drums, 鼓胴, as the 1892 crest book draws them (frame 22, right page, fourth column from the right): a cup at
// each end, the ends ruled flat, joined at a sharp neck to a waisted barrel. Every curve is a compass arc struck through three
// measured points; the numbers are the book's pixels.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, lineLine, mirrored, moved, reversedRun, rotated, seg, thickArc, toPath, vadd } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";

/** The circle through three points: the crossing of two ruled perpendicular bisectors. */
const through = (a: V, b: V, c: V): Circle => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const normal = (p: V, q: V): V => [-(q[1] - p[1]), q[0] - p[0]];
  const centre = lineLine(mid(a, b), vadd(mid(a, b), normal(a, b)), mid(b, c), vadd(mid(b, c), normal(b, c)));
  return { c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) };
};
/** The arc from `a` through `b` to `c`. */
const arc3 = (a: V, b: V, c: V): Piece => {
  const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  return arcTo(through(a, b, c), a, c, cross > 0);
};

/**
 * A drum body standing upright about the origin: its flat ends `half` either side and `high` above and below; each cup curving in
 * through a point 40.8 in from the end and 50 out, to a sharp neck `neck` out and 69.5 in from the end; the barrel between the
 * necks bowed out to `barrel` at the middle. The left half is the right half turned half a turn.
 */
export const drumBody = (half: number, high: number, neck: number, barrel: number): Region => {
  const n = high - 69.5;
  const right = [
    arc3([half, high], [50, high - 40.8], [neck, n]),
    arc3([neck, n], [barrel, 0], [neck, -n]),
    arc3([neck, -n], [50, -(high - 40.8)], [half, -high]),
  ];
  return [seg([-half, high], [half, high]), ...right, seg([half, -high], [-half, -high]), ...right.map((p) => rotated(p, Math.PI))];
};

/** 並び鼓胴 (frame 22, right r2c4): two bodies upright side by side, the corners of their ends meeting on the upright. */
export const narabiKodoBuild = (c: Builder): void => {
  const [half, high, neck, barrel] = [63.5, 121, 21, 33.8];
  const placing = { k: R / Math.hypot(2 * half, high) };
  c.guideCircle(C0, R);
  for (const x of [-half, half]) c.fill("hand-drum", toPath([drumBody(half, high, neck, barrel).map((p) => moved(p, [x, 0]))], placing));
};

/**
 * 違ひつゞみ (frame 22, right r3c4): two whole drums crossed. Each is two bells and a barrel: a bell is three arcs struck through
 * measured points, the upper ones with the rim of the head across them; the barrel is a band with round ends. The drum from the
 * upper left lies in front, its barrel over the other's, and every bell lies over the barrels. In the book's pixels from the
 * middle, mirrored about the upright.
 */
const BELL_UP: [V, V, V, V, V, V] = [[-63, 140], [-128, 105], [-138, 55], [-98, 25], [-53, 21.5], [-33, 77.5]];
const BELL_DOWN: [V, V, V, V, V, V] = [[-138, -60], [-128, -107.5], [-58, -140], [-33, -107.5], [-25.5, -52.5], [-88, -25]];
const HEAD: [V, V, V] = [[-138, 55], [-83, 87.5], [-63, 140]];
const bell = ([a, ab, b, bc, c, ca]: [V, V, V, V, V, V]): Region => [arc3(a, ab, b), arc3(b, bc, c), arc3(c, ca, a)];
const flip = (region: Region): Region => reversedRun(region.map(mirrored));
/** The barrel: a band 57.6 wide about a line from (-5, -12), 39.8 degrees below level, its round ends 37.2 either side of that point. */
const barrel = (): Region => {
  const [cx, cy, a, half, w] = [-5, -12, (-39.8 * Math.PI) / 180, 37.2, 28.8];
  const u: V = [Math.cos(a), Math.sin(a)];
  const n: V = [-u[1], u[0]];
  const end = (s: number): V => [cx + s * half * u[0], cy + s * half * u[1]];
  const side = (p: V, s: number): V => [p[0] + s * w * n[0], p[1] + s * w * n[1]];
  const [p, q] = [end(-1), end(1)];
  return [seg(side(p, 1), side(q, 1)), arcTo({ c: q, r: w }, side(q, 1), side(q, -1), false), seg(side(q, -1), side(p, -1)), arcTo({ c: p, r: w }, side(p, -1), side(p, 1), false)];
};

export const chigaiTsuzumiBuild = (c: Builder): void => {
  const parting = 2.5;
  const screen = (region: Region): Region[] => [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => region.map((p) => moved(p, [parting * Math.cos((deg * Math.PI) / 180), parting * Math.sin((deg * Math.PI) / 180)])));
  const head = through(...HEAD);
  // The rim of the head: a white line 2.5 wide along the arc through the head's three points, the short way between its ends.
  const rimLeft = (() => {
    const angle = (p: V): number => Math.atan2(p[1] - head.c[1], p[0] - head.c[0]);
    const a0 = angle(HEAD[0]);
    let a1 = angle(HEAD[2]);
    if (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
    if (a0 - a1 > Math.PI) a1 += 2 * Math.PI;
    return reversedRun(thickArc(head.c, head.r, 2.5, Math.min(a0, a1), Math.max(a0, a1)));
  })();
  const rim = (sx: 1 | -1): Region => (sx === 1 ? rimLeft : flip(rimLeft));
  const upLeft = bell(BELL_UP);
  const downRight = flip(bell(BELL_DOWN));
  const upRight = flip(bell(BELL_UP));
  const downLeft = bell(BELL_DOWN);
  const frontBarrel = barrel();
  const backBarrel = flip(frontBarrel);
  const bells = [upLeft, downRight, upRight, downLeft];
  const reach = Math.max(...[...BELL_UP, ...BELL_DOWN].map(([x, y]) => Math.hypot(x, y)));
  const placing = { k: R / reach };
  c.guideCircle(C0, R);
  c.group(() => {
    c.fill("hand-drum", toPath(carve([backBarrel], [frontBarrel, ...screen(frontBarrel), ...bells.flatMap(screen)]), placing));
    c.fill("hand-drum", toPath(carve([upRight], [rim(-1)]), placing));
    c.fill("hand-drum", toPath([downLeft], placing));
  });
  c.group(() => {
    c.fill("hand-drum", toPath(carve([frontBarrel], bells.flatMap(screen)), placing));
    c.fill("hand-drum", toPath(carve([upLeft], [rim(1)]), placing));
    c.fill("hand-drum", toPath([downRight], placing));
  });
};
