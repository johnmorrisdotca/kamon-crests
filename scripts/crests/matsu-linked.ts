import { rokkakuMatsubaBuild } from "./drawn/matsu-linked.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const rokkakuMatsuba = defineCrest({
  id: "rokkaku-matsuba",
  name: { en: "Hexagonal pine needles", ja: "六角松葉" },
  reading: "ろっかくまつば",
  romaji: "rokkaku matsuba",
  frame: "none",
  motifs: [{ motif: "pine", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["六角まつば"],
  construction: { en: "Six shallow inward arcs make a thin six-sided outline. A flared pine-needle foot stands at every other corner.", ja: "浅く内側へ曲がる六本の弧で細い六角形を作り、一つおきの角に松葉の広がった付け根を置きます。" },
  measured: "The six concave sides enclose a mostly empty centre. Three alternating points have flared ends.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, third row, third column from the right: 六角まつば", ja: "右頁、三段目、右から三列目「六角まつば」" }, read: "2026-11-26", measured: true },
  build(c) {
    rokkakuMatsubaBuild(c);
  },
});
