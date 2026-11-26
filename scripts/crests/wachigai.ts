import { crossedWachigai, knottedWachigai, splitThreeWachigai, threeInThickRing } from "./drawn/wachigai.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const futowaNiMitsuWachigai = defineCrest({
  id: "futowa-ni-mitsu-wachigai",
  name: { en: "Three linked rings in a thick circle", ja: "太輪に三つ輪違い" },
  reading: "ふとわにみつわちがい",
  romaji: "futowa ni mitsu wachigai",
  frame: "ring-thick",
  motifs: [{ motif: "linked-rings", count: 3, arrangement: "triangle" }],
  families: [],
  source: cell(15, "right page, row 4, first column from the right: 太ワニ三ッワちがひ", "右頁、四段目、右から一列目「太ワニ三ッワちがひ」"),
  measured:
    "The outer ring is about 300 pixels across and 42 thick. The inner three rings are about 121 across with bands roughly 11 thick. Their centres are about 36 from the middle. The drawing uses the package's thick ring and inner rings of radius 39, width 7, with centres 23 from the middle. Each takes the over-under order from the printed intersections.",
  construction: {
    en: "A thick ring encloses three bands of equal width. Their centres are 23 from the middle, one above and two below. Each passes over its next neighbour at one crossing and under it at the other, with narrow white gaps on both sides of the upper band.",
    ja: "太い輪の中に、同じ太さの輪を三つ収めます。それぞれの中心は全体の中心から23離し、上に一つ、下に二つ置きます。となり合う輪は一方の交差で上、もう一方で下を通ります。上を通る輪の両側に細い白いすき間を残します。",
  },
  build: threeInThickRing,
});

export const mitsuWariWachigai = defineCrest({
  id: "mitsu-wari-wachigai",
  name: { en: "Three-way split linked rings", ja: "三つ割り輪違い" },
  reading: "みつわりわちがい",
  romaji: "mitsu wari wachigai",
  frame: "ring-thin",
  motifs: [{ motif: "linked-rings", count: 3, arrangement: "radial" }],
  families: [],
  source: cell(15, "right page, row 1, first column from the right: 三ッワりわちがひ", "右頁、一段目、右から一列目「三ッワりわちがひ」"),
  measured:
    "The printed ring spans about 294 pixels. One band's curve runs from the two sides of the ring, with a sag of about 70 on a chord about 255 wide. Each band is about 20 pixels thick where it crosses another. The drawing places its compass centres 91 units from the middle and takes the 12-unit bands between radii 98 and 110.",
  construction: {
    en: "Three bowed bands turn about the middle inside a thin ring. Each lies between two circles about a centre 91 from the middle, reaches the ring at both ends and crosses once over and once under its neighbours. Thin white gaps follow the edges at the crossings.",
    ja: "細い輪の中に弧の帯を三つ回して収めます。どの帯も全体の中心から91離れた点を中心とする二つの円で挟み、両端を輪まで届かせます。ほかの二つとは一度上、一度下で交わり、帯の縁に沿って細い白いすき間を残します。",
  },
  build: splitThreeWachigai,
});

export const musubiWachigai = defineCrest({
  id: "musubi-wachigai",
  name: { en: "Knotted linked rings", ja: "結び輪違い" },
  reading: "むすびわちがい",
  romaji: "musubi wachigai",
  frame: "none",
  motifs: [{ motif: "linked-rings", count: 4, arrangement: "radial" }],
  families: [],
  source: cell(14, "left page, row 4, fourth column from the right: むすびわちがひ", "左頁、四段目、右から四列目「むすびわちがひ」"),
  measured:
    "The four lobes reach about 150 pixels from the middle. A lobe has a round crown about 145 pixels across and a band about 17 pixels wide. The diagonal bridges follow a markedly wider arc. The drawing sets the lobe centres 50 from the middle with radius 46, then joins consecutive lobes with tangent bridge arcs of radius 101. The band's other edge is 10 inside both arcs.",
  construction: {
    en: "One band makes four rounded lobes. A broad diagonal arc joins each lobe to the next, touching the two lobe circles. Each edge of the band follows the same circles at radii 10 apart. A thin white gap parts the lower band from the upper band at each crossing.",
    ja: "一本の帯で丸いふくらみを四つ作ります。斜めの大きな弧がとなり合う二つの円に接し、ふくらみどうしをつなぎます。帯の両側の弧は中心をそろえ、半径を10ずつ離します。交差するところでは、上と下の帯の間に細い白いすき間を残します。",
  },
  build: knottedWachigai,
});

export const wachigaiJu = defineCrest({
  id: "wachigai-ju",
  name: { en: "Linked-ring cross", ja: "輪違い十" },
  reading: "わちがいじゅう",
  romaji: "wachigai jū",
  frame: "ring-thin",
  motifs: [{ motif: "linked-rings", count: 4, arrangement: "crossed" }],
  families: [],
  source: cell(14, "left page, row 2, fourth column from the right: わちがひ十", "左頁、二段目、右から四列目「わちがひ十」"),
  measured:
    "The printed circular outline is about 304 pixels wide. The two almost-level bands bow away from the horizontal axis by about 57 pixels at the middle and are about 20 pixels thick. The uprights show the same construction. The compass centres are regularised to 111 from the middle, with a 7-degree lean measured from the top and bottom joins. Each band has radius 148 and width 12.",
  construction: {
    en: "Four bands reach the enclosing thin ring at both ends. One bows up, one down and one towards each side. The layout leans 7 degrees clockwise and leaves a square of white with curved sides in the middle. Each band passes under the next, with a thin gap where they cross.",
    ja: "四本の弧の帯の両端を外側の細い輪まで届かせます。帯は上下左右に一つずつふくらみます。全体を時計回りに7度傾け、中央に辺の曲がった四角い白を残します。どの帯も次の帯の下を通り、交差には細い白いすき間を残します。",
  },
  build: crossedWachigai,
});
