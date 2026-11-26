import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/peony-faces.ts";
import { defineCrest } from "./util.ts";

export const ichiyoBotan = defineCrest({
  id: "ichiyo-botan",
  name: { en: "One-leaf peony", ja: "一葉牡丹" },
  reading: "いちようぼたん",
  romaji: "ichiyō botan",
  frame: "none",
  motifs: [{ motif: "peony", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["一葉ぼたん"],
  construction: {
    en: "A low peony head sits in front of a fan of pointed foliage. The round petals overlap in tiers, separated by narrow white curves. The points of the leaves rise above the head and spread outward to both sides.",
    ja: "尖った葉が扇のように広がり、その手前の低い位置に牡丹の花を置きます。丸い花弁を段ごとに重ね、細い白い弧で分けます。葉の先は花より高く立ち、左右にも広がります。",
  },
  measured: "The printed crest is about 310 pixels across and 200 high. The low flower fills about three fifths of the width, with two large pointed leaves rising behind it. The two sides are mirrored in the drawing and the white petal curves regularised.",
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "left page, second row, first column from the right: 一葉ぼたん", ja: "左頁、二段目、右から一列目「一葉ぼたん」" }, read: "2026-11-26", measured: true },
  build: drawn.ichiyoBotanBuild,
});

export const uraBotan = defineCrest({
  id: "ura-botan",
  name: { en: "Back-view peony", ja: "裏牡丹" },
  reading: "うらぼたん",
  romaji: "ura botan",
  frame: "none",
  motifs: [{ motif: "peony", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["うらぼたん"],
  construction: {
    en: "Four broad lobes turn round a pointed calyx. Fine arcing veins fan out along each lobe, and small outer lobes show through the gaps. A curved white cut marks the calyx stalk.",
    ja: "尖った萼のまわりに、幅の広い裂片を四枚並べます。各裂片には細い弧の筋が扇のように広がり、間から外側の小さな裂片がのぞきます。萼の茎には弧を描く白い切れ込みを入れます。",
  },
  measured: "The printed head spans about 280 pixels. Four large ribbed sections and scalloped outer edges surround a small pointed calyx. The drawing regularises the four turns and spaces the ribs evenly, with a clear white line around the calyx.",
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "left page, third row, second column from the right: うらぼたん", ja: "左頁、三段目、右から二列目「うらぼたん」" }, read: "2026-11-26", measured: true },
  build: drawn.uraBotanBuild,
});
