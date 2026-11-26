import { itsutsuHyotanBuild } from "./drawn/hyotan.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const itsutsuHyotan = defineCrest({
  id: "itsutsu-hyotan",
  name: { en: "Five gourds", ja: "五つ瓢箪" },
  reading: "いつつひょうたん",
  romaji: "itsutsu hyōtan",
  frame: "none",
  motifs: [{ motif: "bottle-gourd", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッ瓢箪"],
  construction: { en: "Five rounded gourds point their narrow stems toward the open middle.", ja: "丸い瓢箪を五つ並べ、細い茎を中央の空きへ向けます。" },
  measured: "Five axes are spaced one fifth of a circle apart, with the large bulbs toward the rim.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, first row, third column from the right: 五ッ瓢箪", ja: "右頁、一段目、右から三列目「五ッ瓢箪」" }, read: "2026-11-26", measured: true },
  build(c) {
    itsutsuHyotanBuild(c);
  },
});
