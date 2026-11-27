import { mitsuwariHaneBuild } from "./drawn/hane.ts";
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
