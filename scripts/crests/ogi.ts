import { SHINSEN_MONCHO } from "./books.ts";
import { chigaiOgiBuild } from "./drawn/ogi.ts";
import { defineCrest } from "./util.ts";

export const chigaiOgi = defineCrest({
  id: "chigai-ogi",
  name: { en: "Two crossed folding fans", ja: "違い扇" },
  reading: "ちがいおうぎ",
  romaji: "chigai ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["ちがひあふぎ"],
  construction: {
    en: "Two tapered closed fans cross on diagonals, each 47.5 degrees from upright. The front fan rises from the lower left and a narrow white gap separates it from the back fan.",
    ja: "先の広い閉じた扇を、縦から47.5度の斜めの線に沿って交差させます。手前の扇は左下から右上へ伸ばし、奥の扇との間に細い白を残します。",
  },
  measured: "The paper in front is about 76 units wide at the broad end and 49 at the shoulder in the cell crop. The butt is about 160 from the centre crossing. On the layout the near paper is 44 to 28 wide and the butt 93 from the crossing. The slightly narrower paper on the fan behind is 40 to 24 wide. Both axes use the mean of the 45- and 50-degree angles in the print.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, fourth row, first column from the right: ちがひあふぎ", ja: "右頁、四段目、右から一列目「ちがひあふぎ」" }, read: "2026-11-26", measured: true },
  build: chigaiOgiBuild,
});
