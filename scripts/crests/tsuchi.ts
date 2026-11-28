import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuYokoTsuchiBuild } from "./drawn/mitsu-yoko-tsuchi.ts";
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

export const mitsuYokoTsuchi = defineCrest({
  id: "mitsu-yoko-tsuchi",
  name: { en: "Three rounded mallet heads", ja: "三つ横槌" },
  reading: "みつよこづち",
  romaji: "mitsu yoko zuchi",
  frame: "none",
  motifs: [{ motif: "mallet", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッよこつち"],
  construction: {
    en: "Three rounded mallet heads meet at their feet, one standing up and two pointing down to either side. Each shows the round face of its end and a stub of its handle.",
    ja: "丸い槌の頭を三つ、根元で合わせます。一つは上に立ち、二つは左右の下を向きます。どれも端の丸い面と柄の先を見せます。",
  },
  measured: "The book's crest, in its pixels from the point where the heads meet: the upright head's foot from 62.5 to either side, bowing 7.5 down through that point; its sides through 57.5 out at 62.5 up to its end's corners 37.5 out at 92.5 up; its end bowing to 101 and its face to 77.5; its stub 32 wide, to 130 up. The lower heads meet on the upright 105 below, and the left one runs out through (-102.5, -15) and (-140, -85) to its end, its face through (-87.5, -62.5). The crest is the same left and right, as printed, but not turned: the upright head's foot runs nearly straight across. The book's two halves differ by about 5.",
  source: { ...SHINSEN_MONCHO, frame: 23, place: { en: "right page, third row, first column from the right: 三ッよこつち", ja: "右頁、三段目、右から一列目「三ッよこつち」" }, read: "2026-11-28", measured: true },
  build: mitsuYokoTsuchiBuild,
});
