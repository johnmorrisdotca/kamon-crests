// Tortoise-shell hexagons with the flower lozenge in them: one, and three in a triangle, and the three in a ring.
import type { Builder } from "../construct/builder.ts";
import { C0, ngonPoints, poly } from "../construct/geo.ts";
import type { Path, Pt } from "../construct/geo.ts";
import { hanabishiBuild } from "./drawn/hanabishi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest, fam } from "./util.ts";

const READ_AT = "2026-11-25";

/** A hexagon with a corner up about `at`: `r` is its circumradius. */
const hexAt = (r: number, at: Pt): Path => poly(ngonPoints(6, r, 0, at));

/**
 * A tortoise-shell hexagon about `at` on the page, built from its outside in: a thick band between the circumradii `r[0]` and
 * `r[1]`, a thin line between `r[2]` and `r[3]`, and the flower lozenge inside, its side petals reaching `reach` from the middle.
 */
const kikkoHanabishi = (c: Builder, at: Pt, r: [number, number, number, number], reach: number): void => {
  c.fill("frame", hexAt(r[0], at).join(hexAt(r[1], at)), "evenodd");
  c.fill("frame", hexAt(r[2], at).join(hexAt(r[3], at)), "evenodd");
  hanabishiBuild(c, "flower-lozenge", reach, [at[0] - C0[0], C0[1] - at[1]]);
};

export const kikkoNiHanabishi = defineCrest({
  id: "kikko-ni-hanabishi",
  name: { en: "Flower lozenge in a hexagon", ja: "亀甲に花菱" },
  reading: "きっこうにはなびし",
  romaji: "kikkō ni hanabishi",
  frame: "hexagon",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hanabishi in a tortoise shell", "kikko hanabishi"],
  construction: {
    en: "A tortoise-shell hexagon, one corner up: a thick band, a narrow white line, a thin line, and inside it the flower lozenge, its side petals a narrow white line from the thin one.",
    ja: "角を上にした亀甲です。太い帯、細い白線、細い線の順に重ね、その内側に花菱を収めます。左右の花びらの先は、細い線から白線一本分だけ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, second row, second column counted from the right: 亀甲, a hexagon of one thick and two thin lines round a four-petalled flower (measured, and drawn with compass and ruler)", ja: "右頁、二段目、右から二列目「亀甲」（太い線一本と細い線二本の六角形に、四枚の花びらの花が入った形。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    c.stepRound(92);
    kikkoHanabishi(c, C0, [92, 64, 59, 54], 44);
  },
});

export const mitsumoriKikkoNiHanabishi = defineCrest({
  id: "mitsumori-kikko-ni-hanabishi",
  name: { en: "Flower lozenge in three hexagons", ja: "三つ盛り亀甲に花菱" },
  reading: "みつもりきっこうにはなびし",
  romaji: "mitsumori kikkō ni hanabishi",
  frame: "hexagon",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "triangle" }],
  families: [fam("Azai", "浅井", "あざい")],
  aliases: ["three hexagons with flower lozenges", "Azai crest"],
  construction: {
    en: "Three tortoise-shell hexagons, one corner up, one above two, each a narrow white line from the next, each with a thick band, a narrow white line, a thin line and a flower lozenge: the top one first, then the lower right and the lower left.",
    ja: "角を上にした亀甲を三つ、品の字に並べます。隣どうしは細い白線一本分だけ離します。どの亀甲も、太い帯、細い白線、細い線の順に重ね、その内側に花菱を収めます。上、右下、左下の順に作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, first row, second column counted from the right: 三ッきっこう (three hexagons, one above two, with a flower in each; measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から二列目「三ッきっこう」（品の字に並んだ三つの亀甲に、それぞれ花が入った形。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    for (const at of [[100, 51], [142, 124], [58, 124]] as Pt[]) kikkoHanabishi(c, at, [47, 33, 30, 28], 22);
  },
});

