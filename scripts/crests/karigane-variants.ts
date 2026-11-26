import { maruNiKariganeBuild } from "./drawn/karigane-variants.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const maruNiKarigane = defineCrest({
  id: "maru-ni-karigane",
  name: { en: "Wild goose in a circle", ja: "丸に雁金" },
  reading: "まるにかりがね",
  romaji: "maru ni karigane",
  frame: "ring-medium",
  motifs: [{ motif: "goose", count: 1, arrangement: "single" }],
  families: [],
  source: cell(18, "right page, row 1, first column from the right: 丸ニ雁金", "右頁、一段目、右から一列目「丸ニ雁金」"),
  measured:
    "The ring spans about 300 pixels. The two wings spread to about 245 pixels at its middle height and slope in to the long tail directly below. The bird looks to the left. Its eye lies on the upright axis, about 60 pixels above the wing tips, and has a curved cheek passing round it. The drawing centres the wing tips, sets the eye and tail on the same axis and uses the package's medium ring.",
  construction: {
    en: "Two compass arcs rise to the shoulders from the wing tips. Two lower arcs run in to the pointed tail. The head looks left over the folded collar, with a ring around its eye, an arc through the cheek and a ruled division in the beak.",
    ja: "翼の左右の先から肩に向かって弧を描き、下は二本の弧をしぼって尾の先で合わせます。襟の上の頭は左を向き、目に輪、頬に弧、くちばしに直線の切れ込みを入れます。",
  },
  build: maruNiKariganeBuild,
});
