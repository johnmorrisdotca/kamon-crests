import type { Builder } from "../../construct/builder.ts";
import { carveWhere, disc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { matsuInk } from "./matsu.ts";

const part = "pine";

export function kuroMatsuBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  const [crown, bough] = matsuInk();
  const arch = disc([0, -110], 95);
  const columns = [-57, -38, -19, 0, 19, 38, 57].map((x) =>
    carveWhere([...thickSeg([x, -7], [x, -70], 12), ...arch], ([a, b]) =>
      Math.abs(a - x) < 6 && b < -7 && b > -70 && Math.hypot(a, b + 110) < 95,
    ),
  );
  c.fill(part, toPath(columns.flat(), { k: 0.98 }));
  c.fill(part, toPath(bough, { k: 0.98 }));
  c.fill(part, toPath(crown, { k: 0.98 }));
}
