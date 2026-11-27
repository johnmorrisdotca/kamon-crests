import { SHINSEN_MONCHO } from "./books.ts";
import { choTomoeBuild } from "./drawn/cho-tomoe.ts";
import { defineCrest } from "./util.ts";

export const choDomoe = defineCrest({
  id: "cho-domoe",
  name: { en: "Butterflies in a tomoe", ja: "蝶巴" },
  reading: "ちょうどもえ",
  romaji: "chōdomoe",
  frame: "none",
  motifs: [{ motif: "butterfly", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["てふともゑ"],
  construction: {
    en: "Three butterflies turn around the centre. Scalloped, dotted bands follow the outer wings, and arcs cut the veins and draw the two antennae on each butterfly.",
    ja: "中心のまわりに三羽の蝶を回して置きます。外羽に沿う帯の縁を波形にして斑点を入れ、羽のすじと二本の触角は弧で描きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 34, place: { en: "right page, third row, third column from the right: てふともゑ", ja: "右頁、三段目、右から三列目「てふともゑ」" }, read: "2026-11-27", measured: true },
  measured: "The scalloped trail and the broad bend into the upper wing are measured from the top butterfly in frame 34. The wing veins, antennae and dot sizes are regularised, and the butterflies are spaced an exact third of a turn apart.",
  build: choTomoeBuild,
});
