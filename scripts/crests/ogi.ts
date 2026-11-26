import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuKumiawaseOgiBuild, ogiGurumaBuild, sanbonChigaiOgiBuild, chigaiOgiBuild, kasaneOgiBuild, maruNiNihonOgiBuild, gangiOgiBuild, nakahirakiChigaiOgiBuild, hirakiSueOgiBuild } from "./drawn/ogi.ts";
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
    ja: "閉じた扇を三本、中心に小さな空きを残して並べ、一本を真上に、残りの二本を左右に等しい角度で置きます。扇は先の広い二枚の地紙とまっすぐな親骨で作り、親骨の両側に細い白い線を残します。",
  },
  measured: "The upper fan's paper is 125 units long and 73 to 57 wide in the cell crop, and its spine projects about 28 beyond the paper. At the crest's scale these are rounded to 71, 42 to 32 and 16. The side fans are inclined about 16 and 28 degrees from horizontal in the print. Their axes are set at 22.5 degrees from horizontal on both sides.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, first row, second column from the right: 三ッ組合あふぎ", ja: "左頁、一段目、右から二列目「三ッ組合あふぎ」" }, read: "2026-11-26", measured: true },
  build: mitsuKumiawaseOgiBuild,
});

export const sanbonChigaiOgi = defineCrest({
  id: "sanbon-chigai-ogi",
  name: { en: "Three crossed folding fans", ja: "三本違い扇" },
  reading: "さんぼんちがいおうぎ",
  romaji: "sanbon chigai ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 3, arrangement: "crossed" }],
  families: [],
  aliases: ["三本違ひあふぎ"],
  construction: {
    en: "Three closed fans cross along three axes, with the broad ends pointing down and to the upper corners. A white gap beside each spine separates it from the fans beneath.",
    ja: "閉じた扇を三本交差させ、広い先を下と左右の上に向けます。親骨のわきに白いすき間を残し、その下の扇と分けます。",
  },
  measured: "The lower fan's paper is about 120 units long in the cell crop, its tip and shoulder 70 and 49 wide. Its spine reaches about 150 above that shoulder. Rounded on the layout these are 70, 40, 32 and 89. The two upper fans stand 60 degrees off upright and their tips are 44 units wide.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, second row, first column from the right: 三本違ひあふぎ", ja: "左頁、二段目、右から一列目「三本違ひあふぎ」" }, read: "2026-11-26", measured: true },
  build: sanbonChigaiOgiBuild,
});

export const ogiGuruma = defineCrest({
  id: "ogi-guruma",
  name: { en: "Folding-fan wheel", ja: "扇車" },
  reading: "おうぎぐるま",
  romaji: "ōgi guruma",
  frame: "none",
  motifs: [{ motif: "fan", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["扇ぐるま"],
  construction: {
    en: "Eight closed fans radiate from a small round hub. Each straight spine divides two tapered paper panels. The fans are set exactly 45 degrees apart.",
    ja: "小さな丸い中心のまわりに、閉じた扇を八本並べます。扇はまっすぐな親骨をはさんで、先の広い二枚の地紙を置きます。扇の間隔はちょうど45度です。",
  },
  measured: "The wheel in the cell spans about 290 units in the crop, and the hub about 33. The upper fan's paper measures about 112 long, from 60 wide at its outer edge to 28 near the spine's foot. The construction has a 20-unit hub and paper 72 long and 38 to 18 wide.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, first row, second column from the right: 扇ぐるま", ja: "右頁、一段目、右から二列目「扇ぐるま」" }, read: "2026-11-26", measured: true },
  build: ogiGurumaBuild,
});

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

