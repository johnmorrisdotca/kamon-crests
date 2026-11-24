// Crests of made things: feathers, fans, wheels, a ship, the moon, and the patterns that became crests.
import { RING_GAP, WEIGHT } from "../construct/builder.ts";
import { C0, CX, CY, Path, R, circle, lens, ngonPoints, poly, polar, turn } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { takanohaBuild } from "./drawn/takanoha.ts";
import { defineCrest, fam } from "./util.ts";

type B = Parameters<(typeof chigaiTakanoha)["build"]>[0];

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

/** An open folding fan: a ring of paper between two radii, ribs cut out, pivot below. */
const fanPath = (pivot: Pt, rIn: number, rOut: number, half: number): Path => {
  const p = new Path().M(polar(rIn, -half, pivot)).L(polar(rOut, -half, pivot)).A(rOut, 0, 1, polar(rOut, half, pivot)).L(polar(rIn, half, pivot)).A(rIn, 0, 0, polar(rIn, -half, pivot)).Z();

  return p;
};

const ogiBuild = (c: B, sun: boolean): void => {
  const pivot: Pt = [CX, CY + 58];
  const rIn = 30;
  const rOut = 120;
  const half = 46;
  c.guideCircle(pivot, rOut);
  c.guideCircle(pivot, rIn);
  c.guideLine(pivot, polar(rOut, -half, pivot));
  c.guideLine(pivot, polar(rOut, half, pivot));
  const paper = fanPath(pivot, rIn + 14, rOut - 4, half - 3);
  const ribs: Path[] = [];
  const n = 7;
  for (let i = 1; i < n; i += 1) {
    const a = -half + 3 + (2 * (half - 3) * i) / n;
    ribs.push(lens(polar(rIn + 26, a, pivot), polar(rOut - 20, a, pivot), 0.012));
  }
  const holes = sun ? [...ribs, circle(polar((rIn + rOut) / 2 + 6, 0, pivot), 21)] : ribs;
  c.fill("fan", holes.reduce((acc, r) => acc.join(r), paper), "evenodd");
  // The two guard sticks at the edges, and the rivet at the pivot.
  for (const sign of [-1, 1]) c.stroke("fan", new Path().M(polar(rIn - 4, sign * (half - 1), pivot)).L(polar(rOut - 2, sign * (half - 1), pivot)), 7);
  c.fill("fan", circle(pivot, 8));
  if (sun) c.fill("sun-disc", circle(polar((rIn + rOut) / 2 + 6, 0, pivot), 14));
};

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
    en: "A fan opened to about a quarter of a turn, its paper between two arcs struck from the pivot, with seven ribs cut out and a stick at each edge.",
    ja: "要を中心に、4分の1回転ほど開いた扇を描きます。二つの円弧の間に紙を置き、骨を七本白く抜いて、両端に親骨を添えます。",
  },
  build(c) {
    ogiBuild(c, false);
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
    en: "The open fan with a disc a seventh of the diameter across set on the middle of its paper.",
    ja: "開いた扇の紙の中央に、直径7分の1ほどの円を置きます。",
  },
  build(c) {
    ogiBuild(c, true);
  },
});

