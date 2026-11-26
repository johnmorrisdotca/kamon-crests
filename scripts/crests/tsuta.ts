import { korinTsutaBuild, kokumochiTsutaBuild } from "./drawn/tsuta.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const korinTsuta = defineCrest({
  id: "korin-tsuta",
  name: { en: "Kōrin ivy", ja: "光琳蔦" },
  reading: "こうりんつた",
  romaji: "kōrin tsuta",
  frame: "none",
  motifs: [{ motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["光林のつた"],
  construction: { en: "Five clear rounded lobes meet at a small heart, with no fine veins.", ja: "丸い五つの葉を細い筋なしで、小さな丸い中心に合わせます。" },
  measured: "The two upper lobes and the two side lobes mirror each other about the broad lower lobe.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "left page, third row, first column from the right: 光林のつた", ja: "左頁、三段目、右から一列目「光林のつた」" }, read: "2026-11-26", measured: true },
  build(c) {
    korinTsutaBuild(c);
  },
});

export const kokumochiTsuta = defineCrest({
  id: "kokumochi-tsuta",
  name: { en: "Ivy in a filled roundel", ja: "石持ち蔦" },
  reading: "こくもちつた",
  romaji: "kokumochi tsuta",
  frame: "none",
  motifs: [{ motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["石持つた"],
  construction: { en: "Five broad ivy lobes and their veins open in a black roundel.", ja: "黒い丸の中に五つの広い蔦の葉と筋を白く出します。" },
  measured: "The ivy apertures fit inside a separate circular boundary from this plate.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "left page, second row, third column from the right: 石持つた", ja: "左頁、二段目、右から三列目「石持つた」" }, read: "2026-11-26", measured: true },
  build(c) {
    kokumochiTsutaBuild(c);
  },
});
