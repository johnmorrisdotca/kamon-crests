import { mitsuwariKuchinashiBuild, maruNiMitsuKuchinashiBuild } from "./drawn/kuchinashi.ts";
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

export const maruNiMitsuKuchinashi = defineCrest({
  id: "maru-ni-mitsu-kuchinashi",
  name: { en: "Three gardenias in a circle", ja: "丸に三つ梔子" },
  reading: "まるにみつくちなし",
  romaji: "maru ni mitsu kuchinashi",
  frame: "ring-medium",
  motifs: [{ motif: "gardenia", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸に三ッくちなし"],
  construction: { en: "Three cups alternate with three flared points inside a ring.", ja: "輪の中で、三つの杯を三つの広がった先と交互に並べます。" },
  measured: "The six parts alternate around a common small centre, inside the printed ring.",
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "left page, first row, fourth column from the right: 丸に三ッくちなし", ja: "左頁、一段目、右から四列目「丸に三ッくちなし」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiMitsuKuchinashiBuild(c, c.ring("ring-medium"));
  },
});
