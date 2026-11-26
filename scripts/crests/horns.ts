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
    ja: "丸い根元から外側の枝を通って頂部へ向かう短い円弧をつなぎます。内側の枝を中心線へ返し、もう一方を左右対称に置きます。",
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
  measured: "Broad antlers sit inside a thin ring. Their inner branches meet around two uneven openings. Small spots scatter across both antlers and short lines extend from their rounded bases.",
  construction: {
    en: "Draw the narrow ring and the antler outlines from compass arcs. Dot each antler and rule the short lines above its base. Mirror the pair on the upright axis within the circle.",
    ja: "細輪と角の輪郭を円弧で描きます。角に点を打ち、根元の上に短い線を引きます。輪の中で中心線を軸に左右対称に置きます。",
  },
  build: maruNiDakiTsunoBuild,
});
