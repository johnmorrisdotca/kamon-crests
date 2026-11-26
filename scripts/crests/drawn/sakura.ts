// Cherry blossoms measured from frame 37 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, circleThrough, disc, inside, mirrored, reversed, reversedRun, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const PART = "cherry";
const TURNS = [0, 72, 144, 216, 288];
const ORIGIN: V = [0, 0];
const HALF = 36 * DEG;
const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

const struck = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

/** Two cap arcs meet at the shallow notch. The flanks taper towards the round heart. */
const cherryPetal = (notch: number, width: number, cap: number, shoulderHeight = 69): Region => {
  const foot: V = [0, 10];
  const shoulder: V = [-width, shoulderHeight];
  const cleft: V = [0, notch];
  const left = [struck(foot, shoulder, 103, [58, 84]), struck(shoulder, cleft, cap, [-20, 56])];
  return [...left, ...reversedRun(left.map(mirrored))];
};

/** Each petal stops at the same two ruled divisions. The round heart has its own white margin. */
const frontPetal = (outline: Region, gap: number, centre: number): Region[] => {
  const rise = Math.sin(HALF);
  const across = Math.cos(HALF);
  const apex: V = [0, gap / rise];
  const far = apex[1] + (100 * across) / rise;
  return carveWhere([
    ...outline, ...disc(ORIGIN, centre), seg(apex, [-100, far]), seg(apex, [100, far]),
  ], (point) => inside(outline, point) && point[1] * rise - Math.abs(point[0]) * across > gap && Math.hypot(...point) > centre);
};

const arrow = polygon([[-1.1, 12], [1.1, 12], [1.1, 38], [5.2, 44], [0, 51], [-5.2, 44], [-1.1, 38]]);

export const sakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.98;
  const petal = carve(frontPetal(cherryPetal(83, 43, 27), 0.95, 14.5), [arrow]);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  for (const turn of TURNS) c.fill(PART, toPath(petal, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 12.2)], { k }));
};

const at = (r: number, turn: number): V => [r * Math.sin(turn * DEG), r * Math.cos(turn * DEG)];
const turned = (loops: Region[], turn: number): Region[] => loops.map((loop) => loop.map((piece) => rotated(piece, -turn * DEG)));

const roundStamen = (turn: number, reach: number, width: number, radius: number): Region[] => {
  const head = at(reach, turn);
  return [thickSeg(at(10, turn), head, width), disc(head, radius)];
};

/** The cap lines at the five joins surround small eyes, with three round tips and two long leaf-shaped tips inside. */
export const edoSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.98;
  const foot: V = [0, 51];
  const top: V = [0, 86.5];
  const eye = struck(foot, top, 21.4, [-15, 66]);
  const mirroredEye = mirrored(eye);
  const edge = [eye, mirroredEye].map((piece) => piece.t === "A" ? thickArc(piece.c, piece.r, 2.18, piece.a0, piece.a1) : thickSeg(piece.a, piece.b, 2.18));
  const joins = [...turned(edge, 36), ...turned(edge, -36)];
  const petal = carve(frontPetal(cherryPetal(85.5, 43.2, 27.4), 0.8, 14.1), joins);
  const p: V = [0, 45];
  const q: V = [0, 66];
  const blade = struck(p, q, 19, [15, 56]);
  const leaf = [thickSeg([0, 10], [0, 51], 1.9), [blade, mirrored(reversed(blade))]];
  const round = carve(petal, roundStamen(0, 56, 1.9, 4.0));
  const pointed = carve(petal, leaf);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  for (const turn of TURNS) c.fill(PART, toPath(turn === 72 || turn === 288 ? pointed : round, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 11.8)], { k }));
};

/** Five lower petals stand between the front petals. The cuts follow the edges of the petals lying over them. */
export const yaeSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.98;
  const face = carve(frontPetal(cherryPetal(86, 39.2, 28.2, 64), 1, 14), [arrow]);
  const faceGap = frontPetal(cherryPetal(88, 41.0, 28.8, 65.5), -1.05, 12);
  const rear = [disc([0, 77], 19), disc([-16, 71], 19), disc([16, 71], 19), polygon([[0, 14], [-15, 72], [15, 72]])];
  const back = carve(rear, [...turned(faceGap, 36), ...turned(faceGap, -36), disc(ORIGIN, 12)]);
  c.guideCircle(C0, 96);
  c.guideSpokes(10, 0, 96);
  for (const turn of TURNS) c.fill(PART, toPath(back, { k, turn: turn + 36 }));
  for (const turn of TURNS) c.fill(PART, toPath(face, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 11.7)], { k }));
};

/** Each wide petal carries three ruled stamens ending in small circles. */
export const hosokawaSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.98;
  const stamens = [...roundStamen(0, 56.5, 1.9, 3.7), ...roundStamen(-17, 50.5, 1.85, 3.45), ...roundStamen(17, 50.5, 1.85, 3.45)];
  const petal = carve(frontPetal(cherryPetal(85.2, 43.2, 27.4), 0.95, 15), stamens);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  for (const turn of TURNS) c.fill(PART, toPath(petal, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 12.7)], { k }));
};
