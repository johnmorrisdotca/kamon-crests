import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const scale = 0.59;
const onPiece = ([x, y]: V): V => [(x - 171) * scale, (156 - y) * scale];
const ruled = (points: V[]): Region => points.map((point, i) => seg(onPiece(point), onPiece(points[(i + 1) % points.length])));

const curved = (from: V, to: V, radius: number, hint: V) => {
  const a = onPiece(from);
  const b = onPiece(to);
  return shortArc(circleThrough(a, b, radius * scale, onPiece(hint)), a, b);
};

// The book's 龍 has a narrow, ruled left half and a broad hook at the lower right.
const dragon = (): Region[] => {
  const tail: Region = [
    seg(onPiece([170, 138]), onPiece([180, 141])),
    seg(onPiece([180, 141]), onPiece([177, 177])),
    curved([177, 177], [224, 168], 35, [199, 147]),
    seg(onPiece([224, 168]), onPiece([228, 153])),
    seg(onPiece([228, 153]), onPiece([237, 182])),
    curved([237, 182], [157, 185], 53, [197, 148]),
    seg(onPiece([157, 185]), onPiece([170, 138])),
  ];
  return [
    ruled([[123, 73], [139, 79], [132, 89], [125, 86]]),
    ruled([[107, 91], [146, 87], [151, 91], [145, 97], [110, 98]]),
    ruled([[113, 99], [122, 100], [126, 113], [120, 116]]),
    ruled([[136, 97], [145, 101], [134, 115], [128, 116]]),
    ruled([[81, 122], [138, 114], [161, 112], [166, 119], [96, 131]]),
    ruled([[108, 132], [117, 134], [115, 174], [108, 196], [103, 191]]),
    ruled([[113, 134], [150, 127], [155, 134], [118, 142]]),
    ruled([[143, 132], [155, 132], [154, 188], [148, 199], [139, 184]]),
    ruled([[113, 148], [146, 141], [146, 148], [113, 156]]),
    ruled([[110, 164], [145, 155], [146, 162], [110, 172]]),
    ruled([[168, 68], [185, 70], [188, 104], [176, 109], [172, 79], [164, 75]]),
    ruled([[179, 92], [212, 83], [221, 87], [216, 94], [183, 100]]),
    ruled([[174, 108], [211, 101], [218, 107], [174, 119], [169, 114]]),
    ruled([[210, 106], [218, 107], [220, 131], [211, 135], [209, 116]]),
    ruled([[177, 128], [214, 121], [215, 130], [174, 137]]),
    ruled([[176, 143], [222, 137], [226, 145], [173, 152]]),
    ruled([[173, 155], [214, 149], [216, 155], [171, 163]]),
    ruled([[187, 158], [199, 159], [196, 179], [186, 183]]),
    ruled([[211, 155], [219, 158], [219, 177], [210, 178]]),
    tail,
  ];
};

const king = (): Region[] => [
  ruled([[117, 210], [191, 205], [205, 211], [195, 220], [128, 225]]),
  ruled([[151, 212], [174, 213], [170, 263], [179, 274], [149, 278], [154, 241]]),
  ruled([[127, 239], [176, 232], [192, 235], [197, 243], [146, 254], [134, 248]]),
  ruled([[93, 271], [148, 269], [205, 261], [218, 267], [226, 277], [221, 287], [171, 280], [112, 289], [96, 282]]),
];

export const shogiKomaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const block = ruled([[161, 13], [272, 86], [313, 279], [272, 303], [42, 289], [62, 89]]);
  const side = ruled([[159, 14], [166, 17], [256, 100], [275, 301], [269, 300], [250, 104]]);
  c.fill("shogi-piece", toPath(carve([block], [side, ...dragon(), ...king()]), { k: 0.85 }), "evenodd");
};
