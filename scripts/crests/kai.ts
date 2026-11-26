import { mitsuHamaguriBuild, maruNiFutatsuHamaguriBuild, maruNiMitsuHamaguriBuild, mukaiItayagaiBuild } from "./drawn/kai.ts";
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

export const maruNiMitsuHamaguri = defineCrest({
  id: "maru-ni-mitsu-hamaguri",
  name: { en: "Three clams in a circle", ja: "丸に三つ蛤" },
  reading: "まるにみつはまぐり",
  romaji: "maru ni mitsu hamaguri",
  frame: "ring-thin",
  motifs: [{ motif: "shell", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸ニ三ッ蛤"],
  construction: { en: "Three clams, each with a narrow opening and short growth marks, turn inside a thin ring.", ja: "口が細く開き、短い筋を入れた蛤を三つ並べ、細輪に収めます。" },
  measured: "The three shells have rounder shoulders and fewer marks than the unframed three clams in the cell above. The narrow white pockets keep the shells distinct.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, fourth row, third column from the right: 丸ニ三ッ蛤", ja: "左頁、四段目、右から三列目「丸ニ三ッ蛤」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiMitsuHamaguriBuild(c);
  },
});

export const mukaiItayagai = defineCrest({
  id: "mukai-itayagai",
  name: { en: "Facing scallop shells", ja: "向かい板屋貝" },
  reading: "むかいいたやがい",
  romaji: "mukai itayagai",
  frame: "none",
  motifs: [{ motif: "shell", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["向ひいたや貝"],
  construction: { en: "Two scallops face one another at their hinges. The ribs alternate between round pits and short white seams.", ja: "板屋貝二つの蝶番を向かい合わせます。筋の間に、小さな丸と短い白い線を交互に入れます。" },
  measured: "The two shells nearly make a circle. The print marks the scallops with alternating perforated and ribbed panels.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "right page, second row, first column from the right: 向ひいたや貝", ja: "右頁、二段目、右から一列目「向ひいたや貝」" }, read: "2026-11-26", measured: true },
  build(c) {
    mukaiItayagaiBuild(c);
  },
});
