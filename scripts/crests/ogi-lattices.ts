import { SHINSEN_MONCHO } from "./books.ts";
import { igetaOgiBuild, ogiBishiBuild } from "./drawn/ogi-lattices.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const igetaOgi = defineCrest({
  id: "igeta-ogi",
  name: { en: "Folding fans in a well frame", ja: "井桁扇" },
  reading: "いげたおうぎ",
  romaji: "igeta ogi",
  frame: "none",
  motifs: [{ motif: "fan", count: 4, arrangement: "crossed" }],
  families: [],
  aliases: ["いげた扇"],
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, first row, fourth column from the right: いげた扇", ja: "左頁、一段目、右から四列目「いげた扇」" }, read: READ, measured: true },
  measured: "Four long folded fans stand at right angles around a square opening. Each spine separates the two ruled paper faces and extends past the shoulder. The guards and paper faces alternate over and under at the four crossings.",
  construction: {
    en: "Rule the two faces and the central guard of each folded fan. Set four fans at right angles and leave a square opening between their inner edges. At each corner leave a narrow clearance where one fan passes over the next.",
    ja: "畳んだ扇の表裏の紙と中央の親骨を直線で引きます。四本を直角に組み、内側に正方形の空きを残します。四隅ではとなりの扇に重なるところに細い白筋を残します。",
  },
  build: igetaOgiBuild,
});

export const ogiBishi = defineCrest({
  id: "ogi-bishi",
  name: { en: "Folding-fan lozenge", ja: "扇菱" },
  reading: "おうぎびし",
  romaji: "ogi bishi",
  frame: "none",
  motifs: [{ motif: "fan", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["あふぎひし"],
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "left page, third row, first column from the right: あふぎひし", ja: "左頁、三段目、右から一列目「あふぎひし」" }, read: READ, measured: true },
  measured: "Two open stepped fans reverse direction across the long diagonal. Their exposed ribs converge into the two side points, and the stepped paper on each side leaves a lozenge outline.",
  construction: {
    en: "Rule the stepped paper edge and the two long guards of one open fan. Rule its ribs from the pivot towards the paper. Turn the other fan half a revolution across the long diagonal.",
    ja: "開いた扇の段のある紙のふちと長い親骨二本を引きます。要から紙へ中骨を引き、もう一つの扇を半回転させて長い対角線に合わせます。",
  },
  build: ogiBishiBuild,
});
