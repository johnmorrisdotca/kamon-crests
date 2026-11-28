import { agariFujiBuild, naitoFujiBuild, hanaFujiBuild, futatsuFujiBuild, okuboFujiBuild, shibataFujiBuild, yatsuFujiBuild, musubiFujiBuild } from "./drawn/fuji.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const agariFuji = defineCrest({
  id: "agari-fuji",
  name: { en: "Rising wisteria", ja: "上がり藤" },
  reading: "あがりふじ",
  romaji: "agari-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "upright" }],
  families: [],
  aliases: ["上り藤"],
  construction: { en: "Two mirror-image racemes rise from the sides and nearly meet over the three long leaves.", ja: "左右反転した二つの花房が両脇から上がり、三枚の長い葉の上で、触れそうなほど近づきます。" },
  measured: "The two racemes taper into the rounded ends at the top. The three leaves grow from one short stalk below.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, third row, third column from the right: 上り藤", ja: "右頁、三段目、右から三列目「上り藤」" }, read: "2026-11-26", measured: true },
  build(c) {
    agariFujiBuild(c);
  },
});

export const naitoFuji = defineCrest({
  id: "naito-fuji",
  name: { en: "Naitō wisteria", ja: "内藤藤" },
  reading: "ないとうふじ",
  romaji: "Naitō-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [],
  aliases: ["内藤ふぢ"],
  construction: { en: "A long oval leaf stands between two rounded shoulders. Two pairs of rows follow the white stems down to the low florets.", ja: "細長い楕円形の葉を、左右の丸い肩の間に置きます。小花の列が二組、白い花軸に沿って下の小花まで続きます。" },
  measured: "The taller top leaf and rounder top shoulders distinguish this print from the hanging wisteria beside it.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, fourth row, first column from the right: 内藤ふぢ", ja: "右頁、四段目、右から一列目「内藤ふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    naitoFujiBuild(c);
  },
});

export const hanaFuji = defineCrest({
  id: "hana-fuji",
  name: { en: "Wisteria flower", ja: "花藤" },
  reading: "はなふじ",
  romaji: "hana-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [],
  aliases: ["花ふぢ"],
  construction: { en: "A broad heart-shaped flower rises between two hanging sprays. Two wide leaves curve out above its shoulders.", ja: "二つの垂れた花房の間に、幅広い心形の花を置きます。花の肩の上から、二枚の幅広い葉が外へ曲がります。" },
  measured: "The crown is one heart-shaped flower beneath the short upper stalk rather than three leaves.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, second row, third column from the right: 花ふぢ", ja: "右頁、二段目、右から三列目「花ふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    hanaFujiBuild(c);
  },
});

export const futatsuFuji = defineCrest({
  id: "futatsu-fuji",
  name: { en: "Two wisteria sprays", ja: "二つ藤" },
  reading: "ふたつふじ",
  romaji: "futatsu-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "ring" }],
  families: [],
  aliases: ["二ッふぢ"],
  construction: { en: "Two wisteria sprays form a wreath. Their curved stalks pass one another in the open centre.", ja: "藤の花房を二つ、輪に並べます。曲がった茎が空いた中心で互いにすれ違います。" },
  measured: "Each leaf crown and curved raceme repeats by a half turn. The inner ends remain separate.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, fourth row, third column from the right: 二ッふぢ", ja: "右頁、四段目、右から三列目「二ッふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    futatsuFujiBuild(c);
  },
});

export const okuboFuji = defineCrest({
  id: "okubo-fuji",
  name: { en: "Ōkubo wisteria", ja: "大久保藤" },
  reading: "おおくぼふじ",
  romaji: "Ōkubo-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "upright" }],
  families: [],
  aliases: ["大久保ふぢ"],
  construction: { en: "The character 大 stands above the three leaves between two rising sprays of wisteria.", ja: "上に伸びる二つの花房の間に三枚の葉を置き、その上に「大」の字を立てます。" },
  measured: "Narrow petals leave room around the character. The two legs of 大 curve outward.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, third row, first column from the right: 大久保ふぢ", ja: "右頁、三段目、右から一列目「大久保ふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    okuboFujiBuild(c);
  },
});

export const yatsuFuji = defineCrest({
  id: "yatsu-fuji",
  name: { en: "Eight wisteria sprays", ja: "八つ藤" },
  reading: "やつふじ",
  romaji: "yatsu-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["八ッ藤"],
  construction: { en: "Eight paired sprays with plump florets turn around the four-petalled flower. Eight fine rays are cut from its heart.", ja: "丸みのある小花をつけた、対になった八つの花房が、四弁の花を囲みます。丸い中心から細い筋を八本白く抜きます。" },
  measured: "The florets follow the same bowed profile as the hanging wisteria. Short diagonal rays alternate with four long rays at the heart.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, third row, second column from the right: 八ッ藤", ja: "右頁、三段目、右から二列目「八ッ藤」" }, read: "2026-11-26", measured: true },
  build(c) {
    yatsuFujiBuild(c);
  },
});

export const shibataFuji = defineCrest({
  id: "shibata-fuji",
  name: { en: "Shibata wisteria", ja: "柴田藤" },
  reading: "しばたふじ",
  romaji: "Shibata-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [],
  aliases: ["柴田ふぢ"],
  construction: { en: "Two wisteria sprays hang from rounded leaves. Below the calyx, a narrow-waisted bar flares to rounded ends.", ja: "丸みのある葉から二つの藤の花房が垂れます。萼の下には、中央がくびれ、両端が丸く広がる棒を置きます。" },
  measured: "The span, spacing and proportions of the sprays, crown and solid bar are from the book cell. The two sprays are made exactly symmetrical, and pairs of broad curves and round ends form a single low bar.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, second row, second column from the right: 柴田ふぢ", ja: "右頁、二段目、右から二列目「柴田ふぢ」" }, read: "2026-11-27", measured: true },
  build(c) {
    shibataFujiBuild(c);
  },
});

export const musubiFuji = defineCrest({
  id: "musubi-fuji",
  name: { en: "Knotted wisteria", ja: "結び藤" },
  reading: "むすびふじ",
  romaji: "musubi fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "ring" }],
  families: [],
  aliases: ["むすびふぢ"],
  construction: {
    en: "Two opposing wisteria sprays form a round shape. Their paired stalks interlace and end in short curls.",
    ja: "向かい合う二房の藤を丸く並べます。それぞれの茎を編み合わせ、先端を短く巻きます。",
  },
  measured: "The printed racemes and the two central knots were measured from the 1892 cell. The racemes are exact half turns, and paper separates the raised strands where the stalks cross.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, fourth row, fourth column from the right: むすびふぢ", ja: "右頁、四段目、右から四列目「むすびふぢ」" }, read: "2026-11-27", measured: true },
  build: musubiFujiBuild,
});
