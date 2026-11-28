// Cherry blossoms measured from frame 37 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcA, carve, carveWhere, circleThrough, disc, inside, mirrored, reversed, reversedRun, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

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

const resized = (loops: Region[], k: number): Region[] => {
  const point = ([x, y]: V): V => [x * k, y * k];
  return loops.map((loop) => loop.map((piece) => piece.t === "L"
    ? seg(point(piece.a), point(piece.b))
    : arcA(point(piece.c), piece.r * k, piece.a0, piece.a1)));
};

const cherryOutline = (notch: number, width: number, cap: number): Region[] =>
  TURNS.flatMap((turn) => turned([cherryPetal(notch, width, cap)], turn));

/** Three scalloped crowns share the same centre; the middle row turns half a petal. */
export const kasaneSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.98;
  const outline = cherryOutline(84.5, 43, 27.7);
  const middle = turned(resized(outline, 0.643), 36);
  const small = resized(outline, 0.338);
  const middleGap = turned(resized(outline, 0.666), 36);
  const smallGap = resized(outline, 0.361);
  const outerInk = carve(outline, middleGap);
  const middleInk = carve(middle, smallGap);
  const stamen = [thickSeg([0, 5.2], [0, 15], 1.5), disc([0, 16], 2.35)];
  const rays = TURNS.flatMap((turn) => turned(stamen, turn));
  const seams = TURNS.map((turn) => thickSeg(at(5, turn + 36), at(36, turn + 36), 0.95));
  const centre = [disc(ORIGIN, 5.8), ...rays, ...seams];
  c.guideCircle(C0, 96);
  c.guideCircle(C0, 63.9 * k);
  c.guideCircle(C0, 34.5 * k);
  c.fill(PART, toPath(outerInk, { k }));
  c.fill(PART, toPath(middleInk, { k }));
  c.fill(PART, toPath(carve(small, centre), { k }));
  c.fill(PART, toPath([disc(ORIGIN, 4.15)], { k }));
};

const traceEdges = (loop: Region, width: number): Region[] => loop.map((piece) => piece.t === "A"
  ? thickArc(piece.c, piece.r, width, piece.a0, piece.a1)
  : thickSeg(piece.a, piece.b, width));

/** One notched petal has a pair of bowed seams that meet its short, ruled midrib. */
export const sakuraiSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.97;
  const tip: V = [-13.2, 96];
  const shoulder: V = [-22.2, 67.4];
  const cleft: V = [0, 88.3];
  const root: V = [0, 8];
  const seamFork: V = [0, 31];
  const flank = [struck(root, shoulder, 62, [36, 45]), struck(shoulder, tip, 48, [22, 82]), seg(tip, cleft)];
  const outline = [...flank, ...reversedRun(flank.map(mirrored))];
  const seam = struck(seamFork, [-22.5, 56], 23.6, [-20, 38]);
  const white = [...traceEdges([seam, mirrored(seam)], 2.1), thickSeg(root, seamFork, 1.8)];
  const petal = carve([outline], [...white, disc(ORIGIN, 11.2)]);

  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  for (const turn of TURNS) c.fill(PART, toPath(petal, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 9)], { k }));
};

/** The outer outline follows the five notches and joins across the shoulders. */
const cherryShadow = (width: number): Region[] => {
  const valley = at(72.8, -36);
  const cap: V = [-20, 95.3];
  const notch: V = [0, 84.5];
  const left = [struck(valley, cap, 27.4, [-19, 69]), struck(cap, notch, 21.8, [-19, 73])];
  const side = [...left, ...reversedRun(left.map(mirrored))];
  return TURNS.flatMap((turn) => turned(traceEdges(side, width), turn));
};

export const chuKageSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.97;
  const petal = frontPetal(cherryPetal(84, 42, 27), 4.2, 16);
  const echo = carve(resized(petal.flatMap((loop) => traceEdges(loop, 2.35)), 0.79), [disc(ORIGIN, 14.2)]);
  const outside = cherryShadow(2.45);
  const rayShape = polygon([[-3.25, 13], [-2.2, 46.4], [2.2, 46.4], [3.25, 13]]);
  const ray = traceEdges(rayShape, 1.75);
  const heart = carve([disc(ORIGIN, 15.0)], [disc(ORIGIN, 12.75)]);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  c.fill(PART, toPath(outside, { k }));
  for (const turn of TURNS) {
    c.fill(PART, toPath(echo, { k, turn }));
    c.fill(PART, toPath(carve(ray, [disc(ORIGIN, 13.7)]), { k, turn }));
  }
  c.fill(PART, toPath(heart, { k }));
};

