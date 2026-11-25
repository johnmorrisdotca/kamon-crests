// Named variants of crests already drawn: a motif set inside a ring, or in other numbers, drawn by the motif's own construction.
import { RING_GAP } from "../construct/builder.ts";
import { asanohaBuild } from "./drawn/plain.ts";
import { kumaiZasaBuild } from "./drawn/sasa.ts";
import { uprightTakanohaBuild } from "./drawn/takanoha.ts";
import { myogaBuild } from "./drawn/myoga.ts";
import { tsutaBuild } from "./drawn/tsuta.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { futatsuBuild } from "./tomoe.ts";
import { defineCrest } from "./util.ts";

const READ_AT = "2026-11-25";

export const maruNiKumaiZasa = defineCrest({
  id: "maru-ni-kumai-zasa",
  name: { en: "Nine bamboo-grass leaves in a circle", ja: "丸に九枚笹" },
  reading: "まるにくまいざさ",
  romaji: "maru ni kumai-zasa",
  frame: "ring-medium",
  motifs: [{ motif: "bamboo-grass", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["bamboo leaves in a ring"],
  construction: {
    en: "The nine bamboo-grass leaves inside a ring about a tenth of the diameter thick, their tips a narrow white line from it.",
    ja: "直径の約10分の1の太さの輪の内側に、九枚笹を収め、葉の先を輪から細い白線一本分だけ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, fourth row, fourth column counted from the right (the leftmost): 丸に九枚笹", ja: "左頁、四段目、右から四列目（いちばん左）「丸に九枚笹」" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    kumaiZasaBuild(c, "bamboo-grass", inner - RING_GAP);
  },
});

export const maruNiTsuta = defineCrest({
  id: "maru-ni-tsuta",
  name: { en: "Ivy in a circle", ja: "丸に蔦" },
  reading: "まるにつた",
  romaji: "maru ni tsuta",
  frame: "ring-medium",
  motifs: [{ motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ivy in a ring"],
  construction: {
    en: "The ivy leaf inside a ring about a tenth of the diameter thick, a narrow white line between them.",
    ja: "直径の約10分の1の太さの輪の内側に、蔦の葉を収め、輪とのあいだに細い白線を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "left page, fourth row, first column counted from the right: 丸に蔦", ja: "左頁、四段目、右から一列目「丸に蔦」" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    tsutaBuild(c, "ivy", inner - 8);
  },
});

export const maruNiDakiMyoga = defineCrest({
  id: "maru-ni-daki-myoga",
  name: { en: "Embracing myoga in a circle", ja: "丸に抱き茗荷" },
  reading: "まるにだきみょうが",
  romaji: "maru ni daki myōga",
  frame: "ring-medium",
  motifs: [{ motif: "ginger", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["embracing ginger in a ring"],
  construction: {
    en: "The two buds inside a ring about a tenth of the diameter thick, their backs a narrow white line from it.",
    ja: "直径の約10分の1の太さの輪の内側に、二つのつぼみを収め、背中を輪から細い白線一本分だけ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, fourth row, third column counted from the right: だきめうが, drawn inside a ring", ja: "右頁、四段目、右から三列目「だきめうが」（輪に入った形）" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    myogaBuild(c, "ginger", inner - RING_GAP);
  },
});

export const maruNiAsaNoHa = defineCrest({
  id: "maru-ni-asa-no-ha",
  name: { en: "Hemp leaf in a circle", ja: "丸に麻の葉" },
  reading: "まるにあさのは",
  romaji: "maru ni asa no ha",
  frame: "ring-medium",
  motifs: [{ motif: "hemp-leaf", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["asanoha in a ring"],
  construction: {
    en: "The six-pointed hemp-leaf star inside a ring about a tenth of the diameter thick, its points a narrow white line from it.",
    ja: "直径の約10分の1の太さの輪の内側に、六つの先を持つ麻の葉を収め、先を輪から細い白線一本分だけ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 35, place: { en: "right page, third row, first column counted from the right: 丸に麻の葉", ja: "右頁、三段目、右から一列目「丸に麻の葉」" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    asanohaBuild(c, "hemp-leaf", inner - RING_GAP);
  },
});

export const maruNiHidariFutatsuTomoe = defineCrest({
  id: "maru-ni-hidari-futatsu-tomoe",
  name: { en: "Left two-comma tomoe in a circle", ja: "丸に左二つ巴" },
  reading: "まるにひだりふたつどもえ",
  romaji: "maru ni hidari futatsudomoe",
  frame: "ring-medium",
  motifs: [{ motif: "tomoe", count: 2, arrangement: "radial", turn: "left" }],
  families: [],
  aliases: ["futatsudomoe in a ring"],
  construction: {
    en: "The two-comma tomoe laid out in the room inside a ring about a tenth of the diameter thick, a narrow white line between them.",
    ja: "直径の約10分の1の太さの輪の内側に、細い白線を残して二つ巴を割り付けます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "right page, fourth row, first column counted from the right: 丸に二ツともゑ", ja: "右頁、四段目、右から一列目「丸に二ツともゑ」" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    futatsuBuild(c, false, inner - RING_GAP);
  },
});

export const maruNiHitotsuTakanoha = defineCrest({
  id: "maru-ni-hitotsu-takanoha",
  name: { en: "One hawk feather in a circle", ja: "丸に一つ鷹の羽" },
  reading: "まるにひとつたかのは",
  romaji: "maru ni hitotsu takanoha",
  frame: "ring-medium",
  motifs: [{ motif: "hawk-feather", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["single hawk feather in a ring"],
  construction: {
    en: "One hawk feather standing upright, tip up, inside a ring about a tenth of the diameter thick: the feather of the crossed pair, turned to stand.",
    ja: "直径の約10分の1の太さの輪の内側に、鷹の羽を一枚、先を上にして立てます。羽は違い鷹の羽の一枚を、立てたものです。",
  },
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, second row, second column counted from the right: 丸に一本鷹", ja: "右頁、二段目、右から二列目「丸に一本鷹」" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    uprightTakanohaBuild(c, inner - RING_GAP, 1, [0]);
  },
});

export const maruNiNarabiTakanoha = defineCrest({
  id: "maru-ni-narabi-takanoha",
  name: { en: "Two hawk feathers side by side in a circle", ja: "丸に並び鷹の羽" },
  reading: "まるにならびたかのは",
  romaji: "maru ni narabi takanoha",
  frame: "ring-medium",
  motifs: [{ motif: "hawk-feather", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["two upright hawk feathers in a ring"],
  construction: {
    en: "Two hawk feathers standing upright side by side, tips up, inside a ring about a tenth of the diameter thick, each the feather of the crossed pair, turned to stand.",
    ja: "直径の約10分の1の太さの輪の内側に、鷹の羽を二枚、先を上にして並べて立てます。羽はどちらも、違い鷹の羽の一枚を立てたものです。",
  },
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, second row, first column counted from the right: 丸に二本鷹", ja: "右頁、二段目、右から一列目「丸に二本鷹」" }, read: READ_AT, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    uprightTakanohaBuild(c, inner - RING_GAP, 0.85, [-30, 30]);
  },
});

