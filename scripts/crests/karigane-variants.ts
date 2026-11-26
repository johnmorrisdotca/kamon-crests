import { kanawaKariganeBuild } from "./drawn/kanawa-karigane.ts";
import { maruNiKariganeBuild, sanbaKariganeBuild, tobiGanBuild } from "./drawn/karigane-variants.ts";
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
    ja: "翼の左右の先から肩に向かって弧を描き、下は二本の弧をしぼって尾の先で合わせます。折り返した襟の上の頭は左を向き、目に輪、頬に弧、くちばしに直線の切れ込みを入れます。",
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

export const sanbaKarigane = defineCrest({
  id: "sanba-karigane",
  name: { en: "Three geese in flight", ja: "三羽雁金" },
  reading: "さんばかりがね",
  romaji: "sanba karigane",
  frame: "none",
  motifs: [{ motif: "goose", count: 3, arrangement: "stacked" }],
  families: [],
  source: cell(18, "right page, row 2, second column from the right: 三羽雁金", "右頁、二段目、右から二列目「三羽雁金」"),
  measured:
    "The top bird measures about 198 pixels from wing tip to wing tip and about 92 from crown to the lower shoulder. The birds repeat 37 to 43 pixels to the right and about 85 down, with the beaks still pointing left. The drawing spaces the three geese evenly and turns the lower two to follow their higher leading wings. Each has a ringed eye and pointed tail.",
  construction: {
    en: "Three geese descend from upper left to lower right. Each has one wing higher than the other, a ringed eye, and a long hollow under the higher wing that ends in the point of the tail. A curved white line across the body meets the short ruled division in the beak.",
    ja: "三羽の雁が左上から右下へ降りてきます。一方の翼を高く上げ、目に輪を入れます。高い方の翼の下を弧でくぼませ、尾をとがらせます。胴に入れた白い弧は、くちばしの短い直線につながります。",
  },
  build: sanbaKariganeBuild,
});

export const kanawaKarigane = defineCrest({
  id: "kanawa-karigane",
  name: { en: "Interlaced wild geese", ja: "金輪雁金" },
  reading: "かなわかりがね",
  romaji: "kanawa karigane",
  frame: "none",
  motifs: [{ motif: "goose", count: 3, arrangement: "radial" }],
  families: [],
  source: cell(18, "right page, row 4, third column from the right: 金輪雁金, with かなわ beside 金輪", "右頁、四段目、右から三列目「金輪雁金」（金輪の脇に「かなわ」）"),
  measured: "Three goose heads sit just outside the loops that form their bodies. Each band is narrow at the outer edge and broad near the centre, where it crosses over one neighbour and under the other.",
  construction: {
    en: "Use offset circles to make each goose body broad inside and fine along the outside. Give a band its own head, then leave a white crossing gap under the next band.",
    ja: "中心をずらした円で胴を描き、内側を太く、外側を細くします。帯に頭を添え、隣の帯の下になる所に白いすき間を残します。",
  },
  build: kanawaKariganeBuild,
});
