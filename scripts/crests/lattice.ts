// Plain crests set out from the 1892 crest book's cells by ruled lines and struck circles: the flower lozenges in a lozenge, the
// stacked lozenges, and the other small lattices that follow.
import { carve, disc, seg, toPath } from "../construct/compass.ts";
import type { Placing, Region, V } from "../construct/compass.ts";
import { hanabishiBuild } from "./drawn/hanabishi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const yotsuHanabishi = defineCrest({
  id: "yotsu-hanabishi",
  name: { en: "Four flower lozenges", ja: "四つ花菱" },
  reading: "よつはなびし",
  romaji: "yotsu hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 4, arrangement: "ring" }],
  families: [],
  aliases: ["four hanabishi", "yotsu hanabishi", "四ッ花菱"],
  construction: {
    en: "Four flower lozenges laid in a lozenge: one above, one at the right, one below and one at the left, the two at the sides a little wider apart than the two above and below. Each is the flower lozenge, built on its own centre where it stands, from the top clockwise.",
    ja: "花菱を四つ、菱形に並べます。左右の二つは、上下の二つより少し離して置きます。上から時計回りに、それぞれの中心でその場で花菱を作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, fourth row, first column counted from the right: 四ッ花ひし (four flower lozenges in a lozenge; measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から一列目「四ッ花ひし」（菱形に並んだ四つの花菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    for (const at of [[0, 40], [52, 0], [0, -40], [-52, 0]] as [number, number][]) hanabishiBuild(c, "flower-lozenge", 43, at);
  },
});

/** A lozenge about `c`, `w` out to each side and `h` up and down, its four edges each moved out `grow`. */
const lozenge = (c: V, w: number, h: number, grow = 0): Region => {
  const scale = 1 + grow * Math.hypot(1 / w, 1 / h);
  const corners: V[] = [[c[0], c[1] + h * scale], [c[0] + w * scale, c[1]], [c[0], c[1] - h * scale], [c[0] - w * scale, c[1]]];

  return corners.map((p, i) => seg(p, corners[(i + 1) % 4]));
};
const PLACING: Placing = { k: 1 };
/** The white left round the lozenge in front, where it lies over another. */
const OVER = 3;

export const futatsuBishi = defineCrest({
  id: "futatsu-bishi",
  name: { en: "Two lozenges", ja: "二つ菱" },
  reading: "ふたつびし",
  romaji: "futatsu bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["two lozenges", "二ッ菱"],
  construction: {
    en: "Two lozenges of one size, one a little below the other so that the lower one lies over the upper: the lower is whole, and the upper is left with a narrow white line between it and the edge of the lower. The lozenges are 90 wide to each side and 52 high, their centres 50 apart, so the tips stand inside the layout circle.",
    ja: "同じ大きさの菱を二つ、一つを少し下にずらして重ねます。下の菱は上の菱の手前にあってそのまま残り、上の菱は、下の菱の縁との間に細い白線を残します。菱は中心から左右に90、上下に52で、二つの中心は50離れ、先は外の円の内側にあります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, second row, first column counted from the right: 二ッひし (two lozenges, the lower over the upper; measured, and drawn with compass and ruler)", ja: "左頁、二段目、右から一列目「二ッひし」（上の菱に下の菱が重なった二つの菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    const back = lozenge([0, 25], 90, 52);
    const front = lozenge([0, -25], 90, 52);
    c.fill("diamond", toPath(carve([back], [lozenge([0, -25], 90, 52, OVER)]), PLACING));
    c.fill("diamond", toPath([front], PLACING));
  },
});

