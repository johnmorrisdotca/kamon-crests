// The paired-curl form measured from frame 11 left of the 1892 crest book.
import { RING_GAP, type Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, onCircle, reversedRun, seg, shortArc, thickArc, toPath, type Region, type V } from "../../construct/compass.ts";

const lanternArc = (from: V, to: V, radius: number, near: V) => shortArc(circleThrough(from, to, radius, near), from, to);

const lanternFace = (openings?: Region[]): Region[] => {
  const head: V = [0, 94];
  const crest: V = [32, 77];
  const shoulder: V = [79, 48];
  const wing: V = [91, 17];
  const wrist: V = [80, -14];
  const lower: V = [78, -47];
  const hip: V = [44, -66];
  const foot: V = [0, -93];
  const shellSide = [
    lanternArc(head, crest, 40, [0, 54]),
    lanternArc(crest, shoulder, 60, [33, 17]),
    lanternArc(shoulder, wing, 39, [53, 25]),
    lanternArc(wing, wrist, 37, [54, 4]),
    lanternArc(wrist, lower, 33, [52, -31]),
    lanternArc(lower, hip, 42, [43, -30]),
    lanternArc(hip, foot, 52, [0, -41]),
  ];
  const shell = [...shellSide, ...reversedRun(shellSide.map(mirrored))];

  const curlPoints: V[] = [[85, 49], [47, 53], [27, 36], [25, 22], [40, 15], [48, 26], [40, 32], [35, 26], [40, 24], [32, 22], [35, 38], [58, 46], [85, 43]];
  const guides: [number, V][] = [[62, [61, -3]], [34, [54, 27]], [21, [46, 26]], [14, [35, 28]], [11, [37, 24]], [9, [39, 25]], [7, [42, 26]], [4, [38, 26]], [6, [35, 26]], [14, [43, 28]], [28, [58, 19]], [67, [64, -18]]];
  const curl = guides.map(([radius, near], index) => lanternArc(curlPoints[index], curlPoints[index + 1], radius, near));
  curl.push(seg(curlPoints[curlPoints.length - 1], curlPoints[0]));

  const heartSide = [
    lanternArc([0, 82], [13, 65], 38, [-24, 59]),
    lanternArc([13, 65], [7, 56], 8, [5, 65]),
    lanternArc([7, 56], [0, 59], 8, [7, 64]),
  ];
  const heart = [...heartSide, ...reversedRun(heartSide.map(mirrored))];
  return carve([shell], [curl, curl.map(mirrored), ...(openings ?? [heart, disc([0, -44], 23.2)])]);
};

/** The plain lantern is a round body pierced at its centre and topped with two curls. */
export const chochinBuild = (c: Builder): void => {
  c.precision(3);
  c.guideLine([100, 4], [100, 196]);
  c.fill("paper-lantern", toPath(lanternFace(), { k: 1 }));
};

/** The same paired-curl lantern sits at the centre of the enclosing ring. */
export const maruNiChochinBuild = (c: Builder, room: number): void => {
  c.precision(3);
  c.guideLine([100, 100 - room], [100, 100 + room]);
  const lanternReach = 94.72085;
  c.fill("paper-lantern", toPath(lanternFace(), { k: (room - RING_GAP) / lanternReach }));
};

/** Three broad, inverted lantern faces touch at the inner points of their bodies. */
export const mitsuChochinBuild = (c: Builder): void => {
  c.precision(3);
  const top: V = [0, 43];
  const neck: V = [28, 27];
  const shoulder: V = [62, 16];
  const side: V = [70, 1];
  const wrist: V = [49, -20];
  const lobe: V = [25, -33];
  const bottom: V = [0, -43];
  const sideOfFace = [
    lanternArc(top, neck, 41, [0, 5]),
    lanternArc(neck, shoulder, 43, [42, -15]),
    lanternArc(shoulder, side, 18, [53, 0]),
    lanternArc(side, wrist, 34, [42, 4]),
    lanternArc(wrist, lobe, 32, [26, -3]),
    lanternArc(lobe, bottom, 34, [0, -11]),
  ];
  const face = [...sideOfFace, ...reversedRun(sideOfFace.map(mirrored))];
  const rightCurl = thickArc([26, 7], 10.6, 3.4, 27 * DEG, 301 * DEG);
  const heartSide = [
    lanternArc([0, 31], [10, 23], 15, [-1, 16]),
    lanternArc([10, 23], [5, 16], 8, [4, 22]),
    lanternArc([5, 16], [0, 19], 7, [5, 22]),
  ];
  const heart = [...heartSide, ...reversedRun(heartSide.map(mirrored))];
  const shape = carve([face], [rightCurl, rightCurl.map(mirrored), heart, disc([0, -21], 14.5)]);
  c.guideSpokes(6, 0, 96);
  for (const turn of [0, 120, 240]) {
    const at = onCircle([0, 0], 50, (90 - turn) * DEG);
    c.fill("paper-lantern", toPath(shape, { k: 1, at, turn: turn + 180 }));
  }
};

/** Both openings in the thick-ring cell are round, with the lower one just off centre. */
export const futowaNiChochinBuild = (c: Builder): void => {
  c.precision(3);
  const room = c.ring("ring-thick");
  c.guideLine([100, 100 - room], [100, 100 + room]);
  const lanternReach = 94.72085;
  const openings = [disc([0, 59.7], 14.8), disc([-9.5, -45], 23.3)];
  c.fill("paper-lantern", toPath(lanternFace(openings), { k: (room - 9.6) / lanternReach }));
};
