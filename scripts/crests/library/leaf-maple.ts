import {
  DEG, bowedArc, carve, circleCircle, circleThrough, disc, mirrored, onCircle, reversedRun, seg,
  shortArc, thickArc, thickSeg, vlen, vmul,
} from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface MapleEyeOptions {
  profile?: "eye";
  lobes?: 5 | 7;
  /** The half of the fan visible on a leaf folded along its middle vein. */
  folded?: "left" | "right";
  /** Multiplier for the turns measured from the upright lobe. */
  spread?: number;
  /** Extend white seams from the eye into the notches between lobes. */
  seams?: boolean;
}

type MapleOptions = PartOptions & {
  /** Omit the standalone stalk when the leaf is attached to a separate bough. */
  stalk?: boolean;
} & (MapleEyeOptions | { profile: "crescent" });

/** Turns and eye-to-tip lengths from the seven lobes of 紅葉. */
const lobesInPrint = [[-123, .55], [-74, .75], [-41, .89], [0, 1], [41, .89], [74, .75], [123, .55]] as const;

function blade(turn: number, reach: number) {
  const along: V = [Math.sin(turn * DEG), Math.cos(turn * DEG)];
  const across: V = [along[1], -along[0]];
  const tip = vmul(along, reach);
  const root = vmul(along, -.15);
  const length = reach + .15;
  const width = .33;
  const radius = length * (1 + width * width) / (4 * width);
  const left = circleThrough(root, tip, radius, vmul(across, -1));
  const right = circleThrough(root, tip, radius, across);
  const outline: Region = [shortArc(left, root, tip), shortArc(right, tip, root)];

  return { outline, left, right, tip };
}

const stemPoints: V[] = [[-.055, -.08], [-.093, -.44], [.093, -.44], [.055, -.08]];
const stemOutline = stemPoints.map((point, index) => seg(point, stemPoints[(index + 1) % stemPoints.length]));
const eye: V = [0, 0];
const eyeRadius = .039;

// A rounded foot and seven pointed lobes, mirrored about the upright vein.
const crescentRight: readonly V[] = [[0, 1], [.16, .43], [.65, .64], [.43, .27], [.74, .14], [.37, -.08], [.44, -.30], [0, -.17]];
const crescentRadii = [.72, 1, .83, .65, .72, .60, .90];
const crescentSides: readonly V[] = [[-.60, .57], [.39, -.40], [-.14, .60], [.37, -.45], [.79, .72], [-.30, -.39], [.18, .73]];
const crescentHalf = crescentRadii.map((r, i) => {
  const start = crescentRight[i];
  const end = crescentRight[i + 1];
  return shortArc(circleThrough(start, end, r, crescentSides[i]), start, end);
});
const crescentOutline = [...crescentHalf, ...reversedRun(crescentHalf.map(mirrored))];

const heelRight: V = [.34, -.22];
const heelLeft: V = [-.34, -.22];
const heelCircle = circleThrough(heelRight, heelLeft, .40, [0, -.55]);
const heel = shortArc(heelCircle, heelRight, heelLeft);
const veinFoot = onCircle(heelCircle.c, heelCircle.r, Math.PI / 2);
const veinTip: V = [0, .87];
const crescentVeins = [bowedArc(veinFoot, [.52, .55], .036), bowedArc(veinFoot, [.63, .13], .028)];

function crescentInk(paper: number, stalk: boolean): Region[] {
  const sideVeins = [...crescentVeins, ...crescentVeins.map(mirrored)];
  const cuts = [heel, ...sideVeins].map((edge) => edge.t === "A"
    ? thickArc(edge.c, edge.r, paper, Math.min(edge.a0, edge.a1), Math.max(edge.a0, edge.a1))
    : thickSeg(edge.a, edge.b, paper));
  cuts.push(thickSeg(veinFoot, veinTip, paper), disc(veinTip, paper / 2));
  return carve(stalk ? [stemOutline, crescentOutline] : [crescentOutline], cuts);
}

/** Size is the upright lobe's reach from the centre of the leaf. */
export const leafMaple = definePart<MapleOptions>({
  id: "leaf-maple",
  name: { en: "Maple leaf", ja: "紅葉の葉" },
  description: {
    en: "Pointed lobes and white veins fan from a circular eye or a shallow curved foot.",
    ja: "丸い目または浅い弧を付け根にして、とがった裂片と白い葉脈を扇形に広げます。",
  },
  families: ["maple"],
  sources: [
    { frame: 44, page: "L", row: 3, col: 4, label: "紅葉" },
    { frame: 44, page: "L", row: 4, col: 4, label: "枝もみぢ" },
    { frame: 45, page: "R", row: 3, col: 1, label: "楓枝丸" },
    { frame: 45, page: "R", row: 2, col: 1, label: "立田川" },
  ],
  sampleSize: 90,
  sampleOptions: { motif: "maple" },
  build(c, centre, turn, size, options) {
    const { motif, keyline, paper = PAPER, stalk = true } = options;
    const line = paper / size;
    if (options.profile === "crescent") {
      fillPart(c, motif, crescentInk(line, stalk), { k: size, at: centre, turn }, keyline);
      return;
    }
    const { lobes = 7, folded, spread = 1, seams = false } = options;
    const arrangement = lobes === 7 ? lobesInPrint : lobesInPrint.slice(1, -1);
    const visible = arrangement.filter(([angle]) => folded === undefined || (folded === "left" ? angle <= 0 : angle >= 0));
    const blades = visible.map(([angle, reach]) => {
      const turn = angle * spread * DEG;
      const across = Math.sin(turn) * (folded === undefined ? 1 : .56);
      const along = Math.cos(turn);

      return blade(Math.atan2(across, along) / DEG, reach * Math.hypot(across, along));
    });
    const veins = blades.map(({ tip }) => thickSeg(eye, vmul(tip, .91), line));
    const cuts = seams ? blades.slice(1).flatMap(({ right }, index) => {
      const { left } = blades[index];
      const notch = circleCircle(left.c, left.r, right.c, right.r).sort((a, b) => vlen(b) - vlen(a))[0];

      return notch === undefined ? [] : [thickSeg(eye, vmul(notch, 1.15), line)];
    }) : [];
    const ink = carve([...(stalk ? [stemOutline] : []), ...blades.map(({ outline }) => outline)], [disc(eye, eyeRadius + line), ...veins, ...cuts]);

    fillPart(c, motif, [...ink, disc(eye, eyeRadius)], { k: size, at: centre, turn }, keyline);
  },
});

export default leafMaple;
