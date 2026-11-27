import { bowedArc, carve, disc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 166) * .61, (169 - y) * .61];

function loop(points: readonly Mark[]): Region {
  return points.map(([x, y, bow], i) => {
    const [u, v] = points[(i + 1) % points.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .61);
  });
}

function cut(start: Mark, end: Mark, paper: number): Region {
  const a = p(start[0], start[1]);
  const b = p(end[0], end[1]);
  const arc = bowedArc(a, b,(start[2] ?? 0) * .61);
  return arc.t === "A" ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1)) : thickSeg(a, b, paper);
}

type Pose = "upright" | "folded";
interface SwallowtailForewingOptions extends PartOptions {
  pose?: Pose;
}
const heights = { upright: (223 - 84) * .61, folded: (219 - 143) * .61 };

function outline(pose: Pose, paper: number) {
  const seam = (a: Mark, b: Mark) => cut(a, b, paper);
  if (pose === "upright") {
    const fore = loop([
      [130, 84, 3], [157, 92, 5], [176, 112, 3], [193, 138, 4], [211, 164, -3], [202, 177, 3],
      [183, 186, 1], [166, 214, 2], [151, 223, -2], [133, 189, -2], [126, 170, -1], [132, 149, 2], [135, 117, 3],
    ]);
    return carve([fore], [
      seam([137, 151, -7], [199, 167]), seam([137, 156, -6], [197, 172]),
      seam([143, 171, -3], [153, 205]), seam([154, 175, -1], [157, 205]),
      seam([169, 176, 1], [161, 207]), seam([183, 178, 1], [166, 208]), seam([196, 179, 1], [172, 214]),
      ...([[156, 110], [174, 124], [190, 146]] as const).flatMap(([x, y]) => [
        disc(p(x, y), 3.4), seam([x - 7, y + 7, 1.6], [x + 3, y + 9]), seam([x - 8, y + 13, 2], [x + 3, y + 15]),
      ]),
    ]);
  }

  return carve([loop([
    [81, 156, 2], [100, 145, 3], [126, 143, 3], [136, 157, -2], [130, 176, 1], [134, 192, 0],
    [145, 213, 2], [123, 219, -3], [110, 192, 1], [101, 177, 3], [94, 163, 1],
  ])], [
    disc(p(107, 153), 2.9), disc(p(122, 157), 3.1),
    seam([104, 165, 1], [111, 167]), seam([115, 170, 1], [126, 169]), seam([112, 178, 2], [127, 174]),
    seam([118, 188, 1], [129, 182]), seam([122, 196, 1], [134, 190]),
  ]);
}

/** Size is the forewing’s height. Place the body axis. */
export const swallowtailForewing = definePart<SwallowtailForewingOptions>({
  id: "swallowtail-forewing",
  name: { en: "Swallowtail forewing", ja: "揚羽蝶の前の羽" },
  description: {
    en: "An upright scalloped wing or a folded wing, with circular eyes and fine arced veins.",
    ja: "立てた羽か折り込んだ羽に、丸い目と細い弧の翅脈を入れます。",
  },
  families: ["cho"],
  sources: [{ frame: 28, page: "R", row: 4, col: 3, label: "うりニあげは蝶" }],
  stock: true,
  sampleSize: heights.upright,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, pose = "upright" }) {
    const k = size / heights[pose];
    fillPart(c, motif, outline(pose, paper / k), { k, at: centre, turn }, keyline);
  },
});
export default swallowtailForewing;
