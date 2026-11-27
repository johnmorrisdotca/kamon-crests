import { SHINSEN_MONCHO } from "./books.ts";
import { nakaBirakiEdaZakuraBuild } from "./drawn/sakura-branches.ts";
import { tabaneZakuraBuild } from "./drawn/tabane-zakura.ts";
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

export const tabaneZakura = defineCrest({
  id: "tabane-zakura",
  name: { en: "Tied cherry sprigs", ja: "束ね桜" },
  reading: "たばねざくら",
  romaji: "tabane zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 4, arrangement: "single" }],
  families: [],
  aliases: ["たばねさくら"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 37,
    place: {
      en: "left page, fourth row, first column from the right: たばねさくら",
      ja: "左頁、四段目、右から一列目「たばねさくら」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "Four blossom heads sit along two unequal sprays. Two long pointed leaves flank the tie, and the stalk ends fan out below it.",
  construction: {
    en: "Place five stock cherry petals with notches and short stamen marks at each of the four blossom heads. Cut equal white veins in the two long leaves, and cross the curved stalks with three cord bands.",
    ja: "切れ込みと短い雄しべのある花びらを五枚ずつ置き、桜の花を四つ作ります。二枚の細長い葉に同じ幅の白い葉脈を入れ、曲がる茎を三本の紐で結びます。",
  },
  placementBuild: { module: new URL("./drawn/tabane-zakura.ts", import.meta.url), export: "tabaneZakuraBuild" },
  build: tabaneZakuraBuild,
});
