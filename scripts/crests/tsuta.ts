import { korinTsutaBuild } from "./drawn/tsuta.ts";
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
