import { SHINSEN_MONCHO } from "./books.ts";
import { karaIzutsuBuild } from "./drawn/well-projection.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const karaIzutsu = defineCrest({
  id: "kara-izutsu",
  name: { en: "Chinese-style well curb", ja: "唐井筒" },
  reading: "からいづつ",
  romaji: "kara izutsu",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["唐いづつ"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, second row, second column from the right: 唐いづつ", ja: "右頁、二段目、右から二列目「唐いづつ」" }, read: READ, measured: true },
  measured: "The two matching open frames sit at different heights. Four upright supports connect their corners, each with a narrow ruled side seam where it is visible. The upper frame covers portions of the posts and lower frame.",
  construction: {
    en: "Rule a pair of diagonal four-beam frames at two levels. Set four posts at their corners, under the upper beams. Leave fine white seams where the front timbers overlap the others.",
    ja: "斜めの四本の梁で枠を二段に引きます。四隅の上の梁の下に柱を立てます。手前の木が重なるところに細い白筋を残します。",
  },
  build: karaIzutsuBuild,
});
