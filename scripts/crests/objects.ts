// Crests of made things: feathers, fans, wheels, a ship, the moon, and the patterns that became crests.
import { RING_GAP } from "../construct/builder.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { CX, Path, R, ngonPoints, poly } from "../construct/geo.ts";
import { asanohaBuild, fanBuild, katabamiBuild, mikazukiBuild, shippoBuild, wheelBuild as genjiWheel, yotsumeBuild } from "./drawn/plain.ts";
import { gohonOgiBuild, uchiwaBuild } from "./drawn/fans.ts";
import { mokkoBuild } from "./drawn/leafy.ts";
import { takanohaBuild } from "./drawn/takanoha.ts";
import { toriiBuild } from "./drawn/torii.ts";
import { gyoyoBuild } from "./drawn/gyoyo.ts";
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
  measured: "The five-lobed quince of the 1892 crest book (frame 28, right page: the cell in the second row, second column, and the plain 窠 in the fourth row, third column), read along lines from the centre as parts of the outer radius. In both, the lobes' outer edges lie on one circle about the centre, and two lobes meet in a notch that reaches in to between 0.78 and 0.88; the band's two lines are at 0.68 to 0.69 and at 0.74; a petal's tip is at 0.57 to 0.62; and the flower has five petals of three round ends each, a stamen on each petal and a small ring at the centre. The book draws outlines only, so the widths of the white lines are set here: 0.04 between two lobes and between a lobe and the band, 0.02 between two petals. The Wikimedia Commons picture Oda emblem was read the same way, for comparison only: lobes from 0.72 to 1.00, the band from 0.64 to 0.68, petal tips at 0.60, the centre disc 0.09 in a white ring to 0.15, stamens to 0.31. The drawing has the lobes from 0.76 to the outer circle with shoulders of 0.22 and notches to 0.91, the band from 0.68 to 0.72, petal tips at 0.61, the centre disc 0.08 in a white ring to 0.14, and stamens to 0.30.",
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, second row, second column: the five-lobed quince with a five-petalled flower, its label not read for certain (measured, and drawn with compass and ruler)", ja: "右頁、二段目の二列目の五つ木瓜に唐花（名前の文字はまだ読み切れていません。寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  name: { en: "Oda quince", ja: "織田木瓜" },
  reading: "おだもっこう",
  romaji: "Oda mokkō",
  frame: "mokko",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Oda", "織田", "おだ")],
  aliases: ["oda", "mokko", "quince", "cucumber flower", "melon"],
  construction: {
    en: "Five lobes round a band round a flower. A lobe's outer edge is the outer circle itself, between two round shoulders; each side is cut straight, down to a circle about the centre, so that two lobes meet in a point with a white line between them. Inside each lobe lies its piece of a thin band, a round curl at each end. In the middle is a Chinese flower (karahana) of five petals: a petal has three round ends and a white stamen up its middle, a white line parts it from the next, and a white ring parts them all from the disc at the centre. The lobe on top and the petal on top are built in full, and the other four of each are built the same way where they stand, clockwise.",
    ja: "外側に五つの裂片、その内側に細い帯、真ん中に花を置きます。裂片の外の縁は外円そのもので、両方の肩を小さい円で丸くします。両脇はまっすぐに切り、中心のまわりの円まで下ろします。となりの裂片とは尖った形で出会い、間に白い線を残します。裂片の内側には、その裂片の分の細い帯を置き、帯の両端を小さい円で丸くします。真ん中は花びらが五枚の唐花です。花びらの先は三つの丸でできていて、花びらの真ん中に白いしべを一本入れます。となりの花びらとの間は白い線で分け、中心の円のまわりには白い輪を残します。上の裂片と上の花びらを先に作図し、それぞれ残りの四つは、同じ作り方でその場で時計回りに作図します。",
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

export const dakiHanaGyoyo = defineCrest({
  id: "daki-hana-gyoyo",
  measured: "The はなぎやうよう of the 1892 crest book (frame 41, right page, row 4, column 3), read on a grid as parts of half its width; the right leaf is the one read. The curled tip is a round end 0.37 across that reaches the top, with a short arc under the curl and a fold that runs down from it. Under it two round lobes stand down the back, their notches 0.39 across and 0.89 up, 0.70 across and 0.63 up, and 0.87 across and 0.36 up, and one lobe lies beside the slit, down to 0.20 up. The wide lobe below them reaches the back at 1.0 and ends 0.10 below the centre; the flower sits 0.50 across and 0.20 down, with six stamens that fan up to between 0.03 down and 0.14 up. The stalk is two strips down to a round foot 0.09 in radius, and the white drop between the two leaves is 0.22 across each side. The book names it the flower apricot leaf, はなぎやうよう. The Wikimedia Commons pictures Japanese Crest daki Gyouyou and Japanese Crest Daki hana Gyouyou were looked at for comparison only: the form with the flower and its stamens is the one present-day drawings call 抱き花杏葉, and their plain 抱き杏葉 has more lobes where the flower is, so this crest takes the name with the flower. The stalk's back stands in from the circle: 0.85 across at 0.30 down, 0.75 at 0.52 down and 0.55 at 0.80 down. The book's outline is drawn by hand, with pointed lobes, and bulges past the circle at the wide lobe's shoulder; the drawing has round lobes and keeps their backs on the layout circle.",
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, fourth row, third column: はなぎやうよう (measured, and drawn with compass and ruler)", ja: "右頁、四段目の三列目「はなぎやうよう」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  name: { en: "Embracing flower harness leaves", ja: "抱き花杏葉" },
  reading: "だきはなぎょうよう",
  romaji: "daki hana gyōyō",
  frame: "none",
  motifs: [{ motif: "apricot-leaf", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["apricot leaf", "apricot leaves", "flower apricot leaf", "gyoyo", "hana gyoyo", "daki hana gyoyo", "花杏葉", "はなぎょうよう"],
  construction: {
    en: "Two leaves that stand face to face, their backs one circle, with a white slit between them that opens into a drop below the middle, and a round foot each. A leaf has a curled tip, a circle that touches the slit, with a white arc under the curl and a fold that runs down from it. Two round lobes stand down the back under the tip and one lies beside the slit; the lines between them are arcs of one compass width, 96. Below them a wide lobe runs from the slit to the back, its top two arcs that meet over the flower and its foot two arcs that meet under it. The flower is a small disc in a white ring, with six white stamens ruled from its middle, five of them to a white dot. The stalk is two strips with a white line between them, down to the foot; its back is a circle of 92 struck 8 below the centre, so that the wide lobe's corner stands out over it. Two white wedges part the leaves above the wide lobe. The right leaf is built in full and the left one where it stands.",
    ja: "向かい合う二枚の葉です。背は一つの円で、間に白いすき間があり、中心より下でしずくの形に開きます。下の端は、それぞれ丸い足です。葉の先は巻いていて、すき間に接する円です。巻きの下に白い弧があり、そこから折り目が下へ伸びます。その下に、背にそって丸い山が二つ、すき間の横に一つあります。山の間の線は、どれも同じコンパスの幅96の弧です。その下の広い部分は、すき間から背まであります。上の縁は花の上で出会う二本の弧、下の縁は花の下で出会う二本の弧です。花は白い輪に囲まれた小さな円で、中心から白いしべを六本、定規で引きます。五本の先には白い点があります。柄は白い線で分けた二本の帯で、足まで続きます。柄の背は、中心より8下に描いた半径92の円なので、広い部分の角が柄より外に出ます。広い部分より上では、白いくさびが二つ、葉と葉の間に入ります。右の葉を作図し、左の葉はその場で作図します。",
  },
  build(c) {
    gyoyoBuild(c, "apricot-leaf", R);
  },
});
