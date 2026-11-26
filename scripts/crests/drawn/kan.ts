// The open curled bands from frame 27 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { curledBand } from "./quince-band.ts";

const centre: V = [0, 0];

/** One curved band, then equally spaced copies with the open end facing in or out. */
const openBands = (c: Builder, count: number, distance: number, face: Region[], outward: boolean): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  for (let i = 0; i < count; i += 1) {
    const angle = 360 * i / count;
    const at: V = [distance * Math.sin(angle * DEG), distance * Math.cos(angle * DEG)];
    c.fill("curled-band", toPath(face, { k: 1, at, turn: angle + (outward ? 180 : 0) }));
  }
};

export const mitsuKanBuild = (c: Builder): void => {
  const band = curledBand({ c: centre, r: 47 }, { c: centre, r: 38 }, { c: [39, -2], r: 9.7 }, 4.8, 1.7);
  openBands(c, 3, 64, band, true);
};
