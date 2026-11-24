// Crests made of circles, bars, squares and triangles: no leaf or flower, only the compass and the ruler.
import { RING_GAP } from "../construct/builder.ts";
import { igetaBuild, kagomeBuild, takedaBuild, wachigaiBuild } from "./drawn/plain.ts";
import { C0, CX, CY, Path, R, circle, lerp, ngonPoints, poly } from "../construct/geo.ts";
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
    en: "A thick ring: a disc with a round hole in the middle, the hole four tenths of the disc across.",
    ja: "太い輪です。円の中央に丸い穴をあけ、穴の直径を円の10分の4にします。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.guideCircle(C0, R * 0.4);
    c.fill("snake-eye", circle(C0, R).join(circle(C0, R * 0.4)), "evenodd");
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
    en: "A cross whose four arms reach the ring, the arms as thick as the ring, which is about a tenth of the diameter.",
    ja: "十字の四本の腕を輪まで伸ばし、腕の太さを輪と同じ（直径の約10分の1）にします。",
  },
  build(c) {
    c.ring("ring-medium");
    const w = 17;
    c.guideLine([CX, CY - R], [CX, CY + R]);
    c.guideLine([CX - R, CY], [CX + R, CY]);
    c.fill("cross", cross(w, R - 8));
  },
});

export const ichimonjiMitsuboshi = defineCrest({
  id: "ichimonji-mitsuboshi",
  name: { en: "One bar over three stars", ja: "一文字に三つ星" },
  reading: "いちもんじにみつぼし",
  romaji: "ichimonji ni mitsuboshi",
  frame: "none",
  motifs: [
    { motif: "star", count: 3, arrangement: "triangle" },
    { motif: "bar", count: 1, arrangement: "single" },
  ],
  families: [fam("Mori (Choshu)", "毛利", "もうり")],
  aliases: ["mori", "mouri", "ichimonji mitsuboshi", "一文字三つ星"],
  construction: {
    en: "A bar, the character 一, and under it three discs of one size set like the character 品, one above two; the bar is as long as the two lower discs are wide apart.",
    ja: "横一文字を上に置き、その下に同じ大きさの円を三つ、品の字に並べます（上に一つ、下に二つ）。一文字の長さは、下の二つの円の幅と同じです。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.guideLine([CX, 4], [CX, 196]);
    c.guideLine([44, 44], [156, 44]);
    c.fill("bar", rect(44, 32, 156, 56));
    for (const at of [[CX, 91], [CX - 29, 141], [CX + 29, 141]] as Pt[]) {
      c.guideCircle(at, 27);
      c.fill("star", circle(at, 27));
    }
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
  aliases: ["six mon", "rokumon-sen", "sanada coins", "Rokumonsen", "Sanada crest"],
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


export const takedaBishi = defineCrest({
  id: "takeda-bishi",
  name: { en: "Takeda lozenges", ja: "武田菱" },
  reading: "たけだびし",
  romaji: "Takeda-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 4, arrangement: "quartered" }],
  families: [fam("Takeda", "武田", "たけだ")],
  aliases: ["takeda", "wari-bishi", "four lozenges", "Takeda-bishi"],
  construction: {
    en: "A lozenge three wide to two high, cut into four like lozenges by a narrow white cross that runs parallel to its sides.",
    ja: "横3に対して縦2の菱形を、辺と平行な細い白い十字で、同じ形の四つの菱に分けます。",
  },
  build(c) {
    takedaBuild(c, "diamond", R);
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
    c.guidePath(poly(pts));
    c.guidePath(poly(mids));
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
    en: "The three scales set inside a ring of about a tenth of the diameter, the triangle's corners a finger's width off it.",
    ja: "直径の約10分の1の太さの輪の中に、三つ鱗を、角が輪に触れないよう少し離して収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    const pts = ngonPoints(3, inner - 9, 0);
    const [a, b, d] = pts;
    const mids = [lerp(a, b, 0.5), lerp(b, d, 0.5), lerp(d, a, 0.5)];
    c.guidePath(poly(pts));
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
    en: "Two level bars across a ring about a tenth of the diameter thick, each bar a little thicker than the white between them.",
    ja: "直径の約10分の1の太さの輪に、横棒を二本渡します。棒は、間の白より少し太くします。",
  },
  build(c) {
    c.ring("ring-medium");
    const h = 26;
    for (const y of [CY - 23.5, CY + 23.5]) {
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
    en: "Four bars laid as a square stood on its corner, like the character 井 turned an eighth of a turn: two lean each way half a right angle, and their ends stand out past the crossings by about a bar's width.",
    ja: "四本の棒を、井の字を45度回したように、角で立つ正方形に組みます。二本ずつ左右に45度傾け、棒の端は、交わるところから棒の太さほど外に出します。",
  },
  build(c) {
    igetaBuild(c, "well-frame", R);
  },
});

export const maruNiIgeta = defineCrest({
  id: "maru-ni-igeta",
  name: { en: "Well frame in a circle", ja: "丸に井桁" },
  reading: "まるにいげた",
  romaji: "maru ni igeta",
  frame: "ring-medium",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["igeta ring"],
  construction: {
    en: "The well frame, stood on its corner, inside a ring about a tenth of the diameter thick.",
    ja: "角で立てた井桁を、直径の約10分の1の太さの輪の中に収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    igetaBuild(c, "well-frame", inner - RING_GAP);
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
    kagomeBuild(c, "hexagram", R);
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
    wachigaiBuild(c, "linked-rings", R);
  },
});
