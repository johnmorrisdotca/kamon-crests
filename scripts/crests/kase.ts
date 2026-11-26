import { SHINSEN_MONCHO } from "./books.ts";
import { kaseBuild } from "./drawn/kase.ts";
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
