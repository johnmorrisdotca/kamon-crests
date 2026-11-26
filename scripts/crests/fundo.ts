import { SHINSEN_MONCHO } from "./books.ts";
import { chukageFundoBuild, maruNiHanaFundoBuild } from "./drawn/fundo.ts";
import { defineCrest } from "./util.ts";

export const chukageFundo = defineCrest({
  id: "chukage-fundo",
  name: { en: "Outlined scale weight", ja: "中陰分銅" },
  reading: "ちゅうかげふんどう",
  romaji: "chukage fundo",
  frame: "none",
  motifs: [{ motif: "weight", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中かげふん銅"],
  construction: {
    en: "Take a circular bite from each side of the disc. Follow its circumference and the two bites with one narrow line of white inside the weight.",
    ja: "円盤の左右を円で欠き取ります。円盤の縁と左右の欠けに沿って、分銅の内側に細い白線を一本通します。",
  },
  measured: "The printed outer radius is about 151. Its inset edge is 125 and the side bites are about 44 in radius at centres 109 out, with a wider outline at 63. The layout uses 96, a channel between 81 and 78.5, and two side circles of 28 about centres 69 out.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, first row, first column from the right: 中かげふん銅", ja: "右頁、一段目、右から一列目「中かげふん銅」" }, read: "2026-11-26", measured: true },
  build: chukageFundoBuild,
});

export const maruNiHanaFundo = defineCrest({
  id: "maru-ni-hana-fundo",
  name: { en: "Flower scale weight in a circle", ja: "丸に花分銅" },
  reading: "まるにはなふんどう",
  romaji: "maru ni hana fundo",
  frame: "ring-medium",
  motifs: [{ motif: "weight", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸に花ふんどう"],
  construction: {
    en: "A balance weight with circular scallops above and below and a rounded notch on either side sits inside a plain ring.",
    ja: "上下に円弧の花弁を並べ、左右を円で欠き取った分銅を、丸い輪の中に収めます。",
  },
  measured: "Inside the cell's ring, the weight is about 124 in radius. The side bites have a radius of about 50 and their centres lie about 83 from the middle. Twelve regularly spaced arcs set the simpler scallops in the frame.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, second row, first column from the right: 丸に花ふんどう", ja: "右頁、二段目、右から一列目「丸に花ふんどう」" }, read: "2026-11-26", measured: true },
  build: maruNiHanaFundoBuild,
});
