import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, R, poly } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

export function ioriBuild(c: Builder): void {
  const roofRise = 64;
  const foot = CY + 67;
  const postOutside = 62;
  const postInside = 30;
  const apex: Pt = [CX, CY - roofRise];
  const leftEave: Pt = [CX - R, CY];
  const rightEave: Pt = [CX + R, CY];

  c.guideCircle(C0, R);
  c.guideCircle(C0, roofRise);
  c.guideLine(C0, apex);
  c.guideLine(leftEave, apex);
  c.guideLine(apex, rightEave);
  c.guideLine(leftEave, rightEave);
  c.guideLine([CX - postOutside, foot], [CX + postOutside, foot]);
  for (const offset of [-postOutside, -postInside, postInside, postOutside]) {
    c.guideLine([CX + offset, CY], [CX + offset, foot]);
  }

  c.fill("hermitage", poly([
    apex, rightEave,
    [CX + postOutside, CY], [CX + postOutside, foot], [CX + postInside, foot], [CX + postInside, CY],
    [CX - postInside, CY], [CX - postInside, foot], [CX - postOutside, foot], [CX - postOutside, CY],
    leftEave,
  ]));
}
