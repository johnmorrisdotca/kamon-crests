// The flower-lozenge crane, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { hanabishiZuruBuild } from "./drawn/hanabishi-crane.ts";
import { defineCrest } from "./util.ts";

export const hanabishiZuru = defineCrest({
  id: "hanabishi-zuru",
  name: { en: "Flower-lozenge crane", ja: "花菱鶴" },
  reading: "はなびしづる",
  romaji: "hanabishi zuru",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }, { motif: "crane", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花びし鶴", "hanabishi crane"],
  construction: {
    en: "Three pointed petals of the flower lozenge make a flying crane. Two long petals spread to the left and right as wings, each with a notch near its tip, and a third stands between them as the tail, with three points. Each petal has one arc for every edge, ruled notches and a lens-shaped vein. The breast stands before the petals with three ruled points, like a calyx. The neck drops from it, turns to the left and ends in a small head with a paper eye and a pointed beak. The tail lies over the wings and the breast over all three.",
    ja: "花菱のとがった花びら三枚で、飛ぶ鶴を作ります。長い二枚を左右に広げて翼にし、どちらも先の近くに切れ込みを入れます。三枚目は二枚の間に立てて尾にし、先を三つに分けます。花びらの縁はどれも一本ずつの弧で描き、切れ込みは直線で、筋はレンズ形で入れます。胸は花びらの手前に置き、がくのように直線で三つの山を作ります。首は胸から下がって左へ曲がり、白い目ととがったくちばしのある小さな頭で終わります。尾は翼の上に、胸は三枚の上に重ねます。",
  },
  measured: "Frame 9, in a reach of about 108 from the body: the left wing's tip stands about 103 left and 21 below, with its second point about (-87, 18). The right wing's tip stands about 95 right and 23 below, with its second point about (74, 21). The tail's three points stand about (-28, 48), (10, 69) and (38, 49). The beak's tip is about 85 left and 72 below. The breast's upper edge has three points, about (-35, 0), (-10, 4) and (8, -9). The neck drops to about 40 below the body and turns left to the head.",
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, second row, second column from the right: 花びし鶴", ja: "右頁、二段目、右から二列目「花びし鶴」" }, read: "2026-11-28", measured: true },
  build: hanabishiZuruBuild,
});
