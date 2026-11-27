import { kokumochiYukiwaBuild } from "./drawn/kokumochi-yukiwa.ts";
import { iwakazeSnow, kumoSnow, tsuraraSnow } from "./drawn/yukiwa-variants.ts";
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

export const tsuraraYukiwa = defineCrest({
  id: "tsurara-yukiwa",
  name: { en: "Icicle snow ring", ja: "つらら雪輪" },
  reading: "つららゆきわ",
  romaji: "tsurara yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  source: cell(41, "left page, row 4, second column from the right: つららゆきワ", "左頁、四段目、右から二列目「つららゆきワ」"),
  measured:
    "The outer hexagon in the print reaches about 94 pixels from the middle, the inner one about 69, and the central disc about 22. Each short stem forks to three discs at about 140 from the middle. The drawing takes hexagon radii 58 and 44, a 14-unit central disc, and 10-unit discs at the ends of the forks.",
  construction: {
    en: "A broad hexagonal band surrounds a central disc. One straight stem rises from each corner and forks into three branches, each tipped with a small disc. The branches and discs repeat at intervals of a sixth of a turn.",
    ja: "丸い中心を太い六角形の帯で囲みます。六つの角からまっすぐな軸を一本ずつ伸ばし、三本に分け、それぞれの先に小さな丸を置きます。枝と丸は6分の1回転ずつ回したところに作ります。",
  },
  build: tsuraraSnow,
});

export const kumoNoYukiwa = defineCrest({
  id: "kumo-no-yukiwa",
  name: { en: "Striped snow ring", ja: "くもの雪輪" },
  reading: "くものゆきわ",
  romaji: "kumo no yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  source: cell(41, "left page, row 4, first column from the right: くものゆきワ", "左頁、四段目、右から一列目「くものゆきワ」"),
  measured:
    "The print has three equal sectors in a circle about 310 pixels across, with about nineteen parallel hatches to a sector and a three-leaf cluster on the end of each of the three dividing rays. The drawing takes a spacing of 7.5 and a line weight of 3.2, with each ray ending 70 from the middle at a cluster of narrow lenses.",
  construction: {
    en: "Three straight rays divide the circle into thirds. Parallel bands run from the sloping edges of each sector to the outer circle. At the end of each ray stand three narrow compass lenses, with the middle one on the ray.",
    ja: "まっすぐな三本の線で円を三等分します。それぞれの区画の斜めの辺から外円まで、平行な帯を並べます。三本の線の先には細いレンズ形を三つずつ置き、真ん中のレンズ形を線の上にそろえます。",
  },
  build: kumoSnow,
});

export const kokumochiYukiwa = defineCrest({
  id: "kokumochi-yukiwa",
  name: { en: "Snow ring on a black disc", ja: "石持ち雪輪" },
  reading: "こくもちゆきわ",
  romaji: "kokumochi yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }, { motif: "black-disc", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["石持ゆきワ", "石持ゆきわ"],
  source: cell(41, "left page, row 1, first column from the right: 石持ゆきワ", "左頁、一段目、右から一列目「石持ゆきワ」"),
  measured: "The pale snow opening has six scalloped lobes approaching the round edge and six inlets reaching less than halfway across the radius. Its tips stay two units inside the disc to keep the edge continuous.",
  construction: {
    en: "Strike a black disc. Build one scalloped snow lobe from compass arcs, repeat it around the centre and leave its silhouette white. Keep a fine rim continuous at all six tips.",
    ja: "黒い円を打ちます。弧でふくらんだ雪の裂片を六つ並べ、その形を白く抜きます。六つの先でも細い黒い縁が途切れないようにします。",
  },
  build: kokumochiYukiwaBuild,
});
