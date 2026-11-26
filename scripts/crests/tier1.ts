// Crests of the first tier that the books name and the package lacked: plain forms of circles and ruled lines, each set out in page
// units (the centre at (0, 0), x to the right, y up, the layout circle at 96), so every compass width is a whole number and every
// centre a grid point. Their proportions were measured from a period crest book and from public pictures, never traced.
import type { Builder } from "../construct/builder.ts";
import { C0, R } from "../construct/geo.ts";
import { arcTo, carve, circleCircle, disc, lineCircle, nearest, onPage, seg, toPath } from "../construct/compass.ts";
import type { Placing, Region, V } from "../construct/compass.ts";
import { wariBishiBuild } from "./drawn/families.ts";
import { mitsuInazumaBuild, yotsuInazumaBuild } from "./drawn/inazuma.ts";
import { amaGumoBuild } from "./drawn/kumo.ts";
import { mitsuChigaiKuwagataBuild } from "./drawn/kuwagata.ts";
import { maruNiDakiNamiBuild } from "./drawn/nami.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest, fam } from "./util.ts";

/** The day these pages were read. */
const READ_TODAY = "2026-11-25";
const PAGE: Placing = { k: 1 };

export const fundo = defineCrest({
  id: "fundo",
  measured: "The 分銅 of the 1892 crest book (frame 32, left page, row 4, column 4), a circle with two smaller circles in it at the two sides, read as parts of the big circle's radius: each small circle 0.34 across the radius, its centre 0.68 out, so that its outer edge just passes the big circle. The Wikimedia Commons picture Fundou-Kamon gives the same, 0.326 and 0.687, its small circles' edges 0.01 past the big circle. The drawing takes a big circle of 96 and two circles of 32 about (65, 0) and (-65, 0).",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, fourth row, fourth column: ふんどう (measured, and drawn with compass and ruler)", ja: "左頁、四段目の四列目「ふんどう」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Scale weight", ja: "分銅" },
  reading: "ふんどう",
  romaji: "fundō",
  frame: "none",
  motifs: [{ motif: "weight", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["balance weight", "weight", "fundou", "分銅紋"],
  construction: {
    en: "A disc with a round bite taken from each side, the shape of a balance weight seen from the side. A circle of 96 about the centre, and two circles of 32 about the two points 65 either side of the centre on the level line; the bites are cut where they pass the disc's edge, so each leaves two sharp points. The right bite is struck first, the left one where it stands.",
    ja: "秤（はかり）の分銅を横から見た形です。中心の円（半径96）から、左右に一つずつ丸い欠けを取ります。欠けは、中心から左右に65離れた二つの点を中心にした、半径32の円です。円は円盤の縁から少しはみ出すので、欠けごとに先が二つとがります。右の欠けを先に作図し、左はその場で作図します。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.guideCircle([C0[0] + 65, C0[1]], 32);
    c.guideCircle([C0[0] - 65, C0[1]], 32);
    c.fill("weight", toPath(carve([disc([0, 0], R)], [disc([65, 0], 32), disc([-65, 0], 32)]), PAGE));
  },
});

export const wariBishi = defineCrest({
  id: "wari-bishi",
  measured: "The Wikimedia Commons picture Japanese Crest wari Hisi, read in its own units: the four lozenges 577 across and 437 high, so 0.757 high to wide (ours 0.75, four to three), and the white between them 16 across the upright line, 0.073 of the half-height (ours 0.08). The 1892 crest book draws the same four lozenges in a ring and names them 九こ武田ひし (frame 43, right page, row 4, column 2): 0.78 high to wide in its hand. The ringed 丸に割菱 (`maru-ni-wari-bishi`) already has this lozenge; this is it with no ring, at the full layout circle.",
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, fourth row, second column: 九こ武田ひし, the same four lozenges in a ring (measured, and drawn with compass and ruler)", ja: "右頁、四段目の二列目「九こ武田ひし」、輪の中の同じ四つの菱（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Split lozenge", ja: "割菱" },
  reading: "わりびし",
  romaji: "wari-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["four-part lozenge", "four lozenges", "wari bishi"],
  construction: {
    en: "A lozenge four wide to three high, cut into four like lozenges by a narrow white cross that runs along its sides. Its side corners stand on the outer circle, and its top and bottom corners on a circle three quarters of it. Ten lines are ruled full length: the two through the centre, the four sides, and the two edges of each white band.",
    ja: "横4に対して縦3の菱形を、辺と平行な細い白い十字で、同じ形の四つの菱に分けます。左右の角は外円の上、上下の角は外円の4分の3の円の上にあります。直線は十本、端から端まで引きます。中心を通る縦と横の線、四つの辺、二本の白い帯それぞれの両側の線です。",
  },
  build(c) {
    wariBishiBuild(c, "diamond", R);
  },
});

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

/**
 * The crossed nail-pullers 違い釘抜: two hooked brackets, each a spine of 10 with an arm of 10 at each end and a short tab turned in
 * at the arm's end, 42 across; the second is the first turned half a turn about the middle, and the arms of each lie in the gap of the
 * other. Set out in the picture's own grid (a unit 10th of a bar) and stood on the corner, each of its 20 lines is ruled full length.
 */
const BRACKET: V[] = [[0, 0], [42, 0], [42, 14], [32, 14], [32, 10], [10, 10], [10, 32], [32, 32], [32, 28], [42, 28], [42, 42], [0, 42]];
/** A point of the grid about the middle of the pair, (29, 29), stood on its corner: up and to the right is the grid's down and to the right. */
const stood = ([u, v]: V): V => [(u - 29 + (v - 29)) / Math.SQRT2, (u - 29 - (v - 29)) / Math.SQRT2];

export const chigaiKuginuki = defineCrest({
  id: "chigai-kuginuki",
  measured: "The Wikimedia Commons picture Chigai kuginuki, read from the numbers it is drawn with: a bracket 42 across, its spine and arms 10 thick, its tabs 4 deep and 10 wide, and the second bracket the first turned half a turn about (29, 29), the whole stood on its corner at half a right angle; so the pair is 58 across the grid and 82 along its diagonal. The 1892 crest book draws the same two interlocked brackets, with thicker bars and the diamond a little wider than high (frame 26, left page, row 3, column 4: 違ひ釘ぬき). The drawing takes the picture's, with the two outermost corners on the outer circle.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, third row, fourth column: 違ひ釘ぬき (measured, and drawn with compass and ruler)", ja: "左頁、三段目の四列目「違ひ釘ぬき」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Crossed nail pullers", ja: "違い釘抜" },
  reading: "ちがいくぎぬき",
  romaji: "chigai kuginuki",
  frame: "none",
  motifs: [{ motif: "nail-puller", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["crossed nail-pullers", "chigai-kuginuki", "interlocked nail pullers"],
  construction: {
    en: "Two hooked brackets stood on their corner, one hooked into the other. A bracket is a spine and two arms of one thickness, each arm ending in a short tab turned in; the second is the first turned half a turn about the middle. Twenty lines are ruled full length, eight one way and twelve the other, and the two outermost corners stand on the outer circle. The first bracket is built in full, the second where it stands.",
    ja: "かぎ形の金具を二つ、角で立て、一方をもう一方に引っかけます。金具は、同じ太さの背と二本の腕でできていて、腕の先は内側へ短く折れています。二つめは、一つめを中心のまわりに半回転させた形です。直線は、斜めの二つの向きに八本と十二本、合わせて二十本を端から端まで引き、いちばん外の二つの角は外円の上に置きます。一つめの金具を先に作図し、二つめはその場で作図します。",
  },
  build(c) {
    const placing: Placing = { k: R / (29 * Math.SQRT2) };
    const first = BRACKET.map(stood);
    const second = first.map(([x, y]): V => [-x, -y]);
    c.guideCircle(C0, R);
    c.guidePath(toPath([polygon(first)], placing));
    c.guidePath(toPath([polygon(second)], placing));
    c.fill("nail-puller", toPath([polygon(first)], placing));
    c.fill("nail-puller", toPath([polygon(second)], placing));
  },
});

/** The three lobes of the sandbar tray: the upper circle, the two lower ones `x` either side and `y` up, the roof's point on the middle line, and a point on the right roof line. */
interface Lobes {
  top: { c: V; r: number };
  low: { x: number; y: number; r: number };
  apex: V;
  roof: V;
}

const suhamaBuild = (c: Builder, o: Lobes): void => {
  const top = o.top;
  const right = { c: [o.low.x, o.low.y] as V, r: o.low.r };
  const left = { c: [-o.low.x, o.low.y] as V, r: o.low.r };
  // The roof's lines go through the apex and a point on each lower circle; they cross each circle where they meet it.
  const roofR = nearest(lineCircle(o.apex, o.roof, right.c, right.r), o.roof);
  const roofL: V = [-roofR[0], roofR[1]];
  const joinR = nearest(circleCircle(top.c, top.r, right.c, right.r), [right.c[0] + right.r * 0.5, right.c[1] + right.r * 0.9]);
  const joinL: V = [-joinR[0], joinR[1]];
  c.guideCircle(C0, R);
  c.guideLine(onPage(roofL, PAGE), onPage(o.apex, PAGE));
  c.guideLine(onPage(o.apex, PAGE), onPage(roofR, PAGE));
  const outline: Region = [arcTo(top, joinR, joinL, true), arcTo(left, joinL, roofL, true), seg(roofL, o.apex), seg(o.apex, roofR), arcTo(right, roofR, joinR, true)];
  c.fill("sandbar", toPath([outline], PAGE));
};

/**
 * The sandbar tray 州浜: a round lobe above two round lobes side by side, a narrow slit between the lower two that rises to a
 * little roof. Three circles, 67 about (0, 29) and 44 about (-46, -24) and (46, -24); the top of the upper lobe stands on the outer
 * circle. The slit's roof is two ruled lines through the point (0, -4) that meet the lower circles 5 either side and 8 below the middle.
 */
export const suhama = defineCrest({
  id: "suhama",
  measured: "The Wikimedia Commons picture Japanese Crest Suhama, read in its own units from the circles its outline is made of: the upper lobe 160.4 across the radius about a point 126.6 above the lower lobes' centres, the lower lobes 106 across the radius and 220.9 apart, so the slit between them is 8.9 wide, with a small roof at 78.1 under the upper lobe's centre; that is 0.661, 0.790 and 0.689 of the upper radius. The 1892 crest book draws it in a ring as 丸にすはま (frame 45, left page, row 1, column 3) with the same three lobes and the slit, the lobes a little wider apart; its plain 州浜 beside it (column 4) has no slit, its three lobes run together. The drawing takes 67, 44 and 46, so every width is a whole number.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "left page, first row, third column: 丸にすはま, the same three lobes in a ring (measured, and drawn with compass and ruler)", ja: "左頁、一段目の三列目「丸にすはま」、輪の中の同じ三つの丸（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Sandbar tray", ja: "州浜" },
  reading: "すはま",
  romaji: "suhama",
  frame: "none",
  motifs: [{ motif: "sandbar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["suhama", "sandbar", "sandbank tray", "洲浜"],
  construction: {
    en: "A round lobe above two round lobes side by side, as a sandbar is drawn. Three circles are struck: 67 about a point 29 above the centre, and 44 about the two points 46 either side of the centre and 24 below it; the top of the big lobe stands on the outer circle. The outline runs over the big lobe to where the lower circles cross it, round the outside of each lower lobe, and in along two ruled lines to a little roof over the narrow slit between them. ",
    ja: "砂州（すなす）のように、上に丸いふくらみを一つ、その下に丸いふくらみを二つ並べます。円は三つ。中心の29上の点を中心にした半径67の円と、中心から左右に46、下に24の二点を中心にした半径44の円です。上のふくらみの頂は外円の上に置きます。輪郭は、上のふくらみを回り、下の二つの円と交わる点から、それぞれの下のふくらみの外側を回って、二本の直線で、二つの間のせまいすき間の小さな屋根へ入ります。",
  },
  build(c) {
    suhamaBuild(c, { top: { c: [0, 29], r: 67 }, low: { x: 46, y: -24, r: 44 }, apex: [0, -4], roof: [5, -8] });
  },
});

/**
 * The Hojo scales 北条鱗: a wide triangle, 180 across and 66 high, cut into four by the lines that join the midpoints of its sides;
 * the three corner triangles are inked and the one in the middle, upside down, is left white. The base corners stand on the outer circle.
 */
export const hojoUroko = defineCrest({
  id: "hojo-uroko",
  measured: "The Wikimedia Commons picture Japanese Crest Houjou Uroko, read in its own units: the whole triangle 556 across and 205 high, so 0.368 high to wide, three triangles of 277 across and 102 high that touch at their corners. The 1892 crest book draws the same wide triangle cut in four and names it 北条鱗, ほうでううろこ (frame 25, left page, row 1, column 2), a little taller, 0.43. The drawing takes the picture's 0.368 as 66 high to 180 across, its base corners on the outer circle; the plain 三つ鱗 (`mitsu-uroko`) is the book's upright triangle.",
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, first row, second column: 北条鱗, ほうでううろこ (measured, and drawn with compass and ruler)", ja: "左頁、一段目の二列目「北条鱗」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Hojo scales", ja: "北条鱗" },
  reading: "ほうじょううろこ",
  romaji: "Hōjō uroko",
  frame: "none",
  motifs: [{ motif: "scale", count: 3, arrangement: "triangle" }],
  families: [fam("Hojo", "北条", "ほうじょう")],
  aliases: ["hojo uroko", "hojo scales", "houjou uroko", "wide three scales", "北条三つ鱗"],
  construction: {
    en: "A wide triangle, 180 across and 66 high, with its base corners on the outer circle. The lines that join the midpoints of its three sides are ruled full length; the three corner triangles are inked and the middle one is left white, so that the three touch at their corners. Six lines are ruled: the three sides and the three midlines.",
    ja: "横180、高さ66の、横に長い三角形を置き、底の両端の角を外円の上に置きます。三つの辺それぞれの中点を結ぶ直線を、端から端まで引きます。角の三つの三角形に墨を入れ、真ん中の逆さの三角形は白く残すので、三つは角でふれ合います。直線は六本です。三つの辺と、三本の中点の線です。",
  },
  build(c) {
    const [apex, left, right]: V[] = [[0, 33], [-90, -33], [90, -33]];
    const mid = (a: V, b: V): V => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const [ml, mr, mb] = [mid(apex, left), mid(apex, right), mid(left, right)];
    c.guideCircle(C0, R);
    c.guidePath(toPath([polygon([apex, left, right])], PAGE));
    c.guidePath(toPath([polygon([ml, mr, mb])], PAGE));
    c.fill("scale", toPath([polygon([apex, ml, mr])], PAGE));
    c.fill("scale", toPath([polygon([mr, mb, right])], PAGE));
    c.fill("scale", toPath([polygon([ml, left, mb])], PAGE));
  },
});

export const maruNiSuhama = defineCrest({
  id: "maru-ni-suhama",
  measured: "The Wikimedia Commons picture Japanese Crest Maru ni Suhama, read in its own units: the ring 0.0905 of the diameter (the package's 0.087), the tray's width 0.814 of the ring's inner radius to each side and its height 0.713 above and 0.710 below the middle, so 0.874 high to wide where the plain tray is 0.91. The 1892 crest book draws it as 丸にすはま (frame 45, left page, row 1, column 3), its ring a double line. The drawing sets the tray's three lobes at 0.72 of the plain tray's size: 48 about (0, 9) and 32 about (33, -25) and (-33, -25), so the tray is 130 across and 114 high, centred in the ring.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "left page, first row, third column: 丸にすはま (measured, and drawn with compass and ruler)", ja: "左頁、一段目の三列目「丸にすはま」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Sandbar tray in a circle", ja: "丸に州浜" },
  reading: "まるにすはま",
  romaji: "maru ni suhama",
  frame: "ring-medium",
  motifs: [{ motif: "sandbar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["suhama in a circle", "ringed suhama", "丸に洲浜"],
  construction: {
    en: "The sandbar tray inside a ring about a tenth of the diameter thick, smaller than the plain tray and centred, a good white all round it. Its three circles are 48 about a point 9 above the centre and 32 about the two points 33 either side and 25 below it; the roof of the slit is two ruled lines.",
    ja: "直径の約10分の1の太さの輪の中に、州浜を小さめに、中央に収め、まわりに十分な白を残します。円は三つ。中心の9上の点を中心にした半径48の円と、中心から左右に33、下に25の二点を中心にした半径32の円です。すき間の屋根は二本の直線です。",
  },
  build(c) {
    c.ring("ring-medium");
    suhamaBuild(c, { top: { c: [0, 9], r: 48 }, low: { x: 33, y: -25, r: 32 }, apex: [0, -10], roof: [4, -13] });
  },
});

export const mitsuInazuma = defineCrest({
  id: "mitsu-inazuma",
  measured: "The 三ッいなづま of the 1892 crest book (frame 6, left page, row 3, third cell from the right), measured from the book's strokes mapped into the top face's own coordinates (one step along each of its two edges; the cube is a regular hexagon, so the faces are rhombi with a 120 degree angle at the middle): the spiral's runs lie at 0.20, 0.835, 0.87, 0.225, 0.425, 0.685 and 0.69 of an edge, ending 0.40 along, and the double line that draws each run is about 0.04 of an edge apart. The three faces are the same spiral turned a third of a turn. No picture of the crest was found on Wikimedia Commons.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "left page, third row, third cell from the right: 三ッいなづま (measured, and drawn with compass and ruler)", ja: "左頁、三段目の右から三つめ「三ッいなづま」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Three lightning spirals", ja: "三つ稲妻" },
  reading: "みついなづま",
  romaji: "mitsu inazuma",
  frame: "none",
  motifs: [{ motif: "lightning", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["three lightning", "inazuma", "key-fret cube", "三ッ稲妻", "稲妻"],
  construction: {
    en: "A regular hexagon drawn as a cube, its three faces round the middle. The hexagon's corners are marked by stepping the compass round the outer circle from the top; its rim is the band between two hexagons 5 apart, and the three edges that part the faces run from the middle to every second corner. Each face holds a square spiral, a band 5 wide whose runs lie along the face's two edges, that starts on one edge and turns in three turns to a short hook. The spiral of the top face is built in full and the other two where they stand, a third and two thirds of a turn round.",
    ja: "正六角形を、三つの面が中心に集まる立方体の形に描きます。六角形の角は、外円の上でコンパスを12時から時計回りに進めて印をつけます。縁は、5ずつ離した二つの六角形の間の帯で、面を分ける三本の線は、中心から一つおきの角へ引きます。どの面にも、幅5の四角い渦を入れます。渦の帯は面の二つの辺に沿って走り、一つの辺から始まって三回曲がり、短いかぎ形で終わります。上の面の渦を先に作図し、あとの二つは3分の1回転と3分の2回転まわった位置に、その場で作図します。",
  },
  build(c) {
    mitsuInazumaBuild(c, "lightning");
  },
});

export const yotsuInazuma = defineCrest({
  id: "yotsu-inazuma",
  measured: "The 四ッいなづま of the 1892 crest book (frame 6, left page, row 1, leftmost cell), measured as numbers from the book's strokes, the block 132 across: each cell 64 across with 4 between them, a thin frame 2 wide, and in the top left cell the spiral band 5 wide, its runs at 10 to 15, 46 to 51, 48 to 53, 31 to 36, 23 to 28 and 21 to 26 from the cell's edges, ending 40 across. The other three cells are the first turned a quarter turn each time. No picture of the crest was found on Wikimedia Commons.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "left page, first row, fourth cell from the right (the leftmost): 四ッいなづま (measured, and drawn with compass and ruler)", ja: "左頁、一段目の右から四つめ（いちばん左）「四ッいなづま」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Four lightning spirals", ja: "四つ稲妻" },
  reading: "よついなづま",
  romaji: "yotsu inazuma",
  frame: "none",
  motifs: [{ motif: "lightning", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["four lightning", "inazuma", "key-fret squares", "四ッ稲妻", "稲妻"],
  construction: {
    en: "Four square cells in a block, two by two. The circle is struck about the middle and the lines that bound the cells and their thin frames and the runs of the spiral are ruled from side to side of it, each set together. The top left cell is built in full: a thin square frame, and inside it a spiral band 5 wide that starts on the cell's right edge, runs left, up, right, down, left, up and right, and ends in a short hook. The other three cells are the same cell turned a quarter turn, a half turn and three quarters of a turn round the middle, each built where it stands.",
    ja: "四つの四角い区画を、縦に二つ、横に二つ並べます。中心に円を描き、区画とその細い枠の辺と、渦の帯の辺にあたる直線を、円の端から端まで、平行な線ごとにまとめて引きます。左上の区画を先に作図します。細い四角い枠の中に、幅5の渦の帯を入れます。帯は区画の右の辺から始まり、左、上、右、下、左、上、右と進んで、短いかぎ形で終わります。ほかの三つの区画は、同じ区画を4分の1回転、半回転、4分の3回転まわした位置に、その場で作図します。",
  },
  build(c) {
    yotsuInazumaBuild(c, "lightning");
  },
});

export const maruNiDakiNami = defineCrest({
  id: "maru-ni-daki-nami",
  measured: "The 丸に抱き波 of the 1892 crest book (frame 23, left page, row 3, second cell from the right), taken from the book in the cell's own units, the ring's outer circle 96: two great waves, one to each side, that rise and curl over towards the middle in three curls each, with a pool of nested lines below them that opens upwards. The book draws them in thin lines; ours is solid, like the other crests: the body of each wave, chosen by hand as the space inside its outline, is ink, and the book's lines are white gaps of their own width. The white between the curls, above the top curls and below the lowest line of the pool stays white. The left half is outlined in arcs and ruled lines to within about a unit, and the right half is its mirror image, since the book's two halves differ by hand. The book's ring is a band of about 0.11 of the radius; ours is the package's thin ring. No Wikimedia Commons number was taken.",
  source: { ...SHINSEN_MONCHO, frame: 23, place: { en: "left page, third row, second cell from the right: 丸に抱き波 (the wave's lines vectorised from the book and made the white lines in solid ink, the ring drawn with compass and ruler)", ja: "左頁、三段目の右から二つめ「丸に抱き波」（波の線は本から写し取って墨の中の白い線にし、輪はコンパスと定規で描いたもの）" }, read: READ_TODAY },
  name: { en: "Embracing waves in a circle", ja: "丸に抱き波" },
  reading: "まるにだきなみ",
  romaji: "maru ni daki nami",
  frame: "ring-thin",
  motifs: [{ motif: "wave", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["embracing wave", "waves in a ring", "maru ni daki nami", "抱波"],
  construction: {
    en: "A thin ring, and inside it two waves that rise on either side and curl in towards each other. Each wave is a mass of ink, and the book's own brush lines are the white lines in it, their edges arcs of circles struck in full and ruled lines. Where a line runs into the ring in the book, a narrow gap between two ruled lines carries its white on to the white inside the ring. The left wave is drawn first; the right wave is the same mirrored, built where it stands, and the two overlap a little on the middle so that no seam shows.",
    ja: "細い輪の中に、左右から立ち上がって中へ巻き込む二つの波を収めます。波は墨のかたまりで、本に描かれた筆の線が、その中の白い線になります。白い線のふちは、全部の円を描いたうえで、その弧と直線で作図します。本で線が輪までのびているところは、二本の直線の間の細いすき間で、白を輪の内側の白までつなぎます。先に左の波を作図し、右の波は同じものを左右反転させて、その場で作図します。真ん中では少し重ねて、継ぎ目が出ないようにします。",
  },
  build(c) {
    maruNiDakiNamiBuild(c, "wave");
  },
});

export const amaGumo = defineCrest({
  id: "ama-gumo",
  measured: "The 雨くも of the 1892 crest book (frame 27, right page, second row, the leftmost cell), taken from the book in the cell's own units, the layout circle 96: two clouds that chase each other round an open middle, each ending in a curling head, the one at the top and the other at the foot, with streaks of cloud along them. The book draws them in thin lines; ours is solid, like the other crests: the clouds, chosen by hand as the space inside their outline, are ink, and the book's lines are white gaps of their own width. The open middle is closed by four short arcs, each struck through the two ends it joins and bowed a little into the cloud, where the book leaves the clouds' inner side open. The outline is the book's lines vectorised and outlined in arcs and ruled lines to within about a unit. The reading あまぐも: the label 雨くも gives くも for 雲 and no kana for 雨, and a standard dictionary gives the word 雨雲 the one reading あまぐも. No Wikimedia Commons number was taken.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, second row, the leftmost cell: 雨くも (the clouds' lines vectorised from the book and made the white lines in solid ink)", ja: "右頁、二段目の左はし「雨くも」（雲の線は本から写し取って墨の中の白い線にしたもの）" }, read: "2026-11-26" },
  name: { en: "Rain clouds", ja: "雨雲" },
  reading: "あまぐも",
  romaji: "ama gumo",
  frame: "none",
  motifs: [{ motif: "cloud", count: 2, arrangement: "ring" }],
  families: [],
  aliases: ["rain cloud", "clouds", "ama gumo", "雨くも"],
  construction: {
    en: "Two clouds that chase each other round an open middle, each ending in a curling head. The clouds are a mass of ink, and the book's own brush lines are the white lines in them, their edges arcs of circles struck in full and ruled lines. Where the book leaves the clouds' inner side open, four short arcs close it across the middle, each bowed a little into the cloud.",
    ja: "まん中をあけて、追いかけあう二つの雲を描きます。どちらの雲も、先がうずを巻く頭になります。雲は墨のかたまりで、本に描かれた筆の線が、その中の白い線になります。白い線のふちは、全部の円を描いたうえで、その弧と直線で作図します。本で雲の内側が開いているところは、雲の側へ少しふくらんだ四つの短い弧で、まん中との境を閉じます。",
  },
  build(c) {
    amaGumoBuild(c, "cloud");
  },
});

export const mitsuChigaiKuwagata = defineCrest({
  id: "mitsu-chigai-kuwagata",
  measured: "The 三ッ違ひくはがた of the 1892 crest book (frame 28, right page, second row, the rightmost cell), measured in units of the layout circle 96, the cell 1.7 pixels to a unit, the middle where the three bars' axes cross: the book's three horns laid on one another a third of a turn apart, each with its mirror image, give one horn, and its edges were read as circles and rounded to whole numbers on grid points: the bowl a circle of 31 about a point 54 above the middle, cut at its centre's level; the flares 34 about (63, 38) to each side, touching the bowl on the line through their centres; the horns' upper edges 22 about (41, 54); the lobes over the circle 19 about (12, 60); the circle 18 about (0, 56), its white line out to 21. The horns' points reach 90 from the middle. The bars are 8 wide and run from 50 out on the far side of the middle to under their horn's foot; the white lines are 3 wide, the book's own line. The book's horns differ by hand (its lower two stand a little further out than the top one, and their circles are a little long); ours are the one horn turned. The reading みつちがいくわがた: the label gives くはがた (くわがた) in kana; 三ッ is みつ, and 違ひ, the kanji 違 with the kana ひ, is the word 違い, which a standard dictionary (大辞林) reads one way, ちがい, as in 違ひ矢. No picture of the crest was found on Wikimedia Commons.",
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, second row, the rightmost cell: 三ッ違ひくはがた (measured, and drawn with compass and ruler)", ja: "右頁、二段目の右はし「三ッ違ひくはがた」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Three crossed helmet horns", ja: "三つ違い鍬形" },
  reading: "みつちがいくわがた",
  romaji: "mitsu chigai kuwagata",
  frame: "none",
  motifs: [{ motif: "helmet-horn", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["three helmet horns", "kuwagata", "mitsu chigai kuwagata", "三ッ違ひ鍬形", "鍬形"],
  construction: {
    en: "Three helmet horns a third of a turn apart, and under them three bars that cross at the middle. A horn is a cup with a round foot whose sides flare out into two pointed horns; a lobe to each side rises over the circle that sits in the cup, and the white line round the circle opens at the top between the lobes. Every edge is an arc of a circle struck in full. The horn at the top is built first, then the same horn where it stands a third and two thirds of a turn round, clockwise. The bars are 8 wide, their edges ruled full length: the upright bar lies on top of the other two, and where those two cross, the piece of each that runs down to its horn lies on top. Each horn lies on the end of its own bar, with a white line between.",
    ja: "三つの鍬形を3分の1回転ずつずらして置き、その下に、まん中で交わる三本の棒を描きます。鍬形は丸い底の器の形で、両わきが外へ反って、先のとがった二本の角になります。器の中には円が一つ入り、左右のふくらみが円の上にかぶさります。円のまわりの白い線は、上のふくらみの間で外に開きます。ふちはどれも、一周描いた円の弧です。上の鍬形を先に作図し、同じ鍬形を3分の1回転と3分の2回転まわした位置に、時計回りに、その場で作図します。棒は幅8で、ふちの直線は端から端まで引きます。縦の棒がほかの二本の上を通り、その二本が交わるところでは、それぞれの鍬形へ下りていく側が上になります。どの鍬形も自分の棒の端の上にのり、間に白い線を残します。",
  },
  build(c) {
    mitsuChigaiKuwagataBuild(c, "helmet-horn");
  },
});
