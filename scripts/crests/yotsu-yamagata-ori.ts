import { SHINSEN_MONCHO } from "./books.ts";
import { yotsuYamagataOriBuild } from "./drawn/yotsu-yamagata-ori.ts";
import { defineCrest } from "./util.ts";

export const yotsuYamagataOri = defineCrest({
  id: "yotsu-yamagata-ori",
  name: { en: "Four woven mountain forms", ja: "織り四つ山形" },
  reading: "おりよつやまがた",
  romaji: "ori yotsu yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 4, arrangement: "crossed" }],
  families: [],
  aliases: ["四ッ山がた", "四つ山形の組み"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 4, second column from the right: 四ッ山がた, the interwoven one (measured, and drawn with compass and ruler)", ja: "左頁、四段目、右から二列目「四ッ山がた」、組み合わせた方（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Four chevron bands woven in two pairs, the whole turning into itself when it is turned half way round. A wide chevron points left and another points right, their legs ending on the middle line at the top and bottom with a narrow white seam between them. Inside each stands a narrower chevron whose point touches the centre and whose legs reach out past the wide one at the four corners. Where the legs cross, the inner chevron's upper leg passes in front of the wide one's upper leg and behind its lower leg. In the printed cell the wide chevrons are about 467 pixels from the centre to their points and 137 across, with legs rising at about 42 degrees; the inner ones are about 135 across, with legs at about 47 degrees. The printed pairs differ by a few pixels, and the drawing makes the two halves equal.",
  construction: {
    en: "Rule a wide chevron pointing left with its two ends on the middle line, and a narrower chevron pointing right whose point is at the centre. Cut a narrow white gap in each where the other passes over it: the narrow one over the wide one's upper leg, the wide one over the narrow one's lower leg. Turn the pair half way round to make the other two.",
    ja: "二つの端を中央の縦の線に置いた、左向きの広い山形の帯を引きます。中心に先を置いた右向きの狭い山形の帯も引きます。重なる所では、上になる帯の両側に沿って下の帯に細い白いすき間を切ります。狭い帯は広い帯の上の脚の上を、広い帯は狭い帯の下の脚の上を通ります。この一組を半回転させて、残りの二つを作ります。",
  },
  build: yotsuYamagataOriBuild,
});
