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
