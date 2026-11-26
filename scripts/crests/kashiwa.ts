import { tsuruGashiwaBuild } from "./drawn/kashiwa.ts";
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
