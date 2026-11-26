import { SHINSEN_MONCHO } from "./books.ts";
import { chigaiKamaBuild, futatsuKamaBuild } from "./drawn/kama.ts";
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

export const chigaiKama = defineCrest({
  id: "chigai-kama",
  name: { en: "Crossed sickles", ja: "違い鎌" },
  reading: "ちがいかま",
  romaji: "chigai kama",
  frame: "none",
  motifs: [{ motif: "sickle", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["ちがひ鎌"],
  construction: {
    en: "Two crescent blades point away from the crossing of their handles. A narrow gap marks the handle that passes in front.",
    ja: "二本の柄を交差させ、弧を描く二枚の刃を外側に向けます。手前の柄に沿って細いすき間を残します。",
  },
  measured: "The printed blades extend to an overall width of about 320. The two handles run from about 64 above to 103 below their crossing, with small variations balanced by mirror symmetry in the drawing.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, fourth row, fourth column from the right: ちがひ鎌", ja: "左頁、四段目、右から四列目「ちがひ鎌」" }, read: "2026-11-26", measured: true },
  build: chigaiKamaBuild,
});
