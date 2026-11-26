import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuKumiawaseOgiBuild } from "./drawn/ogi.ts";
import { defineCrest } from "./util.ts";

export const mitsuKumiawaseOgi = defineCrest({
  id: "mitsu-kumiawase-ogi",
  name: { en: "Three folding fans joined together", ja: "三つ組合せ扇" },
  reading: "みつくみあわせおうぎ",
  romaji: "mitsu kumiawase ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ組合あふぎ"],
  construction: {
    en: "Three closed fans radiate from a small opening, one upright and the other two set equally to either side. Each has two tapered panels of paper and a straight spine, with a white seam on either side.",
    ja: "閉じた扇を三本、中心に小さな空きを残して並べ、一本を真上に、残りの二本を左右に等しい角度で置きます。扇は先の広い二枚の地紙とまっすぐな親骨で作り、親骨の両側に細い白を残します。",
  },
  measured: "The upper fan's paper is 125 units long and 73 to 57 wide in the cell crop, and its spine projects about 28 beyond the paper. At the crest's scale these are rounded to 71, 42 to 32 and 16. The side fans are inclined about 16 and 28 degrees from horizontal in the print. Their axes are set at 22.5 degrees from horizontal on both sides.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, first row, second column from the right: 三ッ組合あふぎ", ja: "左頁、一段目、右から二列目「三ッ組合あふぎ」" }, read: "2026-11-26", measured: true },
  build: mitsuKumiawaseOgiBuild,
});
