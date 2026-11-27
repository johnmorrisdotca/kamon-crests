import { DEG, carve, circleCircle, circleThrough, disc, seg, shortArc, thickSeg, vlen, vmul } from "../../../construct/compass.ts";
import type { Region, V } from "../../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface MapleOptions extends PartOptions {
  lobes?: 5 | 7;
  /** The half of the fan visible on a leaf folded along its middle vein. */
  folded?: "left" | "right";
  /** Multiplier for the turns measured from the upright lobe. */
  spread?: number;
  /** Extend white seams from the eye into the notches between lobes. */
  seams?: boolean;
  /** The width of veins and seams in crest units. */
  paper?: number;
  /** Omit the standalone stalk when the leaf is attached to a separate bough. */
  stalk?: boolean;
}

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

/** Size is the length from the eye to the point of the upright lobe. */
export const leafMaple = definePart<MapleOptions>({
  id: "leaf-maple",
  name: { en: "Maple leaf", ja: "紅葉の葉" },
  description: {
    en: "Pointed lenses fan from a low eye, with a white vein in each and a short stalk below.",
    ja: "低い位置の目から先のとがった裂片を扇形に広げ、それぞれに白い葉脈を通し、下に短い茎を置きます。",
  },
  families: ["maple"],
  sources: [{ frame: 44, page: "L", row: 3, col: 4, label: "紅葉" }],
  sampleSize: 90,
  sampleOptions: { motif: "maple" },
  build(c, centre, turn, size, { motif, keyline, lobes = 7, folded, spread = 1, seams = false, paper = 1.15, stalk = true }) {
    const line = paper / size;
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
