import { DEG, bowedArc, carve, carveWhere, circleThrough, inside, mirrored, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface ChrysanthemumLeafOptions extends PartOptions {
  /** Choose the broad face-on leaf or the narrow leaf with two pairs of veins. */
  profile?: "broad" | "narrow";
  /** Clockwise change of the midrib direction from the foot to the tip, in degrees. */
  bend?: number;
  /** Reflect the blade before turning it. */
  mirror?: boolean;
}

type Arc = Extract<Piece, { t: "A" }>;

interface BladeProfile {
  reach: number;
  half: readonly V[];
  outlineRadius: number;
  hint: V;
  midrib: readonly [V, V];
  ribs: readonly (readonly [foot: number, extent: number, tip: number])[];
  ribRadius?: number;
}

const profiles: Record<NonNullable<ChrysanthemumLeafOptions["profile"]>, BladeProfile> = {
  // The face-on leaf in 菊の丸.
  broad: {
    reach: 75,
    half: [[0, 0], [16, 8], [19, 20], [14, 22], [30, 26], [32, 34], [21, 40], [23, 51], [13, 55], [13, 65], [0, 75]],
    outlineRadius: 2,
    hint: [0, 38],
    midrib: [[0, 3], [0, 70]],
    ribs: [[15, 16, 27], [29, 22, 37], [43, 10, 58]],
    ribRadius: 40,
  },
  // The shorter lobes and two pairs of veins in 菊枝丸.
  narrow: {
    reach: 90,
    half: [[0, 0], [16, 10], [18, 23], [12, 26], [23, 37], [15, 51], [17, 59], [0, 90]],
    outlineRadius: 1.55,
    hint: [0, 39],
    midrib: [[0, 8], [0, 82]],
    ribs: [[21, 13, 43], [43, 13, 66]],
  },
};

const band = ({ c, r, a0, a1 }: Arc, paper: number): Region => thickArc(c, r, paper, Math.min(a0, a1), Math.max(a0, a1));

function blade(paper: number, bend: number, profile: BladeProfile): Region[] {
  const { reach, half, outlineRadius, ribRadius, midrib: [base, tip], ribs } = profile;
  const curved = Math.abs(bend) > 1e-6;
  const radius = reach / (bend * DEG);
  const place = ([x, y]: V): V => {
    if (!curved) return [x, y];
    const angle = y / radius;
    // Each pair of lobe points stays the same distance apart across the midrib.
    return [radius * (1 - Math.cos(angle)) + x * Math.cos(angle), (radius - x) * Math.sin(angle)];
  };
  const points: V[] = [...half, ...half.slice(1, -1).reverse().map(([x, y]): V => [-x, y])];
  const stations = points.map(place);
  const hint = place(profile.hint);
  const outline = stations.map((a, i) => {
    const b = stations[(i + 1) % stations.length];
    return shortArc(circleThrough(a, b, Math.hypot(a[0] - b[0], a[1] - b[1]) * outlineRadius, hint), a, b);
  });
  const midrib = curved
    ? band(shortArc({ c: [radius, 0], r: Math.abs(radius) }, place(base), place(tip)) as Arc, paper)
    : thickSeg(base, tip, paper);
  const clefts = [midrib];
  for (const [height, extent, endHeight] of ribs) {
    const foot = place([0, height]);
    const vein = (x: number): Region => {
      const end = place([x, endHeight]);
      if (ribRadius !== undefined) {
        const circle = circleThrough(foot, end, ribRadius, place([x, 0]));
        return band(shortArc(circle, foot, end) as Arc, paper);
      }
      if (!curved) return thickSeg(foot, end, paper);
      const [mx, my] = place([x / 2, (height + endHeight) / 2]);
      const dx = end[0] - foot[0], dy = end[1] - foot[1];
      const bow = ((mx - foot[0]) * -dy + (my - foot[1]) * dx) / Math.hypot(dx, dy);
      if (Math.abs(bow) < 1e-6) return thickSeg(foot, end, paper);
      const arc = bowedArc(foot, end, bow);
      return arc.t === "A" ? band(arc, paper) : thickSeg(foot, end, paper);
    };
    const right = vein(extent);
    clefts.push(right, curved ? vein(-extent) : right.map(mirrored));
  }
  if (!curved && ribRadius === undefined) return carve([outline], clefts);
  return carveWhere([...outline, ...clefts.flat()], (p) => inside(outline, p) && !clefts.some((region) => inside(region, p)));
}

/** The placement is at the foot. Size is the length along the midrib to the highest lobe. */
export const leafLobedChrysanthemum = definePart<ChrysanthemumLeafOptions>({
  id: "leaf-lobed-chrysanthemum",
  name: { en: "Lobed chrysanthemum leaf", ja: "裂片のある菊の葉" },
  description: { en: "The broad blade has three pairs of veins and the narrow blade has two. Either can bend along its midrib.", ja: "幅広い葉には三組、細い葉には二組の葉脈を入れます。どちらも主脈に沿って曲げられます。" },
  families: ["kiku"],
  sources: [
    { frame: 40, page: "R", row: 1, col: 3, label: "きくの丸" },
    { frame: 39, page: "L", row: 1, col: 2, label: "下葉きく" },
    { frame: 39, page: "R", row: 4, col: 4, label: "きく枝丸" },
  ],
  stock: true,
  sampleSize: 95,
  sampleOptions: { motif: "chrysanthemum" },
  build(c, centre, turn, size, { motif, keyline, mirror, profile = "broad", bend = 0, paper = PAPER }) {
    if (!Number.isFinite(bend) || Math.abs(bend) > 75) throw new Error("leaf-lobed-chrysanthemum: bend must be from -75 to 75 degrees");
    if (paper >= size) throw new Error("leaf-lobed-chrysanthemum: the paper width must be smaller than the leaf");
    const shape = profiles[profile];
    const k = size / shape.reach;
    fillPart(c, motif, blade(paper / k, bend, shape), { k, at: centre, turn, mirror }, keyline);
  },
});

export default leafLobedChrysanthemum;
