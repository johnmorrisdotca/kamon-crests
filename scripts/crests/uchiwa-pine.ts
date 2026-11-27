import { SHINSEN_MONCHO } from "./books.ts";
import { nakatsuUchiwaBuild } from "./drawn/nakatsu-uchiwa.ts";
import { defineCrest } from "./util.ts";

export const nakatsuUchiwa = defineCrest({
  id: "nakatsu-uchiwa",
  name: { en: "Nakatsu round fan", ja: "中津団扇" },
  reading: "なかつうちわ",
  romaji: "nakatsu uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }, { motif: "pine", count: 10, arrangement: "rows" }],
  families: [],
  aliases: ["中津うちは"],
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, third row, fourth column from the right: 中津うちは", ja: "左頁、三段目、右から四列目「中津うちは」" }, read: "2026-11-27", measured: true },
  measured: "One upright handle divides the two rounded paper faces. Each retains a separate narrow rim and five evenly spaced pine crowns with spreading feet. The two sides are balanced at the central handle.",
  construction: {
    en: "Rule a central handle and strike a matching face on either side. Leave a narrow white seam inside each rim. Place five pines from top to bottom on each face and rule the strokes on their crowns.",
    ja: "中央の柄を引き、左右同じ地紙を弧で打ちます。ふちの内側には細い白筋を残します。各面に松を上から五つ置き、松葉の筋を引きます。",
  },
  build: nakatsuUchiwaBuild,
});
