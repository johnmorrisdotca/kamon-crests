import { WEIGHT } from "../construct/builder.ts";
import { C0, CX, CY, Path, R, circle, polar, poly, type Pt } from "../construct/geo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const genjiWa = defineCrest({
  id: "genji-wa",
  name: { en: "Genji ring", ja: "源氏輪" },
  reading: "げんじわ",
  romaji: "genji wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  source: cell(15, "right page, row 3, third column from the right: 源氏輪", "右頁、三段目、右から三列目「源氏輪」"),
  measured: "A broad circular band encloses an open centre a little under three fifths of the diameter. Eight short radial seams meet the inside tiles, and the eight intervening panels follow the rim around those tiles.",
  construction: {
    en: "Strike the outer and inner circles. Divide the ring into eight repeats, each with an outer panel and an inset tile separated by narrow white seams.",
    ja: "外円と内円を打った輪に、外側の区画と内側の小区画を一組ずつ八組配し、区画の間を細く白く抜きます。",
  },
  build(c) {
    const middle = 57;
    const shoulder = 74.5;
    const outerShoulder = shoulder + WEIGHT.thread;
    const point = (radius: number, angle: number) => polar(radius, angle);
    c.guideCircle(C0, R);
    c.guideCircle(C0, middle);
    for (let a = 0; a < 360; a += 45) {
      const tile = new Path()
        .M(point(middle, a - 15))
        .L(point(shoulder, a - 14))
        .A(shoulder, 0, 1, point(shoulder, a + 14))
        .L(point(middle, a + 15))
        .A(middle, 0, 0, point(middle, a - 15))
        .Z();
      const panel = new Path()
        .M(point(R, a + 0.7))
        .A(R, 0, 1, point(R, a + 44.3))
        .L(point(outerShoulder, a + 44.3))
        .A(outerShoulder, 0, 0, point(outerShoulder, a + 29.3))
        .L(point(middle, a + 27.5))
        .A(middle, 0, 0, point(middle, a + 17.5))
        .L(point(outerShoulder, a + 15.7))
        .A(outerShoulder, 0, 0, point(outerShoulder, a + 0.7))
        .Z();
      c.fill("plain-ring", tile);
      c.fill("plain-ring", panel);
    }
  },
});

export const kageWa = defineCrest({
  id: "kage-wa",
  name: { en: "Outline ring", ja: "陰輪" },
  reading: "かげわ",
  romaji: "kage wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 4, arrangement: "stacked" }],
  families: [],
  source: cell(15, "right page, row 3, fourth column from the right: 陰輪", "右頁、三段目、右から四列目「陰輪」"),
  measured: "Four narrow black outlines appear in the band. The outer circle reaches the layout circle and the inner is about four fifths as wide, with the four circles at even intervals.",
  construction: {
    en: "Draw four concentric thread rings at equal radial intervals.",
    ja: "同じ中心から、間隔をそろえて細い輪を四本打ちます。",
  },
  build(c) {
    for (let i = 0; i < 4; i += 1) {
      const radius = R - 5.5 * i;
      c.fill("plain-ring", circle(C0, radius).join(circle(C0, radius - WEIGHT.thread)), "evenodd");
    }
  },
});

const steppedOutline = (inset: number): Pt[] => {
  const point = R - Math.SQRT2 * inset;
  const square = R / Math.SQRT2 - inset;
  const notch = point - square;
  const quadrant: Pt[] = [[0, -point], [notch, -square], [square, -square], [square, -notch]];
  const points: Pt[] = [];
  for (let i = 0; i < 4; i += 1) {
    points.push(...quadrant.map(([x, y]): Pt => [CX + x, CY + y]));
    for (const corner of quadrant) {
      const [x, y] = corner;
      corner[0] = -y;
      corner[1] = x;
    }
  }
  return points;
};

export const gangiWa = defineCrest({
  id: "gangi-wa",
  name: { en: "Stepped ring", ja: "雁木輪" },
  reading: "がんぎわ",
  romaji: "gangi wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["がんぎ輪"],
  source: cell(15, "left page, row 2, third column from the right: がんぎ輪", "左頁、二段目、右から三列目「がんぎ輪」"),
  measured: "The outer outline alternates between upright and tilted square points, with matching steps in the inner outline. The straight edges of the inner outline are inset by 12 units.",
  construction: {
    en: "Lay an upright square across one set on a point. Follow their outer steps, then rule the same edges inside them to leave a band of even width.",
    ja: "角を立てた正方形と水平な正方形を重ねて外側の段を取り、各辺に平行な内縁を引いて帯の幅をそろえます。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.fill("plain-ring", poly(steppedOutline(0)).join(poly(steppedOutline(12))), "evenodd");
  },
});