export const itsutsuBishi = defineCrest({
  id: "itsutsu-bishi",
  name: { en: "Five lozenges", ja: "五つ菱" },
  reading: "いつつびし",
  romaji: "itsutsu bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 5, arrangement: "ring" }],
  families: [],
  aliases: ["five lozenges", "五ッ菱"],
  construction: {
    en: "Five lozenges of one size: one in the middle, and one above, at the right, below and at the left, each a narrow white line from the next. The middle one lies over the other four, which are left with a narrow white line between them and its edges. The lozenges are 44 wide to each side and 30 high.",
    ja: "同じ大きさの菱を五つ置きます。一つは真ん中、あとは上、右、下、左です。となり合う菱どうしは細い白線一本分だけ離します。真ん中の菱が手前にあり、ほかの四つは、真ん中の菱の縁との間に細い白線を残します。菱は中心から左右に44、上下に30です。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, first row, fourth column counted from the right: 五ッひし (five lozenges, the middle one over the four round it; measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から四列目「五ッひし」（真ん中の菱がまわりの四つの上に重なった五つの菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    const middle = lozenge([0, 0], 44, 30);
    const cut = lozenge([0, 0], 44, 30, OVER);
    for (const at of [[0, 30], [49, 0], [0, -30], [-49, 0]] as V[]) c.fill("diamond", toPath(carve([lozenge(at, 44, 30)], [cut]), PLACING));
    c.fill("diamond", toPath([middle], PLACING));
  },
});

export const tsunagiBishi = defineCrest({
  id: "tsunagi-bishi",
  name: { en: "Linked lozenges", ja: "繋ぎ菱" },
  reading: "つなぎびし",
  romaji: "tsunagi bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 5, arrangement: "crossed" }],
  families: [],
  aliases: ["linked lozenges", "chained lozenges", "つなぎ菱"],
  construction: {
    en: "Five lozenges of one size joined tip to tip: one in the middle, and one above, at the right, below and at the left, each touching the middle one at a tip. The lozenges are 32 wide to each side and 22 high, so the two side tips stand on the layout circle.",
    ja: "同じ大きさの菱を五つ、先と先でつなぎます。一つは真ん中、あとは上、右、下、左で、どれも先で真ん中の菱に触れます。菱は中心から左右に32、上下に22で、左右の二つの先は外の円の上にあります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, fourth row, fourth column counted from the right: つなぎひし (five lozenges joined tip to tip; measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から四列目「つなぎひし」（先と先でつながった五つの菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    c.fill("diamond", toPath([lozenge([0, 0], 32, 22)], PLACING));
    for (const at of [[0, 44], [64, 0], [0, -44], [-64, 0]] as V[]) c.fill("diamond", toPath([lozenge(at, 32, 22)], PLACING));
  },
});

/** A rectangle `w` out to each side of `x` and from `y0` to `y1`. */
const bar = (x: number, w: number, y0: number, y1: number): Region => {
  const corners: V[] = [[x - w, y1], [x + w, y1], [x + w, y0], [x - w, y0]];

  return corners.map((p, i) => seg(p, corners[(i + 1) % 4]));
};

export const mitsuBoshiNiHitotsuHikiryo = defineCrest({
  id: "mitsu-boshi-ni-hitotsu-hikiryo",
  name: { en: "Three stars over one bar", ja: "三つ星に一つ引両" },
  reading: "みつぼしにひとつひきりょう",
  romaji: "mitsuboshi ni hitotsu hikiryo",
  frame: "none",
  motifs: [{ motif: "star", count: 3, arrangement: "triangle" }, { motif: "bar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["three stars and one bar", "三つ星一つ引", "三ッほし一ッ引"],
  construction: {
    en: "Three discs of one size, 27 across the radius, set like the character 品, one above two, and a level bar under them, 71 to each side and 40 high. The centres of the discs are (0, 68), (32, 15) and (-32, 15); the bar lies between the level lines at -24 and -64, and its corners stand inside the layout circle.",
    ja: "同じ大きさの円を三つ、品の字に並べ（上に一つ、下に二つ）、その下に横長の棒を一本置きます。円の半径は27で、中心は (0, 68)、(32, 15)、(-32, 15) です。棒は -24 と -64 の水平線の間にあり、中心から左右に71、高さは40で、四つの角は外の円の内側にあります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "right page, third row, first column counted from the right: 三ッほし一ッ引 (three discs over one bar; measured, and drawn with compass and ruler)", ja: "右頁、三段目、右から一列目「三ッほし一ッ引」（三つの円の下に棒が一本ある図。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    for (const at of [[0, 68], [32, 15], [-32, 15]] as V[]) c.fill("star", toPath([disc(at, 27)], PLACING));
    c.fill("bar", toPath([bar(0, 71, -64, -24)], PLACING));
  },
});
