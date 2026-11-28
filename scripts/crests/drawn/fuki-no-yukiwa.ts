// Six two-bumped petals round a hub, with a round lobe showing behind each seam, from frame 41 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carveWhere, disc, seg, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const DEG = Math.PI / 180;
const polar = (distance: number, clock: number): V => [distance * Math.sin(clock * DEG), distance * Math.cos(clock * DEG)];
const clockOf = ([x, y]: V): number => ((Math.atan2(x, y) / DEG) % 360 + 360) % 360;

export const fukiNoYukiwaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const gap = 1.6;
  const hub = 13.3;
  const bump = { out: 71, r: 24, spread: 13.7 };
  const back = { out: 49, r: 45 };
  const bumps = Array.from({ length: 6 }, (_, i) => [-1, 1].map((side) => ({ c: polar(bump.out, 30 + 60 * i + side * bump.spread), r: bump.r, petal: i }))).flat();
  const lobes = Array.from({ length: 6 }, (_, i) => ({ c: polar(back.out, 60 * i), r: back.r }));
  const petalOf = (p: V): number => Math.floor(clockOf(p) / 60);
  const seam = (p: V): number => {
    const clock = clockOf(p);
    const off = clock % 60;
    const near = Math.min(off, 60 - off);

    return Math.sin(near * DEG) * Math.hypot(p[0], p[1]);
  };
  const inFront = (p: V, grow: number): boolean => {
    const r = Math.hypot(p[0], p[1]);
    if (r <= hub) return false;
    const i = petalOf(p);

    return (r < 55 + grow || bumps.some((b) => b.petal === i && Math.hypot(p[0] - b.c[0], p[1] - b.c[1]) < b.r + grow)) && (grow > 0 || seam(p) > gap / 2);
  };
  const inLobe = (p: V): boolean => lobes.some((l) => Math.hypot(p[0] - l.c[0], p[1] - l.c[1]) < l.r);
  const ink = (p: V): boolean => inFront(p, 0) || (inLobe(p) && !inFront(p, gap) && Math.hypot(p[0], p[1]) > hub);

  const outlines: Piece[] = [
    ...bumps.flatMap((b) => [...disc(b.c, b.r), ...disc(b.c, b.r + gap)]),
    ...lobes.flatMap((l) => disc(l.c, l.r)),
    ...disc([0, 0], hub),
  ];
  for (let i = 0; i < 6; i += 1) {
    const along = polar(1, 60 * i);
    const across: V = [along[1], -along[0]];
    for (const side of [-1, 1]) {
      const shift: V = [(across[0] * side * gap) / 2, (across[1] * side * gap) / 2];
      outlines.push(seg([along[0] * (hub - 4) + shift[0], along[1] * (hub - 4) + shift[1]], [along[0] * 110 + shift[0], along[1] * 110 + shift[1]]));
    }
  }
  c.fill("snow-ring", toPath(carveWhere(outlines, ink), { k: 1 }), "evenodd");
};
