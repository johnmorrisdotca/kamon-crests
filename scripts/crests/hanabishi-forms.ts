import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hanabishi-forms.ts";
import { defineCrest } from "./util.ts";

export const itowaNiHanabishi = defineCrest({
  id: "itowa-ni-hanabishi",
  name: { en: "Flower lozenge in a thread ring", ja: "糸輪に花菱" },
  reading: "いとわにはなびし",
  romaji: "itowa ni hanabishi",
  frame: "ring-thread",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニ花びし"],
  construction: {
    en: "Take the standard flower lozenge at reduced reach and surround it with the thread ring. Its long pair of petals points to either side.",
    ja: "花菱を小さく割り付け、外を糸輪で囲みます。長い二枚の花びらは左右を向きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, second row, first column from the right: 糸ワニ花びし", ja: "左頁、二段目、右から一列目「糸ワニ花びし」" }, read: "2026-11-27", measured: true },
  measured: "The flower reaches about 86 per cent of the outer ring's diameter from side to side. The standard flower-lozenge build has a reach of 82 in the package's 96-unit thread ring.",
  build: drawn.itowaNiHanabishiBuild,
});

export const futokageHanabishi = defineCrest({
  id: "futokage-hanabishi",
  name: { en: "Flower lozenge in broad shadow outline", ja: "太陰花菱" },
  reading: "ふとかげはなびし",
  romaji: "futokage hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ふとかげ花びし"],
  construction: {
    en: "A broad flower-shaped outline surrounds four white cut petals and an open round heart. A small dark stamen points into each cut petal.",
    ja: "太い花形の輪郭の内側に、白く抜いた花びら四つと丸い花心を置きます。それぞれの花びらに小さな黒いしべが伸びます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, second row, third column from the right: ふとかげ花びし", ja: "左頁、二段目、右から三列目「ふとかげ花びし」" }, read: "2026-11-27", measured: true },
  measured: "The outer flower is about 300 across by 250 high. The central outlined petals span about 180. Their white loops sit inside the dark flower field at half the outer reach.",
  build: drawn.futokageHanabishiBuild,
});

export const mitsuHanabishi = defineCrest({
  id: "mitsu-hanabishi",
  name: { en: "Three flower lozenges", ja: "三つ花菱" },
  reading: "みつはなびし",
  romaji: "mitsu hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ花びし"],
  construction: {
    en: "Set one full flower at each third of a turn, the first upright. The lower two face outward as the whole flower-lozenge unit turns with its spoke.",
    ja: "中心のまわりを三等分し、各位置に花菱を一つずつ置きます。上の一つを正立させ、下の二つは割付線に合わせて外へ向けます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, first row, first column from the right: 三ッ花びし", ja: "右頁、一段目、右から一列目「三ッ花びし」" }, read: "2026-11-27", measured: true },
  measured: "The three four-petalled flowers nearly meet in the print. In the set-out their centres stand 44 from the group centre and each flower has a reach of 55.",
  build: drawn.mitsuHanabishiBuild,
});
