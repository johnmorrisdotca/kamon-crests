import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuYumiBuild } from "./drawn/yumi.ts";
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
