import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

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
