import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuUchiwaBuild } from "./drawn/uchiwa.ts";
import { defineCrest } from "./util.ts";

export const mitsuUchiwa = defineCrest({
  id: "mitsu-uchiwa",
  name: { en: "Three round fans", ja: "三つ団扇" },
  reading: "みつうちわ",
  romaji: "mitsu uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッうちは"],
  construction: {
    en: "Three round paper faces stand 120 degrees apart. The ribs appear near the centre, below a curved binding. Three ruled handles cross in the middle and project between the paper faces.",
    ja: "丸い地紙を三枚、120度ずつ並べます。中心に近い地紙には、束ねる円弧の下に骨を入れます。まっすぐな柄は中央で交差し、地紙の間から突き出ます。",
  },
  measured: "The paper circles are about 130 units wide in the crop. The lower pair stand about 99 from the common crossing, the upper one about 82. This is drawn with a radius of 42 and centres 53 from the crossing, on equal 120 degree divisions. The binding arc about the pivot is 41, the handle is 10 wide and reaches 93 from the crossing.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, first row, third column from the right: 三ッうちは", ja: "右頁、一段目、右から三列目「三ッうちは」" }, read: "2026-11-26", measured: true },
  build: mitsuUchiwaBuild,
});