/** The five-pointed calyx and its bent stalk sit in two open, scalloped outlines. */
export const chuKageUraSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.97;
  const outer = cherryShadow(2.38);
  const inner = resized(cherryShadow(2.7), 0.756);
  const calyxPoints: V[] = [[0, 38], [17, 21], [39, 17], [24, -1], [20, -20], [3, -14], [-24, -24], [-19, -4], [-39, 13], [-18, 20]];
  const calyx = traceEdges(polygon(calyxPoints), 2.2);
  const left = struck([-9, 4], [16, -39], 40.5, [24, 14]);
  const right = struck([-3, 4], [29, -36], 35.9, [28, 8]);
  const stalk = carve(traceEdges([left, right, seg([16, -39], [29, -36])], 1.95), []);
  const opening = [thickSeg([-4.5, -3.3], [20, -39], 12.5)];
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  c.fill(PART, toPath(outer, { k }));
  c.fill(PART, toPath(inner, { k }));
  c.fill(PART, toPath(carve(calyx, opening), { k }));
  c.fill(PART, toPath(stalk, { k }));
};

/** Three loose blossoms descend on a diagonal, each with five notched petals. */
export const chiriSakuraBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, 96);
  const petal = frontPetal(cherryPetal(87, 42.5, 27.4, 67), 1.25, 7.5);
  const blossoms: { at: V; k: number; turn: number }[] = [
    { at: [-43, 43], k: .371, turn: 15 },
    { at: [-47, -24], k: .371, turn: 13 },
    { at: [50, -40], k: .378, turn: -9 },
  ];
  for (const { at, k, turn } of blossoms) {
    for (const step of TURNS) c.fill(PART, toPath(petal, { at, k, turn: turn + step }), "evenodd");
    c.fill(PART, toPath([disc(ORIGIN, 7.7)], { at, k }));
  }
};

/** The plate makes the outer lobes shallower than the five distinct inner petal tips. */
export const chuKageKaraZakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.985;
  const rimLeft = [
    struck(at(73, -36), [-26, 77], 19.5, [-28, 57]),
    struck([-26, 77], [-18, 83.5], 12, [-24, 88]),
    struck([-18, 83.5], [0, 95.7], 19.4, [0, 76.5]),
  ];
  const rim = [...rimLeft, ...reversedRun(rimLeft.map(mirrored))];
  const petalLeft = [
    struck([0, 11.3], [-26, 48], 95, [59, 82]),
    struck([-26, 48], [-15.5, 62], 12.1, [-14, 51]),
    struck([-15.5, 62], [0, 74.6], 15.5, [0, 59.3]),
  ];
  const petal = [...petalLeft, ...reversedRun(petalLeft.map(mirrored))];
  const stamen: Region = [
    seg([-3.5, 12], [-2.7, 42.7]),
    struck([-2.7, 42.7], [2.7, 42.7], 2.7, [0, 42.7]),
    seg([2.7, 42.7], [3.5, 12]),
    seg([3.5, 12], [-3.5, 12]),
  ];
  const heartClearance = [disc(ORIGIN, 14.05)];
  const inner = carve([...traceEdges(petal, 2.7), ...traceEdges(stamen, 1.6)], heartClearance);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  const rimBands = traceEdges(rim, 2.7);
  for (const turn of TURNS) c.fill(PART, toPath(rimBands, { k, turn }));
  for (const turn of TURNS) c.fill(PART, toPath(inner, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 14.15), disc(ORIGIN, 11.5)], { k }), "evenodd");
};

