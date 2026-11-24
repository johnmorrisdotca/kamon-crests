// Crests of made things: feathers, fans, wheels, a ship, the moon, and the patterns that became crests.
import { RING_GAP } from "../construct/builder.ts";
import { CX, Path, R, ngonPoints, poly } from "../construct/geo.ts";
import { asanohaBuild, fanBuild, katabamiBuild, mikazukiBuild, shippoBuild, wheelBuild as genjiWheel, yotsumeBuild } from "./drawn/plain.ts";
import { mokkoBuild } from "./drawn/leafy.ts";
import { takanohaBuild } from "./drawn/takanoha.ts";
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
  name: { en: "Oda quince", ja: "織田木瓜" },
  reading: "おだもっこう",
  romaji: "Oda mokkō",
  frame: "mokko",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Oda", "織田", "おだ")],
  aliases: ["oda", "mokko", "quince", "cucumber flower", "melon"],
  construction: {
    en: "Five lobes round a ring, each the part of a circle that lies outside a larger circle about the centre, a narrow white gap between neighbours; a thin ring inside them; and in the middle a flower of five round petals with a white line between neighbours and a stamen on each, about a small disc.",
    ja: "輪のまわりに五つの弧形を並べます。弧形は、中心の大きな円の外に出た円の部分で、隣との間に細い白い隙間を残します。その内側に細い輪、中央に五弁の花を置きます。花弁は丸く、隣との間に白線、各花弁にしべを一本入れ、中心に小さな円を置きます。",
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
