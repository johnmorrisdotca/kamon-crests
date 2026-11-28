// The split flower lozenge, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { wariHanabishiBuild } from "./drawn/hanabishi-split.ts";
import { defineCrest } from "./util.ts";

export const wariHanabishi = defineCrest({
  id: "wari-hanabishi",
  name: { en: "Split flower lozenge", ja: "割り花菱" },
  reading: "わりはなびし",
  romaji: "wari hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["ワリ花びし", "divided hanabishi"],
  construction: {
    en: "Two half flowers face each other inside one broad lozenge, their hearts on its upper and lower corners. Each sends one scalloped petal towards the middle, where the two tips almost meet, and two side petals along the lozenge's edges to its side corners. A paper channel runs across the middle from corner to corner, wide beside the petals' shoulders and closing to a point at each side.",
    ja: "横に広い一つの菱形の中に、半分の花を二つ向かい合わせます。花の中心は菱の上下の角に置きます。どちらも丸いふくらみのある花びら一枚を中央へ向け、その先どうしを近づけ、左右の花びら二枚を菱の辺に沿わせて横の角まで伸ばします。中央には角から角へ白いすき間が通り、花びらの肩のあたりで広く、左右の角で閉じます。",
  },
  measured: "Frame 9: the lozenge is about 1.46 times as wide as it is tall, drawn 192 by 132. From each heart, the inward petal reaches about 64 of the 66 to the middle and its flanks open about 28 degrees either side. The tip lobe is about 27 across and the shoulders about 23. The side petals' inner edges run from the shoulders to the side corners. The centre stamen reaches about 42 from the corner and the side stamens about 28. The print's lozenge leans by about 2 degrees and its lower petal is a little longer than its upper; ours is upright and the two halves are equal.",
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, first row, second column from the right: ワリ花びし", ja: "右頁、一段目、右から二列目「ワリ花びし」" }, read: "2026-11-28", measured: true },
  build: wariHanabishiBuild,
});
