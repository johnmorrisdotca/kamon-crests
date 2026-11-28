import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiChigaiKaiBuild, sanbonKaiBuild } from "./drawn/paddles.ts";
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
    ja: "二本の櫂を羽根の付け根で交差させ、糸輪の中に収めて、T字形の柄を下へ向けます。",
  },
  measured: "The blades in the printed ring sit close to a right angle, and the right blade crosses in front. The upper tips and lower grips fall just inside the ring.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, third row, third column from the right: 糸ワニちがひかい", ja: "右頁、三段目、右から三列目「糸ワニちがひかい」" }, read: "2026-11-26", measured: true },
  build: itowaNiChigaiKaiBuild,
});

export const sanbonKai = defineCrest({
  id: "sanbon-kai",
  name: { en: "Three paddles", ja: "三本櫂" },
  reading: "さんぼんかい",
  romaji: "sanbon kai",
  frame: "none",
  motifs: [{ motif: "paddle", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三本かい"],
  construction: {
    en: "Three paddles gather at one point. The upright one stands in front, blade up and grip down; the other two cross behind it, each with its grip above on one side and its blade below on the other.",
    ja: "三本の櫂を一点に集めます。立てた一本を手前にし、水かきを上、握りを下にします。ほかの二本はその後ろで交差し、握りを片側の上に、水かきを反対側の下に向けます。",
  },
  measured: "The book's paddles, in its pixels, are each 294 from the middle of the grip to the tip of the blade, as the crossed paddles' paddle is in its own proportions, so it is used here, 1.58 of its units to the pixel. The upright one's grip stands 116 below the point where the blades gather; the slanting ones' grips stand 119.5 to either side and 97.5 above it, and their blades point 31.1 degrees below level. The book's blades are 65 across, the paddle's 0.22 of its length, the same.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, second row, third column from the right: 三本かい", ja: "右頁、二段目、右から三列目「三本かい」" }, read: "2026-11-28", measured: true },
  build: sanbonKaiBuild,
});
