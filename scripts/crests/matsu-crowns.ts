import { kuroMatsuBuild } from "./drawn/matsu-crowns.ts";
import { chuwaItsutsuMatsuBuild } from "./drawn/matsu-wheels.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const kuroMatsu = defineCrest({
  id: "kuro-matsu",
  name: { en: "Black pine", ja: "黒松" },
  reading: "くろまつ",
  romaji: "kuro matsu",
  frame: "none",
  motifs: [{ motif: "pine", count: 1, arrangement: "upright" }],
  families: [],
  aliases: ["くろ松"],
  construction: { en: "A scalloped pine canopy and curved branch stand above a row of straight trunks.", ja: "丸い刻みのある松の冠と弧の枝を、まっすぐ並ぶ幹の上に置きます。" },
  measured: "The spreading crown and raised central rib follow the plain pine. An array of vertical barred trunks replaces the broad foot.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, first row, second column from the right: くろ松", ja: "左頁、一段目、右から二列目「くろ松」" }, read: "2026-11-26", measured: true },
  build(c) {
    kuroMatsuBuild(c);
  },
});

export const chuwaItsutsuMatsu = defineCrest({
  id: "chuwa-itsutsu-matsu",
  name: { en: "Five pines in a medium ring", ja: "中輪五つ松" },
  reading: "ちゅうわいつつまつ",
  romaji: "chūwa itsutsu matsu",
  frame: "ring-medium",
  motifs: [{ motif: "pine", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["中ワ五ッまつ"],
  construction: { en: "Five pine crowns fill a medium ring. Their flared trunks meet around a single round joint, with narrow openings between the trees.", ja: "中輪の内側を松の冠五つで満たします。裾の広がった幹を一つの丸い節のまわりに寄せ、木の間に細いすき間を残します。" },
  measured: "The labelled cell gives the five sectors, the relative width of the crowns and the single round centre. The built pine silhouette is reused and cut to equal sectors.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, second row, third column from the right: 中ワ五ッまつ", ja: "左頁、二段目、右から三列目「中ワ五ッまつ」" }, read: "2026-11-27", measured: true },
  build: chuwaItsutsuMatsuBuild,
});
