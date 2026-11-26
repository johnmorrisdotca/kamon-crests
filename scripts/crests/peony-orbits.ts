import { SHINSEN_MONCHO } from "./books.ts";
import { nejiBotanBuild } from "./drawn/peony-orbits.ts";
import { defineCrest } from "./util.ts";

export const nejiBotan = defineCrest({
  id: "neji-botan",
  name: { en: "Twisted peony", ja: "捻じ牡丹" },
  reading: "ねじぼたん",
  romaji: "neji botan",
  frame: "none",
  motifs: [{ motif: "peony", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["捻ぢぼたん"],
  construction: {
    en: "Five curved petals turn in the same direction around a round heart. A fan of curved white lines marks each petal, and the curved seams run from the heart to the outline.",
    ja: "丸い花芯のまわりで、弧を描く五枚の花弁を同じ方向に回します。各花弁には白い弧を扇状に入れ、花芯から外縁まで弧の切れ目を通します。",
  },
  measured: "The printed flower spans about 300 pixels, with a small round heart and five fans of curving veins. The drawing preserves the direction of the turning sectors. Their white seams run more strongly to the outside, and the outline uses simpler lobes.",
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, second row, fourth column from the right: 捻ぢぼたん", ja: "右頁、二段目、右から四列目「捻ぢぼたん」" }, read: "2026-11-26", measured: true },
  build: nejiBotanBuild,
});
