import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuTabaneNoshiBuild } from "./drawn/noshi.ts";
import { defineCrest } from "./util.ts";

export const mitsuTabaneNoshi = defineCrest({
  id: "mitsu-tabane-noshi",
  name: { en: "Three bundled noshi", ja: "三つ束ね熨斗" },
  reading: "みつたばねのし",
  romaji: "mitsu tabane noshi",
  frame: "none",
  motifs: [{ motif: "noshi", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三ッたばねのし"],
  construction: {
    en: "Three turned noshi strips make nested courses. Two folded inner tips point into the opening and a short binding joins all three at the foot.",
    ja: "折り返した熨斗を三重に重ねます。内側の二つの折り端は中央へ向け、三重の裾を短い帯でまとめます。",
  },
  measured: "The outer strip rises into a small pointed crown. Two short return folds interrupt the upper edge of the round central opening, and small folded ends lie alongside the lower tie. The left and right courses have been balanced.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, fourth row, fourth column from the right: 三ッたばねのし", ja: "右頁、四段目、右から四列目「三ッたばねのし」" }, read: "2026-11-26", measured: true },
  build: mitsuTabaneNoshiBuild,
});
