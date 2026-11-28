// The mountain-and-valley snow ring, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { yamataniNoYukiwaBuild } from "./drawn/yukiwa-yamatani.ts";
import { defineCrest } from "./util.ts";

export const yamataniNoYukiwa = defineCrest({
  id: "yamatani-no-yukiwa",
  name: { en: "Mountain-and-valley snow ring", ja: "山谷の雪輪" },
  reading: "やまたにのゆきわ",
  romaji: "yamatani no yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["山谷のゆきわ"],
  construction: {
    en: "Six lozenges meet at the middle and make a six-pointed star, with points to the left and right. A small lozenge stands beyond each point. Over each notch of the star stands a broad jagged leaf that fills the band out to the layout circle: a body of two circles with seven pointed teeth round its outer half, three of them at the tip, and a short foot that narrows towards the notch. Each tooth is two equal bowed arcs from the body to a point. The six leaves, the six lozenges and the six small lozenges are each one unit turned a sixth of a turn at a time.",
    ja: "六つの菱を中央で合わせて、左右に先の向く六つの角の星を作ります。それぞれの角の先に、小さな菱を一つ置きます。星のへこみごとに、外の円まで届く幅の広いぎざぎざの葉を一枚立てます。葉は、二つの円で作る胴の外側半分に、とがった歯を七つつけ、そのうち三つを先に置き、根元はへこみに向かって細くします。歯はどれも、胴から先までを同じ二本の弧で描きます。六枚の葉、六つの菱、六つの小さな菱は、それぞれ一つを作って6分の1回転ずつ回します。",
  },
  measured: "Frame 41, in a reach of 103: the star's lozenges have their side corners about 27 out and their points about 44 to 47 out, drawn 46.8 so that each is a true lozenge. The small lozenges stand about 58 out and are about 18 by 14. The leaves are about 67 to 80 wide and 50 to 75 long, centred about 71 out; ours are 68 wide and 62 long. The print's leaves are freehand and uneven, with seven to nine teeth each; ours have seven teeth, 35 degrees apart about the leaf's middle, the three at the tip reaching the layout circle.",
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "left page, first row, second column from the right: 山谷のゆきわ", ja: "左頁、一段目、右から二列目「山谷のゆきわ」" }, read: "2026-11-28", measured: true },
  build: yamataniNoYukiwaBuild,
});
