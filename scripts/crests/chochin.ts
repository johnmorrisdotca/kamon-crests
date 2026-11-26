import { chochinBuild, maruNiChochinBuild, mitsuChochinBuild } from "./drawn/chochin.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const chochin = defineCrest({
  id: "chochin",
  name: { en: "Paper lantern", ja: "提灯" },
  reading: "ちょうちん",
  romaji: "chōchin",
  frame: "none",
  motifs: [{ motif: "paper-lantern", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ちやうちん"],
  construction: { en: "A scalloped lantern body has two inward curls and two pierced openings.", ja: "丸みのある提灯に、内へ巻く線を二つと、白い穴を二つ置きます。" },
  measured: "The curls are mirrored about the line through the upper pointed opening and round lower opening.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, fourth row, second column from the right: ちやうちん", ja: "左頁、四段目、右から二列目「ちやうちん」" }, read: "2026-11-26", measured: true },
  build(c) {
    chochinBuild(c);
  },
});

export const maruNiChochin = defineCrest({
  id: "maru-ni-chochin",
  name: { en: "Paper lantern in a circle", ja: "丸に提灯" },
  reading: "まるにちょうちん",
  romaji: "maru ni chōchin",
  frame: "ring-medium",
  motifs: [{ motif: "paper-lantern", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニちやうちん"],
  construction: { en: "A paired-curl lantern with two openings sits inside the ring.", ja: "二つの巻きと穴のある提灯を、丸い輪の中に置きます。" },
  measured: "The vertical line through the two openings also divides the enclosing ring.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, second row, third column from the right: 丸ニちやうちん", ja: "左頁、二段目、右から三列目「丸ニちやうちん」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiChochinBuild(c, c.ring("ring-medium"));
  },
});

export const mitsuChochin = defineCrest({
  id: "mitsu-chochin",
  name: { en: "Three paper lanterns", ja: "三つ提灯" },
  reading: "みつちょうちん",
  romaji: "mitsu chōchin",
  frame: "none",
  motifs: [{ motif: "paper-lantern", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッちやうちん"],
  construction: { en: "Three paired-curl lantern figures turn around the centre.", ja: "内に巻く飾りのある提灯を三方に回して並べます。" },
  measured: "The three figures turn through equal angles about a shared centre.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, third row, fourth column from the right: 三ッちやうちん", ja: "左頁、三段目、右から四列目「三ッちやうちん」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuChochinBuild(c);
  },
});
