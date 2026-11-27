import { RING_GAP } from "../construct/builder.ts";
import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuKenYaBuild } from "./drawn/arms.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const mitsuKenYa = defineCrest({
  id: "mitsu-ken-ya",
  name: { en: "Three sword arrows", ja: "三つ剣矢" },
  reading: "みつけんや",
  romaji: "mitsu ken ya",
  frame: "none",
  motifs: [{ motif: "arrow", count: 3, arrangement: "radial" }, { motif: "sword", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッけん矢"],
  construction: {
    en: "Three feathered shafts meet three flared blades around a small disc. Between two blades, an arrow's ruled vanes reach out with two groups of rising white lines.",
    ja: "小さな円の周りに三本の矢羽と三つの剣を交互に置きます。羽は直線で囲み、外へ向かって上がる白い線を二か所に入れます。",
  },
  measured: "The top feathered shaft and the three flared blades use alternating radial axes. The blade sides bow in towards the hub, and the curved points close each outer edge. Slight differences between the printed blades are balanced about their axes.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, first row, third column from the right: 三ッけん矢", ja: "左頁、一段目、右から三列目「三ッけん矢」" }, read: READ, measured: true },
  build(c) {
    mitsuKenYaBuild(c, R);
  },
});
