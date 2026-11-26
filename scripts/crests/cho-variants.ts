import { musubichoBuild } from "./drawn/cho-variants.ts";
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
    ja: "コンパスの弧で描いた細い帯を縦の直線に交差させ、左右に広い羽、下に小さな羽を二つずつ作ります。上には外側と内側に二つずつ渦を置きます。",
  },
  build: musubichoBuild,
});
