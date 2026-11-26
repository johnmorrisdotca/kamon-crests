import { itsutsuRengeBuild } from "./drawn/renge.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const itsutsuRenge = defineCrest({
  id: "itsutsu-renge",
  name: { en: "Five lotus pods", ja: "五つ蓮華" },
  reading: "いつつれんげ",
  romaji: "itsutsu renge",
  frame: "ring-thin",
  motifs: [{ motif: "lotus", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッれんげ"],
  source: cell(21, "left page, row 1, fourth column from the right: 五ッれんげ", "左頁、一段目、右から四列目「五ッれんげ」"),
  measured: "Five flared seed cups turn about a small round heart. Each has a broad, lightly scalloped face with small seeds, and the five sit within a narrow framed circle.",
  construction: {
    en: "Strike the frame and a small round heart. Draw one stem with a fluted seed cup and five sets of its measured arcs, leaving the seed marks white.",
    ja: "輪と丸い中心を打ち、筋のある実と短い茎を五つ置きます。実の面に白い種の跡を残します。",
  },
  build: itsutsuRengeBuild,
});
