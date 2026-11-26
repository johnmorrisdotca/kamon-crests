import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiMitsuChigiriBuild, mitsuChigiriBuild } from "./drawn/chigiri.ts";
import { defineCrest } from "./util.ts";

export const mitsuChigiri = defineCrest({
  id: "mitsu-chigiri",
  name: { en: "Three joined weaving beams", ja: "三つ千切" },
  reading: "みつちぎり",
  romaji: "mitsu chigiri",
  frame: "none",
  motifs: [{ motif: "weaving-beam", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三ッ千切"],
  construction: {
    en: "Three slanting square heads fit together. Small right-angled cuts at the joins keep the three forms readable.",
    ja: "傾けた四角い頭を三つ組み合わせます。継ぎ目に小さな直角の切り込みを残し、三つの形を見せます。",
  },
  measured: "The top point is over the middle between the lower two heads. Both side joins have two short edges stepping inward before the outer square resumes. The drawing balances the notches about the vertical.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, third row, first column from the right: 三ッ千切", ja: "左頁、三段目、右から一列目「三ッ千切」" }, read: "2026-11-26", measured: true },
  build: mitsuChigiriBuild,
});

export const maruNiMitsuChigiri = defineCrest({
  id: "maru-ni-mitsu-chigiri",
  name: { en: "Three weaving beams in a circle", ja: "丸に三つ千切" },
  reading: "まるにみつちぎり",
  romaji: "maru ni mitsu chigiri",
  frame: "ring-medium",
  motifs: [{ motif: "weaving-beam", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["丸に三ッ千切"],
  construction: {
    en: "A round frame encloses three fitted weaving beams. The small stepped joins remain visible inside the circle.",
    ja: "丸の中に千切を三つ組みます。小さな段のある継ぎ目を丸の内側に見せます。",
  },
  measured: "The same triangular group occupies the middle two-thirds of the circular crest. The margins above and below the group are balanced.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, fourth row, first column from the right: 丸に三ッ千切", ja: "左頁、四段目、右から一列目「丸に三ッ千切」" }, read: "2026-11-26", measured: true },
  build: maruNiMitsuChigiriBuild,
});
