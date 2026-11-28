import { SHINSEN_MONCHO } from "./books.ts";
import { kakeMitsuChigiriBuild, kakugiriChigiriBuild, maruNiChigaiChigiriBuild, maruNiMitsuChigiriBuild, mitsuChigiriBuild } from "./drawn/chigiri.ts";
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

export const maruNiChigaiChigiri = defineCrest({
  id: "maru-ni-chigai-chigiri",
  name: { en: "Crossed weaving beams in a circle", ja: "丸に違い千切" },
  reading: "まるにちがいちぎり",
  romaji: "maru ni chigai chigiri",
  frame: "ring-thin",
  motifs: [{ motif: "weaving-beam", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["丸にちがひちぎり"],
  construction: {
    en: "Two beams cross in a thin ring. Their four heads flare out, and a narrow seam keeps the front beam legible.",
    ja: "細い輪の中に千切を二つ交差させて収めます。四つの頭を広げ、細いすき間で手前の一本を見せます。",
  },
  measured: "The four broad heads reach close to the inner circle. The print carries the front beam across the centre from lower left to upper right.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, third row, second column from the right: 丸にちがひちぎり", ja: "左頁、三段目、右から二列目「丸にちがひちぎり」" }, read: "2026-11-26", measured: true },
  build: maruNiChigaiChigiriBuild,
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

export const kakeMitsuChigiri = defineCrest({
  id: "kake-mitsu-chigiri",
  name: { en: "Three linked weaving beams", ja: "掛け三つ千切" },
  reading: "かけみつちぎり",
  romaji: "kake mitsu chigiri",
  frame: "none",
  motifs: [{ motif: "weaving-beam", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["かけ三ッ千切"],
  construction: {
    en: "Stand three square frames on their corners. Put one above the other two and rule a pair of parallel bars across each of the two upper joins.",
    ja: "三つの四角い枠を角で立てます。一つを上、二つを下に置き、上の枠と下の枠をつなぐ平行線を二本ずつ引きます。",
  },
  measured: "Three equal slanted frames form a low triangle. Two short parallel links attach each lower frame to the upper frame. A little white space remains between each pair of links.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, first row, second column from the right: かけ三ッ千切", ja: "左頁、一段目、右から二列目「かけ三ッ千切」" }, read: "2026-11-27", measured: true },
  build: kakeMitsuChigiriBuild,
});

export const kakugiriChigiri = defineCrest({
  id: "kakugiri-chigiri",
  name: { en: "Three corner-cut weaving beams", ja: "角切り千切" },
  reading: "かくぎりちぎり",
  romaji: "kakugiri chigiri",
  frame: "none",
  motifs: [{ motif: "weaving-beam", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["角切ちぎり"],
  construction: {
    en: "Three rings with their corners cut off stand one above two, their facing corners nearly meeting. Each is the band between two corner-cut squares.",
    ja: "角を切った輪を三つ、一つを上に二つを下に置き、向かい合う角をほとんど合わせます。どれも角を切った二つの四角の間の帯です。",
  },
  measured: "The book's rings, in its pixels: each outside 113 across and 100 high, its flat top and foot 39 long and its upright sides 26; each inside 74 across and 66 high, its top 33 and its sides 25. The lower rings stand 81 to either side of the upper one and 73 below it, so the facing cut corners are 11 apart. The book draws a small notch where each pair of corners nearly meets; it is left out.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, second row, second column from the right: 角切ちぎり", ja: "左頁、二段目、右から二列目「角切ちぎり」" }, read: "2026-11-28", measured: true },
  build: kakugiriChigiriBuild,
});
