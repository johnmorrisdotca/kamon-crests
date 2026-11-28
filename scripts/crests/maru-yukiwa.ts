import { SHINSEN_MONCHO } from "./books.ts";
import { maruYukiwaBuild } from "./drawn/maru-yukiwa.ts";
import { defineCrest } from "./util.ts";

export const maruYukiwa = defineCrest({
  id: "maru-yukiwa",
  name: { en: "Bumped snow disc", ja: "丸雪輪" },
  reading: "まるゆきわ",
  romaji: "maru yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ゆきワ"],
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, row 4, fourth column from the right: ゆきワ (measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から四列目「ゆきワ」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A whole disc whose edge rises and falls in about twelve shallow round bumps, with six small round eyes set against the edge at equal distances, each in a notch. In the printed cell the edge stands 140 to 166 from the middle, so the bumps are 5 to 10 deep, and each eye is about 22 across. The printed bumps and eyes differ in size and place, and the drawing makes the twelve bumps and the six eyes equal.",
  construction: {
    en: "Strike twelve equal circles of 33 across the radius round the centre, centred 58 out at every twelfth of the way round, and fill them with the disc of 58 across the radius they surround. Strike six circles of 6.5 across the radius, centred 78 out at every sixth of the way round, each in the notch between two bumps and touching the edge from inside, and leave them white.",
    ja: "中心のまわりに、半径33の同じ円を十二個、中心を58離して12等分の位置に描きます。それらに囲まれた半径58の円といっしょに、全体を塗ります。さらに、半径6.5の小さな円を六つ、中心を78離して6等分の位置に描きます。どれも二つの山の間の谷にあり、縁に内側から接するようにして、白く抜きます。",
  },
  build: maruYukiwaBuild,
});
