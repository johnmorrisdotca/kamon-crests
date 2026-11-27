import { SHINSEN_MONCHO } from "./books.ts";
import { kuwanaUchiwaBuild } from "./drawn/kuwana-uchiwa.ts";
import { teasobiUchiwaBuild, hitotsuKaraUchiwaBuild, hosowaNiNihonUchiwaBuild, mitsuUchiwaBuild, haUchiwaBuild, mitsuKenKaraUchiwaBuild, shuroUchiwaBuild, mitsuKaraUchiwaBuild } from "./drawn/uchiwa.ts";
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
    ja: "丸い地紙を三枚、120度ずつ並べます。骨は中心の近く、束ねる円弧の下に入れます。まっすぐな柄は中央で交差し、地紙の間から突き出ます。",
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
    ja: "細輪の中に同じ形の唐団扇を二本並べます。それぞれの団扇には、まっすぐな柄と、中央がくびれた地紙があり、柄の両側に二つの巻きと四本の短い骨を入れます。",
  },
  measured: "The cell's ring is about 300 wide in the crop and its black band about 12. Each stem is about 212 long, and the pair's axes are roughly 120 apart. The construction uses a 192-unit ring of the package's thin weight, stems 125 long and axes 82 apart. Four ribs are visible on each face.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, first row, first column from the right: 細ワニ二本うちは", ja: "右頁、一段目、右から一列目「細ワニ二本うちは」" }, read: "2026-11-26", measured: true },
  build: hosowaNiNihonUchiwaBuild,
});

export const haUchiwa = defineCrest({
  id: "ha-uchiwa",
  name: { en: "Feather fan", ja: "羽団扇" },
  reading: "はうちわ",
  romaji: "ha uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["羽うちは"],
  construction: {
    en: "One long feather and five matching pairs spread from a rounded handle with two scrolls. Each feather is a lens between two compass arcs with a fine white shaft.",
    ja: "巻きのある丸い柄から、中央の長い羽一枚と左右五対の羽を広げます。羽は二つの円弧にはさまれた形にし、細い白い羽軸を入れます。",
  },
  measured: "The print has eleven pointed feathers. The longest reaches about 212 above the handle crown in the crop. The six tip heights and widths on one side are rounded to layout coordinates, and mirrored. The centre lens is 132 long, with equal arcs of radius 97. The two scrolls have radius 6.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, second row, second column from the right: 羽うちは", ja: "右頁、二段目、右から二列目「羽うちは」" }, read: "2026-11-26", measured: true },
  build: haUchiwaBuild,
});

export const shuroUchiwa = defineCrest({
  id: "shuro-uchiwa",
  name: { en: "Palm-leaf fan", ja: "棕櫚団扇" },
  reading: "しゅろうちわ",
  romaji: "shuro uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["棕櫚うちは", "しゅろうちは"],
  construction: {
    en: "Pleated palm blades spread in pairs around the upright one. Each blade has a rounded tip, a white midrib and three V-shaped pleats. The handle has two small scrolls.",
    ja: "中央の一枚を真上に置き、折り目のある棕櫚の葉を左右に広げます。葉先を丸くし、白い中肋と三つのV字の折り目を入れます。柄には小さな巻きを二つ置きます。",
  },
  measured: "The print repeats a narrow blade with rounded ends, a centre line and chevron marks. Six tip positions on one side set out the half-fan. The tip radii range from 12 to 17 and the upper blade reaches 134 above its root. The small variations in the print's fold spacing are made regular.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, first row, second column from the right: 棕櫚うちは, with しゅろ beside the kanji", ja: "右頁、一段目、右から二列目「棕櫚うちは」（「しゅろ」の振り仮名）" }, read: "2026-11-26", measured: true },
  build: shuroUchiwaBuild,
});

