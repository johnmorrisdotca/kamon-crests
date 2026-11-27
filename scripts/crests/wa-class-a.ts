import { WEIGHT } from "../construct/builder.ts";
import { DEG, onCircle, shortArc, toPath, vadd, vmul, vsub } from "../construct/compass.ts";
import type { Region, V } from "../construct/compass.ts";
import { C0, CX, CY, Path, R, circle, polar, poly, type Pt } from "../construct/geo.ts";
import { karakusaWaBuild } from "./drawn/karakusa-wa.ts";
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

export const oboroWa = defineCrest({
  id: "oboro-wa",
  name: { en: "Misty ring", ja: "朧輪" },
  reading: "おぼろわ",
  romaji: "oboro wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["おぼろ輪"],
  source: cell(15, "left page, third row, first column from the right: おぼろ輪", "左頁、三段目、右から一列目「おぼろ輪」"),
  measured: "The source's five gently rounded lobes reach about 145 pixels from the centre, while the shallow inward turns reach about 117. The band is about four pixels wide. Its outer curves are made regular and the inner boundary is concentric with each matching arc.",
  construction: {
    en: "Round five lobes with five circles. Join them with five inward arcs tangent to their neighbours. Set the matching curves a thread's width inside the outer edge to leave a band of even width.",
    ja: "五つの円で外の山を丸め、となりの円に接する内向きの弧でつなぎます。外縁と同じ中心を使い、糸輪ほどの幅で内縁を描きます。",
  },
  build(c) {
    c.precision(3);
    const origin: V = [0, 0];
    const lobeRun = 61;
    const lobeRadius = R - lobeRun;
    const valley = 77.5;
    const turns = [90, 18, -54, -126, -198];
    const radialProjection = lobeRun * Math.cos(36 * DEG);
    // A hollow arc's centre is one hollow radius beyond its valley. Its distance to each lobe centre is the sum of their radii.
    const hollowRadius = (lobeRadius ** 2 - valley ** 2 - lobeRun ** 2 + 2 * valley * radialProjection) / (2 * (valley - radialProjection - lobeRadius));
    const lobes = turns.map((angle) => onCircle(origin, lobeRun, angle * DEG));
    const hollows = turns.map((angle) => onCircle(origin, valley + hollowRadius, (angle - 36) * DEG));
    const boundary = (inset: number): Region => {
      const lobe = lobeRadius - inset;
      const hollow = hollowRadius + inset;
      const touch = (out: V, into: V): V => vadd(out, vmul(vsub(into, out), lobe / (lobe + hollow)));
      return lobes.flatMap((at, i) => {
        const next = lobes[(i + 1) % lobes.length];
        const here = hollows[i];
        const prior = hollows[(i + hollows.length - 1) % hollows.length];
        const join = touch(at, here);
        return [shortArc({ c: at, r: lobe }, touch(at, prior), join), shortArc({ c: here, r: hollow }, join, touch(next, here))];
      });
    };

    c.guideCircle(C0, R);
    c.fill("plain-ring", toPath([boundary(0), boundary(WEIGHT.thread)], { k: 1 }), "evenodd");
  },
});

export const karakusaWa = defineCrest({
  id: "karakusa-wa",
  name: { en: "Arabesque vine ring", ja: "唐草輪" },
  reading: "からくさわ",
  romaji: "karakusa wa",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 16, arrangement: "ring" }],
  families: [],
  aliases: ["から草輪"],
  source: cell(15, "left page, row 3, second column from the right: から草輪", "左頁、三段目、右から二列目「から草輪」"),
  measured: "One connected stem wavers round the opening with sixteen alternating returns. Eight curl out and eight curl in. The cell sets the width of the bold vine and the offset of the first upper scroll from the upright axis. The shapes are regularised at equal intervals.",
  construction: {
    en: "Join sixteen broad alternating arcs into a continuous vine. Place a scroll with a round tip at each turn, alternating outside and inside the vine.",
    ja: "内外に曲がる太い円弧を十六本つなぎ、一本の蔓を作ります。曲がり目ごとに先の丸い巻きを、蔓の外と内へ交互に付けます。",
  },
  build: karakusaWaBuild,
});
