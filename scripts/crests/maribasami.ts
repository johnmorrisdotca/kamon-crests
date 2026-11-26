import { SHINSEN_MONCHO } from "./books.ts";
import { maribasamiNiMariBuild, maruNiMaribasamiBuild } from "./drawn/maribasami.ts";
import { defineCrest } from "./util.ts";

export const maribasamiNiMari = defineCrest({
  id: "maribasami-ni-mari",
  name: { en: "Ball in a six-point holder", ja: "鞠挟みに鞠" },
  reading: "まりばさみにまり",
  romaji: "maribasami ni mari",
  frame: "none",
  motifs: [{ motif: "ball-holder", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["まり挟ニまり"],
  construction: {
    en: "Six concave arcs meet at points around a ball. A curved seam crosses the ball above its middle.",
    ja: "六本の内側にくぼむ弧を角でつなぎ、その中央に鞠を置きます。鞠の中央より上に弧を描く縫い目を渡します。",
  },
  measured: "The ball spans just over half the breadth of the holder. Its seam runs between the sides in a shallow arc. The six outer points are balanced about the circle.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, second row, third column from the right: まり挟ニまり", ja: "右頁、二段目、右から三列目「まり挟ニまり」" }, read: "2026-11-26", measured: true },
  build: maribasamiNiMariBuild,
});

export const maruNiMaribasami = defineCrest({
  id: "maru-ni-maribasami",
  name: { en: "Ball holder in a circle", ja: "丸に鞠挟み" },
  reading: "まるにまりばさみ",
  romaji: "maru ni maribasami",
  frame: "ring-medium",
  motifs: [{ motif: "ball-holder", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸にまりばさみ"],
  construction: {
    en: "Six points of a curved holder reach toward a circle. A round opening sits at the centre.",
    ja: "弧を描く鞠挟みの六つの角を輪に向けます。中央には丸い穴を残します。",
  },
  measured: "The empty centre is about half as wide as the inside of the ring. The six points fill the ring and the arcs cut inward between them.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, third row, third column from the right: 丸にまりばさみ", ja: "右頁、三段目、右から三列目「丸にまりばさみ」" }, read: "2026-11-26", measured: true },
  build: maruNiMaribasamiBuild,
});
