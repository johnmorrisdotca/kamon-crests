import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiChigaiKaiBuild } from "./drawn/paddles.ts";
import { defineCrest } from "./util.ts";

export const itowaNiChigaiKai = defineCrest({
  id: "itowa-ni-chigai-kai",
  name: { en: "Crossed paddles in a thread ring", ja: "糸輪に違い櫂" },
  reading: "いとわにちがいかい",
  romaji: "itowa ni chigai kai",
  frame: "ring-thread",
  motifs: [{ motif: "paddle", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["糸ワニちがひかい"],
  construction: {
    en: "Two paddles cross at the base of the blades. Their transverse grips face down inside the thin ring.",
    ja: "二本の櫂を先の付け根で交差させ、糸輪の中でT字形の柄を下へ向けます。",
  },
  measured: "The blades in the printed ring sit close to a right angle, and the right blade crosses in front. The upper tips and lower grips fall just inside the ring.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, third row, third column from the right: 糸ワニちがひかい", ja: "右頁、三段目、右から三列目「糸ワニちがひかい」" }, read: "2026-11-26", measured: true },
  build: itowaNiChigaiKaiBuild,
});
