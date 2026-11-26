import { SHINSEN_MONCHO } from "./books.ts";
import { hosoNihonMasakariBuild } from "./drawn/masakari-variants.ts";
import { defineCrest } from "./util.ts";

export const hosoNihonMasakari = defineCrest({
  id: "hoso-nihon-masakari",
  name: { en: "Two parallel axes in a thin ring", ja: "細二本鉞" },
  reading: "ほそにほんまさかり",
  romaji: "hoso nihon masakari",
  frame: "ring-thin",
  motifs: [{ motif: "axe", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["細二本まさかり"],
  construction: {
    en: "Two broad axe heads face the same way on parallel upright shafts. Their bevels and three short marks are picked out in fine white gaps.",
    ja: "幅の広い鉞を二本、柄を平行に立てて同じ方向に向けます。刃の境と三本の短い線を細い白のすき間で表します。",
  },
  measured: "The printed ring is about 153 in radius; the two shaft centres are about 111 apart. Their exposed lower lengths are about 129. Each scalloped head has three short marks in the printed cell.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, first row, first column from the right: 細二本まさかり", ja: "左頁、一段目、右から一列目「細二本まさかり」" }, read: "2026-11-26", measured: true },
  build: hosoNihonMasakariBuild,
});
