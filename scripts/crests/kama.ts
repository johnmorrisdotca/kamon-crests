import { SHINSEN_MONCHO } from "./books.ts";
import { futatsuKamaBuild } from "./drawn/kama.ts";
import { defineCrest } from "./util.ts";

export const futatsuKama = defineCrest({
  id: "futatsu-kama",
  name: { en: "Two opposed sickles", ja: "二つ鎌" },
  reading: "ふたつかま",
  romaji: "futatsu kama",
  frame: "none",
  motifs: [{ motif: "sickle", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["二ッ鎌"],
  construction: {
    en: "Two sickles turn half a circle apart to enclose a diamond-shaped opening. Each crescent passes behind the other sickle's rounded handle.",
    ja: "二本の鎌を半回転ずつ向かい合わせ、中央にひし形のすき間を残します。弧を描く刃は、相手の丸い柄の後ろを通ります。",
  },
  measured: "The tips of the blades in the cell reach about 150 from the centre, and the handles angle about 35 degrees from the upright. The ends of the handles are rounded and each contains a small round hole. The pair is regularized to a half-turn.",
  source: { ...SHINSEN_MONCHO, frame: 19, place: { en: "right page, second row, first column from the right: 二ッ鎌", ja: "右頁、二段目、右から一列目「二ッ鎌」" }, read: "2026-11-26", measured: true },
  build: futatsuKamaBuild,
});
