import { maruNiMitsuHaneBuild, mitsuHaneBuild, mitsuwariHaneBuild } from "./drawn/hane.ts";
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

export const maruNiMitsuHane = defineCrest({
  id: "maru-ni-mitsu-hane",
  name: { en: "Shuttlecock from above in a circle", ja: "丸に三つ羽根" },
  reading: "まるにみつばね",
  romaji: "maru ni mitsu bane",
  frame: "ring-medium",
  motifs: [{ motif: "shuttlecock", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸に三ッ羽根"],
  construction: {
    en: "A shuttlecock seen from above in a ring: a round bead, three spokes out to a thin inner ring, and from the end of each spoke a curved vane sweeping round towards the middle.",
    ja: "上から見た羽根を輪に収めます。丸い玉から三本の軸が内側の細い輪へ伸び、それぞれの軸の先から曲がった羽が中心へ向かって回り込みます。",
  },
  measured: "The book's crest, in its pixels from the bead's centre: the ring from 128 to 150, drawn at that width (0.15 of its radius), and a thin ring inside it at 121; the bead 16 in radius; the spokes 7.5 wide, the first 7.3 degrees clockwise of upright; each vane's outer edge an arc from the spoke's end through (-37.5, 87.5) to its tip at (-67.5, 0), its inner edge back through (-22.5, 57.5). The book's spokes are a little irregular; here they are a third of a turn apart. The book also draws three straight-ish lines of the skirt between the vanes' roots, left out here.",
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "right page, second row, first column from the right: 丸に三ッ羽根", ja: "右頁、二段目、右から一列目「丸に三ッ羽根」" }, read: "2026-11-28", measured: true },
  build: maruNiMitsuHaneBuild,
});
