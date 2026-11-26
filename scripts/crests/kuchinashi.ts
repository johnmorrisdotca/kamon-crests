import { mitsuwariKuchinashiBuild } from "./drawn/kuchinashi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuwariKuchinashi = defineCrest({
  id: "mitsuwari-kuchinashi",
  name: { en: "Three-part gardenia", ja: "三つ割り梔子" },
  reading: "みつわりくちなし",
  romaji: "mitsu wari kuchinashi",
  frame: "none",
  motifs: [{ motif: "gardenia", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ割くちなし"],
  construction: { en: "Three curved diamonds divide the roundel and three small cuts open at its rim.", ja: "丸の中を三つの曲がった菱で分け、縁の三か所を白く抜きます。" },
  measured: "The outer cuts and the inner diamonds use alternating spoke directions.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "left page, second row, fourth column from the right: 三ッ割くちなし", ja: "左頁、二段目、右から四列目「三ッ割くちなし」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuwariKuchinashiBuild(c);
  },
});
