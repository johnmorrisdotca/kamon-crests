import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const clove = "clove";
const bow = (from: V, to: V, r: number, hint: V): Piece => shortArc(circleThrough(from, to, r, hint), from, to);

/** A short clove of the wheel, upright in the frame of the room inside the ring: a bud that widens from the hub, and three round petals. */
function wheelClove(): Region[] {
  const bud: Region = [
    bow([4, 12], [13.5, 31], 28, [-17, 30]),
    bow([13.5, 31], [-13.5, 31], 16, [0, 24]),
    bow([-13.5, 31], [-4, 12], 28, [17, 30]),
    seg([-4, 12], [4, 12]),
  ];
  const clearance = bud.map((edge) => edge.t === "A" ? thickArc(edge.c, edge.r, 3.4, edge.a0, edge.a1) : thickSeg(edge.a, edge.b, 3.4));
  const middle = disc([0, 47], 10.5);
  const stamen = (from: V, tip: V): Region[] => [thickSeg(from, tip, 2), disc(tip, 1.4)];
  const petal = (at: V, from: V, tip: V): Region[] => carve([disc(at, 11)], [bud, ...clearance, disc([0, 47], 12.2), ...stamen(from, tip)]);

  return [
    bud,
    ...carve([middle], [bud, ...clearance, ...stamen([0, 40], [0, 50])]),
    ...petal([-18, 38], [-11, 35], [-19, 41]),
    ...petal([18, 38], [11, 35], [19, 41]),
  ];
}

/** A vine of the wheel, upright: a stem from the hub that parts into two tendrils, each a half circle that turns back into a smaller one. */
function wheelVine(): Region[] {
  const fork = 47;
  const weight = 2;
  const curl = (side: 1 | -1): Region[] => {
    const wide: V = [side * 7.5, fork];
    const tight: V = [side * 11.25, fork];
    const outer = side === 1 ? thickArc(wide, 7.5, weight, Math.PI, 0) : thickArc(wide, 7.5, weight, 0, Math.PI);
    const inner = side === 1 ? thickArc(tight, 3.75, weight, 0, -Math.PI) : thickArc(tight, 3.75, weight, Math.PI, 2 * Math.PI);

    return [outer, inner, disc([side * 7.5, fork], 1.6)];
  };

  return carve([thickSeg([0, 9], [0, fork], weight), ...curl(1), ...curl(-1)], []);
}

/** Three short cloves and three forked vines turn about a round hub, inside a broad ring. */
export function futowaNiTsuruChojiBuild(c: Builder): void {
  c.precision(3);
  const room = 60.5;
  c.guideCircle(C0, R);
  c.guideCircle(C0, room);
  c.fill("frame", circle(C0, R).join(circle(C0, room)), "evenodd");
  const k = 0.96;
  const bud = wheelClove();
  const vine = wheelVine();
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill(clove, toPath(bud, { k, turn }), "evenodd");
    });
  }
  for (const turn of [60, 180, 300]) {
    c.group(() => {
      c.fill(clove, toPath(vine, { k, turn }), "evenodd");
    });
  }
  c.fill(clove, toPath([disc([0, 0], 10.5)], { k }));
}
