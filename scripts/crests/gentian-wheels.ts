import { SHINSEN_MONCHO } from "./books.ts";
import { asagaoRindoBuild } from "./drawn/gentian-wheels.ts";
import { defineCrest } from "./util.ts";

export const asagaoRindo = defineCrest({
  id: "asagao-rindo",
  name: { en: "Morning-glory gentian", ja: "朝顔竜胆" },
  reading: "あさがおりんどう",
  romaji: "asagao rindō",
  frame: "none",
  motifs: [{ motif: "gentian", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["あさがほりんだう"],
  construction: {
    en: "Eight faceted petals surround a round heart. The white cuts are ruled, with narrow necks that spread towards the rim. Eight angular points stand outside the broad band.",
    ja: "角のある花びら八枚で丸い中心を囲みます。白いすき間を定規で引き、細い根元から外側へ広げます。太い輪の外には角のある先を八つ置きます。",
  },
  measured: "The crest is about 307 pixels wide over the external points. The rim is about 253 pixels across, its centre opening about 207 and the heart about 40. The drawing uses a 192-wide layout with rim 156, field 128.4 and heart 23.6. Eight equal angular units replace the source's slight differences in length and alignment.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, fourth row, fourth column from the right: あさがほりんだう", ja: "右頁、四段目、右から四列目「あさがほりんだう」" }, read: "2026-11-26", measured: true },
  build: asagaoRindoBuild,
});
