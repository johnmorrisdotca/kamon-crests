import { SHINSEN_MONCHO } from "./books.ts";
import { fusenTakanohaBuild } from "./drawn/fusen-takanoha.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const fusenTakanoha = defineCrest({
  id: "fusen-takanoha",
  name: { en: "Floating-line hawk feathers", ja: "浮線鷹の羽" },
  reading: "ふせんたかのは",
  romaji: "fusen taka no ha",
  frame: "none",
  motifs: [{ motif: "hawk-feather", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["ふせんたかの羽"],
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, fourth row, second column from the right: ふせんたかの羽", ja: "右頁、四段目、右から二列目「ふせんたかの羽」" }, read: READ, measured: true },
  measured: "Two large curved vanes meet at the top of a round outline. Their inward curls face each other above a short, upright front feather. Repeated sets of diagonal lines and the slender feather shafts remain visible.",
  construction: {
    en: "Strike the curved outer vanes and the two curled tips. Rule paired bars across each vane. Place a shorter feather in front, striking its two rounded ends and ruling its shaft and diagonal stripes.",
    ja: "外側の曲がった羽弁と内側に巻く二つの先を弧で打ちます。各羽弁に二本ずつ斜めの筋を引きます。手前には短い羽を置き、丸い両端を打ち、軸と斜めの筋を引きます。",
  },
  build: fusenTakanohaBuild,
});
