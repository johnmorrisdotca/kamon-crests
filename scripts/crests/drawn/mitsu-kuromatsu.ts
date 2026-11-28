import type { Builder } from "../../construct/builder.ts";
import { carve, DEG, disc } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0 } from "../../construct/geo.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "pine";
const spray: V = [0, 51.3];
const hubRadius = 5.4;
const breadth = 72.5;
const depth = 42.5;
const count = 30;
const field = 93.5;
const halfSpacing = spray[1] * Math.sqrt(3) / 2;

function rotate([x, y]: V, angle: number): V {
  const a = angle * DEG;
  return [x * Math.cos(a) + y * Math.sin(a), y * Math.cos(a) - x * Math.sin(a)];
}

/** Three spreads of ruled pine needles turn about the centre of the crest. */
export function mitsuKuromatsuBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, 96);
  const holeStations: V[] = [[-2.5, 1.7], [2.5, 1.7], [0, -2.6]];
  const hub = carve([disc([0, 0], hubRadius)], holeStations.map((at) => disc(at, PAPER / 2)));
  c.group(() => {
    for (const turn of [0, 120, 240]) {
      for (let i = 0; i < count; i += 1) {
        const heading = 360 * i / count + 6;
        const angle = heading * DEG;
        const x = Math.sin(angle);
        const y = Math.cos(angle);
        const oval = 1 / Math.hypot(x / breadth, y / depth);
        const pageEdge = Math.sqrt(field ** 2 - spray[1] ** 2 * x ** 2) - spray[1] * y;
        const towardNeighbour = Math.abs(x) / 2 - y * Math.sqrt(3) / 2;
        const clearance = towardNeighbour > 0 ? (halfSpacing - 2.75) / towardNeighbour : Infinity;
        const reach = Math.min(oval, pageEdge, clearance);
        const root = 4.25;
        const at = rotate([spray[0] + x * root, spray[1] + y * root], turn);
        cordBand.build(c, at, turn + heading, reach - root, { motif, width: 1.75 });
      }
      fillPart(c, motif, hub, { k: 1, at: rotate(spray, turn), turn });
    }
  });
}
