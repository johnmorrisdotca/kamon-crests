import { SHINSEN_MONCHO } from "./books.ts";
import { hosowaNiYamaNoJiBuild, maruNiHonNoJiBuild, atamaawaseKorinMitsuYamaNoJiBuild } from "./drawn/ringed-characters.ts";
import { defineCrest } from "./util.ts";

export const maruNiHonNoJi = defineCrest({
  id: "maru-ni-hon-no-ji",
  name: { en: "Character hon in a circle", ja: "丸に本の字" },
  reading: "まるにほんのじ",
  romaji: "maru ni hon no ji",
  frame: "ring-medium",
  motifs: [{ motif: "hon-no-ji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ本の字"],
  construction: {
    en: "The centre stroke of 本 is upright, with a curved head and a hooked foot. The long bar crosses above two slanting strokes. The short lower bar joins the upright.",
    ja: "「本」の縦画は、頭を曲線にして下端をはねさせます。長い横画の下から斜めの二画を広げ、短い下の横画を縦画につなげます。",
  },
  measured: "The ring is about 305 pixels wide. The upper bar is about 220 pixels across and the printed brush character is about 246 pixels tall. The drawing uses about 137 by 153 and the package medium ring. The asymmetric brush feet, rising long bar and lower hook are ruled and bounded by circular arcs.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, first row, third column from the right: 丸ニ本の字", ja: "右頁、一段目、右から三列目「丸ニ本の字」" }, read: "2026-11-26", measured: true },
  build: maruNiHonNoJiBuild,
});

export const hosowaNiYamaNoJi = defineCrest({
  id: "hosowa-ni-yama-no-ji",
  name: { en: "Character mountain in a thin circle", ja: "細輪に山の字" },
  reading: "ほそわにやまのじ",
  romaji: "hosowa ni yama no ji",
  frame: "ring-thin",
  motifs: [{ motif: "yama-no-ji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["細ワニ山の字"],
  construction: {
    en: "The centre point of 山 rises above two curved shoulders. Below the three points, two broad arcs form a bowl with a rounded opening. A narrow ring encloses the character.",
    ja: "「山」の中央の先が二つの丸い肩より高く立ちます。三つの先の下は大きな弧で丸く囲み、内側に丸い空きを残します。細い輪で字を囲みます。",
  },
  measured: "The crest book's ring is about 319 pixels across. The outer shoulders span about 270 pixels and the opening in the bowl about 94 pixels. The drawing uses 164 and 58 on a ring of diameter 192. The centre point is straight-sided above the broad neck and the sides reflect about the upright axis. The ring follows the printed qualifier 細ワ.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "right page, third row, second column from the right: 細ワニ山の字", ja: "右頁、三段目、右から二列目「細ワニ山の字」" }, read: "2026-11-26", measured: true },
  build: hosowaNiYamaNoJiBuild,
});

export const atamaawaseKorinMitsuYamaNoJi = defineCrest({
  id: "atamaawase-korin-mitsu-yama-no-ji",
  name: { en: "Three Kōrin mountain characters, heads together", ja: "頭合わせ光琳三つ山の字" },
  reading: "あたまあわせこうりんみつやまのじ",
  romaji: "atamaawase korin mitsu yama no ji",
  frame: "none",
  motifs: [{ motif: "yama-no-ji", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["こうりん三ッ山の字", "頭合せ光琳三つ山の字", "かしらあわせこうりんみつやまのじ"],
  construction: { en: "Three rounded 山 forms face a common centre. Each opens into broad curved shoulders and narrows to a point against the circular edge.", ja: "丸みのある「山」の字を三つ、同じ中心へ向けます。それぞれの肩を弧で広げ、円の縁に向かって先を細くします。" },
  measured: "The printed lobes alternate at roughly third turns. Each has two broad elbows and a cusp at the rim. The measured version keeps the three lobes as paper openings in one circular field, regularises their angles and leaves a narrow continuous edge at the outer tips.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "right page, fourth row, second column from the right: こうりん三ッ山の字", ja: "右頁、四段目、右から二列目「こうりん三ッ山の字」" }, read: "2026-11-26", measured: true },
  build(c) {
    atamaawaseKorinMitsuYamaNoJiBuild(c);
  },
});
