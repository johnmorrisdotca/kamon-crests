// A six-spoked wheel with a large pointed knob on its rim between each pair of spokes, from frame 13 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carveWhere, circleThrough, disc, inside, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const lean = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);
const turned = (piece: Region, angle: number): Region => piece.map((edge) => rotated(edge, angle));

export const mitsuRinpoBuild = (c: Builder): void => {
  c.precision(3);
  const centre: V = [0, 0];
  const hub = 12.3;
  const inner = 69;
  const outer = 80.5;
  const stem = 2;
  const ankle = 44;
  const cheek = 24;
  const pitch = Math.PI / 3;
  const unit: Region = [
    seg([-stem, hub - 1], [-stem, ankle]),
    lean([-stem, ankle], [-cheek, inner + 3], 39, [-40, 38]),
    seg([-cheek, inner + 3], [cheek, inner + 3]),
    lean([cheek, inner + 3], [stem, ankle], 39, [40, 38]),
    seg([stem, ankle], [stem, hub - 1]),
    seg([stem, hub - 1], [-stem, hub - 1]),
  ];
  const knob = polygon([[-17.5, outer - 2.5], [-18.5, 86], [0, R], [18.5, 86], [17.5, outer - 2.5]]);
  const spokes = Array.from({ length: 6 }, (_, i) => turned(unit, i * pitch + pitch / 2));
  const knobs = Array.from({ length: 6 }, (_, i) => turned(knob, i * pitch));
  const details = [...spokes, ...knobs];
  const outlines = [...disc(centre, hub), ...disc(centre, inner), ...disc(centre, outer), ...details.flat()];
  const field = carveWhere(outlines, (point) => {
    const r = Math.hypot(...point);

    return r < hub || (inner < r && r < outer) || details.some((detail) => inside(detail, point));
  });
  c.fill("dharma-wheel", toPath(field, { k: 1 }), "evenodd");
};
