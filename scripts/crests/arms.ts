// Crests of arms and tools: arrows and the arrow's nock, axes and sickles. The arrows are measured from the crest book of 1892
// (frame 29) and from public pictures of the crests; the sources are named beside each crest and in docs/provenance.md.
import { RING_GAP } from "../construct/builder.ts";
import { R } from "../construct/geo.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { chigaiYaBuild, chigaiYaWholeBuild, narabiYaBuild, yahazuBuild } from "./drawn/arms.ts";
import { defineCrest } from "./util.ts";

const MEASURED_PAIR = "The Wikimedia Commons picture Japanese crest Narabi Ya, in units of half a shaft's length: the shafts 45.65 either side of the middle and 7.7 wide, a white of 1.5 each side; a vane 38.4 out at the shaft's middle, leaning out 0.058 for each unit up; its top, foot and bands rising two in three; three white lines 2 wide and 12 apart near each end; two bindings across the shaft at the vanes' top and one at their foot; the nock slit 1.6 wide. Checked against the 1892 crest book";

export const chigaiYa = defineCrest({
  id: "chigai-ya",
  measured: "The crossed arrows of the 1892 crest book (frame 29, 違ひ矢), in units of half the crest's width, from the crossing: the arrows lean 50 degrees each way; the nock 98 up the shaft, the head's foot 73 down it, the shaft 4 wide; a vane out to 29 from the shaft's middle and from 9 to 83 up the shaft, its ends rising 0.54 outwards; two bands of three lines across each vane; the forked head two circles of 16 and 15 struck 8 apart, the leaf head a circle of 17 with a point 25 beyond its centre and a drop cut from it. The arrow whose nock is at the upper right passes over. The book draws in outline; its lines are the white lines here.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, first row, fourth column: 違ひ矢 (measured, and drawn with compass and ruler)", ja: "左頁、一段目の四列目「違ひ矢」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Crossed arrows", ja: "違い矢" },
  reading: "ちがいや",
  romaji: "chigai ya",
  frame: "none",
  motifs: [{ motif: "arrow", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["two arrows crossed", "arrows", "ya"],
  construction: {
    en: "Two whole arrows crossed below their middles, each 50 degrees from upright, the feathered ends up; the one whose nock is at the upper right passes over, a narrow white each side of it. An arrow is a ruled shaft with a vane each side: the space between the shaft's white, an outer line and two slanting ends, crossed by two bands of three white lines. The arrow in front ends in a forked head, the black between two circles; the one behind in a leaf-shaped head, a circle drawn to a point by two circles that touch it, with a drop cut from it.",
    ja: "二本の矢を、真ん中より下で交差させます。どちらも垂直から50度傾け、羽を上にします。矢筈が右上にある矢を上に重ね、その両側に細い白を残します。矢は、定規で引いた軸の両側に羽を一枚ずつつけた形です。羽は、軸のわきの白、外側の線、斜めの両端の線にはさまれた部分で、三本ずつの白い線を二か所に入れます。上の矢の先は、二つの円にはさまれた二股の矢じり、下の矢の先は、円に二つの円を外から当てて先をとがらせた木の葉形の矢じりで、しずく形の穴をあけます。",
  },
  build(c) {
    chigaiYaWholeBuild(c, "arrow", R);
  },
});

export const narabiYa = defineCrest({
  id: "narabi-ya",
  measured: `${MEASURED_PAIR} (frame 29, 二本ならび矢), which has the same arrows in outline.`,
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "right page, fourth row, first column: 二本ならび矢 (compared; measured from a public picture, and drawn with compass and ruler)", ja: "右頁、四段目の一列目「二本ならび矢」（見比べ用。寸法は公開されている図から測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Arrows side by side", ja: "並び矢" },
  reading: "ならびや",
  romaji: "narabi ya",
  frame: "none",
  motifs: [{ motif: "arrow", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["parallel arrows", "two arrows", "二本並び矢"],
  construction: {
    en: "The feathered ends of two arrows, upright and side by side. Each is a ruled shaft with a narrow white each side and a vane beyond it: the vane's outer line leans out towards the top, and its top, its foot and its bands all rise outwards at one slope, two in three, so the top is a notch and the foot a point. Three white lines cross each vane near each end, three bindings cross the shaft, and the nock at the top is slit.",
    ja: "二本の矢の羽の部分を、まっすぐ立てて横に並べます。矢は、定規で引いた軸の両側に細い白を残し、その外に羽をつけた形です。羽の外側の線は上へ行くほど外へ開きます。羽の上の端、下の端、白い線は、どれも外へ向かって同じ傾き（横3に対して縦2）で上がるので、上は切れ込み、下はとがった形になります。羽の上下の端の近くに白い線を三本ずつ入れ、軸には横の白い線を三本入れ、いちばん上の矢筈に切れ目を入れます。",
  },
  build(c) {
    narabiYaBuild(c, "arrow", R);
  },
});

export const maruNiChigaiYa = defineCrest({
  id: "maru-ni-chigai-ya",
  measured: "The Wikimedia Commons picture 家紋-丸に違い矢, in units of the ring's outer radius, along and across each shaft: the shafts half a right angle from upright, crossing on the centre, 4.8 wide, 71 to the nock and 78.5 to the foot, a white of 2.3 each side; a vane 27.3 out at the crossing, leaning out 0.05 for each unit up; three white lines 2.7 wide and 7.7 apart near each end; a white of 2.3 where one arrow passes under. Checked against the 1892 crest book (frame 29, 丸に違矢). The ring and the white inside it are the package's measured ones.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, second row, fourth column: 丸に違矢 (compared; measured from a public picture, and drawn with compass and ruler)", ja: "左頁、二段目の四列目「丸に違矢」（見比べ用。寸法は公開されている図から測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Crossed arrows in a circle", ja: "丸に違い矢" },
  reading: "まるにちがいや",
  romaji: "maru ni chigai ya",
  frame: "ring-medium",
  motifs: [{ motif: "arrow", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["crossed arrows in a ring", "ringed crossed arrows"],
  construction: {
    en: "The feathered ends of two arrows crossed on the centre inside a ring about a tenth of the diameter thick, each half a right angle from upright; the one whose nock is at the upper right passes over, a narrow white each side of it. The feet of the shafts are a narrow white line from the ring.",
    ja: "直径の約10分の1の太さの輪の中に、二本の矢の羽の部分を、中心で交差させて収めます。どちらも垂直から45度傾け、矢筈が右上にある矢を上に重ね、その両側に細い白を残します。軸の下の端は、輪から細い白線一本分だけ離します。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    chigaiYaBuild(c, "arrow", inner - RING_GAP);
  },
});

export const maruNiNarabiYa = defineCrest({
  id: "maru-ni-narabi-ya",
  measured: "The ringed pair of the 1892 crest book (frame 29, 丸に二本矢), in units of its ring's radius: the shafts 38 either side of the middle and 170 long, the vanes 131 long beside the shaft and 37 out at the top, 29 at the foot: the arrows of the crest with no ring at 0.85 of their size, set a little below the middle, so the corners of the vanes and the feet of the shafts reach the ring. Here they stop a narrow white line short of it; the ring and that white are the package's measured ones.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, third row, fourth column: 丸に二本矢 (measured, and drawn with compass and ruler)", ja: "左頁、三段目の四列目「丸に二本矢」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Arrows side by side in a circle", ja: "丸に並び矢" },
  reading: "まるにならびや",
  romaji: "maru ni narabi ya",
  frame: "ring-medium",
  motifs: [{ motif: "arrow", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["parallel arrows in a circle", "two arrows in a ring", "丸に二本矢"],
  construction: {
    en: "The two arrows side by side inside a ring about a tenth of the diameter thick, set a little below the middle so that the upper corners of the vanes and the feet of the shafts are a narrow white line from the ring.",
    ja: "直径の約10分の1の太さの輪の中に並び矢を収めます。真ん中より少し下に置き、羽の上の角と軸の下の端を、輪から細い白線一本分だけ離します。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    narabiYaBuild(c, "arrow", inner - RING_GAP);
  },
});

export const yahazu = defineCrest({
  id: "yahazu",
  measured: "The Wikimedia Commons picture Japanese crest Maru ni Yahazu, in units of its ring's outer radius: the sides 29.65 out at the middle, leaning out 0.098 for each unit up; the foot of the notch 52.9 up and the point 78.4 down, their lines rising 0.48 outwards. No picture of the nock with no ring was found, so this is the ringed crest's nock with its ring left out; the 1892 crest book (frame 29) has the same form three in a ring and two crossed.",
  name: { en: "Arrow nock", ja: "矢筈" },
  reading: "やはず",
  romaji: "yahazu",
  frame: "none",
  motifs: [{ motif: "arrow-nock", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["nock", "arrow notch", "arrow end"],
  construction: {
    en: "The end of an arrow that takes the bowstring, as six ruled lines: two sides that lean out towards the top, a notch cut into the top and a point at the foot, the notch's lines and the point's rising outwards at one slope.",
    ja: "弓の弦にかける矢の端を、六本の直線で描きます。左右の辺は上へ行くほど外へ開き、上には切れ込み、下にはとがった先を作ります。切れ込みの線と先の線は、外へ向かって同じ傾きで上がります。",
  },
  build(c) {
    yahazuBuild(c, "arrow-nock", R);
  },
});
