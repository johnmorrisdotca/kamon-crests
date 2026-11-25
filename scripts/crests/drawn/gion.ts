// The Gion amulet, 祇園守: two crossed scrolls on a ring, tied where they cross, inside a hooked band, a cloud and a ginkgo
// leaf. Struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 31, ぎおんまもり) and from a picture of the
// crest as it is drawn today.
//
// A scroll lies along a line through the centre at half a right angle, so its edges are lines through grid points that
// rise or fall one in one. A point is placed along the scroll that rises to the right by x + y, and across it by y - x.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

const at = (x: number, y: number, r: number): Circle => ({ c: [x, y], r });
const O: V = [0, 0];
const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
const round = (circ: Circle, grow = 0): Piece[] => disc(circ.c, circ.r + grow);
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 300, a[1] - (b[1] - a[1]) * 300], [a[0] + (b[0] - a[0]) * 300, a[1] + (b[1] - a[1]) * 300]);
const upright = (x: number): Piece => ruled([x, 0], [x, 1]);
const level = (y: number): Piece => ruled([0, y], [1, y]);
/** The line across the rising scroll at `d` along it: x + y = d. */
const across = (d: number): Piece => ruled([d, 0], [d - 1, 1]);
/** The line along the rising scroll, `c` across it: y - x = c. */
const along = (c: number): Piece => ruled([0, c], [1, c + 1]);
const D = (p: V): number => p[0] + p[1];
const C = (p: V): number => p[1] - p[0];
const flip = (p: V): V => [-p[0], p[1]];

/** A white line between two pieces, and round a piece that lies over another. */
const GAP = 3;

// The ring behind the scrolls.
const RING_OUT = 59;
const RING_IN = 40;

// A scroll, as the one that rises to the right.
/** Half its width, across. */
const HALF = 19;
/** The white line along it, between the roll and the sheet: from here to 1 across. */
const SHEET = -3;
/** The roll's round face at the upper end, and the hollow in the scroll's end that it sits in. */
const FACE = at(52, 52, 18);
/** The face ends on this line across, and the knob stands beyond it. */
const FACE_END = 89;
/** The round lower end. */
const END = at(-33, -35, 17);
/** The roll's swell under the face, where the sheet leaves it. */
const SWELL = at(40, 30, 11);
/** The sheet's round lower end; the roll's lower block is hollowed round it. */
const LAP = at(-10, -15, 25);
/** The knobs: squares on the scroll's line, each in a white frame. */
const KNOB_UP = { from: 92, to: 102, half: 5, frame: 3 };
const KNOB_LOW = { from: -103, to: -95, half: 4, frame: 3 };
/** The tie: four white lines across the scroll where the two cross, which leave three bands. */
const TIE: [number, number][] = [[-11, -9], [-4, -2], [2, 4], [9, 11]];

const inFrame = (knob: typeof KNOB_UP, p: V): boolean => Math.abs(C(p)) < knob.half + knob.frame && D(p) > knob.from - knob.frame && D(p) < knob.to + knob.frame;
const frameLines = (knob: typeof KNOB_UP): Piece[] => [along(knob.half + knob.frame), along(-knob.half - knob.frame), across(knob.from - knob.frame), across(knob.to + knob.frame)];
const tied = (p: V): boolean => TIE.some(([from, to]) => D(p) > from && D(p) < to);
const tieLines = TIE.flatMap(([from, to]) => [across(from), across(to)]);

/** The roll: the long strip on the upper side, with a block the scroll's whole width at each end. */
const inRoll = (p: V): boolean => {
  const c = C(p);
  const d = D(p);
  if (Math.abs(c) >= HALF || d > D(FACE.c) || within(FACE, p, GAP) || tied(p)) return false;
  if (!(d > D(END.c) || within(END, p))) return false;
  if (c > 1) return true;

  return within(SWELL, p) || d > D(SWELL.c) || (d < D(LAP.c) && !within(LAP, p, GAP));
};
/** The sheet: the shorter strip on the lower side, between the two blocks. */
const inSheet = (p: V): boolean => {
  const c = C(p);
  const d = D(p);

  return c > -HALF && c < SHEET && !tied(p) && d < D(SWELL.c) && !within(SWELL, p, GAP) && (d > D(LAP.c) || within(LAP, p));
};
const inFace = (p: V): boolean => within(FACE, p) && D(p) < FACE_END;
const inKnob = (knob: typeof KNOB_UP, p: V): boolean => Math.abs(C(p)) < knob.half && D(p) > knob.from && D(p) < knob.to;
/** Everything the rising scroll covers, with the white line round it: what lies under it is cut back to here. */
const underRising = (p: V): boolean => Math.abs(C(p)) < HALF + GAP;
const underFalling = (p: V): boolean => Math.abs(D(p)) < HALF + GAP;

