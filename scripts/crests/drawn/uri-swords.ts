// The sword melon in the 1892 book: five melon lobes about a five-petalled flower, with a sword point between each pair. The sword points' reach counts 100.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, disc, inside, onCircle, rotated, seg, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { curledBand } from "./quince-band.ts";
import { PAPER } from "../library/part.ts";

const ORIGIN: V = [0, 0];
const SECTOR = 27 * DEG;
const HEART = 10;
// A lobe is the part of one circle between two ruled flanks from the middle, outside the curled band that lies in it.
const CAP: Circle = { c: [0, 47], r: 50 };
const BAND: Circle = { c: [0, 28], r: 39.5 };
const BAND_WIDTH = 5;
const BAND_SWEEP = 72;
const BAND_BULB = 4.2;
const BAND_GAP = 5.5;
// The flower's petal fills the foot of the lobe: a round body, a tip lobe and two shoulders.
const PETAL: readonly Circle[] = [{ c: ORIGIN, r: 37 }, { c: [0, 44], r: 10.5 }, { c: [-12, 38], r: 9 }, { c: [12, 38], r: 9 }];
const STAMEN = 33;

const within = ({ c, r }: Circle, p: V): boolean => vdist(c, p) < r;

const sector = (paper: number, open = SECTOR): { flanks: Region; inside: (p: V) => boolean } => {
  const sin = Math.sin(open);
  const cos = Math.cos(open);
  const foot = paper / 2 / cos;

  return {
    flanks: [-1, 1].map((side) => seg([-side * foot, 0], [-side * foot + side * 110 * sin, 110 * cos])),
    inside: ([x, y]) => y * sin - Math.abs(x) * cos > paper / 2,
  };
};

const lobe = (paper: number): Region[] => {
  const { flanks, inside: between } = sector(paper);
  const hollow: Circle = { c: BAND.c, r: BAND.r + BAND_GAP };

  return carveWhere([...disc(CAP.c, CAP.r), ...disc(hollow.c, hollow.r), ...flanks], (p) => between(p) && within(CAP, p) && !within(hollow, p));
};

// The petal's own flanks open one degree less than the lobe's, so that each part is ruled with its own lines.
const petal = (paper: number): Region[] => {
  const { flanks, inside: between } = sector(paper, SECTOR - DEG);
  const clear = HEART + paper;

  return carveWhere(
    [...PETAL.flatMap(({ c, r }) => disc(c, r)), ...flanks, ...disc(ORIGIN, clear), ...thickSeg(ORIGIN, [0, STAMEN], 2 * paper)],
    ([x, y]) => between([x, y]) && vdist(ORIGIN, [x, y]) > clear && PETAL.some((one) => within(one, [x, y])) && !(Math.abs(x) < paper && y < STAMEN),
  );
};

// The sword: a ruled blade from the middle that widens to two shoulders and ends in a blunt point. The lobes lie over it.
const BLADE: V[] = [[-2.5, 10], [-22, 86], [0, 100], [22, 86], [2.5, 10]];

const sword = (paper: number): Region[] => {
  const blade: Region = BLADE.map((point, i) => seg(point, BLADE[(i + 1) % BLADE.length]));
  const turned = ({ c, r }: Circle, turn: number): Circle => ({ c: [c[0] * Math.cos(turn) - c[1] * Math.sin(turn), c[0] * Math.sin(turn) + c[1] * Math.cos(turn)], r: r + paper });
  const caps = [turned(CAP, 36 * DEG), turned(CAP, -36 * DEG)];
  // Between the two lobes' flanks the blade is a narrow wedge. Beyond their caps its shoulders and point stand free.
  const open = 36 * DEG - SECTOR;
  const sin = Math.sin(open);
  const cos = Math.cos(open);
  const foot = paper / 2 / cos;
  const wedge = [-1, 1].map((side) => seg([-side * foot, 0], [-side * foot + side * 110 * sin, 110 * cos]));

  return carveWhere(
    [...blade, ...caps.flatMap(({ c, r }) => disc(c, r)), ...wedge, ...disc(ORIGIN, HEART + paper)],
    (p) => inside(blade, p) && vdist(ORIGIN, p) > HEART + paper && (p[1] * sin - Math.abs(p[0]) * cos > paper / 2 || !caps.some((cap) => within(cap, p))),
  );
};

export function kenUriBuild(c: Builder): void {
  c.precision(3);
  const k = R / 100;
  const paper = PAPER / k;
  const turns = [0, 72, 144, 216, 288];

  c.guideCircle(C0, R);
  for (const turn of turns) c.fill("quince-lobes", toPath(lobe(paper), { k, turn }));
  // The band is the catalogue's curled quince band on its own circle: the two ends swell into bulbs that roll inwards.
  const inner: Circle = { c: BAND.c, r: BAND.r - BAND_WIDTH };
  const bulb: Circle = { c: onCircle(BAND.c, inner.r + 1, (90 - BAND_SWEEP / 2) * DEG), r: BAND_BULB };
  const band = curledBand(BAND, inner, bulb, 2, 0);
  for (const turn of turns) c.fill("quince-lobes", toPath(band, { k, turn }));
  const round = (regions: Region[]): Region[] => turns.flatMap((turn) => regions.map((loop) => loop.map((piece) => rotated(piece, -turn * DEG))));
  c.fill("karahana", toPath([...round(petal(paper)), ...carve([disc(ORIGIN, HEART)], [disc(ORIGIN, PAPER)])], { k }), "evenodd");
  c.fill("sword", toPath(round(sword(paper)), { k, turn: 36 }));
}
