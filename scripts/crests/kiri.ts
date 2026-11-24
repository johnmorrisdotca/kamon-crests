// The paulownia 桐: three leaves below, and three spikes of flowers above, the middle one the tallest.
import { CX, Path, circle, lens, polar, turn } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { defineCrest, fam } from "./util.ts";
import { aoiLeaf } from "./leaves.ts";

type B = Parameters<(typeof gosanNoKiri)["build"]>[0];

/**
 * A spike of flowers: a stem from `base` along `deg`, then rows of buds, the narrow row at the tip: one bud, then pairs,
 * each row `gap` further down the spike toward the stem.
 */
const spike = (c: B, base: Pt, deg: number, length: number, rows: number, bud: number): void => {
  const gap = bud * 2.15;
  const axis = (d: number): Pt => polar(d, deg, base);
  const stem = length - rows * gap - bud * 0.2;
  c.stroke("paulownia", new Path().M(base).L(axis(stem + bud)), bud * 0.55);
  c.group(() => {
    for (let r = 0; r < rows; r += 1) {
      const d = length - bud - r * gap;
      const across = r === 0 ? [0] : [-0.56 * gap, 0.56 * gap];
      for (const x of across) {
        const centre = turn([axis(d)[0] + x, axis(d)[1]], deg, axis(d));
        const slit = lens(polar(bud * 0.5, deg, centre), polar(bud * 0.5, deg + 180, centre), 0.2);
        c.fill("paulownia", circle(centre, bud).join(slit), "evenodd");
      }
    }
  });
};

const kiriBuild = (c: B, centreRows: number, sideRows: number, bud: number, zoom = 1): void => {
  c.zoom(zoom);
  const J: Pt = [CX, 124];
  c.guideLine([CX, 4], [CX, 196]);
  c.guideLine([4, J[1]], [196, J[1]]);
  c.guideCircle(J, 74);
  // The leaves: one down, one to each side, level with the junction.
  for (const [a, L] of [[300, 56], [60, 56], [180, 52]] as const) {
    const { leaf, veins } = aoiLeaf(polar(14, a, J), a, L);
    c.group(() => c.fill("paulownia", veins.reduce((acc, v) => acc.join(v), leaf), "evenodd"));
  }
  spike(c, J, 0, 100, centreRows, bud);
  spike(c, J, -40, 96, sideRows, bud);
  spike(c, J, 40, 96, sideRows, bud);
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
    kiriBuild(c, 3, 2, 9);
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
    kiriBuild(c, 4, 3, 7.4);
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
    kiriBuild(c, 3, 2, 9, 0.84);
  },
});
