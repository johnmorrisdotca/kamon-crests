import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuIrekoItomakiBuild } from "./drawn/itomaki.ts";
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
