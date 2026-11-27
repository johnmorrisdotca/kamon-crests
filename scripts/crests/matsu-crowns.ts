import { kuroMatsuBuild } from "./drawn/matsu-crowns.ts";
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
