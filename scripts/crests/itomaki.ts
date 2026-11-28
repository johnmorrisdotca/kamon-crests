import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuIrekoItomakiBuild } from "./drawn/itomaki.ts";
import { maruNiMitsuYoseItoBuild } from "./drawn/yose-ito.ts";
import { defineCrest } from "./util.ts";

export const mitsuIrekoItomaki = defineCrest({
  id: "mitsu-ireko-itomaki",
  name: { en: "Three nested thread spools", ja: "三つ入れ子糸巻" },
  reading: "みついれこいとまき",
  romaji: "mitsu ireko itomaki",
  frame: "none",
  motifs: [{ motif: "thread-spool", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三ッ入子いとまき", "三つ入子糸巻"],
  construction: {
    en: "Concave-sided spool outlines nest about one centre. Their inward-bowing sides sit between four outward points.",
    ja: "辺のくぼんだ糸巻の輪郭を、中心をそろえて入れ子にします。内側へ曲がる辺の間に四つの角が出ます。",
  },
  measured: "Four profiles of about 157, 114, 74 and 35 in reach can be seen in the cell. The layout uses 96, 71, 47 and 23, and follows the same concave shape at each size.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, second row, second column from the right: 三ッ入子いとまき", ja: "左頁、二段目、右から二列目「三ッ入子いとまき」" }, read: "2026-11-26", measured: true },
  build: mitsuIrekoItomakiBuild,
});

export const maruNiMitsuYoseIto = defineCrest({
  id: "maru-ni-mitsu-yose-ito",
  name: { en: "Three gathered skeins in a circle", ja: "丸に三つ寄せ糸" },
  reading: "まるにみつよせいと",
  romaji: "maru ni mitsu yose ito",
  frame: "ring-medium",
  motifs: [{ motif: "thread-spool", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸ニ三ッよせいと"],
  construction: {
    en: "Three straight-sided skeins of thread point in from a ring to a round knot, a third of a turn apart. The knot's three tabs stand out between them.",
    ja: "まっすぐな辺の糸の束を三つ、三分の一回転ずつ、輪から丸い結び目へ向けて置きます。結び目の三つのつまみは束の間に出ます。",
  },
  measured: "The book's crest, in its pixels from the ring's centre: the ring from 125.5 to 149.5, drawn at that width (0.16 of its radius); each skein's outer corners 121 out and 20 degrees either side of its middle, its inner corners 50 out and 40 degrees either side (the book's lower two lean a little); the knot a disc of 20, its tabs 15 wide and reaching 52 out. The book's knot also shows two small loops of cord beside the lower tab, left out here.",
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "left page, first row, third column from the right: 丸ニ三ッよせいと", ja: "左頁、一段目、右から三列目「丸ニ三ッよせいと」" }, read: "2026-11-28", measured: true },
  build: maruNiMitsuYoseItoBuild,
});
