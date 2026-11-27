import { hanaKiriBuild } from "./drawn/kiri-flower.ts";
import { kiriGurumaBuild } from "./drawn/kiri-wheels.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const kiriGuruma = defineCrest({
  id: "kiri-guruma",
  name: { en: "Serrated paulownia wheel", ja: "桐車" },
  reading: "きりぐるま",
  romaji: "kiri guruma",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["きり車"],
  construction: { en: "Three toothed and veined leaves alternate with three sprigs around a round hub. The sprigs end in pointed buds.", ja: "刻みと葉脈のある葉三枚と花穂三本を、丸い軸のまわりに交互に置きます。花穂の先にはとがったつぼみをつけます。" },
  measured: "The three broad leaves point outward. The printed stems rise between the leaves and end in clusters with distinct points.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, fourth row, first column from the right: きり車", ja: "左頁、四段目、右から一列目「きり車」" }, read: "2026-11-26", measured: true },
  build(c) {
    kiriGurumaBuild(c);
  },
});

export const hanaKiri = defineCrest({
  id: "hana-kiri",
  name: { en: "Star-flowered paulownia", ja: "花桐" },
  reading: "はなぎり",
  romaji: "hana giri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["花きり"],
  construction: { en: "Three pointed leaves meet at a round joint and spread below three stalks. The flowers are small stars, with five in the middle and three on each side.", ja: "先のとがった葉を丸い節の下に三枚広げ、上には花穂を三本立てます。星形の花を中央に五つ、左右に三つずつ置きます。" },
  measured: "The long leaves taper to points and carry straight alternating veins. Small stars at the top and the ends of the branches distinguish this print.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, second row, first column from the right: 花きり", ja: "右頁、二段目、右から一列目「花きり」" }, read: "2026-11-26", measured: true },
  build(c) {
    hanaKiriBuild(c);
  },
});
