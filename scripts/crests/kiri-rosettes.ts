import { hanaKiriGurumaBuild, mukaiKiriBishiBuild } from "./drawn/kiri-rosettes.ts";
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

export const mukaiKiriBishi = defineCrest({
  id: "mukai-kiri-bishi",
  name: { en: "Facing paulownias in a lozenge", ja: "向かい桐菱" },
  reading: "むかいきりびし",
  romaji: "mukai kiri bishi",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["向ひ桐びし"],
  construction: { en: "Two paulownia sprays turn towards each other. Their leaves define the long sides of a lozenge and a pair of small flowers faces across its centre.", ja: "桐の房を二つ、互いに向けます。広げた葉で菱の長い辺をつくり、中心の隙間に小さな花を向かい合わせます。" },
  measured: "The upper and lower sprays face inward, while their leaves lie along the diagonal outer edges. The two small blossoms are close together in the middle.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "right page, fourth row, fourth column from the right: 向ひ桐びし", ja: "右頁、四段目、右から四列目「向ひ桐びし」" }, read: "2026-11-26", measured: true },
  build(c) {
    mukaiKiriBishiBuild(c);
  },
});
