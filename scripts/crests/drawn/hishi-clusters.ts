import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, carve, disc, pieceStart, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { matsukawaOutline } from "./families.ts";
import { HANABISHI_FOUR, shihoHanabishiBuild } from "./hanabishi.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));
const plain = { k: 1 };

const notchedSide = (a: V, b: V): V[] => {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const length = Math.hypot(dx, dy);
  const at = (t: number, inside = 0): V => [a[0] + t * dx + inside * dy / length, a[1] + t * dy - inside * dx / length];
  return [a, ...[.19, .38, .63, .8].flatMap((t) => [at(t), at(t, 3.7), at(t + .058, 3.7), at(t + .058)])];
};

export function saizuchiBishiBuild(c: Builder): void {
  const corners: V[] = [[0, 80], [R, 0], [0, -80], [-R, 0]];
  const rim = polygon(corners.flatMap((a, i) => notchedSide(a, corners[(i + 1) % corners.length])));
  const lo = 80;
  const slits = [thickSeg([-R, -lo], [R, lo], 2.5), thickSeg([-R, lo], [R, -lo], 2.5)];
  const petal = HANABISHI_FOUR.lobes.map((lobe) => disc([lobe.c[0] * .53, lobe.c[1] * .53], lobe.r * .53 + 2.2));
  const flowerClearance = [disc([0, 0], 36), ...[0, 90, 180, 270].flatMap((angle) => petal.map((loop) => loop.map((edge) => rotated(edge, angle * DEG))))];
  c.guideCircle(C0, R);
  c.guideCircle(C0, 80);
  c.guideSpokes(4);
  c.fill("diamond", toPath(carve([rim], [...slits, ...flowerClearance]), plain), "evenodd");
  shihoHanabishiBuild(c, "flower-lozenge", 53);
}

export function mitsuMatsukawaBishiBuild(c: Builder): void {
  const outline = matsukawaOutline();
  const set = ([cx, cy]: V, grow = 0) => outline.map((loop) => polygon(loop.map((edge) => {
    const [x, y] = pieceStart(edge);
    return [cx + x * (.48 + grow), cy + y * (.38 + grow)];
  })));
  const above: V = [0, 23];
  const left: V = [-46, -13];
  const right: V = [46, -13];
  c.guideCircle(C0, R);
  c.guideSpokes(4);
  c.fill("diamond", toPath(carve(set(left), [...set(above, .02), ...set(right, .02)]), plain), "evenodd");
  c.fill("diamond", toPath(carve(set(right), set(above, .02)), plain), "evenodd");
  c.fill("diamond", toPath(set(above), plain), "evenodd");
}

export function itowaNiMitsuSangaiBishiBuild(c: Builder): void {
  c.ring("ring-thread");
  const reach = 88;
  const side = reach * Math.sqrt(3) / 2;
  const face = polygon([[0, reach], [side, reach / 2], [0, 0], [-side, reach / 2]]);
  const tipCut = (near: number, far: number, width: number) => polygon([[-width, -near], [0, -far], [width, -near]]);
  const seam = [thickSeg([0, 0], [0, -reach - 4], 2.4), tipCut(39, 59, 7), tipCut(61, 87, 10)];
  const cuts = [0, 120, 240].flatMap((angle) => seam.map((loop) => loop.map((edge) => rotated(edge, angle * DEG))));
  c.guideCircle(C0, reach);
  c.guideSpokes(6, 0, reach);
  for (const angle of [0, 120, 240]) {
    const turned = face.map((edge) => rotated(edge, angle * DEG));
    c.fill("diamond", toPath(carve([turned], cuts), plain), "evenodd");
  }
}
