import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const itsutsuGomaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const halfSpacing = Math.PI / 5;
  const joinRadius = 43;
  const joinX = joinRadius * Math.sin(halfSpacing);
  const joinY = joinRadius * Math.cos(halfSpacing);
  const points: V[] = [[-38, 88], [38, 88], [joinX, joinY], [0, 24], [-joinX, joinY]];
  const top = points.map((point, i) => seg(point, points[(i + 1) % points.length]));
  for (const turn of [0, 72, 144, 216, 288]) c.fill("spinning-top", toPath([top], { k: 1, turn }));
};

/** The arc from `a` through `m` to `b`, its circle struck through the three. */
const arcVia = (a: V, m: V, b: V) => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const turn = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
  const centre = lineLine(mid(a, m), turn(mid(a, m), m), mid(m, b), turn(mid(m, b), b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) }, a, b, cross > 0);
};
const lineVia = (a: V, m: V, b: V, w: number): Region => {
  const arc = arcVia(a, m, b);
  if (arc.t !== "A") return [];
  return thickArc(arc.c, arc.r, w, arc.a0, arc.a1);
};

/**
 * 一つ独楽 (frame 33, left r3c3): a top seen from a little above: a lens-shaped face with two lenses inside it, a band, and a cone
 * down to the spindle, which shows above and below. In the book's pixels from the middle of its box: the face's corners 147 to
 * either side and 56 up, its upper edge through 104.5 up and its lower through 8 up; the band's foot 143.6 to either side and 20.5
 * down, bowing to 48.5 down; the cone's sides through (63.75, -79.5) to its point 104.5 down; the inner lenses' corners 120 and 81
 * out at 58 and 59 up, their edges through 89 and 30 up and 70.5 and 40 up; the spindle 4 wide, 41 beyond each end.
 */
export const hitotsuGomaBuild = (c: Builder): void => {
  const face: V = [147, 56];
  const foot: V = [143.6, -20.5];
  const tip: V = [0, -104.5];
  const mirror = ([x, y]: V): V => [-x, y];
  const body: Region = [
    arcVia(mirror(face), [0, 104.5], face),
    seg(face, foot),
    arcVia(foot, [63.75, -79.5], tip),
    arcVia(tip, [-63.75, -79.5], mirror(foot)),
    seg(mirror(foot), mirror(face)),
  ];
  const lines = [
    lineVia(face, [0, 8], mirror(face), 3),
    lineVia(foot, [0, -48.5], mirror(foot), 3),
    lineVia([-120, 58], [0, 89], [120, 58], 2.5),
    lineVia([120, 58], [0, 30], [-120, 58], 2.5),
    lineVia([-81, 59], [0, 70.5], [81, 59], 2.5),
    lineVia([81, 59], [0, 40], [-81, 59], 2.5),
  ];
  const spindles = [thickSeg([0, 100], [0, 145.5], 4), thickSeg([0, -100], [0, -145.5], 4)];
  const k = R / Math.hypot(face[0], face[1] + 4);
  c.guideCircle(C0, R);
  c.group(() => {
    c.fill("spinning-top", toPath(carve([body], lines), { k }));
    c.fill("spinning-top", toPath(spindles, { k }));
  });
};

/**
 * 三つ独楽 (frame 33, left r2c3): three tops seen side on, a third of a turn apart, their points and spindles meeting in the
 * middle. In the book's pixels from that point, for the upper top: its face's corners 76.5 to either side and 117 up, the face
 * bowing up to 134.5 and its lower edge through 106.5; the band's foot 76.75 up, its edge through 68; the cone's sides through
 * (46.9, 53.1) to the point 37.5 up; the spindle 3.5 wide, in to the middle and out to 162.5.
 */
export const mitsuGomaBuild = (c: Builder): void => {
  const face: V = [76.5, 117];
  const foot: V = [76.5, 76.75];
  const tip: V = [0, 37.5];
  const mirror = ([x, y]: V): V => [-x, y];
  const body: Region = [
    arcVia(mirror(face), [0, 134.5], face),
    seg(face, foot),
    arcVia(foot, [46.9, 53.1], tip),
    arcVia(tip, [-46.9, 53.1], mirror(foot)),
    seg(mirror(foot), mirror(face)),
  ];
  const lines = [lineVia(face, [0, 106.5], mirror(face), 3), lineVia(foot, [0, 68], mirror(foot), 3)];
  const spindles = [thickSeg([0, 40], [0, 0], 3.5), thickSeg([0, 130], [0, 162.5], 3.5)];
  const k = R / 164;
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("spinning-top", toPath(carve([body], lines), { k, turn }));
      c.fill("spinning-top", toPath(spindles, { k, turn }));
    });
  }
};
