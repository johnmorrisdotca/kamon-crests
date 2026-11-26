import { sakaiKatabamiBuild, mitsuWariKatabamiBuild } from "./drawn/katabami.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const sakaiKatabami = defineCrest({
  id: "sakai-katabami",
  name: { en: "Sakai wood sorrel", ja: "酒井片喰" },
  reading: "さかいかたばみ",
  romaji: "Sakai katabami",
  frame: "ring-medium",
  motifs: [{ motif: "wood-sorrel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["酒井かたばみ"],
  construction: { en: "Three broad heart-shaped leaves reach close to the inner edge of the ring. A pointed white stamen sits under each leaf’s notch.", ja: "幅広いハート形の葉を輪の内側の近くに三枚並べ、各葉の切れ込みの下に先のとがった白いしべを置きます。" },
  measured: "The three broad leaf outlines and pointed rays share one set of angles. The round band has an even width.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, third row, first column from the right: 酒井かたばみ", ja: "右頁、三段目、右から一列目「酒井かたばみ」" }, read: "2026-11-26", measured: true },
  build(c) {
    sakaiKatabamiBuild(c, c.ring("ring-medium"));
  },
});

export const mitsuWariKatabami = defineCrest({
  id: "mitsu-wari-katabami",
  name: { en: "Three split wood-sorrel leaves", ja: "三つ割り片喰" },
  reading: "みつわりかたばみ",
  romaji: "mitsu wari katabami",
  frame: "none",
  motifs: [{ motif: "wood-sorrel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリかたばみ"],
  construction: { en: "Three heart-shaped leaves turn inward from round hearts along the enclosing circle. Cut-off petals show to either side of each leaf.", ja: "外周に沿う丸い中心から、ハート形の葉を三枚内側に向けます。各葉の両側に、円で切った花びらを見せます。" },
  measured: "The three hearts and the clipped side leaves repeat by thirds around the same circle.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, second row, first column from the right: 三ッワリかたばみ", ja: "右頁、二段目、右から一列目「三ッワリかたばみ」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuWariKatabamiBuild(c);
  },
});
