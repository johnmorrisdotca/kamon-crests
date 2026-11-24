// The paulownia 桐: three leaves below, and three spikes of flowers above, the middle one the tallest.
import { CX, Path, circle, curveThrough, turn } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { defineCrest, fam } from "./util.ts";
import { slit, symmetricOutline } from "../construct/motifs.ts";

type B = Parameters<(typeof gosanNoKiri)["build"]>[0];

/** A floret of the paulownia: three round lobes in a cluster, `s` times the usual size, turned `tilt` degrees. */
const floret = (c: B, at: Pt, tilt: number, s: number): void => {
  const lobes: Pt[] = [[0, -6.4], [-6.6, 3.6], [6.6, 3.6]];
  for (const [x, y] of lobes) {
    const p = turn([at[0] + x * s, at[1] + y * s], tilt, at);
    c.fill("paulownia", circle(p, 7.6 * s));
  }
};

/** A stalk of one weight from `a` to `b`. */
const stalk = (c: B, a: Pt, b: Pt, w = 5.6): void => c.stroke("paulownia", new Path().M(a).L(b), w);

/**
 * A spike: a stalk up from `base`, and the florets along it in tiers: one at the tip, then a pair for each further tier, the
 * pairs leaning outward. `tiers` gives the height of each pair below the tip, `spread` how far apart the pair stands.
 */
const spike = (c: B, base: Pt, tip: Pt, pairs: number, gapY: number, spread: number, s: number): void => {
  stalk(c, base, tip);
  c.group(() => {
    floret(c, tip, 0, s);
    for (let k = 1; k <= pairs; k += 1) {
      const y = tip[1] + k * gapY;
      const reach = spread * (k === 1 ? 0.86 : 0.78);
      stalk(c, [tip[0], y + 6 * s], [tip[0] - reach, y + 2 * s], 4.4);
      stalk(c, [tip[0], y + 6 * s], [tip[0] + reach, y + 2 * s], 4.4);
      floret(c, [tip[0] - reach, y], -24, s);
      floret(c, [tip[0] + reach, y], 24, s);
    }
  });
};

/**
 * A paulownia leaf: an outline, with a midrib, nested arcs of white that follow its edge (the outline scaled about the stem, the
 * stretches of it named by `ranges`), and `veins`, all cut as slits of one weight.
 */
const kiriLeaf = (c: B, outline: Pt[], origin: Pt, ribs: Pt[][], arcs: number[], ranges: [number, number][], veins: Pt[][], extra: Pt[][] = []): void => {
  const closed = new Path().M(outline[0]);
  curveThrough(closed, [...outline, outline[0]]);
  closed.Z();
  const cuts: Path[] = [...ribs.map((r) => slit(r, 2.4)), ...veins.map((v) => slit(v, 2.4)), ...extra.map((v) => slit(v, 2.4))];
  for (const k of arcs) {
    const scaled = outline.map((p): Pt => [origin[0] + (p[0] - origin[0]) * k, origin[1] + (p[1] - origin[1]) * k]);
    for (const [a, b] of ranges) cuts.push(slit(scaled.slice(a, b + 1), 2.4));
  }
  c.fill("paulownia", cuts.reduce((acc, x) => acc.join(x), closed), "evenodd");
};

