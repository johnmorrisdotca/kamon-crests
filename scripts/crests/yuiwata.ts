import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuYuiwataBuild, yuiwataBuild } from "./drawn/yuiwata.ts";
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

export const mitsuYuiwata = defineCrest({
  id: "mitsu-yuiwata",
  name: { en: "Three knotted cotton bundles", ja: "三つ結綿" },
  reading: "みつゆいわた",
  romaji: "mitsu yuiwata",
  frame: "none",
  motifs: [{ motif: "cotton-bundle", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッゆひワた"],
  construction: {
    en: "Three tied bundles face outward around an open middle. White arcs divide the fans, and each bundle has its own three transverse ties.",
    ja: "三つの結綿を外向きにし、中央に空きを残します。白い弧で綿のふくらみを分け、それぞれに三本の横の結び筋を置きます。",
  },
  measured: "Three exact turns regularise the spacing around the printed centre. The proposed opening is more pointed, and some adjacent tips stand farther apart.",
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, first row, second column from the right: 三ッゆひワた", ja: "右頁、一段目、右から二列目「三ッゆひワた」" }, read: "2026-11-26", measured: true },
  build: mitsuYuiwataBuild,
});
