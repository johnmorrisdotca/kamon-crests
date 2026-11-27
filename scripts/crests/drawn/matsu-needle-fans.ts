import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, rotated, thickSeg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

/** Three crowded needle fans keep a set of white joints on each inner edge. */
export function mitsuWariKuroMatsuBuild(c: Builder): void {
  c.precision(3);
  const rays = Array.from({ length: 25 }, (_, index) => {
    const offset = index - 12;
    const angle = offset * 4.65 * DEG;
    const tip: V = [94 * Math.sin(angle), 94 * Math.cos(angle)];
    const foot: V = [24 * Math.sin(angle), 21.5 + Math.max(0, Math.abs(offset) - 5) * 2.8];
    return thickSeg(foot, tip, 2.65);
  });
  const joints: V[] = [[-12.6, 23], [0, 22.5], [12.6, 23]];
  const bases = joints.map((point) => disc(point, 6.6));
  const eyes = joints.map(([x, y]) => disc([x, y - 1.7], 4.0));
  const fan = carve([...rays, ...bases], eyes);
  const allFans = [0, 120, 240].flatMap((turn) =>
    fan.map((loop) => loop.map((piece) => rotated(piece, -turn * DEG))),
  );
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);
  c.fill("pine", toPath(allFans, { k: 1 }), "evenodd");
}
