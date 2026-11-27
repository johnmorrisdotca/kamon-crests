import { chochinBuild, maruNiChochinBuild, mitsuChochinBuild, futowaNiChochinBuild } from "./drawn/chochin.ts";
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
  construction: { en: "A scalloped lantern body has two inward curls and two pierced openings.", ja: "丸みのある提灯に、内へ巻く線を二つ入れ、穴を二つ白く抜きます。" },
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
  construction: { en: "A paired-curl lantern with two openings sits inside the ring.", ja: "内へ巻く飾りが二つと穴が二つある提灯を、輪に収めます。" },
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
  construction: { en: "Three paired-curl lantern figures turn around the centre.", ja: "内へ巻く飾りが二つある提灯を三つ、中心のまわりに回して並べます。" },
  measured: "The three figures turn through equal angles about a shared centre.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, third row, fourth column from the right: 三ッちやうちん", ja: "左頁、三段目、右から四列目「三ッちやうちん」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuChochinBuild(c);
  },
});

export const futowaNiChochin = defineCrest({
  id: "futowa-ni-chochin",
  name: { en: "Paper lantern in a thick ring", ja: "太輪に提灯" },
  reading: "ふとわにちょうちん",
  romaji: "futowa ni chochin",
  frame: "ring-thick",
  motifs: [{ motif: "paper-lantern", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["太ワニちやうちん"],
  construction: { en: "A thick ring surrounds a scalloped lantern body and two inward curls. Two round openings pierce the body, the lower one larger and set a little left of the upper one.", ja: "太輪の中に、丸いふくらみと内へ巻く飾りが二つある提灯を収めます。丸い穴を上下に一つずつ白く抜き、下の穴を大きくして少し左へ寄せます。" },
  measured: "The paper body spans about two thirds of the printed ring's outer width. Unlike the pointed opening in the plain cell, this upper opening is nearly round. The lower opening sits slightly left of the vertical axis. The measured drawing makes the paired curls even and uses the catalogue's thick ring.",
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, fourth row, fourth column from the right: 太ワニちやうちん", ja: "左頁、四段目、右から四列目「太ワニちやうちん」" }, read: "2026-11-26", measured: true },
  build(c) {
    futowaNiChochinBuild(c);
  },
});
