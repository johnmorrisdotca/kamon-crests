import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiHonNoJiBuild } from "./drawn/ringed-characters.ts";
import { defineCrest } from "./util.ts";

export const maruNiHonNoJi = defineCrest({
  id: "maru-ni-hon-no-ji",
  name: { en: "Character hon in a circle", ja: "丸に本の字" },
  reading: "まるにほんのじ",
  romaji: "maru ni hon no ji",
  frame: "ring-medium",
  motifs: [{ motif: "hon-no-ji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ本の字"],
  construction: {
    en: "The centre stroke of 本 is upright, with a curved head and a hooked foot. The long bar crosses above two slanting strokes. The short lower bar joins the upright.",
    ja: "「本」の縦画の頭を曲線で囲み、下端をはねさせます。長い横画の下から斜めの二画を広げ、短い下の横画を縦画につなげます。",
  },
  measured: "The ring is about 305 pixels wide. The upper bar is about 220 pixels across and the printed brush character is about 246 pixels tall. The drawing uses about 137 by 153 and the package medium ring. The asymmetric brush feet, rising long bar and lower hook are ruled and bounded by circular arcs.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, first row, third column from the right: 丸ニ本の字", ja: "右頁、一段目、右から三列目「丸ニ本の字」" }, read: "2026-11-26", measured: true },
  build: maruNiHonNoJiBuild,
});
