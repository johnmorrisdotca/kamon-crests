import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, onCircle, pieceStart, seg, shortArc, thickSeg, vdist } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { cordBand } from "../library/cord-band.ts";
import { fanRib } from "../library/fan-rib.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "fan";
const scale = .55;
const at = ([x, y]: V): V => [(x - 158) * scale, (153 - y) * scale];
const cornered = (points: V[]): Region =>
  points.map((point, i) => seg(at(point), at(points[(i + 1) % points.length])));
const pivot: V = [132, 275];

function rib(c: Builder, a: V, b: V, root: number, tip: number, rounded = false, keyline = 0): void {
  const start = at(a);
  const end = at(b);
  const turn = Math.atan2(end[0] - start[0], end[1] - start[1]) / DEG;
  fanRib.build(c, start, turn, vdist(start, end), {
    motif, keyline, rootWidth: root * scale, tipWidth: tip * scale, cap: rounded ? "round" : "square",
  });
}

function bones(c: Builder, from: V, to: V, count: number): void {
  for (let index = 1; index <= count; index += 1) {
    const fraction = index / (count + 1);
    const tip: V = [from[0] + (to[0] - from[0]) * fraction, from[1] + (to[1] - from[1]) * fraction];
    rib(c, pivot, tip, 3.6, 4.9);
  }
}

/** One strip goes under the guard, turns behind it and comes out to its curl. */
function lacedCord(c: Builder, start: V, crossing: V, end: V, hint: V, side: number, keyline = 0): void {
  const from = at(start);
  const hidden = at(crossing);
  const tip = at(end);
  const radius = vdist(from, hidden) * .58;
  const arc = shortArc(circleThrough(from, hidden, radius, at(hint)), from, hidden) as Extract<Piece, { t: "A" }>;
  const sweep = arc.a1 - arc.a0;
  const entry = arc.a0 + Math.sign(sweep) * Math.PI / 2;
  const arriving = entry + sweep;

  // The small return is where the paper guard hides both runs of the cord.
  const returnRadius = 3.1;
  const returnCentre = onCircle(hidden, returnRadius, arriving + side * Math.PI / 2);
  const away = onCircle(returnCentre, returnRadius, arriving + side * Math.PI / 2);
  const departing = arriving + side * Math.PI;
  const dx = tip[0] - away[0];
  const dy = tip[1] - away[1];
  const along = dx * Math.cos(departing) + dy * Math.sin(departing);
  const across = -dx * Math.sin(departing) + dy * Math.cos(departing);
  const finalSweep = 2 * Math.atan2(across, along);
  const finalRadius = (dx ** 2 + dy ** 2) / (2 * Math.abs(across));
  const lead = [
    { length: Math.abs(sweep) * radius, bend: -sweep / DEG },
    { length: Math.PI * returnRadius, bend: -side * 180 },
  ];
  const tail = { length: Math.abs(finalSweep) * finalRadius, bend: -finalSweep / DEG };
  const width = 3.35;
  const leadLength = lead[0].length + lead[1].length;
  if (keyline > 0) {
    // Keep the tangent join under the guard and layer the returning run over the crossing.
    cordBand.build(c, pieceStart(arc), 90 - entry / DEG, leadLength, { motif, width, runs: lead });
    cordBand.build(c, away, 90 - departing / DEG, tail.length, { motif, width, runs: [tail], keyline });
  } else {
    cordBand.build(c, pieceStart(arc), 90 - entry / DEG, leadLength + tail.length, { motif, width, runs: [...lead, tail] });
  }
  fillPart(c, motif, [disc(tip, width / 2)], { k: 1 });
}

/** Fan butterfly, with the wings opened around one hinge. */
export const ogiChoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    const scrollRoot = at([106, 105]);
    const scrollCentre = at([64, 53]);
    const outerRadius = 13.3;
    const tangent = Math.atan2(scrollRoot[1] - scrollCentre[1], scrollRoot[0] - scrollCentre[0]) +
      Math.acos(outerRadius / vdist(scrollRoot, scrollCentre));
    const joint = onCircle(scrollCentre, outerRadius, tangent);
    const lead = vdist(scrollRoot, joint);
    const outer = outerRadius * 299 * DEG;
    const inner = 6.6 * 242 * DEG;
    const heading = Math.atan2(joint[0] - scrollRoot[0], joint[1] - scrollRoot[1]) / DEG;
    cordBand.build(c, scrollRoot, heading, lead + outer + inner, {
      motif, width: 3.1, runs: [{ length: lead }, { length: outer, bend: -299 }, { length: inner, bend: -242 }],
    });
    const lowerCurl = 7.2 * 264 * DEG;
    const lowerTip = 3.4 * 203 * DEG;
    cordBand.build(c, onCircle(at([19, 164]), 7.2, 46 * DEG), -46, lowerCurl + lowerTip, {
      motif, width: 2.65, runs: [{ length: lowerCurl, bend: -264 }, { length: lowerTip, bend: -203 }],
    });
    lacedCord(c, [54, 182], [101, 238], [20, 238], [103, 198], 1, PAPER);
    lacedCord(c, [77, 212], [119, 261], [47, 267], [125, 229], 1, PAPER);
    lacedCord(c, [257, 194], [177, 248], [293, 249], [188, 199], -1);
    lacedCord(c, [219, 219], [151, 263], [259, 278], [159, 224], -1);

    const tab = cornered([[199, 53], [221, 12], [265, 33], [238, 60]]);
    const lines = [
      thickSeg(at([207, 56]), at([230, 15]), PAPER),
      thickSeg(at([220, 58]), at([245, 23]), PAPER),
    ];
    fillPart(c, motif, carve([tab], lines), { k: 1 });
    const left = cornered([[5, 120], [41, 122], [56, 92], [84, 101], [106, 81], [122, 159], [65, 176]]);
    fillPart(c, motif, [left], { k: 1 });
    bones(c, [58, 178], [119, 154], 5);
    const middle = cornered([[92, 5], [140, 25], [180, 15], [198, 53], [235, 51], [250, 77], [273, 70], [190, 163], [119, 117]]);
    fillPart(c, motif, [middle], { k: 1 }, PAPER);
    bones(c, [120, 113], [191, 164], 6);
    const right = cornered([[211, 128], [271, 60], [282, 94], [305, 102], [298, 132], [316, 151], [241, 192]]);
    fillPart(c, motif, [right], { k: 1 }, PAPER);
    bones(c, [210, 127], [241, 190], 5);

    for (const tip of [[117, 301], [127, 307], [139, 308], [151, 304], [162, 296], [171, 286]] as V[]) {
      rib(c, tip, pivot, 7.8, 3.3, true);
    }
    rib(c, pivot, [7, 123], 5.3, 8.4, false, PAPER);
    rib(c, [105, 294], [314, 155], 10.7, 9.6, true, PAPER);
  }));
};
