import { iwakazeSnow } from "./drawn/yukiwa-variants.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const iwakazeNoYukiwa = defineCrest({
  id: "iwakaze-no-yukiwa",
  name: { en: "Iwakaze snow ring", ja: "岩風の雪輪" },
  reading: "いわかぜのゆきわ",
  romaji: "iwakaze no yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  source: cell(41, "left page, row 2, third column from the right: 岩風のゆきワ", "左頁、二段目、右から三列目「岩風のゆきワ」"),
  measured:
    "The printed arms reach about 140 to 155 pixels from the centre. The three pointed arms are about 45 pixels wide at mid-length, and the three arms between them are ruled lines. The central disc spans about 42 pixels. The drawing uses a hub radius of 13, compass arcs of radius 84 for the lens arms and plain spokes 88 from the middle.",
  construction: {
    en: "Three compass lenses alternate with three straight spokes around a round centre. Each lens reaches the outer circle, and a thin white gap parts it from the centre. The uppermost arm is a straight spoke.",
    ja: "丸い中心のまわりに、コンパスで作るレンズ形と、直線で作る細い棒を三つずつ交互に置きます。レンズ形の先は外円に届かせ、丸い中心との間に細い白いすき間を残します。いちばん上は直線の棒です。",
  },
  build: iwakazeSnow,
});
