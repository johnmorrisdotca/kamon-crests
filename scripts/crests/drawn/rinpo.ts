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

export const rinpoBishiBuild = (c: Builder): void => {
  const diamond = (width: number, height: number): Region => polygon([[0, height], [width, 0], [0, -height], [-width, 0]]);
  const outerDiamond = diamond(61, 47);
  const innerDiamond = diamond(55, 42);
  const tip = (foot: number, reach: number): Region => polygon([[-5, foot], [-13, reach - 12], [0, reach], [13, reach - 12], [5, foot]]);
  const slit = (foot: number, reach: number): Region => polygon([[-1.3, foot + 4], [-1.3, reach - 9], [0, reach - 6], [1.3, reach - 9], [1.3, foot + 4]]);
  const spoke = (reach: number): Region => polygon([[-2.1, 7], [-4.1, 15], [-7.2, reach - 10], [0, reach], [7.2, reach - 10], [4.1, 15], [2.1, 7]]);
  const facet = (reach: number): Region => polygon([[-1.0, 12], [-1.0, reach - 7], [0, reach - 4], [1.0, reach - 7], [1.0, 12]]);
  const cornerTips = [tip(42, 77), tip(56, 94), turned(tip(42, 77), Math.PI), turned(tip(56, 94), Math.PI)];
  const cornerSlots = [slit(42, 77), slit(56, 94), turned(slit(42, 77), Math.PI), turned(slit(56, 94), Math.PI)];
  const tips = cornerTips.map((part, i) => i % 2 === 0 ? part : turned(part, Math.PI / 2));
  const slots = cornerSlots.map((part, i) => i % 2 === 0 ? part : turned(part, Math.PI / 2));
  const arms = [spoke(45), turned(spoke(58), Math.PI / 2), turned(spoke(45), Math.PI), turned(spoke(58), 3 * Math.PI / 2)];
  const innerFacets = [facet(45), turned(facet(58), Math.PI / 2), turned(facet(45), Math.PI), turned(facet(58), 3 * Math.PI / 2)];
  const edgeLength = Math.hypot(61, 47);
  const tabs = [0.24, 0.5, 0.76].flatMap((t, i) => {
    const x = 61 * t;
    const y = 47 * (1 - t);
    const rise = i === 1 ? 14 : 10;
    const width = i === 1 ? 7.5 : 5.2;
    const onTab = (along: number, out: number): V =>
      [x + (61 * along + 47 * out) / edgeLength, y + (61 * out - 47 * along) / edgeLength];
    const tab = [onTab(-width, -2.5), onTab(-width, rise - 5), onTab(0, rise), onTab(width, rise - 5), onTab(width, -2.5)];
    const seam = [onTab(-2, 1), onTab(0.9, rise - 3), onTab(2.7, rise - 3), onTab(0, 1)];
    return [[1, 1], [-1, 1], [-1, -1], [1, -1]].map(([sx, sy]) => {
      const place = (points: V[]): Region => polygon(points.map(([u, v]) => [sx * u, sy * v]));

      return { body: place(tab), seam: place(seam) };
    });
  });
  const smallSpokes = [40, 140, 220, 320].map((turn) => turned(spoke(27), turn * Math.PI / 180));
  const marks = [...tips, ...tabs.map((tab) => tab.body), ...arms, ...smallSpokes];
  const openings = [...slots, ...innerFacets, ...tabs.map((tab) => tab.seam)];
  const field = carveWhere([...disc(centre, 9), ...outerDiamond, ...innerDiamond, ...marks.flat(), ...openings.flat()], (point) => {
    const rim = inside(outerDiamond, point) && !inside(innerDiamond, point);
    return (Math.hypot(...point) < 9 || rim || marks.some((mark) => inside(mark, point))) && !openings.some((cut) => inside(cut, point));
  });
  c.precision(3);
  c.guideSpokes(4, 0, R);
  c.fill("dharma-wheel", toPath(field, { k: 1 }), "evenodd");
};
