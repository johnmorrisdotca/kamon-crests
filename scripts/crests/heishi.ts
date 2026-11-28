import { SHINSEN_MONCHO } from "./books.ts";
import { futatsuHeishiBuild, maruNiHeishiBuild, sumikiriKakuNiFutatsuHeishiBuild } from "./drawn/heishi.ts";
import { defineCrest } from "./util.ts";

export const futatsuHeishi = defineCrest({
  id: "futatsu-heishi",
  name: { en: "Two sake flasks", ja: "二つ瓶子" },
  reading: "ふたつへいし",
  romaji: "futatsu heishi",
  frame: "none",
  motifs: [{ motif: "sake-flask", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["二ッ瓶子"],
  construction: {
    en: "Two covered offering flasks stand side by side. Their round shoulders narrow to flat bases and the tied cords hang down at both sides.",
    ja: "布をかぶせた瓶子を二つ並べます。丸い肩から平らな底へ向かって細くし、結んだ紐を両脇に垂らします。",
  },
  measured: "The printed pair has nearly level rims and bases. The cord ornaments are close together at the middle. The slight differences between the flasks have been balanced.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, third row, third column from the right: 二ッ瓶子", ja: "左頁、三段目、右から三列目「二ッ瓶子」" }, read: "2026-11-26", measured: true },
  build: futatsuHeishiBuild,
});

export const sumikiriKakuNiFutatsuHeishi = defineCrest({
  id: "sumikiri-kaku-ni-futatsu-heishi",
  name: { en: "Two sake flasks in a cut-corner square", ja: "隅切り角に二つ瓶子" },
  reading: "すみきりかくにふたつへいし",
  romaji: "sumikiri kaku ni futatsu heishi",
  frame: "none",
  motifs: [{ motif: "sake-flask", count: 2, arrangement: "rows" }, { motif: "cut-corner-square", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["すみ切角ニ二ッへいし"],
  construction: { en: "A pair of upright tied flasks stands inside an eight-sided frame with cut corners.", ja: "結び紐を垂らした瓶子を二つ立て、四隅を切った八辺の枠で囲みます。" },
  measured: "The original frame’s inner width is slightly more than seven tenths of its outer width.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, second row, third column from the right: すみ切角ニ二ッへいし", ja: "左頁、二段目、右から三列目「すみ切角ニ二ッへいし」" }, read: "2026-11-26", measured: true },
  build(c) {
    sumikiriKakuNiFutatsuHeishiBuild(c);
  },
});

export const maruNiHeishi = defineCrest({
  id: "maru-ni-heishi",
  name: { en: "Sake flask in a circle", ja: "丸に瓶子" },
  reading: "まるにへいし",
  romaji: "maru ni heishi",
  frame: "ring-medium",
  motifs: [{ motif: "sake-flask", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸に瓶子"],
  construction: {
    en: "One sake flask, its cap of folded silk tied with a cord that hangs to a tassel on either side, stands in a ring.",
    ja: "絹の口覆いを紐で結び、両側に房を垂らした瓶子を一つ、輪の中に立てます。",
  },
  measured: "The book's crest, in its pixels from the ring's centre: the ring from 125 to 147.5, drawn at that width (0.15 of its radius); the flask 11.5 left of the centre, its pouch 85 across the foot 117.5 down, 112 across at 27.5 down and 80 under the tie 40 up; the tie 12 deep; the cap in three lobes up to about 120 and 85 to either side (the book's left lobe reaches the ring; ours stops short of it), a curl in each side lobe; the cords hanging outside the pouch to tassels 80 out. This flask is broader than the two flasks' flask, as printed, so it is drawn on its own.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, first row, third column from the right: 丸に瓶子", ja: "左頁、一段目、右から三列目「丸に瓶子」" }, read: "2026-11-28", measured: true },
  build: maruNiHeishiBuild,
});
