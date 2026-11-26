import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuGomaBuild } from "./drawn/koma.ts";
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
