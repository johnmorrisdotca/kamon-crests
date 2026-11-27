import { SHINSEN_MONCHO } from "./books.ts";
import { hidariHitotsuChojiTomoeBuild } from "./drawn/choji-tomoe.ts";
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
