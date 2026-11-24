// Crests of plain discs, bars, lozenges and well curbs, each set out in its own frame: the centre at (0, 0), x to the right, y up,
// and the crest's outermost circle at 100. Their proportions were measured from public pictures of the crests (never traced):
// the sources are named beside each build and in docs/provenance.md.
import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, Path, R } from "../../construct/geo.ts";
import { DEG, carve, disc, lineLine, onPage, seg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";

/** The point at distance `r` from the centre at clock angle `deg` (0 straight up, clockwise). */
const at = (r: number, deg: number): V => [r * Math.sin(deg * DEG), r * Math.cos(deg * DEG)];
const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

/**
 * Discs on a circle, and perhaps one at the centre: the three stars 三つ星, the seven luminaries 七曜, the nine 九曜 in a ring.
 * The circle of the centres is struck at `ring`; the compass is stepped round it from the top for three and for six, and the
 * diameters are ruled through the centres for the rest. Each disc is `r` across the radius, and the outermost of them reach 100.
 */
export const discsBuild = (c: Builder, part: string, reach: number, o: { n: number; ring: number; r: number; centre?: number }): void => {
  const placing: Placing = { k: reach / 100 };
  const k = placing.k;
  if (o.n === 3 || o.n === 6) c.stepRound(o.ring * k);
  else c.guideCircle(C0, o.ring * k);
  c.guideSpokes(o.n % 2 === 0 ? o.n / 2 : o.n, 0, reach);
  if (o.centre !== undefined) c.fill(part, toPath([disc([0, 0], o.centre)], placing));
  for (let i = 0; i < o.n; i += 1) c.fill(part, toPath([disc(at(o.ring, (360 * i) / o.n), o.r)], placing));
};

/**
 * Bars pulled across a ring (引両). Each bar is the space between two level lines ruled the full width of the layout circle, and
 * it ends on that circle, under the ring. `offsets` are the bars' centres from the middle, `h` the thickness of one.
 */
export const hikiryoBuild = (c: Builder, part: string, offsets: number[], h: number): void => {
  c.ring("ring-medium");
  // Half of the chord the layout circle cuts from a level line at height `y`.
  const half = (y: number): number => Math.sqrt(R * R - (y - CY) ** 2);
  for (const dy of offsets) {
    const y = CY + dy;
    const [top, foot] = [y - h / 2, y + h / 2];
    c.guideLine([CX - R, top], [CX + R, top]);
    c.guideLine([CX - R, foot], [CX + R, foot]);
    c.fill(part, new Path().M([CX - half(top), top]).L([CX + half(top), top]).A(R, 0, 1, [CX + half(foot), foot]).L([CX - half(foot), foot]).A(R, 0, 1, [CX - half(top), top]).Z());
  }
};

/** A line of the frame: `y = slope * x + off`, as two points on it. */
type Ruled = { slope: number; off: number };
const through = (l: Ruled): [V, V] => [[0, l.off], [100, l.off + l.slope * 100]];
const cross = (p: Ruled, q: Ruled): V => lineLine(...through(p), ...through(q));
const flipY = (p: V): V => [p[0], -p[1]];
const flipXY = (p: V): V => [-p[0], p[1]];

/**
 * The split lozenge 割菱: a lozenge 4 wide to 3 high (its corners at 100 and 75), cut into four like lozenges by two narrow white
 * bands that run along its sides, each band `gap` up the page from the centre where it leaves the corner of its lozenge. Eight
 * lines are ruled: the four sides, and the two edges of each band.
 */
export const wariBishiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const [a, b, gap] = [100, 75, 3];
  const s = b / a;
  const line = (l: Ruled): void => c.guideLine(onPage(through(l)[0], placing), onPage(through(l)[1], placing));
  // The four sides of the lozenge, then the two edges of the band that rises and of the band that falls.
  const [o1, o2, o3, o4]: Ruled[] = [{ slope: s, off: b }, { slope: -s, off: b }, { slope: s, off: -b }, { slope: -s, off: -b }];
  const [riseUp, riseDown, fallUp, fallDown]: Ruled[] = [{ slope: s, off: gap }, { slope: s, off: -gap }, { slope: -s, off: gap }, { slope: -s, off: -gap }];
  c.guideCircle(C0, reach);
  c.guideCircle(C0, b * placing.k);
  c.guideLine(onPage([-a, 0], placing), onPage([a, 0], placing));
  c.guideLine(onPage([0, -b], placing), onPage([0, b], placing));
  for (const l of [o1, o2, o3, o4, riseUp, riseDown, fallUp, fallDown]) line(l);
  const top: V[] = [cross(o1, o2), cross(o2, riseUp), cross(riseUp, fallUp), cross(fallUp, o1)];
  const right: V[] = [cross(riseDown, o2), cross(o2, o3), cross(o3, fallUp), cross(fallUp, riseDown)];
  // Clockwise from the top: the top lozenge, the right, the bottom (the top one's reflection), the left.
  c.fill(part, toPath([polygon(top)], placing));
  c.fill(part, toPath([polygon(right)], placing));
  c.fill(part, toPath([polygon(top.map(flipY).reverse())], placing));
  c.fill(part, toPath([polygon(right.map(flipXY).reverse())], placing));
};

/**
 * The pine-bark lozenge 松皮菱: three lozenges stood one on another, the middle one the largest, so that the sides step in where
 * they meet. The middle one's corners are at 100 and 57; the top and the bottom one stand 43 off the centre, 54 wide and 35 high,
 * and their outer corners at 78. The outline is the three taken together: twelve ruled lines, the white of the notches between.
 */
export const matsukawaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const lozenge = (cy: number, w: number, h: number): V[] => [[0, cy + h], [w, cy], [0, cy - h], [-w, cy]];
  const [top, mid, bottom] = [lozenge(43, 54, 35), lozenge(0, 100, 57), lozenge(-43, 54, 35)];
  c.guideCircle(C0, reach);
  c.guideCircle(C0, 78 * placing.k);
  c.guideCircle(C0, 57 * placing.k);
  c.guideLine(onPage([-100, 0], placing), onPage([100, 0], placing));
  c.guideLine(onPage([0, -78], placing), onPage([0, 78], placing));
  for (const shape of [top, mid, bottom]) for (let i = 0; i < 4; i += 1) c.guideLine(onPage(shape[i], placing), onPage(shape[(i + 1) % 4], placing));
  c.fill(part, toPath(carve([polygon(top), polygon(mid), polygon(bottom)], []), placing));
};

/**
 * The well curb 井筒: two upright bars and two level bars crossing square, each 54 wide, their inner edges 27.5 from the centre,
 * the ends standing out 18.5 past the crossings; a square hole in the middle. The outermost corners stand on the layout circle.
 */
export const izutsuBuild = (c: Builder, part: string, reach: number): void => {
  const [inner, outer, end] = [27.5, 81.5, 100];
  const placing: Placing = { k: reach / Math.hypot(outer, end) };
  const bar = (x0: number, y0: number, x1: number, y1: number): Region => polygon([[x0, y1], [x1, y1], [x1, y0], [x0, y0]]);
  c.guideCircle(C0, reach);
  // The upright bars, the level bars; each side of each is a line ruled across the layout circle.
  const bars: Region[] = [];
  for (const side of [-1, 1]) {
    const [lo, hi] = side < 0 ? [-outer, -inner] : [inner, outer];
    bars.push(bar(lo, -end, hi, end), bar(-end, lo, end, hi));
  }
  c.fill(part, toPath(carve(bars, []), placing));
};
