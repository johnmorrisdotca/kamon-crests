import { SHINSEN_MONCHO } from "./books.ts";
import { hidariHitotsuChojiTomoeBuild, kumiawaseFutatsuChojiBuild } from "./drawn/choji-tomoe.ts";
import { defineCrest } from "./util.ts";

export const hidariHitotsuChojiTomoe = defineCrest({
  id: "hidari-hitotsu-choji-tomoe",
  name: { en: "Left single clove comma", ja: "左一つ丁子巴" },
  reading: "ひだりひとつちょうじともえ",
  romaji: "hidari hitotsu chōji tomoe",
  frame: "none",
  motifs: [{ motif: "clove", count: 1, arrangement: "single" }, { motif: "tomoe", count: 1, arrangement: "single", turn: "left" }],
  families: [],
  aliases: ["左り一ッ丁子ともへ"],
  construction: { en: "A left-turning comma wraps around three rounded clove petals. A white seam separates the petals from both sides of the horn.", ja: "左へ回る巴が丸い丁子の花びら三枚を巻きます。花びらと巴の間の両側に、白いすき間を残します。" },
  measured: "The outer circle, the two curved edges of the horn and the three petal widths and positions are measured from the cell. The hairline around the group is broadened into a separate white gap.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, second row, first column from the right: 左り一ッ丁子ともへ", ja: "右頁、二段目、右から一列目「左り一ッ丁子ともへ」" }, read: "2026-11-27", measured: true },
  build: hidariHitotsuChojiTomoeBuild,
});

export const kumiawaseFutatsuChoji = defineCrest({
  id: "kumiawase-futatsu-choji",
  name: { en: "Two joined cloves", ja: "組合せ二つ丁子" },
  reading: "くみあわせふたつちょうじ",
  romaji: "kumiawase futatsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 2, arrangement: "radial" }, { motif: "tomoe", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["組合二ッちやうじ"],
  construction: { en: "Two comma-shaped cloves lock together and fill the circle, each tail running round behind the other's head. Three petals with wavy edges open from each head over the other clove.", ja: "巴の形をした丁子二つを組み合わせて円を埋め、それぞれの尾を相手の頭の後ろへ回します。それぞれの頭から、ふちが波の形の花びらを三枚、相手の上に開きます。" },
  measured: "The outer circle, the two heads, the tail edges and the size and place of the six petals are measured from the cell. The cell's lines between the cloves and around the petals are white gaps in ours, and the two halves are an exact half turn of each other.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, second row, second column from the right: 組合二ッちやうじ", ja: "右頁、二段目、右から二列目「組合二ッちやうじ」" }, read: "2026-11-28", measured: true },
  build: kumiawaseFutatsuChojiBuild,
});
