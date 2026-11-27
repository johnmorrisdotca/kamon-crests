import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuYoseHanabishiBuild } from "./drawn/hanabishi-fans.ts";
import { defineCrest } from "./util.ts";

export const mitsuYoseHanabishi = defineCrest({
  id: "mitsu-yose-hanabishi",
  name: { en: "Three gathered flower lozenges", ja: "三つ寄せ花菱" },
  reading: "みつよせはなびし",
  romaji: "mitsu yose hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッよせ花びし"],
  construction: {
    en: "Three fans of petals share a round centre. Thin lines separate the petals of each fan, and a small pointed collar sits at its root.",
    ja: "丸い中心のまわりに扇形の花を三つ置きます。それぞれの花弁を細い線で分け、根元に先のとがった小さな萼を置きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, second row, fourth column from the right: 三ッよせ花びし", ja: "左頁、二段目、右から四列目「三ッよせ花びし」" }, read: "2026-11-27", measured: true },
  measured: "The broad side petals, upright crown and small pointed collar are measured from the top fan in frame 8. Each fan is turned an exact third of a turn around the shared centre.",
  build: mitsuYoseHanabishiBuild,
});
