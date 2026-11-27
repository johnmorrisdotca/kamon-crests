import { SHINSEN_MONCHO } from "./books.ts";
import { kurusuBishiBuild } from "./drawn/kurusu-bishi.ts";
import { defineCrest } from "./util.ts";

export const kurusuBishi = defineCrest({
  id: "kurusu-bishi",
  name: { en: "Floral cross in a lozenge", ja: "クルス菱" },
  reading: "くるすびし",
  romaji: "kurusu bishi",
  frame: "none",
  motifs: [{ motif: "cross", count: 1, arrangement: "single" }, { motif: "diamond", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["くるすひし"],
  construction: {
    en: "A lozenge has a three-lobed cap outside each corner. A floral cross fills the middle, with flared leaves between its four arms and a round centre.",
    ja: "菱の四つの角の外に、三つのふくらみのある飾りを置きます。内側には花形の十字を収め、四本の腕の間に広がる葉を置き、中心を丸くします。",
  },
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, fourth row, first column from the right: くるすひし", ja: "左頁、四段目、右から一列目「くるすひし」" }, read: "2026-11-27", measured: true },
  measured: "The lozenge and the two cap profiles take their widths and heights from the cell, with the lateral caps reaching farther than the upright pair. The four flared leaves and the round centre repeat the quarters of the printed cross. The lozenge is set square to its axes.",
  build: kurusuBishiBuild,
});
