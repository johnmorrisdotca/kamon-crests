// Crests of the first tier that the books name and the package lacked: plain forms of circles and ruled lines, each set out in page
// units (the centre at (0, 0), x to the right, y up, the layout circle at 96), so every compass width is a whole number and every
// centre a grid point. Their proportions were measured from a period crest book and from public pictures, never traced.
import type { Builder } from "../construct/builder.ts";
import { C0, R } from "../construct/geo.ts";
import { arcTo, carve, circleCircle, disc, lineCircle, nearest, onPage, seg, toPath } from "../construct/compass.ts";
import type { Placing, Region, V } from "../construct/compass.ts";
import { wariBishiBuild } from "./drawn/families.ts";
import { mitsuInazumaBuild } from "./drawn/inazuma.ts";
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
