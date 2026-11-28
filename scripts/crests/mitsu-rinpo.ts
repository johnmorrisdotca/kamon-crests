import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuRinpoBuild } from "./drawn/mitsu-rinpo.ts";
import { defineCrest } from "./util.ts";

export const mitsuRinpo = defineCrest({
  id: "mitsu-rinpo",
  name: { en: "Dharma wheel with six knobs", ja: "三つ輪宝" },
  reading: "みつりんぽう",
  romaji: "mitsu rinpo",
  frame: "none",
  motifs: [{ motif: "dharma-wheel", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["三ッ輪宝", "三ッりんぼう"],
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, row 3, first column from the right: 三ッりんぼう (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から一列目「三ッりんぼう」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A wheel of six spokes in a ring, each spoke a narrow stem that flares into two curved cheeks under the ring, with a round hub, and outside the ring six large pointed knobs, one between each pair of spokes. In the printed cell the hub is about 60 across the radius, the ring's inner and outer edges about 336 and 392 out, the flares start about 215 out and are about 240 across at the ring, and the knobs reach about 467. The printed spokes and knobs differ by a tenth, and the drawing makes them equal.",
  construction: {
    en: "Strike the hub of 12.3 and the ring between 69 and 80.5 about the centre, and divide them into six. On each of six radii rule a narrow stem to 44 out and strike its two curved cheeks up to the ring, 24 either side. Between each pair of spokes rule one large pointed knob standing on the ring and reaching the layout circle.",
    ja: "中心に半径12.3の軸と、半径69から80.5までの輪を描き、六等分します。六本の半径の上に、44のところまで細い輻を直線で引き、そこから輪まで、左右24の幅に広がる二つの弧の肩を打ちます。輻と輻の間ごとに、輪の上に立つ大きなとがりを一つ引き、外の円まで届かせます。",
  },
  build: mitsuRinpoBuild,
});
