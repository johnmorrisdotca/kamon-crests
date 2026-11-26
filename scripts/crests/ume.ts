import { SHINSEN_MONCHO } from "./books.ts";
import { yaeUmeBuild, utenaPlumBuild, nozokiPlumBuild, nejiPlumBuild, yaeMukoUmeBuild, mitsumoriUmeBuild, mitsuYoseUraUmeBuild, kageNejiUmeBuild, chuKageEbiraUmeBuild } from "./drawn/ume.ts";
import { defineCrest } from "./util.ts";

export const yaeUme = defineCrest({
  id: "yae-ume",
  name: { en: "Double plum blossom", ja: "八重梅" },
  reading: "やえうめ",
  romaji: "yae ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 10, arrangement: "radial" }],
  families: [],
  aliases: ["double plum", "やえむめ"],
  construction: {
    en: "Five broad petals crowd around a round heart. A short white stamen rises inside each one. Between the outer shoulders, the tops of five round petals show from behind.",
    ja: "丸い中心を幅広い花びら五枚で囲み、それぞれに短い白いしべを入れます。花びらの肩と肩の間から、奥の丸い花びら五枚の先を見せます。",
  },
  measured: "Frame 24: the five outer petals rise to about the same height. Their crowns lie on circles of radius 43, struck 57 from the centre in a reach of 100. The rounded rear petals alternate with the front petals and show just below their tips.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, second row, fourth column from the right: 八重むめ", ja: "左頁、二段目、右から四列目「八重むめ」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeUmeBuild(c, 96);
  },
});

export const utenaUmebachi = defineCrest({
  id: "utena-umebachi",
  name: { en: "Calyx plum bowl", ja: "うてな梅鉢" },
  reading: "うてなうめばち",
  romaji: "utena umebachi",
  frame: "none",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["plum bowl with a calyx"],
  construction: {
    en: "Five separate oval petals lie around the star of the calyx. Four tangent arcs make each oval, with a shorter oval in the lower pair. A short curved stalk leaves the calyx below.",
    ja: "星形のがくのまわりに、離れた楕円形の花びらを五枚並べます。花びらは接する四つの円弧で作図し、下の二枚を短くします。がくの下から短い曲がった柄を伸ばします。",
  },
  measured: "Frame 24: the lower two petals are rounder and reach a little less far from the calyx. Each has most of its width halfway to the tip. The short stalk curves down below the irregular five-point calyx.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, fourth row, second column from the right: うてなむめばち", ja: "左頁、四段目、右から二列目「うてなむめばち」" }, read: "2026-11-26", measured: true },
  build(c) {
    utenaPlumBuild(c, 96);
  },
});

export const nozokiUmebachi = defineCrest({
  id: "nozoki-umebachi",
  name: { en: "Peeping plum bowl", ja: "覗き梅鉢" },
  reading: "のぞきうめばち",
  romaji: "nozoki umebachi",
  frame: "ring-thin",
  motifs: [{ motif: "plum", count: 3, arrangement: "single" }],
  families: [],
  aliases: ["peeping plum", "のぞき梅鉢", "のぞきむめばち"],
  construction: {
    en: "Three petals peek up above the lower rim. The middle petal is a disc and the next two are clipped by the circle inside the ring. Only the top of the heart and a few short rays show.",
    ja: "輪の下の縁から花びらを三枚のぞかせます。中央の花びらは円で、両脇の花びらは輪の内側の円で切ります。丸い中心の上端と短いしべだけを見せます。",
  },
  measured: "Frame 24: the middle disc is about one third of the inside diameter and its centre lies just under two fifths of the radius below the middle of the ring. The two neighbouring discs rise to near the middle disc’s centre line and stand a fine gap away. Short rays and the upper edge of the heart are visible.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, second row, third column from the right: のぞきむめばち", ja: "左頁、二段目、右から三列目「のぞきむめばち」" }, read: "2026-11-26", measured: true },
  build(c) {
    nozokiPlumBuild(c, c.ring("ring-thin"));
  },
});

export const mukoNejiUme = defineCrest({
  id: "muko-neji-ume",
  name: { en: "Twisted front-facing plum blossom", ja: "向こう捻じ梅" },
  reading: "むこうねじうめ",
  romaji: "mukō neji ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["捻じ向こう梅", "むかふねぢうめ", "むかふねぢ梅"],
  construction: {
    en: "Five rounded petals turn about a small disc. Curved white lines part them, and twenty fine stamens curve in the same direction at even intervals around the disc.",
    ja: "小さな丸い中心のまわりに、五枚の丸い花びらを同じ向きにひねって並べます。曲がった白い線で花びらを分け、中心のまわりに、同じ向きに曲がる細いしべを二十本、等間隔に入れます。",
  },
  measured: "Frame 25: the outline has five rounded lobes with a turn in each of the five seams. Twenty curved stamens with slightly enlarged tips are spaced evenly around the disc. The heart is a little under a quarter of the outer radius across.",
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "right page, fourth row, third column from the right: むかふねぢ梅", ja: "右頁、四段目、右から三列目「むかふねぢ梅」" }, read: "2026-11-26", measured: true },
  build(c) {
    nejiPlumBuild(c, 96);
  },
});

