import type { Builder } from "../../construct/builder.ts";
import { DEG, onCircle, shortArc, vdist } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { branchTaper } from "./kaede-ori-eda-parts/branch-taper.ts";
import { layerParts } from "./kaede-ori-eda-parts/layers.ts";
import { leafMaple } from "./kaede-ori-eda-parts/leaf-maple.ts";

type Arc = Extract<Piece, { t: "A" }>;

const motif = "maple";
const paper = 1.15;
const point = ([x, y]: V): V => [(x - 99) * .75, (103 - y) * .75];

interface Branch {
  centre: V;
  turn: number;
  span: number;
  rise: number;
  width: number;
  at: (station: number) => V;
}

function branch(from: V, toward: V, through: V, width: number): Branch {
  const tip = point(toward);
  const anchor = point(through);
  const dx = tip[0] - from[0];
  const dy = tip[1] - from[1];
  const span = vdist(from, tip);
  const centre: V = [(from[0] + tip[0]) / 2, (from[1] + tip[1]) / 2];
  const across: V = [dy / span, -dx / span];
  const rise = (anchor[0] - centre[0]) * across[0] + (anchor[1] - centre[1]) * across[1];
  const turn = Math.atan2(dx, dy) / DEG;

  const straight = (station: number): V => [from[0] + station * dx, from[1] + station * dy];
  if (Math.abs(rise) < .1) return { centre, turn, span, rise, width, at: straight };

  const signedRadius = span * span / (8 * rise) + rise / 2;
  const c: V = [centre[0] + (rise - signedRadius) * across[0], centre[1] + (rise - signedRadius) * across[1]];
  const axis = shortArc({ c, r: Math.abs(signedRadius) }, from, tip) as Arc;
  const at = (station: number): V => onCircle(c, axis.r, axis.a0 + station * (axis.a1 - axis.a0));

  return { centre, turn, span, rise, width, at };
}

// Every shoot begins on its parent branch. The broken end is the broad right foot.
const bough = branch(point([193, 185]), [7, 160], [98, 161], 6.2);
const upright = branch(bough.at(.59), [94, 19], [95, 88], 4.1);
const leftStalk = branch(bough.at(.65), [43, 106], [68, 137], 3.35);
const rightStalk = branch(bough.at(.41), [123, 139], [116, 153], 3.5);
const highShoot = branch(upright.at(.2), [157, 74], [117, 92], 2.85);
const lowShoot = branch(rightStalk.at(.52), [166, 135], [138, 141], 2.05);
const thorns = [
  branch(upright.at(.13), [84, 134], [88, 137], 1.55),
  branch(upright.at(.57), [87, 73], [91, 77], 1.35),
  branch(upright.at(.76), [86, 42], [90, 47], 1.4),
  branch(upright.at(.73), [103, 47], [99, 51], 1.45),
  branch(highShoot.at(.44), [117, 77], [115, 85], 1.35),
  branch(highShoot.at(.86), [143, 71], [146, 74], 1.22),
  branch(leftStalk.at(.27), [58, 145], [63, 145], 1.35),
  branch(rightStalk.at(.38), [111, 147], [114, 151], 1.25),
  branch(bough.at(.18), [144, 148], [151, 163], 2.05),
];

export function kaedeOriEdaBuild(c: Builder): void {
  c.precision(3);
  c.group(() => layerParts(c, () => {
    for (const { centre, turn, span, rise, width } of [bough, upright, leftStalk, rightStalk, highShoot, lowShoot, ...thorns]) {
      branchTaper.build(c, centre, turn, span, { motif, width: width / span, bend: rise / span });
    }
    leafMaple.build(c, point([123, 139]), 36, 53, { motif, paper, folded: "left", lobes: 6, spread: .31, stalk: false });
    leafMaple.build(c, point([43, 106]), 0, 43.5, { motif, paper, lobes: 6, stalk: false });
  }));
}
