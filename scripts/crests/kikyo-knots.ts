import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuKikyoGumiBuild } from "./drawn/kikyo-knots.ts";
import { defineCrest } from "./util.ts";

export const itsutsuKikyoGumi = defineCrest({
  id: "itsutsu-kikyo-gumi",
  name: { en: "Five interlocking bellflower petals", ja: "五つ桔梗組み" },
  reading: "いつつききょうぐみ",
  romaji: "itsutsu kikyō gumi",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッききやう組"],
  construction: {
    en: "Five four-sided petals meet around a point. Ruled lines from the centre to the notches separate the petals, with a narrow white gap along each line.",
    ja: "四つの辺を持つ花びら五枚を、一点のまわりに並べます。中心から切れ込みまで定規で引いた直線に沿って、花びらの間に細い白いすき間を残します。",
  },
  measured: "The cell's five outside tips and five notches lie on alternating radii. The notches reach about 0.57 as far from the centre as the tips. The drawing uses 96 and 55 on a regular fivefold layout. The hand-drawn seams become straight gaps at the package's thread weight.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 43,
    place: { en: "right page, second row, fourth column from the right: 五ッききやう組", ja: "右頁、二段目、右から四列目「五ッききやう組」" },
    read: "2026-11-26",
    measured: true,
  },
  build: itsutsuKikyoGumiBuild,
});
