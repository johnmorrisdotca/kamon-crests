import { cell } from "./kaku-meyui.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiKumiawaseIgetaBuild, yotsumeIBuild, itsutsuKarakanNiIgetaBuild } from "./drawn/well-lattice.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const maruNiKumiawaseIgeta = defineCrest({
  id: "maru-ni-kumiawase-igeta",
  name: { en: "Combined well frames in a circle", ja: "丸に組合せ井桁" },
  reading: "まるにくみあわせいげた",
  romaji: "maru ni kumiawase igeta",
  frame: "ring-medium",
  motifs: [{ motif: "well-frame", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["丸に組合いげた"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, fourth row, third column from the right: 丸に組合いげた", ja: "右頁、四段目、右から三列目「丸に組合いげた」" }, read: READ, measured: true },
  measured: "Three enclosed central lozenges and the open lower notch fit inside the ring. Exposed crossing ends project around the outline. The two ruled directions are mirrored on the upright axis.",
  construction: {
    en: "Rule three beams in each of two crossing directions. Shorten the two beams beside the open lower eye and leave the projecting ends outside the other three eyes. Strike the ring around the lattice.",
    ja: "交わる二方向に三本ずつ梁を引きます。下の開いた目に沿う二本を短くし、残る三つの目の外に梁の端を突き出します。そのまわりに輪を打ちます。",
  },
  build: maruNiKumiawaseIgetaBuild,
});

export const yotsumeI = defineCrest({
  id: "yotsume-i",
  name: { en: "Four-eyed well curb", ja: "四つ目井" },
  reading: "よつめい",
  romaji: "yotsume i",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["四ッ目井"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "left page, fourth row, first column from the right: 四ッ目井", ja: "左頁、四段目、右から一列目「四ッ目井」" }, read: READ, measured: true },
  measured: "Four openings at the tips of a broad diamond connect to the edge by narrow slots. The diagonal divisions stop short of the small central eye, which remains enclosed.",
  construction: {
    en: "Rule the four sides of a square on its corner. Cut a slot between each adjacent pair of quarter sections. Rule an eye and its opening in each outer point, and one small closed eye in the centre.",
    ja: "隅立ての正方形を引き、となり合う区画の間に切れ目を入れます。四つの外側の角には開いた目を一つずつ、中央には閉じた小さな目を一つ引きます。",
  },
  build: yotsumeIBuild,
});

export const itsutsuKarakanNiIgeta = defineCrest({
  id: "itsutsu-karakan-ni-igeta",
  name: { en: "Well frame inside five curled bands", ja: "五つ唐鐶に井桁" },
  reading: "いつつからかんにいげた",
  romaji: "itsutsu karakan ni igeta",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 1, arrangement: "single" }, { motif: "curled-band", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッ唐環井げた", "五つ唐環井桁"],
  source: cell(27, "left page, first row, third column from the right: 五ッ唐環井げた", "左頁、一段目、右から三列目「五ッ唐環井げた」"),
  measured: "Five rounded arches make a continuous scalloped band about 294 pixels across. The ends curl inward and the outer shoulders meet. The well lattice inside is about 207 pixels wide and 151 high, with a lozenge opening about a quarter of its width. The drawing makes the five placements equal and retains the wide lattice.",
  construction: {
    en: "Rule four sloping bars around a central lozenge. Set five arches with inward-curled ends around the lattice and join their outer shoulders into one scalloped band.",
    ja: "中央の菱を囲む四本の斜めの梁を引きます。両端を内へ巻いた弧を五つ井桁のまわりに並べ、となり合う弧の外側をつないで波形の帯にします。",
  },
  build: itsutsuKarakanNiIgetaBuild,
});
