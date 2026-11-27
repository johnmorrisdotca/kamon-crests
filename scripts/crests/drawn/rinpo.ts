import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { carveWhere, circleThrough, disc, inside, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";

interface WheelPattern {
  spokes: number;
  between: number;
  hub: number;
  cheek: number;
  beaded?: true;
  swordTips?: true;
}

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const lean = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);
const turned = (piece: Region, angle: number): Region => piece.map((edge) => rotated(edge, angle));
const centre: V = [0, 0];
const inner = 72.5;
const outer = 85;

/** One flaring spoke and a pointed terminal outside the common band of the wheel. */
export const rinpoBuild = (c: Builder, wheel: WheelPattern): void => {
  c.precision(3);
  const { spokes, between, hub, cheek, beaded, swordTips } = wheel;
  const pitch = 2 * Math.PI / spokes;
  const stem = spokes === 8 ? 2.35 : 3.25;
  const ankle = spokes === 8 ? 51 : 43;
  const lowLeft: V = [-stem, hub - 1];
  const lowRight: V = [stem, hub - 1];
  const highLeft: V = [-stem, ankle];
  const highRight: V = [stem, ankle];
  const left: V = [-cheek, inner + 3];
  const right: V = [cheek, inner + 3];
  const unit: Region = [seg(lowLeft, highLeft), lean(highLeft, left, 39, [-36, 41]), seg(left, right),
    lean(right, highRight, 39, [36, 41]), seg(highRight, lowRight), seg(lowRight, lowLeft)];
  const cap = swordTips
    ? polygon([[-12, outer - 3], [-13, 89], [0, R], [13, 89], [12, outer - 3]])
    : polygon([[-9, outer - 3], [-11, 91], [0, R], [11, 91], [9, outer - 3]]);
  const filler = polygon([[-4.2, outer - 3], [-5.2, 91], [0, 93.4], [5.2, 91], [4.2, outer - 3]]);
  const blades = Array.from({ length: spokes }, (_, i) => i * pitch);
  const details = blades.flatMap((angle) => [turned(unit, angle), turned(cap, angle),
    ...Array.from({ length: between }, (_, i) => turned(filler, angle + (i + 1) * pitch / (between + 1)))]);
  const swordSlots = polygon([[-7.5, 86.3], [-7.1, 88.6], [-2.1, 92.6], [-2.1, 86.3]]);
  const tipSlot = polygon([[-2, 85.5], [-2.4, 88.2], [0, 90.2], [2.4, 88.2], [2, 85.5]]);
  const slots = swordTips ? blades.flatMap((angle) => [turned(swordSlots, angle),
    turned(polygon([[7.5, 86.3], [7.1, 88.6], [2.1, 92.6], [2.1, 86.3]]), angle),
    ...Array.from({ length: between }, (_, i) => turned(tipSlot, angle + (i + 1) * pitch / (between + 1)))]) : [];
  const beads: V[] = beaded ? blades.map((angle) => [-79 * Math.sin(angle), 79 * Math.cos(angle)]) : [];
  const outlines = [...disc(centre, hub), ...disc(centre, inner), ...disc(centre, outer), ...details.flat(), ...slots.flat(),
    ...beads.flatMap((mark) => disc(mark, 2.8))];
  const field = carveWhere(outlines, (point) => {
    const r = Math.hypot(...point);
    const ink = r < hub || (inner < r && r < outer) || details.some((detail) => inside(detail, point));
    return ink && !slots.some((slot) => inside(slot, point)) && !beads.some(([x, y]) => Math.hypot(point[0] - x, point[1] - y) < 2.8);
  });
  c.fill("dharma-wheel", toPath(field, { k: 1 }), "evenodd");
};

export const maruNiMitsuRinpoKuzushiBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  const long = polygon([[-3.6, 7], [-7.5, 31], [-17, 49], [-8, 57], [0, 67], [8, 57], [17, 49], [7.5, 31], [3.6, 7]]);
  const short = polygon([[-2.3, 7], [-2.4, 22], [-6.6, 29], [0, 34.5], [6.6, 29], [2.4, 22], [2.3, 7]]);
  const collar = polygon([[-4.6, 29], [0, 37], [4.6, 29], [0, 23]]);
  const petals = [0, 1, 2].flatMap((i) => [turned(long, i * Math.PI * 2 / 3), turned(short, (2 * i + 1) * Math.PI / 3)]);
  const collars = [0, 1, 2].map((i) => turned(collar, i * Math.PI * 2 / 3));
  const field = carveWhere([...disc(centre, 8.6), ...petals.flat(), ...collars.flat()], (point) =>
    (Math.hypot(...point) < 8.6 || petals.some((tip) => inside(tip, point))) && !collars.some((cut) => inside(cut, point)));
  c.guideSpokes(3, 0, R);
  c.fill("dharma-wheel", toPath(field, { k: reach / 67 }), "evenodd");
};
