import { SHINSEN_MONCHO } from "./books.ts";
import { yotsumeHanabishiBuild } from "./drawn/hanabishi-eyes.ts";
import { defineCrest } from "./util.ts";

export const yotsumeHanabishi = defineCrest({
  id: "yotsume-hanabishi",
  name: { en: "Four-eye flower lozenge", ja: "四つ目花菱" },
  reading: "よつめはなびし",
  romaji: "yotsume hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["四ッ目花びし"],
  construction: {
    en: "Four pointed petals meet around a narrow diagonal cross. A small white eye narrows toward the centre inside each petal.",
    ja: "細い斜めの十字をはさんで、とがった花びらを四枚置きます。それぞれの中の小さな白い目は、中心へ向かって細くなります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, third row, fourth column from the right: 四ッ目花びし", ja: "左頁、三段目、右から四列目「四ッ目花びし」" }, read: "2026-11-27", measured: true },
  measured: "The pointed end, shoulders and slim drawn eye follow the upper petal in frame 8. The two diagonal edges leave a little over four units of white between the petals. Four equal turns regularise the outline.",
  build: yotsumeHanabishiBuild,
});
