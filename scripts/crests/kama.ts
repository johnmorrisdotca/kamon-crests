import { SHINSEN_MONCHO } from "./books.ts";
import { chigaiKamaBuild, futatsuKamaBuild, manjigamaBuild, mutsuKamaBuild } from "./drawn/kama.ts";
import { cell } from "./kaku-meyui.ts";
import { MANJI_NOTE } from "./plain-forms.ts";
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

export const mutsuKama = defineCrest({
  id: "mutsu-kama",
  name: { en: "Six sickles turning around a hub", ja: "六つ鎌" },
  reading: "むつかま",
  romaji: "mutsu kama",
  frame: "none",
  motifs: [{ motif: "sickle", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["六ッ鎌"],
  construction: {
    en: "Six straight handles radiate from a round hub. The arcs of the six blades lead round the outside in the same direction.",
    ja: "丸い中心から六本のまっすぐな柄を放射状に伸ばします。六枚の弧を描く刃は、外側で同じ方向に巡ります。",
  },
  measured: "Six handles join the hub in the native cell. The hub radius is about one seventh of the outside circle; each blade extends out along nearly one sixth of the perimeter. The six positions are made equally spaced.",
  source: { ...SHINSEN_MONCHO, frame: 19, place: { en: "right page, third row, first column from the right: 六ッ鎌", ja: "右頁、三段目、右から一列目「六ッ鎌」" }, read: "2026-11-26", measured: true },
  build: mutsuKamaBuild,
});

export const manjigama = defineCrest({
  id: "manjigama",
  name: { en: "Manji sickle", ja: "卍鎌" },
  reading: "まんじがま",
  romaji: "manjigama",
  frame: "none",
  motifs: [{ motif: "sickle", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["まんじ鎌"],
  note: MANJI_NOTE,
  source: cell(19, "right page, first row, first column from the right: まんじ鎌", "右頁、一段目、右から一列目「まんじ鎌」"),
  measured: "Four broad blades meet tip to shoulder on a circle about 310 pixels across; the edge is formed by the blades. The central handles are about 39 pixels wide and are inclined about 12 degrees. Paired white lines divide blade from handle, and one narrow curved line follows each blade's inner edge. The drawing evens the widths and smooths those lines.",
  construction: {
    en: "Join four curved sickle blades around the edge of a circle. A ruled cross forms their four handles. Leave two narrow gaps at each collar and a fine curve inside each blade.",
    ja: "円周に沿って四枚の鎌の刃をつなぎます。定規で十字に四本の柄を作り、各つなぎ目に二本の細いすき間を残します。刃の内側にも細い弧を残します。",
  },
  build: manjigamaBuild,
});
