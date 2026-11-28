import { mitsuHaneBuild, mitsuwariHaneBuild } from "./drawn/hane.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuwariHane = defineCrest({
  id: "mitsuwari-hane",
  name: { en: "Three divided shuttlecock vanes", ja: "三つ割り羽根" },
  reading: "みつわりはね",
  romaji: "mitsuwari hane",
  frame: "none",
  motifs: [{ motif: "shuttlecock", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリ羽根"],
  construction: { en: "Three folded vanes turn around the centre, each connected to a small weight in the rim.", ja: "折れ目のある羽根を三枚、中心のまわりに回し、それぞれを縁の小さな重りに弧でつなぎます。" },
  measured: "The three weights interrupt the rim, and the matching curved links meet the outer end of the next vane.",
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "right page, third row, first column from the right: 三ッワリ羽根", ja: "右頁、三段目、右から一列目「三ッワリ羽根」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuwariHaneBuild(c);
  },
});

export const mitsuHane = defineCrest({
  id: "mitsu-hane",
  name: { en: "Shuttlecock with three vanes", ja: "三つ羽根" },
  reading: "みつばね",
  romaji: "mitsu bane",
  frame: "none",
  motifs: [{ motif: "shuttlecock", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["三ッ羽根"],
  construction: {
    en: "A shuttlecock seen from the side: three curved vanes spring from the top of its stem, one arching over to both sides and two drooping, and a round bead weights its foot.",
    ja: "横から見た羽根です。柄の上から三枚の曲がった羽が出て、一枚は左右に弓なりに、二枚は垂れ下がります。柄の下には丸い玉がつきます。",
  },
  measured: "The book's shuttlecock, in its pixels from the top of the stem: the upper vane from 135 left and 62.5 up to 147.5 right and 5 down, between arcs through (6, 54) and (-2.5, 2.5), tilted as printed; the lower vanes from the stem to tips 117.5 to either side and 147.5 down, their edges arcs through (70, -22) and (62, -84); the stem 12.5 wide; the bead a disc of 23, its centre 172.5 down.",
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "right page, first row, first column from the right: 三ッ羽根", ja: "右頁、一段目、右から一列目「三ッ羽根」" }, read: "2026-11-28", measured: true },
  build: mitsuHaneBuild,
});
