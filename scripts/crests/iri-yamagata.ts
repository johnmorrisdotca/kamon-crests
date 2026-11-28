import { SHINSEN_MONCHO } from "./books.ts";
import { iriYamagataBuild } from "./drawn/iri-yamagata.ts";
import { defineCrest } from "./util.ts";

export const iriYamagata = defineCrest({
  id: "iri-yamagata",
  name: { en: "Inset mountain form", ja: "入り山形" },
  reading: "いりやまがた",
  romaji: "iri yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["入山形"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 2, second column from the right: 入山形 (measured, and drawn with compass and ruler)", ja: "左頁、二段目、右から二列目「入山形」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Two equal chevron bands with level feet stand side by side, the right one passing in front of the left. In the printed cell each band is about 252 pixels across its outer feet and 162 across its inner feet, its outer legs rise at about 57 degrees, and the right band stands about 63 pixels to the right of the left. The left band's right leg runs behind the right band's left leg and shows again inside its opening. The printed bands differ by a degree or two, and the drawing makes them equal.",
  construction: {
    en: "Rule one chevron band with level feet, and a second equal band to its right. Cut a narrow white gap in the left band along both edges of the right band's left leg, so that the right band passes in front.",
    ja: "足の水平な山形の帯を一つ引き、同じ帯をその右に引きます。右の帯の左の脚の両側に沿って、左の帯に細い白いすき間を切り、右の帯を手前に通します。",
  },
  build: iriYamagataBuild,
});
