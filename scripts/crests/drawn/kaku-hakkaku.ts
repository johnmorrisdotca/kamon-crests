import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { disc, onPage, seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";

const plain = { k: 1 };

export function hakkakuMochiBuild(c: Builder): void {
  const corners = [0, 1, 2, 3, 4, 5, 6, 7].map((i): V => [R * Math.sin((22.5 + 45 * i) * Math.PI / 180), R * Math.cos((22.5 + 45 * i) * Math.PI / 180)]);
  const octagon = corners.map((a, i) => seg(a, corners[(i + 1) % 8]));
  const hole = 80.7;
  c.guideCircle(C0, R);
  c.guideCircle(C0, hole);
  c.guideLine(onPage([-R, 0], plain), onPage([R, 0], plain));
  c.guideLine(onPage([0, -R], plain), onPage([0, R], plain));
  c.guidePath(toPath([octagon], plain));
  c.fill("square-frame", toPath([octagon, disc([0, 0], hole)], plain), "evenodd");
}
