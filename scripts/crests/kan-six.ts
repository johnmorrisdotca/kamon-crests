import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kan-six.ts";
import { defineCrest } from "./util.ts";

export const mutsuKan = defineCrest({
  id: "mutsu-kan",
  name: { en: "Six curled bands", ja: "六つ環" },
  reading: "むつかん",
  romaji: "mutsu kan",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["六ッ環", "六つ鐶"],
  construction: {
    en: "Six compass bands turn about a common white middle. Each crowns towards the middle and opens outward, and ends in two rounded hooks that curl back towards the middle. The bands stand a sixth of a turn apart.",
    ja: "コンパスで六つの帯を描き、共通の白い中心のまわりに並べます。どの帯も丸い側を中心へ向け、開いた方を外へ向け、両端を丸く内へ巻き込みます。帯は六分の一回転ずつ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 27, place: { en: "left page, fourth row, second column counted from the right: 六ッ環 (six curled bands round a white middle; measured, and drawn with compass and ruler)", ja: "左頁、四段目、右から二列目「六ッ環」（白い中心のまわりの六つの巻いた帯。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell each band's crown is about 49 pixels in mid radius, with a band about 15 wide, and the six crowns' centres stand about 122 from the middle, the whole crest reaching about 160. Each band sweeps about 230 degrees and each end curls into a hook of about 11 radius. The printed bands are hand-spaced (the top band stands 40 left of the middle's line), and the drawing spaces them evenly.",
  build: drawn.mutsuKanBuild,
});
