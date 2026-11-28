import { SHINSEN_MONCHO } from "./books.ts";
import { hanagasaYonezawaBuild } from "./drawn/kasa.ts";
import { maruNiKasaBuild } from "./drawn/maru-ni-kasa.ts";
import { mitsuKasaNoMaruBuild } from "./drawn/mitsu-kasa-no-maru.ts";
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

export const mitsuKasaNoMaru = defineCrest({
  id: "mitsu-kasa-no-maru",
  name: { en: "Three hats in a round", ja: "三つ笠の丸" },
  reading: "みつかさのまる",
  romaji: "mitsu kasa no maru",
  frame: "none",
  motifs: [{ motif: "conical-hat", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッかさの丸"],
  construction: {
    en: "Strike a round and mark three points on it, a third of a turn apart. Join each pair with a brim's front edge bowing in, and under it the lower edge of the hat's hollow bowing in farther, with two cords hanging between. Stand a small crown on the round over the middle of each hat.",
    ja: "円を打ち、円周を三つに分ける点を取ります。隣り合う点を、内側へ反る笠のつばの縁でつなぎ、その下にもっと深く反る笠の裏の縁を引いて、間に紐を二本下げます。それぞれの笠の真ん中の上に、小さな頂を円の外へ立てます。",
  },
  measured: "The book's round, in its pixels from the centre: its outside 153 out, the brims' tips on it 60 degrees either side of each hat's middle; each brim's front edge bowing to 100 out and the hollow's lower edge to 44.5; each crown a disc of about 23 standing on the round at 148 out; two cords in each hollow, from 92 to 60 to 103 and from 103 to 51 to 95. The book's three hats are about 4 degrees off a third of a turn apart and are drawn evenly here; its cords are double lines, drawn here as single ones.",
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "left page, second row, first column from the right: 三ッかさの丸", ja: "左頁、二段目、右から一列目「三ッかさの丸」" }, read: "2026-11-28", measured: true },
  build: mitsuKasaNoMaruBuild,
});
