import { uzumiKiriBuild, oribeKiriBuild, kiriBishiBuild } from "./drawn/kiri-standing.ts";
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

export const kiriBishi = defineCrest({
  id: "kiri-bishi",
  name: { en: "Paulownia lozenge", ja: "桐菱" },
  reading: "きりびし",
  romaji: "kiri bishi",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["桐びし"],
  construction: {
    en: "Spread two veined leaves to the sides and point the third down. Three broad clusters of flowers rise behind the joint and form the upper sides of a lozenge.",
    ja: "葉脈のある葉を左右に広げ、三枚目を下に向けます。葉の付け根の後ろに幅広い花の房を三つ立て、菱の上辺をつくります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, fourth row, third column from the right: 桐びし", ja: "左頁、四段目、右から三列目「桐びし」" }, read: "2026-11-27", measured: true },
  build: kiriBishiBuild,
});
