import { DEG, bowedArc, carve, carveWhere, disc, inside, onCircle, pieceStart, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";
import { turtlePlateOutline } from "./turtle-shell-plate.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const unit = .596;
const p = (x: number, y: number): V => [(x - 172) * unit, (201 - y) * unit];
const length = (282 - 119) * unit;

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * unit);
  });
}

function line(a: V, b: V, bow: number, paper: number): Region {
  const arc = bowedArc(a, b, bow);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(a, b, paper);
}

const shell=outline([
 [104, 142, 2], [117, 128, 3], [143, 120, 2], [174, 121, 2], [207, 119, 2], [231, 125, 2],
 [244, 143, 2], [244, 171, 2], [240, 196, 2], [229, 217, 2], [212, 243, 2], [193, 264, 2], [172, 282, 2],
 [150, 267, 2], [127, 246, 2], [111, 222, 2], [101, 198, 2], [98, 176, 2],
]);
// Frame 19 L1 C1 shows one hexagonal plate in staggered rows. This rim follows its shoulder and point.
const inner = outline([
  [113, 145, 2], [134, 136, 1], [153, 137, 1], [175, 132, 1], [192, 136, 1],
  [208, 129, 1], [226, 139, 1], [230, 155, 1], [230, 177, 1], [224, 196, 1],
  [215, 216, 1], [194, 242, 1], [171, 261, 1], [148, 248, 1], [127, 228, 1],
  [114, 206, 1], [109, 183, 1], [109, 159, 1],
]);
const hexRadius = 24 * unit;
const rowHeight = Math.sqrt(3) * hexRadius;
const origin = p(171, 172);
const rows: V[] = [];
for (let column = -2; column <= 2; column += 1) {
  const stagger = Math.abs(column % 2) * rowHeight / 2;
  for (let row = -2; row <= 2; row += 1) {
    rows.push([origin[0] + column * 1.5 * hexRadius, origin[1] + row * rowHeight + stagger]);
  }
}

function rimMargin(paper: number): Region[] {
  return inner.flatMap((edge) => [
    edge.t === "A"
      ? thickArc(edge.c, edge.r, 2 * paper, Math.min(edge.a0, edge.a1), Math.max(edge.a0, edge.a1))
      : thickSeg(edge.a, edge.b, 2 * paper),
    disc(pieceStart(edge), paper * 1.03),
  ]);
}

const edgeSlots: readonly [x:number, y:number, turn:number][]=[
 [105, 165, 82], [105, 188, 80], [118, 217, 53], [137, 240, 41],
 [237, 151, -17], [236, 178, -30], [225, 207, -27], [209, 231, -43],
];
function plateCuts(paper: number): Region[] {
  return edgeSlots.map(([x, y, turn]) => {
    const angle = turn * DEG;
    return line(onCircle(p(x, y), 3.8, angle), onCircle(p(x, y), 3.8, angle + Math.PI), 0, paper);
  });
}

interface ShellOptions extends PartOptions {
  mirror?: boolean;
}

/** The size is the shell height from the rounded shoulders to the pointed end. */
export const roundTurtleShell = definePart<ShellOptions>({
  id: "turtle-shell-rounded",
  name: { en: "Rounded turtle shell", ja: "丸みのある亀の甲" },
  description: {
    en: "A rounded shoulder and pointed end frame staggered rows of regular hexagonal plates.",
    ja: "丸い肩からとがった端へ向かう甲に、正六角形の甲板を交互の列に並べます。",
  },
  families: ["kame"],
  sources: [{ frame: 19, page: "L", row: 1, col: 1, label: "變りかめの丸" }],
  stock: true,
  sampleSize: length,
  sampleOptions: { motif: "turtle" },
  build(c, centre, turn, size, { motif, mirror, paper = PAPER, keyline }) {
    const k = size / length;
    const gap = paper / k;
    const radius = hexRadius - gap / Math.sqrt(3);
    const tiles = rows.map((at) => ({ at, edge: turtlePlateOutline(at, radius) })).filter(({ edge }) =>
      edge.some((side) => inside(inner, pieceStart(side))) || inner.some((side) => inside(edge, pieceStart(side)))
    );
    const angle = turn * DEG;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    for (const { at: [horizontal, vertical] } of tiles) {
      const localX = mirror ? -horizontal : horizontal;
      const x = localX * cos + vertical * sin;
      const y = -localX * sin + vertical * cos;
      c.guideCircle([100 + centre[0] + x * k, 100 - centre[1] - y * k], radius * k);
    }
    const margins = rimMargin(gap);
    const rimInk = carve([shell], [inner, ...plateCuts(gap)]);
    const plateInk = carveWhere([...inner, ...tiles.flatMap(({ edge }) => edge), ...margins.flat()], (at) =>
      inside(inner, at) && !margins.some((margin) => inside(margin, at)) && tiles.some(({ edge }) => inside(edge, at))
    );
    fillPart(c, motif, [...rimInk, ...plateInk], { k, at: centre, turn, mirror }, keyline);
  },
});

export default roundTurtleShell;
