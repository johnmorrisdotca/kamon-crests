import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { carve, disc, onPage, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const plain = { k: 1 };
const rectangle = (left: number, right: number, top: number, bottom: number): Region => {
  const corners: V[] = [[left, top], [right, top], [right, bottom], [left, bottom]];
  return corners.map((a, i) => seg(a, corners[(i + 1) % 4]));
};

export function tsunagiMitsuHikiryoBuild(c: Builder): void {
  const gap = 2.2;
  const across = 72;
  const side = (2 * across - 2 * gap) * 80 / 280;
  const middle = (2 * across - 2 * gap) * 120 / 280;
  const high = Math.sqrt(R * R - across * across);
  const hole = 20.6;
  const inner = middle / 2 + gap;
  const bars = [
    rectangle(-inner - side, -inner, high, -high),
    rectangle(-middle / 2, middle / 2, high, -high),
    rectangle(inner, inner + side, high, -high),
  ];
  c.guideCircle(C0, R);
  c.guideCircle(C0, hole);
  c.guideLine(onPage([-R, 0], plain), onPage([R, 0], plain));
  c.guideLine(onPage([0, -R], plain), onPage([0, R], plain));
  for (const bar of bars) c.guidePath(toPath([bar], plain));
  c.fill("line", toPath([bars[0]], plain), "evenodd");
  c.fill("line", toPath(carve([bars[1]], [disc([0, 0], hole)]), plain), "evenodd");
  c.fill("line", toPath([bars[2]], plain), "evenodd");
}
