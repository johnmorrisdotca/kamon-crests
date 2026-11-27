import { hosoDakiTsunoBuild, maruNiDakiTsunoBuild } from "./drawn/horns.ts";
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

export const maruNiDakiTsuno = defineCrest({
  id: "maru-ni-daki-tsuno",
  name: { en: "Embracing antlers in a circle", ja: "丸に抱き角" },
  reading: "まるにだきつの",
  romaji: "maru ni daki tsuno",
  frame: "ring-thin",
  motifs: [{ motif: "horn", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["丸にだき角"],
  source: cell(23, "right page, row 4, first column from the right: 丸にだき角", "右頁、四段目、右から一列目「丸にだき角」"),
  measured: "The cell fixes the antlers' breadth, round bases, pointed openings, and the position of the spots and ruled cuts. The pair is made symmetric and the frame uses the standard thin ring.",
  construction: {
    en: "Join the compass arcs into a solid antler. Leave the spots and fine cuts at the base white, then mirror the antler across the upright axis inside the thin ring.",
    ja: "円弧をつないで角の形を塗ります。斑点と根元の細い切れ目を白く抜き、細輪の中で中心線を軸にもう一方の角を左右反転して置きます。",
  },
  build: maruNiDakiTsunoBuild,
});
