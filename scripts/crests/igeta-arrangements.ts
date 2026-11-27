import { SHINSEN_MONCHO } from "./books.ts";
import { kasaneIgetaBuild } from "./drawn/igeta-arrangements.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const kasaneIgeta = defineCrest({
  id: "kasane-igeta",
  name: { en: "Overlapping well frames", ja: "重ね井桁" },
  reading: "かさねいげた",
  romaji: "kasane igeta",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["重ねいげた"],
  construction: {
    en: "Two corner-up well frames overlap along one upright axis. Open three small lozenges along the centre. Rule two larger notched openings above and below.",
    ja: "隅を立てた井桁を縦の軸にそろえて二つ重ねます。中央には小さな菱を横に三つ抜き、上下には角を欠いた大きな空きを残します。",
  },
  measured: "The two well frames reuse the four ruled rails of the ordinary well, shifted equally about the centre. The book's width is about 1.1 times its height and its ruled slopes rise by about 7 for every 10 across. The two large openings in the print are notched. The three holes across the middle have half-widths of about 6 at the centre and 15 at the sides, with the side pair about 57 units from the centre.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, first row, fourth column from the right: 重ねいげた", ja: "右頁、一段目、右から四列目「重ねいげた」" }, read: READ, measured: true },
  build: kasaneIgetaBuild,
});
