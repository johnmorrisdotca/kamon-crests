import { SHINSEN_MONCHO } from "./books.ts";
import { kasumiZukiBuild } from "./drawn/kasumi-zuki.ts";
import { defineCrest } from "./util.ts";

export const kasumiZuki = defineCrest({
  id: "kasumi-zuki",
  name: { en: "Moon in the haze", ja: "霞月" },
  reading: "かすみづき",
  romaji: "kasumi zuki",
  frame: "none",
  motifs: [{ motif: "cloud", count: 1, arrangement: "stacked" }],
  families: [],
  aliases: ["かすみ月"],
  source: { ...SHINSEN_MONCHO, frame: 23, place: { en: "right page, row 3, third column from the right: かすみ月 (measured, and drawn with compass and ruler)", ja: "右頁、三段目、右から三列目「かすみ月」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Three round-ended bars lie one above the next, the top and bottom ones shifted a little in, and are joined into one haze: the top and middle bars are open to the left with a narrow slot between them, and the middle and bottom bars are open at both ends with a narrow slot at each. A thin crescent is cut out of the haze, curving round its right and lower side from the top bar down to the middle bar. In the printed cell the haze is about 870 wide and 740 high, the bars about 205 to 245 high, and the crescent about 580 from tip to tip and about 33 across at its widest. The printed bars are uneven at their ends, and the drawing makes them plain rounded bars.",
  construction: {
    en: "Rule three bars with round corners, the middle one the widest, and fill the gap between each pair except at its slot, which is closed at its inner end with a half-round. Strike two circles through the same two points, 49 across the radius, so that the space between them is a crescent 5.5 across at its widest, and cut it out of the haze.",
    ja: "角を丸めた棒を三本、中の棒をいちばん長く引きます。棒と棒のすき間は、スロットのところを除いてふさぎ、スロットの奥は半円で閉じます。同じ二点を通る半径約49の円を二つ描いて、その間にできる、いちばん広いところで5.5の三日月を、霞から切り抜きます。",
  },
  build: kasumiZukiBuild,
});
