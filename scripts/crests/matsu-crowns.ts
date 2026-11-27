import { kuroMatsuBuild } from "./drawn/matsu-crowns.ts";
import { mitsuWariKuroMatsuBuild } from "./drawn/matsu-needle-fans.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const kuroMatsu = defineCrest({
  id: "kuro-matsu",
  name: { en: "Black pine", ja: "黒松" },
  reading: "くろまつ",
  romaji: "kuro matsu",
  frame: "none",
  motifs: [{ motif: "pine", count: 1, arrangement: "upright" }],
  families: [],
  aliases: ["くろ松"],
  construction: { en: "A scalloped pine canopy and curved branch stand above a row of straight trunks.", ja: "丸い刻みのある松の冠と弧の枝を、まっすぐ並ぶ幹の上に置きます。" },
  measured: "The spreading crown and raised central rib follow the plain pine. An array of vertical barred trunks replaces the broad foot.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, first row, second column from the right: くろ松", ja: "左頁、一段目、右から二列目「くろ松」" }, read: "2026-11-26", measured: true },
  build(c) {
    kuroMatsuBuild(c);
  },
});

export const mitsuWariKuroMatsu = defineCrest({
  id: "mitsu-wari-kuro-matsu",
  name: { en: "Three divided black pines", ja: "三つ割り黒松" },
  reading: "みつわりくろまつ",
  romaji: "mitsu wari kuro matsu",
  frame: "none",
  motifs: [{ motif: "pine", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリくろまつ"],
  construction: { en: "Three dense fans of straight pine needles cover the round field. Three small white joints stand at the base of each fan.", ja: "密に並ぶまっすぐな松葉の扇を三つ、丸い場に広げます。扇ごとの根元に白い小さな節を三つ残します。" },
  measured: "The labelled cell sets the crowded fan widths, the positions of their white joints and the three separate tips of the central opening. The fans repeat by exact third turns.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, third row, fourth column from the right: 三ッワリくろまつ", ja: "左頁、三段目、右から四列目「三ッワリくろまつ」" }, read: "2026-11-27", measured: true },
  build: mitsuWariKuroMatsuBuild,
});
