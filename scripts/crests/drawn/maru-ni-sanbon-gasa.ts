// 丸に三本傘, as the 1892 crest book draws 丸ニ三本傘 (frame 16, left page, third row, first column from the right): three closed
// umbrellas crossed through the middle of a ring, a sixth of a turn apart. Each is a folded canopy narrowing to a round head, its
// lower end a bowl under the rim of the folds with the handle standing out of it. The numbers are the cell's pixels from the
// ring's centre, y up, for the upright umbrella.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import { DEG, arcTo, carve, circleCircle, disc, lineCircle, lineLine, nearest, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

/** The ring from 129.5 to 154.4 out. */
const RING = { outer: 154.4, inner: 129.5 };
/** The head: a disc of 17 about a point 111 up. */
const HEAD = { at: [0, 111] as V, r: 17 };
/** The canopy's sides, each through a point 17 out at 104 up and one 30 out at 87 down. */
const SIDE: [V, V] = [[17, 104], [30, -87]];
/** The bowl's foot, an arc through the sides' lower points bowing to 102 down; the rim of the folds over it, bowing up to 73 down. */
const FOOT = { c: [0, -64.5] as V, r: 37.5 };
const RIM = { c: [0, -112.14] as V, r: 39.14 };
/** The handle, 10 wide, from inside the bowl to under the ring. */
const HANDLE: [V, V, number] = [[0, -95], [0, -131], 10];
/** Four folds, white lines 2.5 wide, run from the canopy's apex to these points across its foot. */
const FOLDS = [-18, -6, 6, 18];
const PARTING = 2.5;

const mirror = ([x, y]: V): V => [-x, y];

/** The canopy's side `g` farther out, as two points on it. */
const side = (g: number, s: 1 | -1): [V, V] => {
  const [p, q] = SIDE;
  const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
  const n: V = [(p[1] - q[1]) / d, (q[0] - p[0]) / d];
  const out: V = n[0] > 0 ? n : [-n[0], -n[1]];
  const [a, b]: [V, V] = [[p[0] + g * out[0], p[1] + g * out[1]], [q[0] + g * out[0], q[1] + g * out[1]]];
  return s > 0 ? [a, b] : [mirror(a), mirror(b)];
};

/** The canopy from under the head to its foot, `g` larger all round. */
const canopy = (g: number): Region => {
  const [right, left] = [side(g, 1), side(g, -1)];
  const level: [V, V] = [HEAD.at, [1, HEAD.at[1]]];
  const [topRight, topLeft] = [lineLine(...right, ...level), lineLine(...left, ...level)];
  const [footRight, footLeft] = [nearest(lineCircle(...right, FOOT.c, FOOT.r + g), SIDE[1]), nearest(lineCircle(...left, FOOT.c, FOOT.r + g), mirror(SIDE[1]))];
  return [seg(topLeft, topRight), seg(topRight, footRight), arcTo({ c: FOOT.c, r: FOOT.r + g }, footRight, footLeft, false), seg(footLeft, topLeft)];
};

/** An umbrella's own parts, and its outline grown by the parting to clear what lies under it. */
const umbrella = (): { parts: Region[]; cover: Region[] } => {
  const apex = lineLine(...side(0, 1), ...side(0, -1));
  const folds = FOLDS.map((x) => {
    const foot: V = [x, SIDE[1][1]];
    const t = (y: number): V => [apex[0] + ((foot[0] - apex[0]) * (y - apex[1])) / (foot[1] - apex[1]), y];
    return thickSeg(t(HEAD.at[1] + 10), t(SIDE[1][1] - 10), PARTING);
  });
  const body = carve([canopy(0)], [disc(RIM.c, RIM.r + PARTING / 2), ...folds]);
  const inner = RIM.r - PARTING / 2;
  const [a, b] = circleCircle(FOOT.c, FOOT.r, RIM.c, inner);
  const [left, right] = a[0] < b[0] ? [a, b] : [b, a];
  const bowl: Region = [arcTo(FOOT, left, right, true), arcTo({ c: RIM.c, r: inner }, right, left, true)];
  const handle = thickSeg(...HANDLE);
  const grown = (g: number): Region[] => [canopy(g), disc(HEAD.at, HEAD.r + g), thickSeg([0, HANDLE[0][1] + g], [0, HANDLE[1][1] - g], HANDLE[2] + 2 * g)];
  return { parts: [...body, bowl, handle, disc(HEAD.at, HEAD.r)], cover: grown(PARTING) };
};

const turned = (region: Region, deg: number): Region => region.map((piece) => rotated(piece, -deg * DEG));

export const maruNiSanbonGasaBuild = (c: Builder): void => {
  const k = R / RING.outer;
  c.guideCircle(C0, R);
  c.guideCircle(C0, RING.inner * k);
  c.fill("frame", circle(C0, R).join(circle(C0, RING.inner * k)), "evenodd");
  const { parts, cover } = umbrella();
  // From the back: the one leaning to the lower right, the upright one, the one leaning to the upper right.
  const order = [120, 0, 60];
  order.forEach((deg, i) => {
    const over = order.slice(i + 1).flatMap((above) => cover.map((region) => turned(region, above)));
    c.group(() => {
      for (const part of parts) {
        const shown = carve([turned(part, deg)], over);
        if (shown.length > 0) c.fill("umbrella", toPath(shown, { k }));
      }
    });
  });
};
