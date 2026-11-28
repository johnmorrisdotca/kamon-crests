import { RING_GAP } from "../construct/builder.ts";
import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { narabiTakanohaRowBuild, radialHawkFeathersBuild, threeCrossedHawkFeathersBuild } from "./drawn/takanoha.ts";
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

export const maruNiSanmaiTakanoha = defineCrest({
  id: "maru-ni-sanmai-takanoha",
  name: { en: "Three hawk feathers in a circle", ja: "丸に三枚鷹の羽" },
  reading: "まるにさんまいたかのは",
  romaji: "maru ni sanmai takanoha",
  frame: "ring-medium",
  motifs: [{ motif: "hawk-feather", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸に三枚たか"],
  construction: {
    en: "One feather stands upright over a round pierced hub. Two matching feathers open below it at equal angles inside the ring, each ruled shaft dividing a round-ended vane.",
    ja: "穴のある丸い中心の上に一枚の羽を立て、下の二枚を左右同じ角度に開きます。輪の中で羽の両端を丸くし、軸をまっすぐ通します。",
  },
  measured: "The vanes extend out from a round hub in three directions spaced 120 degrees apart. The three oval ends keep an even white clearance inside the ring.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, second row, third column from the right: 丸に三枚たか", ja: "右頁、二段目、右から三列目「丸に三枚たか」" }, read: READ, measured: true },
  build(c) {
    radialHawkFeathersBuild(c, c.ring("ring-medium") - RING_GAP, 3);
  },
});

export const sanbonNarabiTakanoha = defineCrest({
  id: "sanbon-narabi-takanoha",
  name: { en: "Three hawk feathers side by side", ja: "三本並び鷹の羽" },
  reading: "さんぼんならびたかのは",
  romaji: "sanbon narabi taka no ha",
  frame: "none",
  motifs: [{ motif: "hawk-feather", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三本ならび鷹", "three upright hawk feathers"],
  construction: {
    en: "Three long hawk feathers stand upright side by side, tips up, a narrow white apart. Each has round ends, a shaft that runs out past the quill end with a white line each side, two bars of three shallow white chevrons, and arcs of down round the quill end.",
    ja: "長い鷹の羽を三枚、先を上にして細い白をあけて並べて立てます。羽の両端は丸く、羽軸は根元の先まで出し、両側に白い線を入れます。浅い白の山形を三本ずつ二か所に入れ、根元の丸みに沿って産毛の線を描きます。",
  },
  measured: "The book's three feathers, in its pixels: 81 to 90 wide, 86 on average, which is the crossed pair's feather's width; from the tip to the end of the quill 231 to 243, 236 on average, the outer arc of down round the quill about 230 below the tip. The middles of the two bars of chevrons stand 59 and 150 below the tip, their lines 12 apart along the shaft, and their arms rise about 0.62 along the shaft for each unit out, shallower than the crossed pair's half right angle. The feathers stand 97.8 apart, so neighbours are about 11 apart at their edges. The quill's down is the crossed pair's.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, third row, third column from the right: 三本ならび鷹", ja: "右頁、三段目、右から三列目「三本ならび鷹」" }, read: "2026-11-28", measured: true },
  build(c) {
    narabiTakanohaRowBuild(c, R);
  },
});