/** A cart wheel: rim, twelve spokes and a hub with its bore. */
const wheelBuild = (c: B, reach: number): void => {
  const rim = reach * 0.9;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, rim);
  c.guideSpokes(12, 0, reach);
  c.stroke("wheel", circle(C0, rim - 5), 10);
  c.group(() => {
    for (let i = 0; i < 12; i += 1) c.fill("wheel", poly([polar(10, i * 30 - 11), polar(rim - 8, i * 30 - 3.4), polar(rim - 8, i * 30 + 3.4), polar(10, i * 30 + 11)]));
  });
  c.fill("wheel", circle(C0, 21).join(circle(C0, 8)), "evenodd");
};

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
    en: "A rim, twelve spokes that taper toward the rim, and a hub with a bore, all struck from one centre.",
    ja: "一つの中心から、輻（や）を十二本、輪に向かって細くなるように描き、輪と、軸穴のある轂（こしき）を添えます。",
  },
  build(c) {
    wheelBuild(c, 92);
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
    en: "A circle with a second circle of the same size set a quarter of its width across it; what is left of the first is the crescent.",
    ja: "円に、同じ大きさの円を、幅の4分の1だけずらして重ね、最初の円の残った部分を三日月とします。",
  },
  build(c) {
    const r = 86;
    const off = 34;
    c.guideCircle(C0, r);
    c.guideCircle([CX + off, CY - 14], r * 0.86);
    // outer arc of the big circle and inner arc of the cutting circle, meeting at the horns
    const r2 = r * 0.86;
    const c2: Pt = [CX + off + 14, CY];
    const d = Math.hypot(c2[0] - CX, c2[1] - CY);
    const a = (r * r - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(r * r - a * a);
    const ux = (c2[0] - CX) / d;
    const uy = (c2[1] - CY) / d;
    const p1: Pt = [CX + a * ux - h * uy, CY + a * uy + h * ux];
    const p2: Pt = [CX + a * ux + h * uy, CY + a * uy - h * ux];
    c.fill("crescent", new Path().M(p2).A(r, 1, 0, p1).A(r2, 0, 1, p2).Z());
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
    en: "Four equal circles, each centred one radius from the middle toward up, down, left and right, so that every one passes through the centre; each overlaps the next in a petal.",
    ja: "同じ大きさの円を四つ、中心から半径の長さだけ上下左右へずらして描き、どの円も中心を通るようにします。隣り合う円は花弁の形に重なります。",
  },
  build(c) {
    const r = 44;
    for (const a of [0, 90, 180, 270]) {
      const ctr = polar(r, a);
      c.group(() => {
        c.guideCircle(ctr, r);
        c.stroke("seven-treasures", circle(ctr, r), WEIGHT.medium);
      });
    }
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
    en: "A six-pointed star whose points are a little over twice as far out as its valleys; a line runs from near the centre toward each point and each valley.",
    ja: "山が谷の2倍ほど外に出た六芒星を描き、中心近くから各山と各谷に向けて細い線を引いて白く抜きます。",
  },
  build(c) {
    const outer = ngonPoints(6, 90, 0);
    const inner = ngonPoints(6, 90 / Math.sqrt(3), 30);
    const star = poly(outer.flatMap((p, i) => [p, inner[i]]));
    c.guideCircle(C0, 90);
    c.guideSpokes(12, 0, 90);
    const slits: Path[] = [];
    for (let i = 0; i < 6; i += 1) {
      slits.push(lens(polar(12, i * 60), polar(72, i * 60), 0.03));
      slits.push(lens(polar(12, i * 60 + 30), polar(36, i * 60 + 30), 0.045));
    }
    c.fill("hemp-leaf", slits.reduce((acc, s) => acc.join(s), star), "evenodd");
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
    en: "Four equal square frames in two rows of two with a narrow space between, the whole turned an eighth of a turn onto its corner.",
    ja: "同じ大きさの四角い枠を二段二列に、狭い間隔をあけて並べ、全体を45度回して角を上に向けます。",
  },
  build(c) {
    const s = 34;
    const gap = 5;
    const w = 11;
    const pitch = s * 2 + gap;
    const cell = (cx: number, cy: number): Path => rect(cx - s, cy - s, cx + s, cy + s).join(rect(cx - s + w, cy - s + w, cx + s - w, cy + s - w));
    c.guidePath(rect(CX - pitch, CY - pitch, CX + pitch, CY + pitch).rotate(45), "line");
    for (const dy of [-1, 1]) for (const dx of [-1, 1]) {
      c.fill("four-eyes", cell(CX + dx * (s + gap / 2), CY + dy * (s + gap / 2)).rotate(45), "evenodd");
    }
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
    en: "A regular hexagon with a flat top, drawn as a line of one weight and its corners rounded.",
    ja: "上辺が水平な正六角形を、同じ太さの角の丸い線で描きます。",
  },
  build(c) {
    c.guideCircle(C0, 88);
    c.stroke("tortoise-shell", hexagon(80, 30), 12);
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
    en: "A hexagon frame, and inside it three hearts with their points together.",
    ja: "亀甲形の枠の中に、先を中心に合わせた三つの心形を置きます。",
  },
  build(c) {
    c.guideCircle(C0, 90);
    c.stroke("frame", hexagon(84, 30), 9.6);
    const L = 56;
    for (const a of [0, 120, 240]) c.fill("wood-sorrel", heartPath(polar(5, a), a, L, L * 1.02));
  },
});

const heartPath = (tip: Pt, deg: number, L: number, width: number): Path => {
  const w = width / 2;
  const at = (x: number, y: number): Pt => turn([tip[0] + x, tip[1] - y], deg, tip);
  return new Path()
    .M(at(0, 0))
    .C(at(-w * 0.35, L * 0.12), at(-w * 1.18, L * 0.5), at(-w * 0.82, L * 0.86))
    .C(at(-w * 0.55, L * 1.04), at(-w * 0.12, L * 1.02), at(0, L * 0.82))
    .C(at(w * 0.12, L * 1.02), at(w * 0.55, L * 1.04), at(w * 0.82, L * 0.86))
    .C(at(w * 1.18, L * 0.5), at(w * 0.35, L * 0.12), at(0, 0))
    .Z();
};

/** The boundary of the union of `n` equal circles of radius `r` whose centres lie on the circle of radius `d`. */
const lobed = (n: number, d: number, r: number, a0 = 0): Path => {
  const half = 180 / n;
  // Adjacent circles meet, on the line between them, at this distance from the middle.
  const t = d * Math.cos((half * Math.PI) / 180) + Math.sqrt(r * r - d * d * Math.sin((half * Math.PI) / 180) ** 2);
  const p = new Path().M(polar(t, a0 - half));
  for (let i = 0; i < n; i += 1) p.A(r, 0, 1, polar(t, a0 + (360 * i) / n + half));
  return p.Z();
};

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
    en: "A band whose outer edge is the outline of five equal circles set round the centre, with a flower of five round petals inside it.",
    ja: "中心のまわりに同じ大きさの円を五つ置き、その外形を縁取りとする帯を描き、中に五弁の丸い花を置きます。",
  },
  build(c) {
    const d = 54;
    const r = 40;
    c.guideCircle(C0, d);
    c.guideSpokes(5, 0, 92);
    for (let i = 0; i < 5; i += 1) c.guideCircle(polar(d, i * 72), r);
    c.fill("frame", lobed(5, d, r).join(lobed(5, d, r).scale(0.76)), "evenodd");
    for (let i = 0; i < 5; i += 1) c.fill("plum", circle(polar(25, i * 72 + 36), 15.5));
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
