import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuIrekoItomakiBuild } from "./drawn/itomaki.ts";
import { mutsuItomakiBuild } from "./drawn/mutsu-itomaki.ts";
import { defineCrest } from "./util.ts";

export const mitsuIrekoItomaki = defineCrest({
  id: "mitsu-ireko-itomaki",
  name: { en: "Three nested thread spools", ja: "三つ入れ子糸巻" },
  reading: "みついれこいとまき",
  romaji: "mitsu ireko itomaki",
  frame: "none",
  motifs: [{ motif: "thread-spool", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三ッ入子いとまき", "三つ入子糸巻"],
  construction: {
    en: "Concave-sided spool outlines nest about one centre. Their inward-bowing sides sit between four outward points.",
    ja: "辺のくぼんだ糸巻の輪郭を、中心をそろえて入れ子にします。内側へ曲がる辺の間に四つの角が出ます。",
  },
  measured: "Four profiles of about 157, 114, 74 and 35 in reach can be seen in the cell. The layout uses 96, 71, 47 and 23, and follows the same concave shape at each size.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, second row, second column from the right: 三ッ入子いとまき", ja: "左頁、二段目、右から二列目「三ッ入子いとまき」" }, read: "2026-11-26", measured: true },
  build: mitsuIrekoItomakiBuild,
});

export const mutsuItomaki = defineCrest({
  id: "mutsu-itomaki",
  name: { en: "Six thread-spool plates", ja: "六つ糸巻" },
  reading: "むついとまき",
  romaji: "mutsu itomaki",
  frame: "none",
  motifs: [{ motif: "thread-spool", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["六ッ糸巻"],
  construction: {
    en: "Six spool plates turn like a pinwheel about a flower of six lens petals on a round boss. Each plate runs out from the tip of one petal to the tip of the next, its outer edge drawn in between two horns, the clockwise horn farther out.",
    ja: "六枚の糸巻の板を、丸い芯と六枚のレンズ形の花びらのまわりに風車のように回して置きます。どの板も一枚の花びらの先から次の花びらの先まで広がり、外の辺は二つの角の間でくぼみ、時計回り側の角がより外に出ます。",
  },
  measured: "The book's crest, in its pixels from the boss's centre: the boss 25 in radius; the petals lenses from inside it to tips 105.7 out, 22 across at 65 out, a sixth of a turn apart. Each plate's near horn stands 132.2 out, 4.6 degrees anticlockwise of its petal, and its far horn 169 out, 29.8 degrees clockwise (the book's six differ by about 3 degrees); the outer edge is an arc through 132.8 out at 15.8 degrees, and the far side an arc through 142.2 out at 38.6 degrees to the next petal's tip. The flower lies over the plates with a white of 2.5.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, first row, second column from the right: 六ッ糸巻", ja: "左頁、一段目、右から二列目「六ッ糸巻」" }, read: "2026-11-28", measured: true },
  build: mutsuItomakiBuild,
});
