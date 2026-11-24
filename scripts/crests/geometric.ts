// Crests made of circles, bars, squares and triangles: no leaf or flower, only the compass and the ruler.
import { WEIGHT } from "../construct/builder.ts";
import { C0, CX, CY, Path, R, circle, lerp, ngonPoints, poly, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { defineCrest, fam } from "./util.ts";

const rect = (x0: number, y0: number, x1: number, y1: number): Path => poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]);

/** A plus-shaped cross of arm width `w` reaching `reach` from the centre. */
const cross = (w: number, reach: number): Path =>
  poly([[CX - w / 2, CY - reach], [CX + w / 2, CY - reach], [CX + w / 2, CY - w / 2], [CX + reach, CY - w / 2], [CX + reach, CY + w / 2], [CX + w / 2, CY + w / 2], [CX + w / 2, CY + reach], [CX - w / 2, CY + reach], [CX - w / 2, CY + w / 2], [CX - reach, CY + w / 2], [CX - reach, CY - w / 2], [CX - w / 2, CY - w / 2]]);

export const janome = defineCrest({
  id: "janome",
  name: { en: "Snake's eye", ja: "蛇の目" },
  reading: "じゃのめ",
  romaji: "janome",
  frame: "none",
  motifs: [{ motif: "snake-eye", count: 1, arrangement: "single" }],
  families: [fam("Kato", "加藤", "かとう")],
  aliases: ["bull's eye", "ring", "target"],
  construction: {
    en: "A ring whose hole is half the diameter of the circle: the compass is set to the radius, then to half of it.",
    ja: "穴の直径が外円の半分の輪です。コンパスを半径に合わせて円を描き、次にその半分に合わせて内側の円を描きます。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.guideCircle(C0, R / 2);
    c.stroke("snake-eye", circle(C0, (R * 3) / 4), R / 2);
  },
});

export const maruNiJuji = defineCrest({
  id: "maru-ni-juji",
  name: { en: "Cross in a circle", ja: "丸に十字" },
  reading: "まるにじゅうじ",
  romaji: "maru ni jūji",
  frame: "ring-thin",
  motifs: [{ motif: "cross", count: 1, arrangement: "single" }],
  families: [fam("Shimazu", "島津", "しまづ")],
  aliases: ["shimazu cross"],
  construction: {
    en: "A thin ring, and inside it a cross whose arms are a fifth of the diameter wide and run into the ring.",
    ja: "細輪の中に、腕の幅が直径の5分の1の十字を置き、腕の先を輪に届かせます。",
  },
  build(c) {
    c.ring("ring-thin");
    const w = 26;
    c.guideLine([CX, CY - R], [CX, CY + R]);
    c.guideLine([CX - R, CY], [CX + R, CY]);
    c.guideLine([CX - w / 2, CY - R], [CX - w / 2, CY + R]);
    c.guideLine([CX + w / 2, CY - R], [CX + w / 2, CY + R]);
    c.fill("cross", cross(w, R - 2));
  },
});

export const ichimonjiMitsuboshi = defineCrest({
  id: "ichimonji-mitsuboshi",
  name: { en: "Three stars over one bar", ja: "一文字三つ星" },
  reading: "いちもんじみつぼし",
  romaji: "ichimonji mitsuboshi",
  frame: "ring-medium",
  motifs: [
    { motif: "star", count: 3, arrangement: "triangle" },
    { motif: "bar", count: 1, arrangement: "single" },
  ],
  families: [fam("Mori (Choshu)", "毛利", "もうり")],
  aliases: ["mori", "mouri", "ichimonji ni mitsuboshi"],
  construction: {
    en: "Three discs of one size set like the character 品, one above two, and under them a bar as long as the two lower discs are wide apart, all inside a ring of a tenth of the diameter.",
    ja: "同じ大きさの円を三つ、品の字に並べ（上に一つ、下に二つ）、その下に、下の二つの円の幅と同じ長さの横一文字を引きます。全体を直径の10分の1の太さの輪で囲みます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    const r = 21;
    c.guideCircle(C0, inner);
    c.guideLine([CX, CY - inner], [CX, CY + inner]);
    c.guideLine([CX - inner, 144], [CX + inner, 144]);
    c.fill("star", circle([CX, 60], r));
    c.fill("star", circle([CX - 27, 102], r));
    c.fill("star", circle([CX + 27, 102], r));
    c.fill("bar", new Path().M([CX - 56, 135]).L([CX + 56, 135]).A(9, 0, 1, [CX + 56, 153]).L([CX - 56, 153]).A(9, 0, 1, [CX - 56, 135]).Z());
  },
});

