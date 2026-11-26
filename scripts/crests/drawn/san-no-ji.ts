import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]) => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

const octagon = (half: number, flat: number) => polygon([
  [-flat, half], [flat, half], [half, flat], [half, -flat],
  [flat, -half], [-flat, -half], [-half, -flat], [-half, flat],
]);

const bars = (c: Builder, rows: [center: number, halfWidth: number, height: number][]): void => {
  for (const [center, halfWidth, height] of rows) {
    const top = center + height / 2;
    const bottom = center - height / 2;
    c.fill("san-no-ji", toPath([polygon([[-halfWidth, top], [halfWidth, top], [halfWidth, bottom], [-halfWidth, bottom]])], { k: 1 }));
  }
};

export function sumikiriKakuNiSanNoJiBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const half = 89.5;
  const flat = 32.5;
  const band = 20;
  const outer = octagon(half, flat);
  const inner = octagon(half - band, flat - band * (Math.SQRT2 - 1));
  c.fill("cut-corner-square", toPath([outer, inner], { k: 1 }), "evenodd");
  bars(c, [[44, 28, 19], [6, 21, 20], [-32, 35, 21]]);
}
