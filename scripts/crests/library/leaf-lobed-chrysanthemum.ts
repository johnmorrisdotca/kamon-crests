import { DEG, carveWhere, circleThrough, inside, mirrored, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface ChrysanthemumLeafOptions extends PartOptions {
  /** Clockwise change of the midrib direction from the foot to the tip, in degrees. */
  bend?: number;
  /** Reflect the blade before turning it. */
  mirror?: boolean;
}

type Arc = Extract<Piece, { t: "A" }>;

const reach = 75;
// The face-on leaf in 菊の丸. The left half is struck at the exact mirror of these points.
const half: V[] = [
  [0, 0], [16, 8], [19, 20], [14, 22], [30, 26], [32, 34],
  [21, 40], [23, 51], [13, 55], [13, 65], [0, reach],
];
const points: V[] = [...half, ...half.slice(1, -1).reverse().map(([x, y]): V => [-x, y])];
const ribs: readonly (readonly [number, number, number])[] = [[15, 16, 12], [29, 22, 8], [43, 10, 15]];
const base: V = [0, 3];
const tip: V = [0, 70];

const band = ({ c, r, a0, a1 }: Arc, paper: number): Region => thickArc(c, r, paper, Math.min(a0, a1), Math.max(a0, a1));

function blade(paper: number, bend: number): Region[] {
  const curved = Math.abs(bend) > 1e-6;
  const radius = reach / (bend * DEG);
  const place = ([x, y]: V): V => {
    if (!curved) return [x, y];
    const angle = y / radius;
    // Each pair of lobe points stays the same distance apart across the midrib.
    return [radius * (1 - Math.cos(angle)) + x * Math.cos(angle), (radius - x) * Math.sin(angle)];
  };
  const stations = points.map(place);
  const hint = place([0, 38]);
  const outline = stations.map((a, i) => {
    const b = stations[(i + 1) % stations.length];
    return shortArc(circleThrough(a, b, Math.hypot(a[0] - b[0], a[1] - b[1]) * 2, hint), a, b);
  });
  const midrib = curved
    ? band(shortArc({ c: [radius, 0], r: Math.abs(radius) }, place(base), place(tip)) as Arc, paper)
    : thickSeg(base, tip, paper);
  const clefts = [midrib];
  for (const [height, extent, rise] of ribs) {
    const foot = place([0, height]);
    const vein = (x: number): Region => {
      const end = place([x, height + rise]);
      const circle = circleThrough(foot, end, 40, place([x, 0]));
      return band(shortArc(circle, foot, end) as Arc, paper);
    };
    const right = vein(extent);
    clefts.push(right, curved ? vein(-extent) : right.map(mirrored));
  }
  return carveWhere([...outline, ...clefts.flat()], (p) => inside(outline, p) && !clefts.some((region) => inside(region, p)));
}

/** The placement is at the foot. Size is the length along the midrib to the highest lobe. */
export const leafLobedChrysanthemum = definePart<ChrysanthemumLeafOptions>({
  id: "leaf-lobed-chrysanthemum",
  name: { en: "Lobed chrysanthemum leaf", ja: "裂片のある菊の葉" },
  description: { en: "A broad lobed blade with three pairs of curved veins joining a straight or bowed midrib.", ja: "幅広い菊の葉に、左右三組の曲がった葉脈を入れます。主脈はまっすぐにも曲げても作れます。" },
  families: ["kiku"],
  sources: [
    { frame: 40, page: "R", row: 1, col: 3, label: "きくの丸" },
    { frame: 39, page: "L", row: 1, col: 2, label: "下葉きく" },
  ],
  stock: true,
  sampleSize: 95,
  sampleOptions: { motif: "chrysanthemum" },
  build(c, centre, turn, size, { motif, keyline, mirror, bend = 0, paper = PAPER }) {
    if (!Number.isFinite(bend) || Math.abs(bend) > 75) throw new Error("leaf-lobed-chrysanthemum: bend must be from -75 to 75 degrees");
    if (paper >= size) throw new Error("leaf-lobed-chrysanthemum: the paper width must be smaller than the leaf");
    const k = size / reach;
    fillPart(c, motif, blade(paper / k, bend), { k, at: centre, turn, mirror }, keyline);
  },
});

export default leafLobedChrysanthemum;
