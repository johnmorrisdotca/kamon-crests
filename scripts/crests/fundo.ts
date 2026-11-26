import { SHINSEN_MONCHO } from "./books.ts";
import { hanaFundoBuild, maruNiHanaFundoBuild } from "./drawn/fundo.ts";
import { defineCrest } from "./util.ts";

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

export const hanaFundo = defineCrest({
  id: "hana-fundo",
  name: { en: "Flower scale weight", ja: "花分銅" },
  reading: "はなふんどう",
  romaji: "hana fundo",
  frame: "none",
  motifs: [{ motif: "weight", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花ふんどう"],
  construction: {
    en: "The two side notches cut into the scalloped edge of a balance weight. At each shoulder a pair of fine curls turns inward.",
    ja: "花弁のある分銅の左右を円で欠き取ります。それぞれの肩には、内側へ巻く細い渦を二つずつ入れます。",
  },
  measured: "The printed design has a radius of about 150 out to the scallops. The side bites have a radius of about 44 and centres about 108 out. The four paired curls are set on the shoulders, with arcs about 10 or 11 in radius in the print, reduced in the drawing with its other proportions.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, third row, first column from the right: 花ふんどう", ja: "右頁、三段目、右から一列目「花ふんどう」" }, read: "2026-11-26", measured: true },
  build: hanaFundoBuild,
});
