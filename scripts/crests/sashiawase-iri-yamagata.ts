import { SHINSEN_MONCHO } from "./books.ts";
import { sashiawaseIriYamagataBuild } from "./drawn/sashiawase-iri-yamagata.ts";
import { defineCrest } from "./util.ts";

export const sashiawaseIriYamagata = defineCrest({
  id: "sashiawase-iri-yamagata",
  name: { en: "Interlocked inset mountain form", ja: "差し合わせ入り山形" },
  reading: "さしあわせいりやまがた",
  romaji: "sashiawase iri yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["さし合入山がた", "差合入山形"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 3, second column from the right: さし合入山がた (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から二列目「さし合入山がた」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Two equal chevron bands stand side by side, the right one passing in front of the left. Each has one long leg that reaches the common foot line and one short leg cut off level about a third of the way up: the left band's right leg and the right band's left leg are the short ones, and they lie one inside the other. In the printed cell each band is about 365 pixels across its outer feet's half-span, 240 across its inner, rises at about 61 degrees, and the right band stands about 180 pixels to the right; the short feet stand about 220 above the long ones. The printed bands differ by a degree or two, and the drawing makes them equal.",
  construction: {
    en: "Rule one chevron band with level feet, cut its right leg level a third of the way up, and a second band to its right with its left leg cut the same way. Cut a narrow white gap in the left band along both edges of the right band's left leg, so that the right band passes in front.",
    ja: "足の水平な山形の帯を一つ引き、右の脚を三分の一の高さで水平に切ります。その右に、左の脚を同じように切った帯を引きます。右の帯の左の脚の両側に沿って、左の帯に細い白いすき間を切り、右の帯を手前に通します。",
  },
  build: sashiawaseIriYamagataBuild,
});
