import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/china-pink.ts";
import { defineCrest } from "./util.ts";

export const sekichiku = defineCrest({
  id: "sekichiku",
  name: { en: "China pink", ja: "石竹" },
  reading: "せきちく",
  romaji: "sekichiku",
  frame: "none",
  motifs: [{ motif: "china-pink", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["せきちく"],
  construction: {
    en: "Five broad serrated petals surround a round heart. Each petal has a straight vein, curved veins on either side and a narrow white division from the next petal.",
    ja: "丸い花芯のまわりに、縁に刻みのある幅広い花弁を五枚並べます。各花弁にはまっすぐな中筋と両側の弧の筋を入れ、隣の花弁と細い白線で分けます。",
  },
  measured: "The printed bloom spans about 310 pixels, with a heart of about 45 pixels. The drawing gives all five petals equal turns and opens their dark printed veins as white cuts.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, third row, third column from the right: せきちく", ja: "右頁、三段目、右から三列目「せきちく」" }, read: "2026-11-26", measured: true },
  build: drawn.sekichikuBuild,
});

export const maruNiSekichiku = defineCrest({
  id: "maru-ni-sekichiku",
  name: { en: "China pink in a circle", ja: "丸に石竹" },
  reading: "まるにせきちく",
  romaji: "maru ni sekichiku",
  frame: "ring-medium",
  motifs: [{ motif: "china-pink", count: 1, arrangement: "single" }],
  families: [],
  aliases: [],
  construction: {
    en: "The five-petal China pink is set inside a circle. The serrated edge stands a small distance inside the rim.",
    ja: "五枚花弁の石竹を丸輪に収めます。花弁の刻みは輪の内側に小さな間を空けて並びます。",
  },
  measured: "The source ring surrounds the same five-petal flower as the plain cell. The drawing uses the standard medium ring and gives the tooth tips a narrow, even clearance.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, fourth row, third column from the right: 丸に石竹", ja: "右頁、四段目、右から三列目「丸に石竹」" }, read: "2026-11-26", measured: true },
  build: drawn.maruSekichikuBuild,
});

export const nozokiSekichiku = defineCrest({
  id: "nozoki-sekichiku",
  name: { en: "Peeping China pink", ja: "覗き石竹" },
  reading: "のぞきせきちく",
  romaji: "nozoki sekichiku",
  frame: "ring-thin",
  motifs: [{ motif: "china-pink", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["のぞき石竹"],
  construction: {
    en: "Three toothed petals rise from part of a flower heart at the foot of a circle. Long white veins fan upwards into the petals.",
    ja: "輪の底に見える花芯から、縁に刻みのある花弁を三枚立てます。長い白い筋を花弁に向けて扇状に広げます。",
  },
  measured: "The printed circle is about 310 pixels across. It holds the top of a bloom about 125 pixels tall at the foot. The drawing makes the three crowns bilateral and clips the heart to a narrow clearance inside the ring.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, fourth row, fourth column from the right: のぞき石竹", ja: "右頁、四段目、右から四列目「のぞき石竹」" }, read: "2026-11-26", measured: true },
  build: drawn.nozokiSekichikuBuild,
});

export const mitsuWariSekichiku = defineCrest({
  id: "mitsu-wari-sekichiku",
  name: { en: "Three-part China pink", ja: "三つ割り石竹" },
  reading: "みつわりせきちく",
  romaji: "mitsu wari sekichiku",
  frame: "none",
  motifs: [{ motif: "china-pink", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリ石竹"],
  construction: {
    en: "Three fan-shaped sections turn from the rim toward the centre. A half heart sits at the outside of each fan, with long curved veins and a toothed division.",
    ja: "外周から中心へ向けて、扇形の花弁の区画を三つ回して置きます。各区画の外側に半分の花芯を置き、長い弧の筋と刻みの境を入れます。",
  },
  measured: "Three cropped hearts sit at the rim of the printed cell and their fans meet along serrated divides. The drawing uses equal turns and gives the dividing lines wider, even clearance.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, third row, fourth column from the right: 三ッワリ石竹", ja: "右頁、三段目、右から四列目「三ッワリ石竹」" }, read: "2026-11-26", measured: true },
  build: drawn.mitsuWariSekichikuBuild,
});

export const fusenSekichiku = defineCrest({
  id: "fusen-sekichiku",
  name: { en: "Floating-line China pink", ja: "浮線石竹" },
  reading: "ふせんせきちく",
  romaji: "fusen sekichiku",
  frame: "none",
  motifs: [{ motif: "china-pink", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ふせん石竹"],
  construction: {
    en: "Two serrated wings sweep up around a toothed flower and a pair of curled tips. A round heart and the smaller lower wings complete the upright composition.",
    ja: "刻みのある両翼を、花弁と一対の巻いた先端の両側から上へ伸ばします。丸い花芯と下の小さい両翼を添えます。",
  },
  measured: "The printed curling tips sit in a long white opening above a low round heart. The top wings keep that opening, and the lower wings use a more angular version of the printed profile.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, first row, fourth column from the right: ふせん石竹", ja: "右頁、一段目、右から四列目「ふせん石竹」" }, read: "2026-11-26", measured: true },
  build: drawn.fusenSekichikuBuild,
});