const kiriBuild = (c: B, centrePairs: number, sidePairs: number, zoom = 1): void => {
  c.zoom(zoom);
  const J: Pt = [CX, 96];
  c.guideLine([CX, 4], [CX, 196]);
  c.guideCircle(J, 6);
  c.guideLine([4, J[1]], [196, J[1]]);
  const at = (x: number, y: number): Pt => [J[0] + x, J[1] + y];
  // The three leaves. The bottom one first: a rounded fan with its midrib and nested arcs.
  const bottomRight: Pt[] = [at(0, 2), at(20, 0), at(36, 9), at(41, 27), at(41, 50), at(35, 70), at(26, 84), at(17, 92), at(9, 99), at(0, 97)];
  const bottom = symmetricOutline(bottomRight, J[0]);
  const bottomArcs = [0.93, 0.82, 0.71, 0.6, 0.49, 0.38];
  c.group(() => kiriLeaf(c, bottom.points, at(0, -4), [], bottomArcs, [[1, 17]], []));
  for (const sign of [-1, 1]) {
    const lateral: Pt[] = [at(sign * 2, -4), at(sign * 24, -14), at(sign * 52, -15), at(sign * 78, -6), at(sign * 92, 10), at(sign * 90, 28), at(sign * 77, 41), at(sign * 58, 44), at(sign * 41, 37), at(sign * 25, 26), at(sign * 10, 15), at(sign * 2, 9)];
    const rib: Pt[] = [at(sign * 26, 8), at(sign * 52, 20), at(sign * 82, 32)];
    const veins: Pt[][] = [0.3, 0.5, 0.7].map((t, k) => [at(sign * (26 + 56 * t), 8 + 24 * t), at(sign * (30 + 50 * t), 22 + 14 * t), lateral[9 - k] ?? lateral[8]].map((p): Pt => p));
    c.group(() => kiriLeaf(c, lateral, at(sign * 4, 0), [rib], [0.9, 0.78, 0.66, 0.54, 0.42], [[2, 5]], veins, [bottomRight.slice(1, 6).map((p): Pt => [J[0] + sign * (p[0] - J[0]) * 1.08, J[1] + (p[1] - J[1]) * 1.08])]));
  }
  c.fill("paulownia", circle(J, 7));
  // The spikes: three, the middle one the tallest.
  const gap = centrePairs === 2 ? 25 : 19;
  spike(c, at(0, -2), [CX, 15], centrePairs, gap, 19, 1);
  const sideGap = sidePairs === 1 ? 22 : 19;
  for (const sign of [-1, 1]) spike(c, at(sign * 55, 20), [CX + sign * 58, 36], sidePairs, sideGap, 17, 0.92);
};

export const gosanNoKiri = defineCrest({
  id: "gosan-no-kiri",
  name: { en: "Paulownia, five-three-five", ja: "五三桐" },
  reading: "ごさんのきり",
  romaji: "gosan no kiri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [fam("Toyotomi", "豊臣", "とよとみ"), fam("Ashikaga (granted)", "足利", "あしかが")],
  aliases: ["paulownia", "kiri", "5-3", "toyotomi"],
  construction: {
    en: "Three scalloped leaves below, and above them three upright spikes of buds: five in the middle one, three in each of the others, narrowing toward the tip.",
    ja: "下に縁に波のある葉を三枚置き、その上に花穂を三本立てます。中央の花穂には五つ、左右の花穂には三つずつ、先に向かって狭まるように蕾を並べます。",
  },
  build(c) {
    kiriBuild(c, 2, 1);
  },
});


export const goshichiNoKiri = defineCrest({
  id: "goshichi-no-kiri",
  name: { en: "Paulownia, seven-five-seven", ja: "五七桐" },
  reading: "ごしちのきり",
  romaji: "goshichi no kiri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [fam("The Government of Japan", "日本政府", "にほんせいふ"), fam("Toyotomi", "豊臣", "とよとみ")],
  aliases: ["paulownia", "kiri", "5-7", "government seal", "toyotomi", "taiko kiri"],
  construction: {
    en: "The same plan as the five-three paulownia with more buds: seven in the middle spike and five in each of the others.",
    ja: "五三桐と同じ構図で蕾を増やし、中央の花穂に七つ、左右の花穂に五つずつ並べます。",
  },
  build(c) {
    kiriBuild(c, 3, 2);
  },
});

export const maruNiGosanNoKiri = defineCrest({
  id: "maru-ni-gosan-no-kiri",
  name: { en: "Paulownia in a circle", ja: "丸に五三桐" },
  reading: "まるにごさんのきり",
  romaji: "maru ni gosan no kiri",
  frame: "ring-medium",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["paulownia ring"],
  construction: { en: "The five-three paulownia scaled to sit inside a ring a tenth of the diameter thick.", ja: "五三桐を縮めて、直径の10分の1の太さの輪の中に収めます。" },
  build(c) {
    c.ring("ring-medium");
    kiriBuild(c, 2, 1, 0.84);
  },
});
