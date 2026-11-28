import { SHINSEN_MONCHO } from "./books.ts";
import { shoNoJiBishiBuild } from "./drawn/sho-no-ji-bishi.ts";
import { defineCrest } from "./util.ts";

export const shoNoJiBishi = defineCrest({
  id: "sho-no-ji-bishi",
  name: { en: "Character small in a lozenge", ja: "小の字菱" },
  reading: "しょうのじびし",
  romaji: "shō no ji bishi",
  frame: "none",
  motifs: [{ motif: "sho-no-ji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["小の字ひし"],
  construction: {
    en: "A lozenge is cut into three by two bowed white lines: the middle piece is the stem of 小 and the two side pieces its strokes.",
    ja: "菱を、弓なりの白い線二本で三つに分けます。真ん中が「小」の縦画、左右がその両側の点です。",
  },
  measured: "The book's lozenge, in its pixels from its middle: its corners 161.25 to either side and 122.5 above and below; each white line through 72.5 out at 66 above and below the middle and 52.5 out at the middle, 4 wide. The book's left line bows in to 61 and its right to 44; these are their average, and the lozenge is set level (the book's tilts by about 12).",
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, first row, third column from the right: 小の字ひし", ja: "左頁、一段目、右から三列目「小の字ひし」" }, read: "2026-11-28", measured: true },
  build: shoNoJiBishiBuild,
});
