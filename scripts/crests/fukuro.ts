import { SHINSEN_MONCHO } from "./books.ts";
import { fukuroBuild, itowaNiKakuFukuroBuild } from "./drawn/fukuro.ts";
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

export const itowaNiKakuFukuro = defineCrest({
  id: "itowa-ni-kaku-fukuro",
  name: { en: "Square bag in a thread ring", ja: "糸輪に角袋" },
  reading: "いとわにかくふくろ",
  romaji: "itowa ni kaku fukuro",
  frame: "ring-thread",
  motifs: [{ motif: "bag", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニ角袋"],
  construction: {
    en: "A faceted pouch with small stitched sprigs is tied with a four-loop cord. A thread ring surrounds the square bag.",
    ja: "小さな枝模様のある角張った袋を四つの輪がある紐で結び、糸輪で囲みます。",
  },
  measured: "The pouch has broad angled shoulders, a four-loop knot and a short hanging tag above it. The thread ring just contains the bag at the shoulders and lower corners. The scattered stitch marks retain their uneven positions.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, third row, second column from the right: 糸ワニ角袋", ja: "左頁、三段目、右から二列目「糸ワニ角袋」" }, read: "2026-11-26", measured: true },
  build: itowaNiKakuFukuroBuild,
});
