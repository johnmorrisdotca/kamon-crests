// A stepped square frame from frame 19 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const steppedSquare = (half: number, inset: number, radius: number): Region => {
  const shoulder = half - inset;
  const first: V = [shoulder, half];
  const bend: V = [shoulder + radius, half - radius];
  const middle: V = [shoulder + radius, shoulder + radius];
  const rise: V = [half - radius, shoulder + radius];
  const end: V = [half, shoulder];
  const quarter = [
    seg([-shoulder, half], first),
    arcTo({ c: [shoulder, half - radius], r: radius }, first, bend, false),
    seg(bend, middle),
    seg(middle, rise),
    arcTo({ c: [half - radius, shoulder], r: radius }, rise, end, false),
  ];

  return [0, -90, -180, -270].flatMap((angle) => quarter.map((piece) => rotated(piece, angle * DEG)));
};

export const kakuiriKakuBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("square-frame", toPath([steppedSquare(76, 19, 7), steppedSquare(52, 13, 4.5)], { k: 1 }), "evenodd");
};
