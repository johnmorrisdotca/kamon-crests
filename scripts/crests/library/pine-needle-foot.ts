import { carveWhere, circleThrough, disc, inside, mirrored, moved, pieceStart, reversedRun, shortArc, thickArc } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface PineNeedleFootOptions extends PartOptions {
  /** Leave the body in paper, keeping an ink edge one paper width thick. */
  hollow?: boolean;
}

const toe: V = [0, 12.5];
const shoulder: V = [7.2, 8.4];
const hook: V = [17, -1];
const throat: V = [5.1, -.5];
const root: V = [0, -10];
const edge = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);

// Put the toe centre on the mirror axis and the flare centre on the same normal through the shoulder.
const rise = toe[1] - shoulder[1];
const radius = (shoulder[0] ** 2 + rise ** 2) / (2 * rise);
const toeCentre: V = [0, toe[1] - radius];
const normal: V = [shoulder[0], shoulder[1] - toeCentre[1]];
const reach: V = [hook[0] - shoulder[0], hook[1] - shoulder[1]];
const along = (reach[0] ** 2 + reach[1] ** 2) / (2 * (reach[0] * normal[0] + reach[1] * normal[1]));
const flareCentre: V = [shoulder[0] + along * normal[0], shoulder[1] + along * normal[1]];

// The four arcs of one half of the foot in 折り松葉菱.
const half = [
  shortArc({ c: toeCentre, r: radius }, toe, shoulder),
  shortArc({ c: flareCentre, r: Math.abs(along) * radius }, shoulder, hook),
  edge(hook, throat, 12, [12, 10.5]),
  edge(throat, root, 25, [26, -19]),
];
const outline = [...half, ...reversedRun(half.map(mirrored))];

/** Size is from the needle root to the rounded toe. */
export const pineNeedleFoot = definePart<PineNeedleFootOptions>({
  id: "pine-needle-foot",
  name: { en: "Hooked pine-needle foot", ja: "鉤形の松葉の付け根" },
  description: {
    en: "Four compass arcs make each half of the flared foot. The paper may show through inside the hooks.",
    ja: "広がった付け根の左右を四本ずつの円弧で描き、鉤の内側は白く残すこともできます。",
  },
  families: ["matsu"],
  sources: [
    { frame: 31, page: "R", row: 1, col: 3, label: "をり松葉びし" },
    { frame: 31, page: "R", row: 4, col: 2, label: "丸ニ一ッまつ葉" },
  ],
  stock: true,
  sampleSize: 82,
  sampleOptions: { motif: "pine" },
  build(c, at, turn, size, { motif, keyline, hollow = false, paper = PAPER }) {
    const k = size / (toe[1] - root[1]);
    const width = paper / k;
    let ink: Region[] = [outline];
    if (hollow) {
      if (width >= 3.5) throw new Error("pine-needle-foot: the paper must fit between the hook edges");
      const bands = outline.flatMap((piece) => {
        if (piece.t !== "A") throw new Error("pine-needle-foot: the outline must be circular arcs");
        return [thickArc(piece.c, piece.r, 2 * width, piece.a0, piece.a1), disc(pieceStart(piece), width)];
      });
      ink = carveWhere([...outline, ...bands.flat()], (p) => inside(outline, p) && bands.some((band) => inside(band, p)));
    }
    const atRoot = ink.map((loop) => loop.map((piece) => moved(piece, [0, -root[1]])));
    fillPart(c, motif, atRoot, { k, at, turn }, keyline);
  },
});

export default pineNeedleFoot;
