import { SHINSEN_MONCHO } from "./books.ts";
import { hanagasaYonezawaBuild } from "./drawn/kasa.ts";
import { defineCrest } from "./util.ts";

export const hanagasaYonezawa = defineCrest({
  id: "hanagasa-yonezawa",
  name: { en: "Yonezawa flower hat", ja: "花笠米沢" },
  reading: "はながさよねざわ",
  romaji: "hanagasa yonezawa",
  frame: "none",
  motifs: [{ motif: "conical-hat", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花かさよねざは"],
  construction: {
    en: "Strike the canopy and its ribbed brim. Hang a band with flowers and ruled stem beneath it. Reflect the side sprigs around an upright sprig at the crown.",
    ja: "笠と骨の通る縁を打ち、その下に花模様の帯と柄を置きます。頂のまっすぐな枝を挟んで、左右に同じ小枝を広げます。",
  },
  measured: "The canopy in the print spans roughly 328 pixels, with the leafy crown about 280 pixels wide. The crest uses a 182-unit brim and leaves of one size on paired shoots. The floral band is held apart by the brim and the lower rim.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, first row, first column from the right: 花かさよねざは", ja: "左頁、一段目、右から一列目「花かさよねざは」" }, read: "2026-11-27", measured: true },
  build: hanagasaYonezawaBuild,
});
