import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, carve, circleCircle, disc, mirrored, nearest, rotated, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const turns = [0, 120, 240];
const at = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

/** The three wider petal openings are separated by shortened comma heads. */
export function migiMitsuChojiTomoeBuild(c: Builder): void {
  c.precision(3);
  const rim: Circle = { c: [0, 0], r: R };
  const top = at(0, R);
  const tail = at(-120, R);
  const head: Circle = { c: at(0, 61), r: 35 };
  const swirl: Circle = { c: at(-120, 33), r: 63 };
  const neck = nearest(circleCircle(head.c, head.r, swirl.c, swirl.r), at(-70, 38));
  const body: Region = [arcTo(rim, tail, top, false), arcTo(head, top, neck, false), arcTo(swirl, neck, tail, true)].map(mirrored);
  const bodies = turns.map((turn) => body.map((edge) => rotated(edge, -turn * DEG)));
  const gaps = bodies.flatMap((loop) => loop.slice(1).flatMap((edge) =>
    edge.t === "A" ? [thickArc(edge.c, edge.r, 3.8, edge.a0, edge.a1)] : [],
  ));

  const lobes: { centre: V; radius: number; stem: V; tip: V }[] = [
    { centre: [0, 21], radius: 13, stem: [0, 37], tip: [0, 18] },
    { centre: [-24, 27], radius: 12, stem: [-13, 38], tip: [-25, 24] },
    { centre: [24, 27], radius: 12, stem: [13, 38], tip: [25, 24] },
  ];
  const mid = disc(lobes[0].centre, lobes[0].radius + 1.7);
  const petalClearance = lobes.map(({ centre, radius }) => disc(centre, radius + 1.7));
  const otherPetals = petalClearance.flatMap((loop) => turns.slice(1).map((turn) => loop.map((edge) => rotated(edge, -turn * DEG))));
  const crown = lobes.flatMap(({ centre, radius, stem, tip }, index) =>
    carve([disc(centre, radius)], [...bodies, ...gaps, ...otherPetals, thickSeg(stem, tip, 2.45), ...(index === 0 ? [] : [mid])]),
  );

  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);
  for (const turn of turns) c.fill("tomoe", toPath([body], { k: 1, turn }));
  for (const turn of turns) c.fill("clove", toPath(crown, { k: 1, turn }), "evenodd");
}
