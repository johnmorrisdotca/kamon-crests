import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kikko-shell-panels.ts";
import { defineCrest } from "./util.ts";

export const mitsuwariKumiawaseKikko = defineCrest({
  id: "mitsuwari-kumiawase-kikko",
  name: { en: "Three-way split joined tortoise shells", ja: "三つ割り組合せ亀甲" },
  reading: "みつわりくみあわせきっこう",
  romaji: "mitsuwari kumiawase kikkō",
  frame: "none",
  motifs: [{ motif: "tortoise-shell", count: 3, arrangement: "radial" }, { motif: "flower-lozenge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリ組合亀甲"],
  construction: {
    en: "Three part-shells meet around a broad Y-shaped opening. Their angled bands and the small flower at each outer end are clipped by the same circle.",
    ja: "三方に分かれる広い空きのまわりに、亀甲の一部を三つ置きます。折れ曲がる帯と外側の花菱は、同じ円に沿って切り取ります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 40, place: { en: "left page, third row, third column from the right: 三ッワリ組合亀甲", ja: "左頁、三段目、右から三列目「三ッワリ組合亀甲」" }, read: "2026-11-27", measured: true },
  measured: "The page gives a circular crop with three part shells on 120-degree spokes. Their innermost angles stand roughly one quarter of the field radius from the centre.",
  build: drawn.mitsuwariKumiawaseKikkoBuild,
});
