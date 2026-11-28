// 小の字菱, as the 1892 crest book draws 小の字ひし (frame 43, left page, first row, third column from the right): a lozenge cut into
// three by two bowed white lines, the middle piece the stem of 小 and the two side pieces its strokes. The numbers are the book's
// pixels from the lozenge's middle; its two halves differ by up to 18, and these are their average.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { carve, lineLine, seg, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

/** The lozenge's corners: 161.25 to either side and 122.5 above and below. */
const WIDE = 161.25;
const HIGH = 122.5;
/** Each white line: an arc 4 wide through 72.5 out at 66 up and down, and 52.5 out at the middle. */
const LINE = { out: 72.5, up: 66, mid: 52.5, w: 4 };

export const shoNoJiBishiBuild = (c: Builder): void => {
  const lozenge: Region = [seg([0, HIGH], [WIDE, 0]), seg([WIDE, 0], [0, -HIGH]), seg([0, -HIGH], [-WIDE, 0]), seg([-WIDE, 0], [0, HIGH])];
  const line = (side: 1 | -1): Region => {
    const [a, m, b]: V[] = [[side * LINE.out, LINE.up], [side * LINE.mid, 0], [side * LINE.out, -LINE.up]];
    const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const turn = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
    const centre = lineLine(mid(a, m), turn(mid(a, m), m), mid(m, b), turn(mid(m, b), b));
    const r = Math.hypot(a[0] - centre[0], a[1] - centre[1]);
    // Run the line a little past the lozenge's edges, so that it cuts clean through.
    const reach = Math.asin((LINE.up + 8) / r);
    const along = side === 1 ? Math.PI : 0;
    return thickArc(centre, r, LINE.w, along - reach, along + reach);
  };
  c.guideCircle(C0, R);
  c.fill("sho-no-ji", toPath(carve([lozenge], [line(-1), line(1)]), { k: R / WIDE }));
};
