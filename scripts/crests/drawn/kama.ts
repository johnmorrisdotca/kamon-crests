import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, carveWhere, circleThrough, disc, inside, mirrored, onCircle, rotated, seg, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const handle = (a: V, b: V, half: number): Region => {
  const turn = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const side = turn + Math.PI / 2;
  const aLeft = onCircle(a, half, side);
  const aRight = onCircle(a, half, side - Math.PI);
  const bLeft = onCircle(b, half, side);
  const bRight = onCircle(b, half, side - Math.PI);

  return [
    seg(aLeft, bLeft), arcA(b, half, side, side - Math.PI),
    seg(bRight, aRight), arcA(a, half, side - Math.PI, side - 2 * Math.PI),
  ];
};

interface Blade {
  tip: V;
  shoulder: V;
  heel: V;
  inner: V;
  outerWidth: number;
  innerWidth: number;
  below: V;
}

const blade = ({ tip, shoulder, heel, inner, outerWidth, innerWidth, below }: Blade): Region[] => {
  const upper = circleThrough(tip, shoulder, outerWidth, below);
  const heelCircle = circleThrough(shoulder, heel, 33, below);
  const innerCircle = circleThrough(inner, tip, innerWidth, below);
  const edge = shortArc(innerCircle, inner, tip) as Extract<Piece, { t: "A" }>;
  const first = edge.a0 + (edge.a1 - edge.a0) * 0.09;
  const last = edge.a1 - (edge.a1 - edge.a0) * 0.14;
  const body = [shortArc(upper, tip, shoulder), shortArc(heelCircle, shoulder, heel), seg(heel, inner), edge];
  const channel = thickArc(innerCircle.c, innerCircle.r + 4.1, 1.85, first, last);

  return carve([body], [channel]);
};

const turnHalf = (shape: Region): Region => shape.map((piece) => rotated(piece, Math.PI));

export const futatsuKamaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const start: V = [19, 50];
  const end: V = [70, -23];
  const iron = blade({ tip: [-94, -14], shoulder: [-11, 60], heel: [25, 56], inner: [15, 40], outerWidth: 94, innerWidth: 129, below: [-7, -52] });
  const guard = turnHalf(handle(start, end, 12));
  const pairedBlade = iron.map((shape) => carve([shape], [guard])).flat();
  const wood = carve([handle(start, end, 9.4)], [disc(end, 3.2)]);
  for (const turn of [0, 180]) {
    c.group(() => {
      c.fill("sickle", toPath(pairedBlade, { k: 1, turn }), "evenodd");
      c.fill("sickle", toPath(wood, { k: 1, turn }), "evenodd");
    });
  }
};

export const chigaiKamaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const start: V = [-14, 49];
  const end: V = [49, -57];
  const iron = blade({ tip: [-95, -24], shoulder: [-34, 61], heel: [-10, 55], inner: [-21, 37], outerWidth: 77, innerWidth: 108, below: [8, -45] });
  const wood = handle(start, end, 11.4);
  const eye = disc(end, 3.5);
  const gap = handle(start, end, 13.7).map(mirrored);
  c.group(() => {
    c.fill("sickle", toPath(iron, { k: 1 }), "evenodd");
    c.fill("sickle", toPath(carve([wood], [eye, gap]), { k: 1 }), "evenodd");
  });
  c.group(() => {
    c.fill("sickle", toPath(iron, { k: 1, mirror: true }), "evenodd");
    c.fill("sickle", toPath(carve([wood], [eye]), { k: 1, mirror: true }), "evenodd");
  });
};

export const mutsuKamaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  const rim = disc([0, 0], R);
  const iron = blade({ tip: [-86, 17], shoulder: [-22, 90], heel: [7, 91], inner: [-3, 72], outerWidth: 89, innerWidth: 111, below: [-15, -3] });
  const sweep = carveWhere([rim, ...iron].flat(), (p) =>
    inside(rim, p) && iron.reduce((odd, edge) => odd !== inside(edge, p), false),
  );
  const wood = [handle([-2, 76], [0, 15], 3.4)];
  for (let i = 0; i < 6; i += 1) {
    c.group(() => {
      c.fill("sickle", toPath(sweep, { k: 1, turn: i * 60 }), "evenodd");
      c.fill("sickle", toPath(wood, { k: 1, turn: i * 60 }), "evenodd");
    });
  }
  c.fill("sickle", toPath([disc([0, 0], 11)], { k: 1 }));
};

export const manjigamaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const lean = -12;
  const halfHandle = 13;
  const socket: V = [0, 98];
  const rim: V = [0, 0];
  const tip = onCircle(rim, R, Math.PI - 0.085);
  const shoulder = onCircle(rim, R, Math.PI / 2 - 0.085);
  const socketEnd = (x: number, width: number): V => [x, socket[1] - Math.sqrt(width * width - x * x)];
  const socketArc = (width: number, from: V, to: V): Piece => shortArc({ c: socket, r: width }, from, to);
  const socketLeft = (width: number): V => socketEnd(-halfHandle, width);
  const socketRight = (width: number): V => socketEnd(halfHandle, width);

  const bladeRoot = 37;
  const bladeLeft = socketLeft(bladeRoot);
  const bladeRight = socketRight(bladeRoot);
  const bladeEdge = circleThrough(bladeLeft, tip, 129, [-25, -74]);
  const cutting = shortArc(bladeEdge, bladeLeft, tip) as Extract<Piece, { t: "A" }>;
  const blade: Region = [
    shortArc({ c: rim, r: R }, tip, shoulder),
    shortArc(circleThrough(shoulder, bladeRight, 76, [-65, 69]), shoulder, bladeRight),
    socketArc(bladeRoot, bladeRight, bladeLeft),
    cutting,
  ];
  const span = cutting.a1 - cutting.a0;
  const channel = thickArc(bladeEdge.c, bladeEdge.r + 4.8, 1.35, cutting.a0 + 0.10 * span, cutting.a1 - 0.10 * span);
  const ink = carve([blade], [channel]);

  const collarUpper = 38.9;
  const collarLower = 40.5;
  const collar: Region = [
    socketArc(collarUpper, socketLeft(collarUpper), socketRight(collarUpper)),
    seg(socketRight(collarUpper), socketRight(collarLower)),
    socketArc(collarLower, socketRight(collarLower), socketLeft(collarLower)),
    seg(socketLeft(collarLower), socketLeft(collarUpper)),
  ];
  const shaft = 42.4;
  const insideCorner: V = [halfHandle, halfHandle];
  const nextShaft: V = [socketLeft(shaft)[1], halfHandle];
  const shaftQuarter: Region = [
    socketArc(shaft, socketLeft(shaft), socketRight(shaft)),
    seg(socketRight(shaft), insideCorner),
    seg(insideCorner, nextShaft),
  ];
  const cross = [0, 1, 2, 3].flatMap((i) => shaftQuarter.map((piece) => rotated(piece, -i * Math.PI / 2)));
  for (const turn of [0, 90, 180, 270]) {
    c.group(() => {
      c.fill("sickle", toPath(ink, { k: 1, turn: turn + lean }), "evenodd");
      c.fill("sickle", toPath([collar], { k: 1, turn: turn + lean }));
    });
  }
  c.fill("sickle", toPath([cross], { k: 1, turn: lean }));
};
