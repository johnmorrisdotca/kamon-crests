import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-clusters.ts";
import { defineCrest } from "./util.ts";

export const saizuchiBishi = defineCrest({
  id: "saizuchi-bishi",
  name: { en: "Mallet lozenge with a flower", ja: "才槌菱" },
  reading: "さいづちびし",
  romaji: "saizuchi bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 1, arrangement: "quartered" }, { motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["さいづちひし"],
  construction: {
    en: "A lozenge has rectangular bites in each side. White diagonal seams lead to the four-petalled flower in its centre. The small white outline around the flower keeps it distinct from the notched field.",
    ja: "菱の四辺に角形の切り欠きを入れます。斜めの白い筋は中央の花菱に向かいます。花菱のまわりに細い白線を残し、外側の菱と分けます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, third row, second column from the right: さいづちひし", ja: "右頁、三段目、右から二列目「さいづちひし」" }, read: "2026-11-27", measured: true },
  measured: "The notched frame is about 317 by 258 pixels. The flower spans roughly half to three fifths of the outer width. Four small bites along each side regularise the printed notches.",
  build: drawn.saizuchiBishiBuild,
});

export const mitsuMatsukawaBishi = defineCrest({
  id: "mitsu-matsukawa-bishi",
  name: { en: "Three gathered pine-bark lozenges", ja: "三つ松皮菱" },
  reading: "みつまつかわびし",
  romaji: "mitsu matsukawa bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["三ッ松川ひし"],
  construction: {
    en: "Set one stepped pine-bark lozenge above two others. Their long diagonals all run horizontally. The top lozenge crosses the two lower ones at their inside steps, with narrow white seams.",
    ja: "松皮菱を一つ上、二つ下に並べ、三つとも長い対角線を横にします。上の菱は下の二つの内側の段と重なり、間に細い白線を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, third row, first column from the right: 三ッ松川ひし", ja: "左頁、三段目、右から一列目「三ッ松川ひし」" }, read: "2026-11-27", measured: true },
  measured: "The group on the selected plate is about 320 wide and 164 high. Equalised positions on the package layout keep the same broad, flat cluster.",
  build: drawn.mitsuMatsukawaBishiBuild,
});

export const itowaNiMitsuSangaiBishi = defineCrest({
  id: "itowa-ni-mitsu-sangai-bishi",
  name: { en: "Three folded three-tier lozenges in a thread ring", ja: "糸輪に三つ三階菱" },
  reading: "いとわにみつさんがいびし",
  romaji: "itowa ni mitsu sangai bishi",
  frame: "ring-thread",
  motifs: [{ motif: "diamond", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワニ三ッ三かいひし"],
  construction: {
    en: "Three angled faces fill a hexagon inside the thread ring. Along each seam two white arrow-shaped cuts point outward. The three seams meet at the centre.",
    ja: "糸輪の内側の六角形を三つの面に分けます。各面の境に外を向く白い矢形を二つずつ置き、三本の境を中央で合わせます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, first row, third column from the right: 糸ワニ三ッ三かいひし", ja: "右頁、一段目、右から三列目「糸ワニ三ッ三かいひし」" }, read: "2026-11-27", measured: true },
  measured: "In the engraving the hexagon occupies most of the ring opening. Each of its three seams carries a small inner arrow and a larger outer arrow. The drawing regularises those angles at thirds of a turn.",
  build: drawn.itowaNiMitsuSangaiBishiBuild,
});
