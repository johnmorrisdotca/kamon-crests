import { SHINSEN_MONCHO } from "./books.ts";
import { fukuroBuild } from "./drawn/fukuro.ts";
import { defineCrest } from "./util.ts";

export const fukuro = defineCrest({
  id: "fukuro",
  name: { en: "Bag", ja: "袋" },
  reading: "ふくろ",
  romaji: "fukuro",
  frame: "none",
  motifs: [{ motif: "bag", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ふくろ"],
  construction: {
    en: "A curved tie separates the flared mouth from the three round lobes of the bag. Pale pleats run away from the tie.",
    ja: "弧を描く結び紐で、広い口と丸い三つのふくらみを分けます。結び紐から白いひだを伸ばします。",
  },
  measured: "The upper cloth fans out above the tie, and the lower pouch has two short side lobes and one longer middle lobe. A short loop shows at either end of the tie.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, second row, first column from the right: ふくろ", ja: "左頁、二段目、右から一列目「ふくろ」" }, read: "2026-11-26", measured: true },
  build: fukuroBuild,
});
