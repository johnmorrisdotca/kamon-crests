import { musubiSasaBuild } from "./drawn/sasa-tied.ts";
import { maruNiFutoKyumaiZasaBuild, maruNiKumaiZasaKuzushiBuild } from "./drawn/sasa-groups.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const maruNiFutoKyumaiZasa = defineCrest({
  id: "maru-ni-futo-kyumai-zasa",
  name: { en: "Bold nine bamboo-grass leaves in a ring", ja: "丸に太九枚笹" },
  reading: "まるにふとくまいざさ",
  romaji: "maru ni futo kyūmai zasa",
  frame: "ring-medium",
  motifs: [{ motif: "bamboo-grass", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["丸ニふと九枚ささ"],
  construction: { en: "Three broad ribbed blades and six narrow leaves sit inside a second, heavy circle within the outer ring.", ja: "葉脈のある幅広い笹の葉三枚と細い葉六枚を、外の輪の内側にあるもう一本の太い輪に収めます。" },
  measured: "The heavy circle lies just outside the nine leaves, inside a separate outer ring. The three broad blades meet in the middle.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, first row, fourth column from the right: 丸ニふと九枚ささ", ja: "左頁、一段目、右から四列目「丸ニふと九枚ささ」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiFutoKyumaiZasaBuild(c);
  },
});

export const maruNiKumaiZasaKuzushi = defineCrest({
  id: "maru-ni-kumai-zasa-kuzushi",
  name: { en: "Stylized nine bamboo-grass leaves in a ring", ja: "丸に九枚笹崩し" },
  reading: "まるにくまいざさくずし",
  romaji: "maru ni kumai zasa kuzushi",
  frame: "ring-medium",
  motifs: [{ motif: "bamboo-grass", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["丸ニ九まいさゝくづし"],
  construction: { en: "Three veined leaves and their six narrow companions stand in a ring, with a small open space between the broad leaves.", ja: "葉脈のある三枚の主葉と六枚の細い笹の葉を輪の中に置き、中央の広い葉の間に小さな空きを残します。" },
  measured: "The broad blades have distinct bases and a small central gap. Each has two narrow companion leaves ending short of the frame.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, third row, third column from the right: 丸ニ九まいさゝくづし", ja: "左頁、三段目、右から三列目「丸ニ九まいさゝくづし」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiKumaiZasaKuzushiBuild(c);
  },
});

export const musubiSasa = defineCrest({
  id: "musubi-sasa",
  name: { en: "Tied bamboo-grass leaves", ja: "結び笹" },
  reading: "むすびささ",
  romaji: "musubi sasa",
  frame: "none",
  motifs: [{ motif: "bamboo-grass", count: 6, arrangement: "facing" }],
  families: [],
  aliases: ["むすびささ"],
  construction: { en: "Two broad veined leaves meet along the upright axis. Four narrow leaves meet in pairs at the sides where the outline turns around the motif.", ja: "葉脈のある幅広い葉二枚を縦軸の中央で合わせます。細い葉四枚は、外縁が丸く回る左右の点に二枚ずつ合わせます。" },
  measured: "Two upright leaves and paired side branches meet on perpendicular axes. The perimeter is integrated into the tied leaves.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, fourth row, third column from the right: むすびささ", ja: "左頁、四段目、右から三列目「むすびささ」" }, read: "2026-11-26", measured: true },
  build(c) {
    musubiSasaBuild(c);
  },
});
