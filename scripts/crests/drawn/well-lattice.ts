import { DEG, carve, disc, mirrored, onCircle, seg, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { RING_GAP, WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, R, add, ngon, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

/** An L-shaped arrangement of three square eyes, turned to place one eye above the other two. */
export const maruNiKumiawaseIgetaBuild = (c: Builder): void => {
  c.precision(3);
  const reach = c.ring("ring-medium") - RING_GAP;
  const d = reach * 0.49;
  const b = reach * 0.115;
  const t = reach * 0.22;
  const place = (point: Pt): Pt => {
    const [x, y] = turn(point, 45, [0, 0]);
    return [CX + x, CY + y * 0.86];
  };
  // Follow the exposed ends on one side of the lattice, from its upper corner to the open lower eye.
  const half: Pt[] = [
    [-d - b, -d - b], [-d - b, -d - t], [-d + b, -d - t], [-d + b, -d - b],
    [-b, -d - b], [-b, -d - t], [b, -d - t], [b, -d - b],
    [d - b, -d - b], [d - b, -d - t], [d + b, -d - t], [d + b, -d - b],
    [d + t, -d - b], [d + t, -d + b], [d + b, -d + b],
    [d + b, -b], [d + t, -b], [d + t, b], [d + b, b],
    [d + b, t], [d - b, t], [d - b, b], [b, b],
  ];
  const other = half.slice(1, -1).reverse().map(([x, y]): Pt => [y, x]);
  const eyeCentres: Pt[] = [[-d / 2, -d / 2], [d / 2, -d / 2], [-d / 2, d / 2]];
  const h = d / 2 - b;
  const eyes = eyeCentres.map(([x, y]) => {
    const corners: Pt[] = [[x - h, y - h], [x + h, y - h], [x + h, y + h], [x - h, y + h]];
    return poly(corners.map(place));
  });
  c.fill("well-frame", poly([...half, ...other].map(place)).join(...eyes), "evenodd");
};

/** One quarter's notch between tiles and the cut from an outer point into one small eye. */
export const yotsumeIBuild = (c: Builder): void => {
  c.precision(3);
  const reach = R - 1.5;
  const edge = reach / 2;
  const slot = 2.15;
  const notch = reach * 0.22;
  const stem = 1.6;
  const eye = reach * 0.56;
  const eyeHalf = reach * 0.109;
  const quarter: Pt[] = [
    [stem, -reach + stem], [edge - slot, -edge - slot],
    [notch - slot, -notch - slot], [notch + slot, -notch + slot],
    [edge + slot, -edge + slot], [reach - stem, -stem],
    [eye + eyeHalf - stem, -stem], [eye, -eyeHalf], [eye - eyeHalf, 0],
    [eye, eyeHalf], [eye + eyeHalf - stem, stem],
  ];
  const outline = [0, 90, 180, 270].flatMap((angle) => quarter.map((point) => turn(add(C0, point), angle)));
  c.fill("well-frame", poly(outline).join(ngon(4, reach * 0.052)), "evenodd");
};

export const itsutsuKarakanNiIgetaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const broad = thickArc([0, 58], 33.5, 9, 44 * DEG, 136 * DEG);
  const endCentre: V = [32, 75];
  const endRadius = 9.8;
  const endWidth = 8.4;
  const endAngle = -137 * DEG;
  const curl = thickArc(endCentre, endRadius, endWidth, 148 * DEG, endAngle);
  const tip = disc(onCircle(endCentre, endRadius, endAngle), endWidth / 2);
  // This short arc joins the outer shoulder of each curl to the next arch.
  const join = thickArc([0, 0], 82, WEIGHT.thin, 49 * DEG, 60 * DEG);
  const arch = carve([broad, curl, curl.map(mirrored), tip, tip.map(mirrored), join], []);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("curled-band", toPath(arch, { k: 1, turn }), "evenodd");

  const beam = (u0: number, u1: number, v0: number, v1: number): Region => {
    const grid: V[] = [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
    const corners = grid.map(([u, v]): V => [0.8 * (u + v), 0.6 * (u - v)]);
    return corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));
  };
  const lattice = carve([beam(-50, 50, -30, -12), beam(-50, 50, 12, 30), beam(-30, -12, -50, 50), beam(12, 30, -50, 50)], []);
  c.fill("well-frame", toPath(lattice, { k: 1 }), "evenodd");
};
