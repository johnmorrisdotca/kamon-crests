import { SHINSEN_MONCHO } from "./books.ts";
import { chigaiOgiBuild, maruNiNihonOgiBuild } from "./drawn/ogi.ts";
import { defineCrest } from "./util.ts";

export const maruNiNihonOgi = defineCrest({
  id: "maru-ni-nihon-ogi",
  name: { en: "Two folding fans in a circle", ja: "丸に二本扇" },
  reading: "まるににほんおうぎ",
  romaji: "maru ni nihon ōgi",
  frame: "ring-medium",
  motifs: [{ motif: "fan", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["丸ニ二本扇"],
  construction: {
    en: "Two closed fans stand side by side in a ring. Each has tapered paper panels beside a straight spine and a small round rivet hole at the foot.",
    ja: "輪の中に閉じた扇を二本並べます。それぞれの扇はまっすぐな親骨の両側に先の広い地紙を置き、親骨の下に小さな丸い穴をあけます。",
  },
  measured: "The ring is about 312 units across in the crop. The two spine axes are about 104 apart, the paper about 145 long and 82 wide at the top, and the feet about 122 below the ring centre. The motif uses axes 60 apart, paper 86 long and 52 wide, and feet 67 below the layout centre, with the package's medium ring weight and a four-unit rivet hole in each spine.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, fourth row, second column from the right: 丸ニ二本扇", ja: "左頁、四段目、右から二列目「丸ニ二本扇」" }, read: "2026-11-26", measured: true },
  build: maruNiNihonOgiBuild,
});

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