export const kasaneOgi = defineCrest({
  id: "kasane-ogi",
  name: { en: "Two overlapping folding fans", ja: "重ね扇" },
  reading: "かさねおうぎ",
  romaji: "kasane ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["かさねあふぎ"],
  construction: {
    en: "Two open fans overlap. The rounded paper faces follow concentric arcs about their pivots, with the rear pivot set higher. Seven ribs radiate from the front pivot, with rounded feet and a fine white gap beside the right guard.",
    ja: "開いた扇を二つ重ねます。丸い地紙はそれぞれの要を中心とする円弧で作り、奥の要を高いところに置きます。手前の要から丸い骨尻のある七本の骨を広げ、右の親骨と地紙の間に細い白を残します。",
  },
  measured: "The front paper has an opening about 108 degrees wide in the crop. Its outer and inner arcs are about 185 and 87 from the pivot, and the rear paper rises 53 above the front. The construction uses radii 115 and 54 and raises the rear pivot by 32. The rear face is slightly narrower to stay within the layout circle. The visible ribs are ruled four units wide.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, third row, second column from the right: かさねあふぎ", ja: "右頁、三段目、右から二列目「かさねあふぎ」" }, read: "2026-11-26", measured: true },
  build: kasaneOgiBuild,
});

export const gangiOgi = defineCrest({
  id: "gangi-ogi",
  name: { en: "Stepped folding fan", ja: "雁木扇" },
  reading: "がんぎおうぎ",
  romaji: "gangi ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["がんぎあふぎ"],
  construction: {
    en: "The paper has a ruled stepped rim and a circular cut along its foot. The guard stands to the right of the six other ribs, with a narrow white gap between.",
    ja: "地紙の上を段のある直線で作り、下を円弧で切ります。六本の骨の右に親骨を置き、その間に細い白を残します。",
  },
  measured: "The numbered cell shows a paper crown about 310 wide and 100 high in the crop, measured down to the side tips. The rim is redrawn symmetrically on six steps each side of the top, with tips 186 apart and the crown 63 above them. The lower paper arc is set 53 from the pivot.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, first row, fourth column from the right: がんぎあふぎ", ja: "右頁、一段目、右から四列目「がんぎあふぎ」" }, read: "2026-11-26", measured: true },
  build: gangiOgiBuild,
});

export const nakahirakiChigaiOgi = defineCrest({
  id: "nakahiraki-chigai-ogi",
  name: { en: "Two crossed half-open folding fans", ja: "中開き違い扇" },
  reading: "なかひらきちがいおうぎ",
  romaji: "nakahiraki chigai ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["中ひらきちがひ扇"],
  construction: {
    en: "Two half-open fans cross, with the right-hand paper in front. Each paper has a ruled stepped tip, a short arc above the pivot and a straight guard. Two narrow ruled seams mark the folds.",
    ja: "中ほどまで開いた扇を二つ交差させ、右の地紙を手前に置きます。それぞれの地紙に段のある先と要の上の短い円弧を作り、まっすぐな親骨を置きます。折り目には二本の細い白を入れます。",
  },
  measured: "The cell's pivot and side tips are rounded to grid positions. The front pivot is 59 left and 54 below centre; its paper begins along a 47-radius arc and reaches up to 65 above centre on its inner stepped edge. The left paper is constructed with the same opening and the front guard separates the crossing.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, third row, third column from the right: 中ひらきちがひ扇", ja: "左頁、三段目、右から三列目「中ひらきちがひ扇」" }, read: "2026-11-26", measured: true },
  build: nakahirakiChigaiOgiBuild,
});

export const hirakiSueOgi = defineCrest({
  id: "hiraki-sue-ogi",
  name: { en: "Open folding fan with a stepped edge", ja: "開き末扇" },
  reading: "ひらきすえおうぎ",
  romaji: "hiraki sue ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ひらき末扇"],
  construction: {
    en: "A stepped paper edge spreads above exposed ribs. A thicker guard reaches from the hinge to one side, above a short flared tail.",
    ja: "段のある紙の下に骨を出します。要から片側に太い親骨を伸ばし、下に短く開く骨の端を残します。",
  },
  measured: "The stepped edge is high across the middle and drops to either corner. Three upward points are prominent, and the right guard is heavier than the ribs.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, second row, second column from the right: ひらき末扇", ja: "左頁、二段目、右から二列目「ひらき末扇」" }, read: "2026-11-26", measured: true },
  build: hirakiSueOgiBuild,
});
