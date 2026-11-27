import { SHINSEN_MONCHO } from "./books.ts";
import { mutsuMusubiKamashikiBuild, tatamiKamashikiBuild } from "./drawn/kamashiki.ts";
import { defineCrest } from "./util.ts";

export const tatamiKamashiki = defineCrest({
  id: "tatami-kamashiki",
  name: { en: "Folded pot stand", ja: "畳釜敷" },
  reading: "たたみかましき",
  romaji: "tatami kamashiki",
  frame: "none",
  motifs: [{ motif: "pot-stand", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["たゝみかましき", "たたみ釜敷"],
  construction: {
    en: "Six triangular folds make a pot stand. The parallel lines within each fold turn with it.",
    ja: "六つの三角形の折り返しで釜敷を作ります。各折り返しの中の平行線も、折り返しとともに向きを変えます。",
  },
  measured: "A nearly regular hexagon divides into six triangles about the center. One side of each triangle is parallel to its ruled weave. The drawing repeats the fold at equal turns.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, first row, fourth column from the right: たゝみ／かましき", ja: "左頁、一段目、右から四列目「たゝみ／かましき」" }, read: "2026-11-26", measured: true },
  build: tatamiKamashikiBuild,
});

export const mutsuMusubiKamashiki = defineCrest({
  id: "mutsu-musubi-kamashiki",
  name: { en: "Six-knotted pot stand", ja: "六つ結び釜敷" },
  reading: "むつむすびかましき",
  romaji: "mutsu musubi kamashiki",
  frame: "none",
  motifs: [{ motif: "pot-stand", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["六ッ結びかましき"],
  construction: {
    en: "Strike a small centre ring and a wider binding ring. Around them turn six large loops with curled ends, leaving narrow steps where the cords pass over one another.",
    ja: "中央の小さな輪と外側の結び輪を打ちます。そのまわりに端を巻いた大きな輪を六つ回し、ひもの交差に細いすき間を残します。",
  },
  measured: "Six curved lobes sit around a ring. Each has two short inward returns. A smaller, separate ring lies on the same centre.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, third row, third column from the right: 六ッ結びかましき", ja: "左頁、三段目、右から三列目「六ッ結びかましき」" }, read: "2026-11-27", measured: true },
  build: mutsuMusubiKamashikiBuild,
});
