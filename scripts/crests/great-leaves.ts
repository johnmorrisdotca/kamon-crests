// Oak, water-plantain, tachibana, ivy and ginger crests of the 1892 crest book, each set out with the compass and the ruler.
import { RING_GAP } from "../construct/builder.ts";
import { R } from "../construct/geo.ts";
import { embraceBuild } from "./drawn/oak.ts";
import { crossBuild } from "./drawn/oak-cross.ts";
import { singleBuild } from "./drawn/oak-single.ts";
import { omodakaBuild } from "./drawn/leafy.ts";
import { kuzushiBuild, owariBuild } from "./drawn/tsuta-lobes.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

const READ_AT = "2026-11-26";

export const dakiGashiwa = defineCrest({
  id: "daki-gashiwa",
  name: { en: "Embracing oak leaves", ja: "抱き柏" },
  reading: "だきかしわ",
  romaji: "daki-gashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["two oak leaves facing", "kashiwa embracing"],
  construction: {
    en: "Two oak leaves face to face, their tips together at the top with a white line between them. A leaf's outer edge is four round scallops and one wide arc across the top; its foot is cut on a slant, so that the two leaves part in a V. A white midrib curves up it, with five white veins outside the midrib and six between it and the middle, each an arc. The right leaf is built in full, then its stalk, then the left leaf and its stalk where they stand; the two stalks cross.",
    ja: "柏の葉を二枚、先を上で合わせて向かい合わせに置き、間に白い線を一本通します。葉の外側の縁は、四つの丸いふくらみと、上を渡る大きな一つの弧でできています。足は斜めに切るので、二枚の葉はV字に分かれます。白い中肋を弧で通し、その外側に五本、内側（中心側）に六本の白い葉脈を、どれも弧で通します。右の葉、その葉柄の順に作図し、左の葉と葉柄はその場で作図します。二本の葉柄は交差します。",
  },
  measured:
    "The 抱き柏 of the 1892 crest book (frame 17, right page, row 1, column 1 counted from the right), measured as numbers in units of the radius of the circle round it. Each leaf's outside is four scallops (circles of 20, 32, 29 and 30) and one arc of 105 across the top that runs close to the layout circle, fitted to the book's outline; the midrib is an arc of 156; there are five veins outside it and six between it and the middle, arcs of 58 to 149. The book draws the leaves in outline with a ragged edge, a notched slit between them, more veins than ours, and stalks that cross low. Ours is solid, as a crest is worn, the left leaf the mirror of the right, the slit a straight white line, and the stalks two short bars that cross.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, first row, first column counted from the right: 抱かしは (two leaves face to face; measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から一列目「抱かしは」（向かい合う二枚の葉。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    embraceBuild(c, "oak", R);
  },
});

