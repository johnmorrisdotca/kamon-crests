import { uzumiKiriBuild, oribeKiriBuild, kokumochiGosanKiriBuild } from "./drawn/kiri-standing.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const uzumiKiri = defineCrest({
  id: "uzumi-kiri",
  name: { en: "Buried-flower paulownia", ja: "埋み桐" },
  reading: "うずみぎり",
  romaji: "uzumi giri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["うづみきり"],
  construction: { en: "Three large veined leaves fill the lower half, with three broad lobed flowers just above their round joint. Narrow cuts inside each blossom follow its ribs.", ja: "下に葉脈のある広い葉を三枚置き、丸い節のすぐ上に丸く刻んだ花を三つ並べます。それぞれの花に細い切れ目を入れて筋を表します。" },
  measured: "The three large flowers sit directly over the leaves where the ordinary paulownia has tall bud spikes. The central flower is slightly larger. The original paulownia leaf is reused.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, first row, first column from the right: うづみきり", ja: "左頁、一段目、右から一列目「うづみきり」" }, read: "2026-11-26", measured: true },
  build(c) {
    uzumiKiriBuild(c);
  },
});

export const oribeKiri = defineCrest({
  id: "oribe-kiri",
  name: { en: "Oribe paulownia", ja: "織部桐" },
  reading: "おりべぎり",
  romaji: "oribe giri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["織部きり"],
  construction: { en: "Three heavily veined leaves spread under three spikes of round-lobed flowers. The middle spike has seven flowers and each side has five.", ja: "葉脈を太く抜いた葉を三枚広げ、その上に丸い裂片をもつ花穂を三本立てます。中央には花を七つ、左右には五つずつ置きます。" },
  measured: "The top flowers and the paired florets have broader rounded outlines than the common five-seven paulownia. The left spike is a little taller than the right in the paper.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, third row, second column from the right: 織部きり", ja: "左頁、三段目、右から二列目「織部きり」" }, read: "2026-11-26", measured: true },
  build(c) {
    oribeKiriBuild(c);
  },
});

export const kokumochiGosanKiri = defineCrest({
  id: "kokumochi-gosan-no-kiri",
  name: { en: "Five-three-five paulownia on a black disc", ja: "石持ち五三桐" },
  reading: "こくもちごさんのきり",
  romaji: "kokumochi gosan no kiri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }, { motif: "black-disc", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["こくもち五三きり"],
  construction: { en: "The five-three-five paulownia opens in a solid disc. The flower stalks and scalloped leaves are cut out in white, leaving the veins dark.", ja: "黒い円から五三桐を白く抜きます。花の茎と丸く刻んだ葉を白くし、葉脈を黒く残します。" },
  measured: "The paper shows the white form reaching near the round field. The centred spike bears five flowers and each side spike three. The three leaves retain their dark veins.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, second row, second column from the right: こくもち五三きり", ja: "左頁、二段目、右から二列目「こくもち五三きり」" }, read: "2026-11-26", measured: true },
  build(c) {
    kokumochiGosanKiriBuild(c);
  },
});
