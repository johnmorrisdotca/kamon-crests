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
