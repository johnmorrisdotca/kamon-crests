// The shallow, rounded mountain paths in frame 29 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { circleThrough, reversedRun, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const pathLevels: V[] = [[-81, 0], [-64, 3], [-39, 0], [-20, 5], [20, 5], [39, 0], [64, 3], [81, 0]];
const radii = [30, 58, 35, 92, 35, 58, 30];

const path = (height: number): Region => {
  const points = pathLevels.map(([x, y]): V => [x, y + height]);

  return points.slice(0, -1).map((from, i) => {
    const to = points[i + 1];
    const side: V = [(from[0] + to[0]) / 2, height + (i % 2 === 0 ? radii[i] : -radii[i])];

    return shortArc(circleThrough(from, to, radii[i], side), from, to);
  });
};

const band = (high: number, low: number): Region => {
  const right: V = [81, high];
  const lowerRight: V = [81, low];
  const lowerLeft: V = [-81, low];
  const left: V = [-81, high];

  return [...path(high), seg(right, lowerRight), ...reversedRun(path(low)), seg(lowerLeft, left)];
};

export const maruNiYamamichiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-medium");
  c.fill("mountain-path", toPath([band(13, -12), band(-17, -24)], { k: 1 }));
};
