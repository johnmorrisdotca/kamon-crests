import { chigaiIneBuild } from "./drawn/chigai-ine.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const chigaiIne = defineCrest({
  id: "chigai-ine",
  name: { en: "Crossed rice stalks", ja: "違い稲" },
  reading: "ちがいいね",
  romaji: "chigai ine",
  frame: "none",
  motifs: [{ motif: "rice", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["違い稲"],
  construction: {
    en: "Two equal bundles of rice cross beneath a narrow tie. Six sprays repeat one compass-drawn grain.",
    ja: "同じ形の稲の束を二つ、細い結び目の下で交差させます。六本の穂に、コンパスで描く同じ米の粒を置きます。",
  },
  measured: "The 1892 cell supplies the six grain sprays, the tapering leaf blades, the crossing angle and the slanted cuts. The bundles are mirrored, and the ruled tie and stalk seams use a single paper width.",
  source: { ...SHINSEN_MONCHO, frame: 5, place: { en: "left page, first row, first column from the right: 違い稲", ja: "左頁、一段目、右から一列目「違い稲」" }, read: "2026-11-27", measured: true },
  build: chigaiIneBuild,
});
