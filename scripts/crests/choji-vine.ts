import { SHINSEN_MONCHO } from "./books.ts";
import { futowaNiTsuruChojiBuild } from "./drawn/choji-vine.ts";
import { defineCrest } from "./util.ts";

export const futowaNiTsuruChoji = defineCrest({
  id: "futowa-ni-tsuru-choji",
  name: { en: "Vine cloves in a thick ring", ja: "太輪に蔓丁子" },
  reading: "ふとわにつるちょうじ",
  romaji: "futowa ni tsuru chōji",
  frame: "ring-thick",
  motifs: [{ motif: "clove", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["太ワニつる丁子", "蔓丁子"],
  construction: { en: "Three short cloves turn about a round hub inside a broad ring. Between them three thin vines leave the hub, and each parts into two tendrils that curl back.", ja: "太い輪の中で、丸い軸のまわりに短い丁子を三つ回します。その間に細い蔓を三本のばし、先を二つに分けて、それぞれ内側へ巻きます。" },
  measured: "The two circles of the ring, the hub, the buds, the petals and the reach and spread of the tendrils are measured from the cell. The ring is the cell's, 0.185 of the diameter. The three cloves and the three vines are exact thirds of a turn, and each tendril is two half circles.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, first row, fourth column from the right: 太ワニつる丁子", ja: "右頁、一段目、右から四列目「太ワニつる丁子」" }, read: "2026-11-28", measured: true },
  build: futowaNiTsuruChojiBuild,
});
