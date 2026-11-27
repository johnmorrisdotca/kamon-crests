import type { Builder } from "../../construct/builder.ts";
import { DEG, carveWhere, circleThrough, disc, inside, onCircle, rotated, shortArc, thickSeg, toPath, vadd } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R, circle, ngonPoints, poly, polar } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";
import { shihoHanabishiBuild } from "./hanabishi.ts";

const hexagon = (radius: number, centre: Pt = C0) => poly(ngonPoints(6, radius, 0, centre));

export function mitsuKikkoKuzushiBuild(c: Builder): void {
  const outline: Pt[] = [[0, 0], [37, 20], [37, 54], [23, 54], [23, 29], [0, 15], [-23, 29], [-23, 54], [-37, 54], [-37, 20]];
  const apices: Pt[] = [[100, 42], [139, 103], [61, 103]];
  c.guideCircle(C0, R);
  for (const [x, y] of apices) {
    const corners: Pt[] = outline.map(([dx, dy]) => [x + dx, y + dy]);
    const band = poly(corners);
    c.guidePath(band);
    c.fill("tortoise-shell", band);
  }
}

export function mitsuyoriKikkoMochiBuild(c: Builder): void {
  c.stepRound(R);
  for (const angle of [0, 120, 240]) {
    const centre = polar(48, angle);
    const tile = hexagon(46.8, centre);
    c.guidePath(tile);
    c.guideCircle(centre, 16);
    c.fill("tortoise-shell", tile.join(circle(centre, 16)), "evenodd");
  }
}

export function kikkoHanabishiCircleBuild(c: Builder): void {
  c.stepRound(R);
  c.fill("frame", hexagon(R).join(hexagon(90)), "evenodd");
  c.guideCircle(C0, 59);
  c.guideCircle(C0, 55);
  c.fill("frame", circle(C0, 59).join(circle(C0, 55)), "evenodd");
  shihoHanabishiBuild(c, "flower-lozenge", 52);
}

const curvedShell = (reach: number, depth: number): Region => {
  const origin: V = [0, 0];
  const corners = [90, 30, -30, -90, -150, -210].map((angle) => onCircle(origin, reach, angle * DEG));
  const sideRadius = (reach ** 2 / 4 + depth ** 2) / (2 * depth);
  return corners.map((corner, i) => {
    const next = corners[(i + 1) % corners.length];
    return shortArc(circleThrough(corner, next, sideRadius, vadd(corner, next)), corner, next);
  });
};

export function sorikataKikkoKuzushiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const hull = curvedShell(R, 10.5);
  const opening = curvedShell(59, 5.3);
  const field = curvedShell(53, 4.8);
  const petals = [disc([0, 36], 13), disc([-14, 27], 13), disc([14, 27], 13), disc([0, 17], 12.5)];
  const vein = thickSeg([0, 26], [0, 53], 5.2);
  const leaves = [0, 120, 240].map((turn) => {
    const place = (region: Region) => region.map((edge) => rotated(edge, -turn * DEG));
    return { petals: petals.map(place), vein: place(vein) };
  });
  const cuts = leaves.flatMap((leaf) => [...leaf.petals.flat(), ...leaf.vein]);
  const ink = carveWhere([...field, ...cuts], (point) =>
    inside(field, point) && !leaves.some((leaf) => leaf.petals.some((petal) => inside(petal, point)) && !inside(leaf.vein, point)));

  c.fill("tortoise-shell", toPath([hull, opening], { k: 1 }), "evenodd");
  c.fill("tortoise-shell", toPath(ink, { k: 1 }), "evenodd");
}
