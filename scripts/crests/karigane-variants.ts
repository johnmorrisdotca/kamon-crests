import { maruNiKariganeBuild, tobiGanBuild } from "./drawn/karigane-variants.ts";
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

export const tobiGan = defineCrest({
  id: "tobi-gan",
  name: { en: "Flying goose", ja: "飛び雁" },
  reading: "とびがん",
  romaji: "tobi gan",
  frame: "none",
  motifs: [{ motif: "goose", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["飛雁"],
  source: cell(18, "right page, row 2, first column from the right: とびがん", "右頁、二段目、右から一列目「とびがん」"),
  measured:
    "The cell is about 310 pixels from wing tip to wing tip. The tail rises about 68 pixels above the left wing tip. The neck curves down and left, and the little beak lies about 150 pixels to the left of the tail tip. The eye is about 10 pixels above the point of the beak. The drawing keeps the wings staggered by 9 drawing units and carries the two curves of the neck down to the beak.",
  construction: {
    en: "The wings spread wide and the tail rises to a point above them. Across the left wing a curved cut marks the far side of the body. Two arcs bring the long neck down to the small head, with a ring around its eye and a ruled line in the beak.",
    ja: "左右に長い翼を広げ、その間から尾をとがらせて立ち上げます。左の翼に白い弧を入れて胴の向こう側を表します。長い首を二本の弧で下へ曲げ、小さな頭の目に輪、くちばしに直線を入れます。",
  },
  build: tobiGanBuild,
});
