import { C0, R } from "../../construct/geo.ts";
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickSeg, toPath, DEG, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, centre: V) =>
  shortArc(circleThrough(from, to, radius, centre), from, to);

function leaf(from: V, to: V, radius: number): Region {
  const across: V = [to[1] - from[1], from[0] - to[0]];
  const middle: V = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];

  return [
    arc(from, to, radius, [middle[0] + across[0], middle[1] + across[1]]),
    arc(to, from, radius, [middle[0] - across[0], middle[1] - across[1]]),
  ];
}

export function itowaRokumaiZasaBuild(c: Builder): void {
  c.precision(2);
  const room = c.ring("ring-thread");
  const scale = (room - 1.8) / 97;
  const half: Region = [
    arc([0, 1.5], [34.5, 64.5], 67, [-29, 58]),
    arc([34.5, 64.5], [0, 97], 35, [0, 62]),
  ];
  const broad: Region = [...half, ...reversedRun(half.map(mirrored))];
  const blade = carve([broad], [thickSeg([0, 1], [0, 97.5], 2.05)]);
  const flank = carve([leaf([20, 69], [97, 0], 102)], [broad]);

  c.guideSpokes(4, 0, room - 1.8);
  for (const turn of [0, 180]) {
    for (const mirror of [false, true]) {
      c.fill("bamboo-grass", toPath(flank, { k: scale, turn, mirror }), "evenodd");
    }
    c.fill("bamboo-grass", toPath(blade, { k: scale, turn }), "evenodd");
  }
}

const ribbed = (from: V, to: V, radius: number, rib: number) =>
  carve([leaf(from, to, radius)], [thickSeg(from, to, rib)]);

export function sasaGurumaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(10, 0, R);
  const hub = 17.1;
  c.guideCircle(C0, hub);
  const blade = ribbed([0, 16.9], [0, 93], 57, 2.2);
  const branch = carve([
    thickSeg([0, 17], [0, 93], 4.3),
    thickSeg([0, 68], [-13.6, 82], 4.3),
    thickSeg([0, 68], [13.6, 82], 4.3),
  ], []);
  for (const turn of [0, 72, 144, 216, 288]) {
    c.fill("bamboo-grass", toPath(branch, { k: 1, turn }), "evenodd");
    c.fill("bamboo-grass", toPath(blade, { k: 1, turn: turn + 36 }), "evenodd");
  }
  c.fill("bamboo-grass", toPath([disc([0, 0], hub)], { k: 1 }));
}

const loop = (vertices: V[]): Region => vertices.map((from, i) => seg(from, vertices[(i + 1) % vertices.length]));

const point = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

export function rokkakuKumaiZasaBuild(c: Builder): void {
  c.precision(2);
  c.stepRound(R);
  c.guideSpokes(6, 0, R);
  const turns = [0, 60, 120, 180, 240, 300];
  const outer = loop(turns.map((turn) => point(turn, R)));
  const inner = loop(turns.map((turn) => point(turn, 91)));
  c.guidePath(toPath([outer, inner], { k: 1 }));
  c.fill("frame", toPath([outer, inner], { k: 1 }), "evenodd");

  const blade = ribbed([0, 2.5], [0, 88.5], 84, 2.1);
  const start: V = [4.5, 88.8];
  const end: V = [74.8, 45.7];
  const scallop: Region = [
    arc(start, end, 102, [97, 140]),
    arc(end, start, 204, [150, 221]),
  ];
  for (const turn of turns) {
    c.fill("bamboo-grass", toPath([scallop], { k: 1, turn }));
  }
  for (const turn of [0, 120, 240]) {
    c.fill("bamboo-grass", toPath(blade, { k: 1, turn }), "evenodd");
  }
}

export function sasaBishiBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  const diamond = loop([[0, 79], [94, 0], [0, -79], [-94, 0]]);
  const inside = loop([[0, 73], [87, 0], [0, -73], [-87, 0]]);
  c.guidePath(toPath([diamond, inside], { k: 1 }));
  c.fill("bamboo-grass", toPath([diamond, inside], { k: 1 }), "evenodd");

  const broad = ribbed([0, 1], [0, 77], 60, 2.2);
  const inner = leaf([14.8, 55], [44.2, 4.4], 62);
  const rim: Region = [
    seg([37.5, 49.8], [92, 0]),
    arc([92, 0], [37.5, 49.8], 104, [113, 100]),
  ];
  for (const turn of [0, 180]) {
    c.fill("bamboo-grass", toPath(broad, { k: 1, turn }), "evenodd");
    for (const mirror of [false, true]) {
      c.fill("bamboo-grass", toPath([inner, rim], { k: 1, turn, mirror }));
    }
  }
}
