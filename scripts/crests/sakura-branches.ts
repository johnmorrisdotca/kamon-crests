import { SHINSEN_MONCHO } from "./books.ts";
import { nakaBirakiEdaZakuraBuild } from "./drawn/sakura-branches.ts";
import { defineCrest } from "./util.ts";

export const nakaBirakiEdaZakura = defineCrest({
  id: "naka-biraki-eda-zakura",
  name: { en: "Half-open cherry on a branch", ja: "中開き枝桜" },
  reading: "なかびらきえだざくら",
  romaji: "naka biraki eda zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中ひらき枝さくら"],
  construction: {
    en: "A notched front petal overlaps two wide side petals. A forked twig bends beneath them to a pointed leaf with short diagonal veins.",
    ja: "先の割れた正面の花弁に、左右の広い花弁が重なります。その下で枝が二つに分かれ、先のとがった葉には斜めの短い葉脈を入れます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, third row, first column from the right: 中ひらき枝さくら", ja: "左頁、三段目、右から一列目「中ひらき枝さくら」" }, read: "2026-11-27", measured: true },
  measured: "The three broad petal outlines, twig fork and veined leaf are measured from frame 37. The two side petals mirror one another. The twig and the leaf keep their printed directions.",
  build: nakaBirakiEdaZakuraBuild,
});
