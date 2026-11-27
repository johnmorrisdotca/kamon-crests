import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import { AOI_LEAF } from "./aoi.ts";
import type { Piece, Placing, V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, near: V) => shortArc(circleThrough(from, to, radius, near), from, to);

const aoiLocation = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function aoiLeafAt(c: Builder, placing: Placing): void {
  const right = toPath([AOI_LEAF.axis, ...AOI_LEAF.cells], placing);
  const left = toPath(AOI_LEAF.cells, { ...placing, mirror: true });
  c.fill("hollyhock", right.join(left));
}

export function itowaNiItsutsuUraAoiBuild(c: Builder): void {
  c.precision(3);
  const room = c.ring("ring-thread");
  const reach = (room - 0.8) / 91;
  c.guideSpokes(5, 0, room);
  const half = [
    arc([0, 91], [28, 65], 71, [-21, 30]),
    arc([28, 65], [33, 50], 22, [13, 50]),
    arc([33, 50], [20, 34], 21, [13, 52]),
    arc([20, 34], [0, 42], 15, [14, 47]),
  ];
  const leaf = [...half, ...reversedRun(half.map(mirrored))];
  const curl = [
    thickArc([13.7, 44.4], 7.7, 2.55, -33 * DEG, 228 * DEG),
    thickArc([14.6, 43.1], 4.2, 2.35, 162 * DEG, 320 * DEG),
  ];
  const stems = [thickSeg([8.5, 41], [4.1, 14.2], 2.65), thickSeg([-8.5, 41], [-4.1, 14.2], 2.65)];
  const ink = carve([leaf, ...stems], [...curl, ...curl.map((band) => band.map(mirrored))]);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("hollyhock", toPath(ink, { k: reach, turn }), "evenodd");
  c.fill("hollyhock", toPath([disc([0, 0], 16)], { k: reach }));
}

export function hosowaNiHanaTachiAoiBuild(c: Builder): void {
  c.precision(3);
  const room = c.ring("ring-thin");
  const leafScale = 0.74;
  const reach = room - 5 + AOI_LEAF.tip[1] * leafScale;
  const stemEnd: V = [44.4, -11.7];
  const stemCircle = circleThrough(stemEnd, [26, -68], 35, [53, -42]);
  const stemArc = shortArc(stemCircle, stemEnd, [26, -68]) as Extract<Piece, { t: "A" }>;
  const root = thickArc(stemArc.c, stemArc.r, 7, Math.min(stemArc.a0, stemArc.a1), Math.max(stemArc.a0, stemArc.a1));
  for (const turn of [90, 270]) {
    const mirror = turn === 270;
    const placing = { k: leafScale, at: aoiLocation(turn, reach), turn: turn + 180 };
    c.group(() => {
      c.fill("hollyhock", toPath([root], { k: 1, mirror }));
      aoiLeafAt(c, placing);
    });
  }
  const crownSide = [
    arc([0, 82], [9.3, 74], 14, [-3, 68]),
    arc([9.3, 74], [23, 74], 20, [16, 59]),
    arc([23, 74], [20, 54], 20, [8, 66]),
    arc([20, 54], [25, 45], 13, [13, 44]),
    arc([25, 45], [10, 30], 22, [5, 49]),
    arc([10, 30], [0, 43], 18, [16, 45]),
  ];
  const crown = [...crownSide, ...reversedRun(crownSide.map(mirrored))];
  const spine = thickSeg([0, 44], [0, 73.5], 2.0);
  const vertices: V[] = Array.from({ length: 10 }, (_, n) => {
    const [x, y] = aoiLocation(n * 36, n % 2 === 0 ? 25 : 13.1);
    return [x, y + 14];
  });
  const bloom = vertices.map((point, n) => arc(point, vertices[(n + 1) % vertices.length], 38, [0, 16]));
  const curl = thickArc([0, 17], 7.5, 2.1, 211 * DEG, 329 * DEG);
  c.group(() => {
    c.fill("hollyhock", toPath(carve([crown], [spine]), { k: 1 }), "evenodd");
    c.fill("hollyhock", toPath([thickSeg([0, -71], [0, 9], 7.5)], { k: 1 }));
    c.fill("hollyhock", toPath([bloom, curl], { k: 1 }), "evenodd");
  });
}
