import { SHINSEN_MONCHO } from "./books.ts";
import { yuiwataBuild } from "./drawn/yuiwata.ts";
import { defineCrest } from "./util.ts";

export const yuiwata = defineCrest({
  id: "yuiwata",
  name: { en: "Knotted cotton", ja: "結綿" },
  reading: "ゆいわた",
  romaji: "yuiwata",
  frame: "none",
  motifs: [{ motif: "cotton-bundle", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ゆひワた", "ゆひわた", "結い綿"],
  construction: {
    en: "Five folds fan out above three transverse ties. Five shorter ends droop below them. White arcs divide the folds.",
    ja: "三本の横の結び筋の上に、五つの綿のふくらみを扇状に広げます。下には短い五つの端が垂れ、白い弧がそれぞれのふくらみを分けます。",
  },
  measured: "The high scalloped fan, the short lower ends and the three binding bands follow the print. The repeated curves regularise the individual scallops and the white cut lines.",
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, third row, first column from the right: ゆひワた", ja: "右頁、三段目、右から一列目「ゆひワた」" }, read: "2026-11-26", measured: true },
  build: yuiwataBuild,
});
