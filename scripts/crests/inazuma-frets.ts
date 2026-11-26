import { sumitateJumonjiInazumaBuild } from "./drawn/inazuma-frets.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const sumitateJumonjiInazuma = defineCrest({
  id: "sumitate-jumonji-inazuma",
  name: { en: "Lightning cross in a square on point", ja: "隅立て十文字稲妻" },
  reading: "すみたてじゅうもんじいなずま",
  romaji: "sumitate jumonji inazuma",
  frame: "none",
  motifs: [{ motif: "lightning", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["角立十もんじいなづま"],
  source: cell(6, "left page, row 1, third column from the right: 角立十もんじいなづま", "左頁、一段目、右から三列目「角立十もんじいなづま」"),
  measured: "The square stands on one corner. Each ruled edge is broken about a third of the way along by a narrow angular seam. The four seams each curl into a broad hook and two finer fingers. Four tiny square openings sit in the middle.",
  construction: {
    en: "A square stands on one corner. The same bent seam turns with each side of the square. It works inward through straight runs and square turns. Four small squares open the centre.",
    ja: "正方形を隅立てに置き、同じ折れ曲がる白い筋を四辺に向きを変えて入れます。直線と直角だけで内側へ折り進めます。中央には小さな四角い穴を四つ置きます。",
  },
  build: sumitateJumonjiInazumaBuild,
});
