import { mitsuJinZukinBuild } from "./drawn/zukin.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuJinZukin = defineCrest({
  id: "mitsu-jin-zukin",
  name: { en: "Three campaign hoods", ja: "三つ陣頭巾" },
  reading: "みつじんずきん",
  romaji: "mitsu jin zukin",
  frame: "none",
  motifs: [{ motif: "hood", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ陣づきん"],
  source: cell(23, "right page, row 2, fourth column from the right: 三ッ陣づきん", "右頁、二段目、右から四列目「三ッ陣づきん」"),
  measured: "Three pointed fabric hoods face out from an open centre. Three round knots sit along the continuous curved straps between the hoods.",
  construction: {
    en: "Set a hood at the top with its pointed crown away from the opening. Carry the strap from knot to knot and repeat the unit twice.",
    ja: "中央の空きから外へ向けて頭巾を一つ置きます。結び目を弧の帯でつなぎ、同じ形をあと二つ並べます。",
  },
  build: mitsuJinZukinBuild,
});
