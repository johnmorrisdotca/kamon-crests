import { SHINSEN_MONCHO } from "./books.ts";
import { yagyuGasaBuild } from "./drawn/yagyu-gasa.ts";
import { hanagasaYonezawaBuild } from "./drawn/kasa.ts";
import { maruNiKasaBuild } from "./drawn/maru-ni-kasa.ts";
import { defineCrest } from "./util.ts";

export const hanagasaYonezawa = defineCrest({
  id: "hanagasa-yonezawa",
  name: { en: "Yonezawa flower hat", ja: "花笠米沢" },
  reading: "はながさよねざわ",
  romaji: "hanagasa yonezawa",
  frame: "none",
  motifs: [{ motif: "conical-hat", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花かさよねざは"],
  construction: {
    en: "Strike the canopy and its ribbed brim. Hang a band with flowers and ruled stem beneath it. Reflect the side sprigs around an upright sprig at the crown.",
    ja: "笠と骨の通る縁を打ち、その下に花模様の帯と柄を置きます。頂のまっすぐな枝を挟んで、左右に同じ小枝を広げます。",
  },
  measured: "The canopy in the print spans roughly 328 pixels, with the leafy crown about 280 pixels wide. The crest uses a 182-unit brim and leaves of one size on paired shoots. The floral band is held apart by the brim and the lower rim.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, first row, first column from the right: 花かさよねざは", ja: "左頁、一段目、右から一列目「花かさよねざは」" }, read: "2026-11-27", measured: true },
  build: hanagasaYonezawaBuild,
});

export const maruNiKasa = defineCrest({
  id: "maru-ni-kasa",
  name: { en: "Woven hat in a circle", ja: "丸に笠" },
  reading: "まるにかさ",
  romaji: "maru ni kasa",
  frame: "ring-thin",
  motifs: [{ motif: "conical-hat", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸にかさ"],
  construction: {
    en: "Strike a rounded woven canopy inside a thin ring. Curve two complete ties under its brim, with one crossing in front and a short tail attached to each.",
    ja: "細い輪の中に丸い笠を打ちます。縁の下で紐を二つ巻いて交差させ、それぞれに短い端をつなぎます。",
  },
  measured: "The hat covers about 250 pixels of the 311-pixel ring. Equal compass arcs shape both shoulders and the two ties. The path of each short tail meets the lower course of its tie below the brim.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, third row, fourth column from the right: 丸にかさ", ja: "右頁、三段目、右から四列目「丸にかさ」" }, read: "2026-11-28", measured: true },
  build: maruNiKasaBuild,
});

export const yagyuGasa = defineCrest({
  id: "yagyu-gasa",
  name: { en: "Yagyū hats", ja: "柳生笠" },
  reading: "やぎゅうがさ",
  romaji: "yagyū gasa",
  frame: "none",
  motifs: [{ motif: "conical-hat", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["柳生笠"],
  construction: {
    en: "Two broad hats, the right one in front of the left. Each is a crescent of brim under a small crown, the hollow of its underside showing below the brim's front edge, and ties hanging from it.",
    ja: "広い笠を二つ、右の笠を左の笠の手前に重ねます。どちらも小さな頂の下に三日月形のつばがあり、つばの前の縁の下に裏の内側が見え、紐が二本下がります。",
  },
  measured: "The book's hats, in its pixels from the foot of the front hat's crown: the brim's tips 99 to either side and 73 down, its top through 57.5 out and 21.5 down; the crown 48 across its foot and 45 across its top 18.5 up, bowing to 30; the brim's front edge through 45 down; the underside's hollow from 76 to either side at 60 down, bowing to 84; the ties 7 wide, to about 117 down. The back hat stands 106.5 to the left and 7 up, its brim reaching 116 to its left and its one tie hanging down to the left. The book's straw lines under the brims and on the crowns are left out.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, second row, fourth column from the right: 柳生笠", ja: "右頁、二段目、右から四列目「柳生笠」" }, read: "2026-11-28", measured: true },
  build: yagyuGasaBuild,
});
