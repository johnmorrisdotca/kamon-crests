import { yotsuIrekoYamabishiBuild, yotsuYamagataBuild } from "./drawn/yotsu-yamagata.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const yotsuYamagata = defineCrest({
  id: "yotsu-yamagata",
  name: { en: "Four mountain forms", ja: "四つ山形" },
  reading: "よつやまがた",
  romaji: "yotsu yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["四ッ山形"],
  source: cell(28, "left page, row 4, third column from the right: 四ッ山形", "左頁、四段目、右から三列目「四ッ山形」"),
  measured: "Four wide chevrons stand on the points of a low lozenge. White seams interrupt the long sides at their midpoints. The neighboring cell, row 4 column 2 from the right, also reads 四ッ山がた but shows an interwoven form. This drawing follows the four separate bands of row 4 column 3.",
  construction: {
    en: "Rule two nested lozenges with equal band thickness. Mark a narrow gap halfway along each side to leave four solid chevrons, all pointing outward.",
    ja: "等しい太さの帯になるよう、菱形を二つ引きます。各辺の中央に細い白いすき間を置き、外を向く四つの山形に分けます。",
  },
  build: yotsuYamagataBuild,
});

export const yotsuIrekoYamabishi = defineCrest({
  id: "yotsu-ireko-yamabishi",
  name: { en: "Four nested mountain groups", ja: "四つ入れ子山菱" },
  reading: "よついれこやまびし",
  romaji: "yotsu ireko yamabishi",
  frame: "none",
  motifs: [{ motif: "mountain", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["四ッ入子山びし", "四つ山菱"],
  source: cell(28, "left page, first row, fourth column from the right: 四ッ入子山びし", "左頁、一段目、右から四列目「四ッ入子山びし」"),
  measured: "The printed crest is about 320 pixels wide and 308 tall. Its three outer crests reach about 160, 111 and 63 pixels from the centre, with widths of about 40, 40 and 35 pixels measured along the axes. Four narrow diagonal seams break the bands at the corners of the groups. The drawing regularises the lozenges to one common set of slopes and the gaps to equal widths.",
  construction: {
    en: "Rule three pairs of concentric lozenges. Cut each band at the side midpoints with four straight gaps so that every point of the lozenge contains three nested chevrons.",
    ja: "中心をそろえた菱形を二つずつ、三組作ります。辺の中央に直線のすき間を四つ残し、それぞれの頂点に三つの山形を入れ子にします。",
  },
  build: yotsuIrekoYamabishiBuild,
});
