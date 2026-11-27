import { itowaNiSugiBuild, maruNiIpponSugiBuild, maruNiNihonSugiBuild } from "./drawn/sugi.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const maruNiIpponSugi = defineCrest({
  id: "maru-ni-ippon-sugi",
  name: { en: "One cedar in a circle", ja: "丸に一本杉" },
  reading: "まるにいっぽんすぎ",
  romaji: "maru ni ippon sugi",
  frame: "ring-thin",
  motifs: [{ motif: "cedar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ一本杉"],
  source: cell(45, "left page, row 1, first column from the right: 丸ニ一本杉", "左頁、一段目、右から一列目「丸ニ一本杉」"),
  measured: "One tall and narrow crown with raised tips along its shoulders. The trunk reaches close to the inner edge of the ring and pale branches descend in pairs.",
  construction: {
    en: "Strike the ring and rule the trunk on its centre line. Fill the crown in mirrored arcs and leave the descending branch cuts white.",
    ja: "輪を打ち、中心線に幹を引きます。樹冠を左右反転した弧で塗り、斜め下へ伸びる枝の切れ込みを白く残します。",
  },
  build: maruNiIpponSugiBuild,
});

export const itowaNiSugi = defineCrest({
  id: "itowa-ni-sugi",
  name: { en: "Cedar in a thin ring", ja: "糸輪に杉" },
  reading: "いとわにすぎ",
  romaji: "itowa ni sugi",
  frame: "ring-thread",
  motifs: [{ motif: "cedar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニ杉", "糸に杉"],
  source: cell(45, "left page, row 2, first column from the right: 糸ワニ杉", "左頁、二段目、右から一列目「糸ワニ杉」"),
  measured: "The slender frame surrounds a wider cedar than in the preceding cell. The trunk flares towards its foot and the toothlike branches are longer.",
  construction: {
    en: "Strike the fine ring and rule the taper of the trunk. Give the crown wide shoulders and take the white branches farther out from the centre.",
    ja: "糸輪を打ち、裾へ広がる幹を引きます。樹冠を幅広く取り、中心から白い枝を長く伸ばします。",
  },
  build: itowaNiSugiBuild,
});

export const maruNiNihonSugi = defineCrest({
  id: "maru-ni-nihon-sugi",
  name: { en: "Two cedars in a circle", ja: "丸に二本杉" },
  reading: "まるににほんすぎ",
  romaji: "maru ni nihon sugi",
  frame: "ring-thin",
  motifs: [{ motif: "cedar", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["丸ニ二本杉"],
  source: cell(45, "left page, row 3, first column from the right: 丸ニ二本杉", "左頁、三段目、右から一列目「丸ニ二本杉」"),
  measured: "Two matching cedars have upright trunks in a horizontal pair. Their inward shoulders between the crowns come close and leave open space below.",
  construction: {
    en: "Strike a ring outside the two vertical trunks. Give both cedars the same lance-shaped crown and leave a narrow opening between them.",
    ja: "二本のまっすぐな幹を囲む輪を打ちます。同じ形の細長い樹冠を並べ、その間に細いすき間を残します。",
  },
  build: maruNiNihonSugiBuild,
});
