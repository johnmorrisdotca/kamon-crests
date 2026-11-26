import { hosoDakiTsunoBuild } from "./drawn/horns.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const hosoDakiTsuno = defineCrest({
  id: "hoso-daki-tsuno",
  name: { en: "Thin embracing antlers", ja: "細抱き角" },
  reading: "ほそだきつの",
  romaji: "hoso daki tsuno",
  frame: "none",
  motifs: [{ motif: "horn", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["細だき角"],
  source: cell(23, "right page, row 3, second column from the right: 細だき角", "右頁、三段目、右から二列目「細だき角」"),
  measured: "The side tines rise in two heights. The inner tines meet on the centre line around two pointed openings. The outlines are narrow and the round bases touch.",
  construction: {
    en: "Join short compass arcs from the rounded base through the outer tines and inward towards the top. Turn the inner tines back to the centre line. Mirror the antler across the upright axis.",
    ja: "丸い根元から外側の枝を通って頂部へ向かう短い円弧をつなぎます。内側の枝を中心線へ返し、もう一方の角を左右反転して置きます。",
  },
  build: hosoDakiTsunoBuild,
});
