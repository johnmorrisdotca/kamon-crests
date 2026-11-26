import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carve, carveWhere, disc, inside, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const PART = "wood-sorrel";
const CENTRE: V = [0, 0];
const TURNS = [0, 120, 240];

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

const heartLeaf = (height: number, lobe: number, radius: number): Region[] => {
  const left = disc([-lobe, height], radius);
  const right = disc([lobe, height], radius);
  const taper = polygon([[0, 8], [-25, height - 8], [0, height + 8], [25, height - 8]]);
  return carve([left, right, taper], []);
};

const arrow = polygon([[-1.6, 9.9], [-1.6, 31], [-6.6, 38], [0, 46.4], [6.6, 38], [1.6, 31], [1.6, 9.9]]);

/** The ring holds three broad heart leaves with pointed white stamens. */
export const sakaiKatabamiBuild = (c: Builder, inner: number): void => {
  c.precision(3);
  const k = (inner - 3.1) / 96;
  const lobes = heartLeaf(59.7, 23.5, 31.6);
  const leaf = carve(lobes, [arrow, disc(CENTRE, 16.1)]);
  c.guideSpokes(6, 0, inner);
  for (const turn of TURNS) c.fill(PART, toPath(leaf, { k, turn }));
  c.fill(PART, toPath([disc(CENTRE, 13.1)], { k }));
};

/** Three lobed leaves point into the enclosing circle from its rim. */
export const mitsuWariKatabamiBuild = (c: Builder): void => {
  c.precision(3);
  const outer = disc(CENTRE, 96);
  const pose = (loop: Region): Region => loop.map((p) => {
    const rotatedPiece = rotated(p, Math.PI);
    const move = ([x, y]: V): V => [0.79 * x, 96 + 0.79 * y];
    if (rotatedPiece.t === "L") return seg(move(rotatedPiece.a), move(rotatedPiece.b));
    return { ...rotatedPiece, c: move(rotatedPiece.c), r: rotatedPiece.r * 0.79 };
  });
  const centre = heartLeaf(60.5, 24.4, 33.4).map(pose);
  const sides = [disc([-43.5, 78], 36), disc([43.5, 78], 36)];
  const clippingRadius = 93.2;
  const clippingEdge = disc(CENTRE, clippingRadius);
  const rimmed = (loops: Region[]): Region[] => carveWhere([...loops.flat(), ...clippingEdge],
    (point) => Math.hypot(...point) < clippingRadius && loops.some((loop) => inside(loop, point)));
  const petal = carve(rimmed([...centre, ...sides]), [pose(arrow), disc([0, 102], 20)]);
  const rimHeart = rimmed([disc([0, 103], 16.2)]);
  const outline = carve([outer], [disc(CENTRE, 94.15)]);
  c.guideCircle(C0, 96);
  c.guideSpokes(3, 0, 96);
  c.fill(PART, toPath(outline, { k: 1 }));
  for (const turn of TURNS) {
    c.fill(PART, toPath(petal, { k: 1, turn }));
    c.fill(PART, toPath(rimHeart, { k: 1, turn }));
  }
};
