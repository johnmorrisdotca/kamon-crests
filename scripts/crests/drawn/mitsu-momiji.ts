import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, onCircle, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart } from "../library/layers.ts";
import { leafMaple } from "../library/leaf-maple.ts";
import { PAPER } from "../library/part.ts";

const motif = "maple";
const paper = PAPER;
const leaf = { motif, paper, profile: "crescent", stalk: false } as const;
const turns = [0, 120, 240];

function triangle(centre: V, radius: number): Region {
  const corners = turns.map((turn) => onCircle(centre, radius, (-90 - turn) * DEG));
  return corners.map((a, i) => seg(a, corners[(i + 1) % corners.length]));
}

export function mitsuMomijiBuild(c: Builder): void {
  const centre: V = [0, -10.4];
  c.precision(3);
  c.group(() => {
    fillPart(c, motif, carve([triangle(centre, 21.4)], [triangle(centre, 16.7)]), { k: 1 });
    for (const turn of turns) {
      const angle = (90 - turn) * DEG;
      const root = onCircle(centre, 9.2, angle);
      cordBand.build(c, root, turn, 22.8, { motif, paper, width: 7.2 });
      leafMaple.build(c, onCircle(centre, 36.7, angle), turn, 52, leaf);
    }
  });
}
