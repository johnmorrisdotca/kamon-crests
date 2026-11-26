import { hanshoBuild } from "./drawn/hansho.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const hansho = defineCrest({
  id: "hansho",
  name: { en: "Fire bell", ja: "半鐘" },
  reading: "はんしょう",
  romaji: "hanshō",
  frame: "none",
  motifs: [{ motif: "fire-bell", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["はんしやう"],
  source: cell(8, "right page, row 3, fourth column from the right: はんしやう", "右頁、三段目、右から四列目「はんしやう」"),
  measured: "A loop rests above the rounded collar. Four ribs divide five strips of studs on the bell's body. The lower edge flares into a broad curved lip.",
  construction: {
    en: "Strike the hanging loop and broad bell. Separate the collar and rim with shallow white arcs, rule the five panels and leave the round studs white.",
    ja: "吊り輪と幅広い鐘を弧で描きます。首と裾を浅い白い弧で分け、胴に五つの区画を引き、丸い粒を白く残します。",
  },
  build: hanshoBuild,
});