const rollLines: Piece[] = [along(HALF), along(-HALF), along(1), ...round(FACE, GAP), ...round(END), ...round(SWELL), ...round(LAP, GAP), ...tieLines];
const sheetLines: Piece[] = [along(-HALF), along(SHEET), ...round(SWELL, GAP), ...round(LAP), ...tieLines];
const knobLines = (knob: typeof KNOB_UP): Piece[] => [along(knob.half), along(-knob.half), across(knob.from), across(knob.to)];

// The ginkgo leaf below: a blade on the upright line and a wing each side.
/** The white line between the blade and a wing: from here to `WING`. */
const BLADE = 3;
const WING = 5.5;
/** A wing's upper edge. */
const WING_TOP = at(72, -2, 73);
/** The long white vein: between two lines through grid points, down to this level. */
const VEIN_A: [V, V] = [[9, -36], [15, -88]];
const VEIN_A_END = -88;
/** The curved white vein: between two circles about one centre, from one upright line to another. */
const VEIN_B = at(110, 21, 122);
const VEIN_B_FROM = 13;
const VEIN_B_TO = 41;
/** The lower edge is the layout circle, cut flat twice, with a round curl. */
const FLAT_OUT = { y: -84, x: 47 };
const FLAT_IN = { y: -95, x: 14 };
const CURL = at(33, -87, 4.5);
const SLOT: [number, number] = [29.5, 32];
/** The small leaf between a scroll and a wing: the part of a circle beyond the scroll's white line. */
const SLIVER = at(28, -38, 12);

const leftOf = (line: [V, V], p: V): number => (line[1][0] - line[0][0]) * (p[1] - line[0][1]) - (line[1][1] - line[0][1]) * (p[0] - line[0][0]);
const veinA2: [V, V] = [[VEIN_A[0][0] + 2, VEIN_A[0][1]], [VEIN_A[1][0] + 2, VEIN_A[1][1]]];
const inWing = (p: V): boolean => {
  const [x, y] = p;
  if (within(SLIVER, p)) return D(p) < -(HALF + GAP);
  if (!(vdist(O, p) < 100 && x > WING && y < -25 && !within(WING_TOP, p) && !(D(p) > -(HALF + GAP) && x - y < 68))) return false;
  if (y < FLAT_OUT.y && x > FLAT_OUT.x) return false;
  if (y < FLAT_IN.y && x > FLAT_IN.x) return false;
  if (within(CURL, p) || (x > SLOT[0] && x < SLOT[1] && y < CURL.c[1] && y > FLAT_IN.y - 1)) return false;
  if (y > VEIN_A_END && leftOf(VEIN_A, p) > 0 && leftOf(veinA2, p) < 0) return false;
  if (x > VEIN_B_FROM && x < VEIN_B_TO && Math.abs(vdist(VEIN_B.c, p) - VEIN_B.r) < 1) return false;

  return true;
};
const wingLines: Piece[] = [
  ...disc(O, 100), upright(WING), ...round(WING_TOP), across(-(HALF + GAP)), level(FLAT_OUT.y), upright(FLAT_OUT.x), level(FLAT_IN.y), upright(FLAT_IN.x),
  ...round(CURL), upright(SLOT[0]), upright(SLOT[1]), ruled(VEIN_A[0], VEIN_A[1]), ruled(veinA2[0], veinA2[1]), level(VEIN_A_END),
  ...round(VEIN_B, 1), ...round(VEIN_B, -1), upright(VEIN_B_FROM), upright(VEIN_B_TO), ...round(SLIVER),
];

