import { tsuruGashiwaBuild, imoKashiwaBuild, hosowaNiImoKashiwaBuild } from "./drawn/kashiwa.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const tsuruGashiwa = defineCrest({
  id: "tsuru-gashiwa",
  name: { en: "Trailing oak leaves", ja: "蔓柏" },
  reading: "つるがしわ",
  romaji: "tsurugashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["蔓かしは"],
  construction: { en: "Three oak leaves surround a round heart. Three paired curls spring from the spaces between them.", ja: "丸い中心を三枚の柏で囲み、その間から二股に巻く蔓を三つ伸ばします。" },
  measured: "Each veined leaf and paired curl repeats through thirds of the circle.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, second row, second column from the right: 蔓かしは", ja: "右頁、二段目、右から二列目「蔓かしは」" }, read: "2026-11-26", measured: true },
  build(c) {
    tsuruGashiwaBuild(c);
  },
});

export const imoKashiwa = defineCrest({
  id: "imo-kashiwa",
  name: { en: "Three small-scaled oak leaves", ja: "いも柏" },
  reading: "いもかしわ",
  romaji: "imo kashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["いもかしワ"],
  construction: { en: "Three narrow, rounded oak leaves meet in a small round joint.", ja: "ふくらみのある細い三枚の柏を、小さな丸い中心に合わせます。" },
  measured: "The lobes stay close to the three stems, leaving wide open bays.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, first row, third column from the right: いもかしワ", ja: "左頁、一段目、右から三列目「いもかしワ」" }, read: "2026-11-26", measured: true },
  build(c) {
    imoKashiwaBuild(c);
  },
});

export const hosowaNiImoKashiwa = defineCrest({
  id: "hosowa-ni-imo-kashiwa",
  name: { en: "Three small-scaled oak leaves in a fine ring", ja: "細輪にいも柏" },
  reading: "ほそわにいもかしわ",
  romaji: "hosowa ni imo kashiwa",
  frame: "ring-thin",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["細ワニいもかしワ"],
  construction: { en: "Three narrow, rounded oak leaves stand in a fine enclosing ring.", ja: "ふくらみのある細い三枚の柏を、細輪の内側に置きます。" },
  measured: "The same narrow lobes and long straight stems turn in thirds inside the ring.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, second row, third column from the right: 細ワニいもかしワ", ja: "左頁、二段目、右から三列目「細ワニいもかしワ」" }, read: "2026-11-26", measured: true },
  build(c) {
    hosowaNiImoKashiwaBuild(c, c.ring("ring-thin"));
  },
});
