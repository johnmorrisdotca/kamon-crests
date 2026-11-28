import { himotsukiTsuzumiBuild, tsuzumiFrontBuild } from "./drawn/tsuzumi.ts";
import { chigaiTsuzumiBuild, narabiKodoBuild } from "./drawn/kodo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const himotsukiTsuzumi = defineCrest({
  id: "himotsuki-tsuzumi",
  name: { en: "Hand drum with cord", ja: "紐付き鼓" },
  reading: "ひもつきつづみ",
  romaji: "himotsuki tsuzumi",
  frame: "none",
  motifs: [{ motif: "hand-drum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["紐付つづみ"],
  construction: { en: "A round drumhead is bound at six places and loops of cord end in two tassels.", ja: "丸い鼓の面を六か所で締め、回した紐の先に二つの房を付けます。" },
  measured: "The head and its inner disc share a centre. The cord loops follow the off-centre arcs seen behind the head.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, third row, third column from the right: 紐付つづみ", ja: "右頁、三段目、右から三列目「紐付つづみ」" }, read: "2026-11-26", measured: true },
  build(c) {
    himotsukiTsuzumiBuild(c);
  },
});

export const tsuzumi = defineCrest({
  id: "tsuzumi",
  name: { en: "Hand drum", ja: "鼓" },
  reading: "つづみ",
  romaji: "tsuzumi",
  frame: "none",
  motifs: [{ motif: "hand-drum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["つづみ"],
  construction: {
    en: "The circular striking head sits in front of a second offset head. Six laces hold the front rim, with two small cord knots at the foot.",
    ja: "正面の丸い打面を、ずらした後ろの面の手前に置きます。正面の縁を六か所で締め、下に二つの紐の結びを付けます。",
  },
  measured: "The two heads overlap with a broad crescent visible above the front face. The inner disc of the front head shares the same centre. The small knots are balanced on either side.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, fourth row, third column from the right: つづみ", ja: "右頁、四段目、右から三列目「つづみ」" }, read: "2026-11-26", measured: true },
  build: tsuzumiFrontBuild,
});

export const narabiKodo = defineCrest({
  id: "narabi-kodo",
  name: { en: "Two drum bodies side by side", ja: "並び鼓胴" },
  reading: "ならびこどう",
  romaji: "narabi kodō",
  frame: "none",
  motifs: [{ motif: "hand-drum", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["ならびつゞみどう"],
  construction: {
    en: "Two drum bodies without their heads stand side by side, the corners of their flat ends meeting. Each has a cup at either end and a waisted barrel between, joined at sharp necks.",
    ja: "皮を張らない鼓の胴を二つ並べて立て、平らな端の角を合わせます。どれも両端に椀形があり、その間のふくらんだ胴とは鋭いくびれでつながります。",
  },
  measured: "The book's bodies, in its pixels: 242 high and 127 across their ends; each cup curves in through a point 40.8 in from the end and 50 out, to a neck 69.5 in and 21 out (the book's two differ, 17.5 and 24.5); the barrel bows out to 33.8 (31 and 36.5).",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, second row, fourth column from the right: ならびつゞみどう", ja: "右頁、二段目、右から四列目「ならびつゞみどう」" }, read: "2026-11-28", measured: true },
  build: narabiKodoBuild,
});

export const chigaiTsuzumi = defineCrest({
  id: "chigai-tsuzumi",
  name: { en: "Crossed hand drums", ja: "違い鼓" },
  reading: "ちがいつづみ",
  romaji: "chigai tsuzumi",
  frame: "none",
  motifs: [{ motif: "hand-drum", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["違ひつゞみ"],
  construction: {
    en: "Two hand drums cross, each a pair of rounded bells joined by a barrel. The rims of the two upper heads show across their bells. The drum from the upper left lies in front, its barrel over the other's, and the bells lie over the barrels.",
    ja: "鼓を二つ交差させます。どれも丸い椀二つを胴でつないだ形です。上の二つの椀には皮の縁を見せます。左上からの鼓を手前にし、その胴をもう一方の胴の上に重ね、椀は胴の上に置きます。",
  },
  measured: "The book's crest, in its pixels from the middle, mirrored about the upright (its two halves agree to about 6). Each upper bell is three arcs through its corners 140 up and 63 out, 55 up and 138 out, and 21.5 up and 53 out, and through 105 up and 128 out, 25 up and 98 out, and 77.5 up and 33 out between them; the rim of its head is an arc from the outer corner through 87.5 up and 83 out to the top. Each lower bell is three arcs through its corners 60 down and 138 out, 52.5 down and 25.5 out, and 140 down and 58 out. The barrel is a band 57.6 wide with round ends, 74.4 between their centres, about a point 5 to the side and 12 below the middle, 39.8 degrees from level. The book's lower bells come to a sharper point at the foot than these arcs give.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, third row, fourth column from the right: 違ひつゞみ", ja: "右頁、三段目、右から四列目「違ひつゞみ」" }, read: "2026-11-28", measured: true },
  build: chigaiTsuzumiBuild,
});
