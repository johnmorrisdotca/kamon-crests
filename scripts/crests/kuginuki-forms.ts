import { RING_GAP } from "../construct/builder.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { chigaiKuginukiBuild, kuginukiKuzushiBuild } from "./drawn/kuginuki.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";
const PART = "nail-puller";

export const kuginukiKuzushi = defineCrest({
  id: "kuginuki-kuzushi",
  name: { en: "Interlaced rectangular nail pullers", ja: "釘抜崩し" },
  reading: "くぎぬきくずし",
  romaji: "kuginuki kuzushi",
  frame: "none",
  motifs: [{ motif: PART, count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["釘抜くづし"],
  construction: {
    en: "A wide horizontal loop passes through a narrower upright loop. At the four crossings the over-and-under order alternates, leaving a narrow white gap beside each upper edge.",
    ja: "横長の輪を縦長の輪に通します。四つの交わりでは上下を交互にし、上の輪の縁に細い白を残します。",
  },
  measured: "The horizontal loop is wider than the height of the vertical loop. The four straight sides of each loop are balanced about the common centre, and the overlaps follow the four crossings in the print.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, first row, second column from the right: 釘抜くづし", ja: "右頁、一段目、右から二列目「釘抜くづし」" }, read: READ, measured: true },
  build: kuginukiKuzushiBuild,
});

export const maruNiChigaiKuginuki = defineCrest({
  id: "maru-ni-chigai-kuginuki",
  name: { en: "Crossed nail pullers in a circle", ja: "丸に違い釘抜" },
  reading: "まるにちがいくぎぬき",
  romaji: "maru ni chigai kuginuki",
  frame: "ring-medium",
  motifs: [{ motif: PART, count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["丸ニ違くぎ抜"],
  construction: {
    en: "Two diagonal hooked brackets interlock inside a ring. Each one's short turned ends enter the opening of the other, and the outer corners approach the ring.",
    ja: "二つの斜めのかぎ形を輪の中で組みます。それぞれの短く曲がった端が相手の開きに入り、外側の角は輪に近づきます。",
  },
  measured: "The opposed, interlocking brackets in the book use the same ruled form as the plain crossed pair. Their common scale fills the medium ring with the standard white clearance.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "right page, third row, first column from the right: 丸ニ違くぎ抜", ja: "右頁、三段目、右から一列目「丸ニ違くぎ抜」" }, read: READ, measured: true },
  build(c) {
    chigaiKuginukiBuild(c, c.ring("ring-medium") - RING_GAP);
  },
});
