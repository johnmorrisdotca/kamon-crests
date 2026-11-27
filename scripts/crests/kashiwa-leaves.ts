import { mitsubaGashiwaBuild } from "./drawn/mitsuba-gashiwa.ts";
import { kabuGashiwaBuild } from "./drawn/kashiwa-leaves.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const kabuGashiwa = defineCrest({
  id: "kabu-gashiwa",
  name: { en: "Three pointed oak leaves", ja: "かぶ柏" },
  reading: "かぶかしわ",
  romaji: "kabu gashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["かぶかしワ"],
  construction: { en: "Three jagged oak leaves turn away from a round heart.", ja: "丸い中心から、縁がぎざぎざの柏を三枚、外へ向けて開きます。" },
  measured: "The veins and unequal edge tips follow the same measured lobe in each third.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, fourth row, second column from the right: かぶかしワ", ja: "右頁、四段目、右から二列目「かぶかしワ」" }, read: "2026-11-26", measured: true },
  build(c) {
    kabuGashiwaBuild(c);
  },
});

export const mitsubaGashiwa = defineCrest({
  id: "mitsuba-gashiwa",
  name: { en: "Three notched oak leaves", ja: "三つ葉柏" },
  reading: "みつばがしわ",
  romaji: "mitsuba gashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["三ッ葉かしは"],
  construction: {
    en: "One shallow-notched oak leaf is placed three times, with the upright leaf larger. Four paired veins keep the same physical width.",
    ja: "浅い切れ込みの柏の葉を三枚置き、中央を大きくします。左右四本ずつの葉脈は同じ太さにそろえます。",
  },
  measured: "The printed three-leaf fan has a larger upright blade, pointed tips, shallow edge notches, curved veins and a common foot. The two side leaves are exact mirrors. Every vein is 1.15 units wide at its final size.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, fourth row, fourth column from the right: 三ッ葉かしは", ja: "左頁、四段目、右から四列目「三ッ葉かしは」" }, read: "2026-11-27", measured: true },
  build: mitsubaGashiwaBuild,
});
