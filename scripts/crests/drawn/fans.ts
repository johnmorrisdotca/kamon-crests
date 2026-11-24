// Crests of fans, ruled and struck: the folding fan of five bones. Each is set out in its own frame, the centre at (0, 0), x to the
// right and y up. The proportions were measured from public pictures of the crest and checked against the crest book of 1892
// (伊呂波分新撰紋帳); the drawing is this construction.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { centred } from "./arms.ts";
import { DEG, arcTo, carve, disc, lineCircle, nearest, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

/** The folding fan with five bones, 五本骨扇, in units of half the picture's width, the pivot of the bones at (0, `pivot`). */
interface Fan {
  pivot: number;
  /** The centre of the paper's outer arc: the pivot, or a little above it. */
  centre?: number;
  /** The paper: the band between two arcs about the pivot, between the outer edge of the left bone and the white beside the guard. */
  outer: number;
  inner: number;
  /** A bone's width, the guard's, the white between the guard and the paper, and where the bones end under the paper. */
  bone: number;
  guard: number;
  gap: number;
  top: number;
  /** How far the butts of the bones reach beyond the pivot, the guard's end, the guard's top, and the rivet's radius. */
  butt: number;
  tail: number;
  tip: number;
  rivet: number;
}

const FAN: Fan = { pivot: -41, outer: 94.3, inner: 43.2, bone: 3.5, guard: 3.6, gap: 0.7, top: 42.6, butt: 11.9, tail: 11.9, tip: 94, rivet: 1.1 };
/** The fan as the ringed crest has it, in units of the ring's outer radius: its paper's outer arc is struck about a point above the pivot. */
const RINGED: Fan = { pivot: -43.5, centre: -34, outer: 86.3, inner: 43, bone: 3.9, guard: 4, gap: 1, top: 41.3, butt: 13.7, tail: 13.7, tip: 91.2, rivet: 0 };

const LEFT = -60;
const GUARD = 60;
const BONES = [-60, -30, 0, 30];

/** The direction `deg` clockwise from upright, and the direction at a right angle to it, to its right. */
const along = (deg: number): V => [Math.sin(deg * DEG), Math.cos(deg * DEG)];
const across = (deg: number): V => [Math.cos(deg * DEG), -Math.sin(deg * DEG)];
const at = (p: V, deg: number, t: number, s = 0): V => [p[0] + t * along(deg)[0] + s * across(deg)[0], p[1] + t * along(deg)[1] + s * across(deg)[1]];
/** The arc of `circle` from `from` to `to` that passes through `via`. */
const arcVia = (circle: Circle, from: V, to: V, via: V): Region[number] => {
  const angle = (q: V): number => Math.atan2(q[1] - circle.c[1], q[0] - circle.c[0]);
  const ccw = (a: number): number => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  return arcTo(circle, from, to, ccw(angle(via) - angle(from)) < ccw(angle(to) - angle(from)));
};

/** A bone above the pivot: two ruled sides and, at the top, an arc of the circle about the pivot; its foot is lost under the guard's white. */
const bone = (f: Fan, p: V, deg: number): Region => {
  const h = f.bone / 2;
  const t = Math.sqrt(f.top * f.top - h * h);
  const [l, r] = [at(p, deg, t, -h), at(p, deg, t, h)];

  return [seg(at(p, deg, 0, -h), l), shortArc({ c: p, r: f.top }, l, r), seg(r, at(p, deg, 0, h)), seg(at(p, deg, 0, h), at(p, deg, 0, -h))];
};

/**
 * The butt of a bone beyond the pivot: a round end, a circle as wide as the bone, and the two ruled lines from the pivot that
 * touch it, so that it is narrow at the pivot and broad at the end.
 */
const butt = (f: Fan, p: V, deg: number): Region => {
  const h = f.bone / 2;
  const d = f.butt - h;
  const c: V = at(p, deg, -d);
  const alpha = Math.asin(h / d) / DEG;
  const length = Math.sqrt(d * d - h * h);
  const [a, b] = [at(p, deg + 180 - alpha, length), at(p, deg + 180 + alpha, length)];

  return [seg(p, a), arcVia({ c, r: h }, a, b, at(p, deg, -f.butt)), seg(b, p)];
};

/** The outline of the fan: the paper, the bones and their butts with the white round the guard cut from them, and the guard. */
const outlines = (f: Fan): { paper: Region; bones: Region[]; white: Region[]; guard: Region[] } => {
  const p: V = [0, f.pivot];
  const o: V = [0, f.centre ?? f.pivot];
  const reach = (deg: number, off: number, r: number, from: V = p): V => nearest(lineCircle(at(p, deg, 0, off), at(p, deg, 1, off), from, r), at(p, deg, Math.hypot(r, off), off));
  const [l1, l0] = [reach(LEFT, -f.bone / 2, f.outer, o), reach(LEFT, -f.bone / 2, f.inner)];
  const edge = -(f.guard / 2 + f.gap);
  const [r1, r0] = [reach(GUARD, edge, f.outer, o), reach(GUARD, edge, f.inner)];
  const paper: Region = [seg(l0, l1), shortArc({ c: o, r: f.outer }, l1, r1), seg(r1, r0), shortArc({ c: p, r: f.inner }, r0, l0)];
  const g = f.guard / 2;
  const tc = f.tail - g;
  const tipAt = Math.sqrt(f.tip * f.tip - g * g);
  const [gl, gr] = [at(p, GUARD, tipAt, -g), at(p, GUARD, tipAt, g)];
  const [bl, br] = [at(p, GUARD, -tc, -g), at(p, GUARD, -tc, g)];
  const guard: Region = [seg(bl, gl), shortArc({ c: p, r: f.tip }, gl, gr), seg(gr, br), arcVia({ c: at(p, GUARD, -tc), r: g }, br, bl, at(p, GUARD, -f.tail))];
  const white = thickSeg(at(p, GUARD, -f.tail - 2), at(p, GUARD, 104), 2 * (g + f.gap));

  return { paper, bones: BONES.flatMap((deg) => [bone(f, p, deg), butt(f, p, deg)]), white: [white], guard: f.rivet > 0 ? [guard, disc(p, f.rivet)] : [guard] };
};

/**
 * The five-bone fan, 五本骨扇, open. Its pivot is the point the bones turn on. The paper is the band between two circles about the
 * pivot, from the outer edge of the left bone to the white beside the guard on the right; the guard is a plain bar on top, with a
 * white either side of it and a small round hole at the pivot, and the other four bones pass under it, showing below the paper
 * and beyond the pivot as round-ended butts that are narrow where they start. Everything is ruled or struck from the pivot.
 */
export const gohonOgiBuild = (c: Builder, part: string, reach: number, ringed = false): void => {
  const f = ringed ? RINGED : FAN;
  const o = outlines(f);
  const { sets, placing } = centred([[o.paper], [], o.bones, o.white, o.guard], reach, ringed);
  c.guideCircle(C0, reach);
  c.fill(part, toPath(sets[0], placing));
  c.group(() => c.fill(part, toPath(carve(sets[2], sets[3]), placing)));
  c.fill(part, toPath(carve([sets[4][0]], sets[4].slice(1)), placing));
};
