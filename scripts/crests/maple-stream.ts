import { SHINSEN_MONCHO } from "./books.ts";
import { tatsutagawaBuild } from "./drawn/maple-stream.ts";
import { defineCrest } from "./util.ts";

export const tatsutagawa = defineCrest({
  id: "tatsutagawa",
  name: { en: "Tatsuta River maple", ja: "立田川" },
  reading: "たつたがわ",
  romaji: "tatsutagawa",
  frame: "none",
  motifs: [
    { motif: "maple", count: 1, arrangement: "single" },
    { motif: "stream", count: 1, arrangement: "single" },
  ],
  families: [],
  aliases: ["竜田川", "龍田川"],
  construction: {
    en: "An angled maple leaf lies across three parallel bands of a stream. A shallow arc marks the leaf's foot, and the veins spread from the arc to its lobes. The stream turns through two round bends and opens into three ruled tails.",
    ja: "斜めを向いた紅葉を、水の曲がりの上に重ねます。葉の付け根には浅い弧を引き、そこから各裂片に葉脈を伸ばします。水は二か所で丸く折り返し、定規で引いた三本の流れになります。",
  },
  measured: "The print spans about 310 pixels and rises 250. The tallest maple lobe points up and right, and the leaf covers parts of all three stream bands. The water turns at the upper right and again at the lower left. The drawing regularises the bands and makes their overlap with the leaf clear.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, second row, first column from the right: 立田川", ja: "右頁、二段目、右から一列目「立田川」" }, read: "2026-11-26", measured: true },
  build: tatsutagawaBuild,
});
