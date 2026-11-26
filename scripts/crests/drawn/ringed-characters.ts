import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversedRun, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const placing = { k: 1 };

function bow(from: V, to: V, radius: number, centre: V) {
  return shortArc(circleThrough(from, to, radius, centre), from, to);
}

function polygon(points: V[]): Region {
  return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
}

export function maruNiHonNoJiBuild(c: Builder): void {
  const brushHead: V = [-23, 67];
  const headTip: V = [17, 72];
  const footTip: V = [-2, -75];
  const down = [
    bow(brushHead, headTip, 62, [5, 7]),
    bow(headTip, [20, 43], 77, [91, 56]),
    bow([20, 43], [17, -55], 373, [383, -38]),
    bow([17, -55], footTip, 36, [-17, -48]),
    bow(footTip, [-9, -59], 38, [-37, -82]),
    bow([-9, -59], [-33, -48], 71, [-34, -119]),
    bow([-33, -48], [-11, -48], 60, [-20, 12]),
    bow([-11, -48], [-10, 53], 248, [238, 4]),
    bow([-10, 53], brushHead, 20, [-30, 51]),
  ];
  const crossbar = [
    seg([-65, 43], [-47, 35]),
    seg([-47, 35], [37, 42]),
    seg([37, 42], [53, 45]),
    bow([53, 45], [68, 23], 28, [46, 25]),
    bow([68, 23], [57, 14], 15, [54, 27]),
    bow([57, 14], [-58, 11], 350, [-1, -330]),
    bow([-58, 11], [-65, 43], 28, [-39, 33]),
  ];
  const left = [
    seg([-9, 25], [4, 15]),
    bow([4, 15], [-49, -29], 135, [-76, 60]),
    bow([-49, -29], [-71, -30], 72, [-58, 42]),
    bow([-71, -30], [-9, 25], 148, [-132, 119]),
  ];
  const right = [
    seg([17, 25], [26, 17]),
    bow([26, 17], [70, -24], 85, [96, 47]),
    bow([70, -24], [43, -38], 59, [32, 18]),
    bow([43, -38], [17, 25], 67, [73, 12]),
  ];
  const lowBar = polygon([[-25, -24], [16, -21], [31, -37], [19, -46], [-11, -44], [-9, -31], [-24, -28]]);
  c.ring("ring-medium");
  c.fill("hon-no-ji", toPath(carve([down, crossbar, left, right, lowBar], []), placing));
}

export function hosowaNiYamaNoJiBuild(c: Builder): void {
  const centreTip: V = [0, 66];
  const shoulder: V = [-30, 57];
  const lowerNeck: V = [-14, 11];
  const crownNotch: V = [-36, 3];
  const peak: V = [-82, 15];
  const half: Region = [
    seg(centreTip, shoulder),
    bow(shoulder, lowerNeck, 114, [-122, 6]),
    bow(lowerNeck, crownNotch, 39, [-17, -27]),
    bow(crownNotch, peak, 27, [-61, -7]),
    bow(peak, [-52, -62], 111, [24, 14]),
    bow([-52, -62], [0, -74], 83, [-7, 10]),
  ];
  const full = [...half, ...reversedRun(half.map(mirrored))];
  const centre = [bow([-29, -24], [29, -24], 73, [0, -91]), bow([29, -24], [-29, -24], 30, [0, -16])];
  c.ring("ring-thin");
  c.fill("yama-no-ji", toPath(carve([full], [centre]), placing), "evenodd");
}

export function atamaawaseKorinMitsuYamaNoJiBuild(c: Builder): void {
  const openHalf = [
    bow([0, 93.6], [31.8, 68], 42, [34, 106]),
    bow([31.8, 68], [61.4, 52], 39, [29, 34]),
    bow([61.4, 52], [41.5, 34], 26, [37, 59]),
    bow([41.5, 34], [19.4, 19], 87, [5, 99]),
    bow([19.4, 19], [0, 5.6], 19.5, [2, 24]),
  ];
  const opening = [...openHalf, ...reversedRun(openHalf.map(mirrored))];
  const heads = [180, 300, 60].map((turn) => opening.map((edge) => rotated(edge, turn * DEG)));
  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("yama-no-ji", toPath(carve([disc([0, 0], R)], heads), placing), "evenodd");
}
