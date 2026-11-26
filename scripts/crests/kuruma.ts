import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuWariGenjiGurumaBuild, mutsuWariGenjiGurumaBuild } from "./drawn/kuruma.ts";
import { defineCrest } from "./util.ts";

export const mitsuWariGenjiGuruma = defineCrest({
  id: "mitsu-wari-genji-guruma",
  name: { en: "Three-part Genji wheel", ja: "三つ割り源氏車" },
  reading: "みつわりげんじぐるま",
  romaji: "mitsu wari genji guruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三つ割源氏車", "三ッワリ源氏車"],
  construction: {
    en: "Place three cart-wheel hubs around one circle. Each wheel turns a third of the way around the layout and is cut back at its neighbour's outer edge.",
    ja: "一つの円周に牛車の車輪の轂を三つ置きます。車輪を三分の一回転ずつ並べ、隣の車輪の外縁で切りそろえます。",
  },
  measured: "The surviving hubs lie roughly 154 from the centre of the plate's circle, whose radius is about 156. From each hub the arcs dividing the spokes, felloes and rim lie about 75, 104 and 155 out. The drawing regularizes the three turns to 120 degrees.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, first row, third column from the right: 三ッワリ源氏車", ja: "右頁、一段目、右から三列目「三ッワリ源氏車」" }, read: "2026-11-26", measured: true },
  build: mitsuWariGenjiGurumaBuild,
});

export const mutsuWariGenjiGuruma = defineCrest({
  id: "mutsu-wari-genji-guruma",
  name: { en: "Six-part Genji wheel", ja: "六つ割り源氏車" },
  reading: "むつわりげんじぐるま",
  romaji: "mutsu wari genji guruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["六つ割源氏車", "六ッワリ源氏車"],
  construction: {
    en: "Divide the tyre and felloes into six pieces each, staggering their joins. Six widening spokes lead out from the hub.",
    ja: "外輪と輪木をそれぞれ六つに分け、継ぎ目を互い違いにします。轂から外に向けて、幅の広がる輻を六本引きます。",
  },
  measured: "From the cell, the outside circle is about 154 in radius, the tyre ends at 128, the felloes end at 96 and the hub is 21. The layout uses 96, 80, 60 and 12, with equally spaced joins.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, second row, second column from the right: 六ッワリ源氏車", ja: "右頁、二段目、右から二列目「六ッワリ源氏車」" }, read: "2026-11-26", measured: true },
  build: mutsuWariGenjiGurumaBuild,
});