// The band on the left, with its round head.
const BAND_IN = 76;
/** Below the level line through the centre the band's outer edge leaves the layout circle: it touches it at (-100, 0). */
const BAND_LOW = at(-30, 0, 70);
const HEAD = at(-69, 42, 14);
const HEAD_TOP = 56;
/** The band's foot: level across its top and its bottom, with a round end about the lower knob. */
const FOOT_TOP = -37;
const FOOT_BASE = -62;
const FOOT_END = at(-49, -50, 13);
const inBand = (p: V): boolean => {
  const [x, y] = p;
  if (y > HEAD_TOP || y < FOOT_BASE || within(END, p, GAP) || inFrame(KNOB_LOW, p)) return false;
  if (within(HEAD, p) || within(FOOT_END, p)) return true;
  if (y >= 0) return vdist(O, p) < 100 && vdist(O, p) > BAND_IN && (x < HEAD.c[0] || (x < 0 && y < HEAD.c[1] - HEAD.r));

  return within(BAND_LOW, p) && (vdist(O, p) > BAND_IN || (y < FOOT_TOP && x < FOOT_END.c[0]));
};
const bandLines: Piece[] = [
  ...disc(O, 100), ...disc(O, BAND_IN), ...round(BAND_LOW), ...round(HEAD), level(HEAD_TOP), level(FOOT_TOP), level(FOOT_BASE), ...round(FOOT_END), ...round(END, GAP), ...frameLines(KNOB_LOW),
];

// The hooked band over the top.
/** The tail's lower edge: a line through two grid points. */
const TAIL: [V, V] = [[-80, 60], [-50, 68]];
/** The hollow under the band. */
const HOLLOW = at(9, 42, 38);
/** The hook's outer edge: it touches the layout circle at (500/13, 1200/13). */
const HOOK = at(20, 48, 48);
/** The step in the tail, and the line the band follows from it into the hollow. */
const STEP = -30;
const STEP_LINE = 84;
/** The hook ends across the rising scroll, beside its upper knob, and its outer side runs along the scroll. */
const HOOK_END = 94;
const HOOK_SIDE = -18;
const inHook = (p: V): boolean => {
  const [x, y] = p;
  const c = C(p);
  const d = D(p);
  if (!(vdist(O, p) < 100 && (12 * x - 5 * y < 0 || within(HOOK, p)) && !within(HOLLOW, p) && c > HOOK_SIDE && !inFrame(KNOB_UP, p))) return false;
  if (x <= STEP) return leftOf(TAIL, p) > 0;
  if (d < 68) return c > STEP_LINE;
  if (d < HOOK_END) return x < 30 && y > HOLLOW.c[1];

  return true;
};
const hookLines: Piece[] = [...disc(O, 100), ...round(HOOK), ...round(HOLLOW), ruled(TAIL[0], TAIL[1]), upright(STEP), along(STEP_LINE), along(HOOK_SIDE), across(HOOK_END), ...frameLines(KNOB_UP)];

// The cloud on the right, the same above and below the level line through the centre.
const CLOUD_IN = RING_OUT + GAP;
/** The cloud is hollowed towards the hook, and the same below. */
const CLOUD_HOLLOW = at(29, 60, 46);
/** Its body touches the layout circle at (100, 0); a bump and a horn stand on it above, and the same below. */
const CLOUD_BODY = at(59, 0, 41);
const BUMP = at(82, 33, 12);
const HORN = at(72, 51, 12);
/**
 * The curl: a white line 3 wide that leaves an upright white stem, goes over the top of one circle and rolls into a smaller
 * one that touches it from inside. The line through the two centres, which falls 3 in 4, is where the one ends and the
 * other begins, and where the smaller one ends.
 */
const CURL_OUT = at(86, 9, 9);
const CURL_IN = at(90, 6, 4);
const CURL_STEM: [number, number] = [75.5, 78.5];
/** How far a point stands above the line through the curl's two centres. */
const overCurl = (p: V): number => 3 * (p[0] - CURL_OUT.c[0]) + 4 * (p[1] - CURL_OUT.c[1]);
const up = (p: V): V => [p[0], Math.abs(p[1])];
const inCloud = (p: V): boolean => {
  const q = up(p);
  if (!(vdist(O, p) < 100 && vdist(O, p) > CLOUD_IN && p[0] > 40 && !within(CLOUD_HOLLOW, q))) return false;
  if (!(within(CLOUD_BODY, p) || within(BUMP, q) || within(HORN, q))) return false;
  // The outer curl, from its stem over the top and down to the line; the inner one, from there round its lower side and back up to the line.
  if (Math.abs(vdist(CURL_OUT.c, q) - CURL_OUT.r) < 1.5 && (overCurl(q) > 0 || (q[0] < CURL_OUT.c[0] && q[1] > CURL_OUT.c[1]))) return false;
  if (Math.abs(vdist(CURL_IN.c, q) - CURL_IN.r) < 1.5 && overCurl(q) < 0) return false;
  if (q[0] > CURL_STEM[0] && q[0] < CURL_STEM[1] && q[1] < CURL_OUT.c[1]) return false;

  return true;
};
const both = (circ: Circle, grow = 0): Piece[] => [...round(circ, grow), ...round(at(circ.c[0], -circ.c[1], circ.r), grow)];
const cloudLines: Piece[] = [
  ...disc(O, 100), ...disc(O, CLOUD_IN), ...both(CLOUD_HOLLOW), ...round(CLOUD_BODY), ...both(BUMP), ...both(HORN),
  ...both(CURL_OUT, 1.5), ...both(CURL_OUT, -1.5), ...both(CURL_IN, 1.5), ...both(CURL_IN, -1.5),
  level(CURL_OUT.c[1]), level(-CURL_OUT.c[1]), upright(CURL_OUT.c[0]), ruled(CURL_OUT.c, CURL_IN.c), ruled([CURL_OUT.c[0], -CURL_OUT.c[1]], [CURL_IN.c[0], -CURL_IN.c[1]]), upright(CURL_STEM[0]), upright(CURL_STEM[1]),
];

