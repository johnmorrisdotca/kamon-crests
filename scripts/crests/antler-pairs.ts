// Two branched antlers laid across each other, measured from the labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { chigaiTsunoBuild } from "./drawn/antler-pairs.ts";
import { defineCrest } from "./util.ts";

export const chigaiTsuno = defineCrest({
  id: "chigai-tsuno",
  name: { en: "Crossed antlers", ja: "違い角" },
  reading: "ちがいつの",
  romaji: "chigai tsuno",
  frame: "none",
  motifs: [{ motif: "horn", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["ちがひ角", "crossed deer antlers"],
  construction: {
    en: "Two equal antlers cross like an X near their cut ends, which stand at the bottom. Each beam widens into four pointed tines that open outwards: a hook below, a side tine, the long main tine and a curved brow tine next to the middle. Every edge is one arc from a notch to a tip, and the side tine and the main tine end in a short round tip. The cut end is an oval of two arcs with a white rim and three grooves, six ticks are left white along the main tine and three arcs at its root. The antler whose tines open to the right lies over the other, with a narrow paper line on both sides.",
    ja: "同じ形の角を二本、下に置いた切り口の近くでXの字のように交差させます。角の幹は広がって、外へ開く四本のとがった枝に分かれます。下の鉤形の枝、横の枝、長い主の枝、中央寄りの反った枝です。どの縁も、切れ込みから先までを一本の弧で描き、横の枝と主の枝の先は短い弧で丸めます。切り口は二本の弧で作る楕円形で、白い縁を一本と筋を三本残します。主の枝に沿って刻みを六本、その付け根に弧を三本、白く抜きます。枝が右へ開く角を上に重ね、その両側に細い白い線を残します。",
  },
  measured: "Frame 23, in a reach of about 96, for the antler on top: the cut end is about 20 wide, about 63 left and 61 below the middle. The tips of its tines stand about (62, -4), (70, 36), (61, 68) and (26, 54) from the middle, and the notches between them about (35, -8), (46, 20) and (18, 22). The other antler is its mirror image. In the print the two differ by a few units, and each tine's position is the mean of the two.",
  source: { ...SHINSEN_MONCHO, frame: 23, place: { en: "right page, second row, second column from the right: ちがひ角", ja: "右頁、二段目、右から二列目「ちがひ角」" }, read: "2026-11-28", measured: true },
  build: chigaiTsunoBuild,
});
