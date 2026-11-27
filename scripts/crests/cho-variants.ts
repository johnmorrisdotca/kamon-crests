import { SHINSEN_MONCHO } from "./books.ts";
import { kochoBuild, musubichoBuild } from "./drawn/cho-variants.ts";
import { mamukiChoBuild } from "./drawn/mamuki-cho.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const musubicho = defineCrest({
  id: "musubicho",
  name: { en: "Knotted butterfly", ja: "結び蝶" },
  reading: "むすびちょう",
  romaji: "musubichō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [],
  source: cell(34, "left page, row 2, second column from the right: むすびてふ", "左頁、二段目、右から二列目「むすびてふ」"),
  measured: "The print is about 278 pixels wide and 200 high. It has four lobes formed by thin, continuous lines. The two large lobes rise at the sides, the two lower lobes meet at the tip of the upright stem, and four ends curl upwards. The drawing uses the same intersections and mirrors the two sides.",
  construction: {
    en: "Bands of compass arcs cross a ruled upright stem and loop round to form two broad wings and two smaller lower wings. Two outer curls and two shorter inner curls spread above them.",
    ja: "コンパスの弧で描いた帯を縦の直線に交差させ、左右に広い羽を二枚、下に小さな羽を二枚作ります。上には、外側の渦を二つと、それより短い内側の渦を二つ置きます。",
  },
  build: musubichoBuild,
});

export const kocho = defineCrest({
  id: "kocho",
  name: { en: "Small butterfly", ja: "小蝶" },
  reading: "こちょう",
  romaji: "kochō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [],
  source: cell(34, "right page, row 1, second column from the right: こてふ", "右頁、一段目、右から二列目「こてふ」"),
  measured: "The wings span about 279 pixels. The small upper body sits close to the level of the wing roots, below two antennae that sweep up and out and curl at their ends. The upper wings have four large veins apiece, while the lower ones have two shorter curves. The wings and the two pairs of white lines are made symmetric.",
  construction: {
    en: "Four rounded wings spread around a pointed body. Four white veins fan out in each upper wing, two in each lower wing, and the antennae end in compass curls above the eyes.",
    ja: "先のとがった胴のまわりに丸い羽を四枚置きます。上の羽に四本ずつ、下の羽に二本ずつ白いすじを入れ、目の上から伸びる触角の先を弧で巻きます。",
  },
  build: kochoBuild,
});

export const mamukiCho = defineCrest({
  id: "mamuki-cho",
  name: { en: "Front-view butterfly", ja: "真向き蝶" },
  reading: "まむきちょう",
  romaji: "mamuki chō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["真むきてふ"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 34,
    place: {
      en: "right page, third row, second column from the right: 真むきてふ",
      ja: "右頁、三段目、右から二列目「真むきてふ」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The pointed ridge, scalloped wings, six wing eyes and lower hooked feet are placed from frame 34. Each side repeats the same wing and feet.",
  construction: {
    en: "Mirror a scalloped wing on either side of the pointed body. Place three eye marks and three curved feet on each side.",
    ja: "先のとがった胴の左右に同じ羽を写します。片側に三つずつ、羽の目と曲がった脚を置きます。",
  },
  placementBuild: { module: new URL("./drawn/mamuki-cho.ts", import.meta.url), export: "mamukiChoBuild" },
  build: mamukiChoBuild,
});
