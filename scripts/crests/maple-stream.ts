import { mitsuMomijiBuild } from "./drawn/mitsu-momiji.ts";
import { kaedeOriEdaBuild } from "./drawn/kaede-ori-eda.ts";
import { kaedeEdaMaruBuild } from "./drawn/kaede-eda-maru.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { tatsutagawaBuild } from "./drawn/maple-stream.ts";
import { defineCrest } from "./util.ts";
import { edaMomijiBuild } from "./drawn/eda-momiji.ts";

export const tatsutagawa = defineCrest({
  id: "tatsutagawa",
  name: { en: "Tatsuta River maple", ja: "立田川" },
  reading: "たつたがわ",
  romaji: "tatsutagawa",
  frame: "none",
  motifs: [
    { motif: "maple", count: 1, arrangement: "single" },
    { motif: "stream", count: 1, arrangement: "single" },
  ],
  families: [],
  aliases: ["竜田川", "龍田川"],
  construction: {
    en: "An angled maple leaf lies across three parallel bands of a stream. A shallow arc marks the leaf's foot, and the veins spread from the arc to its lobes. The stream turns through two round bends and opens into three ruled tails.",
    ja: "斜めを向いた紅葉を、三本の平行な水の帯の上に重ねます。葉の付け根には浅い弧を引き、そこから各裂片に葉脈を伸ばします。水は二か所で丸く折り返し、定規で引いた三本の流れになります。",
  },
  measured: "The print spans about 310 pixels and rises 250. The tallest maple lobe points up and right, and the leaf covers parts of all three stream bands. The water turns at the upper right and again at the lower left. The drawing regularises the bands and makes their overlap with the leaf clear.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, second row, first column from the right: 立田川", ja: "右頁、二段目、右から一列目「立田川」" }, read: "2026-11-26", measured: true },
  build: tatsutagawaBuild,
});

export const kaedeEdaMaru = defineCrest({
  id: "kaede-eda-maru",
  name: { en: "Maple bough in a thin ring", ja: "楓枝丸" },
  reading: "かえでえだまる",
  romaji: "kaede eda maru",
  frame: "ring-thin",
  motifs: [{ motif: "maple", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["楓枝丸"],
  construction: {
    en: "Four maple leaves grow from bands that join the rim, with smaller twigs meeting the main branches.",
    ja: "四枚の楓の葉を輪へ向かう枝につけ、細い小枝を主枝につなぎます。",
  },
  measured: "The front leaf and three folded leaves were placed from the 1892 cell. Each twig follows a 2.55-unit band with both ends attached.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, third row, first column from the right: 楓枝丸", ja: "右頁、三段目、右から一列目「楓枝丸」" }, read: "2026-11-27", measured: true },
  build: kaedeEdaMaruBuild,
});

export const edaMomiji = defineCrest({
  id: "eda-momiji",
  name: { en: "Maple branch", ja: "枝紅葉" },
  reading: "えだもみじ",
  romaji: "eda momiji",
  frame: "none",
  motifs: [{ motif: "maple", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["枝もみぢ"],
  construction: {
    en: "An open maple leaf spreads across a low fork of the bough, with a smaller folded leaf above it.",
    ja: "低く二股に分かれた枝に大きな紅葉を広げ、その上に折れた小さな葉を添えます。",
  },
  measured: "The long upper lobe stands almost upright; the small leaf points left and the bough stretches past the main leaf on both sides.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, fourth row, fourth column from the right: 枝もみぢ", ja: "左頁、四段目、右から四列目「枝もみぢ」" }, read: "2026-11-27", measured: true },
  build: edaMomijiBuild,
});

export const kaedeOriEda = defineCrest({
  id: "kaede-ori-eda",
  name: { en: "Snapped branch of maple", ja: "楓折り枝" },
  reading: "かえでおりえだ",
  romaji: "kaede ori eda",
  frame: "none",
  motifs: [{ motif: "maple", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["楓折枝"],
  construction: {
    en: "A tapering bough carries one maple leaf shown full and another folded. The upright shoot and short thorns grow from the same branch.",
    ja: "先へ細くなる折り枝に、正面から見た楓の葉と折れた葉を一枚ずつ付けます。同じ枝から直立する小枝と短いとげを伸ばします。",
  },
  measured: "The six-lobed leaf, three visible folded lobes, snapped foot and shoot positions were measured from the 1892 cell.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, first row, second column from the right: 楓折枝", ja: "右頁、一段目、右から二列目「楓折枝」" }, read: "2026-11-27", measured: true },
  build: kaedeOriEdaBuild,
});

export const mitsuMomiji = defineCrest({
  id: "mitsu-momiji",
  name: { en: "Three maple leaves", ja: "三つ紅葉" },
  reading: "みつもみじ",
  romaji: "mitsu momiji",
  frame: "none",
  motifs: [{ motif: "maple", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ紅葉"],
  construction: {
    en: "Three equal leaves point outward from a triangular opening. A shallow curved foot joins the five veins of each leaf. The short stems reach the triangle and the feet of the leaves.",
    ja: "三角形の空きのまわりに同じ紅葉を三枚、外へ向けて置きます。浅い弧の付け根に五本の葉脈をつなぎ、短い茎で葉と三角形を結びます。",
  },
  measured: "The upper foot is about 100 source pixels from the upper tip. The upper and lower feet mark the radius for the three equal turns. The triangular opening remains between the three short stems.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, first row, fourth column from the right: 三ッ紅葉", ja: "左頁、一段目、右から四列目「三ッ紅葉」" }, read: "2026-11-27", measured: true },
  build: mitsuMomijiBuild,
});
