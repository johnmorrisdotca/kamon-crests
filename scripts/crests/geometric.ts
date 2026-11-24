// Crests made of circles, bars, squares and triangles: no leaf or flower, only the compass and the ruler.
import { RING_GAP } from "../construct/builder.ts";
import { discsBuild, hikiryoBuild, izutsuBuild, matsukawaBuild, wariBishiBuild } from "./drawn/families.ts";
import { igetaBuild, kagomeBuild, takedaBuild, wachigaiBuild } from "./drawn/plain.ts";
import { C0, CX, CY, Path, R, circle, lerp, ngonPoints, poly } from "../construct/geo.ts";
import { DEG, disc, lineCircle, nearest, onCircle, seg, shortArc, toPath, touch } from "../construct/compass.ts";
import type { Circle, Placing, V } from "../construct/compass.ts";
import { SHINSEN_MONCHO, READ } from "./books.ts";
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
    en: "The character 一 as the brush writes it, over three discs of one size set like the character 品, one above two. The stroke's top is a ruled line and its underside a wide arc; its left end is a circle as large as a disc, cut slantwise above, and its right end a smaller circle with a slanting line under it; the top rises to a point at each end, in a hollow arc.",
    ja: "筆で書いた「一」の字を上に置き、その下に同じ大きさの円を三つ、品の字に並べます（上に一つ、下に二つ）。一の字は、上が定規の直線、下が大きな弧です。左の端は下の円と同じ大きさの円で、上を斜めの直線で切ります。右の端は少し小さい円で、下に斜めの直線を引きます。上の線は、両端でとがって上がります。",
  },
  build(c) {
    // Measured from pictures of the Mōri crest: the proportions only, set out again with the compass and the ruler.
    const placing: Placing = { k: 0.95 };
    const top = 75;
    const under: Circle = { c: [0, -70], r: 109 };
    // The left end's circle touches the arc of the underside, so the one runs into the other with no corner.
    const left: Circle = { c: [-50.7, under.c[1] + Math.sqrt((under.r + 28) ** 2 - 50.7 ** 2)], r: 28 };
    const right: Circle = { c: [52.3, 57], r: 23 };
    // Where the top line runs into each end: a hollow arc that touches the line and rises to a point, on the right at the top of the end's circle.
    const shoulder: V = [right.c[0], right.c[1] + right.r];
    const rise: Circle = { c: [right.c[0] - Math.sqrt(159 ** 2 - (159 + top - shoulder[1]) ** 2), top + 159], r: 159 };
    const lift: Circle = { c: [-37.7, top + 24], r: 24 };
    const from: V = [lift.c[0], top];
    const to: V = [rise.c[0], top];
    // The right end's slanting line touches its circle at half a right angle; the left end's cuts its circle.
    const slant = onCircle(right.c, right.r, -45 * DEG);
    const tip = nearest(lineCircle(slant, [slant[0] - 1, slant[1] - 1], under.c, under.r), [54, -25]);
    const heel = touch(left, under);
    const cut = onCircle(left.c, left.r, 167.6 * DEG);
    const peak = nearest(lineCircle(cut, [cut[0] + 16.2, cut[1] + 12], lift.c, lift.r), [-54, 80]);
    c.guideCircle(C0, R);
    c.guideLine([CX, 4], [CX, 196]);
    c.fill("bar", toPath([[seg(from, to), shortArc(rise, to, shoulder), shortArc(right, shoulder, slant), seg(slant, tip), shortArc(under, tip, heel), shortArc(left, heel, cut), seg(cut, peak), shortArc(lift, peak, from)]], placing));
    for (const at of [[0, 3], [-37, -53], [37, -53]] as V[]) c.fill("star", toPath([disc(at, 28)], placing));
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
    c.stepRound(92);
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
    c.stepRound(inner - 9);
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
    // Half of the chord the ring's outer circle cuts from a level line at height `y`: a bar ends on that circle, under the ring.
    const half = (y: number): number => Math.sqrt(R * R - (y - CY) ** 2);
    for (const y of [CY - 23.5, CY + 23.5]) {
      const [top, foot] = [y - h / 2, y + h / 2];
      c.guideLine([CX - R, top], [CX + R, top]);
      c.guideLine([CX - R, foot], [CX + R, foot]);
      c.fill("line", new Path().M([CX - half(top), top]).L([CX + half(top), top]).A(R, 0, 1, [CX + half(foot), foot]).L([CX - half(foot), foot]).A(R, 0, 1, [CX - half(top), top]).Z());
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

export const maruNiKagome = defineCrest({
  id: "maru-ni-kagome",
  measured: "The Wikimedia Commons picture Japanese Crest Maru ni Kagome, read along the upright line through the centre as parts of the ring's diameter: the star's points stand a narrow white line inside the ring, one point up. Its ring and the white inside it are the package's measured ones.",
  name: { en: "Basket eye in a circle", ja: "丸に籠目" },
  reading: "まるにかごめ",
  romaji: "maru ni kagome",
  frame: "ring-medium",
  motifs: [{ motif: "hexagram", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hexagram in ring", "ringed basket eye"],
  construction: {
    en: "The basket eye inside a ring about a tenth of the diameter thick, its six points a narrow white line from the ring.",
    ja: "直径の約10分の1の太さの輪の中に籠目を収め、六つの角を、輪から細い白線一本分だけ離します。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    kagomeBuild(c, "hexagram", inner - RING_GAP);
  },
});

export const maruNiWachigai = defineCrest({
  id: "maru-ni-wachigai",
  measured: "The ringed linked rings of the 1892 crest book (frame 15, 丸に輪ちがひ), read along the level line through the centre: the two rings stand side by side on it and reach a narrow white line from the ring at each side; of the room inside the ring, their centres are 0.36 either side of the middle, their outer edges 0.64 across the radius and their bands 0.13 wide. The book draws them in outline with a thin ring; the ring here is the package's measured one.",
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "right page, second row, fourth column: 丸に輪ちがひ (measured, and drawn with compass and ruler)", ja: "右頁、二段目の四列目「丸に輪ちがひ」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Linked rings in a circle", ja: "丸に輪違い" },
  reading: "まるにわちがい",
  romaji: "maru ni wachigai",
  frame: "ring-medium",
  motifs: [{ motif: "linked-rings", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["linked rings in ring", "two rings in a circle"],
  construction: {
    en: "The linked rings inside a ring about a tenth of the diameter thick, the two rings a narrow white line from it at the sides.",
    ja: "直径の約10分の1の太さの輪の中に輪違いを収め、二つの輪の左右の端を、外の輪から細い白線一本分だけ離します。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    // The book's ringed crest sets the rings further apart than the crest with no ring: of the room inside the ring, their centres 0.36 either side of the middle and their outer edges 0.64 across the radius.
    wachigaiBuild(c, "linked-rings", inner - RING_GAP, { half: 36, outer: 64, inner: 51 });
  },
});

export const mitsuBoshi = defineCrest({
  id: "mitsu-boshi",
  name: { en: "Three stars", ja: "三つ星" },
  reading: "みつぼし",
  romaji: "mitsuboshi",
  frame: "none",
  motifs: [{ motif: "star", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["three stars", "three discs", "mitsuboshi"],
  construction: {
    en: "Three discs of one size set like the character 品, one above two: their centres are alternate points of the circle of 0.56, the compass stepped round it from the top, and each disc is 0.44 across the radius, so a narrow white lies between neighbours and all three touch the outer circle.",
    ja: "同じ大きさの円を三つ、品の字に並べます（上に一つ、下に二つ）。中心は、半径0.56の円の上に、コンパスを同じ幅のまま12時から時計回りに進めて印をつけた六つの点のうち、一つおきの三点です。円の半径は0.44で、となり合う円の間に細い白を残し、三つとも外円に接します。",
  },
  build(c) {
    // Proportions measured from a public picture of the crest (Wikimedia Commons, Japanese Crest Mitu Hosi): discs 0.44 of the circle through their outer edges, their centres 0.56 out.
    discsBuild(c, "star", R, { n: 3, ring: 56, r: 44 });
  },
});

export const maruNiMitsuBoshi = defineCrest({
  id: "maru-ni-mitsu-boshi",
  name: { en: "Three stars in a circle", ja: "丸に三つ星" },
  reading: "まるにみつぼし",
  romaji: "maru ni mitsuboshi",
  frame: "ring-medium",
  motifs: [{ motif: "star", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["three stars ring", "mitsuboshi in ring"],
  construction: {
    en: "The three stars laid out in the room inside a ring about a tenth of the diameter thick, a narrow white between them and the ring.",
    ja: "直径の約10分の1の太さの輪の内側に、細い白線を残して三つ星を割り付けます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    discsBuild(c, "star", inner - RING_GAP, { n: 3, ring: 56, r: 44 });
  },
});

export const shichiyo = defineCrest({
  id: "shichiyo",
  name: { en: "Seven luminaries", ja: "七曜" },
  reading: "しちよう",
  romaji: "shichiyō",
  frame: "none",
  motifs: [{ motif: "star", count: 7, arrangement: "ring" }],
  families: [],
  aliases: ["seven stars", "seven discs", "shichiyou"],
  construction: {
    en: "A disc with six more round it, all of one size: the compass is stepped round the circle of 0.675 from the top to mark the six centres, and each disc is 0.325 across the radius, so each stands a narrow white from its neighbours and from the middle one.",
    ja: "同じ大きさの円を七つ、一つを中央に、六つをそのまわりに置きます。半径0.675の円の上に、コンパスを同じ幅のまま12時から時計回りに進めて六つの中心を印します。円の半径はどれも0.325で、となりの円や中央の円との間に細い白を残します。",
  },
  build(c) {
    // Measured from a public picture of the crest (Wikimedia Commons, Shichiyoumon): discs 0.328 of the outer circle, the six 0.673 out.
    discsBuild(c, "star", R, { n: 6, ring: 67.5, r: 32.5, centre: 32.5 });
  },
});

export const maruNiKuyo = defineCrest({
  id: "maru-ni-kuyo",
  name: { en: "Nine luminaries in a circle", ja: "丸に九曜" },
  reading: "まるにくよう",
  romaji: "maru ni kuyō",
  frame: "ring-medium",
  motifs: [{ motif: "star", count: 9, arrangement: "ring" }],
  families: [],
  aliases: ["nine stars ring", "kuyo ring", "kuyou in a circle"],
  construction: {
    en: "A large disc with eight smaller discs round it, each a narrow white from its neighbours and from the large one, laid out inside a ring about a tenth of the diameter thick.",
    ja: "大きな円のまわりに小さな円を八つ並べ、となりどうしの間にも大きな円との間にも細い白を残します。これを、直径の約10分の1の太さの輪の内側に割り付けます。",
  },
  build(c) {
    // The nine discs as a ringed sheet of crests shows them: the large one 0.44 of the circle, the eight 0.27 across and 0.73 out.
    const inner = c.ring("ring-medium");
    discsBuild(c, "star", inner - RING_GAP, { n: 8, ring: 73, r: 27, centre: 44 });
  },
});

export const maruNiHitotsuHikiryo = defineCrest({
  id: "maru-ni-hitotsu-hikiryo",
  name: { en: "One bar in a circle", ja: "丸に一つ引両" },
  reading: "まるにひとつひきりょう",
  romaji: "maru ni hitotsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hitotsu-hikiryo", "one line", "one bar"],
  construction: {
    en: "One level bar across the middle of a ring about a tenth of the diameter thick, the bar twice as thick as the ring.",
    ja: "直径の約10分の1の太さの輪に、真ん中を通る横棒を一本渡します。棒の太さは輪の2倍です。",
  },
  build(c) {
    // Measured from a public picture of the crest (Wikimedia Commons, Marunihitotsuhiki): the bar is 0.36 of the radius thick.
    hikiryoBuild(c, "line", [0], 34.5);
  },
});

export const maruNiMitsuHikiryo = defineCrest({
  id: "maru-ni-mitsu-hikiryo",
  name: { en: "Three bars in a circle", ja: "丸に三つ引両" },
  reading: "まるにみつひきりょう",
  romaji: "maru ni mitsu hikiryō",
  frame: "ring-medium",
  motifs: [{ motif: "line", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["mitsu-hikiryo", "three lines", "three bars"],
  construction: {
    en: "Three level bars across a ring about a tenth of the diameter thick, each bar a little thinner than the white between them.",
    ja: "直径の約10分の1の太さの輪に、横棒を三本渡します。棒は、間の白より少し細くします。",
  },
  build(c) {
    // Measured from a public picture of the crest (Wikimedia Commons, Japanese Crest Maru ni mitu Hiki): bars 0.22 of the radius thick, 0.455 apart.
    hikiryoBuild(c, "line", [-44, 0, 44], 21.5);
  },
});

export const maruNiWariBishi = defineCrest({
  id: "maru-ni-wari-bishi",
  name: { en: "Split lozenge in a circle", ja: "丸に割菱" },
  reading: "まるにわりびし",
  romaji: "maru ni wari-bishi",
  frame: "ring-medium",
  motifs: [{ motif: "diamond", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["maru ni takeda-bishi", "丸に武田菱", "four lozenges in a circle"],
  construction: {
    en: "A lozenge four wide to three high, cut into four like lozenges by a narrow white cross that runs along its sides, laid out inside a ring about a tenth of the diameter thick.",
    ja: "横4に対して縦3の菱形を、辺と平行な細い白い十字で、同じ形の四つの菱に分けます。これを、直径の約10分の1の太さの輪の内側に割り付けます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    wariBishiBuild(c, "diamond", inner - RING_GAP);
  },
});

export const matsukawaBishi = defineCrest({
  id: "matsukawa-bishi",
  name: { en: "Pine-bark lozenge", ja: "松皮菱" },
  reading: "まつかわびし",
  romaji: "matsukawa-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["pine bark", "stacked lozenges", "three lozenges"],
  construction: {
    en: "Three lozenges stood one on another, the middle one the largest, so that the two sides step in where they meet. The middle lozenge's corners are 1 to the left and right of the centre and 0.57 above and below it; the other two have their centres 0.43 above and below the centre, and their corners 0.54 to the left and right and 0.35 above and below their own centres.",
    ja: "三つの菱形を縦に重ね、真ん中を最も大きくして、重なるところで両側が内へ切れ込むようにします。中央の菱の角は、中心から左右に1、上下に0.57の距離にあります。上の菱と下の菱は、中心から0.43上と下に中心を置き、その角はそれぞれの中心から左右に0.54、上下に0.35の距離にあります。",
  },
  build(c) {
    // Measured from a public picture of the crest (Wikimedia Commons, Japanese Crest Matukawa Hisi).
    matsukawaBuild(c, "diamond", R);
  },
});

export const izutsu = defineCrest({
  id: "izutsu",
  name: { en: "Well curb", ja: "井筒" },
  reading: "いづつ",
  romaji: "izutsu",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["well frame upright", "hira izutsu", "平井筒"],
  construction: {
    en: "Two upright bars and two level bars crossing square, each 0.54 of the length from a bar's end to the centre (a little over half of it), their inner edges 0.275 from the centre, so a small square is left open in the middle; the ends stand out a fifth past the crossings. The outermost corners stand on the outer circle.",
    ja: "縦の棒二本と横の棒二本を、直角に組みます。棒の端から中心までの長さを1とすると、棒の幅は0.54（半分強）、内側の辺は中心から0.275の位置にあり、真ん中に小さな四角い穴が残ります。棒の端は、交わるところから0.185ほど（約5分の1）外に出し、いちばん外の角は外円の上に置きます。",
  },
  build(c) {
    // Measured from public pictures of the crest (Wikimedia Commons, Japanese Crest Hira Izutu and Japanese crest Izutu): bars 0.54 wide of the half-width, hole 0.275.
    izutsuBuild(c, "well-frame", R);
  },
});

export const maruNiIzutsu = defineCrest({
  id: "maru-ni-izutsu",
  name: { en: "Well curb in a circle", ja: "丸に井筒" },
  reading: "まるにいづつ",
  romaji: "maru ni izutsu",
  frame: "ring-medium",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["izutsu ring", "well curb ring"],
  construction: {
    en: "The well curb, standing square, inside a ring about a tenth of the diameter thick, its outermost corners a narrow white from the ring.",
    ja: "辺を縦横にそろえた井筒を、直径の約10分の1の太さの輪の中に、いちばん外の角が輪に触れないよう少し離して収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    izutsuBuild(c, "well-frame", inner - RING_GAP);
  },
});
