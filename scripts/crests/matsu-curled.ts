import { mitsuMatsubaBuild } from "./drawn/matsu-curled.ts";
import { mitsuMatsubaMatsukasaBuild } from "./drawn/matsu-cone-scroll.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuMatsuba = defineCrest({
  id: "mitsu-matsuba",
  name: { en: "Three curved pine needles", ja: "三つ松葉" },
  reading: "みつまつば",
  romaji: "mitsu matsuba",
  frame: "none",
  motifs: [{ motif: "pine", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッまつば"],
  construction: { en: "Three long curved needles with flared ends turn about the same centre.", ja: "付け根が広がった、長く曲がる松葉を三本、同じ中心のまわりに回します。" },
  measured: "Each hooked foot joins one outer sweep and one inner sweep. The three sweeps leave the central field clear.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, first row, second column from the right: 三ッまつば", ja: "右頁、一段目、右から二列目「三ッまつば」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuMatsubaBuild(c);
  },
});

export const mitsuMatsubaMatsukasa = defineCrest({
  id: "mitsu-matsuba-matsukasa",
  name: { en: "Three pine needles and cones", ja: "三つ松葉松笠" },
  reading: "みつまつばまつかさ",
  romaji: "mitsu matsuba matsukasa",
  frame: "none",
  motifs: [{ motif: "pine", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ松葉まつかさ"],
  construction: { en: "Three scaled pine cones share a small joint. Pairs of curved needles turn around them and meet the circular boundary.", ja: "うろこのある松笠三つを小さな節でつなぎます。曲がった松葉を二本ずつまわりに回し、円周につなぎます。" },
  measured: "The book cell gives the cone widths, paired needle sweeps and continuous round silhouette. The three cone-and-needle units repeat at equal angles.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, fourth row, first column from the right: 三ッ松葉まつかさ", ja: "右頁、四段目、右から一列目「三ッ松葉まつかさ」" }, read: "2026-11-27", measured: true },
  build: mitsuMatsubaMatsukasaBuild,
});
