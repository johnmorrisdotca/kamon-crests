import { SHINSEN_MONCHO } from "./books.ts";
import { kokumochiChigaiTakanohaBuild } from "./drawn/takanoha.ts";
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

export const kokumochiChigaiTakanoha = defineCrest({
  id: "kokumochi-chigai-takanoha",
  name: { en: "Crossed hawk feathers in a solid disc", ja: "石持ち違い鷹の羽" },
  reading: "こくもちちがいたかのは",
  romaji: "kokumochi chigai taka no ha",
  frame: "none",
  motifs: [{ motif: "hawk-feather", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["石持違鷹"],
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "right page, third row, second column from the right: 石持違鷹", ja: "右頁、三段目、右から二列目「石持違鷹」" }, read: READ, measured: true },
  measured: "On the 96-radius layout the crossed vanes reach about 84 units from the centre. The feather count, crossing and striped fields agree with the published crossed pair from the same spread. The tips, quills and diagonal groups of lines follow the crossing in the print. 石持 marks the solid field.",
  construction: {
    en: "Strike a solid disc and rule two crossed feathers in it. Leave the feathers white and keep the diagonal bars and shaft lines in ink. The front feather interrupts the one behind.",
    ja: "地の円を打ち、交差する二枚の鷹の羽を引きます。羽を白く抜き、斜めの筋と軸の線を黒く残します。手前の羽が奥の羽を分けます。",
  },
  build: kokumochiChigaiTakanohaBuild,
});
