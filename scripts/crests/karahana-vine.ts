// The vine arabesque flower, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { tsuruKarahanaBuild } from "./drawn/karahana-vine.ts";
import { defineCrest } from "./util.ts";

export const tsuruKarahana = defineCrest({
  id: "tsuru-karahana",
  name: { en: "Vine arabesque flower", ja: "蔓唐花" },
  reading: "つるからはな",
  romaji: "tsuru karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["つる唐花", "vine karahana"],
  construction: {
    en: "The five-petalled arabesque flower stands with its first petal upright. A vine runs out from the heart along each gap between two petals and parts beyond them into two arms that roll back to round ends. A narrow paper line keeps each vine clear of the petals it crosses.",
    ja: "五枚の花びらの唐花を、一枚目を真上に向けて置きます。花びらと花びらの間ごとに、中心から蔓を一本伸ばし、花びらの外で二本に分けて、丸い先まで巻き戻します。蔓が花びらに重なるところには、細い白い線を残します。",
  },
  measured: "Frame 18, with the vines' reach as 100: the petals reach about 94, the heart is about 10 in radius and the stamens reach about 38. Each vine is about 6 wide, stands 36 degrees off the petal beside it, and parts about 80 out. Its two rolled arms spread about 20 either side.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, fourth row, first column from the right: つる唐花", ja: "左頁、四段目、右から一列目「つる唐花」" }, read: "2026-11-28", measured: true },
  build: tsuruKarahanaBuild,
});
