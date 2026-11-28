import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, seg, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (corners: V[]): Region => corners.map((corner, i) => seg(corner, corners[(i + 1) % corners.length]));

export const tamazusaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const panels = [
    polygon([[-82, -41], [-34, 9], [-18, -17], [-40, -44]]),
    polygon([[-31, 12], [-4, 43], [25, -10], [-16, -14]]),
    polygon([[8, 32], [22, 44], [89, -31], [59, -44], [28, -12]]),
    polygon([[0, 46], [18, 46], [7, 36]]),
  ];
  c.fill("folded-letter", toPath(panels, { k: 1 }));
};

/** The arc from `a` through `m` to `b`, its circle struck through the three. */
const arcVia = (a: V, m: V, b: V) => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const turn = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
  const centre = lineLine(mid(a, m), turn(mid(a, m), m), mid(m, b), turn(mid(m, b), b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) }, a, b, cross > 0);
};

/**
 * 開き文 (frame 32, left r2c3): an opened letter, its sheet spread to the left and the rest still rolled up on the right. In the
 * book's pixels from the middle of its box: the sheet from 118.5 left, its top edge from 81.5 up sagging to 76.5, its foot from
 * 86.5 down bowing to 88.5; the roll from 61.5 to 116.5 right at the top and 36.5 to 101.5 at the foot, its top bowing up to 101.5,
 * its foot down to 93.5, a spiral of two white rings at its top end.
 */
export const hirakiBumiBuild = (c: Builder): void => {
  const sheet: Region = [
    arcVia([-118.5, 81.5], [-33.5, 76.5], [61.5, 88.5]),
    seg([61.5, 88.5], [36.5, -84]),
    arcVia([36.5, -84], [-38.5, -88.5], [-118.5, -86.5]),
    seg([-118.5, -86.5], [-118.5, 81.5]),
  ];
  const roll: Region = [
    arcVia([66, 88.5], [89.5, 101.5], [118.5, 90.5]),
    seg([118.5, 90.5], [101.5, -86.5]),
    arcVia([101.5, -86.5], [70, -93.5], [41, -84]),
    seg([41, -84], [66, 88.5]),
  ];
  const spiral = [thickArc([91.5, 83.5], 13, 2.5, 0, Math.PI), thickArc([91.5, 83.5], 13, 2.5, Math.PI, 2 * Math.PI), thickArc([91.5, 83.5], 5.5, 2.5, 0, Math.PI), thickArc([91.5, 83.5], 5.5, 2.5, Math.PI, 2 * Math.PI)];
  const k = R / Math.hypot(118.5, 101.5);
  c.guideCircle(C0, R);
  c.group(() => {
    c.fill("folded-letter", toPath([sheet], { k }));
    c.fill("folded-letter", toPath(carve([roll], spiral), { k }));
  });
};
