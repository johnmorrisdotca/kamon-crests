import { cornerUpLightning, diamondLightning, hexagonalLightning, ringedThreeLightning } from "./drawn/inazuma.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const inazumabishi = defineCrest({
  id: "inazumabishi",
  name: { en: "Lightning lozenge", ja: "稲妻菱" },
  reading: "いなずまびし",
  romaji: "inazuma bishi",
  frame: "none",
  motifs: [{ motif: "lightning", count: 1, arrangement: "single" }],
  families: [],
  source: cell(6, "left page, row 3, second column from the right: 稲妻菱", "左頁、三段目、右から二列目「稲妻菱」"),
  measured:
    "The book's outlines span about 310 by 229 pixels, with the outer return near the lower tip and a central hook at about the level of the two side tips. The levels of the parallel runs were read along the two slants of the lozenge. The drawing uses a height 0.73 of its width and leaves white gaps between the adjacent runs.",
  construction: {
    en: "A broad band winds in from the bottom of a low lozenge, whose height is 0.73 of its width. All the sides run in the two directions of the lozenge. The band leaves a thin white gap between its turns and ends in a short hook.",
    ja: "高さが幅の0.73の横長の菱形で、太い帯を下から内へ巻き込みます。辺はどれも菱形の二つの方向にそろえます。巻いた帯の間には細い白いすき間を残し、中心近くは短いかぎ形で終えます。",
  },
  build: diamondLightning,
});

export const sumitateInazuma = defineCrest({
  id: "sumitate-inazuma",
  name: { en: "Lightning square on its corner", ja: "隅立て稲妻" },
  reading: "すみたていなずま",
  romaji: "sumitate inazuma",
  frame: "none",
  motifs: [{ motif: "lightning", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["角立稲妻", "角立いなづま"],
  source: cell(6, "left page, row 4, second column from the right: 角立いなづま", "左頁、四段目、右から二列目「角立いなづま」"),
  measured:
    "The book's outline spans about 325 by 300 pixels. Both sets of sides are close to 45 degrees. The turns step inward along two sets of parallel levels, with thin breaks and an inward-facing hook at the centre. The drawing regularises the nearly square outline and keeps the narrower inner return printed in this cell.",
  construction: {
    en: "The four corners of a square stand on the outer circle. The broad band starts at the bottom and turns inwards between lines ruled at 45 degrees. A narrow gap separates the turns. The inner return narrows before ending in a hook.",
    ja: "正方形を角で立て、四つの角を外円の上に置きます。太い帯は下から始まり、45度に引いた直線の間で内側へ巻きます。巻いた帯の間には白いすき間を細くあけます。内側では幅を狭め、かぎ形で終えます。",
  },
  build: cornerUpLightning,
});

export const rokkakuInazuma = defineCrest({
  id: "rokkaku-inazuma",
  name: { en: "Hexagonal lightning", ja: "六角稲妻" },
  reading: "ろっかくいなずま",
  romaji: "rokkaku inazuma",
  frame: "none",
  motifs: [{ motif: "lightning", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["六角いなづま"],
  source: cell(6, "left page, row 3, fourth column from the right: 六角いなづま", "左頁、三段目、右から四列目「六角いなづま」"),
  measured:
    "The cell has a hexagon 312 pixels high with the left side cut near its lower end. Each edge of the band follows one of three directions. At the upper point, the boundaries of the white gaps lie at about 80 and 76, 57 and 53, and 34 and 30 of the drawing's 96-unit radius. The central hook starts in the lower part of the last turn.",
  construction: {
    en: "Mark the six corners of the outer hexagon by stepping the compass round the layout circle. Lines parallel to its sides bound the spiral band. It starts near the foot of the left side, winds inward and ends in a short hook. A narrow white gap separates the turns.",
    ja: "外円をコンパスで一周しながら、外側の六角形の六つの角に印をつけます。その辺に平行な直線で帯を作ります。帯は左の辺の下のほうから内へ巻き、中心近くは短いかぎ形で終えます。巻いた帯の間には細い白いすき間を残します。",
  },
  build: hexagonalLightning,
});

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
