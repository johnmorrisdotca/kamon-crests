// The open curled bands from frame 27 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, angleOf, carve, circleThrough, disc, mirrored, tangentCircle, thickArc, toPath, touch } from "../../construct/compass.ts";
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

export const itsutsuKanBuild = (c: Builder): void => {
  const band = curledBand({ c: centre, r: 35 }, { c: centre, r: 27 }, { c: [28, -4], r: 8.8 }, 4.5, 1.6);
  openBands(c, 5, 59, band, false);
};

export const kanWaTsunagiBuild = (c: Builder): void => {
  const crestPart = "curled-band";
  const horizontal = curledBand({ c: centre, r: 72 }, { c: centre, r: 62 }, { c: [42, 51], r: 10 }, 5, 0);
  const side = carve([
    thickArc(centre, 33, 10, -107 * DEG, 107 * DEG),
    disc([-12, -30], 8.6),
    disc([-12, 30], 8.6),
  ], []);

  c.precision(3);
  c.guideCircle(C0, R);
  c.fill(crestPart, toPath(horizontal, { k: 1, at: [0, -2] }));
  c.fill(crestPart, toPath(horizontal, { k: 1, at: [0, 2], turn: 180 }));
  c.fill(crestPart, toPath(side, { k: 1, at: [57, 0] }));
  c.fill(crestPart, toPath(side, { k: 1, at: [-57, 0], turn: 180 }));
};

export const kanBishiBuild = (c: Builder): void => {
  const head: V = [12, 69];
  const side: V = [82, 12];
  const circle = circleThrough(head, side, 93, [104, 111]);
  const band = carve([
    thickArc(circle.c, circle.r, 7.5, angleOf(circle.c, head), angleOf(circle.c, side)),
    disc([13, 74], 8.8),
    disc([83, 16], 9.4),
  ], []);

  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 180]) {
    for (const mirror of [false, true]) c.fill("curled-band", toPath(band, { k: 1, turn, mirror }));
  }
};

export const yotsuKaraKanBishiBuild = (c: Builder): void => {
  const crown = { c: [0, 57] as V, r: 22 };
  const shoulder = { c: [28, 50] as V, r: 15 };
  const join = tangentCircle(crown, 1, shoulder, 1, 6.4, [20, 74]);
  const crownTouch = touch(crown, join);
  const shoulderTouch = touch(shoulder, join);
  const width = 8.2;
  const crownEnd = angleOf(crown.c, crownTouch);
  const blend = thickArc(join.c, join.r, width, angleOf(join.c, crownTouch), angleOf(join.c, shoulderTouch));
  const curl = thickArc(shoulder.c, shoulder.r, width, angleOf(shoulder.c, shoulderTouch), -95 * DEG);
  const lobe = carve([
    thickArc(crown.c, crown.r, width, crownEnd, Math.PI - crownEnd),
    blend, blend.map(mirrored),
    curl, curl.map(mirrored),
    disc([28, 39], 8.8), disc([-28, 39], 8.8),
  ], []);

  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("curled-band", toPath(lobe, { k: 1 }));
  c.fill("curled-band", toPath(lobe, { k: 1, turn: 180 }));
  c.fill("curled-band", toPath(lobe, { k: 1, at: [8, 0], turn: 90 }));
  c.fill("curled-band", toPath(lobe, { k: 1, at: [-8, 0], turn: 270 }));
};
