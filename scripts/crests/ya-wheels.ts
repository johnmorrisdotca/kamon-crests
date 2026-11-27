import { RING_GAP } from "../construct/builder.ts";
import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuKenYaBuild, threeWholeArrowsBuild } from "./drawn/arms.ts";
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

export const mitsuYaChigai = defineCrest({
  id: "mitsu-ya-chigai",
  name: { en: "Three crossed arrows", ja: "三つ矢違い" },
  reading: "みつやちがい",
  romaji: "mitsu ya chigai",
  frame: "none",
  motifs: [{ motif: "arrow", count: 3, arrangement: "crossed" }],
  families: [],
  aliases: ["三ッ矢違"],
  construction: {
    en: "Three whole arrows cross on equally spaced axes, with the upper arrowhead directly above the crossing. Each leaf-shaped head has a white eye, and the feathered ends alternate with the heads.",
    ja: "三本の矢を等しい角度で交差させ、矢尻の一つを真上に向けます。葉形の矢尻に白い穴を入れ、矢尻と矢羽を交互に置きます。",
  },
  measured: "The three nock ends extend farther from the intersection than the small leaf-shaped heads. The heads reuse the leaf-ended arrow construction at the shorter length and narrower width of this cell.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, second row, second column from the right: 三ッ矢違", ja: "左頁、二段目、右から二列目「三ッ矢違」" }, read: READ, measured: true },
  build(c) {
    threeWholeArrowsBuild(c, R);
  },
});

export const maruNiMitsuChigaiYa = defineCrest({
  id: "maru-ni-mitsu-chigai-ya",
  name: { en: "Three crossed arrows in a circle", ja: "丸に三つ違い矢" },
  reading: "まるにみつちがいや",
  romaji: "maru ni mitsu chigai ya",
  frame: "ring-medium",
  motifs: [{ motif: "arrow", count: 3, arrangement: "crossed" }],
  families: [],
  aliases: ["丸ニ三ッちがひ矢"],
  construction: {
    en: "Three arrows cross below the centre of the ring. The upright arrow's feathered end points up, and those beside it stand at equal diagonal angles. Short, solid heads point to the lower edge of the ring.",
    ja: "輪の中心より下で三本の矢を交差させます。真ん中の矢羽を上に向け、両脇の矢は同じ角度に傾けます。短く塗りつぶした矢尻は輪の下側に向きます。",
  },
  measured: "The crossing sits below the ring's centre. The two diagonal shafts are balanced at 61 degrees from upright. The plain heads stop close to the ring and appear slightly shorter than the heads in the unframed crest.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, third row, fourth column from the right: 丸ニ三ッちがひ矢", ja: "左頁、三段目、右から四列目「丸ニ三ッちがひ矢」" }, read: READ, measured: true },
  build(c) {
    threeWholeArrowsBuild(c, c.ring("ring-medium") - RING_GAP, true);
  },
});