export const maruNiMitsumoriKikkoNiHanabishi = defineCrest({
  id: "maru-ni-mitsumori-kikko-ni-hanabishi",
  name: { en: "Flower lozenge in three hexagons in a circle", ja: "丸に三つ盛り亀甲に花菱" },
  reading: "まるにみつもりきっこうにはなびし",
  romaji: "maru ni mitsumori kikkō ni hanabishi",
  frame: "ring-medium",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["three hexagons with flower lozenges in a ring", "丸に三つ盛り亀甲"],
  construction: {
    en: "The three hexagons with their flower lozenges inside a ring about a tenth of the diameter thick, the corners of the hexagons a narrow white line from it.",
    ja: "直径の約10分の1の太さの輪の内側に、花菱の入った三つの亀甲を収め、亀甲の角を輪から細い白線一本分だけ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, first row, second column counted from the right: 三ッきっこう, set inside a ring", ja: "右頁、一段目、右から二列目「三ッきっこう」（輪に入れた形）" }, read: READ_AT, measured: true },
  build(c) {
    c.ring("ring-medium");
    for (const at of [[100, 65], [132, 120], [68, 120]] as Pt[]) kikkoHanabishi(c, at, [35, 25, 23, 21], 17);
  },
});

// Three trefoils of the honeycomb round one hexagon. A hexagon of side A stands corner up; the other nine are laid on it in a
// honeycomb, three round each of the three corners that stand on the vertical and the two slanted lines through its centre.
// Everything is set out from the central hexagon's centre, `HEART`, X so that the whole
// sits in the layout circle.
const SIDE = 23;
const HEART: Pt = [0, 0];
const BAND = 6;
const THIN = 2;
const ARM = 4;
const REACH = 10;
const rad = Math.PI / 180;

/** A point of the honeycomb (x to the right, y up, from the central hexagon's centre) on the page. */
const onSheet = (p: Pt): Pt => [C0[0] + HEART[0] + p[0], C0[1] - HEART[1] - p[1]];
const turnClockwise = (p: Pt, deg: number): Pt => [p[0] * Math.cos(deg * rad) + p[1] * Math.sin(deg * rad), -p[0] * Math.sin(deg * rad) + p[1] * Math.cos(deg * rad)];

/** The corner that three hexagons share, and the centres of those three hexagons: each a side from it, a third of a turn apart. */
const trefoil = (deg: number): { joint: Pt; centres: Pt[] } => {
  const joint = turnClockwise([0, 2 * SIDE], deg);

  return { joint, centres: [0, 120, 240].map((d) => [joint[0] + SIDE * Math.sin((d + deg) * rad), joint[1] + SIDE * Math.cos((d + deg) * rad)] as Pt) };
};

/** The outline of three hexagons laid round a corner: the edges that only one of them has, joined end to end. */
const outlineOf = (centres: Pt[]): Pt[] => {
  const key = (p: Pt): string => `${Math.round(p[0] * 1e4)},${Math.round(p[1] * 1e4)}`;
  const edges = new Map<string, { a: Pt; b: Pt; n: number }>();
  for (const o of centres) {
    const corners = Array.from({ length: 6 }, (_, i) => [o[0] + SIDE * Math.sin(i * 60 * rad), o[1] + SIDE * Math.cos(i * 60 * rad)] as Pt);
    corners.forEach((a, i) => {
      const b = corners[(i + 1) % 6];
      const id = [key(a), key(b)].sort().join(" ");
      const seen = edges.get(id);
      if (seen === undefined) edges.set(id, { a, b, n: 1 });
      else seen.n += 1;
    });
  }
  const free = [...edges.values()].filter((e) => e.n === 1);
  const loop: Pt[] = [free[0].a, free[0].b];
  free.splice(0, 1);
  while (free.length > 0) {
    const last = loop[loop.length - 1];
    const next = free.findIndex((e) => key(e.a) === key(last) || key(e.b) === key(last));
    const [e] = free.splice(next, 1);
    loop.push(key(e.a) === key(last) ? e.b : e.a);
  }
  loop.pop();

  // Corners where two edges run on in the same line are not corners.
  return loop.filter((p, i) => {
    const before = loop[(i + loop.length - 1) % loop.length];
    const after = loop[(i + 1) % loop.length];

    return Math.abs((p[0] - before[0]) * (after[1] - p[1]) - (p[1] - before[1]) * (after[0] - p[0])) > 1e-6;
  });
};