export const rokumonsen = defineCrest({
  id: "roku-mon-sen",
  name: { en: "Six coins", ja: "六文銭" },
  reading: "ろくもんせん",
  romaji: "rokumonsen",
  frame: "none",
  motifs: [{ motif: "coin", count: 6, arrangement: "rows" }],
  families: [fam("Sanada", "真田", "さなだ")],
  aliases: ["six mon", "rokumon-sen", "sanada coins"],
  construction: {
    en: "Six coins in two rows of three, each a disc with a square hole a quarter of its width.",
    ja: "円形の銭を二段に三枚ずつ並べ、各々の中央に、幅の4分の1の角穴をあけます。",
  },
  build(c) {
    const r = 27.5;
    c.guideLine([CX - R, CY - 30], [CX + R, CY - 30]);
    c.guideLine([CX - R, CY + 30], [CX + R, CY + 30]);
    for (const y of [CY - 30, CY + 30]) for (const x of [CX - 58, CX, CX + 58]) {
      c.group(() => {
        c.guideCircle([x, y], r);
        c.fill("coin", circle([x, y], r).join(rect(x - 7, y - 7, x + 7, y + 7)), "evenodd");
      });
    }
  },
});

/** A lozenge with half-diagonals `a` across and `b` up. */
const lozenge = (c: Pt, a: number, b: number): Path => poly([[c[0], c[1] - b], [c[0] + a, c[1]], [c[0], c[1] + b], [c[0] - a, c[1]]]);

export const takedaBishi = defineCrest({
  id: "takeda-bishi",
  name: { en: "Takeda lozenges", ja: "武田菱" },
  reading: "たけだびし",
  romaji: "Takeda-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 4, arrangement: "quartered" }],
  families: [fam("Takeda", "武田", "たけだ")],
  aliases: ["takeda", "wari-bishi", "four lozenges"],
  construction: {
    en: "A lozenge divided by its two midlines into four smaller lozenges, each drawn a little in from its edges and each with a small lozenge cut out.",
    ja: "菱形を縦横の中心線で四つの小さな菱形に分け、それぞれを少し内側に寄せて描き、中央に小さな菱形の穴をあけます。",
  },
  build(c) {
    const big = 88;
    const half = big / 2;
    c.guidePath(lozenge(C0, big, big), "line");
    c.guideLine([CX, CY - big], [CX, CY + big]);
    c.guideLine([CX - big, CY], [CX + big, CY]);
    for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 1]]) {
      const ctr: Pt = [CX + dx * half, CY + dy * half];
      c.fill("diamond", lozenge(ctr, half * 0.93, half * 0.93).join(lozenge(ctr, half * 0.2, half * 0.2)), "evenodd");
    }
  },
});

export const mitsuUroko = defineCrest({
  id: "mitsu-uroko",
  name: { en: "Three scales", ja: "三つ鱗" },
  reading: "みつうろこ",
  romaji: "mitsu uroko",
  frame: "none",
  motifs: [{ motif: "scale", count: 3, arrangement: "triangle" }],
  families: [fam("Hojo (Kamakura)", "北条", "ほうじょう")],
  aliases: ["hojo", "triforce", "triangles"],
  construction: {
    en: "An equilateral triangle halved on each side; the three corner triangles are drawn and the middle one is left open.",
    ja: "正三角形の各辺の中点を結び、三つの角の三角形だけを描いて、中央の逆三角形は空けておきます。",
  },
  build(c) {
    const pts = ngonPoints(3, 92, 0);
    const [a, b, d] = pts;
    const mids = [lerp(a, b, 0.5), lerp(b, d, 0.5), lerp(d, a, 0.5)];
    c.guidePath(poly(pts), "line");
    c.guidePath(poly(mids), "line");
    c.fill("scale", poly([a, mids[0], mids[2]]));
    c.fill("scale", poly([b, mids[1], mids[0]]));
    c.fill("scale", poly([d, mids[2], mids[1]]));
  },
});

