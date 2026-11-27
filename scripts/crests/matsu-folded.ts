import { oriMatsubaBishiBuild, matsubaBishiBuild } from "./drawn/matsu-folded.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const oriMatsubaBishi = defineCrest({
  id: "ori-matsuba-bishi",
  name: { en: "Folded pine-needle lozenge", ja: "折り松葉菱" },
  reading: "おりまつばびし",
  romaji: "ori matsuba bishi",
  frame: "none",
  motifs: [{ motif: "pine", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["をり松葉びし"],
  construction: { en: "Two opposite pine-needle ends meet along the centre of a long ruled lozenge. A narrow division follows the horizontal axis.", ja: "向かい合う二本の松葉の先を、定規で引いた横長の菱形のまん中で合わせます。横の軸に細い空きを残します。" },
  measured: "The diamond is straight-sided, with a long doubled centre rule and a hooked pine-needle foot at each end.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, first row, third column from the right: をり松葉びし", ja: "右頁、一段目、右から三列目「をり松葉びし」" }, read: "2026-11-26", measured: true },
  build(c) {
    oriMatsubaBishiBuild(c);
  },
});

export const matsubaBishi = defineCrest({
  id: "matsuba-bishi",
  name: { en: "Pine-needle lozenge", ja: "松葉菱" },
  reading: "まつばびし",
  romaji: "matsuba bishi",
  frame: "none",
  motifs: [{ motif: "pine", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["松葉ひし"],
  construction: { en: "Two opposed needle pairs cross above and below the middle of a broad leaf-shaped lozenge.", ja: "向かい合う二対の松葉を、横に広い菱形の上下で交差させます。" },
  measured: "Curved edges and two pairs of crossing tips separate this design from the folded ruled lozenge on the same page.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, third row, fourth column from the right: 松葉ひし", ja: "右頁、三段目、右から四列目「松葉ひし」" }, read: "2026-11-26", measured: true },
  build(c) {
    matsubaBishiBuild(c);
  },
});
