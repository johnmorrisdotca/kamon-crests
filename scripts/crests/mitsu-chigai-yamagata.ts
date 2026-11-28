import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuChigaiYamagataBuild } from "./drawn/mitsu-chigai-yamagata.ts";
import { defineCrest } from "./util.ts";

export const mitsuChigaiYamagata = defineCrest({
  id: "mitsu-chigai-yamagata",
  name: { en: "Three woven mountain forms", ja: "三つ違い山形" },
  reading: "みつちがいやまがた",
  romaji: "mitsu chigai yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三ッちがひ山がた"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 4, fourth column from the right: 三ッちがひ山がた (measured, and drawn with compass and ruler)", ja: "左頁、四段目、右から四列目「三ッちがひ山がた」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Three chevron bands with level feet stand in a row, each with a steeper left leg than right. The outer two reach the foot line side by side where the first's right foot meets the last's left foot. The middle band is taller by about a tenth and stands behind them, its left leg behind the first band's right leg and its right leg behind the last band's left leg, and shows again inside their openings. In the printed cell the bands are about 530 pixels high, the middle one 585, the apexes about 215 apart, and the bands about 77 across at the foot. The printed bands differ from one another by a tenth, and the drawing makes the two outer ones equal.",
  construction: {
    en: "Rule two equal chevron bands with level feet so that the first's right foot touches the last's left foot, and a taller third band between them. Cut a narrow white gap in the middle band along both edges of the leg that passes in front of it, on each side.",
    ja: "足の水平な山形の帯を、同じ形で二つ引きます。左の帯の右の足と右の帯の左の足が接するように置きます。その間に、少し高い三つ目の帯を引きます。真ん中の帯には、手前を通る脚の両側に沿って、左右とも細い白いすき間を切ります。",
  },
  build: mitsuChigaiYamagataBuild,
});
