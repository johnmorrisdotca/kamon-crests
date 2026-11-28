import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiTsuchiBuild } from "./drawn/tsuchi.ts";
import { tsuchiGurumaBuild } from "./drawn/tsuchi-guruma.ts";
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

export const tsuchiGuruma = defineCrest({
  id: "tsuchi-guruma",
  name: { en: "Wheel of mallets", ja: "槌車" },
  reading: "つちぐるま",
  romaji: "tsuchi guruma",
  frame: "none",
  motifs: [{ motif: "mallet", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["つち車"],
  construction: {
    en: "A wheel of eight spokes, a rim and a hub, with eight mallets round it. Each mallet's handle runs out from the rim through its head, which lies across it, and shows a little beyond. The round face of each head is on its anticlockwise end.",
    ja: "八本の輻と輪と轂の車のまわりに、八つの槌を置きます。どの槌も柄が輪から外へ出て頭を横に貫き、先が少し出ます。頭の丸い面は反時計回り側の端にあります。",
  },
  measured: "The book's crest, in its pixels from the hub's centre: the hub 24 in radius; the rim from 70 to 82.5; the spokes 6 wide; each head about 80 long and 52 deep, its ends arcs of 60 (68 between their chords here, to leave white between neighbours), its middle 111 to 133 out (123 here), its face about 18 in from its end; the handles 12 wide, and their ends showing from 149 to 160 out. The book's eight are irregular; here they are a regular eighth of a turn apart.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "left page, third row, fourth column from the right: つち車", ja: "左頁、三段目、右から四列目「つち車」" }, read: "2026-11-28", measured: true },
  build: tsuchiGurumaBuild,
});
