// A level bar over three discs, from frame 9 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { disc, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const hitotsuHikiMitsuBoshiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const across = 61.5;
  const radius = 28;
  const low = -45.3;
  const high = 10.2;
  const half = 61.5;
  const top = 72.5;
  const bottom = 45.5;
  const corners: V[] = [[-half, top], [half, top], [half, bottom], [-half, bottom]];
  const bar: Region = corners.map((corner, index) => seg(corner, corners[(index + 1) % corners.length]));
  c.fill("bar", toPath([bar], { k: 1 }));
  for (const at of [[0, high], [across / 2, low], [-across / 2, low]] as V[]) c.fill("star", toPath([disc(at, radius)], { k: 1 }));
};
