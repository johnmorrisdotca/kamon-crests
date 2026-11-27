import { SHINSEN_MONCHO } from "./books.ts";
import { fusenIzutsuBuild } from "./drawn/fusen-izutsu.ts";
import { defineCrest } from "./util.ts";

export const fusenIzutsu = defineCrest({
  id: "fusen-izutsu",
  name: { en: "Floating-line well curb", ja: "浮線井筒" },
  reading: "ふせんいづつ",
  romaji: "fusen izutsu",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["ふせんいづつ"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, first row, first column from the right: ふせんいづつ", ja: "右頁、一段目、右から一列目「ふせんいづつ」" }, read: "2026-11-27", measured: true },
  measured: "Two curved scrolls face inward at the head. The large opening is about 44 units in radius and the skirt about 93 on the working page, with compass lobes about 5.5 in radius. Six small openings touch that scalloped outline, and a round knot about 13 in radius stands at the base of the large opening. The drawing is scaled by 0.98 to bring every edge inside the layout circle. Thin lines represent the shorter folded panels.",
  construction: {
    en: "Strike the large opening and the curved bands along its sides. Add one curled end to each band. Strike the round knot, the rounded outline and the six small eyes. Rule the pleat lines in the lower field.",
    ja: "大きな空きと両側の曲がった帯を弧で打ちます。それぞれの先を内へ巻きます。丸い結び目、外の丸いふち、小さな六つの目を打ち、下のひだに筋を引きます。",
  },
  build: fusenIzutsuBuild,
});
