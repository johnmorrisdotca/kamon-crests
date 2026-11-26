import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuKikyoGumiBuild, kikyoBishiBuild, mutsuMusubiKikyoBuild } from "./drawn/kikyo-knots.ts";
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

export const mutsuMusubiKikyo = defineCrest({
  id: "mutsu-musubi-kikyo",
  name: { en: "Six knotted balloon flowers", ja: "六つ結び桔梗" },
  reading: "むつむすびききょう",
  romaji: "mutsu musubi kikyō",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["六ッ結びききやう"],
  construction: {
    en: "Three pointed bands cross in turn, with six ends arranged around the centre. Each band is ruled between two pairs of parallel sides and two angled ends. At the crossings, narrow white gaps separate the band above from the band below. The open centre has six points.",
    ja: "先のとがった帯を三本交互にくぐらせ、六つの先を中心のまわりに並べます。各帯は、二組の平行な直線と両端の斜めの直線で囲みます。交わりでは、上と下の帯を細い白いすき間で分けます。中央の空きは六つの先を持ちます。",
  },
  measured: "The cell spans about 271 by 310 pixels. A vertical band is about 21 pixels thick on each side and the ends are angled about 30 degrees from level. The layout uses 13 for the band width, a 96-unit radius to its outer point and a 60-degree turn between bands. The centre opening has outer and inner radii of 24 and 16. The upper loop passes in front on the left and under on the right as it does in the print.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: { en: "left page, fourth row, fourth column from the right: 六ッ結びききやう", ja: "左頁、四段目、右から四列目「六ッ結びききやう」" },
    read: "2026-11-26",
    measured: true,
  },
  build: mutsuMusubiKikyoBuild,
});

export const kikyoBishi = defineCrest({
  id: "kikyo-bishi",
  name: { en: "Balloon flower lozenge", ja: "桔梗菱" },
  reading: "ききょうびし",
  romaji: "kikyōbishi",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["桔梗ひし"],
  construction: {
    en: "A wide lozenge encloses two curved petals facing point to point. White arcs separate them from the pointed sides. At the upper and lower tips, each curved cap has three short ruled rays.",
    ja: "横長の菱の中で、弧で囲んだ二枚の花びらを先が向かい合うように置きます。左右のとがった部分とは白い弧で分けます。上下の先では、弧で仕切った部分に定規で引いた短いしべを三本ずつ入れます。",
  },
  measured: "The printed lozenge spans about 304 pixels side to side and 236 from top to bottom. The drawing uses 192 by 148. The curved petals meet at the centre, and their shoulders stand 26 to either side and 22 above or below the centre. The arc seams and short rays use the package's thread weight. The lines towards the side points stop just short so the whole outer point remains inked.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: { en: "left page, third row, second column from the right: 桔梗ひし", ja: "左頁、三段目、右から二列目「桔梗ひし」" },
    read: "2026-11-26",
    measured: true,
  },
  build: kikyoBishiBuild,
});
