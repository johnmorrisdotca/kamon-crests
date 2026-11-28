import { SHINSEN_MONCHO } from "./books.ts";
import { hitotsuGomaBuild, itsutsuGomaBuild, mitsuGomaBuild } from "./drawn/koma.ts";
import { defineCrest } from "./util.ts";

export const itsutsuGoma = defineCrest({
  id: "itsutsu-goma",
  name: { en: "Five angular tops", ja: "五つ独楽" },
  reading: "いつつごま",
  romaji: "itsutsu goma",
  frame: "none",
  motifs: [{ motif: "spinning-top", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッこま"],
  construction: {
    en: "Five angular tops point inward around a star-shaped opening. Their broad heads face the perimeter.",
    ja: "星形のすき間を囲んで、角形の独楽を五つ内側へ向けます。広い頭は外側に向けます。",
  },
  measured: "The printed top form has a wide ruled head and a narrow angle at its inside end. The five positions are spaced by a fifth of the circle through the outer corners.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, fourth row, second column from the right: 五ッこま", ja: "左頁、四段目、右から二列目「五ッこま」" }, read: "2026-11-26", measured: true },
  build: itsutsuGomaBuild,
});

export const hitotsuGoma = defineCrest({
  id: "hitotsu-goma",
  name: { en: "One spinning top", ja: "一つ独楽" },
  reading: "ひとつごま",
  romaji: "hitotsu goma",
  frame: "none",
  motifs: [{ motif: "spinning-top", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["一ッこま"],
  construction: {
    en: "A spinning top seen from a little above: a lens-shaped face with two lenses inside it, a band, and a cone down to the spindle, which shows above and below.",
    ja: "少し上から見た独楽です。レンズ形の面の中に二つのレンズがあり、その下に帯、さらに心棒へ向かう円すいが続きます。心棒は上と下に出ます。",
  },
  measured: "The book's top, in its pixels from the middle of its box: the face's corners 147 to either side and 56 up, its upper edge through 104.5 up and its lower through 8 up; the band's foot 143.6 to either side and 20.5 down, bowing to 48.5 down; the cone's sides through (63.75, -79.5) to its point 104.5 down; the inner lenses' corners 120 and 81 out, their edges through 89 and 30 up and 70.5 and 40 up; the spindle 4 wide, 41 beyond each end. The book's top is a few pixels higher on the right; here it is level.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, third row, third column from the right: 一ッこま", ja: "左頁、三段目、右から三列目「一ッこま」" }, read: "2026-11-28", measured: true },
  build: hitotsuGomaBuild,
});

export const mitsuGoma = defineCrest({
  id: "mitsu-goma",
  name: { en: "Three spinning tops", ja: "三つ独楽" },
  reading: "みつごま",
  romaji: "mitsu goma",
  frame: "none",
  motifs: [{ motif: "spinning-top", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッこま"],
  construction: {
    en: "Three spinning tops seen side on turn a third of a turn apart, their points and spindles meeting in the middle. Each has a thin face, a deep band and a short cone.",
    ja: "横から見た独楽を三つ、三分の一回転ずつ回し、先と心棒を中心で合わせます。どれも薄い面、深い帯、短い円すいでできています。",
  },
  measured: "The book's tops, in its pixels from the point where they meet: each face's corners 76.5 to either side and 117 out, bowing to 134.5 with its lower edge through 106.5; the band's foot 76.75 out, its edge through 68; the cone's sides through (46.9, 53.1) to the point 37.5 out; the spindles 3.5 wide, in to the middle and out to 162.5. The book's lower tops lie 238 and 122 degrees round; here a third of a turn.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, second row, third column from the right: 三ッこま", ja: "左頁、二段目、右から三列目「三ッこま」" }, read: "2026-11-28", measured: true },
  build: mitsuGomaBuild,
});
