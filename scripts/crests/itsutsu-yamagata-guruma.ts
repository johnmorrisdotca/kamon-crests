import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuYamagataGurumaBuild } from "./drawn/itsutsu-yamagata-guruma.ts";
import { defineCrest } from "./util.ts";

export const itsutsuYamagataGuruma = defineCrest({
  id: "itsutsu-yamagata-guruma",
  name: { en: "Five mountain forms in a wheel", ja: "五つ山形車" },
  reading: "いつつやまがたぐるま",
  romaji: "itsutsu yamagata guruma",
  frame: "none",
  motifs: [{ motif: "mountain", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッ山がたくるま"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 3, fourth column from the right: 五ッ山がたくるま (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から四列目「五ッ山がたくるま」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Five bent bands turn about the centre. Each is a chevron of about 100 degrees: its lower leg runs in to the centre and its upper leg out to the rim, both ending on one radius, and the bend points back against the turn. In the printed cell the tips are about 498 pixels from the centre, the bends 342 on the outside and 288 on the inside, and the bands about 67 wide. The five printed bands differ in their reach by a tenth, and the drawing makes them equal.",
  construction: {
    en: "Rule one chevron band with its two ends on one radius, the lower leg running to the centre and the upper to the layout circle, both legs of one width. Turn it a fifth of the way round four times, so that the five lower legs meet at the centre.",
    ja: "二つの端を一本の半径の上に置いた山形の帯を一つ引きます。下の脚は中心へ、上の脚は外の円へ向け、二つの脚の幅をそろえます。それを5分の1回転ずつ四回回し、五つの下の脚を中心で合わせます。",
  },
  build: itsutsuYamagataGurumaBuild,
});
