import { SHINSEN_MONCHO } from "./books.ts";
import { chuwaNiTachiFukuroBuild } from "./drawn/chuwa-ni-tachi-fukuro.ts";
import { fukuroBuild, hosowaNiFutatsuFukuroBuild, itowaNiKakuFukuroBuild } from "./drawn/fukuro.ts";
import { defineCrest } from "./util.ts";

export const fukuro = defineCrest({
  id: "fukuro",
  name: { en: "Bag", ja: "袋" },
  reading: "ふくろ",
  romaji: "fukuro",
  frame: "none",
  motifs: [{ motif: "bag", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ふくろ"],
  construction: {
    en: "A curved tie separates the flared mouth from the three round lobes of the bag. Pale pleats run away from the tie.",
    ja: "弧を描く結び紐で、広い口と丸い三つのふくらみを分けます。結び紐から白いひだを伸ばします。",
  },
  measured: "The upper cloth fans out above the tie, and the lower pouch has two short side lobes and one longer middle lobe. A short loop shows at either end of the tie.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, second row, first column from the right: ふくろ", ja: "左頁、二段目、右から一列目「ふくろ」" }, read: "2026-11-26", measured: true },
  build: fukuroBuild,
});

export const hosowaNiFutatsuFukuro = defineCrest({
  id: "hosowa-ni-futatsu-fukuro",
  name: { en: "Two bags in a thin ring", ja: "細輪に二つ袋" },
  reading: "ほそわにふたつふくろ",
  romaji: "hosowa ni futatsu fukuro",
  frame: "ring-thin",
  motifs: [{ motif: "bag", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["細ワニ二ッ袋"],
  construction: {
    en: "Two drawstring bags face belly to belly. Each has a broad flared mouth and tied cords with small beads. The pair stands inside a thin ring.",
    ja: "二つの袋のふくらみを向かい合わせます。袋口を広げ、結び紐の端に小さな玉を付けます。その対を細輪に収めます。",
  },
  measured: "The two opposed pouches nearly meet at their rounded bellies. The crop gives the frame about one sixteenth of its radius. The drawing balances the opposed bags and the curled corners on their mouths.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, first row, second column from the right: 細ワニ二ッ袋", ja: "左頁、一段目、右から二列目「細ワニ二ッ袋」" }, read: "2026-11-26", measured: true },
  build: hosowaNiFutatsuFukuroBuild,
});

export const itowaNiKakuFukuro = defineCrest({
  id: "itowa-ni-kaku-fukuro",
  name: { en: "Square bag in a thread ring", ja: "糸輪に角袋" },
  reading: "いとわにかくふくろ",
  romaji: "itowa ni kaku fukuro",
  frame: "ring-thread",
  motifs: [{ motif: "bag", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニ角袋"],
  construction: {
    en: "A faceted pouch with small stitched sprigs is tied with a four-loop cord. A thread ring surrounds the square bag.",
    ja: "縫い取りの小さな枝模様がある角張った袋を、四つの輪のある紐で結び、糸輪に収めます。",
  },
  measured: "The pouch has broad angled shoulders, a four-loop knot and a short hanging tag above it. The thread ring just contains the bag at the shoulders and lower corners. The scattered stitch marks retain their uneven positions.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, third row, second column from the right: 糸ワニ角袋", ja: "左頁、三段目、右から二列目「糸ワニ角袋」" }, read: "2026-11-26", measured: true },
  build: itowaNiKakuFukuroBuild,
});

export const chuwaNiTachiFukuro = defineCrest({
  id: "chuwa-ni-tachi-fukuro",
  name: { en: "Upright drawstring bag in a circle", ja: "中輪に立ち袋" },
  reading: "ちゅうわにたちふくろ",
  romaji: "chūwa ni tachi fukuro",
  frame: "ring-medium",
  motifs: [{ motif: "bag", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中ワニ立ふくろ"],
  construction: {
    en: "Strike the medium ring and the two flared lips of the bag. Rule an angular pouch with a centre seam and repeat one curl over both faces. Mirror the compact bow loops at the knot.",
    ja: "中輪と広い袋口を左右に打ち、中心に縫い目のある角張った胴を引きます。二つの面に同じ渦を並べ、結び目の輪を左右同じ形にします。",
  },
  measured: "The cell has a circle about 305 pixels across and a pouch body about 155 pixels wide. The bottom of the working pouch reaches 76 of the 79.2 units inside the medium ring. Matching arcs shape the mouth and matching cord runs meet in its middle.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, fourth row, first column from the right: 中ワニ立ふくろ", ja: "左頁、四段目、右から一列目「中ワニ立ふくろ」" }, read: "2026-11-27", measured: true },
  build: chuwaNiTachiFukuroBuild,
  placementBuild: { module: new URL("./drawn/chuwa-ni-tachi-fukuro.ts", import.meta.url), export: "chuwaNiTachiFukuroBuild" },
});
