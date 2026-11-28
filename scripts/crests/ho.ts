import { SHINSEN_MONCHO } from "./books.ts";
import { dakiHoNoMaruBuild, futatsuHoTomoeBuild, itsutsuYoseHoBuild, maruNiHoBuild } from "./drawn/ho.ts";
import { maruNiMitsuHoBuild } from "./drawn/maru-ni-mitsu-ho.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const maruNiHo = defineCrest({
  id: "maru-ni-ho",
  name: { en: "Sail in a circle", ja: "丸に帆" },
  reading: "まるにほ",
  romaji: "maru ni ho",
  frame: "ring-medium",
  motifs: [{ motif: "sail", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["帆"],
  construction: {
    en: "A sail hangs from a horizontal yard. Two curved seams follow the billowing cloth, and ruled lines join the yard to the top of the mast.",
    ja: "水平な帆桁から帆を垂らします。ふくらむ布に沿って弧を描く縫い目を二本入れ、帆桁と帆柱の上端を直線で結びます。",
  },
  measured: "The printed yard spans about three fifths of the outer ring. The drawn yard is narrower. The tip of the sail sweeps right, with two curved seams down its face. The frame takes the standard catalogue ring.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, fourth row, first column from the right: 丸に帆", ja: "左頁、四段目、右から一列目「丸に帆」" }, read: "2026-11-26", measured: true },
  build: maruNiHoBuild,
});

export const itsutsuYoseHo = defineCrest({
  id: "itsutsu-yose-ho",
  name: { en: "Five sails gathered at the centre", ja: "五つ寄せ帆" },
  reading: "いつつよせほ",
  romaji: "itsutsu yose ho",
  frame: "none",
  motifs: [{ motif: "sail", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッよせ帆"],
  construction: {
    en: "Five curved sails lead to one point, each with a short yard and mast at the outside.",
    ja: "弧を描く五枚の帆を一点へ寄せ、外側にそれぞれ短い帆桁と帆柱を置きます。",
  },
  measured: "The five corners of cloth meet near the centre in the cell. The outside assembly of each sail occupies about one fifth of the circle. The turns have been set to equal angles.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, third row, second column from the right: 五ッよせ帆", ja: "左頁、三段目、右から二列目「五ッよせ帆」" }, read: "2026-11-26", measured: true },
  build: itsutsuYoseHoBuild,
});

export const futatsuHoTomoe = defineCrest({
  id: "futatsu-ho-tomoe",
  name: { en: "Two turning sails", ja: "二つ帆巴" },
  reading: "ふたつほともえ",
  romaji: "futatsu ho tomoe",
  frame: "none",
  motifs: [{ motif: "sail", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["二ッ帆ともゑ"],
  source: cell(10, "left page, first row, second column from the right: 二ッ帆ともゑ", "左頁、一段目、右から二列目「二ッ帆ともゑ」"),
  measured: "Two opposing sails follow a round outline about 310 pixels across. Each yard reaches from a little past the centre to the edge, with a smaller crosspiece and triangular rigging above it. Two narrow seams curve across the billowing cloth. The drawing sets the pair half a turn apart and makes the spar widths regular.",
  construction: {
    en: "Set two curved sails half a turn apart, with two narrow seams through each sweep. Rule the horizontal yards, short masts and slanted stays inside the open ends.",
    ja: "弧を描く二枚の帆を半回転ずらして置き、それぞれに曲がる細いすき間を二本残します。空いたところに水平な帆桁、短い帆柱、斜めの支えを引きます。",
  },
  build: futatsuHoTomoeBuild,
});

export const dakiHoNoMaru = defineCrest({
  id: "daki-ho-no-maru",
  name: { en: "Facing sails in a round", ja: "抱き帆の丸" },
  reading: "だきほのまる",
  romaji: "daki ho no maru",
  frame: "none",
  motifs: [{ motif: "sail", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["だき帆の丸"],
  construction: {
    en: "Rule two mirror-image yards which meet halfway up the sails. Strike the curved sides and two seams on each cloth, meeting at the lower tip. The masts and their ties rise from the joined yards.",
    ja: "二本の帆桁を左右対称に引き、中央で合わせます。左右の帆の輪郭と二本ずつの縫い目を弧で描き、下端で合わせます。帆桁の上に帆柱と支えの直線を引きます。",
  },
  measured: "The outside edge follows the arc of a round crest. Both free sides meet at the bottom. At the middle height the two seam arcs are about 70 and 46 units left of the centre. The circles measured from the cell round to radii 92 and 108 on the working layout. The paired yards are about 6 units thick. The two oblique yards share their inner end; the slanted mast caps make a shallow angle above it.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, second row, second column from the right: だき帆の丸", ja: "左頁、二段目、右から二列目「だき帆の丸」" }, read: "2026-11-27", measured: true },
  build: dakiHoNoMaruBuild,
});

export const maruNiMitsuHo = defineCrest({
  id: "maru-ni-mitsu-ho",
  name: { en: "Three sails in a ring", ja: "丸に三つ帆" },
  reading: "まるにみつほ",
  romaji: "maru ni mitsu ho",
  frame: "ring-medium",
  motifs: [{ motif: "sail", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸に三ッ帆"],
  construction: {
    en: "Strike a ring. Hang three sails from yards near it, a third of a turn apart, each cloth narrowing to the centre where the three meet, its sides bowing the same way round, with two seams down it to the centre. Stand a post and a crossbar on each yard.",
    ja: "輪を打ちます。輪の近くに帆桁を三本、三分の一回りずつずらして置き、それぞれから帆を垂らします。帆は真ん中へ細くなって三枚がそこで合い、両側は同じ向きに反り、縫い目が二本真ん中へ下ります。帆桁の上に短い柱と横木を立てます。",
  },
  measured: "The book's cell, in its pixels from the ring's centre: the ring from 126 to 151 out; each yard 9 deep at 89.5 out, from 67 to one side to 69 to the other, with a post 10 wide and a crossbar 13 deep and 64 long over it, its top at 119 out; the cloth from 48 and 41 along the yard to the centre, one side bowing out through 31 across at 31 out, the other in through 17 across at 56 out. The book's lower right sail stands about 10 degrees short of a third of a turn from the top one; here the three are even.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, fourth row, second column from the right: 丸に三ッ帆", ja: "左頁、四段目、右から二列目「丸に三ッ帆」" }, read: "2026-11-28", measured: true },
  build: maruNiMitsuHoBuild,
});
