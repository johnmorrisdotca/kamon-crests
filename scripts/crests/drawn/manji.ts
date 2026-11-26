import type { Builder } from "../../construct/builder.ts";
import { DEG, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";

const quarterTurns = [0, 90, 180, 270];

export const roundManji = (c: Builder): void => {
  const room = 84;
  const left: V = [-32, Math.sqrt(room * room - 32 * 32)];
  const right: V = [61, Math.sqrt(room * room - 61 * 61)];
  const slit: V[] = [right, [37, right[1]], [37, 10], [17, 10], [17, right[1]], [-32, right[1]], left];
  const cut = [shortArc({ c: [0, 0], r: room }, left, right), ...slit.slice(1).map((point, i) => seg(slit[i], point))];
  const spaces = quarterTurns.map((angle) => cut.map((edge) => rotated(edge, -angle * DEG)));
  c.guideCircle(C0, R);
  c.guideCircle(C0, room);
  c.fill("manji", circle(C0, R).join(toPath(spaces, { k: 1 })), "evenodd");
};
