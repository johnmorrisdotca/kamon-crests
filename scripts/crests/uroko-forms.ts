import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/uroko-forms.ts";
import { defineCrest } from "./util.ts";

export const chuwaNiFutatsuUroko = defineCrest({
  id: "chuwa-ni-futatsu-uroko",
  name: { en: "Two facing scales in a medium circle", ja: "中輪に二つ鱗" },
  reading: "ちゅうわにふたつうろこ",
  romaji: "chūwa ni futatsu uroko",
  frame: "ring-medium",
  motifs: [{ motif: "scale", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["中ワニ二ッうろこ"],
  construction: {
    en: "Rule two matching triangles with horizontal bases inside the medium ring, one above the other. Their points face at the centre, with a small white clearance.",
    ja: "中輪の内側に、水平な底辺を持つ同じ三角形を上下に置きます。先端を中央で向かい合わせ、間に細い白線を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, second row, third column from the right: 中ワニ二ッうろこ", ja: "左頁、二段目、右から三列目「中ワニ二ッうろこ」" }, read: "2026-11-27", measured: true },
  measured: "In the print the bases are about 185 pixels across and 185 apart, inside a ring about 305 across. The package's medium ring leaves 108-unit bases 102 apart, and the tips are three units apart.",
  build: drawn.chuwaNiFutatsuUrokoBuild,
});
