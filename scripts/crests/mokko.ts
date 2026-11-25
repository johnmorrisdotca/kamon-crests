import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { fourLobedMokko } from "./drawn/mokko.ts";
import { defineCrest } from "./util.ts";

export const mokko = defineCrest({
  id: "mokko",
  name: { en: "Quince blossom", ja: "木瓜" },
  reading: "もっこう",
  romaji: "mokkō",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 4, arrangement: "radial" }, { motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["quince", "yoko mokko", "yokomokko", "横木瓜"],
  construction: {
    en: "Four lobes surround a flower with four petals. The lobes at the sides reach farther than those above and below. A broad arc and two round shoulders close against an inner arc on each lobe. Inside each one sits a small band with round ends. Two ruled gaps part each petal from its neighbours, and a short white stamen points away from the round heart.",
    ja: "四枚の花びらを持つ花を、四つの裂片で囲みます。左右の裂片は上下よりも長く伸びます。各裂片は、外側の大きな弧と二つの丸い肩、内側の弧で囲みます。その内側には、両端の丸い細い帯を置きます。花びらの間は定規で引いた白いすき間で分け、円い花の中心から外へ向かって、短い白いしべを入れます。",
  },
  measured: "Frame 44: the height is about four fifths of the width. The flower reaches 0.38 of the half-width above and below and 0.48 at the sides. The outer lobes are cut back to 0.54 above and below and 0.62 at the sides. The curls follow the inside edge of each lobe. The white gaps and the opposite halves are evened out from the printed outlines.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, second row, first column from the right: 木瓜", ja: "左頁、二段目、右から一列目「木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    fourLobedMokko(c, R);
  },
});
