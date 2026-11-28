import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { carve, onPage, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));
const plain = { k: 1 };

export function kageMatsukawaBishiBuild(c: Builder): void {
  const k = R / 481;
  const outline = (tip: number, apex: number, step: V, notch: V): Region => {
    const right: V[] = [[0, apex], step, notch, [tip, 0], [notch[0], -notch[1]], [step[0], -step[1]], [0, -apex]];
    const left: V[] = right.slice(1, -1).reverse().map(([x, y]): V => [-x, y]);
    return polygon([...right, ...left].map(([x, y]): V => [x * k, y * k]));
  };
  const outer = outline(481, 391, [270, 215], [193, 168]);
  const inner = outline(335, 297, [140, 212], [71, 168]);
  c.guideCircle(C0, R);
  c.guideLine(onPage([-R, 0], plain), onPage([R, 0], plain));
  c.guideLine(onPage([0, -R], plain), onPage([0, R], plain));
  c.guidePath(toPath([outer], plain));
  c.guidePath(toPath([inner], plain));
  c.fill("diamond", toPath(carve([outer], [inner]), plain), "evenodd");
}
