import { orikomiIzutsuBuild, orikumiIBuild } from "./drawn/folded-wells.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const orikumiI = defineCrest({
  id: "orikumi-i",
  name: { en: "Joined folded well curb", ja: "折り組み井" },
  reading: "おりくみい",
  romaji: "orikumi i",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["折くミ井"],
  source: cell(6, "right page, fourth row, fourth column from the right: 折くミ井", "右頁、四段目、右から四列目「折くミ井」"),
  measured: "The outer shape is nearly square, about 294 pixels across. A flat fold crosses each outer side and a short crease opens towards the square centre. The caption has the single angled く before ミ. The four side folds are given the same width.",
  construction: {
    en: "Rule around a square opening. Add four clipped square shoulders at the outside. Leave a short seam towards the centre and a set of straight fold lines at each side.",
    ja: "中央を四角く抜き、外側の四方に角を落とした張り出しを作ります。中央へ向かう短いすき間と、各辺に沿う折り目を直線で残します。",
  },
  build: orikumiIBuild,
});

export const orikomiIzutsu = defineCrest({
  id: "orikomi-izutsu",
  name: { en: "Inward-folded well curb", ja: "折り込み井筒" },
  reading: "おりこみいづつ",
  romaji: "orikomi izutsu",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["折こミ井", "折り込み井"],
  source: cell(6, "left page, second row, first column from the right: 折こミ井", "左頁、二段目、右から一列目「折こミ井」"),
  measured: "Four clipped corners and four small side notches surround a central lozenge. Each corner has a square fold and a thin diagonal seam joins it to the centre. The caption has the separate strokes of こ before ミ. The four turns are made equal.",
  construction: {
    en: "Cut the corners and notch the four sides of a square. Leave a lozenge open in the centre. Rule four diagonal seams leading through the square corner folds.",
    ja: "正方形の角を落とし、四つの辺の中央に切れ込みを入れます。中央は菱形に白く抜き、角の四角い折り返しへ向かう斜めの筋を四本引きます。",
  },
  build: orikomiIzutsuBuild,
});
