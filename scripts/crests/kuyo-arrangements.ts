import { kageKasaneKuyoBuild, oboroKuyoBuild, wariKuyoBuild } from "./drawn/kuyo-arrangements.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const oboroKuyo = defineCrest({
  id: "oboro-kuyo",
  name: { en: "Hazy nine luminaries", ja: "朧九曜" },
  reading: "おぼろくよう",
  romaji: "oboro kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 9, arrangement: "ring" }],
  families: [],
  aliases: ["おぼろ九よう"],
  source: cell(10, "right page, row 1, fourth column from the right: おぼろ九よう", "右頁、一段目、右から四列目「おぼろ九よう」"),
  measured: "Eight deeply cut bays leave narrow tips at the rim. The centre is a broad plain disc, separated from the carved field by a fine circular seam.",
  construction: {
    en: "Strike a central disc. Cut eight rounded bays into the outer field and leave a narrow white circle between that field and the centre.",
    ja: "中央の円を打ちます。外側の地を八か所丸く切り込み、地と中央の円の間に細い白い輪を残します。",
  },
  build: oboroKuyoBuild,
});

export const wariKuyo = defineCrest({
  id: "wari-kuyo",
  name: { en: "Divided nine luminaries", ja: "割九曜" },
  reading: "わりくよう",
  romaji: "wari kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 9, arrangement: "ring" }],
  families: [],
  aliases: ["割九よう"],
  source: cell(10, "right page, row 2, fourth column from the right: 割九よう", "右頁、二段目、右から四列目「割九よう」"),
  measured: "Eight rounded segments reach the outer circle. Their inner edges almost meet the central disc and leave small pointed white spaces between neighbours.",
  construction: {
    en: "Strike the middle disc. Strike eight circles around it and keep the portions inside the rim, with white spaces between the segments.",
    ja: "中央の円を打ちます。そのまわりに円を八つ打ち、外円の内側に入る部分を取り、となり同士の間を白く残します。",
  },
  build: wariKuyoBuild,
});

export const kageKasaneKuyo = defineCrest({
  id: "kage-kasane-kuyo",
  name: { en: "Overlapping outlined nine luminaries", ja: "陰重ね九曜" },
  reading: "かげかさねくよう",
  romaji: "kage kasane kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 9, arrangement: "ring" }],
  families: [],
  aliases: ["陰かさね九よう", "陰の重ね九曜"],
  source: cell(10, "right page, second row, third column from the right: 陰かさね九よう", "右頁、二段目、右から三列目「陰かさね九よう」"),
  measured: "The middle ring reaches about 73 pixels from its centre. The eight outer circles are about 54 pixels in radius and stand about 93 pixels from the middle. Narrow outlines cross in the same order around the centre. The character before かさね agrees with 陰 in 陰輪 on frame 15, right page, row 3, column 4.",
  construction: {
    en: "Strike eight outlined circles around a larger central outline. Leave each outer circle open behind the next one clockwise and behind the middle ring.",
    ja: "中央の大きな輪のまわりに、輪郭のある円を八つ打ちます。外の円は時計回りで次の円と中央の輪の下に隠れるところを白く残します。",
  },
  build: kageKasaneKuyoBuild,
});
