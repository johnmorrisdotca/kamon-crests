// Crests of made things: feathers, fans, wheels, a ship, the moon, and the patterns that became crests.
import { RING_GAP } from "../construct/builder.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { CX, Path, R, ngonPoints, poly } from "../construct/geo.ts";
import { asanohaBuild, fanBuild, katabamiBuild, mikazukiBuild, shippoBuild, wheelBuild as genjiWheel, yotsumeBuild } from "./drawn/plain.ts";
import { gohonOgiBuild, uchiwaBuild } from "./drawn/fans.ts";
import { mokkoBuild } from "./drawn/leafy.ts";
import { takanohaBuild } from "./drawn/takanoha.ts";
import { toriiBuild } from "./drawn/torii.ts";
import { gionMamoriBuild } from "./drawn/gion.ts";
import { takaraBuild } from "./drawn/takara.ts";
import { eirakuBuild } from "./drawn/eiraku.ts";
import { defineCrest, fam } from "./util.ts";

const rect = (x0: number, y0: number, x1: number, y1: number): Path => poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]);

export const chigaiTakanoha = defineCrest({
  id: "chigai-takanoha",
  name: { en: "Crossed hawk feathers", ja: "違い鷹の羽" },
  reading: "ちがいたかのは",
  romaji: "chigai takanoha",
  frame: "none",
  motifs: [{ motif: "hawk-feather", count: 2, arrangement: "crossed" }],
  families: [fam("Asano", "浅野", "あさの")],
  aliases: ["hawk feathers", "takanoha", "asano", "crossed feathers"],
  construction: {
    en: "Two feathers of one size crossed at right angles, each half a right angle from upright, the one whose tip is at the upper right in front. A feather is two ruled sides and two half circles of its own width; a black shaft with a white line each side runs its length and out past the quill end; two bars cross it, each three white chevrons with their points on the shaft; and three fine arcs of down stand outside the quill end.",
    ja: "同じ大きさの鷹の羽を二枚、直角に交差させ、それぞれ垂直から45度傾け、先が右上を向く羽を手前にします。羽は、定規で引いた二本の辺と、羽と同じ幅の半円二つでできます。両側に白線のついた黒い羽軸が全長を通り、根元の先まで出ます。羽を横切る斑は二か所で、それぞれ羽軸の上に頂点を置いた三本の白い山形です。根元の外側には、細い弧の綿毛を三本添えます。",
  },
  build(c) {
    takanohaBuild(c, R);
  },
});

export const maruNiChigaiTakanoha = defineCrest({
  id: "maru-ni-chigai-takanoha",
  name: { en: "Crossed hawk feathers in a circle", ja: "丸に違い鷹の羽" },
  reading: "まるにちがいたかのは",
  romaji: "maru ni chigai takanoha",
  frame: "ring-medium",
  motifs: [{ motif: "hawk-feather", count: 2, arrangement: "crossed" }],
  families: [fam("Asano", "浅野", "あさの")],
  aliases: ["asano ring"],
  construction: { en: "The crossed feathers inside a ring about a tenth of the diameter thick, their tips and the ends of their shafts a narrow white line from it.", ja: "直径の約10分の1の太さの輪の中に違い鷹の羽を収め、羽の先と羽軸の端を、輪から細い白線一本分だけ離します。" },
  build(c) {
    const inner = c.ring("ring-medium");
    takanohaBuild(c, inner - RING_GAP);
  },
});

export const ogi = defineCrest({
  id: "ogi",
  name: { en: "Open fan", ja: "扇" },
  reading: "おうぎ",
  romaji: "ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["fan", "folding fan", "ougi", "satake"],
  construction: {
    en: "An open folding fan. The paper is the band between two arcs about the pivot, 56 degrees each side of upright, with thin white fold lines; a guard runs up each edge and five ribs fan out between them from the pivot.",
    ja: "開いた扇です。地紙は、要を中心とする二つの弧にはさまれた帯で、垂直から左右に56度ずつ開き、細い白い折り目を入れます。両端に親骨を一本ずつ、その間に要から五本の骨を広げます。",
  },
  build(c) {
    fanBuild(c, "fan", null, R);
  },
});

