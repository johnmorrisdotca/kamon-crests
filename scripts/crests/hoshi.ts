import { chuwaNiItsutsuBoshiBuild, inyoNanatsuBoshiBuild, mitsuBoshiKuzushiBuild } from "./drawn/hoshi.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuBoshiKuzushi = defineCrest({
  id: "mitsu-boshi-kuzushi",
  name: { en: "Stylized three stars", ja: "三つ星崩し" },
  reading: "みつぼしくずし",
  romaji: "mitsuboshi kuzushi",
  frame: "none",
  motifs: [{ motif: "star", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッほしくづし"],
  source: cell(10, "right page, row 1, second column from the right: 三ッほしくづし", "右頁、一段目、右から二列目「三ッほしくづし」"),
  measured: "Three gently bowed seams run from a shared point to the rim of the printed circle. They meet the rim at approximately equal intervals and divide the field into three filled sectors.",
  construction: {
    en: "Strike a circle. Leave three equal curved white seams running from the centre to the edge.",
    ja: "円を打ち、中央から外縁まで同じ曲がり方の白いすき間を三本残します。",
  },
  build: mitsuBoshiKuzushiBuild,
});

export const chuwaNiItsutsuBoshi = defineCrest({
  id: "chuwa-ni-itsutsu-boshi",
  name: { en: "Five stars in a medium ring", ja: "中輪に五つ星" },
  reading: "ちゅうわにいつつぼし",
  romaji: "chūwa ni itsutsuboshi",
  frame: "ring-medium",
  motifs: [{ motif: "star", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["中ワニ五ッ星", "中五つ星"],
  source: cell(10, "right page, row 2, second column from the right: 中ワニ五ッ星", "右頁、二段目、右から二列目「中ワニ五ッ星」"),
  measured: "Five round discs make a cross. The upper, right, lower and left discs almost touch a disc of the same size at the centre. A separate ring follows the outside.",
  construction: {
    en: "Strike the medium ring. Set four discs around the central disc on the upright and level axes and keep narrow white gaps around them.",
    ja: "中輪を打ち、中央の円の上下左右に同じ大きさの円を置きます。円どうしと輪の内側は細く白く空けます。",
  },
  build: chuwaNiItsutsuBoshiBuild,
});

export const inyoNanatsuBoshi = defineCrest({
  id: "inyo-nanatsu-boshi",
  name: { en: "Seven overlapping outlined stars", ja: "陰陽七つ星" },
  reading: "いんようななつぼし",
  romaji: "inyō nanatsuboshi",
  frame: "none",
  motifs: [{ motif: "star", count: 7, arrangement: "ring" }],
  families: [],
  aliases: ["いんよう七ッほし"],
  source: cell(10, "right page, row 4, second column from the right: いんよう七ッほし", "右頁、四段目、右から二列目「いんよう七ッほし」"),
  measured: "Six overlapping circular outlines surround a seventh outline. Their centres sit on the middle circle and each of the six outlines crosses the centre of the crest.",
  construction: {
    en: "Strike the middle circle and step the compass around it for the six outer centres. Draw the seven equal outlines at thread weight.",
    ja: "中央の円を打ち、その円周をコンパスで六等分して外側の中心を取ります。七つの円を細い線で描きます。",
  },
  build: inyoNanatsuBoshiBuild,
});
