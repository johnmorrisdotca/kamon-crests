import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuIgetaBuild } from "./drawn/igeta-arrangements.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const mitsuIgeta = defineCrest({
  id: "mitsu-igeta",
  name: { en: "Three well frames", ja: "三つ井桁" },
  reading: "みついげた",
  romaji: "mitsu igeta",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッいげた"],
  construction: {
    en: "Three open well frames share the corner of an isometric figure. Their straight rails overlap in three planes, with short ends extending past the crossings.",
    ja: "三つの開いた井桁で等角図の一つの角を分け合います。三つの面で材が交わり、その外に短い端が出ます。",
  },
  measured: "The ruled rails in the book follow the two slopes and the upright. The beams are about 10 units thick on the working layout, and narrow gaps distinguish their crossing edges. The front corner and opening in the top face are kept, and the protruding ends are set at equal distances on their respective planes.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, second row, fourth column from the right: 三ッいげた", ja: "右頁、二段目、右から四列目「三ッいげた」" }, read: READ, measured: true },
  build: mitsuIgetaBuild,
});
