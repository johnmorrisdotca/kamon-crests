import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { orchidLeaf, orchidPaper } from "./ran-no-eda-parts/orchid-leaf.ts";
import { C0, R } from "../../construct/geo.ts";

// Anchor positions measured in two hundred divisions of the source cell.
const point = ([x, y]: V): V => [(x - 106) * .94, (97 - y) * .86];

function bend(from: V, through: V, to: V): Piece {
  const a = point(from);
  const b = point(to);
  const m = point(through);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const chord = Math.hypot(dx, dy);
  const normal: V = [-dy / chord, dx / chord];
  const middle: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const offset: V = [m[0] - middle[0], m[1] - middle[1]];
  const rise = offset[0] * normal[0] + offset[1] * normal[1];
  if (Math.abs(rise) < .4) return seg(a, b);

  const height = (offset[0] ** 2 + offset[1] ** 2 - (chord / 2) ** 2) / (2 * rise);
  const hint: V = [middle[0] + height * normal[0], middle[1] + height * normal[1]];
  const radius = Math.max(Math.ceil(chord / 2), Math.round(Math.hypot(chord / 2, height)));

  return shortArc(circleThrough(a, b, radius, hint), a, b);
}

function boundary(anchors: V, runs: readonly (readonly [V, V])[]): Region {
  let start = anchors;

  return runs.map(([middle, end]) => {
    const edge = bend(start, middle, end);
    start = end;

    return edge;
  });
}

const stem = boundary([18, 156], [
  [[51, 139], [81, 128]], [[96, 124], [104, 116]],
  [[115, 112], [124, 112]], [[114, 118], [101, 128]],
  [[80, 132], [62, 141]], [[48, 149], [38, 162]],
  [[29, 161], [18, 156]],
]);

const PAPER = 1.15;
const LEAVES: readonly [root: V, tip: V, bow?: V][] = [
  [[99, 124], [14, 71], [56, 97]],
  [[101, 123], [53, 37], [69, 79]],
  [[103, 122], [81, 33]],
  [[105, 121], [107, 41], [91, 77]],
  [[108, 119], [111, 45], [128, 78]],
  [[111, 117], [106, 67], [119, 88]],
  [[109, 120], [178, 148], [142, 145]],
  [[116, 115], [199, 85], [160, 112]],
  [[114, 116], [180, 31], [154, 83]],
];

export function ranNoEdaBuild(c: Builder): void {
  c.precision(5);
  c.guideCircle(C0, R);
  const leaves = LEAVES.map(([root, tip, through]) => {
    const geometry = orchidLeaf(point(root), point(tip), PAPER, through && point(through));
    return { ...geometry, paper: orchidPaper(geometry.outline, PAPER) };
  });
  c.group(() => {
    const base = carve([stem], leaves.map(({ midrib }) => midrib));
    if (base.length > 0) c.fill("orchid", toPath(base, { k: 1 }), "evenodd");
    leaves.forEach(({ outline, midrib }, index) => {
      const ink = carve([outline], [midrib, ...leaves.slice(index + 1).map(({ paper }) => paper)]);
      if (ink.length > 0) c.fill("orchid", toPath(ink, { k: 1 }), "evenodd");
    });
  });
}
