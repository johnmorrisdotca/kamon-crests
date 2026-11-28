// Two cut horns laid across each other, measured from the labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { oriawaseTsunoBuild } from "./drawn/horn-pairs.ts";
import { defineCrest } from "./util.ts";

export const oriawaseTsuno = defineCrest({
  id: "oriawase-tsuno",
  name: { en: "Two horns laid across each other", ja: "折り合わせ角" },
  reading: "おりあわせつの",
  romaji: "oriawase tsuno",
  frame: "none",
  motifs: [{ motif: "horn", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["折合つの", "crossed horns"],
  construction: {
    en: "Two equal horns cross like an X, each curving up from its cut end at the bottom to its point at the top. A horn is the space between two bowed arcs that meet at the point. Its cut end is an oval of two arcs with a white rim, three grooves run up from the rim, and eleven short ticks are left white along its edges. The horn that points to the right lies over the other, with a narrow paper line on both sides.",
    ja: "同じ形の角を二本、Xの字のように交差させます。どちらも下の切り口から上の先へ向かって反ります。角は、先で出会う二本の弧の間の形です。切り口は二本の弧で作る楕円形で、白い縁を一本残します。縁から長い筋を三本、両側の縁に短い刻みを十一本、白く抜きます。先が右を向く角を上に重ね、その両側に細い白い線を残します。",
  },
  measured: "Frame 23, in a reach of 96: the upper horn runs from the middle of its cut end, about 67 left and 52 below the middle, to its point about 71 right and 64 above. It is drawn 33 wide at the cut end, where the print is about 37 and narrows more quickly, and bows about 23 below its chord. The other horn is its mirror image, as the print has it within a few units. The print has three grooves at each cut end and ten to thirteen ticks on each horn.",
  source: { ...SHINSEN_MONCHO, frame: 23, place: { en: "right page, first row, second column from the right: 折合つの", ja: "右頁、一段目、右から二列目「折合つの」" }, read: "2026-11-28", measured: true },
  build: oriawaseTsunoBuild,
});
