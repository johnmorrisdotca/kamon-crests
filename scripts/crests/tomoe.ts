// The tomoe 巴: a comma whose round head leads and whose tail follows round the edge of the circle it is laid in.
import { C0, Path, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { defineCrest, fam } from "./util.ts";

/**
 * One tomoe: its head is a circle of radius `a` tangent inside the layout circle (radius `ro`) at clock angle `phi`,
 * and its tail runs back along that circle through `sweep` degrees to a point. `h` is +1 when the head leads
 * clockwise (the tail is counter-clockwise of it) and -1 when it leads the other way.
 */
export const tomoe = (ro: number, a: number, phi: number, sweep: number, h: 1 | -1, taper = 1): Path => {
  const head: Pt = polar(ro - a, phi);
  // The tail leaves the round head from two points on its trailing side, each tangent to the head's circle.
  const pOut: Pt = polar(a, phi - h * 40, head);
  const pIn: Pt = polar(a, phi - h * 150, head);
  const tip: Pt = polar(ro * 0.93, phi - h * sweep);
  const flag = h > 0 ? 1 : 0;
  const path = new Path().M(tip);
  // The outer edge comes in along the line of the circle and meets the head going the way the head leads.
  const c1: Pt = polar(ro * 0.96, phi - h * sweep * 0.6);
  const c2: Pt = polar(a * 0.85, phi + h * 58 + 180, pOut);
  path.C(c1, c2, pOut);
  // Round the head the long way, from the outer joint to the inner one.
  path.A(a, 0, flag, polar(a, phi + h * 110, head)).A(a, 0, flag, polar(a, phi + h * 220, head)).A(a, 0, flag, pIn);
  // The inner edge leaves the head along its tangent and thins to the tip.
  const d1: Pt = polar(a * 1.5, phi - h * 60, pIn);
  const d2: Pt = polar(ro * (0.60 + 0.1 * taper), phi - h * sweep * 0.7);
  path.C(d1, d2, tip);
  path.Z();

  return path;
};

const spokes = (n: number, ro: number, a: number, sweep: number, h: 1 | -1, base = 0): Path[] => Array.from({ length: n }, (_, i) => tomoe(ro, a, base + (360 * i) / n, sweep, h));

export const hidariMitsuTomoe = defineCrest({
  id: "hidari-mitsu-tomoe",
  name: { en: "Left three-comma tomoe", ja: "左三つ巴" },
  reading: "ひだりみつどもえ",
  romaji: "hidari mitsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial", turn: "left" }],
  families: [fam("Hachiman shrines", "八幡社", "はちまんしゃ")],
  aliases: ["mitsudomoe", "three tomoe"],
  construction: {
    en: "Three heads of one size set a third of a turn apart, tangent inside the circle; each tail follows the circle round to a point.",
    ja: "同じ大きさの頭を円の内側に接して三つ、120度ずつ離して置き、それぞれの尾を円に沿って尖らせます。",
  },
  build(c) {
    const ro = 92;
    const a = 30;
    c.guideCircle(C0, ro);
    c.guideCircle(C0, ro - 2 * a);
    c.guideSpokes(3, 0, ro);
    for (const p of spokes(3, ro, a, 98, 1)) c.fill("tomoe", p);
  },
});

export const migiMitsuTomoe = defineCrest({
  id: "migi-mitsu-tomoe",
  name: { en: "Right three-comma tomoe", ja: "右三つ巴" },
  reading: "みぎみつどもえ",
  romaji: "migi mitsudomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial", turn: "right" }],
  families: [],
  aliases: ["mitsudomoe", "three tomoe"],
  construction: {
    en: "The left three-comma tomoe turned the other way: the heads lead counter-clockwise and the tails flow clockwise behind them.",
    ja: "左三つ巴の向きを逆にしたもので、頭が反時計回りに進み、尾がそのあとを時計回りに流れます。",
  },
  build(c) {
    const ro = 92;
    const a = 30;
    c.guideCircle(C0, ro);
    c.guideCircle(C0, ro - 2 * a);
    c.guideSpokes(3, 0, ro);
    for (const p of spokes(3, ro, a, 98, -1)) c.fill("tomoe", p);
  },
});

export const maruNiHidariMitsuTomoe = defineCrest({
  id: "maru-ni-hidari-mitsu-tomoe",
  name: { en: "Left three-comma tomoe in a circle", ja: "丸に左三つ巴" },
  reading: "まるにひだりみつどもえ",
  romaji: "maru ni hidari mitsudomoe",
  frame: "ring-medium",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial", turn: "left" }],
  families: [fam("Hachiman shrines", "八幡社", "はちまんしゃ")],
  aliases: ["mitsudomoe in ring"],
  construction: {
    en: "The three-comma tomoe laid in a ring a tenth of the diameter thick, its commas just clear of the ring.",
    ja: "直径の10分の1の太さの輪の中に、巴が輪に触れないよう少し離して三つ巴を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    const ro = inner - 5;
    const a = ro * 0.33;
    c.guideCircle(C0, ro);
    c.guideSpokes(3, 0, ro);
    for (const p of spokes(3, ro, a, 98, 1)) c.fill("tomoe", p);
  },
});
