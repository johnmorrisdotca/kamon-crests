import { daizenKariganeBuild } from "./drawn/karigane-wheels.ts";
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