/**
 * The Gion amulet, 祇園守. The ring first; then the scroll that rises to the right, which lies on top, with its tie; the
 * scroll that falls to the right, cut where it passes under; the ginkgo leaf, its right wing built in full and its left
 * where it stands; and round them, clockwise from the left, the band with its head, the hooked band and the cloud.
 */
export const gionMamoriBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const carved = (lines: Piece[], inked: (p: V) => boolean): Region[] => longLast(carveWhere(lines, inked));
  const draw = (loops: Region[], mirror = false): void => c.fill(part, toPath(loops, { ...placing, ...(mirror ? { mirror: true } : {}) }));
  const cut = [along(HALF + GAP), along(-HALF - GAP)];
  const cutFalling = [across(HALF + GAP), across(-HALF - GAP)];

  c.guideCircle(C0, reach);
  for (const r of [RING_OUT, RING_IN]) c.guideCircle(C0, r * placing.k);

  // The ring, where no scroll lies over it; below, only what shows between the leaf's blade and wings.
  draw(carved([...disc(O, RING_OUT), ...disc(O, RING_IN), ...cut, ...cutFalling, upright(BLADE), upright(-BLADE)], (p) => {
    const r = vdist(O, p);
    if (!(r < RING_OUT && r > RING_IN) || underRising(p) || underFalling(p)) return false;

    return !(C(p) < 0 && D(p) < 0) || Math.abs(p[0]) < BLADE;
  }));

  // The scroll that rises to the right.
  c.group(() => {
    draw(carved(rollLines, inRoll));
    draw(carved(sheetLines, inSheet));
    draw(carved([...round(FACE), across(FACE_END)], inFace));
    draw(carved(knobLines(KNOB_UP), (p) => inKnob(KNOB_UP, p)));
    draw(carved(knobLines(KNOB_LOW), (p) => inKnob(KNOB_LOW, p)));
  });
  // The scroll that falls to the right: the same scroll mirrored, cut where the first lies over it.
  c.group(() => {
    draw(carved([...rollLines.map(mirrored), ...cut], (p) => inRoll(flip(p)) && !underRising(p)));
    draw(carved([...sheetLines.map(mirrored), ...cut], (p) => inSheet(flip(p)) && !underRising(p)));
  });
  c.group(() => {
    draw(carved([...round(FACE), across(FACE_END)], inFace), true);
    draw(carved(knobLines(KNOB_UP), (p) => inKnob(KNOB_UP, p)), true);
    draw(carved(knobLines(KNOB_LOW), (p) => inKnob(KNOB_LOW, p)), true);
  });

  // The ginkgo leaf: the blade, the right wing, and the left wing where it stands.
  draw(carved([...disc(O, 100), ...disc(O, RING_OUT + GAP), upright(BLADE), upright(-BLADE)], (p) => vdist(O, p) < 100 && vdist(O, p) > RING_OUT + GAP && Math.abs(p[0]) < BLADE && p[1] < 0));
  const wing = carved(wingLines, inWing);
  draw(wing);
  draw(wing, true);

  // Round them: the band on the left, the hooked band over the top, the cloud on the right.
  draw(carved(bandLines, inBand));
  draw(carved(hookLines, inHook));
  draw(carved(cloudLines, inCloud));
};
