import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuBoshiBuild } from "./drawn/itsutsu-boshi.ts";
import { defineCrest } from "./util.ts";

export const itsutsuBoshi = defineCrest({
  id: "itsutsu-boshi",
  name: { en: "Five stars", ja: "五つ星" },
  reading: "いつつぼし",
  romaji: "itsutsu boshi",
  frame: "none",
  motifs: [{ motif: "star", count: 5, arrangement: "ring" }, { motif: "star", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["五ッほし"],
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "right page, row 3, second column from the right: 五ッほし (measured, and drawn with compass and ruler)", ja: "右頁、三段目、右から二列目「五ッほし」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Five equal discs stand round a sixth, a little smaller, at the points of a regular pentagon with a point up. In the printed cell the five discs are about 143 across the radius with their centres about 288 from the middle, the middle one about 131, and the centres of neighbouring discs about 339 apart. The printed middle disc sits a little to the right and touches the two on the right, and the drawing puts it in the centre.",
  construction: {
    en: "Strike a disc of 32 across the radius with its centre 64 above the middle, and turn it a fifth of the way round four times, so that all five touch the layout circle. Set a disc of 29 across the radius in the middle, leaving a narrow white between it and each of the five.",
    ja: "中心の真上64のところに、半径32の円を一つ描き、5分の1回転ずつ四回回します。五つの円はどれも外の円に接します。真ん中には半径29の円を置き、まわりの五つの円との間に細い白を残します。",
  },
  build: itsutsuBoshiBuild,
});
