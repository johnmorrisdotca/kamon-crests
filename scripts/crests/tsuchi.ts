import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuTsuchiBuild } from "./drawn/itsutsu-tsuchi.ts";
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

export const itsutsuTsuchi = defineCrest({
  id: "itsutsu-tsuchi",
  name: { en: "Five mallets", ja: "五つ槌" },
  reading: "いつつづち",
  romaji: "itsutsu zuchi",
  frame: "none",
  motifs: [{ motif: "mallet", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッつち"],
  construction: {
    en: "Five mallets turn a fifth of a turn apart. Each head lies across the radius, its round face on its anticlockwise end, and the handle runs through it, showing as a flat tab on either side.",
    ja: "五つの槌を五分の一回転ずつ回して置きます。どの頭も半径に直角に置き、丸い面を反時計回り側の端に見せ、柄は頭を貫いて両側に平たいつまみとして出ます。",
  },
  measured: "The book's mallets, in its pixels from their middle: the heads' middles 91 to 106 out (97.5 here), each 115 long and 70 deep with ends rounded on arcs of 40 and a face 25 in from its end; the outer tabs 60 by 17 and the inner 47 by 20. The book turns the five 16.7 degrees anticlockwise of upright, and so does this; its spacing varies from 71 to 73 degrees.",
  source: { ...SHINSEN_MONCHO, frame: 23, place: { en: "right page, first row, first column from the right: 五ッつち", ja: "右頁、一段目、右から一列目「五ッつち」" }, read: "2026-11-28", measured: true },
  build: itsutsuTsuchiBuild,
});
