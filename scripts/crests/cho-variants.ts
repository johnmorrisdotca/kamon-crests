import { SHINSEN_MONCHO } from "./books.ts";
import { jogeMusubichoBuild } from "./drawn/joge-no-musubicho.ts";
import { kochoBuild, musubichoBuild } from "./drawn/cho-variants.ts";
import { fusenChoBuild } from "./drawn/fusen-cho.ts";
import { tsukihoshiChoBuild } from "./drawn/tsukihoshi-cho.ts";
import { mokkoNiAgehachoBuild } from "./drawn/mokko-ni-agehacho.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";
import { mamukiChoBuild } from "./drawn/mamuki-cho.ts";
import { bizenChoBuild } from "./drawn/bizen-cho.ts";

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

export const jogeMusubicho = defineCrest({
  id: "joge-no-musubicho",
  name: { en: "Upper and lower knotted butterflies", ja: "上下の結び蝶" },
  reading: "じょうげのむすびちょう",
  romaji: "jōge no musubichō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["上下のむすびてふ"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 34,
    place: {
      en: "left page, second row, first column from the right: 上下のむすびてふ",
      ja: "左頁、二段目、右から一列目「上下のむすびてふ」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The two facing outlines, wing eye marks and hooked feelers are positioned from frame 34. One butterfly turned by half a revolution gives the second.",
  construction: {
    en: "Mirror the two wings around one narrow body. Place its curled feelers, then turn the same butterfly halfway around to form the central opening.",
    ja: "細い胴の左右に羽を写し、曲がった触角を置きます。同じ蝶を半回転させ、向かい合わせて中央に空きを残します。",
  },
  build: jogeMusubichoBuild,
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

export const fusenCho = defineCrest({
  id: "fusen-cho",
  name: { en: "Floating-line butterfly", ja: "浮線蝶" },
  reading: "ふせんちょう",
  romaji: "fusen chō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ふせんてふ"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 34,
    place: {
      en: "left page, fourth row, second column from the right: ふせんてふ",
      ja: "左頁、四段目、右から二列目「ふせんてふ」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The tall open centre, three eye marks per side and lower wing ribs are read from frame 34. The two sides mirror one wing construction.",
  construction: {
    en: "Mirror a scalloped wing around the open centre. Place three eye marks on each side and fan curved ribs out from the body.",
    ja: "羽を弧で描き、中央の空きをはさんで左右に写します。左右に三つずつ目を置き、胴から弧の筋を扇形に広げます。",
  },
  build: fusenChoBuild,
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

export const mokkoNiAgehacho = defineCrest({
  id: "mokko-ni-agehacho",
  name: { en: "Swallowtail in a lobed frame", ja: "木瓜に上げ羽蝶" },
  reading: "もっこうにあげはちょう",
  romaji: "mokkō ni agehachō",
  frame: "mokko",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["木瓜に揚羽蝶", "うりニあげは蝶"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 28,
    place: {
      en: "right page, fourth row, third column from the right: うりニあげは蝶",
      ja: "右頁、四段目、右から三列目「うりニあげは蝶」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The five-lobed frame, narrow inner ring and side-view butterfly are read from frame 28. The upright forewing, curled feelers and hooked feet keep their printed positions.",
  construction: {
    en: "Turn the same rounded lobe five times around a narrow ring. Raise the veined swallowtail wing and place its curled feelers and feet.",
    ja: "丸い外形を五つまわりに置き、細い輪の中で揚羽蝶の羽を立てます。触角を巻き、曲がった脚を三つ置きます。",
  },
  placementBuild: { module: new URL("./drawn/mokko-ni-agehacho.ts", import.meta.url), export: "mokkoNiAgehachoBuild" },
  build: mokkoNiAgehachoBuild,
});

export const bizenCho = defineCrest({
  id: "bizen-cho",
  name: { en: "Bizen butterfly", ja: "備前蝶" },
  reading: "びぜんちょう",
  romaji: "bizen chō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["備前てふ"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 33,
    place: {
      en: "left page, third row, fourth column from the right: 備前てふ",
      ja: "左頁、三段目、右から四列目「備前てふ」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The rounded wings, central opening and three body sections follow frame 33. The scallops and eye marks are evened across the axis.",
  construction: {
    en: "Mirror the curled upper wings and the short lower wings. Place the ringed eyes beside the three curved body sections.",
    ja: "曲がった上の羽と短い下の羽を左右に写します。三つに分かれた胴の脇に輪の目を置きます。",
  },
  build: bizenChoBuild,
});

export const tsukihoshiCho = defineCrest({
  id: "tsukihoshi-cho",
  name: { en: "Moon-and-star butterfly", ja: "月星蝶" },
  reading: "つきほしちょう",
  romaji: "tsukihoshi chō",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["月星てふ", "つきぼしちょう"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 34,
    place: {
      en: "right page, first row, fourth column from the right: 月星てふ",
      ja: "右頁、一段目、右から四列目「月星てふ」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The broad circular opening, six wing eyes and small hanging figure are positioned from frame 34. The two wings mirror one another.",
  construction: {
    en: "Reflect the long wings around a round opening. Place the lower body and hang the small figure from the crown.",
    ja: "長い羽を左右に写し、中央に丸い空きを残します。下に胴を置き、上から小さな形を下げます。",
  },
  placementBuild: { module: new URL("./drawn/tsukihoshi-cho.ts", import.meta.url), export: "tsukihoshiChoBuild" },
  build: tsukihoshiChoBuild,
});
