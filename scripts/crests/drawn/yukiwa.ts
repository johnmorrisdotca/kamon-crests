// The snow ring, 雪輪, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100.
// Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 15, ゆきわ) and a public picture of the crest.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, rotated, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Piece, Placing, V } from "../../construct/compass.ts";

/** The big bump, which holds the ear: its circle's distance from the centre along its axis, and its radius. */
const BIG = { out: 53, r: 45 };
/** The small bump between two big ones. */
const SMALL = { out: 73, r: 27 };
/** The band's width, inside every bump's circle. */
const WIDTH = 9;
/** The ear: a round curl at the foot of the big bump's axis, with a white drop in it that points out. */
const CURL = { out: 87, r: 12 };
const DROP = { out: 88, r: 5, tip: 96 };
/** The first unit runs from the notch before its small bump to the notch after its big one, with a little to spare so that the next unit overlaps. */
const FROM = -14;
const TO = 50;
/** How far in the clear room reaches: the ear's curl stands this far from the centre. */
export const YUKIWA_ROOM = CURL.out - CURL.r - 1;

const polar = (r: number, clock: number): V => [r * Math.sin(clock * DEG), r * Math.cos(clock * DEG)];

/**
 * The snow ring, 雪輪: a band about the centre that rises and falls in twelve round bumps, a big one and a small one in turn,
 * and curls into an ear at each big bump, with a white drop in the curl. The bumps' circles are struck about the band's
 * middle; the band is the space between each circle and the same circle taken in by its width. One unit (a small bump and
 * the big one after it, cut off along two lines through the centre) is built in full, and the other five where they stand,
 * clockwise. Returns how far the room inside it reaches, for a motif to stand in.
 */
export const yukiwaBuild = (c: Builder, part: string, reach: number): number => {
  const placing: Placing = { k: reach / 100 };
  const bumps = Array.from({ length: 6 }, (_, i) => [
    { c: polar(SMALL.out, 60 * i), r: SMALL.r },
    { c: polar(BIG.out, 60 * i + 30), r: BIG.r },
  ]).flat();
  const ears = Array.from({ length: 6 }, (_, i) => ({
    curl: { c: polar(CURL.out, 60 * i + 30), r: CURL.r },
    drop: { c: polar(DROP.out, 60 * i + 30), r: DROP.r },
    tip: polar(DROP.tip, 60 * i + 30),
  }));
  // The drop is a circle with two lines from it to a point on the axis.
  const inDrop = (p: V): boolean =>
    ears.some((ear) => {
      if (vdist(ear.drop.c, p) < ear.drop.r) return true;
      const along: V = [ear.tip[0] - ear.drop.c[0], ear.tip[1] - ear.drop.c[1]];
      const length = Math.hypot(along[0], along[1]);
      const q: V = [p[0] - ear.drop.c[0], p[1] - ear.drop.c[1]];
      const x = (q[0] * along[0] + q[1] * along[1]) / length;
      const y = Math.abs((-q[0] * along[1] + q[1] * along[0]) / length);
      const lean = Math.asin(ear.drop.r / length);

      return x > ear.drop.r * Math.sin(lean) && x < length && y < (length - x) * Math.tan(lean);
    });
  const inWedge = (p: V): boolean => (((Math.atan2(p[0], p[1]) / DEG - FROM + 720) % 360) <= TO - FROM);
  const inside = (p: V, take: number): boolean => bumps.some((b) => vdist(b.c, p) < b.r - take) || vdist([0, 0], p) < 70;
  const ink = (p: V): boolean => inWedge(p) && inside(p, 0) && (!inside(p, WIDTH) || ears.some((ear) => vdist(ear.curl.c, p) < ear.curl.r)) && !inDrop(p);
  const outlines: Piece[] = [...bumps.flatMap((b) => [...disc(b.c, b.r), ...disc(b.c, b.r - WIDTH)]), ...ears.flatMap((ear) => [...disc(ear.curl.c, ear.curl.r), ...disc(ear.drop.c, ear.drop.r)])];
  for (const ear of ears) {
    const along: V = [ear.tip[0] - ear.drop.c[0], ear.tip[1] - ear.drop.c[1]];
    const length = Math.hypot(along[0], along[1]);
    const lean = Math.asin(ear.drop.r / length);
    const back = Math.sqrt(length * length - ear.drop.r * ear.drop.r);
    for (const side of [1, -1]) {
      const a = Math.atan2(along[1], along[0]) + side * lean;
      outlines.push(seg(ear.tip, [ear.tip[0] - back * Math.cos(a), ear.tip[1] - back * Math.sin(a)]));
    }
  }
  for (const clock of [FROM, TO]) outlines.push(seg([0, 0], polar(130, clock)));
  const unit = carveWhere(outlines, ink);

  c.guideCircle(C0, reach);
  c.precision(3);
  for (let i = 0; i < 6; i += 1) c.fill(part, toPath(unit.map((loop) => loop.map((p) => rotated(p, -60 * i * DEG))), placing));

  return YUKIWA_ROOM;
};
