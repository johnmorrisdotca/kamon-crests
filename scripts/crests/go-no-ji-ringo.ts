import { SHINSEN_MONCHO } from "./books.ts";
import { goNoJiRingoBuild } from "./drawn/go-no-ji-ringo.ts";
import { defineCrest } from "./util.ts";

export const goNoJiRingo = defineCrest({
  id: "go-no-ji-ringo",
  name: { en: "Character five in ring-drum form", ja: "五の字輪鼓" },
  reading: "ごのじりんご",
  romaji: "go no ji ringo",
  frame: "none",
  motifs: [{ motif: "go-no-ji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["五の字りんこ"],
  construction: {
    en: "Two rounded horizontal caps sit above and below two crossed bands. The bands meet the caps on four short uprights, leaving a pointed opening above and below the join.",
    ja: "両端を丸くした横棒二本の間に、帯二本を交差させます。四本の短い縦線で帯と横棒をつなぎ、交差の上下に先のとがった空きを残します。",
  },
  measured: "The printed outline spans about 242 pixels and rises about 269. A horizontal cap is about 40 pixels thick and the left and right uprights are about 165 pixels apart. The drawing uses a span of 135.2, height 149.2, caps 23.2 thick and upright outside edges 92 apart. The two horizontal caps reflect across the centre, and the ruling regularises the two crossing bands.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 13,
    place: { en: "left page, second row, fourth column from the right: 五の字りんこ", ja: "左頁、二段目、右から四列目「五の字りんこ」" },
    read: "2026-11-26",
    measured: true,
  },
  build: goNoJiRingoBuild,
});
