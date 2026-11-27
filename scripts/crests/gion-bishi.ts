import { SHINSEN_MONCHO } from "./books.ts";
import { gionMamoriBishiBuild } from "./drawn/gion-bishi.ts";
import { defineCrest } from "./util.ts";

export const gionMamoriBishi = defineCrest({
  id: "gion-mamori-bishi",
  name: { en: "Gion amulet in a lozenge", ja: "祇園守菱" },
  reading: "ぎおんまもりびし",
  romaji: "gion mamori bishi",
  frame: "none",
  motifs: [{ motif: "gion-amulet", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["きおん守ひし", "ぎおん守ひし"],
  construction: {
    en: "Rule the sides of a broad lozenge and the crossbar through its middle. Place two crossed scrolls above the bar. Show the curled paper at their upper ends and the narrow threads of their tie at the crossing.",
    ja: "横長の菱と中央の横棒を引き、その上に巻物を二本交差させます。上端には巻いた紙が見えるようにし、交差する所には結び目の細い筋を入れます。",
  },
  measured: "The print shows a broad lozenge about 192 by 152, with an inner opening about 176 by 139 and a central bar about 7 thick. The two scrolls lean about 54 degrees from upright, with rounded ends about 9 in radius. Six small openings mark the tips of the lozenge. Three curved cuts mark the central tie, whose circle centres are set 5 units apart on one diagonal.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "left page, first row, fourth column from the right: きおん守ひし", ja: "左頁、一段目、右から四列目「きおん守ひし」" }, read: "2026-11-27", measured: true },
  build: gionMamoriBishiBuild,
});
