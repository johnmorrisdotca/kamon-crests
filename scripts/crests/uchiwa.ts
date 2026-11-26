import { SHINSEN_MONCHO } from "./books.ts";
import { hitotsuKaraUchiwaBuild, hosowaNiNihonUchiwaBuild, mitsuUchiwaBuild } from "./drawn/uchiwa.ts";
import { defineCrest } from "./util.ts";

export const mitsuUchiwa = defineCrest({
  id: "mitsu-uchiwa",
  name: { en: "Three round fans", ja: "三つ団扇" },
  reading: "みつうちわ",
  romaji: "mitsu uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッうちは"],
  construction: {
    en: "Three round paper faces stand 120 degrees apart. The ribs appear near the centre, below a curved binding. Three ruled handles cross in the middle and project between the paper faces.",
    ja: "丸い地紙を三枚、120度ずつ並べます。中心に近い地紙には、束ねる円弧の下に骨を入れます。まっすぐな柄は中央で交差し、地紙の間から突き出ます。",
  },
  measured: "The paper circles are about 130 units wide in the crop. The lower pair stand about 99 from the common crossing, the upper one about 82. This is drawn with a radius of 42 and centres 53 from the crossing, on equal 120 degree divisions. The binding arc about the pivot is 41, the handle is 10 wide and reaches 93 from the crossing.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, first row, third column from the right: 三ッうちは", ja: "右頁、一段目、右から三列目「三ッうちは」" }, read: "2026-11-26", measured: true },
  build: mitsuUchiwaBuild,
});

export const hitotsuKaraUchiwa = defineCrest({
  id: "hitotsu-kara-uchiwa",
  name: { en: "One Chinese round fan", ja: "一つ唐団扇" },
  reading: "ひとつからうちわ",
  romaji: "hitotsu kara uchiwa",
  frame: "none",
  motifs: [{ motif: "kara-uchiwa", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["一ッ唐うちは"],
  construction: {
    en: "A long central handle ends in a pointed cap. The two matching halves of the fan have a rounded crown and foot with a narrow waist between them. Two curved scrolls and nine short ribs open in white on each half.",
    ja: "長い柄の上にとがった飾りを置きます。左右同じ形の地紙は、上と下が丸くふくらみ、中央が細くなります。それぞれに二つの巻きと九本の短い骨を白く抜きます。",
  },
  measured: "The cell's outer faces span about 228 units in the crop against a height of about 290. The upper and lower curls are about 36 and 24 wide. On the layout the faces are approximately 144 by 150 with curls of diameter 24 and 16, alongside a 12-wide handle tipped by a 46-wide cap.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, third row, first column from the right: 一ッ唐うちは", ja: "右頁、三段目、右から一列目「一ッ唐うちは」" }, read: "2026-11-26", measured: true },
  build: hitotsuKaraUchiwaBuild,
});

export const hosowaNiNihonUchiwa = defineCrest({
  id: "hosowa-ni-nihon-uchiwa",
  name: { en: "Two round fans in a thin ring", ja: "細輪に二本団扇" },
  reading: "ほそわににほんうちわ",
  romaji: "hosowa ni nihon uchiwa",
  frame: "ring-thin",
  motifs: [{ motif: "kara-uchiwa", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["細ワニ二本うちは"],
  construction: {
    en: "Two matching Chinese round fans stand side by side in a thin ring. Each has a straight handle, paper that narrows at its waist, two curls and four short ribs on either side.",
    ja: "細輪の中に同じ形の唐団扇を二本並べます。それぞれの団扇には、まっすぐな柄と中央の細い地紙があり、柄の両側に二つの巻きと四本の短い骨を入れます。",
  },
  measured: "The cell's ring is about 300 wide in the crop and its black band about 12. Each stem is about 212 long, and the pair's axes are roughly 120 apart. The construction uses a 192-unit ring of the package's thin weight, stems 125 long and axes 82 apart. Four ribs are visible on each face.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, first row, first column from the right: 細ワニ二本うちは", ja: "右頁、一段目、右から一列目「細ワニ二本うちは」" }, read: "2026-11-26", measured: true },
  build: hosowaNiNihonUchiwaBuild,
});
