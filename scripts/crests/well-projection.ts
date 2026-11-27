import { SHINSEN_MONCHO } from "./books.ts";
import { karaIzutsuBuild, kumiawaseMitsuIgetaBuild } from "./drawn/well-projection.ts";
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

export const kumiawaseMitsuIgeta = defineCrest({
  id: "kumiawase-mitsu-igeta",
  name: { en: "Three combined well frames", ja: "組合せ三つ井桁" },
  reading: "くみあわせみついげた",
  romaji: "kumiawase mitsu igeta",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["組合三ッいげた"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, fourth row, second column from the right: 組合三ッいげた", ja: "右頁、四段目、右から二列目「組合三ッいげた」" }, read: READ, measured: true },
  measured: "Three flat bars follow each of the three ruled directions. The centre upright projects past the top and bottom crossings as two clear tabs. Its upper tip is about 32 above the centre and its foot about 91 below on the 200-unit page. The other beam ends project across the diagonal openings. Thin white breaks distinguish the lower bars at each overlapping joint.",
  construction: {
    en: "Rule three upright bars and two groups of three diagonal bars. Set them along the visible edges of a cube and extend their ends. Obscure the lower bars at each crossing and leave a thin white clearance.",
    ja: "縦の梁を三本、斜め二方向にも三本ずつ引きます。立方体の見える辺に置き、梁の端を伸ばします。交わるところでは下の梁を切り、細い白筋で上下を分けます。",
  },
  build: kumiawaseMitsuIgetaBuild,
});
