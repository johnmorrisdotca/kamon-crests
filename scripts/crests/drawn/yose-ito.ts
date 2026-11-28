// 丸に三つ寄せ糸, as the 1892 crest book draws 丸ニ三ッよせいと (frame 7, left page, first row, third column from the right): three
// skeins of thread, each a straight-sided band, point in from a ring to a knot, and the knot's three tabs stand between them. The
// numbers are the book's pixels from the centre of the ring; angles are clock angles from the top.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import { carve, disc, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

/** The point `r` from the centre at clock angle `deg`. */
const at = (r: number, deg: number): V => [r * Math.sin((deg * Math.PI) / 180), r * Math.cos((deg * Math.PI) / 180)];
const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

/** The ring's outer and inner edges, from the two printed lines' outer sides. */
const RING = { outer: 149.5, inner: 125.5 };
/** A skein: its outer corners 121 out, 20 degrees either side of its middle; its inner corners 50 out, 40 degrees either side. */
const SKEIN = { outer: [121, 20], inner: [50, 40] } as const;
/** The knot: a disc of 20, and three tabs 15 wide from it to 52 out, between the skeins. */
const KNOT = { r: 20, tab: 7.5, reach: 52 };
const PARTING = 2.5;

export const maruNiMitsuYoseItoBuild = (c: Builder): void => {
  // The ring at the cell's own width, struck as the package's rings are.
  const inner = (R * RING.inner) / RING.outer;
  c.guideCircle(C0, R);
  c.guideCircle(C0, inner);
  c.fill("frame", circle(C0, R).join(circle(C0, inner)), "evenodd");
  const placing = { k: R / RING.outer };
  const skein = (deg: number): Region => polygon([at(SKEIN.outer[0], deg - SKEIN.outer[1]), at(SKEIN.outer[0], deg + SKEIN.outer[1]), at(SKEIN.inner[0], deg + SKEIN.inner[1]), at(SKEIN.inner[0], deg - SKEIN.inner[1])]);
  const tab = (deg: number): Region => {
    const side = at(KNOT.tab, deg + 90);
    const [a, b] = [at(KNOT.r / 2, deg), at(KNOT.reach, deg)];
    return polygon([[a[0] - side[0], a[1] - side[1]], [b[0] - side[0], b[1] - side[1]], [b[0] + side[0], b[1] + side[1]], [a[0] + side[0], a[1] + side[1]]]);
  };
  const knot = disc([0, 0], KNOT.r);
  for (const deg of [0, 120, 240]) c.fill("thread-spool", toPath(carve([skein(deg)], [disc([0, 0], KNOT.r + PARTING)]), placing));
  c.group(() => {
    c.fill("thread-spool", toPath([knot], placing));
    for (const deg of [60, 180, 300]) c.fill("thread-spool", toPath(carve([tab(deg)], [disc([0, 0], KNOT.r + PARTING)]), placing));
  });
};