export const maruNiMitsuUroko = defineCrest({
  id: "maru-ni-mitsu-uroko",
  name: { en: "Three scales in a circle", ja: "丸に三つ鱗" },
  reading: "まるにみつうろこ",
  romaji: "maru ni mitsu uroko",
  frame: "ring-medium",
  motifs: [{ motif: "scale", count: 3, arrangement: "triangle" }],
  families: [fam("Hojo (Odawara)", "後北条", "ごほうじょう")],
  aliases: ["hojo ring"],
  construction: {
    en: "The three scales set inside a ring of a tenth of the diameter, the triangle's corners a finger's width off it.",
    ja: "直径の10分の1の太さの輪の中に、三つ鱗を、角が輪に触れないよう少し離して収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    const pts = ngonPoints(3, inner - 9, 0);
    const [a, b, d] = pts;
    const mids = [lerp(a, b, 0.5), lerp(b, d, 0.5), lerp(d, a, 0.5)];
    c.guidePath(poly(pts), "line");
    c.fill("scale", poly([a, mids[0], mids[2]]));
    c.fill("scale", poly([b, mids[1], mids[0]]));
    c.fill("scale", poly([d, mids[2], mids[1]]));
  },
});

export const niHikiryo = defineCrest({
  id: "ni-hikiryo",
  name: { en: "Two bars in a circle", ja: "丸に二つ引両" },
  reading: "まるにふたつひきりょう",
  romaji: "maru ni futatsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 2, arrangement: "rows" }],
  families: [fam("Ashikaga", "足利", "あしかが")],
  aliases: ["ashikaga", "two lines", "futatsu-hikiryo"],
  construction: {
    en: "Two bars, each a sixth of the diameter thick, ruled across the ring at a third of the diameter apart.",
    ja: "輪の中に、太さが直径の6分の1の横線を二本、直径の3分の1の間隔で引き、両端を輪につなげます。",
  },
  build(c) {
    c.ring("ring-medium");
    const h = 16;
    for (const y of [CY - 24, CY + 24]) {
      c.guideLine([CX - R, y - h / 2], [CX + R, y - h / 2]);
      c.guideLine([CX - R, y + h / 2], [CX + R, y + h / 2]);
      c.fill("line", rect(CX - 90, y - h / 2, CX + 90, y + h / 2));
    }
  },
});

export const igeta = defineCrest({
  id: "igeta",
  name: { en: "Well frame", ja: "井桁" },
  reading: "いげた",
  romaji: "igeta",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }],
  families: [fam("Sumitomo", "住友", "すみとも"), fam("Tsutsui", "筒井", "つつい")],
  aliases: ["well curb", "ido-gata"],
  construction: {
    en: "Four bars laid like the character 井, two across and two down, each a ninth of the diameter thick, with a square left open in the middle.",
    ja: "太さが直径の9分の1の棒を、井の字のように縦に二本、横に二本組み、中央に正方形の空きを残します。",
  },
  build(c) {
    const w = 20;
    const o = 30;
    const L = 86;
    c.guideCircle(C0, L + 4);
    for (const v of [-o, o]) {
      c.guideLine([CX + v - w / 2, CY - L], [CX + v - w / 2, CY + L]);
      c.guideLine([CX + v + w / 2, CY - L], [CX + v + w / 2, CY + L]);
    }
    c.fill("well-frame", rect(CX - o - w / 2, CY - L, CX - o + w / 2, CY + L));
    c.fill("well-frame", rect(CX + o - w / 2, CY - L, CX + o + w / 2, CY + L));
    c.fill("well-frame", rect(CX - L, CY - o - w / 2, CX + L, CY - o + w / 2));
    c.fill("well-frame", rect(CX - L, CY + o - w / 2, CX + L, CY + o + w / 2));
  },
});

