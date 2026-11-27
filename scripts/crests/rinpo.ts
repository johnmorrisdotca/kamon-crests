import { SHINSEN_MONCHO } from "./books.ts";
import { rinpoBuild } from "./drawn/rinpo.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";
const PART = "dharma-wheel";

export const rinpoKuzushi = defineCrest({
  id: "rinpo-kuzushi",
  name: { en: "Altered Dharma wheel", ja: "輪宝崩し" },
  reading: "りんぽうくずし",
  romaji: "rinpo kuzushi",
  frame: "none",
  motifs: [{ motif: PART, count: 1, arrangement: "single" }],
  families: [],
  aliases: ["りんぼうくづし", "輪宝くづし"],
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "left page, first row, first column from the right: りんぼうくづし", ja: "左頁、一段目、右から一列目「りんぼうくづし」" }, read: READ, measured: true },
  measured: "Eight narrow spokes flare to meet a broad rim. Eight small circular perforations sit on their axes inside it. Eight large pointed tips alternate with smaller tips along the outside.",
  construction: {
    en: "Strike the hub and rim and divide them into eight positions. Rule each spoke and strike its curved shoulders. Add alternating large and small outer points and a small round opening at each large point.",
    ja: "軸と輪を打ち、八等分します。輻を直線で引き、外で広がる肩を弧で打ちます。外には大小のとがりを交互に置き、大きいとがりの根に丸い小穴を開けます。",
  },
  build(c) { rinpoBuild(c, { spokes: 8, between: 1, hub: 13, cheek: 13.8, beaded: true }); },
});
