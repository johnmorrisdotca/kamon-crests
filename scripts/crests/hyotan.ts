import { itsutsuHyotanBuild, maruNiHyotanBuild, mitsuChigaiHyotanBuild } from "./drawn/hyotan.ts";
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
  construction: { en: "Five rounded gourds point their narrow stems toward the open middle.", ja: "丸い瓢箪を五つ並べ、細い茎を中央のあきへ向けます。" },
  measured: "Five axes are spaced one fifth of a circle apart, with the large bulbs toward the rim.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, first row, third column from the right: 五ッ瓢箪", ja: "右頁、一段目、右から三列目「五ッ瓢箪」" }, read: "2026-11-26", measured: true },
  build(c) {
    itsutsuHyotanBuild(c);
  },
});

export const maruNiHyotan = defineCrest({
  id: "maru-ni-hyotan",
  name: { en: "Gourd in a circle", ja: "丸に瓢箪" },
  reading: "まるにひょうたん",
  romaji: "maru ni hyōtan",
  frame: "ring-medium",
  motifs: [{ motif: "bottle-gourd", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸にひようたん"],
  construction: { en: "One upright bottle gourd sits nearly the full height inside the ring.", ja: "輪の内側のほぼいっぱいの高さに、瓢箪を一つ立てて収めます。" },
  measured: "The two unequal bulbs share the ring's central vertical axis.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, fourth row, third column from the right: 丸にひようたん", ja: "右頁、四段目、右から三列目「丸にひようたん」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiHyotanBuild(c, c.ring("ring-medium"));
  },
});

export const mitsuChigaiHyotan = defineCrest({
  id: "mitsu-chigai-hyotan",
  name: { en: "Three angled gourds", ja: "三つ違い瓢箪" },
  reading: "みつちがいひょうたん",
  romaji: "mitsu chigai hyōtan",
  frame: "none",
  motifs: [{ motif: "bottle-gourd", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッちがひひようたん"],
  construction: { en: "Three broad bottle gourds turn their narrow stems in toward the same point.", ja: "幅広の瓢箪を三つ並べ、細い茎を同じ中心へ向けます。" },
  measured: "Three axes from the open centre meet the wide ends of the bottles.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, second row, third column from the right: 三ッちがひひようたん", ja: "右頁、二段目、右から三列目「三ッちがひひようたん」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuChigaiHyotanBuild(c);
  },
});
