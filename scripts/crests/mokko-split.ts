// The three-split quince, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuwariMokkoBuild } from "./drawn/mokko-split.ts";
import { defineCrest } from "./util.ts";

export const mitsuwariMokko = defineCrest({
  id: "mitsuwari-mokko",
  name: { en: "Three split quince blossoms", ja: "三つ割り木瓜" },
  reading: "みつわりもっこう",
  romaji: "mitsuwari mokkō",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 3, arrangement: "quartered" }, { motif: "karahana", count: 3, arrangement: "quartered" }],
  families: [],
  aliases: ["三ッワリ木瓜", "three-part mokko"],
  construction: {
    en: "Three quinces stand with their hearts on one circle, at the top and 120 degrees either side, and the circle cuts each in half. Of each quince the half inside the circle is drawn: half its flower, the curled band round it, the broad lobe that points to the middle and the inner halves of its two side lobes. Each quince keeps to its third of the circle, with a narrow paper line where its side lobes meet the next quince's.",
    ja: "木瓜を三つ、中心を一つの円の上に置きます。位置は円の真上と、そこから左右120度です。円はどの木瓜も半分に切り、円の内側にある半分だけを描きます。花の半分、そのまわりの巻き端の帯、中央へ向く幅の広い裂片、左右の裂片の内側の半分です。木瓜はそれぞれ円の3分の1に収め、左右の裂片が隣の木瓜と出会うところに細い白い線を残します。",
  },
  measured: "Frame 44, with the circle as 100: from each heart on the circle, the inward petal reaches about 46, the band's outer edge about 55 and the inward lobe about 86, and that lobe is about 91 wide. The side lobes reach about 60 degrees round the circle. These are the catalogue's quince at six fifths of its size, with the inward lobe drawn shorter and narrower to the cell's reach and the side lobes begun nearer the band.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, first row, third column from the right: 三ッワリ木瓜", ja: "左頁、一段目、右から三列目「三ッワリ木瓜」" }, read: "2026-11-28", measured: true },
  build: mitsuwariMokkoBuild,
});