export const maruNiIgeta = defineCrest({
  id: "maru-ni-igeta",
  name: { en: "Well frame in a circle", ja: "丸に井桁" },
  reading: "まるにいげた",
  romaji: "maru ni igeta",
  frame: "ring-thin",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["igeta ring"],
  construction: {
    en: "The well frame set inside a thin ring, its bars a tenth of the diameter thick.",
    ja: "細輪の中に井桁を収めます。棒の太さは直径の10分の1です。",
  },
  build(c) {
    c.ring("ring-thin");
    const w = 18;
    const o = 26;
    const L = 66;
    for (const v of [-o, o]) c.fill("well-frame", rect(CX + v - w / 2, CY - L, CX + v + w / 2, CY + L));
    for (const v of [-o, o]) c.fill("well-frame", rect(CX - L, CY + v - w / 2, CX + L, CY + v + w / 2));
  },
});

export const kagome = defineCrest({
  id: "kagome",
  name: { en: "Basket eye", ja: "籠目" },
  reading: "かごめ",
  romaji: "kagome",
  frame: "none",
  motifs: [{ motif: "hexagram", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hexagram", "six-pointed star", "basket weave"],
  construction: {
    en: "Two equilateral triangles of the same size, one point up and one point down, drawn as lines of one weight.",
    ja: "同じ大きさの正三角形を二つ、一つは頂点を上に、一つは下に向けて重ね、同じ太さの線で描きます。",
  },
  build(c) {
    const r = 80;
    c.guideCircle(C0, r);
    c.stroke("hexagram", poly(ngonPoints(3, r, 0)), WEIGHT.thin * 1.4);
    c.stroke("hexagram", poly(ngonPoints(3, r, 180)), WEIGHT.thin * 1.4);
  },
});

export const wachigai = defineCrest({
  id: "wachigai",
  name: { en: "Linked rings", ja: "輪違い" },
  reading: "わちがい",
  romaji: "wachigai",
  frame: "none",
  motifs: [{ motif: "linked-rings", count: 2, arrangement: "crossed" }],
  families: [fam("Itakura", "板倉", "いたくら"), fam("Hatakeyama", "畠山", "はたけやま")],
  aliases: ["interlocked rings", "two rings"],
  construction: {
    en: "Two equal rings whose centres are a little over a third of the diameter apart; each passes over the other at one crossing and under it at the other.",
    ja: "同じ大きさの輪を二つ、中心を直径の3分の1強だけ離して重ね、二か所の交点で、一方は上、もう一方は下を通します。",
  },
  build(c) {
    const d = 34;
    const r = 52;
    const w = 14;
    const sep = 2 * d;
    const alpha = Math.acos((2 * r * r - sep * sep) / (2 * r * r));
    const gap = ((w / 2) / Math.sin(alpha) + 1.6) / r * (180 / Math.PI);
    const left: Pt = [CX - d, CY];
    const right: Pt = [CX + d, CY];
    c.guideCircle(left, r);
    c.guideCircle(right, r);
    c.guideLine(left, right);
    const hit = Math.sqrt(r * r - d * d);
    const angleOn = (centre: Pt, y: number): number => Math.atan2(CX - centre[0], -(y - centre[1])) * (180 / Math.PI);
    // A ring broken at one crossing, so that the other ring passes over it there.
    const broken = (centre: Pt, at: number): Path => {
      const p = new Path().M(polar(r, at + gap, centre));
      for (let k = 1; k <= 3; k += 1) p.A(r, 0, 1, polar(r, at + gap + ((360 - 2 * gap) * k) / 3, centre));

      return p;
    };
    // The left ring goes over at the top crossing and under at the bottom; the right ring the other way about.
    c.stroke("linked-rings", broken(left, angleOn(left, CY + hit)), w, "butt");
    c.stroke("linked-rings", broken(right, angleOn(right, CY - hit)), w, "butt");
  },
});
