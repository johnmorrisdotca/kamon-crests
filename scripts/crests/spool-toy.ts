import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/spool-toy.ts";
import { defineCrest } from "./util.ts";

export const ryugo = defineCrest({
  id: "ryugo",
  name: { en: "String-spun spool", ja: "輪鼓" },
  reading: "りゅうご",
  romaji: "ryūgo",
  frame: "none",
  motifs: [{ motif: "spool-toy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["りんこ", "りんご"],
  construction: {
    en: "Two wide, straight-sided ends taper to a short joined waist. The two end lines are horizontal and equal.",
    ja: "両端の幅広い直線形を、中央の短いくびれへ向けて狭めます。上下の端は水平で同じ幅にします。",
  },
  measured: "The two broad horizontal ends and the short waist follow the measured proportions of the print. The drawing balances the two sides and fills the outline in solid ink.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, fourth row, second column from the right: りんこ", ja: "左頁、四段目、右から二列目「りんこ」" }, read: "2026-11-26", measured: true },
  build: drawn.ryugoBuild,
});

export const maruNiRyugo = defineCrest({
  id: "maru-ni-ryugo",
  name: { en: "String-spun spool in a circle", ja: "丸に輪鼓" },
  reading: "まるにりゅうご",
  romaji: "maru ni ryūgo",
  frame: "ring-thin",
  motifs: [{ motif: "spool-toy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニりんこ"],
  construction: {
    en: "The straight-sided spool stands upright inside a thin ring.",
    ja: "直線で描いた輪鼓を立て、細輪に収めます。",
  },
  measured: "Reuses the plain spool's straight sides, equal ends and short waist. The corners of its crown and foot stand slightly farther from the ring than the print.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, first row, third column from the right: 丸ニりんこ", ja: "左頁、一段目、右から三列目「丸ニりんこ」" }, read: "2026-11-26", measured: true },
  build: drawn.maruNiRyugoBuild,
});

export const mitsuRyugo = defineCrest({
  id: "mitsu-ryugo",
  name: { en: "Three string-spun spools", ja: "三つ輪鼓" },
  reading: "みつりゅうご",
  romaji: "mitsu ryūgo",
  frame: "none",
  motifs: [{ motif: "spool-toy", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッりんこ"],
  construction: {
    en: "Six points alternate around the rim. Three bars cross the inward corners, with narrow white lines alongside them.",
    ja: "六つの先を外側に交互に配します。内側の角に三本の棒を渡し、脇に細い白い筋を入れます。",
  },
  measured: "The six outer tips, inner gaps and three crossing bars follow the printed construction. Three exact turns regularise the spacing, and the black ink makes the middle read more strongly.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, first row, fourth column from the right: 三ッりんこ", ja: "左頁、一段目、右から四列目「三ッりんこ」" }, read: "2026-11-26", measured: true },
  build: drawn.mitsuRyugoBuild,
});

export const futatsuRyugo = defineCrest({
  id: "futatsu-ryugo",
  name: { en: "Two string-spun spools", ja: "二つ輪鼓" },
  reading: "ふたつりゅうご",
  romaji: "futatsu ryūgo",
  frame: "none",
  motifs: [{ motif: "spool-toy", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["二ッりんこ", "二つ輪鼓"],
  construction: {
    en: "Two tall spools stand side by side. The inner corners of their ends meet on the upright, and each narrows to a short waist at mid-height.",
    ja: "背の高い輪鼓を二つ並べて立てます。上下の端の内側の角を中心線の上で合わせ、それぞれ高さの中ほどで短くくびれさせます。",
  },
  measured: "The book's spools, in its pixels: 254 high, their ends 105 to 114 across (110 on average) and their waists about 19.5 across. They stand side by side, the inner corners of their ends meeting, so the pair is twice an end's width across. The book's ends are a little wider at the foot than at the top; ours are equal.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, second row, third column from the right: 二ッりんこ", ja: "左頁、二段目、右から三列目「二ッりんこ」" }, read: "2026-11-28", measured: true },
  build: drawn.futatsuRyugoBuild,
});

export const mitsuIrekoRyugo = defineCrest({
  id: "mitsu-ireko-ryugo",
  name: { en: "Three nested string-spun spools", ja: "三つ入れ子輪鼓" },
  reading: "みついれこりゅうご",
  romaji: "mitsu ireko ryūgo",
  frame: "none",
  motifs: [{ motif: "spool-toy", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["三ッ入子りんこ"],
  construction: {
    en: "One spool stands above two others. Its foot fits into the notch between their upper halves, its slanting sides a narrow white from theirs.",
    ja: "輪鼓を一つ、二つの輪鼓の上に置きます。上の輪鼓の下半分を、下の二つの上半分の間のくぼみに入れ、斜めの辺どうしを細い白でへだてます。",
  },
  measured: "The book's spools, in its pixels: 166 to 168 high, their ends 83 to 111 across (97 on average) and their waists about 21 across. The lower two stand 65.5 to either side of the upper one and 84.5 below it. Their slanting sides are then parallel to the upper one's, about 5 apart, as the book has them. The book's ends differ in width; ours are all the average.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, third row, third column from the right: 三ッ入子りんこ", ja: "左頁、三段目、右から三列目「三ッ入子りんこ」" }, read: "2026-11-28", measured: true },
  build: drawn.mitsuIrekoRyugoBuild,
});
