import { maruNiHitotsuChojiBuild, kenNiMitsuChojiBuild, mitsuChojiBuild, itsutsuChojiBuild, sumitateYotsuChojiBuild, itowaNiChojiGurumaBuild } from "./drawn/choji-spokes.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const maruNiHitotsuChoji = defineCrest({
  id: "maru-ni-hitotsu-choji",
  name: { en: "One clove in a ring", ja: "丸に一つ丁子" },
  reading: "まるにひとつちょうじ",
  romaji: "maru ni hitotsu chōji",
  frame: "ring-medium",
  motifs: [{ motif: "clove", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ一ッ丁子"],
  construction: { en: "One pointed clove bud stands upright in its circular frame.", ja: "丸い輪の中に、先のとがった丁子を一つ立てます。" },
  measured: "The exact source includes the ring, and the published plain drawing supplies the same three-petal bud.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, first row, first column from the right: 丸ニ一ッ丁子", ja: "右頁、一段目、右から一列目「丸ニ一ッ丁子」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiHitotsuChojiBuild(c);
  },
});

export const itowaNiChojiGuruma = defineCrest({
  id: "itowa-ni-choji-guruma",
  name: { en: "Clove wheel in a thread ring", ja: "糸輪に丁子車" },
  reading: "いとわにちょうじぐるま",
  romaji: "itowa ni chōji guruma",
  frame: "ring-thread",
  motifs: [{ motif: "clove", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワニ丁子くるま"],
  construction: { en: "Three large cloves fan downward from a round joint. Three smaller buds rise from the joint and the two side cloves inside a thread ring.", ja: "丸い節から大きな丁子三つを下へ開きます。節と両脇の丁子から小さなつぼみを三つ立て、糸輪の内側に収めます。" },
  measured: "The cell sets the scale of the lower fan, the two smaller side buds and the upper central bud. Short ruled stems connect each side bud to the fan.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, first row, second column from the right: 糸ワニ丁子くるま", ja: "右頁、一段目、右から二列目「糸ワニ丁子くるま」" }, read: "2026-11-27", measured: true },
  build: itowaNiChojiGurumaBuild,
});

export const kenNiMitsuChoji = defineCrest({
  id: "ken-ni-mitsu-choji",
  name: { en: "Three cloves and swords", ja: "剣に三つ丁子" },
  reading: "けんにみつちょうじ",
  romaji: "ken ni mitsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 3, arrangement: "radial" }, { motif: "sword", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["釼ニ三ッ丁子"],
  construction: { en: "Three cloves and three flared blades alternate round a small joint.", ja: "丁子三つと先の広がった剣三本を、小さな節のまわりに交互に置きます。" },
  measured: "The curled petals and the flared ends alternate. The widths of the three printed blades differ a little.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, first row, third column from the right: 釼ニ三ッ丁子", ja: "右頁、一段目、右から三列目「釼ニ三ッ丁子」" }, read: "2026-11-26", measured: true },
  build(c) {
    kenNiMitsuChojiBuild(c);
  },
});

export const mitsuChoji = defineCrest({
  id: "mitsu-choji",
  name: { en: "Three cloves", ja: "三つ丁子" },
  reading: "みつちょうじ",
  romaji: "mitsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッちやうじ"],
  construction: { en: "Three pointed buds meet at their narrow ends and turn the petals outward.", ja: "とがった丁子を細い先で三つ合わせ、花びらを外へ向けます。" },
  measured: "The three buds meet at a point without a separate round joint.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, third row, third column from the right: 三ッちやうじ", ja: "右頁、三段目、右から三列目「三ッちやうじ」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuChojiBuild(c);
  },
});

export const itsutsuChoji = defineCrest({
  id: "itsutsu-choji",
  name: { en: "Five cloves", ja: "五つ丁子" },
  reading: "いつつちょうじ",
  romaji: "itsutsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッちやうじ"],
  construction: { en: "Five clove buds radiate from a round joint, with three small lobes at each outer tip.", ja: "五つの丁子を丸い節から外へ向け、先に小さな裂片を三つずつ置きます。" },
  measured: "The five buds form an open rosette with a separate circular hub.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, second row, fourth column from the right: 五ッちやうじ", ja: "右頁、二段目、右から四列目「五ッちやうじ」" }, read: "2026-11-26", measured: true },
  build(c) {
    itsutsuChojiBuild(c);
  },
});

export const sumitateYotsuChoji = defineCrest({
  id: "sumitate-yotsu-choji",
  name: { en: "Four cloves in a corner-up layout", ja: "隅立て四つ丁子" },
  reading: "すみたてよつちょうじ",
  romaji: "sumitate yotsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["角立四ッ丁子"],
  construction: { en: "Four clove buds face the four corners of a standing lozenge.", ja: "四つの丁子を、隅を立てた菱形の四隅へ向けます。" },
  measured: "The four buds reach the top, sides and bottom, around a small centre.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, second row, second column from the right: 角立四ッ丁子", ja: "左頁、二段目、右から二列目「角立四ッ丁子」" }, read: "2026-11-26", measured: true },
  build(c) {
    sumitateYotsuChojiBuild(c);
  },
});
