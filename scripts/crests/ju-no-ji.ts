import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiJuNoJiBuild } from "./drawn/ju-no-ji.ts";
import { defineCrest } from "./util.ts";

export const maruNiJuNoJi = defineCrest({
  id: "maru-ni-ju-no-ji",
  name: { en: "Character ten in a circle", ja: "丸に十の字" },
  reading: "まるにじゅうのじ",
  romaji: "maru ni jū no ji",
  frame: "ring-thin",
  motifs: [{ motif: "ju-no-ji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ十の字"],
  construction: {
    en: "Two joined brush strokes form the character 十 inside a thin ring. The upright stroke starts in a flared point and ends in a round foot. The sloping sides are ruled, and compass arcs round the ends of the crossbar and the four corners where the strokes meet.",
    ja: "細い輪の中に二つの筆画をつないで「十」の字を作ります。縦画はふくらんだとがりから始まり、丸い足で終わります。斜めの縁は定規で引き、横画の両端と二画が交わる四つの角はコンパスの弧で丸く収めます。",
  },
  measured: "The cell's outer circle is about 306 pixels across, its band about 19 pixels thick. The character is about 247 pixels wide and 264 high, and its crossing is about 24 pixels above the centre of the ring. The straight sides take the visible slopes of the cell, including the foot leaning to the right and the upper point a little left of centre. Compass radii of 5 to 16 and straight joins regularise the drawn ends. The drawing uses the package’s thin ring and enlarges the character by 6% from the medium-ring layout to approach the tip and foot in the cell.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 42,
    place: { en: "left page, first row, third column from the right: 丸ニ十の字", ja: "左頁、一段目、右から三列目「丸ニ十の字」" },
    read: "2026-11-26",
    measured: true,
  },
  build: maruNiJuNoJiBuild,
});
