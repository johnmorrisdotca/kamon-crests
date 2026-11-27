import { uzumiKiriBuild } from "./drawn/kiri-standing.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const uzumiKiri = defineCrest({
  id: "uzumi-kiri",
  name: { en: "Buried-flower paulownia", ja: "埋み桐" },
  reading: "うずみぎり",
  romaji: "uzumi giri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["うづみきり"],
  construction: { en: "Three large veined leaves fill the lower half, with three broad lobed flowers just above their round joint. Narrow cuts inside each blossom follow its ribs.", ja: "下に葉脈のある広い葉を三枚置き、丸い節のすぐ上に丸く刻んだ花を三つ並べます。それぞれの花に細い切れ目を入れて筋を表します。" },
  measured: "The three large flowers sit directly over the leaves where the ordinary paulownia has tall bud spikes. The central flower is slightly larger. The original paulownia leaf is reused.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, first row, first column from the right: うづみきり", ja: "左頁、一段目、右から一列目「うづみきり」" }, read: "2026-11-26", measured: true },
  build(c) {
    uzumiKiriBuild(c);
  },
});
