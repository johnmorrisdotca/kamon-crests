import { SHINSEN_MONCHO } from "./books.ts";
import { futoKutsuwaBuild, hanaKutsuwaBuild } from "./drawn/kutsuwa.ts";
import { defineCrest } from "./util.ts";

export const futoKutsuwa = defineCrest({
  id: "futo-kutsuwa",
  name: { en: "Thick horse bit", ja: "太轡" },
  reading: "ふとくつわ",
  romaji: "futo kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ふとくつわ"],
  construction: {
    en: "A solid disc has four small openings cut in quadrants, leaving a broad cross and a wide shoulder of ink around it.",
    ja: "円盤の四隅に小さな穴をあけます。広い十字と、その外側を囲む太い縁を残します。",
  },
  measured: "The printed circle is about 148 in radius and the openings extend about 61 from the middle. The cross is made a little wider than one fifth of the radius.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, third row, second column from the right: ふとくつわ", ja: "左頁、三段目、右から二列目「ふとくつわ」" }, read: "2026-11-26", measured: true },
  build: futoKutsuwaBuild,
});

export const hanaKutsuwa = defineCrest({
  id: "hana-kutsuwa",
  name: { en: "Flower horse bit", ja: "花轡" },
  reading: "はなくつわ",
  romaji: "hana kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花くつわ"],
  construction: {
    en: "The broad cross of a horse bit reaches across four quadrant openings. A circular rim holds the ends of the cross.",
    ja: "轡の広い十字で四つの穴を区切ります。十字の四つの端を丸い縁でつなぎます。",
  },
  measured: "The four openings reach about 103 out to the curved edge within the printed radius of about 153. Their corners and the arms of the cross line up on the centre axes.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, second row, second column from the right: 花くつわ", ja: "左頁、二段目、右から二列目「花くつわ」" }, read: "2026-11-26", measured: true },
  build: hanaKutsuwaBuild,
});
