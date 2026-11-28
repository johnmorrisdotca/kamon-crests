import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/manji-uke.ts";
import { defineCrest } from "./util.ts";

export const maruNiUke = defineCrest({
  id: "maru-ni-uke",
  name: { en: "Square in four hooks in a ring", ja: "丸にうけ" },
  reading: "まるにうけ",
  romaji: "maru ni uke",
  frame: "ring-medium",
  motifs: [{ motif: "square-frame", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["丸ニうけ"],
  construction: {
    en: "A square cut into four equal hooks by two narrow white seams that cross at the middle, inside the package's medium ring. The square's side is 0.6 of the ring's outer diameter. Each seam starts a quarter of the way along one side, goes a quarter in, a quarter across, a half through the middle, then a quarter across and a quarter out to the opposite side. The second seam is the first turned a quarter-turn about the middle.",
    ja: "並みの太さの輪の中に、正方形を、中心で交わる二本の細い白い筋で同じ形の鉤形四つに分けて置きます。正方形の一辺は輪の外側の直径の0.6倍です。筋は、一つの辺の四分の一のところから入り、四分の一内へ、四分の一横へ進み、中心を通って半分進み、さらに四分の一横へ、四分の一外へ進んで向かいの辺へ出ます。二本目は、一本目を中心のまわりに四分の一回したものです。",
  },
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, fourth row, third column counted from the right: 丸ニうけ (a square in four hooks in a ring; measured, and drawn with compass and ruler)", ja: "左頁、四段目、右から三列目「丸ニうけ」（輪の中の、鉤形四つに分けた正方形。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the ring's outer outline is about 305 pixels across and its inner one 272. The square inside is about 188 wide and 177 high, drawn as one outline cut into four hooks by two white seams, each a double line about 6 apart, which cross once at the middle; each seam keeps to the quarter lines of the square and ends on a side a quarter from a corner. The printed square is a little taller than wide, and the drawing makes it square.",
  build: drawn.maruNiUkeBuild,
});
