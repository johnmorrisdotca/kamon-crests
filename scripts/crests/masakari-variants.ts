import { SHINSEN_MONCHO } from "./books.ts";
import { hosoMitsuMasakariBuild, hosoNihonMasakariBuild, itsutsuMasakariBuild } from "./drawn/masakari-variants.ts";
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

export const hosoMitsuMasakari = defineCrest({
  id: "hoso-mitsu-masakari",
  name: { en: "Three turning axes in a thin ring", ja: "細三つ鉞" },
  reading: "ほそみつまさかり",
  romaji: "hoso mitsu masakari",
  frame: "ring-thin",
  motifs: [{ motif: "axe", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["細三ッまさかり"],
  construction: {
    en: "Three broad axe heads turn about the same centre inside a fine ring. Short lengths of the shafts show behind the heads.",
    ja: "幅の広い三つの鉞の頭を、細い輪の中で中心のまわりに巡らせます。頭の後ろから短い柄の端を見せます。",
  },
  measured: "Each swept head reaches roughly 132 from the centre in the printed circle with a radius of about 151. Its inside edge runs toward the middle and a short shaft shows between adjacent heads. The turns are set to 120 degrees.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, first row, fourth column from the right: 細三ッまさかり", ja: "右頁、一段目、右から四列目「細三ッまさかり」" }, read: "2026-11-26", measured: true },
  build: hosoMitsuMasakariBuild,
});

export const itsutsuMasakari = defineCrest({
  id: "itsutsu-masakari",
  name: { en: "Five axes around a hub", ja: "五つ鉞" },
  reading: "いつつまさかり",
  romaji: "itsutsu masakari",
  frame: "none",
  motifs: [{ motif: "axe", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッまさかり"],
  construction: {
    en: "Five handles run evenly out from the round hub. The axe heads stand across the handles, with each blade facing the next.",
    ja: "丸い中心から五本の柄を等間隔に伸ばします。柄を横切る鉞の刃は、どれも隣を向きます。",
  },
  measured: "The printed hub radius is about 22, its arm reaches about 149 out and the five heads sit across the handles at about two thirds of that reach. The five positions are evenly spaced in the drawing.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, second row, fourth column from the right: 五ッまさかり", ja: "右頁、二段目、右から四列目「五ッまさかり」" }, read: "2026-11-26", measured: true },
  build: itsutsuMasakariBuild,
});
