import { kohoneBishiBuild } from "./drawn/spatterdock-lozenge.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const kohoneBishi = defineCrest({
  id: "kohone-bishi",
  name: { en: "Spatterdock lozenge", ja: "河骨菱" },
  reading: "こうほねびし",
  romaji: "kōhone bishi",
  frame: "none",
  motifs: [{ motif: "spatterdock", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["こうほねびし"],
  construction: { en: "Two spatterdock leaves face out along a lozenge. Stalks link them to the two blooms above and below.", ja: "河骨の葉二枚を菱の左右へ向け、茎を伸ばして上下の花につなげます。" },
  measured: "The large side leaves have tied-looking feet nearby. An open, curved outline forms a central diamond, with one pointed blossom at its top and bottom.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, first row, fourth column from the right: こうほねびし", ja: "右頁、一段目、右から四列目「こうほねびし」" }, read: "2026-11-26", measured: true },
  build(c) {
    kohoneBishiBuild(c);
  },
});
