import { SHINSEN_MONCHO } from "./books.ts";
import { kakuKaseBuild, kaseBuild } from "./drawn/kase.ts";
import { defineCrest } from "./util.ts";

export const kase = defineCrest({
  id: "kase",
  name: { en: "Skein-winding frame", ja: "桛" },
  reading: "かせ",
  romaji: "kase",
  frame: "none",
  motifs: [{ motif: "skein-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["かせ", "綛"],
  construction: {
    en: "Two wide bars cross on the centre axes. Their central square has a smaller pierced square at each corner.",
    ja: "幅の広い二本の棒を中心の軸に沿って交差させます。中央の四角の四隅に、小さな四角を白く抜きます。",
  },
  measured: "The engraved outline is a cross with a nearly square envelope, arms of the same width and four square holes inset at its middle. The small holes share one width.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, fourth row, third column from the right: かせ", ja: "右頁、四段目、右から三列目「かせ」" }, read: "2026-11-26", measured: true },
  build: kaseBuild,
});

export const kakuKase = defineCrest({
  id: "kaku-kase",
  name: { en: "Square skein-winding frame", ja: "角桛" },
  reading: "かくかせ",
  romaji: "kaku kase",
  frame: "none",
  motifs: [{ motif: "skein-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["角かせ"],
  construction: {
    en: "A cross whose four arms end in crossbars, with a square ring set corner-up over it. Inside the ring the four corners between the arms are open.",
    ja: "四本の腕の先に横木をつけた十字に、角を上にした四角の輪を重ねます。輪の内側では、腕の間の四つの隅を白く抜きます。",
  },
  measured: "The book's frame, in its pixels from its middle: the ring's corners 111 to 116 out (113.75 on average) and its inside's 76 to 82.5 (79.4); the arms 37.5 and 34 wide (36.8); the crossbars from about 114 to 145 out and 147 to 157 long. The book's upright crossbars are a little thinner and shorter than its level ones; here all four are alike.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, first row, fourth column from the right: 角かせ", ja: "右頁、一段目、右から四列目「角かせ」" }, read: "2026-11-28", measured: true },
  build: kakuKaseBuild,
});
