import { dakiawaseOmodakaBuild, nagatoOmodakaBuild } from "./drawn/omodaka.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const dakiawaseOmodaka = defineCrest({
  id: "dakiawase-omodaka",
  name: { en: "Pair of embracing arrowheads", ja: "抱き合わせ沢瀉" },
  reading: "だきあわせおもだか",
  romaji: "dakiawase omodaka",
  frame: "none",
  motifs: [{ motif: "sword-leaf", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["抱合せおもだか"],
  construction: { en: "Two curved arrowhead leaves cup one flowering spray. Their stalks cross below.", ja: "曲がった二枚の沢瀉で花の枝を抱き、下で茎を交差させます。" },
  measured: "The arch and two side notches follow the mirror axis of the upright flowering spray.",
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, second row, fourth column from the right: 抱合せおもだか", ja: "右頁、二段目、右から四列目「抱合せおもだか」" }, read: "2026-11-26", measured: true },
  build(c) {
    dakiawaseOmodakaBuild(c);
  },
});

export const nagatoOmodaka = defineCrest({
  id: "nagato-omodaka",
  name: { en: "Nagato arrowhead", ja: "長門沢瀉" },
  reading: "ながとおもだか",
  romaji: "nagato omodaka",
  frame: "none",
  motifs: [{ motif: "sword-leaf", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["長門澤瀉"],
  construction: { en: "A straight central spray rises between two open folded lobes.", ja: "まっすぐな花の茎を、折り返した二枚の沢瀉の間に立てます。" },
  measured: "The long leaf openings mirror each other and close near the foot of the central stalk.",
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, third row, second column from the right: 長門澤瀉", ja: "右頁、三段目、右から二列目「長門澤瀉」" }, read: "2026-11-26", measured: true },
  build(c) {
    nagatoOmodakaBuild(c);
  },
});
