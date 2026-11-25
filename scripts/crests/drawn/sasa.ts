// The nine bamboo-grass leaves, 九枚笹, struck and ruled in their own frame: the centre at (0, 0), x to the right, y up, the layout
// circle at 100. The proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 37, 丸に九枚笹).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: a broad leaf's midrib, and the white round a broad leaf where a narrow one passes under it. */
const LINE = 2;
/** The broad leaf's right edge: a circle on a grid point through the crest's centre, where the leaf's foot is. Its top is the layout circle. */
const EDGE: Circle = { c: [-45, 60], r: 75 };
/** The narrow leaf's upper edge, a circle on the axis, and its lower edge: they cross at its tip, a third of the way round to the next broad leaf. */
const UPPER: Circle = { c: [0, -122], r: 192 };
const LOWER: Circle = { c: [50, 136], r: 94 };

/**
 * The nine bamboo-grass leaves, 九枚笹: three groups of three, a third of a turn apart. A group is a broad leaf that stands from the
 * centre to the layout circle, a white midrib down it, and a narrow leaf that comes out from under each of its sides to a tip on
 * the layout circle, where it meets the next group's. The right half of the top group is built in full, and every other half
 * where it stands.
 */
export const kumaiZasaBuild = (c: Builder, part: string, reach: number): void => {
  const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
  const half = longLast(
    carveWhere([...disc([0, 0], 100), ...[EDGE, UPPER, LOWER].flatMap((circ) => disc(circ.c, circ.r)), ...disc(EDGE.c, EDGE.r + LINE), seg([LINE / 2, -200], [LINE / 2, 200])], (p) => {
      if (vdist([0, 0], p) > 100) return false;
      if (within(EDGE, p)) return p[0] > LINE / 2;

      return within(UPPER, p) && within(LOWER, p) && !within(EDGE, p, LINE);
    }),
  );

  c.guideCircle(C0, reach);
  for (const turn of [0, 120, 240]) for (const mirror of [false, true]) c.fill(part, toPath(half, { k: reach / 100, turn, mirror } satisfies Placing));
};
