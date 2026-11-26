import { mitsuwariAsaNoHaBuild } from "./drawn/asa-tail.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuwariAsaNoHa = defineCrest({
  id: "mitsuwari-asa-no-ha",
  name: { en: "Three-part hemp leaf", ja: "三つ割り麻の葉" },
  reading: "みつわりあさのは",
  romaji: "mitsu wari asa no ha",
  frame: "none",
  motifs: [{ motif: "hemp-leaf", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッわりあさの葉"],
  construction: { en: "Three groups of pointed leaves surround a triangular opening.", ja: "先のとがった葉の三つの組で、三角の空きを囲みます。" },
  measured: "The three groups turn in equal sectors; each group has one upright point and two flanking points.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "right page, fourth row, first column from the right: 三ッわりあさの葉", ja: "右頁、四段目、右から一列目「三ッわりあさの葉」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuwariAsaNoHaBuild(c);
  },
});
