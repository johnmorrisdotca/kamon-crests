import { SHINSEN_MONCHO } from "./books.ts";
import { kuginukiKuzushiBuild } from "./drawn/kuginuki.ts";
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
