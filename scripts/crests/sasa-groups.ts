import { maruNiFutoKyumaiZasaBuild } from "./drawn/sasa-groups.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const maruNiFutoKyumaiZasa = defineCrest({
  id: "maru-ni-futo-kyumai-zasa",
  name: { en: "Bold nine bamboo-grass leaves in a ring", ja: "丸に太九枚笹" },
  reading: "まるにふときゅうまいざさ",
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