export const mitsuKenKaraUchiwa = defineCrest({
  id: "mitsu-ken-kara-uchiwa",
  name: { en: "Three Chinese round fans with swords", ja: "三つ剣唐団扇" },
  reading: "みつけんからうちわ",
  romaji: "mitsu ken kara uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 3, arrangement: "radial" }, { motif: "sword", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッけん唐うちは"],
  construction: {
    en: "Three scroll-edged fans point away from a round hub. Small ruled swords fill the three spaces between them. The fans and swords are each set 120 degrees apart.",
    ja: "丸い中心から、縁の巻いた唐団扇を三つ外へ向けます。団扇の間に、直線で作った剣を三つ置きます。団扇も剣も120度ずつ間をあけます。",
  },
  measured: "The print has three paired scroll faces, each about 130 wide in the crop, alternating with three swords about 50 wide across their broad tips. The layout uses three faces of about 70 units across and sword tips 34 across. The small round hub is 22 wide.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, second row, first column from the right: 三ッけん唐うちは", ja: "右頁、二段目、右から一列目「三ッけん唐うちは」" }, read: "2026-11-26", measured: true },
  build: mitsuKenKaraUchiwaBuild,
});

export const mitsuKaraUchiwa = defineCrest({
  id: "mitsu-kara-uchiwa",
  name: { en: "Three Chinese round fans", ja: "三つ唐団扇" },
  reading: "みつとううちわ",
  romaji: "mitsu tō uchiwa",
  frame: "none",
  motifs: [{ motif: "kara-uchiwa", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ唐うちは", "みつからうちわ"],
  construction: {
    en: "Three scroll-edged fans meet at a small eye. Each long stem divides its two lobes, and short white ribs open away from it.",
    ja: "縁を巻いた団扇を三つ、小さな丸い要に集めます。長い柄で二つのふくらみを分け、柄から短い白い骨を開きます。",
  },
  measured: "The upright fan and lower pair stand a third of a turn apart. Each long stem runs between two lobes, wider at the lower shoulder, with curled white ends.",
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, fourth row, fourth column from the right: 三ッ唐うちは", ja: "左頁、四段目、右から四列目「三ッ唐うちは」" }, read: "2026-11-26", measured: true },
  build: mitsuKaraUchiwaBuild,
});

export const teasobiUchiwa = defineCrest({
  id: "teasobi-uchiwa",
  name: { en: "Hand-play round fan", ja: "手遊び団扇" },
  reading: "てあそびうちわ",
  romaji: "teasobi uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["手あそびうちは"],
  construction: {
    en: "A round fan with ruled slats has a shaped handle and hanging cords. A small tassel ends each of the two cord paths.",
    ja: "まっすぐな骨のある丸い団扇に、くびれた柄と垂らした紐を付けます。二つの紐の端にそれぞれ小さな房を置きます。",
  },
  measured: "The circular paper sits above the rib arc and the lobed handle. The cord ends are at different heights in the printed image and the lower loop follows the side of the handle.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, second row, third column from the right: 手あそびうちは", ja: "右頁、二段目、右から三列目「手あそびうちは」" }, read: "2026-11-26", measured: true },
  build: teasobiUchiwaBuild,
});

export const kuwanaUchiwa = defineCrest({
  id: "kuwana-uchiwa",
  name: { en: "Kuwana round fan", ja: "桑名団扇" },
  reading: "くわなうちわ",
  romaji: "kuwana uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["桑名うちは"],
  construction: {
    en: "Strike two inked faces with pale inset rims and rule the handle between them. Cut out five needled pines and five veined sprays rooted in one branch.",
    ja: "白い内縁のある二つの面を打ち、その間に柄を引きます。一方から松葉のある松を五つ抜き、もう一方から一本の枝に付く細い葉の束を五つ抜きます。",
  },
  measured: "The handle tilts about 29 degrees below horizontal and the pair spans about 306 pixels. The two rims mirror across the handle. Five equal crowns and five equal sprays follow the two faces.",
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, second row, fourth column from the right: 桑名うちは", ja: "左頁、二段目、右から四列目「桑名うちは」" }, read: "2026-11-27", measured: true },
  build: kuwanaUchiwaBuild,
  placementBuild: { module: new URL("./drawn/kuwana-uchiwa.ts", import.meta.url), export: "kuwanaUchiwaBuild" },
});
