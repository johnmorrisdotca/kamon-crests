import { ringedThreeLightning } from "./drawn/inazuma.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const maruNiMitsuInazuma = defineCrest({
  id: "maru-ni-mitsu-inazuma",
  name: { en: "Three lightning spirals in a circle", ja: "丸に三つ稲妻" },
  reading: "まるにみついなずま",
  romaji: "maru ni mitsu inazuma",
  frame: "ring-thin",
  motifs: [{ motif: "lightning", count: 3, arrangement: "triangle" }],
  families: [],
  source: cell(6, "left page, row 4, third column from the right: 丸に三ッいなづま", "左頁、四段目、右から三列目「丸に三ッいなづま」"),
  measured:
    "The outer ring in the print spans about 290 pixels with a band about 14 pixels thick. The cube is about 249 pixels high. Each face contains the broad spiral band, measured in hundredths along its two axes, with the inner four runs near 25, 46, 52 and 56 from a corner. The drawing uses a cube layout radius of 82 inside a ring of the package's thin weight.",
  construction: {
    en: "A thin ring encloses three diamond-shaped faces, one upper face and two below. A broad ruled spiral fills each face, with white gaps between the turns and between the faces. The two lower faces are placed a third and two thirds of a turn from the top face.",
    ja: "細い輪の中に菱形の面を三つ収め、上に一面、下に二面を置きます。どの面にも直線で太い渦を作り、巻いた帯の間と面どうしの間に白いすき間を残します。下の二面は上の面から3分の1回転と3分の2回転した位置に置きます。",
  },
  build: ringedThreeLightning,
});
