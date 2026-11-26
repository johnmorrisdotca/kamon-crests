import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
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

export const looseManji = (c: Builder): void => {
  const side = R * Math.SQRT1_2;
  const square = polygon([[-side, side], [side, side], [side, -side], [-side, -side]]);
  const x = 14;
  const y = 46;
  const w = 1.9;
  const slit = polygon([[x - w, side + 2], [x + w, side + 2], [x + w, 18], [x - w, 18], [x - w, y - w], [-43, y - w], [-43, y + w], [x - w, y + w]]);
  const spaces = quarterTurns.map((angle) => slit.map((edge) => rotated(edge, -angle * DEG)));
  c.guideCircle(C0, R);
  c.fill("manji", toPath(carve([square], spaces), { k: 1, turn: 45 }));
};