/** The outline drawn `d` inside (a negative `d` outside): each edge moved over by `d`, and each corner where its two moved edges cross. */
const inset = (loop: Pt[], d: number): Pt[] => {
  const area = loop.reduce((sum, p, i) => sum + p[0] * loop[(i + 1) % loop.length][1] - loop[(i + 1) % loop.length][0] * p[1], 0);
  const sign = area > 0 ? 1 : -1;
  const moved = loop.map((p, i) => {
    const q = loop[(i + 1) % loop.length];
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const n: Pt = [(-(q[1] - p[1]) / len) * sign * d, ((q[0] - p[0]) / len) * sign * d];

    return { p: [p[0] + n[0], p[1] + n[1]] as Pt, e: [(q[0] - p[0]) / len, (q[1] - p[1]) / len] as Pt };
  });

  return loop.map((_, i) => {
    const one = moved[(i + loop.length - 1) % loop.length];
    const two = moved[i];
    const t = ((two.p[0] - one.p[0]) * two.e[1] - (two.p[1] - one.p[1]) * two.e[0]) / (one.e[0] * two.e[1] - one.e[1] * two.e[0]);

    return [one.p[0] + one.e[0] * t, one.p[1] + one.e[1] * t] as Pt;
  });
};

/** A line of width `w` along an outline moved in by `d`: the black between that outline moved out half the width and moved in half of it. */
const lineAlong = (loop: Pt[], d: number, w: number): Path => poly(inset(loop, d - w / 2).map(onSheet)).join(poly(inset(loop, d + w / 2).map(onSheet)));

/** A bar of width ARM from `from` along the direction `deg` (clockwise from up) for `length`, starting half its width behind. */
const bar = (from: Pt, deg: number, length: number): Path => {
  const along: Pt = [Math.sin(deg * rad), Math.cos(deg * rad)];
  const across: Pt = [along[1], -along[0]];
  const start: Pt = [from[0] - (along[0] * ARM) / 2, from[1] - (along[1] * ARM) / 2];
  const end: Pt = [from[0] + along[0] * length, from[1] + along[1] * length];
  const corner = (p: Pt, side: number): Pt => [p[0] + (across[0] * ARM * side) / 2, p[1] + (across[1] * ARM * side) / 2];

  return poly([corner(start, 1), corner(end, 1), corner(end, -1), corner(start, -1)].map(onSheet));
};

export const bishamonKikko = defineCrest({
  id: "bishamon-kikko",
  name: { en: "Bishamon tortoise shell", ja: "毘沙門亀甲" },
  reading: "びしゃもんきっこう",
  romaji: "bishamon kikkō",
  frame: "none",
  motifs: [{ motif: "tortoise-shell", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["bishamon kikko", "bishamonkikko", "bishamon hexagons"],
  construction: {
    en: "A honeycomb of hexagons, one corner up, a central one left empty and three trefoils round it, one on top and one at each lower side. A trefoil is three hexagons round one shared corner. Each is a heavy band along its outline, a thin line a narrow white gap inside it, and a three-armed Y from the shared corner into the three hexagons. The trefoils share their outlines where they meet.",
    ja: "角を上にした六角形を蜂の巣のように並べ、真ん中の一つは空けて、そのまわりに三つ葉を三つ置きます。一つは上に、あとの二つは左右の下に置きます。三つ葉は、一つの角に集まる六角形三つです。どの三つ葉も、外の縁に沿う太い帯、白いすき間を一つ置いてその内側の細い線、そして角から三つの六角形へ伸びる三本腕のY字でできています。三つ葉どうしが出会うところは、縁を共有します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, first row, first column: 毘沙門きっこう (three trefoils of hexagons round an empty hexagon; measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から一列目「毘沙門きっこう」（空いた六角形のまわりに三つ葉が三つ。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    for (const deg of [0, 120, 240]) {
      const { joint, centres } = trefoil(deg);
      const outline = outlineOf(centres);
      c.fill("tortoise-shell", lineAlong(outline, 0, BAND), "evenodd");
      c.fill("tortoise-shell", lineAlong(outline, REACH, THIN), "evenodd");
      for (const o of centres) c.fill("tortoise-shell", bar(joint, (Math.atan2(o[0] - joint[0], o[1] - joint[1]) * 180) / Math.PI, SIDE));
    }
  },
});
