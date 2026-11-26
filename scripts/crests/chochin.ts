import { chochinBuild } from "./drawn/chochin.ts";
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
