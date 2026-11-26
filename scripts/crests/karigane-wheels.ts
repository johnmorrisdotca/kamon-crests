import { daizenKariganeBuild, itsutsuKariganeBuild } from "./drawn/karigane-wheels.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const daizenKarigane = defineCrest({
  id: "daizen-karigane",
  name: { en: "Daizen wild geese", ja: "大膳雁金" },
  reading: "だいぜんかりがね",
  romaji: "daizen karigane",
  frame: "none",
  motifs: [{ motif: "goose", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["大ぜんかりがね"],
  source: cell(18, "right page, row 3, first column from the right: 大ぜんかりがね", "右頁、三段目、右から一列目「大ぜんかりがね」"),
  measured: "Two wild geese turn half a turn apart, heads pointing out. Each has a narrow wing spread and a rounded tail that curls beneath the wing. The two tails meet at the middle, with a small round opening in each curl.",
  construction: {
    en: "Circular arcs make a wild goose with two outspread wings and a curled tail. The second bird turns half a turn from the first. A narrow white space separates their rounded tails.",
    ja: "円弧で、翼を左右に伸ばし尾を巻いた雁金を作ります。もう一羽を半回転させて置き、二つの丸い尾を中央で向かい合わせ、間を細く白く残します。",
  },
  build: daizenKariganeBuild,
});

export const itsutsuKarigane = defineCrest({
  id: "itsutsu-karigane",
  name: { en: "Five wild geese", ja: "五つ雁金" },
  reading: "いつつかりがね",
  romaji: "itsutsu karigane",
  frame: "none",
  motifs: [{ motif: "goose", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッ雁金"],
  source: cell(18, "right page, row 3, third column from the right: 五ッ雁金", "右頁、三段目、右から三列目「五ッ雁金」"),
  measured: "Five wings turn about the same point. Each narrows outwards to a swept tip, then curves back towards the centre. A small head on the inside of each wing faces inwards. One wing tip stands upright in the print.",
  construction: {
    en: "Five copies of one goose turn a fifth of a turn apart. Each wing rises from the shared centre to a swept tip. A small head fits into the bend below the tip.",
    ja: "同じ雁金を5分の1回転ずつ回して五羽置きます。翼は中央に集まり、先を外側へそらします。翼が曲がる内側に小さな頭が入ります。",
  },
  build: itsutsuKariganeBuild,
});