export const yaeMukoUme = defineCrest({
  id: "yae-muko-ume",
  name: { en: "Double front-facing plum blossom", ja: "八重向こう梅" },
  reading: "やえむこううめ",
  romaji: "yae mukō ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 10, arrangement: "radial" }],
  families: [],
  aliases: ["double front-facing plum"],
  construction: {
    en: "Five rounded lobes form the face of the plum. The rounded tips of a second row show between them. Thirty fine white stamens, each tipped with a dot, radiate from the small round heart.",
    ja: "五つの丸いふくらみで梅の花の正面を形作り、その間から二重目の丸い花びらの先をのぞかせます。小さな丸い中心から、先に点のある細い白いしべを三十本放射状に伸ばします。",
  },
  measured: "Frame 24: the rear lobes show only at the notches between the large front lobes. The fine rays are regularised to thirty equal intervals, and their round tips stand on a circle just over half the main reach.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, first row, fourth column from the right: 八重むかふ梅", ja: "左頁、一段目、右から四列目「八重むかふ梅」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeMukoUmeBuild(c, 96);
  },
});

export const mitsumoriUme = defineCrest({
  id: "mitsumori-ume",
  name: { en: "Three clustered plum blossoms", ja: "三つ盛り梅" },
  reading: "みつもりうめ",
  romaji: "mitsumori ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["three piled plums", "mitsumori ume"],
  construction: {
    en: "Three upright plums stand on a triangle. Each has a crown of three rounded lobes, two smaller petals below, and nine white rays that open like a fan.",
    ja: "三つの梅を、どれも上向きのまま三角形の頂点に置きます。梅は一つずつ、上に三つの丸いふくらみ、下に二枚の小さな花びらを置き、細い白いしべを扇状に九本広げます。",
  },
  measured: "Frame 24: the three flowers stay upright, even at the lower corners. The lower paired petals are less than half as broad as the three upper lobes together. The rays spread out over the lower part of the crown.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, fourth row, fourth column from the right: 三ッ盛むめ", ja: "左頁、四段目、右から四列目「三ッ盛むめ」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsumoriUmeBuild(c, 96);
  },
});

export const mitsuYoseUraUme = defineCrest({
  id: "mitsu-yose-ura-ume",
  name: { en: "Three back-view plums drawn together", ja: "三つ寄せ裏梅" },
  reading: "みつよせうらうめ",
  romaji: "mitsu yose ura ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["three clustered back-view plum blossoms"],
  construction: {
    en: "Three back-view plums turn towards one another. Five rounded petals, a white calyx and a short curved stalk make each flower.",
    ja: "裏から見た梅を三つ、互いに向けて置きます。丸い花びら五枚、白いがく、短く曲がった柄で、一つの梅を作ります。",
  },
  measured: "Frame 25: the three short stalks point towards the centre of the group. The five petals of each flower retain thin white internal outlines, and the narrow white cuts in the crown are spaced evenly.",
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "right page, fourth row, second column from the right: 三ッよせうら梅", ja: "右頁、四段目、右から二列目「三ッよせうら梅」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuYoseUraUmeBuild(c, 93);
  },
});

export const kageNejiUme = defineCrest({
  id: "kage-neji-ume",
  name: { en: "Outlined twisting plum blossom", ja: "陰捻じ梅" },
  reading: "かげねじうめ",
  romaji: "kage neji ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["かげ捻ぢむめ"],
  construction: { en: "Five open petals turn in one direction around a round heart. Two arcs and a short hooked stamen mark each petal.", ja: "丸い中心のまわりで五枚の花びらを同じ向きに回します。各花びらに二本の円弧と先の曲がった短い雄しべを置きます。" },
  measured: "The outer petal rims and inner echoes share their compass circles. The five hooked stamens follow the same turn.",
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "right page, first row, fourth column from the right: かげ捻ぢむめ", ja: "右頁、一段目、右から四列目「かげ捻ぢむめ」" }, read: "2026-11-26", measured: true },
  build(c) {
    kageNejiUmeBuild(c);
  },
});

export const chuKageEbiraUme = defineCrest({
  id: "chu-kage-ebira-ume",
  name: { en: "Quiver plum blossom in middle shadow", ja: "中陰箙梅" },
  reading: "ちゅうかげえびらうめ",
  romaji: "chū kage ebira ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["中かげゑびら梅"],
  construction: { en: "Three double-edged lobes sit under a shallow fan of stamens. The calyx is open and the stalk turns down to one side.", ja: "二重の輪郭の花びら三枚の上に、浅い扇形に雄しべを広げます。開いたがくから茎を下へ、片側へ曲げます。" },
  measured: "The side lobes are even compass circles by reflection. A smooth upper arc surrounds the fan of round-tipped stamens.",
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "right page, second row, fourth column from the right: 中かげゑびら梅", ja: "右頁、二段目、右から四列目「中かげゑびら梅」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuKageEbiraUmeBuild(c);
  },
});
