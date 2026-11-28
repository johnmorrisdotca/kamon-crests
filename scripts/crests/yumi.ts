import { SHINSEN_MONCHO } from "./books.ts";
import { chigaiYumiBuild, itsutsuYumiBuild } from "./drawn/yumi.ts";
import { defineCrest } from "./util.ts";

export const itsutsuYumi = defineCrest({
  id: "itsutsu-yumi",
  name: { en: "Five bows", ja: "五つ弓" },
  reading: "いつつゆみ",
  romaji: "itsutsu yumi",
  frame: "none",
  motifs: [{ motif: "bow", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッゆみ"],
  construction: {
    en: "Five small bow silhouettes meet at one point. Each curves to the same side of its straight edge.",
    ja: "小さな弓を五つ、中央の一点で合わせます。弓の曲がりをそれぞれ同じ向きにそろえます。",
  },
  measured: "The print sets one bow upright and four around it. Their straight edges radiate from a shared centre, with two white marks along the darker side.",
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, second row, first column from the right: 五ッゆみ", ja: "右頁、二段目、右から一列目「五ッゆみ」" }, read: "2026-11-26", measured: true },
  build: itsutsuYumiBuild,
});

export const chigaiYumi = defineCrest({
  id: "chigai-yumi",
  name: { en: "Crossed bows", ja: "違い弓" },
  reading: "ちがいゆみ",
  romaji: "chigai yumi",
  frame: "none",
  motifs: [{ motif: "bow", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["ちがひ弓"],
  construction: {
    en: "Two strung bows cross, mirror images of each other, the one from the upper left in front. Each stave tapers to a point at both ends.",
    ja: "弦を張った弓を二張り、左右対称に交差させ、左上からの弓を手前にします。どちらの弓も両端がとがります。",
  },
  measured: "The book's bows, in its pixels from the middle of the crossing: the tips 128.75 to either side and 111.25 above, and 107.5 to either side and 111.25 below (the two bows agree to about 7); each stave between arcs 46 and 33 out from its string at the middle (the book's stave runs 40 to 50 out over most of its length and turns in sharply at the tips). The book's bindings, two groups of short lines near each end, are left out. Ours are mirror images.",
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, first row, first column from the right: ちがひ弓", ja: "右頁、一段目、右から一列目「ちがひ弓」" }, read: "2026-11-28", measured: true },
  build: chigaiYumiBuild,
});
