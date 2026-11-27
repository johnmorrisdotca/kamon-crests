import { oriMatsubaBishiBuild, matsubaBishiBuild, itsutsuMatsubaBuild, maruNiHitotsuMatsubaBuild } from "./drawn/matsu-folded.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const oriMatsubaBishi = defineCrest({
  id: "ori-matsuba-bishi",
  name: { en: "Folded pine-needle lozenge", ja: "折り松葉菱" },
  reading: "おりまつばびし",
  romaji: "ori matsuba bishi",
  frame: "none",
  motifs: [{ motif: "pine", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["をり松葉びし"],
  construction: { en: "Two opposite pine-needle ends meet along the centre of a long ruled lozenge. A narrow division follows the horizontal axis.", ja: "向かい合う二本の松葉の先を、定規で引いた横長の菱形のまん中で合わせます。横の軸に細い空きを残します。" },
  measured: "The diamond is straight-sided, with a long doubled centre rule and a hooked pine-needle foot at each end.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, first row, third column from the right: をり松葉びし", ja: "右頁、一段目、右から三列目「をり松葉びし」" }, read: "2026-11-26", measured: true },
  build(c) {
    oriMatsubaBishiBuild(c);
  },
});

export const maruNiHitotsuMatsuba = defineCrest({
  id: "maru-ni-hitotsu-matsuba",
  name: { en: "Single pine needle in a ring", ja: "丸に一つ松葉" },
  reading: "まるにひとつまつば",
  romaji: "maru ni hitotsu matsuba",
  frame: "ring-medium",
  motifs: [{ motif: "pine", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ一ッまつ葉"],
  construction: { en: "A folded pine needle crosses a level shaft and continues to the lower-right ring. A flared foot sits at the left.", ja: "折った松葉が水平の軸を横切り、右下の輪まで続きます。左には広がった付け根を置きます。" },
  measured: "The printed shaft touches both sides of the ring. The raised fold and the descending continuation are set from their crossing and the point where the needle meets the ring.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, fourth row, second column from the right: 丸ニ一ッまつ葉", ja: "右頁、四段目、右から二列目「丸ニ一ッまつ葉」" }, read: "2026-11-27", measured: true },
  build: maruNiHitotsuMatsubaBuild,
});

export const matsubaBishi = defineCrest({
  id: "matsuba-bishi",
  name: { en: "Pine-needle lozenge", ja: "松葉菱" },
  reading: "まつばびし",
  romaji: "matsuba bishi",
  frame: "none",
  motifs: [{ motif: "pine", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["松葉ひし"],
  construction: { en: "Two opposed needle pairs cross above and below the middle of a broad leaf-shaped lozenge.", ja: "向かい合う二対の松葉を、横に広い菱形の上下で交差させます。" },
  measured: "Curved edges and two pairs of crossing tips separate this design from the folded ruled lozenge on the same page.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, third row, fourth column from the right: 松葉ひし", ja: "右頁、三段目、右から四列目「松葉ひし」" }, read: "2026-11-26", measured: true },
  build(c) {
    matsubaBishiBuild(c);
  },
});

export const itsutsuMatsuba = defineCrest({
  id: "itsutsu-matsuba",
  name: { en: "Five pine needles", ja: "五つ松葉" },
  reading: "いつつまつば",
  romaji: "itsutsu matsuba",
  frame: "none",
  motifs: [{ motif: "pine", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッまつ葉"],
  construction: { en: "Five hooked pine-needle feet stand at the points of a curved star. Five small openings form a flower in its centre.", ja: "弧で結んだ星の先に曲がった松葉の付け根を五つ置きます。まん中に小さな空きを五つ開け、花の形にします。" },
  measured: "A scalloped star edge links the five jointed tips, and five narrow petal-shaped gaps face out around the centre.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "right page, first row, fourth column from the right: 五ッまつ葉", ja: "右頁、一段目、右から四列目「五ッまつ葉」" }, read: "2026-11-26", measured: true },
  build(c) {
    itsutsuMatsubaBuild(c);
  },
});
