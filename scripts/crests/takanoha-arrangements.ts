import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { radialHawkFeathersBuild } from "./drawn/takanoha.ts";
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