/** A half flower opens inward from the layout circle. Two turns put the other flowers in place. */
export const mitsuWariYamazakuraBuild = (c: Builder): void => {
  c.precision(3);
  const radius = 96;
  const layout = { c: ORIGIN, r: radius };
  const left = at(radius, -59.1);
  const right = at(radius, 59.1);
  const scallops = [
    struck(left, [-69, 32], 24, [-83, 48]),
    struck([-69, 32], [-34, 43], 41, [-53, 66]),
    struck([-34, 43], [-14, 12], 32, [-3, 39]),
    struck([-14, 12], [0, 22], 27, [-10, 40]),
  ];
  const outline = [...scallops, ...reversedRun(scallops.map(mirrored)), shortArc(layout, right, left)];

  const heartEdge = 19;
  const heartHeight = Math.sqrt(radius ** 2 - heartEdge ** 2);
  const heartLeft: V = [-heartEdge, heartHeight];
  const heartRight: V = [heartEdge, heartHeight];
  const cap = struck(heartLeft, heartRight, 22, [0, 109]);
  const heart = [cap, shortArc(layout, heartRight, heartLeft)];
  const rays = Array.from({ length: 13 }, (_, index) => {
    const offset = index - 6;
    const angle = offset * 9.2 * DEG;
    const mark = (reach: number): V => [reach * Math.sin(angle), 95 - reach * Math.cos(angle)];
    return thickSeg(mark(7), mark(52.5 - 1.14 * Math.abs(offset)), 1.65);
  });
  const seams = [...traceEdges([cap], 2.1), ...carve(rays, [heart])];
  const flower = carve([outline], seams);

  c.guideCircle(C0, radius);
  c.guideSpokes(3, 0, radius);
  for (const turn of [0, 120, 240]) c.fill(PART, toPath(flower, { k: 1, turn }));
};

/** Pointed leaves and their white midribs show between five notched petals. */
export const hashikiSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.98;
  const outline = cherryPetal(84.2, 44.3, 27.4, 67.5);
  const petals = carve(frontPetal(outline, 0.95, 16), resized([arrow], 0.75));
  const overlap = frontPetal(cherryPetal(85.7, 45.8, 28.5, 68.2), -0.8, 13);

  const root: V = [0, 41];
  const tip: V = [0, 97];
  const side = struck(root, tip, 43, [48, 68]);
  const blade = [side, mirrored(reversed(side))];
  const midrib = thickSeg(root, tip, 1.8);
  const leaf = carve([blade], [midrib, ...turned(overlap, -36), ...turned(overlap, 36)]);

  c.guideCircle(C0, 96);
  c.guideSpokes(10, 0, 96);
  for (const turn of TURNS) c.fill(PART, toPath(leaf, { k, turn: turn + 36 }));
  for (const turn of TURNS) c.fill(PART, toPath(petals, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 13.8)], { k }));
};

/** The double blossom seen from the back, with a broad calyx and its curved stalk. */
export const yaeUraSakuraBuild = (c: Builder): void => {
  c.precision(3);
  const scale = .98;
  const face = frontPetal(cherryPetal(86, 40.9, 28.2, 64), PAPER / (2 * scale), 11.5);
  const rear = carve([
    disc([0, 77], 19), disc([-16, 71], 18), disc([16, 71], 18),
    polygon([[0, 14], [-15, 72], [15, 72]]),
  ], [disc(ORIGIN, 13)]);
  const calyxRadii = [34.8, 20, 37.1, 19.6, 26.7, 16.8, 26.7, 19.6, 37.1, 20];
  const calyxPoints = calyxRadii.map((reach, i) => at(reach, i * 36));
  const calyx = calyxPoints.map((point, i) => {
    const next = calyxPoints[(i + 1) % calyxPoints.length];
    return struck(point, next, 1.85 * Math.hypot(point[0] - next[0], point[1] - next[1]), ORIGIN);
  });
  const fork: V = [0, -10];
  const vein = struck([-14, 4], fork, 21.5, [-17, -13]);
  const calyxInk = carve([calyx], traceEdges([vein, mirrored(vein)], PAPER));
  const foot: V = [1.8, -9];
  const tip: V = [29.4, -39.2];
  const dx = tip[0] - foot[0];
  const dy = tip[1] - foot[1];
  const length = Math.hypot(dx, dy);

  c.guideCircle(C0, 96);
  c.guideSpokes(10, 0, 96);
  c.group(() => {
    layerParts(c, () => {
      for (const turn of TURNS) fillPart(c, PART, rear, { k: scale, turn: turn + 36 });
      for (const turn of TURNS) fillPart(c, PART, face, { k: scale, turn }, PAPER);
      fillPart(c, PART, calyxInk, { k: 1 }, PAPER);
      branchTaper.build(c, [(foot[0] + tip[0]) / 2, (foot[1] + tip[1]) / 2], Math.atan2(dx, dy) / DEG, length, {
        motif: PART, width: 7.3 / length, bend: .13, keyline: PAPER,
      });
    });
    fillPart(c, PART, [disc(foot, 1.55)], { k: 1 });
  });
};
