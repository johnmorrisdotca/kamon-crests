import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuKanBuild, kanBishiBuild, kanWaTsunagiBuild, mitsuKanBuild, yotsuKaraKanBishiBuild } from "./drawn/kan.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuKan = defineCrest({
  id: "mitsu-kan",
  name: { en: "Three curled bands", ja: "三つ環" },
  reading: "みつかん",
  romaji: "mitsu kan",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッくワん"],
  source: cell(27, "left page, row 2, first column from the right: 三ッくワん", "左頁、二段目、右から一列目「三ッくワん」"),
  measured: "Three curved bands sit around a small triangular space. The upper band spans about 165 pixels, and its broad rounded ends curl inward. The open ends face away from the centre. The drawing gives the three bands equal angles and keeps a narrow gap between them.",
  construction: {
    en: "Three open compass bands stand one third of a turn apart. The opening in each band turns outwards from the middle of the crest. Its two ends widen into rounded curls.",
    ja: "コンパスで描いた開いた帯を、3分の1回転ずつ回して三つ置きます。どの帯も開いた方を外へ向け、両端を丸く太くして内へ巻きます。",
  },
  build: mitsuKanBuild,
});

export const itsutsuKan = defineCrest({
  id: "itsutsu-kan",
  name: { en: "Five curled bands", ja: "五つ環" },
  reading: "いつつかん",
  romaji: "itsutsu kan",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッくワん"],
  source: cell(27, "left page, row 4, first column from the right: 五ッくワん", "左頁、四段目、右から一列目「五ッくワん」"),
  measured: "Five curved bands make an almost circular outline. Each opens towards the large white middle and ends in two rounded hooks. The top band has a span of about 113 pixels and the whole crest about 286. The drawing places the five bends at equal fifths of a turn.",
  construction: {
    en: "Five compass bands crown the outline. Their openings face a common white centre. A pair of rounded curls turns inwards at either end of each band.",
    ja: "コンパスで五つの帯を描いて外形を作ります。開いた方を共通の白い中心へ向け、各帯の両端を丸く巻き込みます。",
  },
  build: itsutsuKanBuild,
});

export const kanBishi = defineCrest({
  id: "kan-bishi",
  name: { en: "Lozenge of curled bands", ja: "環菱" },
  reading: "かんびし",
  romaji: "kan bishi",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["くワんひし"],
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "left page, third row, first column from the right: くワんひし", ja: "左頁、三段目、右から一列目「くワんひし」" }, read: "2026-11-27", measured: true },
  measured: "Four bowed bands make a broad open lozenge. Paired round ends mark its four corners. Both the upright and horizontal axes are symmetric.",
  construction: {
    en: "Strike a band curving between two adjacent corners of a broad diamond. Round both ends and reflect the same band into the other three quarters, leaving short openings at the corners.",
    ja: "横長の菱の隣り合う頂点を結ぶように弧の帯を引きます。両端を丸め、残りの三辺にも対称に写します。四隅に短いすき間を残します。",
  },
  build: kanBishiBuild,
});

export const yotsuKaraKanBishi = defineCrest({
  id: "yotsu-kara-kan-bishi",
  name: { en: "Lozenge of four Kara bands", ja: "四つ唐環菱" },
  reading: "よつからかんびし",
  romaji: "yotsu kara kan bishi",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 4, arrangement: "ring" }],
  families: [],
  aliases: ["四ッ唐くワんひし", "四つ唐鐶菱"],
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "left page, third row, second column from the right: 四ッ唐くワんひし", ja: "左頁、三段目、右から二列目「四ッ唐くワんひし」" }, read: "2026-11-27", measured: true },
  measured: "Three lobes and a pair of inward curls shape each of the four bands. The print is wider than it is tall. A short gap sits between the ends of each neighbouring pair.",
  construction: {
    en: "Strike a crown and two curled shoulders for each curved band, joining them with tangent arcs. Turn four copies about the open centre, placing the two side bands a little farther out.",
    ja: "一つの帯は、中央の山と両肩の巻きを接する弧でつないで作ります。帯を中央のまわりに四つ置き、左右の帯は少し外側に寄せます。",
  },
  build: yotsuKaraKanBishiBuild,
});

export const kanWaTsunagi = defineCrest({
  id: "kan-wa-tsunagi",
  name: { en: "Linked curled bands", ja: "環輪つなぎ" },
  reading: "かんわつなぎ",
  romaji: "kan wa tsunagi",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 4, arrangement: "ring" }],
  families: [],
  aliases: ["くワんわつなぎ"],
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "left page, second row, second column from the right: くワんわつなぎ", ja: "左頁、二段目、右から二列目「くワんわつなぎ」" }, read: "2026-11-27", measured: true },
  measured: "Four curled bands form a broad outline. The top and bottom bands are wider than the upright pair. On the 200-unit layout each side bowl has a centre radius of about 33 and a band width of about 10. Its sweep is about 214 degrees and the rounded ends are about 9 in radius. The upper and lower bands span about 103 units. The side bowls open towards the middle and opposite bands match by a half turn.",
  construction: {
    en: "Strike two broad compass bands above and below the centre and two deeper bends at the sides. Round their ends with tangent arcs and leave a short gap where the bands approach one another.",
    ja: "上下には幅の広い帯を、左右には深く曲がる帯を弧で描きます。それぞれの両端を接する弧で丸く巻き、隣の帯との間に細いすき間を残します。",
  },
  build: kanWaTsunagiBuild,
});
