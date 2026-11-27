import { chuwaNiHitotsuZukinBuild, mitsuJinZukinBuild } from "./drawn/zukin.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const chuwaNiHitotsuZukin = defineCrest({
  id: "chuwa-ni-hitotsu-zukin",
  name: { en: "One hood in a medium ring", ja: "中輪に一つ頭巾" },
  reading: "ちゅうわにひとつずきん",
  romaji: "chūwa ni hitotsu zukin",
  frame: "ring-medium",
  motifs: [{ motif: "hood", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中ワニ一ッづきん"],
  source: cell(23, "right page, row 1, fourth column from the right: 中ワニ一ッづきん", "右頁、一段目、右から四列目「中ワニ一ッづきん」"),
  measured: "A single soft hood has a rounded crown and wide dropped shoulders, with a shallow arched hem spanning the two sides below.",
  construction: {
    en: "Strike a medium ring. Draw the crown and shoulders in paired arcs with a shallow hem and one white fold on each side.",
    ja: "中輪を打ちます。左右の弧で頭と肩を描き、裾の浅い弧と左右の白い折り目を置きます。",
  },
  build: chuwaNiHitotsuZukinBuild,
});

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
    ja: "頭巾を一つ、とがった頭を中央の空きから外へ向けて上に置きます。結び目から結び目へ弧の帯をつなぎ、同じ形をあと二つ並べます。",
  },
  build: mitsuJinZukinBuild,
});
