import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kanawa-five.ts";
import { defineCrest } from "./util.ts";

export const itsutsuKanawa = defineCrest({
  id: "itsutsu-kanawa",
  name: { en: "Five linked rings in a ring", ja: "五つ金輪" },
  reading: "いつつかなわ",
  romaji: "itsutsu kanawa",
  frame: "none",
  motifs: [{ motif: "linked-rings", count: 5, arrangement: "ring" }],
  families: [],
  aliases: ["五ッかなわ", "五つ金輪"],
  construction: {
    en: "Five equal thin rings stand round the middle at the corners of a pentagon, the first at the top, each overlapping the next on both sides. Their centres are 0.56 of the layout radius from the middle and each ring's outer edge is 0.43 of it from its centre, so the rings' farthest points stand on the outer circle. Each ring passes over the next one clockwise at the crossing farther from the middle, and under it at the nearer, with a narrow white gap on both sides of the upper band.",
    ja: "同じ大きさの細い輪を五つ、五角形の角の位置に、一つを真上にして中心のまわりに並べます。となり合う輪は二か所で交わります。中心は全体の中心から外円の半径の0.56のところにあり、輪の外側の半径は外円の半径の0.43です。輪はそれぞれ、時計まわりのとなりの輪の上を、中心から遠い交わりで通り、近い交わりでは下を通ります。上を通る帯の両側に細い白いすき間を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, third row, second column counted from the right: 五ッかなわ (five linked rings in a pentagon; measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から二列目「五ッかなわ」（五角形に並んだ五つの連なる輪。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell each ring is about 136 pixels across its outer edge, with a band about 9 thick, and the five centres lie about 88 from the middle, at the corners of a pentagon (the five measure 85 to 90, the printed pentagon is a little lopsided). Neighbouring rings cross twice. The printed over-and-under is read as one rule all round: each ring over the next clockwise at the outer crossing.",
  build: drawn.itsutsuKanawaBuild,
});
