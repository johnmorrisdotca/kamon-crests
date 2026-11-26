import { SHINSEN_MONCHO } from "./books.ts";
import { chukageUraKikyoBuild, kokumochiKikyoBuild, mitsuKumiawaseKikyoBuild } from "./drawn/kikyo.ts";
import { defineCrest } from "./util.ts";

export const kokumochiKikyo = defineCrest({
  id: "kokumochi-kikyo",
  name: { en: "Bellflower on a black disc", ja: "石持ち桔梗" },
  reading: "こくもちききょう",
  romaji: "kokumochi kikyō",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 5, arrangement: "radial" }, { motif: "black-disc", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["石持桔梗", "石持ききやう"],
  construction: {
    en: "Five pointed petals and a round centre are cut out of a black disc. Two tangent compass arcs form each petal shoulder and tip, and a rounded black ray runs outward from the centre into each petal.",
    ja: "黒い円から、先のとがった花びら五枚と丸い中心を白く抜きます。接する二つの弧をつないで花びらの肩と先を作り、中心から各花びらへ、先の丸い黒いしべを伸ばします。",
  },
  measured: "The photographed disc is about 307 pixels across. Its five petal tips meet the rim, the round centre is about 43 pixels across and the longest ray ends about 75 pixels from the centre. The disc is 192 wide here. The petals come to within two units of the rim so the circular edge stays continuous. The centre is 26 wide and the solid rays reach 47, using the package's thin weight. The shoulders use radius 24 and the tangent arcs to the tips use radius 88. The black seams between petals are twice the package's thread weight.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: { en: "right page, second row, third column from the right: 石持ききやう", ja: "右頁、二段目、右から三列目「石持ききやう」" },
    read: "2026-11-26",
    measured: true,
  },
  build: kokumochiKikyoBuild,
});

export const chukageUraKikyo = defineCrest({
  id: "chukage-ura-kikyo",
  name: { en: "Outlined reverse bellflower", ja: "中陰裏桔梗" },
  reading: "ちゅうかげうらききょう",
  romaji: "chūkage ura kikyō",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["中かげうらききやう"],
  construction: {
    en: "Two sets of five pointed lobes form a band around the reverse of the flower. Each edge is a compass arc. A small five-pointed calyx sits inside, with a curved stem leaning to the right.",
    ja: "五つのとがった裂片を内外に並べ、花の裏側を囲む帯にします。それぞれの縁はコンパスの弧です。内側には五つの先を持つ小さながくを置き、曲がった茎を右に傾けます。",
  },
  measured: "The print's upper outer and inner tips are about 29 pixels apart. On the 200-unit page their distances from the centre are 96 and 77. The two sets of notches are 71 and 54 from the centre and the arcs have radii 74 and 61. The five lobes are made identical. The little calyx and visibly slanted stem keep the print's separate silhouette.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: { en: "right page, third row, fourth column from the right: 中かげうらききやう", ja: "右頁、三段目、右から四列目「中かげうらききやう」" },
    read: "2026-11-26",
    measured: true,
  },
  build: chukageUraKikyoBuild,
});

export const mitsuKumiawaseKikyo = defineCrest({
  id: "mitsu-kumiawase-kikyo",
  name: { en: "Three balloon flowers joined together", ja: "三つ組合せ桔梗" },
  reading: "みつくみあわせききょう",
  romaji: "mitsu kumiawase kikyō",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ組合ききやう"],
  construction: {
    en: "Three bellflower centres stand at the corners of an equilateral triangle. Three narrow petals open out from each centre. Each pair of flowers shares one lens petal between its centres. A ruled white vein runs along every petal.",
    ja: "三つの桔梗の芯を正三角形の頂点に置きます。それぞれの芯から外へ細い花びらを三枚ずつ伸ばし、となり合う二つの芯の間にレンズ形の花びらを一枚ずつ渡します。すべての花びらに、定規で引いた白い筋を入れます。",
  },
  measured: "The printed flower centres are around 101 pixels apart. The upright petal end is about 98 pixels from its centre, and each shared petal spans about 73 pixels between the printed centres' edges. The drawing sets the centres 36 from the middle, the outer petal tips 59 from their centres and the starts of the lenses 9 from their centres. The outer lens arcs have radius 43 and the shared arcs 35.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: { en: "right page, third row, third column from the right: 三ッ組合ききやう", ja: "右頁、三段目、右から三列目「三ッ組合ききやう」" },
    read: "2026-11-26",
    measured: true,
  },
  build: mitsuKumiawaseKikyoBuild,
});