export const maruNiIchimaiGashiwa = defineCrest({
  id: "maru-ni-ichimai-gashiwa",
  name: { en: "One oak leaf in a circle", ja: "丸に一枚柏" },
  reading: "まるにいちまいかしわ",
  romaji: "maru ni ichimai-gashiwa",
  frame: "ring-medium",
  motifs: [{ motif: "oak", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["single oak leaf in a ring", "kashiwa in a ring"],
  construction: {
    en: "One oak leaf standing upright inside a ring about a tenth of the diameter thick, a narrow white line between them. The leaf's edge is seven arcs a side that meet in notches, from the tip down to the foot, the left edge the mirror of the right; a white midrib runs up it with four white veins each side, each an arc; its stalk is a short bar under it.",
    ja: "直径の約10分の1の太さの輪の内側に、柏の葉を一枚まっすぐに立てて収め、輪とのあいだに細い白線を残します。葉の縁は、先から足まで、くぼみで出会う片側七つの弧でできていて、左の縁は右の縁を左右反転したものです。白い中肋を通し、左右四本ずつの白い葉脈を弧で通します。葉柄は葉の下の短い棒です。",
  },
  measured:
    "The 丸ニ一枚かしは of the 1892 crest book (frame 16, left page, row 1, column 4 counted from the right), measured as numbers in units of the radius the ringed motif reaches. The leaf stands tip to foot over the whole reach (the stalk's end 98 under the centre) and is about 55 across each side of the midrib at its widest. Each side's edge is seven arcs fitted to the book's outline, of circles of 54, 37, 29, 65, 24, 49 and 11; four veins a side, arcs of 60 to 146, leave the midrib one above the next. The book draws the leaf in outline, with a notched edge, more veins and a stalk drawn as a box; ours is solid, the ring is the package's medium ring, and the white midrib stops short of the tip and the foot.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, first row, fourth column counted from the right (the leftmost): 丸ニ一枚かしは (one leaf in a ring; measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から四列目（いちばん左）「丸ニ一枚かしは」（輪に入った一枚の葉。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    singleBuild(c, "oak", inner - RING_GAP);
  },
});

export const owariTsuta = defineCrest({
  id: "owari-tsuta",
  name: { en: "Large split ivy", ja: "大割蔦" },
  reading: "おおわりつた",
  romaji: "ōwari tsuta",
  frame: "none",
  motifs: [{ motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["owari tsuta", "large split ivy leaf"],
  construction: {
    en: "Five round-edged lobes about a small ring, a white line between neighbours: two upper lobes parted by an upright line, one lobe to each side, and a lobe that points down between the side ones. Each lobe's outer edge is a run of round scallops, and the white lines between lobes are arcs of two large circles, each a white line wide; the small ring is a disc in a white ring. The right half is built in full, then the lower lobe, then the left half where it stands.",
    ja: "小さな輪のまわりに、丸い縁の裂片を五つ、となり合うものの間に白い線を一本ずつあけて置きます。上に二つ（縦の線で分けます）、左右に一つずつ、下向きの一つを左右の裂片のあいだに置きます。どの裂片も外側の縁は丸いふくらみの連なりで、裂片の間の白い線は、大きな二つの円の弧（白い線一本の幅）です。小さな輪は、白い輪の中の円です。右半分、下の裂片の順に作図し、左半分はその場で作図します。",
  },
  measured:
    "The 大割蔦 of the 1892 crest book (frame 22, left page, row 1, column 1 counted from the right), measured as numbers in units of the radius of the circle round it. The small ring stands 22 above the middle and is 20 across; the white lines between the lobes are arcs of circles of 87 and 88 (read 87.3 and 87.5) and an upright line; the edge of each lobe is a run of circles of 14 to 54 fitted to the book's outline. The book draws the lobes in outline, with a single line between them; ours are solid with a white line 2 wide, plain round scallops, and the left half the mirror of the right, where the book's two halves differ a little.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "left page, first row, first column counted from the right: 大割蔦 (five plain lobes; measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から一列目「大割蔦」（飾りのない五つの裂片。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    owariBuild(c, "ivy", R);
  },
});

export const kuzushiTsuta = defineCrest({
  id: "kuzushi-tsuta",
  name: { en: "Stylised ivy", ja: "崩し蔦" },
  reading: "くずしつた",
  romaji: "kuzushi tsuta",
  frame: "none",
  motifs: [{ motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["kuzushi tsuta", "stylized ivy"],
  construction: {
    en: "Five lobes with no ring and a white gap between neighbours: two upper lobes leaning together with a white lens between them, one lobe to each side under them, and a lobe that points down between the side ones, all five meeting at one place. Each lobe is round bodies cut by the arcs of large circles; the gap between the upper and the side lobes is the space between circles of 97 and 100.5, and the gap between the side and the lower lobes the space between circles of 86 and 89.5. The right half is built in full, then the lower lobe, then the left half where it stands.",
    ja: "輪のない五つの裂片を、となり合うものの間に白いすき間をあけて置きます。上の二つの裂片は寄りそって、間に細長い白いレンズ形を残し、左右の裂片はその下に置き、下向きの裂片は左右の裂片のあいだに置きます。五つの裂片は一点に集まります。どの裂片も、丸い形を大きな円の弧で切った形で、上と左右の裂片の間のすき間は半径97と100.5の二つの円の間、左右と下の裂片の間のすき間は半径86と89.5の二つの円の間です。右半分、下の裂片の順に作図し、左半分はその場で作図します。",
  },
  measured:
    "The くづし蔦 of the 1892 crest book (frame 22, left page, row 3, column 3 counted from the right), measured as numbers in units of the radius of the circle round it. The five lobes meet about 38 above the middle; the gap between the upper and the side lobes is bounded by arcs of circles of 92.5 and 96.9 (read), that between the side and the lower lobes by arcs of 85.8 and 87.5, and the lens between the upper lobes by an arc of 39.5. The label prints くづし in kana, and ours is named 崩し蔦 after the word. The book draws the lobes in outline with a wavy edge; ours are solid, with plain round scallops and a lens a little narrower than the book's, and the left half the mirror of the right.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "left page, third row, third column counted from the right: くづし蔦 (five plain lobes with gaps; measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から三列目「くづし蔦」（すき間をあけた飾りのない五つの裂片。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    kuzushiBuild(c, "ivy", R);
  },
});

export const itowaNiOmodaka = defineCrest({
  id: "itowa-ni-omodaka",
  name: { en: "Water plantain in a thin ring", ja: "糸輪に沢瀉" },
  reading: "いとわにおもだか",
  romaji: "itowa ni omodaka",
  frame: "ring-thin",
  motifs: [{ motif: "sword-leaf", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["standing arrowhead in a thin ring", "omodaka in a thread ring"],
  construction: {
    en: "The standing water plantain inside a thin ring, a narrow white line between them.",
    ja: "細い輪の内側に、立ち沢瀉を収め、輪とのあいだに細い白線を残します。",
  },
  measured:
    "The 糸ワニおもだか of the 1892 crest book (frame 14, right page, row 1, column 3 counted from the right), measured as numbers in units of the ring's outer radius (96): the standing water plantain, drawn as 立ち沢瀉 is, inside one thin ring; the leaf's tip and the foot of its stems reach 83 (read 82.9 and 81.6) and the two sprays stand 74 to 80 out. The ring is the package's thin ring, 6.4 wide, where the book's is a single thin line; the book's leaf is slightly narrower across its lower lobes than ours.",
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, first row, third column counted from the right: 糸ワニおもだか (the standing water plantain in a thin ring; measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から三列目「糸ワニおもだか」（細い輪に入った立ち沢瀉。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    c.ring("ring-thin");
    // The leaf's tip and the foot of its stems reach 0.86 of the ring's outer radius in the book (83 of 96), a little under the ringed crests' 0.79 of the radius would give.
    omodakaBuild(c, "sword-leaf", 83);
  },
});

export const chigaiGashiwa = defineCrest({
  id: "chigai-gashiwa",
  name: { en: "Crossed oak leaves", ja: "違い柏" },
  reading: "ちがいかしわ",
  romaji: "chigai-gashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["crossed kashiwa", "two oak leaves crossed"],
  construction: {
    en: "Two oak leaves crossed. One broad leaf lies across from the lower left to the upper right, over a second leaf, its mirror image drawn a twentieth smaller, of which only the pointed end at the upper left and a wedge at the lower right show; a narrow white line runs round the front leaf where it passes over. A leaf's edge is five arcs that meet at its stalk, at a corner of its upper edge, at its tip and at a notch below; a white midrib is ruled up it and five white arc veins leave it each side. The back leaf is built first and cut a white line short of the front one, then the front leaf, then a short bar for each stalk.",
    ja: "柏の葉を二枚、交差させます。幅の広い一枚が左下から右上へ横切って、もう一枚（それを左右反転して二十分の一だけ小さくしたもの）の上に重なり、後ろの葉は、左上のとがった先と、右下のくさび形のところだけが見えます。前の葉のまわりは、重なるところに細い白線を一本通します。葉の縁は五つの弧で、葉柄のところ、上の縁の角、先、下のくぼみで出会います。白い中肋を直線で通し、その左右に五本ずつ、弧の白い葉脈を出します。後ろの葉を先に作図し、前の葉から白い線一本分だけ離して切ります。つぎに前の葉、最後に二本の短い葉柄を作図します。",
  },
  measured:
    "The ちがひかしは of the 1892 crest book (frame 17, right page, row 2, column 3 counted from the right), measured as numbers in units of the radius of the circle round it. The front leaf runs from its stalk at (-57, -57) to its tip at (86, 41), about 36 degrees above level, 150 long and about 90 across at its broadest; its upper edge stands 53 to 57 up and its lower edge turns in at a notch at (52, -14). The back leaf is its mirror image drawn 0.95 the size about its stalk at (57, -57). The book draws the back leaf a little smaller and rounder where it shows below the front leaf, wavy edges and a small cut end on each stalk; ours has plain arcs, a wedge at the lower right, and square-cut stalks.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, second row, third column counted from the right: ちがひかしは (two leaves crossed; measured, and drawn with compass and ruler)", ja: "右頁、二段目、右から三列目「ちがひかしは」（交差した二枚の葉。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    crossBuild(c, "oak", R);
  },
});
