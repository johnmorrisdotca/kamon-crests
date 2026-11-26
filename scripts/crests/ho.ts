import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiHoBuild } from "./drawn/ho.ts";
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
    ja: "水平な帆桁から帆を垂らします。ふくらむ布に沿って縫い目を二本入れ、帆桁と帆柱の上端を直線で結びます。",
  },
  measured: "The printed yard spans about three fifths of the outer ring; the drawn yard is narrower. The tip of the sail sweeps right, with two curved seams down its face. The frame takes the standard catalogue ring.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, fourth row, first column from the right: 丸に帆", ja: "左頁、四段目、右から一列目「丸に帆」" }, read: "2026-11-26", measured: true },
  build: maruNiHoBuild,
});
