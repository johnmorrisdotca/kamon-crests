import { hosowaNiAsaNoHaBuild } from "./drawn/asa-arrangements.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const hosowaNiAsaNoHa = defineCrest({
  id: "hosowa-ni-asa-no-ha",
  name: { en: "Hemp foliage in a fine ring", ja: "細輪に麻の葉" },
  reading: "ほそわにあさのは",
  romaji: "hosowa ni asa no ha",
  frame: "ring-thin",
  motifs: [{ motif: "hemp-foliage", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["細ワニあさの葉"],
  construction: { en: "A fine ring encloses a broad sawtoothed hemp leaf with white veins.", ja: "細輪の中に細かいとがりと白い筋のある幅広の麻の葉を置きます。" },
  measured: "The teeth are ruled and the veins curve from a high central joint.",
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "right page, second row, second column from the right: 細ワニあさの葉", ja: "右頁、二段目、右から二列目「細ワニあさの葉」" }, read: "2026-11-26", measured: true },
  build(c) {
    hosowaNiAsaNoHaBuild(c, c.ring("ring-thin"));
  },
});
