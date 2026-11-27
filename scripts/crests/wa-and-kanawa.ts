import { RING_GAP, WEIGHT } from "../construct/builder.ts";
import { carve, disc, thickArc, toPath, type Region, type V } from "../construct/compass.ts";
import { C0, R, circle } from "../construct/geo.ts";
import { kikuWaBuild } from "./drawn/kiku.ts";
import { wachigaiBuild } from "./drawn/plain.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const sanjuWa = defineCrest({
  id: "sanju-wa",
  name: { en: "Triple ring", ja: "三重輪" },
  reading: "さんじゅうわ",
  romaji: "sanjū wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 3, arrangement: "stacked" }],
  families: [],
  source: cell(15, "left page, row 2, first column from the right: 三重輪", "左頁、二段目、右から一列目「三重輪」"),
  measured: "Six concentric contour lines form three black bands. The outer band is the broadest and the two inner bands narrow successively. The inner opening is about two thirds of the whole diameter.",
  construction: {
    en: "Strike six circles about the same centre, filling alternating spaces to make three rings. The outer ring is widest.",
    ja: "同じ中心から円を六本打ち、円の間を一つおきに塗って三重の輪にします。外側の輪をいちばん太くします。",
  },
  build(c) {
    for (const [outer, inner] of [[R, 87], [80, 73], [67, 63]]) {
      c.fill("plain-ring", circle(C0, outer).join(circle(C0, inner)), "evenodd");
    }
  },
});

export const kikuWa = defineCrest({
  id: "kiku-wa",
  name: { en: "Chrysanthemum ring", ja: "菊輪" },
  reading: "きくわ",
  romaji: "kiku wa",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "ring" }],
  families: [],
  source: cell(15, "left page, row 2, second column from the right: 菊輪", "左頁、二段目、右から二列目「菊輪」"),
  measured: "Sixteen rounded petals sit outside the central opening. The hole is about seven tenths of the diameter, and each petal lies between two short radial seams.",
  construction: {
    en: "Strike the circle of the opening. Build sixteen rounded petals around it, with their curved feet on the opening and a white seam at each side.",
    ja: "中央の空きの円を打ち、その縁に丸い花びらを十六枚配します。花びらの根元は内円に沿わせ、となりとの間を細く白く空けます。",
  },
  build(c) {
    kikuWaBuild(c, R);
  },
});

export const mitsuNarabiKanawa = defineCrest({
  id: "mitsu-narabi-kanawa",
  name: { en: "Three metal rings in a row", ja: "三つ並び金輪" },
  reading: "みつならびかなわ",
  romaji: "mitsu narabi kanawa",
  frame: "none",
  motifs: [{ motif: "linked-rings", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三ッ並びかなワ"],
  source: cell(16, "left page, row 4, second column from the right: 三ッ並びかなワ", "左頁、四段目、右から二列目「三ッ並びかなワ」"),
  measured: "Three round bands lie on a common horizontal line. Their centres are 55 units apart for an outer radius of 41, and the paired boundaries leave a band of about six units.",
  construction: {
    en: "Strike three equal bands on the same horizontal line. The right band passes over the next band above the line and below it at the lower crossing.",
    ja: "横一列に同じ輪を三つ打ちます。上の交差では右の輪が左の輪の上を通り、下の交差ではその逆にします。",
  },
  build(c) {
    const outer = 41;
    const inner = outer - WEIGHT.thin;
    const mean = (outer + inner) / 2;
    const clearance = WEIGHT.thin + 2 * WEIGHT.hair;
    const left: V = [-55, 0];
    const middle: V = [0, 0];
    const right: V = [55, 0];
    const above = (at: V) => thickArc(at, mean, clearance, 0, Math.PI);
    const below = (at: V) => thickArc(at, mean, clearance, -Math.PI, 0);
    const draw = (at: V, ...covers: Region[]) => {
      const region = carve([disc(at, outer)], [disc(at, inner), ...covers]);
      c.fill("linked-rings", toPath(region, { k: 1 }));
    };
    c.guideCircle(C0, R);
    draw(left, above(middle));
    draw(middle, below(left), above(right));
    draw(right, below(middle));
  },
});

export const itowaNiChigaiKanawa = defineCrest({
  id: "itowa-ni-chigai-kanawa",
  name: { en: "Crossed metal rings in a thin ring", ja: "糸輪に違い金輪" },
  reading: "いとわにちがいかなわ",
  romaji: "itowa ni chigai kanawa",
  frame: "ring-thread",
  motifs: [{ motif: "linked-rings", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["糸ワニちがひ金輪"],
  source: cell(16, "left page, first row, second column from the right: 糸ワニちがひ金輪", "左頁、一段目、右から二列目「糸ワニちがひ金輪」"),
  measured: "Across the cell's centre line the outer circle measures about 302 pixels. The two band centres stand about 91 pixels apart, with mean outer and inner radii of about 94 and 82 pixels. The construction rounds the two bands to equal widths and uses the package's thread ring and white gap.",
  construction: {
    en: "Strike two equal bands on a horizontal axis inside the thread ring. The right band passes over at the upper crossing and under at the lower crossing.",
    ja: "糸輪の中の水平軸に、同じ太さの二つの輪を打ちます。右の輪は上の交差で手前を通り、下の交差で奥を通ります。",
  },
  build(c) {
    wachigaiBuild(c, "linked-rings", c.ring("ring-thread") - RING_GAP, { half: 32, outer: 68, inner: 58, mirror: true });
  },
});

export const chigaiKanawa = defineCrest({
  id: "chigai-kanawa",
  name: { en: "Crossed metal rings", ja: "違い金輪" },
  reading: "ちがいかなわ",
  romaji: "chigai kanawa",
  frame: "none",
  motifs: [{ motif: "linked-rings", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["違ひ金輪"],
  source: cell(16, "left page, fourth row, first column from the right: 違ひ金輪", "左頁、四段目、右から一列目「違ひ金輪」"),
  measured: "The rings have an outer radius of about 93 pixels and an inner radius of about 77 pixels, with their centres about 93 pixels apart. The upper crossing puts the right ring in front and the lower crossing puts it behind. The construction makes the rings equal and leaves a narrow white line at each crossing.",
  construction: {
    en: "Set the centres of two equal bands a radius apart on a horizontal line. The right band passes over at the upper crossing and under at the lower crossing.",
    ja: "水平線上に半径一つ分離れて二つの中心を取り、同じ太さの輪を打ちます。右の輪は上の交差で手前を通り、下の交差で奥を通ります。",
  },
  build(c) {
    wachigaiBuild(c, "linked-rings", R, { half: 33.5, outer: 66.5, inner: 55.5, mirror: true });
  },
});
