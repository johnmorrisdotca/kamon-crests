// The sword melon, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { kenUriBuild } from "./drawn/uri-swords.ts";
import { defineCrest } from "./util.ts";

export const kenUri = defineCrest({
  id: "ken-uri",
  name: { en: "Sword melon", ja: "剣瓜" },
  reading: "けんうり",
  romaji: "ken uri",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 5, arrangement: "radial" }, { motif: "karahana", count: 1, arrangement: "single" }, { motif: "sword", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["けん瓜", "sword uri", "five-lobed sword quince"],
  construction: {
    en: "Five melon lobes stand about a five-petalled flower, the first upright. Each lobe is the part of one circle between two ruled flanks from the middle, and a curled band lies inside it over a scalloped petal with a stamen. Between each pair of lobes a ruled sword blade runs out from the middle. It is a narrow wedge between the flanks, and beyond the lobes it widens to two shoulders and ends in a blunt point.",
    ja: "五枚の花びらの花のまわりに、瓜の裂片を五つ、一つ目を真上に向けて置きます。裂片は、中心から引いた二本の直線の間にある一つの円の部分で、その中に両端が巻いた帯を置き、帯の内側にしべのある丸いふくらみの花びらを置きます。裂片と裂片の間には、中心から直線の剣を伸ばします。剣は直線の間では細いくさび形で、裂片の外で両肩に広がり、鈍い剣先で終わります。",
  },
  measured: "Frame 28, with the sword points' reach as 100: each lobe opens about 27 degrees either side of its axis, and its cap is a circle of radius about 50 centred 47 out, so it reaches about 97. The curled band is about 5 wide on a circle of radius about 40 centred 28 out. The petals reach about 55, between flanks drawn one degree inside the lobes' so that the flower has its own ruled lines, and the heart is about 12 in radius. The swords stand 36 degrees off the lobes; their sloping ends meet the lobes about 18 either side and 89 out, and the shoulders are drawn under the lobes.",
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, fourth row, first column from the right: けん瓜", ja: "右頁、四段目、右から一列目「けん瓜」" }, read: "2026-11-28", measured: true },
  build: kenUriBuild,
});
