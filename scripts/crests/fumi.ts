import { SHINSEN_MONCHO } from "./books.ts";
import { hirakiBumiBuild, tamazusaBuild } from "./drawn/fumi.ts";
import { defineCrest } from "./util.ts";

export const tamazusa = defineCrest({
  id: "tamazusa",
  name: { en: "Angular folded letter", ja: "たまづさ" },
  reading: "たまづさ",
  romaji: "tamazusa",
  frame: "none",
  motifs: [{ motif: "folded-letter", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["たまずさ"],
  construction: {
    en: "A narrow strip crosses the top and opens into two slanting tails. Straight white seams show the folds.",
    ja: "細い帯を上で折り重ね、両端を斜め下に開きます。折り目は細い直線を白く抜いて表します。",
  },
  measured: "The print has a short level top, a small triangular turn just below it, and two oblique ends separated by an open underside. The name keeps the printed kana.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, fourth row, second column from the right: たまづさ", ja: "左頁、四段目、右から二列目「たまづさ」" }, read: "2026-11-26", measured: true },
  build: tamazusaBuild,
});

export const hirakiBumi = defineCrest({
  id: "hiraki-bumi",
  name: { en: "Opened letter", ja: "開き文" },
  reading: "ひらきぶみ",
  romaji: "hiraki bumi",
  frame: "none",
  motifs: [{ motif: "folded-letter", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ひらきふみ"],
  construction: {
    en: "An opened letter: its sheet spread to the left, gently waved at top and foot, and the rest still rolled up on the right, a spiral at the roll's top.",
    ja: "開いた手紙です。紙を左に広げ、上下の端はゆるく波打ちます。右側はまだ巻いたままで、巻きの上端に渦が見えます。",
  },
  measured: "The book's letter, in its pixels from the middle of its box: the sheet from 118.5 left, its top from 81.5 up sagging to 76.5, its foot from 86.5 down bowing to 88.5; the roll 55 wide at the top and 65 at the foot, leaning a little, its top bowing up to 101.5 and its foot down to 93.5, with two white rings for the spiral at its top. The book's top and foot are waved in two or three small humps; here each is one arc.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, second row, third column from the right: ひらきふみ", ja: "左頁、二段目、右から三列目「ひらきふみ」" }, read: "2026-11-28", measured: true },
  build: hirakiBumiBuild,
});
