import { mitsuHamaguriBuild, maruNiFutatsuHamaguriBuild } from "./drawn/kai.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuHamaguri = defineCrest({
  id: "mitsu-hamaguri",
  name: { en: "Three clams", ja: "三つ蛤" },
  reading: "みつはまぐり",
  romaji: "mitsu hamaguri",
  frame: "none",
  motifs: [{ motif: "shell", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ蛤"],
  construction: { en: "Three open clams turn about the centre. Compass arcs define both valves and their growth lines.", ja: "開いた蛤を三つ、中心のまわりに並べます。貝の上下と成長線を円弧で描きます。" },
  measured: "The three shells share a hinge near the middle. The open edge is on the same side of each shell, and short growth marks run across its broad face.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, third row, third column from the right: 三ッ蛤", ja: "左頁、三段目、右から三列目「三ッ蛤」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuHamaguriBuild(c);
  },
});

export const maruNiFutatsuHamaguri = defineCrest({
  id: "maru-ni-futatsu-hamaguri",
  name: { en: "Two clams in a circle", ja: "丸に二つ蛤" },
  reading: "まるにふたつはまぐり",
  romaji: "maru ni futatsu hamaguri",
  frame: "ring-thin",
  motifs: [{ motif: "shell", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["丸ニ二ッ蛤"],
  construction: { en: "Two open clams lie across the circle, one high and one low. The near shell has crossing white growth marks.", ja: "開いた蛤を上下に一つずつ置き、細輪に収めます。手前の貝に交差する白い筋を入れます。" },
  measured: "The lower shell is larger and its markings are more closely ruled. The upper shell keeps sparser growth marks.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, second row, third column from the right: 丸ニ二ッ蛤", ja: "左頁、二段目、右から三列目「丸ニ二ッ蛤」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiFutatsuHamaguriBuild(c);
  },
});
