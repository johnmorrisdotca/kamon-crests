import type { Builder } from "../../construct/builder.ts";
import { DEG, arcA, carve, circleThrough, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const clove = "clove";
const bow = (from: V, to: V, r: number, hint: V): Piece => shortArc(circleThrough(from, to, r, hint), from, to);
const around = (loop: Region, width: number): Region[] => loop.map((edge) => edge.t === "A"
  ? thickArc(edge.c, edge.r, width, edge.a0, edge.a1)
  : thickSeg(edge.a, edge.b, width));

/** A drop with its point down: a half circle on `head`, and two long arcs that leave it level with its centre and meet at `foot` below. */
function drop(head: V, r: number, foot: number): Region {
  const fall = head[1] - foot;
  const reach = (fall * fall - r * r) / (2 * r);
  const left: V = [head[0] - r, head[1]];
  const right: V = [head[0] + r, head[1]];
  const point: V = [head[0], foot];

  return [
    arcA(head, r, 0, Math.PI),
    bow(left, point, reach + r, [head[0] + reach, head[1]]),
    bow(point, right, reach + r, [head[0] - reach, head[1]]),
  ];
}

/** A star of five points about `at`, its upper point leaning `turn` degrees clockwise. */
function star(at: V, reach: number, turn: number): { outline: Region; corner: (i: number) => V } {
  const waist = reach * Math.sin(18 * DEG) / Math.sin(54 * DEG);
  const corner = (i: number): V => {
    const angle = (turn + 36 * i) * DEG;
    const d = i % 2 === 0 ? reach : waist;

    return [at[0] + d * Math.sin(angle), at[1] + d * Math.cos(angle)];
  };

  return { outline: Array.from({ length: 10 }, (_, i) => seg(corner(i), corner(i + 1))), corner };
}

/** Three clove buds stand as a paulownia's leaves, the middle one in front, with a star flower above each, inside a broad ring. */
export function futowaNiChojiGiriBuild(c: Builder): void {
  c.precision(3);
  const room = 62;
  c.guideCircle(C0, R);
  c.guideCircle(C0, room);
  c.fill("frame", circle(C0, R).join(circle(C0, room)), "evenodd");
  const k = 0.96;
  const gap = 5;

  const bud = drop([0, 3], 23, -53);
  const eye = drop([0, 1], 9.5, -30);
  const side = disc([27, -6.5], 26.5);
  const top: V = [33, 8];
  const low: V = [28, -24];
  const slit: Region = [bow(top, low, 18, [22, -8]), bow(low, top, 50, [-18, -8])];
  const right = carve([side], [bud, ...around(bud, gap), slit]);
  const left = right.map((loop) => loop.map(mirrored));

  const flower = (at: V, reach: number, turn: number, hidden: Region[]): Region[] => {
    const { outline, corner } = star(at, reach, turn);
    const mark = [thickSeg(at, corner(4), 1.6), thickSeg(at, corner(6), 1.6)];

    return carve([outline], [...hidden, ...mark]);
  };
  const front = [bud, ...around(bud, gap)];
  const beside = [disc([27, -6.5], 26.5 + gap / 2)];
  const sideFlower = flower([38, 24], 17, 14, [...front, ...beside]);

  c.fill(clove, toPath(flower([0, 34.5], 21, 0, front), { k, at: [0, -3.2] }), "evenodd");
  c.fill(clove, toPath(sideFlower.map((loop) => loop.map(mirrored)), { k, at: [0, -3.2] }), "evenodd");
  c.fill(clove, toPath(sideFlower, { k, at: [0, -3.2] }), "evenodd");
  c.fill(clove, toPath(left, { k, at: [0, -3.2] }), "evenodd");
  c.fill(clove, toPath(right, { k, at: [0, -3.2] }), "evenodd");
  c.fill(clove, toPath([bud, eye], { k, at: [0, -3.2] }), "evenodd");
}
