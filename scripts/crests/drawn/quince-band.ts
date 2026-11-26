// The inside band of a quince lobe. Each end swells into a bulb blended into both edges by tangent arcs.
import { arcTo, carve, disc, mirrored, reversed, shortArc, tangentCircle, touch, vadd, vmul } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

export const curledBand = (outer: Circle, inner: Circle, bulb: Circle, fillet: number, notch: number): Region[] => {
  const outerBend = tangentCircle(outer, 1, bulb, 1, fillet, [outer.c[0], outer.c[1] + outer.r]);
  const innerBend = tangentCircle(inner, -1, bulb, 1, fillet, [inner.c[0], inner.c[1] + inner.r]);
  const outerJoin = touch(outer, outerBend);
  const innerJoin = touch(inner, innerBend);
  const outerTip = touch(bulb, outerBend);
  const innerTip = touch(bulb, innerBend);
  const cap = [shortArc(outerBend, outerJoin, outerTip), arcTo(bulb, outerTip, innerTip, false), shortArc(innerBend, innerTip, innerJoin)];
  const mirror = ([x, y]: V): V => [-x, y];
  const outline = [shortArc(outer, mirror(outerJoin), outerJoin), ...cap, shortArc(inner, innerJoin, mirror(innerJoin)), ...cap.map(mirrored).map(reversed).reverse()];

  if (notch === 0) return [outline];

  const angle = Math.atan2(bulb.c[1] - inner.c[1], bulb.c[0] - inner.c[0]);
  const intoPaper: V = [0.8 * Math.sin(angle) - 0.6 * Math.cos(angle), -0.8 * Math.cos(angle) - 0.6 * Math.sin(angle)];
  const bite = vadd(bulb.c, vmul(intoPaper, bulb.r + notch / 3));

  return carve([outline], [disc(bite, notch), disc(mirror(bite), notch)]);
};
