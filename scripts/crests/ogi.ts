import { SHINSEN_MONCHO } from "./books.ts";
import { hachihonboneHinomaruOgiBuild, mitsuKumiawaseOgiBuild, ogiGurumaBuild, sanbonChigaiOgiBuild } from "./drawn/ogi.ts";
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
    ja: "閉じた扇を三本交差させ、広い先を下と左右の上に向けます。親骨のわきに細い白を残し、その下の扇と分けます。",
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
    ja: "小さな丸い中心のまわりに、閉じた扇を八本並べます。扇はまっすぐな親骨をはさんで、先の広い二枚の地紙を置きます。扇の間隔は45度です。",
  },
  measured: "The wheel in the cell spans about 290 units in the crop, and the hub about 33. The upper fan's paper measures about 112 long, from 60 wide at its outer edge to 28 near the spine's foot. The construction has a 20-unit hub and paper 72 long and 38 to 18 wide.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, first row, second column from the right: 扇ぐるま", ja: "右頁、一段目、右から二列目「扇ぐるま」" }, read: "2026-11-26", measured: true },
  build: ogiGurumaBuild,
});

export const hachihonboneHinomaruOgi = defineCrest({
  id: "hachihonbone-hinomaru-ogi",
  name: { en: "Eight-rib folding fan with a sun disc", ja: "八本骨日の丸扇" },
  reading: "はっぽんぼねひのまるおうぎ",
  romaji: "happonbone hinomaru ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 1, arrangement: "single" }, { motif: "sun-disc", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["八本骨日の丸扇"],
  construction: {
    en: "Eight bones radiate from the pivot, with the one on the right forming the guard. Two circular arcs bound the paper. The sun disc stands inside the paper, with a fine white line round it.",
    ja: "要から八本の骨を広げ、右の骨を親骨にします。地紙は二つの円弧で作ります。地紙の内側に日の丸を置き、そのまわりに細い白を残します。",
  },
  measured: "The opening is about 108 degrees in the print. The outer and inner paper arcs reach about 197 and 97 units above the pivot in the crop. On the page these radii are 116 and 57. The sun is about 46 in radius and stands about 146 above the pivot in the crop. Its construction radius is 27 and its centre is 86 above the pivot.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "right page, third row, fourth column from the right: 八本骨日の丸扇", ja: "右頁、三段目、右から四列目「八本骨日の丸扇」" }, read: "2026-11-26", measured: true },
  build: hachihonboneHinomaruOgiBuild,
});
