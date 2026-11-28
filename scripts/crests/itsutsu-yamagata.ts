import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuYamagataBuild } from "./drawn/itsutsu-yamagata.ts";
import { defineCrest } from "./util.ts";

export const itsutsuYamagata = defineCrest({
  id: "itsutsu-yamagata",
  name: { en: "Five mountain forms", ja: "五つ山形" },
  reading: "いつつやまがた",
  romaji: "itsutsu yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッ山がた"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 3, third column from the right: 五ッ山がた (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から三列目「五ッ山がた」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Five equal chevron bands stand on the five points of a regular pentagon, and a narrow white gap cuts each side in the middle. In the printed cell the outer points are about 449 pixels from the centre and the inner points about 357, so each band is about a sixth of that across, and the gaps are about 33 wide. The printed pentagon is slightly uneven at its lower right, and the drawing makes it regular.",
  construction: {
    en: "Rule two regular pentagons about the centre, the outer one's points on the layout circle, so that the band between them has one width. Cut each side across at its middle with a narrow white gap, leaving five chevrons, one on each point.",
    ja: "中心のまわりに正五角形を二つ引きます。外側の頂点は外の円の上に置き、二つの間の帯の幅をそろえます。各辺の真ん中を細い白いすき間で切り、頂点ごとに山形を一つずつ残します。",
  },
  build: itsutsuYamagataBuild,
});
