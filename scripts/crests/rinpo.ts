import { SHINSEN_MONCHO } from "./books.ts";
import { rinpoBuild } from "./drawn/rinpo.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";
const PART = "dharma-wheel";

export const rinpoKuzushi = defineCrest({
  id: "rinpo-kuzushi",
  name: { en: "Altered Dharma wheel", ja: "輪宝崩し" },
  reading: "りんぽうくずし",
  romaji: "rinpo kuzushi",
  frame: "none",
  motifs: [{ motif: PART, count: 1, arrangement: "single" }],
  families: [],
  aliases: ["りんぼうくづし", "輪宝くづし"],
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, first row, first column from the right: りんぼうくづし", ja: "左頁、一段目、右から一列目「りんぼうくづし」" }, read: READ, measured: true },
  measured: "Eight narrow spokes flare to meet a broad rim. Eight small circular perforations sit on their axes inside it. Eight large pointed tips alternate with smaller tips along the outside.",
  construction: {
    en: "Strike the hub and rim and divide them into eight positions. Rule each spoke and strike its curved shoulders. Add alternating large and small outer points and a small round opening at each large point.",
    ja: "軸と輪を打ち、八等分します。輻を直線で引き、外で広がる肩を弧で打ちます。外には大小のとがりを交互に置き、大きいとがりの根に丸い小穴を開けます。",
  },
  build(c) { rinpoBuild(c, { spokes: 8, between: 1, hub: 13, cheek: 13.8, beaded: true }); },
});

export const mutsuRinpoKuzushi = defineCrest({
  id: "mutsu-rinpo-kuzushi",
  name: { en: "Six-spoked altered Dharma wheel", ja: "六つ輪宝崩し" },
  reading: "むつりんぽうくずし",
  romaji: "mutsu rinpo kuzushi",
  frame: "none",
  motifs: [{ motif: PART, count: 1, arrangement: "single" }],
  families: [],
  aliases: ["六ッりんぼうくづし", "六ッ輪宝くづし"],
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, second row, first column from the right: 六ッりんぼうくづし", ja: "左頁、二段目、右から一列目「六ッりんぼうくづし」" }, read: READ, measured: true },
  measured: "Six stems carry broad sides from a small hub into the circular rim. Two small tips lie between each pair of large terminals around the rim.",
  construction: {
    en: "Divide the rim into six. Set one curved shoulder and ruled stem on each radius. Rule the six large tips with two smaller ones between each pair.",
    ja: "輪を六等分し、各半径に直線の輻と弧の肩を置きます。六つの大きいとがりを引き、その間に小さいとがりを二つずつ置きます。",
  },
  build(c) { rinpoBuild(c, { spokes: 6, between: 2, hub: 14, cheek: 18 }); },
});

export const itsutsuRinpo = defineCrest({
  id: "itsutsu-rinpo",
  name: { en: "Five-spoked Dharma wheel", ja: "五つ輪宝" },
  reading: "いつつりんぽう",
  romaji: "itsutsu rinpo",
  frame: "none",
  motifs: [{ motif: PART, count: 1, arrangement: "single" }],
  families: [],
  aliases: ["五ッりんぼう", "五ッ輪宝"],
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, fourth row, first column from the right: 五ッりんぼう", ja: "左頁、四段目、右から一列目「五ッりんぼう」" }, read: READ, measured: true },
  measured: "Five spokes widen as they reach the rim, each aimed at one of the five large terminals. Two smaller terminals fill each space between them.",
  construction: {
    en: "Strike the centre and the two edges of a rim. Set five equal flared spokes between them. Around the outer edge, rule one large tip above each spoke and two small tips between them.",
    ja: "軸と輪の内外二つの円を打ちます。その間に外で広がる輻を五本、等間隔に置きます。輪の外では各輻の先に大きいとがりを一つ、その間に小さいとがりを二つずつ引きます。",
  },
  build(c) { rinpoBuild(c, { spokes: 5, between: 2, hub: 13.5, cheek: 23 }); },
});
