import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiSanbonGasaBuild } from "./drawn/maru-ni-sanbon-gasa.ts";
import { defineCrest } from "./util.ts";

export const maruNiSanbonGasa = defineCrest({
  id: "maru-ni-sanbon-gasa",
  name: { en: "Three umbrellas in a ring", ja: "丸に三本傘" },
  reading: "まるにさんぼんがさ",
  romaji: "maru ni sanbon gasa",
  frame: "ring-medium",
  motifs: [{ motif: "umbrella", count: 3, arrangement: "crossed" }],
  families: [],
  aliases: ["丸ニ三本傘"],
  construction: {
    en: "Strike a ring. Lay three closed umbrellas across its middle a sixth of a turn apart, the one leaning to the lower right at the back and the one leaning to the upper right in front. Each is a folded canopy narrowing to a round head, its lower end a bowl under the rim of the folds, with the handle standing out to the ring.",
    ja: "輪を打ちます。閉じた傘を三本、六分の一回りずつずらして輪の真ん中で交差させ、右下へ傾く傘をいちばん奥に、右上へ傾く傘をいちばん手前に置きます。どの傘も、たたんだ紙が丸い頭へ細くなり、下の端は折り目のふちの下の丸い底で、柄が輪まで出ます。",
  },
  measured: "The book's cell, in its pixels from the ring's centre: the ring from 129.5 to 154.4 out; each umbrella's head a disc of about 17 at 111 out; the canopy's sides through 17 out at 104 and 30 out at 87 the other way; the bowl's foot bowing to 102 and the rim of the folds over it to 73; the handle 10 wide, out to the ring. The book's umbrellas lean at 0, 61 and 117 degrees and are drawn a sixth of a turn apart; its front umbrella is drawn wider at the foot than the other two, here all three alike; its many fold lines are drawn as four.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, third row, first column from the right: 丸ニ三本傘", ja: "左頁、三段目、右から一列目「丸ニ三本傘」" }, read: "2026-11-28", measured: true },
  build: maruNiSanbonGasaBuild,
});
