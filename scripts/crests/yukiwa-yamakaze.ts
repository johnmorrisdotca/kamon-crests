// The mountain-wind snow ring, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { yamakazeNoYukiwaBuild } from "./drawn/yukiwa-yamakaze.ts";
import { defineCrest } from "./util.ts";

export const yamakazeNoYukiwa = defineCrest({
  id: "yamakaze-no-yukiwa",
  name: { en: "Mountain-wind snow ring", ja: "山風の雪輪" },
  reading: "やまかぜのゆきわ",
  romaji: "yamakaze no yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["山風の雪ワ"],
  construction: {
    en: "A round body carries six broad lobes, the first upright. Each lobe ends in three pointed teeth, a tall one in the middle and one each side, and every edge of it is one slightly hollow arc between a tip and a notch. Half way between each pair of lobes a teardrop is left white in the body: a round end towards the middle and two ruled sides that meet in a point just inside the rim.",
    ja: "丸い胴に、幅の広い六つの張り出しを、一つ目を真上に向けてつけます。張り出しの先は三つのとがった歯で、中央の一つを高く、左右に一つずつ置きます。その縁はどれも、先と切れ込みの間を、わずかにへこむ一本の弧で描きます。張り出しと張り出しの間には、胴の中にしずく形を白く抜きます。丸い方を中央へ向け、二本の直線の辺を縁のすぐ内側で一点に合わせます。",
  },
  measured: "Frame 41, in a reach of 96: the valleys between the lobes stand about 65 out. The middle tooth of a lobe reaches 96 and its side teeth about 89, about 17 degrees either side, with the notches between about 82 out. The teardrops' round ends are about 14 across, centred about 42 out, and their points reach about 68, where they touch the outline; ours stop at 61 so that the opening stays a hole. The print has six lobes and six teardrops but is not regular: its teardrops stand about 22, 90 and 150 degrees either side of upright and its top and bottom lobes are narrower. Ours is regular, a sixth of a turn apart.",
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "left page, third row, fourth column from the right: 山風の雪ワ", ja: "左頁、三段目、右から四列目「山風の雪ワ」" }, read: "2026-11-28", measured: true },
  build: yamakazeNoYukiwaBuild,
});
