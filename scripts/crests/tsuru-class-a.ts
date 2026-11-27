import { WEIGHT } from "../construct/builder.ts";
import { carve, circleThrough, disc, seg, shortArc, thickSeg, toPath, type Region, type V } from "../construct/compass.ts";
import { C0, R } from "../construct/geo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

const bend = (from: V, to: V, radius: number, towards: V) => shortArc(circleThrough(from, to, radius, towards), from, to);

export const oriZuru = defineCrest({
  id: "ori-zuru",
  name: { en: "Folded paper crane", ja: "折り鶴" },
  reading: "おりづる",
  romaji: "ori zuru",
  frame: "none",
  motifs: [{ motif: "crane", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["折つる", "折鶴"],
  source: cell(22, "right page, row 2, first column from the right: 折つる", "右頁、二段目、右から一列目「折つる」"),
  measured: "The pointed tail rises at the right, the beak points left and each low wing has angular folded panels. The neck is nearly upright and the creases recede into the wings in diagonal lines.",
  construction: {
    en: "Rule the angular paper outline, with its neck upright and one tail point high on the right. White ruled seams describe the folded wings, beak and neck.",
    ja: "首を立て、右に高い尾を置いた折り紙の輪郭を直線で引きます。翼やくちばし、首の折り目を白い直線で表します。",
  },
  build(c) {
    const paper: V[] = [
      [38, 78], [71, -63], [49, -54], [24, -67], [7, -57],
      [-12, -66], [-47, -49], [-70, -56], [-34, -13], [-9, -30],
      [-3, 14], [-40, 10], [-4, 40], [20, 16], [22, -12],
    ];
    const folds: [V, V][] = [
      [[38, 78], [39, -4]], [[22, -12], [39, -4]], [[39, -4], [54.9, -16]],
      [[20, 16], [24, -67]], [[8, 17], [7, -57]],
      [[-43, 9], [8, 32]], [[-74, -56], [-22, -22]], [[-9, -30], [-50, -49]],
      [[-29, -38], [-10, -53]], [[23, -38], [49, -54]],
      [[31, -29], [74, -65]], [[24, -38], [55, -18]],
    ];
    c.guideCircle(C0, R);
    const seams = folds.map(([from, to]) => thickSeg(from, to, WEIGHT.hair));
    const outline = paper.map((point, i) => seg(point, paper[(i + 1) % paper.length]));
    c.fill("crane", toPath(carve([outline], seams), { k: 1 }));
  },
});

export const choNoJiTsuru = defineCrest({
  id: "cho-no-ji-tsuru",
  name: { en: "Crane in the character 長", ja: "長の字鶴" },
  reading: "ちょうのじつる",
  romaji: "chō no ji tsuru",
  frame: "none",
  motifs: [{ motif: "crane", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["長の字つる", "ちょうのじづる"],
  source: cell(22, "right page, row 2, second column from the right: 長の字つる", "右頁、二段目、右から二列目「長の字つる」"),
  measured: "The bird follows a spreading cursive 長. A small eye and a long split beak give the character's lower right stroke a crane head. A compact upper loop and a broad triangular opening remain between the strokes.",
  construction: {
    en: "Draw the connected curves of 長, leaving an upper loop and a triangular opening. Extend the last stroke into the crane's head and beak, with a white eye and mouth line.",
    ja: "長の字の曲線をつなぎ、上の輪と三角の開口を白く残します。右下の筆を鶴の頭とくちばしに伸ばし、目と口を白く抜きます。",
  },
  build(c) {
    const outline: Region = [
      seg([8, 80], [29, 68]), bend([29, 68], [32, 50], 13, [22, 58]),
      bend([32, 50], [22, 41], 18, [12, 63]),
      bend([22, 41], [80, 0], 110, [82, 95]),
      bend([80, 0], [62, -16], 14, [64, -2]),
      bend([62, -16], [-19, -5], 128, [22, -117]),
      bend([-19, -5], [25, -30], 42, [22, 9]),
      bend([25, -30], [42, -27], 28, [27, -3]),
      bend([42, -27], [53, -47], 16, [40, -42]),
      seg([53, -47], [60, -74]), seg([60, -74], [55, -76]), seg([55, -76], [49, -56]),
      bend([49, -56], [-31, -13], 74, [52, 18]),
      bend([-31, -13], [-79, -54], 75, [-6, -100]),
      bend([-79, -54], [-47, 13], 91, [16, -65]),
      seg([-47, 13], [-42, 15]), bend([-42, 15], [-12, 57], 35, [-11, 21]),
      bend([-12, 57], [5, 56], 32, [-8, 31]), bend([5, 56], [8, 80], 42, [-33, 76]),
    ];
    const upperLoop: Region = [
      bend([-35, 27], [-1, 51], 32, [-12, 25]),
      bend([-1, 51], [-35, 27], 100, [-61, 95]),
    ];
    const window: Region = [
      seg([-21, 3], [17, 34]), bend([17, 34], [62, 0], 91, [88, 84]),
      bend([62, 0], [-21, 3], 126, [19, -121]),
    ];
    const wing: Region = [
      bend([-63, -28], [-34, -3], 54, [-19, -43]),
      bend([-34, -3], [-63, -28], 100, [9, -99]),
    ];
    const mouth = thickSeg([51, -48], [59, -76], WEIGHT.hair);
    c.guideCircle(C0, R);
    c.fill("crane", toPath(carve([outline], [upperLoop, window, wing, disc([44, -37], 2.6), mouth]), { k: 1 }));
  },
});

export const mitsuUrokoZuru = defineCrest({
  id: "mitsu-uroko-zuru",
  name: { en: "Three-scale crane", ja: "三つ鱗鶴" },
  reading: "みつうろこづる",
  romaji: "mitsu uroko zuru",
  frame: "none",
  motifs: [{ motif: "crane", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["三ッうろこ鶴"],
  source: cell(22, "right page, row 4, first column from the right: 三ッうろこ鶴", "右頁、四段目、右から一列目「三ッうろこ鶴」"),
  measured: "Three upright triangles surround an inverted triangular opening. Each has the same curved neck, left-facing beak and short crease from its point.",
  construction: {
    en: "Set three pointed crane wings in a triangle. Each has one curved neck and a small head facing left below the wing's base, with a fine stroke inside the point.",
    ja: "角を立てた鶴の翼を三角に三つ配します。翼の下に曲がった首と左向きの頭を出し、翼の先に細い筋を入れます。",
  },
  build(c) {
    const outline: Region = [
      seg([0, 0], [41, -54]), seg([41, -54], [10, -54]),
      bend([10, -54], [4, -65], 12, [-2, -53]), bend([4, -65], [-9, -65], 13, [-3, -53]),
      bend([-9, -65], [-14, -62], 7, [-9, -58]), seg([-14, -62], [-22, -64]),
      seg([-22, -64], [-14, -58]), bend([-14, -58], [-5, -58], 9, [-10, -66]),
      bend([-5, -58], [-4, -54], 4, [-7, -56]), seg([-4, -54], [-41, -54]),
      seg([-41, -54], [0, 0]),
    ];
    const neck: Region = [
      bend([1, -5], [6, -51], 106, [-98, -37]),
      bend([6, -51], [1, -5], 76, [-68, -37]),
    ];
    const fold = thickSeg([-3, -10], [-8, -32], WEIGHT.hair);
    const bird = carve([outline], [neck, fold, disc([-10, -59.5], 1.1)]);
    const positions: V[] = [[0, 66], [-42, 11], [42, 11]];
    c.guideCircle(C0, R);
    for (const at of positions) c.fill("crane", toPath(bird, { k: 1, at }));
  },
});
