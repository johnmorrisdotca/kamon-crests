import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiTsuchiBuild } from "./drawn/tsuchi.ts";
import { defineCrest } from "./util.ts";

export const itowaNiTsuchi = defineCrest({
  id: "itowa-ni-tsuchi",
  name: { en: "Mallet in a thread ring", ja: "糸輪に槌" },
  reading: "いとわにつち",
  romaji: "itowa ni tsuchi",
  frame: "ring-thread",
  motifs: [{ motif: "mallet", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニつち"],
  construction: {
    en: "A broad wooden mallet fills a thread ring. Nested curves define the striking face, with angled grain lines across the other side.",
    ja: "幅の広い木の槌を糸輪に収めます。重なる弧で打面を分け、胴には折れ曲がる木目を並べます。",
  },
  measured: "The large rounded wood body nearly touches the thin frame. Its offset front has several nested curves. The grain marks retain staggered positions and the narrow bands at top and bottom.",
  source: { ...SHINSEN_MONCHO, frame: 23, place: { en: "right page, second row, first column from the right: 糸ワニつち", ja: "右頁、二段目、右から一列目「糸ワニつち」" }, read: "2026-11-26", measured: true },
  build: itowaNiTsuchiBuild,
});
