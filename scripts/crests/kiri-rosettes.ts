import { hanaKiriGurumaBuild } from "./drawn/kiri-rosettes.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const hanaKiriGuruma = defineCrest({
  id: "hana-kiri-guruma",
  name: { en: "Paulownia flower wheel", ja: "花桐車" },
  reading: "はなきりぐるま",
  romaji: "hana kiri guruma",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["花きりぐるま"],
  construction: { en: "Six veined leaves turn around a small circular hub. The narrow lobes point outward and the white veins stop before the scalloped edges.", ja: "葉脈のある葉を六枚、小さな丸い軸のまわりに回して置きます。細長い葉の先を外へ向け、葉脈は丸く刻んだ縁の手前で止めます。" },
  measured: "The paper has six rounded leaves and no flower spikes. A round hub joins them. The published paulownia side leaf supplies the same scalloped form and fine vein curves.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, third row, first column from the right: 花きりぐるま", ja: "左頁、三段目、右から一列目「花きりぐるま」" }, read: "2026-11-26", measured: true },
  build(c) {
    hanaKiriGurumaBuild(c);
  },
});