export const hinomaruOgi = defineCrest({
  id: "hinomaru-ogi",
  name: { en: "Sun-disc fan", ja: "日の丸扇" },
  reading: "ひのまるおうぎ",
  romaji: "hinomaru ōgi",
  frame: "none",
  motifs: [
    { motif: "fan", count: 1, arrangement: "single" },
    { motif: "sun-disc", count: 1, arrangement: "single" },
  ],
  families: [fam("Satake", "佐竹", "さたけ")],
  aliases: ["hinomaru fan", "satake", "fan with sun"],
  construction: {
    en: "The open fan with a sun disc standing on the upper edge of its paper, a white line round the disc where it lies over the paper.",
    ja: "開いた扇の地紙の上の縁に日の丸を重ね、地紙と重なるところは円のまわりを白く抜きます。",
  },
  build(c) {
    fanBuild(c, "fan", "sun-disc", R);
  },
});

export const gohonboneOgi = defineCrest({
  id: "gohonbone-ogi",
  measured: "The Wikimedia Commons picture Japanese Crest Gohonnhone Oogi, in units of half its width: the pivot 41 below the middle with a hole of 1.1; the paper the band between circles of 43.2 and 94.3 about it; five bones 3.5 wide, at 0, 30 and 60 degrees each side of upright, those of the left and the right at the paper's edges; the guard on the right 3.6 wide with a white of 0.7 between it and the paper, running from 11.9 beyond the pivot out to 94; the other four bones passing under it, their tops 42.6 from the pivot and their butts 11.9 beyond it. The 1892 crest book (frame 35, 五本骨日の丸扇) has the same fan with a sun disc.",
  name: { en: "Five-rib fan", ja: "五本骨扇" },
  reading: "ごほんぼねおうぎ",
  romaji: "gohonbone ōgi",
  frame: "none",
  motifs: [{ motif: "fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["five-bone fan", "fan", "ogi", "gohonbone"],
  construction: {
    en: "An open folding fan of five bones. The paper is the band between two circles about the pivot, from the outer edge of the left bone to the white beside the guard on the right; the bones stand at 30 degrees from one another, the guard a plain bar on top with a white either side of it and a small round hole at the pivot. The other four pass under the guard, showing below the paper, and come out beyond the pivot as round-ended butts that are narrow where they start.",
    ja: "五本の骨のある、開いた扇です。地紙は、要を中心とする二つの円にはさまれた帯で、左は左端の骨の外側の縁から、右は親骨のわきの白までです。骨は30度ずつ間をあけて並べ、親骨は右に置いた平らな棒で、両側に細い白を残し、要に小さな丸い穴をあけます。ほかの四本は親骨の下を通り、地紙より下にも見えて、要を越えたところで先の丸い骨尻になり、付け根は細くなります。",
  },
  build(c) {
    gohonOgiBuild(c, "fan", R);
  },
});

export const maruNiGohonboneOgi = defineCrest({
  id: "maru-ni-gohonbone-ogi",
  measured: "The Wikimedia Commons picture Japanese Crest Maru ni Gohonnhone Oogi, in units of its ring's outer radius: the fan's pivot 37 below the centre, the paper from 41 to 89.5 about it, the bones 3.4 wide and the guard 3.45, a white of 0.67 beside the guard, the bones' butts 11.3 beyond the pivot; the fan's farthest corners stand a narrow white line from the ring. The ring and that white are the package's measured ones.",
  name: { en: "Five-rib fan in a circle", ja: "丸に五本骨扇" },
  reading: "まるにごほんぼねおうぎ",
  romaji: "maru ni gohonbone ōgi",
  frame: "ring-medium",
  motifs: [{ motif: "fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["five-bone fan in a ring", "fan in a circle", "ringed fan"],
  construction: {
    en: "The five-rib fan set low in a ring about a tenth of the diameter thick, its two lower paper corners and the tip of its guard a narrow white line from the ring.",
    ja: "直径の約10分の1の太さの輪の中に、五本骨扇を低めに置きます。地紙の両端の角と親骨の先は、輪から細い白線一本分だけ離します。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    gohonOgiBuild(c, "fan", inner - RING_GAP, true);
  },
});

export const uchiwa = defineCrest({
  id: "uchiwa",
  measured: "The ringed round fan of the 1892 crest book (frame 26, 丸にうちは), in units of the radius of its paper: the pivot of the ribs 0.92 below the paper's centre; a handle 0.21 wide between the middles of its two lines (0.24 to their outsides), reaching 0.69 below the pivot; 20 ribs about 6.4 degrees apart, 18 reaching the top of the paper and one more each side below the binding arc, each line 0.03 wide; and the binding arc 0.84 about the pivot. Ours has a paper of 70, the pivot 64 below its centre, a handle 14 wide reaching 48 below the pivot, 20 ribs 6.4 degrees apart, and the arc 58 about the pivot: 0.91, 0.20, 0.69 and 0.83; each rib is a narrow wedge from the pivot, 0.02 wide at the arc and 0.04 at the top of the paper, where the book's lines are even. The book draws in outline; its lines are the white lines here, and the ring is left out.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, fourth row, third column: 丸にうちは (measured, with its ring left out, and drawn with compass and ruler)", ja: "右頁、四段目の三列目「丸にうちは」（輪を除いて寸法を測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Round fan", ja: "団扇" },
  reading: "うちわ",
  romaji: "uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["uchiwa", "round fan", "paddle fan", "fan"],
  construction: {
    en: "A round fan: a circle of paper, cut below by two ruled lines that run into the top of a plain handle. Twenty thin white ribs fan out from the pivot at the paper's foot to a narrow black rim, and a white arc about the pivot binds them. A rib is the thin wedge between two lines ruled through the pivot; the ribs at the top are built first, and the rest where they stand, clockwise.",
    ja: "丸い紙の下を二本の直線で切り、まっすぐな柄の上につないだ団扇です。紙の下の要から、細い白い骨を二十本、扇のように広げ、外側には細い黒いふちを残します。要を中心とする白い弧を一本引いて、骨を束ねます。骨は、要を通る二本の直線にはさまれた細い三角形で、上の骨を先に作図し、残りはその場で時計回りに作図します。",
  },
  build(c) {
    uchiwaBuild(c, "round-fan");
  },
});

export const maruNiUchiwa = defineCrest({
  id: "maru-ni-uchiwa",
  measured: "The ringed round fan of the 1892 crest book (frame 26, 丸にうちは), measured as the round fan with no ring is. The book draws in outline; its lines are the white lines here. The ring and the white inside it are the package's measured ones; the fan reaches the same 0.79 of the radius as every ringed crest.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, fourth row, third column: 丸にうちは (measured, and drawn with compass and ruler)", ja: "右頁、四段目の三列目「丸にうちは」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Round fan in a circle", ja: "丸に団扇" },
  reading: "まるにうちわ",
  romaji: "maru ni uchiwa",
  frame: "ring-medium",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["round fan in a ring", "uchiwa in a circle"],
  construction: {
    en: "The round fan set in a ring about a tenth of the diameter thick, the top of its paper and the foot of its handle a narrow white line from the ring.",
    ja: "直径の約10分の1の太さの輪の中に、団扇を収めます。紙の上の端と柄の下の端は、輪から細い白線一本分だけ離します。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    uchiwaBuild(c, "round-fan", inner - RING_GAP);
  },
});

export const genjiGuruma = defineCrest({
  id: "genji-guruma",
  name: { en: "Genji cart wheel", ja: "源氏車" },
  reading: "げんじぐるま",
  romaji: "genji-guruma",
  frame: "none",
  motifs: [{ motif: "wheel", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["cart wheel", "ox-cart wheel", "goshoguruma", "wheel"],
  construction: {
    en: "A cart wheel: a rim in eight parts, a ring of eight felloes inside it, eight spokes that widen outwards, and a hub.",
    ja: "牛車の車輪です。八つに分かれた外輪、その内側の八つの輪木、外へ向かって広がる八本の輻、そして轂でできます。",
  },
  build(c) {
    genjiWheel(c, "wheel", R);
  },
});

export const mikazuki = defineCrest({
  id: "mikazuki",
  name: { en: "Crescent moon", ja: "三日月" },
  reading: "みかづき",
  romaji: "mikazuki",
  frame: "none",
  motifs: [{ motif: "crescent", count: 1, arrangement: "single" }],
  families: [fam("Yamanaka Shikanosuke", "山中鹿介", "やまなかしかのすけ")],
  aliases: ["crescent", "moon", "new moon"],
  construction: {
    en: "A thin crescent: the disc of the layout circle with a slightly smaller circle cut from it, struck a little up and to the left of the centre, so that the horns nearly close.",
    ja: "細い三日月です。割付の円から、中心より少し左上に置いたやや小さい円を切り取り、両端がほとんど閉じる形にします。",
  },
  build(c) {
    mikazukiBuild(c, "crescent", R);
  },
});

export const shippo = defineCrest({
  id: "shippo",
  name: { en: "Seven treasures", ja: "七宝" },
  reading: "しっぽう",
  romaji: "shippō",
  frame: "none",
  motifs: [{ motif: "seven-treasures", count: 4, arrangement: "crossed" }],
  families: [],
  aliases: ["cloisonne", "interlocking circles", "shippou"],
  construction: {
    en: "A circle, and four arcs of a wider circle struck from outside it on the diagonals. Each cuts a lens from the circle, and the four lenses meet point to point at the top, the bottom and the two sides, where a small disc stands; the middle is left as a four-pointed star with hollow sides.",
    ja: "一つの円に、斜めの方向の外側から、より大きな円の弧を四つ引きます。弧はそれぞれ円からレンズ形を切り出し、四つのレンズ形は上下左右で先を合わせ、そこに小さな円を置きます。中央には、辺のくぼんだ四つ先の星形が白く残ります。",
  },
  build(c) {
    shippoBuild(c, "seven-treasures", R);
  },
});

export const asaNoHa = defineCrest({
  id: "asa-no-ha",
  name: { en: "Hemp leaf", ja: "麻の葉" },
  reading: "あさのは",
  romaji: "asa no ha",
  frame: "none",
  motifs: [{ motif: "hemp-leaf", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["hemp", "six pointed star", "asanoha"],
  construction: {
    en: "A six-pointed star, with a thin white line from the centre to each point and to each notch, so that it is twelve kites.",
    ja: "六つの先を持つ星形に、中心から各先と各切れ込みへ細い白線を引き、十二の凧形に分けます。",
  },
  build(c) {
    asanohaBuild(c, "hemp-leaf", R);
  },
});

export const yotsumeYui = defineCrest({
  id: "yotsume-yui",
  name: { en: "Four eyes", ja: "四つ目結" },
  reading: "よつめゆい",
  romaji: "yotsume yui",
  frame: "none",
  motifs: [{ motif: "four-eyes", count: 4, arrangement: "quartered" }],
  families: [fam("Sasaki", "佐々木", "ささき"), fam("Kyogoku", "京極", "きょうごく")],
  aliases: ["four squares", "sasaki", "yotsume"],
  construction: {
    en: "Four squares stood on their corners in a square, a narrow white cross between them, and a small square eye in the middle of each.",
    ja: "角で立てた正方形を四つ、細い白い十字で分けて正方形に並べ、それぞれの中央に小さな四角い目をあけます。",
  },
  build(c) {
    yotsumeBuild(c, "four-eyes", R);
  },
});

export const maruNiSumitateYotsume = defineCrest({
  id: "maru-ni-sumitate-yotsume",
  measured: "The Wikimedia Commons picture Wada Maru ni Sumitate Yotsume, read along the upright and level lines through the centre as parts of the ring's diameter: the four eyes stand on their corners, the outer corners a narrow white line inside the ring. Its ring and the white inside it are the package's measured ones. The picture's title gives the house, Wada.",
  name: { en: "Four eyes on their corners in a circle", ja: "丸に隅立て四つ目" },
  reading: "まるにすみたてよつめ",
  romaji: "maru ni sumitate yotsume",
  frame: "ring-medium",
  motifs: [{ motif: "four-eyes", count: 4, arrangement: "quartered" }],
  families: [fam("Wada", "和田", "わだ")],
  aliases: ["four eyes in ring", "ringed four squares", "丸に四つ目", "丸に隅立て四つ目結"],
  construction: {
    en: "The four eyes, stood on their corners, inside a ring about a tenth of the diameter thick, their outer corners a narrow white line from the ring.",
    ja: "直径の約10分の1の太さの輪の中に、角で立てた四つ目を収め、外側の角を、輪から細い白線一本分だけ離します。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    yotsumeBuild(c, "four-eyes", inner - RING_GAP);
  },
});

/** A hexagon with a point up or a flat up: `r` is its circumradius. */
const hexagon = (r: number, a0 = 0): Path => poly(ngonPoints(6, r, a0));

export const kikko = defineCrest({
  id: "kikko",
  name: { en: "Tortoise shell", ja: "亀甲" },
  reading: "きっこう",
  romaji: "kikkō",
  frame: "none",
  motifs: [{ motif: "tortoise-shell", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hexagon", "turtle shell", "kikkou"],
  construction: {
    en: "A regular hexagon with one corner up: a thick line, and a thin line inside it.",
    ja: "角を上にした正六角形です。太い線の内側に、細い線をもう一本入れます。",
  },
  build(c) {
    c.stepRound(92);
    c.fill("tortoise-shell", hexagon(92, 0).join(hexagon(78, 0)), "evenodd");
    c.fill("tortoise-shell", hexagon(72, 0).join(hexagon(68, 0)), "evenodd");
  },
});

export const kikkoNiKatabami = defineCrest({
  id: "kikko-ni-katabami",
  name: { en: "Wood sorrel in a hexagon", ja: "亀甲に片喰" },
  reading: "きっこうにかたばみ",
  romaji: "kikkō ni katabami",
  frame: "hexagon",
  motifs: [{ motif: "wood-sorrel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["hexagon sorrel"],
  construction: {
    en: "A tortoise-shell hexagon, a thick line with a thin line inside it, one corner up, and inside it the wood sorrel.",
    ja: "角を上にした亀甲（太い線と、その内側の細い線）の中に、片喰を収めます。",
  },
  build(c) {
    c.stepRound(92);
    c.fill("frame", hexagon(92, 0).join(hexagon(80, 0)), "evenodd");
    c.fill("frame", hexagon(74, 0).join(hexagon(70, 0)), "evenodd");
    katabamiBuild(c, "wood-sorrel", 52);
  },
});

export const odaMokko = defineCrest({
  id: "oda-mokko",
  measured: "The five-lobed quince of the 1892 crest book (frame 28, right page: the cell in the second row, second column, and the plain 窠 in the fourth row, third column), read along lines from the centre as parts of the outer radius. In both, the lobes' outer edges lie on one circle about the centre, and two lobes meet in a notch that reaches in to between 0.78 and 0.88; the band's two lines are at 0.68 to 0.69 and at 0.74; a petal's tip is at 0.57 to 0.62; and the flower has five petals of three round ends each, a stamen on each petal and a small ring at the centre. The book draws outlines only, so the widths of the white lines are set here: 0.04 between two lobes and between a lobe and the band, 0.02 between two petals. The Wikimedia Commons picture Oda emblem was read the same way, for comparison only: lobes from 0.72 to 1.00, the band from 0.64 to 0.68, petal tips at 0.60, the centre disc 0.09 in a white ring to 0.15, stamens to 0.31. The drawing has the lobes from 0.76 to the outer circle with shoulders of 0.22 and notches to 0.91, the band from 0.68 to 0.72, with both edges opening by tangent arcs into rounded curls, petal tips at 0.61, the centre disc 0.08 in a white ring to 0.14, and stamens to 0.30.",
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, second row, second column: the five-lobed quince with a five-petalled flower, its label not read for certain (measured, and drawn with compass and ruler)", ja: "右頁、二段目の二列目の五つ木瓜に唐花（名前の文字はまだ読み切れていません。寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  name: { en: "Oda quince", ja: "織田木瓜" },
  reading: "おだもっこう",
  romaji: "Oda mokkō",
  frame: "mokko",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Oda", "織田", "おだ")],
  aliases: ["oda", "mokko", "quince", "cucumber flower", "melon"],
  construction: {
    en: "Five lobes round a band round a flower. A lobe's outer edge is the outer circle itself, between two round shoulders; each side is cut straight, down to a circle about the centre, so that two lobes meet in a point with a white line between them. Inside each lobe lies its piece of a thin band, with both edges opening into a curled bulb at each end. In the middle is a Chinese flower (karahana) of five petals: a petal has three round ends and a white stamen up its middle, a white line parts it from the next, and a white ring parts them all from the disc at the centre. The lobe on top and the petal on top are built in full, and the other four of each are built the same way where they stand, clockwise.",
    ja: "外側に五つの裂片、その内側に細い帯、真ん中に花を置きます。裂片の外の縁は外円そのもので、両方の肩を小さい円で丸くします。両脇はまっすぐに切り、中心のまわりの円まで下ろします。となりの裂片とは尖った形で出会い、間に白い線を残します。裂片の内側には、その裂片の分の細い帯を置き、帯の両端は、両縁が接する弧でふくらみ、内側に巻いて丸く終わります。真ん中は花びらが五枚の唐花です。花びらの先は三つの丸でできていて、花びらの真ん中に白いしべを一本入れます。となりの花びらとの間は白い線で分け、中心の円のまわりには白い輪を残します。上の裂片と上の花びらを先に作図し、それぞれ残りの四つは、同じ作り方でその場で時計回りに作図します。",
  },
  build(c) {
    mokkoBuild(c, "frame", "plum", R);
  },
});

export const hokakeBune = defineCrest({
  id: "hokake-bune",
  name: { en: "Ship under sail", ja: "帆掛け船" },
  reading: "ほかけぶね",
  romaji: "hokake-bune",
  frame: "ring-medium",
  motifs: [{ motif: "ship", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ship", "sailing ship", "takarabune", "boat"],
  construction: {
    en: "A crescent hull, a mast on its middle, and a square sail a little taller than it is wide, cut across by three seams.",
    ja: "三日月形の船体に、中央のマストと、幅より少し丈の高い帆を立て、帆に三本の継ぎ目を白く抜きます。",
  },
  build(c) {
    c.ring("ring-medium");
    c.guideLine([CX, 24], [CX, 176]);
    c.fill("ship", new Path().M([30, 132]).C([52, 168], [148, 168], [170, 132]).L([158, 132]).C([142, 152], [58, 152], [42, 132]).Z());
    c.fill("ship", rect(CX - 3, 30, CX + 3, 136));
    const sail = poly([[CX - 24, 40], [CX + 24, 40], [CX + 52, 122], [CX - 52, 122]]);
    const seams = [62, 84, 104].map((y) => poly([[CX - 18 - (y - 40) * 0.3, y - 2.5], [CX + 18 + (y - 40) * 0.3, y - 2.5], [CX + 18 + (y - 40) * 0.3, y + 2.5], [CX - 18 - (y - 40) * 0.3, y + 2.5]]));
    c.fill("ship", seams.reduce((acc, q) => acc.join(q), sail), "evenodd");
  },
});

export const torii = defineCrest({
  id: "torii",
  measured: "The Wikimedia Commons picture Japanese crest Torii, read in units of the circle through the tips of the lintel and the feet of the posts, taken as 100. The lintel's top is level from -49 to 49 at 62 and rises in a hollow arc to a tip at 74, 67; its end is a round belly of 24 about 50, 67, cut level at 46. The bar is 40 to 45 and 62 either side; the posts start at 39, the outer edge from 53 to 68 at the foot and the inner from 40 to 50, the foot at -73; the strut is 7 either side from 27 to 39; the crossbar is 14 to 26, 40 from the middle to the post, and its ends reach 51 to 65, each in a notch of the post with a white line round it. The picture is of the Myojin kind, with its lintel curved up at the ends. No book of the period draws it: none of its frames names a torii.",
  name: { en: "Torii gate", ja: "鳥居" },
  reading: "とりい",
  romaji: "torii",
  frame: "none",
  motifs: [{ motif: "torii", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["shrine gate", "myojin torii"],
  construction: {
    en: "A lintel hollowed along its top and curved up at its ends, over a plain bar; two posts that lean out and widen towards the foot; a strut up the middle; and a crossbar whose ends stand out past the posts, each in a notch with a white line round it. The right post and the right end of the crossbar are built in full, the left ones where they stand.",
    ja: "神社の門です。いちばん上に、上側がくぼみ、両端が反り上がった太い横木（笠木）を置き、その下に、まっすぐで細い横木（島木）を重ねます。柱は二本で、下へいくほど外へ広がり、太くなります。二本の柱の真ん中に、島木と貫をつなぐ短い支え（額束）を一本立てます。その下に、柱を通る横木（貫）を渡し、両端は柱の外へ出して、それぞれ柱の切れ込みに収め、まわりに白い線を残します。右の柱と右の貫の端を先に作図し、左はその場で作図します。",
  },
  build(c) {
    toriiBuild(c, "torii", R);
  },
});

export const gionMamori = defineCrest({
  id: "gion-mamori",
  measured: "The ぎおんまもり of the 1892 crest book (frame 31, left page, row 3, column 3) and a Wikimedia Commons picture of 祇園守 (Gion Mamori (No background and Black color drawing).svg, CC BY-SA 3.0, the same drawing as Gion Mamori.svg), measured as numbers only, in hundredths of the crest's half width. In the Commons picture the ring is 59 and 40; a scroll is 27 wide with a white line 2 to 3 wide along it, and its knobs stand 68 and 70 from the centre; the left band is 24 wide with a head 28 across; the hooked band is about 20 wide over the top; the cloud begins 62 from the centre; the ginkgo leaf is 130 wide and its veins meet 30 below the centre. The book draws the same crest by hand and in outline, with the same ring, crossed scrolls, tie, left band, hooked band, cloud and leaf; its scrolls are narrower, its tie is a few curved threads, its leaf has seven or more fine veins and a wavier edge, and its cloud is smaller. The book also has a plainer cell (row 2, column 4: a ring, crossed scrolls and a level bar), which Commons does not show; the crest drawn is the one both show. Ours follows the Commons picture's proportions. Its edges are arcs and ruled lines, so the leaf's lower edge is the layout circle cut flat where the picture has shallow scallops, the tail of the hooked band is straight, and the two scrolls are mirror images.",
  name: { en: "Gion amulet", ja: "祇園守" },
  reading: "ぎおんまもり",
  romaji: "gion-mamori",
  frame: "none",
  motifs: [{ motif: "gion-amulet", count: 1, arrangement: "single" }],
  families: [fam("Tachibana", "立花", "たちばな")],
  aliases: ["gion mamori", "Gion-mamori", "Yanagawa", "Tachibana of Yanagawa", "crossed scrolls", "祇園守紋"],
  construction: {
    en: "Two scrolls crossed at right angles on a ring, with a band with a round head, a hooked band, a cloud and a ginkgo leaf round them. A scroll lies along a line through the centre at half a right angle and is 27 wide: a roll on its upper side and a shorter sheet on its lower side, with a white line between them, and at each end a block the scroll's whole width. Beyond the upper end stand the roll's round face and a square knob, and beyond the lower end a smaller knob. The scroll that rises to the right lies on top, and four white lines across it where the two cross leave the three bands of the tie; the other scroll is cut back 3 from it. The ring is 59 and 40 about the centre and shows between the scrolls. Below is a ginkgo leaf, a narrow blade and a wing each side with white veins; its lower edge is the layout circle, cut flat twice, with a round curl. On the left is a band 24 wide with a round head. The band over the top begins in a point, steps down once, and ends in a hook beside the right scroll's knob. The cloud on the right has three bumps above and three below, and two white curls. The ring is built first, then the scrolls, then the leaf with its left wing where it stands, and then the left band, the hooked band and the cloud, clockwise.",
    ja: "輪の上に、二本の巻物を直角に交差させて置きます。そのまわりを、丸い頭のある帯、鉤の形の帯、雲、銀杏の葉が囲みます。巻物は、中心を通る斜め45度の線に沿って置き、幅は27です。上側が巻いた部分、下側がそれより短い紙の部分で、間に白い線があります。両端には、巻物の幅いっぱいの部分があります。上の端の外には、巻いた部分の丸い面と四角いつまみがあり、下の端の外には、小さいつまみがあります。右上がりの巻物が上に重なります。交差するところに白い線を四本入れて、結びひもの三本の帯を残します。もう一本の巻物は、そこから3だけ離して切ります。輪は中心から59と40の円で、巻物の間に見えます。下には銀杏の葉を置きます。細い中央の葉と、左右に一枚ずつの葉があり、白い葉脈が入ります。葉の下の縁は外の円で、二か所を平らに切り、丸い渦を一つ入れます。左には幅24の帯があり、先に丸い頭があります。上の帯は、尖った先から始まり、一段下がって、右の巻物のつまみの横で鉤の形に終わります。右の雲は、上と下に丸い山が三つずつあり、中に白い渦が二つあります。輪、巻物、葉の順に作図し、左の葉はその場で作図します。そのあと、左の帯、上の帯、雲を時計回りに作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "left page, third row, third column: ぎおんまもり (measured, and drawn with compass and ruler)", ja: "左頁、三段目の三列目「ぎおんまもり」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    gionMamoriBuild(c, "gion-amulet", R);
  },
});

export const takaraMusubi = defineCrest({
  id: "takara-musubi",
  measured: "The 宝むすび of the 1892 crest book (frame 21, left page, row 3, column 1) and the Wikimedia Commons picture of 宝結び (Japanese Crest Takara Musubi), read as numbers only and built again from lines and circles. In the 1000 px Commons picture the knot is 920 wide and 556 high, the cord 39 across, its straight runs at 37 degrees from level (the edges, by Hough count, peak at 36.75 to 37: read as three in four, 36.87), the runs 147 apart across, the middle circle of a turn 74 in radius, the two side loops centred 368 out with their legs crossing at 247, and the four corner turns centred 123 across and 185 up. Set in the crest's units (4.9 px each) these are 8, 30, 15, 75, 50, 25 and 37.5. The book draws the same loops tilted, with a heavier cord and more crossings; the crest follows the Commons proportions and its weave, which the book's agrees with where it can be read.",
  name: { en: "Treasure knot", ja: "宝結び" },
  reading: "たからむすび",
  romaji: "takara musubi",
  frame: "none",
  motifs: [{ motif: "knot", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["takara musubi", "takaramusubi", "treasure knot", "endless knot", "宝むすび", "結び"],
  construction: {
    en: "One cord, 8 wide, tied in a knot twice as wide as it is high. Its six straight runs lie on lines that rise or fall three in four, 30 apart; six round turns, circles of 15 with the cord 4 each side of them, join the runs: a loop at each side whose legs cross, and four hairpins at the corners. At each of the nine places two runs cross, one passes over the other, and over and under alternate along the cord; the run beneath stops a gap of 2 short of the one over it, along lines struck beside it.",
    ja: "幅8の一本のひもを、横が縦の約2倍の形に結びます。まっすぐな部分は六本で、3対4の傾きで右上がりの三本と右下がりの三本を、30ずつ離して引きます。曲がりは六つで、半径15の円を使い、ひもは円の内側と外側に4ずつ（半径11と19）です。左右には足が交わる輪、四すみにはU字形の曲がりがあります。二本が交わる九か所では、片方が上、もう片方が下を通り、ひもをたどると上と下が交互になります。下の一本は、上の一本の横に引いた線から2離れたところで切れます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "left page, third row, first column: 宝むすび (measured, and drawn with compass and ruler)", ja: "左頁、三段目の一列目「宝むすび」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    takaraBuild(c, "knot", R);
  },
});

export const eirakusen = defineCrest({
  id: "eiraku-sen",
  measured: "The 永楽銭 of the 1892 crest book (frame 45, right page, row 2, second cell from the right), measured from the book's lines in its own units, the coin's radius 94: the ring a single thin line, the hole inside two squares (each line about 2.4 wide, the outer 31 out from the middle and the inner 21; the book's are a little wider than high), and the four characters 永 above the hole, 寳 to its left, 通 to its right and 樂 below, in a brush hand whose strokes are 3 to 5 across. The strokes are the book's own, outlined in arcs and ruled lines to within about a unit. From the Wikimedia Commons picture Japanese crest Eirakusenn only the count (four characters) and their places (永 above, 通 right, 寳 left, 樂 below) were taken.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, second row, second cell from the right: 永楽銭 (the characters vectorised from the book, the ring and the squares drawn with compass and ruler)", ja: "右頁、二段目の右から二つめ「永楽銭」（文字は本から写し取り、輪と四角はコンパスと定規で描いたもの）" }, read: "2026-11-25" },
  name: { en: "Yongle coin", ja: "永楽銭" },
  reading: "えいらくせん",
  romaji: "eirakusen",
  frame: "ring-thin",
  motifs: [{ motif: "coin", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["eiraku coin", "eiraku tsuho", "yongle tongbao", "永楽通宝", "永楽通寳", "永楽銭"],
  construction: {
    en: "A coin in a thin ring: two thin square frames round the hole, one inside the other, each 2 wide, and the four characters 永楽通寳 round it, 永 above, 寳 to the left, 通 to the right and 樂 below, in the brush hand of the 1892 crest book. The ring is struck first, then the squares, each frame being the space between four long ruled lines and four more; each character is the outline of its strokes in arcs of struck circles and ruled lines.",
    ja: "細い輪の中に銭を置きます。穴のまわりに、幅2の細い四角い枠を二重に作り、そのまわりに「永楽通寳」の四文字を、上に永、左に寳、右に通、下に樂と並べます。文字は1892年の紋帳の筆の書き方です。先に輪を描き、次に四角を描きます。四角の枠は、長い直線四本と、さらに四本の間のすき間です。文字は、筆の線の輪郭を、描いた円の弧と直線で囲んだものです。",
  },
  build(c) {
    eirakuBuild(c, "coin");
  },
});
