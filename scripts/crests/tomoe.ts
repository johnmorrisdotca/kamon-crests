// The tomoe 巴: a comma whose round head leads and whose tail follows round the edge of the circle it is laid in.
import { C0, Path, bearing, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { RING_GAP } from "../construct/builder.ts";
import { defineCrest, fam } from "./util.ts";

/**
 * The three-comma tomoe as the compass lays it out, in the circle of radius `ro` about the centre. The three heads are equal
 * circles, each tangent inside the outer circle and a third of a turn from the next, so large that two neighbours stand `gap`
 * apart where they come closest. Each white line is the band between a head's circle and a second circle `gap` larger about
 * the same centre, on the head's leading side: the tail of the comma behind runs between that band and the outer circle, its
 * outer edge the outer circle itself and its inner edge the larger circle, until the two meet in a point; and it flows into its
 * own head where the larger circle of the head in front touches it. So the crest is a black disc cut by three thin white lines.
 * The heads lead clockwise; `mirror` turns the whole the other way.
 */
export const mitsudomoe = (ro: number, gap: number): { commas: Path[]; heads: [Pt, number][]; bands: number } => {
  // Two neighbouring heads, at distance (ro - a) from the centre and a third of a turn apart, stand 2a + gap apart.
  const a = (ro * Math.sqrt(3) - gap) / (2 + Math.sqrt(3));
  const d = ro - a;
  const big = a + gap;
  const at = (phi: number): Pt => polar(d, phi);
  // Where the larger circle of the head at clock angle 0 meets the outer circle, on its leading side.
  const beta = (Math.acos((ro * ro + d * d - big * big) / (2 * ro * d)) * 180) / Math.PI;
  const comma = (phi: number): Path => {
    const head = at(phi);
    const behind = at(phi - 120);
    const touch = polar(ro, phi);
    const tip = polar(ro, phi - 120 + beta);
    // Where the larger circle of the head behind touches this head: on the line between their centres.
    const join = polar(big, bearing(behind, head), behind);
    const sweepBand = (((bearing(behind, join) - bearing(behind, tip)) % 360) + 360) % 360;
    return new Path()
      .M(touch)
      .A(ro, 0, 0, tip)
      .A(big, sweepBand > 180 ? 1 : 0, 1, join)
      .A(a, 1, 0, touch)
      .Z();
  };

  return { commas: [0, 120, 240].map(comma), heads: [0, 120, 240].map((phi) => [at(phi), a]), bands: big };
};

/** Lays out the tomoe's construction: the outer circle, the three spokes, each head's circle and its larger circle, then the commas one by one. */
const tomoeBuild = (c: Parameters<(typeof hidariMitsuTomoe)["build"]>[0], ro: number, mirror: boolean): void => {
  const gap = 4.8;
  const { commas, heads, bands } = mitsudomoe(ro, gap);
  const turn = (p: Path): Path => (mirror ? p.mirror() : p);
  c.guideCircle(C0, ro);
  c.guideSpokes(3, 0, ro);
  for (const [centre, radius] of heads) {
    const at: Pt = mirror ? [200 - centre[0], centre[1]] : centre;
    c.guideCircle(at, radius);
    c.guideCircle(at, bands);
  }
  for (const p of commas) c.fill("tomoe", turn(p));
};

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
    en: "Three equal round heads, each tangent inside the outer circle, a third of a turn apart and so large that neighbours come within a thin white line of each other. Each white line is the band between a head's circle and a second circle a line wider about the same centre; each tail runs between that band and the outer circle to a point, so the crest is a black disc cut by three thin white swirls.",
    ja: "同じ大きさの丸い頭を三つ、外円に内接させ120度ずつ離し、隣どうしが細い白線一本分まで近づく大きさにとります。白線は、頭の円と、同じ中心で白線の幅だけ大きい円との間の帯です。尾はその帯と外円の間を通って尖り、全体は黒い円を三本の細い白い渦で切り分けた形になります。",
  },
  build(c) {
    tomoeBuild(c, 96, false);
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
    en: "The left three-comma tomoe turned the other way: the same compass circles, mirrored, so that the heads lead counter-clockwise and the tails flow clockwise behind them.",
    ja: "左三つ巴と同じコンパスの円を左右に返したもので、頭が反時計回りに進み、尾がそのあとを時計回りに流れます。",
  },
  build(c) {
    tomoeBuild(c, 96, true);
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
    en: "The three-comma tomoe laid out in the room inside a ring about a tenth of the diameter thick, a white line of the same width as its swirls between them.",
    ja: "直径の約10分の1の太さの輪の内側に、渦と同じ幅の白線を残して三つ巴を割り付けます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    tomoeBuild(c, inner - RING_GAP, false);
  },
});
