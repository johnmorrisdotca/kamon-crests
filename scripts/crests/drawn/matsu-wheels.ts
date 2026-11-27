import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { carveWhere, disc, inside, moved, rotated, seg, toPath, vmul } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0 } from "../../construct/geo.ts";
import { matsuInk } from "./matsu.ts";

/** Each pine fills its sector of the ring, with a narrow opening along either side. */
export function pineWheel(c: Builder, room: number, count: number, reversed: boolean, near: number): void {
  const scale = (room - near) / (63 + 79);
  const shift: V = [0, near + (reversed ? 63 : 79) * scale];
  const field = disc([0, 0], room);
  const flank = Math.tan(Math.PI / count);
  const seam = 1.3;
  const walls = [
    seg([-seam, 0], [100 * flank - seam, 100]),
    seg([seam, 0], [-100 * flank + seam, 100]),
  ];
  const place = (loop: Region): Region => loop.map((edge) => {
    const scaled = edge.t === "L"
      ? seg(vmul(edge.a, scale), vmul(edge.b, scale))
      : { ...edge, c: vmul(edge.c, scale), r: edge.r * scale };
    return moved(reversed ? rotated(scaled, Math.PI) : scaled, shift);
  });
  const fills = matsuInk().map((part) => {
    const placed = part.map(place);
    return carveWhere(
      [...placed.flat(), ...field, ...walls],
      ([x, y]) => Math.hypot(x, y) < room
        && Math.abs(x) < y * flank - seam
        && placed.filter((loop) => inside(loop, [x, y])).length % 2 === 1,
    );
  });

  c.guideCircle(C0, room);
  c.guideSpokes(count, 0, room);
  for (let index = 0; index < count; index++) {
    const turn = index * 360 / count;
    c.group(() => {
      for (const fill of fills) c.fill("pine", toPath(fill, { k: 1, turn }), "evenodd");
    });
  }
}

export function hosowaMitsuMatsuBuild(c: Builder): void {
  c.precision(3);
  const room = c.ring("ring-thin");
  pineWheel(c, room - RING_GAP, 3, true, 8.5);
}
