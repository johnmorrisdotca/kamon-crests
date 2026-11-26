// Measured from the arrowhead cells of frame 14 in the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversed, rotated, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const aroundOmodaka = (region: Region, turn: number): Region => region.map((piece) => rotated(piece, turn * DEG));

const omodakaBend = (from: V, to: V, radius: number, hint: V): Region[number] =>
  shortArc(circleThrough(from, to, radius, hint), from, to);

const omodakaInk = (piece: Region[number], width: number): Region => piece.t === "A"
  ? thickArc(piece.c, piece.r, width, piece.a0, piece.a1)
  : thickSeg(piece.a, piece.b, width);

const halvesOmodaka = (edge: Region): Region => [...edge, ...edge.map(mirrored).reverse().map(reversed)];

const uprightOmodakaSpray = (scale: number, bottom: number): Region[] => {
  const stem: Region[] = [thickSeg([0, bottom], [0, 82 * scale], 3.6 * scale)];
  for (const sign of [-1, 1]) {
    for (const [y, x, spread] of [[74, 16, 5], [51, 19, 7], [16, 26, 11]]) {
      const from: V = [0, scale * (y - 6)];
      const centre: V = [sign * x * scale, (y + 4) * scale];
      stem.push(omodakaInk(omodakaBend(from, centre, 42 * scale, [sign * 15 * scale, (y + 28) * scale]), 3 * scale));
      const radius = spread * scale;
      stem.push(disc(centre, radius * 0.67),
        disc([centre[0] + sign * radius * 0.5, centre[1] + radius * 0.34], radius * 0.57),
        disc([centre[0] + sign * radius * 0.72, centre[1] - radius * 0.12], radius * 0.48),
        disc([centre[0] + sign * radius * 0.3, centre[1] - radius * 0.45], radius * 0.54));
    }
  }
  stem.push(disc([0, 85 * scale], 8.5 * scale));
  return stem;
};


/** The thin bow of each leaf dips to a crossed foot below the spray. */
export const dakiawaseOmodakaBuild = (c: Builder): void => {
  c.precision(3);
  const tip: V = [0, 95];
  const curve: V = [62, 57];
  const shoulder: V = [71, 8];
  const end: V = [75, -49];
  const hook: V = [52, -26];
  const fold: V = [22, -58];
  const root: V = [42, -17];
  const leaf = [omodakaBend(tip, curve, 84, [-16, 17]), omodakaBend(curve, shoulder, 110, [-43, 12]),
    omodakaBend(shoulder, end, 77, [-5, -23]), omodakaBend(end, hook, 52, [104, -14]),
    omodakaBend(hook, fold, 66, [3, -3]), omodakaBend(fold, root, 62, [84, -61]), omodakaBend(root, tip, 105, [-59, 8])];
  const paper = [omodakaInk(omodakaBend([3, 88], [56, 10], 122, [-64, -13]), 2.8),
    omodakaInk(omodakaBend([56, 10], [38, -34], 80, [-22, 18]), 2.6), disc([56, 10], 4.1)];
  const crossing = omodakaInk(omodakaBend([64, -21], [-16, -92], 92, [-27, 3]), 5.8);
  const half = carve([leaf, crossing], paper);
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  c.fill("sword-leaf", toPath([...half, ...half.map((loop) => loop.map(mirrored).reverse().map(reversed))], { k: 0.984 }));
  c.fill("sword-leaf", toPath(carve(uprightOmodakaSpray(0.88, -93), []), { k: 0.984 }));
};

/** Its raised wings each have a wide cutout running to the bottom joint. */
export const nagatoOmodakaBuild = (c: Builder): void => {
  c.precision(3);
  const tip: V = [0, 96];
  const shoulder: V = [54, 41];
  const outer: V = [81, 2];
  const heel: V = [53, -56];
  const base: V = [0, -93];
  const throat: V = [15, -25];
  const inside: V = [48, 16];
  const black = [omodakaBend(tip, shoulder, 69, [-15, 28]), omodakaBend(shoulder, outer, 34, [53, 4]),
    omodakaBend(outer, heel, 66, [17, -12]), omodakaBend(heel, base, 77, [-8, -30]),
    omodakaBend(base, throat, 88, [78, -73]), omodakaBend(throat, inside, 53, [-1, 17]), omodakaBend(inside, tip, 83, [-34, 21])];
  const voidFoot: V = [4, -83];
  const voidTop: V = [59, -7];
  const hollow = [omodakaBend(voidFoot, voidTop, 73, [-7, -15]), omodakaBend(voidTop, voidFoot, 97, [-34, 17])];
  const line = omodakaInk(omodakaBend([7, 88], [51, 17], 120, [-66, -20]), 2.7);
  const cut = carve([black], [hollow, line, disc([51, 17], 3.7)]);
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  c.fill("sword-leaf", toPath([...cut, ...cut.map((loop) => loop.map(mirrored).reverse().map(reversed))], { k: 0.985 }));
  c.fill("sword-leaf", toPath(carve(uprightOmodakaSpray(0.92, -92), []), { k: 0.985 }));
};
const broadOmodaka = (reach: number): Region[] => {
  const tip: V = [0, reach];
  const shoulder: V = [reach * 0.265, reach * 0.51];
  const bay: V = [reach * 0.20, reach * 0.14];
  const foot: V = [0, -reach * 0.16];
  const half = [omodakaBend(tip, shoulder, reach * 0.66, [-reach * 0.34, reach * 0.51]),
    omodakaBend(shoulder, bay, reach * 0.48, [-reach * 0.25, reach * 0.47]),
    omodakaBend(bay, foot, reach * 0.49, [-reach * 0.29, reach * 0.16])];
  const leaf = halvesOmodaka(half);
  const turns = [0, 120, 240];
  const white = [disc([0, 0], reach * 0.052)];
  for (const turn of turns) white.push(aroundOmodaka(thickSeg([0, reach * 0.054], [0, reach * 0.93], reach * 0.024), turn));
  return carve(turns.map((turn) => aroundOmodaka(leaf, turn)), white);
};

/** Short stalks and two low sprays sit below the broad central lobes. */
export const maruNiFutoOmodakaBuild = (c: Builder, inner: number): void => {
  c.precision(3);
  const k = (inner - 1.8) / 96;
  const lobes = broadOmodaka(91);
  const stems = [-1, 0, 1].map((side) => thickSeg([side * 9, -26], [side * 4.5, -85], 3.65));
  const sprays: Region[] = [];
  for (const side of [-1, 1]) {
    const foot: V = [side * 24, -5];
    const stop: V = [side * 68, 38];
    sprays.push(omodakaInk(omodakaBend(foot, stop, 105, [side * -27, 76]), 3.5));
    for (const [x, y] of [[43, 16], [51, 24], [62, 31], [70, 42]]) {
      sprays.push(disc([side * x, y], 5.2), disc([side * (x - 5), y + 6], 3.9));
    }
  }
  c.guideSpokes(3, 0, inner);
  c.fill("sword-leaf", toPath(carve([...stems, ...sprays], [disc([0, 0], 28)]), { k }));
  c.fill("sword-leaf", toPath(lobes, { k }));
};
