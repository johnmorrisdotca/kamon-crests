// The ring quince, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { kanMokkoBuild } from "./drawn/mokko-bands.ts";
import { defineCrest } from "./util.ts";

export const kanMokko = defineCrest({
  id: "kan-mokko",
  name: { en: "Quince blossom of curled bands", ja: "環木瓜" },
  reading: "かんもっこう",
  romaji: "kan mokkō",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 4, arrangement: "radial" }, { motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["くワん木瓜", "kan mokko", "ring quince"],
  construction: {
    en: "A four-petalled flower stands in the middle, its two long petals level and its two short ones upright. Each petal is a round body with a tip lobe and two shoulders between ruled seams. Four broad curled bands surround it in place of the quince's lobes: a long shallow band above and below, and a deeper band at each side. Each band is the space between two circles about one centre, and each end swells into a round bulb that rolls in towards the flower.",
    ja: "中央に四枚の花びらの花を、長い二枚を横に、短い二枚を縦にして置きます。花びらはどれも、直線の境の間に、丸い胴と、先と両肩の三つのふくらみを作ります。そのまわりを、木瓜の外の形の代わりに、幅の広い巻き端の帯四本で囲みます。上下には長く浅い帯、左右には深い帯を置きます。帯はどれも、中心が同じ二つの円の間の形で、両端は丸くふくらんで花の方へ巻き込みます。",
  },
  measured: "Frame 44, with half the width as 96: the figure is about 152 tall. The upper and lower bands lie on circles of radius about 53 centred 23 from the middle, and the side bands on circles of radius about 40 centred 56 out. The bands are about 16 wide and their bulbs about 19 across, drawn 20. The print's ends turn in with a small hook; ours swell into round bulbs. The flower's side petals reach about 60 and its upright petals about 47. Both are about 42 to 44 across their shoulders in the print and are drawn about 48, so that the shoulder lobes join the body. The seams between them stand about 48 degrees off upright, and the heart is about 9.5 in radius.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, first row, second column from the right: くワん木瓜", ja: "左頁、一段目、右から二列目「くワん木瓜」" }, read: "2026-11-28", measured: true },
  build: kanMokkoBuild,
});
