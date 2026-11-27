import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { radialHawkFeathersBuild, threeCrossedHawkFeathersBuild } from "./drawn/takanoha.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const yatsuTakanoha = defineCrest({
  id: "yatsu-takanoha",
  name: { en: "Eight hawk feathers", ja: "八つ鷹の羽" },
  reading: "やつたかのは",
  romaji: "yatsu taka no ha",
  frame: "none",
  motifs: [{ motif: "hawk-feather", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["八ッたかの羽"],
  construction: {
    en: "Eight crowned feathers radiate from one small disc. The vane tips stand on the outer circle, with an even opening between neighbouring feathers as they approach the hub.",
    ja: "小さな円から八枚の鷹の羽を放射状に置きます。丸い羽先を外周にそろえ、中心に近づくところでは隣の羽との間に白を残します。",
  },
  measured: "The top feather is upright and the remaining axes follow at equal eighth turns. The printed quills crowd each other near the hub, where a thin white seam keeps the eight placements readable.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, first row, third column from the right: 八ッたかの羽", ja: "右頁、一段目、右から三列目「八ッたかの羽」" }, read: READ, measured: true },
  build(c) {
    radialHawkFeathersBuild(c, R, 8);
  },
});

export const sanmaiChigaiTakanoha = defineCrest({
  id: "sanmai-chigai-takanoha",
  name: { en: "Three crossed hawk feathers", ja: "三枚違い鷹の羽" },
  reading: "さんまいちがいたかのは",
  romaji: "sanmai chigai takanoha",
  frame: "none",
  motifs: [{ motif: "hawk-feather", count: 3, arrangement: "crossed" }],
  families: [],
  aliases: ["三枚ちがひ鷹"],
  construction: {
    en: "One feather stands upright above an inclined pair. Each vane ends in two compass rounds and has a white line on either side of its shaft. The white parting at the crossing shows which feather is in front.",
    ja: "二枚の斜めの羽の前に一枚を立てます。羽の両端は円弧とし、羽軸の左右に白い筋を入れます。交差に細い白を残して前後を示します。",
  },
  measured: "The vertical feather occupies the centre and reaches both ends of the layout. The two diagonal axes, balanced from the print, slope 24 degrees from horizontal.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, first row, fourth column from the right: 三枚ちがひ鷹", ja: "右頁、一段目、右から四列目「三枚ちがひ鷹」" }, read: READ, measured: true },
  build(c) {
    threeCrossedHawkFeathersBuild(c, R);
  },
});
