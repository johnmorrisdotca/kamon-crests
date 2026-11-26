import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/tea-fruit.ts";
import { defineCrest } from "./util.ts";

export const mukoChaNoMi = defineCrest({
  id: "muko-cha-no-mi",
  name: { en: "Front-facing tea fruit", ja: "向こう茶の実" },
  reading: "むこうちゃのみ",
  romaji: "muko cha no mi",
  frame: "none",
  motifs: [{ motif: "tea-fruit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["むかふ茶のみ"],
  construction: {
    en: "Three pointed leaves show behind a round tea fruit. Each has a straight white vein. Six short rays extend from the small round mark on the face of the fruit.",
    ja: "丸い茶の実の後ろに先の尖った葉を三枚置き、それぞれにまっすぐな白い筋を入れます。実の表の小さな丸からは短い線を六本伸ばします。",
  },
  measured: "The printed fruit is about 160 pixels across and sits over three leaves on a triangular layout. The drawing gives the leaves equal turns, makes the central fruit somewhat broader and opens a white clearance around it.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, second row, third column from the right: むかふ茶のみ", ja: "左頁、二段目、右から三列目「むかふ茶のみ」" }, read: "2026-11-26", measured: true },
  build: drawn.mukoTeaFruitBuild,
});

export const hitotsuChaNoMi = defineCrest({
  id: "hitotsu-cha-no-mi",
  name: { en: "One tea fruit", ja: "一つ茶の実" },
  reading: "ひとつちゃのみ",
  romaji: "hitotsu cha no mi",
  frame: "none",
  motifs: [{ motif: "tea-fruit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["一ッ茶のみ"],
  construction: {
    en: "Two pointed leaves spread from an upright stem. The fruit above has a rounded cap and three white arches on its face.",
    ja: "立った茎から先の尖った葉を二枚広げます。その上に丸いふくらみのある実を置き、表に三本の白い弧を入れます。",
  },
  measured: "The printed fruit is about 205 pixels wide. The leaves stretch to either side and the stem has a slightly flared foot. The drawing balances the two halves and uses white cuts for the three inked arches.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, fourth row, second column from the right: 一ッ茶のみ", ja: "左頁、四段目、右から二列目「一ッ茶のみ」" }, read: "2026-11-26", measured: true },
  build: drawn.hitotsuTeaFruitBuild,
});
