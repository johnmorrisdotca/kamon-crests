import { SHINSEN_MONCHO } from "./books.ts";
import { ioriBuild } from "./drawn/iori.ts";
import { defineCrest } from "./util.ts";

export const iori = defineCrest({
  id: "iori",
  name: { en: "Hermitage", ja: "庵" },
  reading: "いおり",
  romaji: "iori",
  frame: "none",
  motifs: [{ motif: "hermitage", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["いほり"],
  construction: {
    en: "Two ruled slopes meet on the centre line above a level eave. Two rectangular posts descend to a common level, leaving the space under the roof open.",
    ja: "定規で引いた二本の斜線を、水平な軒の上の中心線で合わせます。二本の長方形の柱を同じ高さまで下ろし、屋根の下に空きを残します。",
  },
  measured: "In the cell the eave is about 295 pixels across and the peak rises 98 above it. The posts are about 48 pixels wide and 103 high, their inner edges about 94 pixels apart. At an eave of 192, the roof rises 64 and the two posts are each 32 wide and 67 high with 60 between them. The print's slightly off-centre peak and leaning posts are set square and symmetric.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 7,
    place: { en: "left page, fourth row, second column from the right: いほり", ja: "左頁、四段目、右から二列目「いほり」" },
    read: "2026-11-26",
    measured: true,
  },
  build: ioriBuild,
});
