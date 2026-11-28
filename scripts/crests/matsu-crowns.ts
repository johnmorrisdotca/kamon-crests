import { mitsuKuromatsuBuild } from "./drawn/mitsu-kuromatsu.ts";
import { kuroMatsuBuild } from "./drawn/matsu-crowns.ts";
import { chuwaItsutsuMatsuBuild, hosowaMitsuMatsuBuild } from "./drawn/matsu-wheels.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";
import { mitsuWariKuroMatsuBuild } from "./drawn/matsu-needle-fans.ts";

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

export const hosowaMitsuMatsu = defineCrest({
  id: "hosowa-mitsu-matsu",
  name: { en: "Three pines in a fine ring", ja: "細輪三つ松" },
  reading: "ほそわみつまつ",
  romaji: "hosowa mitsu matsu",
  frame: "ring-thin",
  motifs: [{ motif: "pine", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["細ワ三ッ松"],
  construction: { en: "Three pine crowns turn inward inside a fine ring. The trunks face the ring and the broad crowns nearly meet at the centre.", ja: "細い輪の内側に、松の冠を三つ内向きに並べます。幹は輪へ向け、幅広い冠を中央で近づけます。" },
  measured: "The three inward crowns, their clearance and the fine ring are measured from the book cell. The built pine motif is reused at equal third turns.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, fourth row, fourth column from the right: 細ワ三ッ松", ja: "左頁、四段目、右から四列目「細ワ三ッ松」" }, read: "2026-11-27", measured: true },
  build: hosowaMitsuMatsuBuild,
});

export const mitsuWariKuroMatsu = defineCrest({
  id: "mitsu-wari-kuro-matsu",
  name: { en: "Three divided black pines", ja: "三つ割り黒松" },
  reading: "みつわりくろまつ",
  romaji: "mitsu wari kuro matsu",
  frame: "none",
  motifs: [{ motif: "pine", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリくろまつ"],
  construction: { en: "Three dense fans of straight pine needles cover the round field. Three small white joints stand at the base of each fan.", ja: "密に並ぶまっすぐな松葉の扇を三つ、丸い場に広げます。扇ごとの根元に白い小さな節を三つ残します。" },
  measured: "The labelled cell sets the crowded fan widths, the positions of their white joints and the three separate tips of the central opening. The fans repeat by exact third turns.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, third row, fourth column from the right: 三ッワリくろまつ", ja: "左頁、三段目、右から四列目「三ッワリくろまつ」" }, read: "2026-11-27", measured: true },
  build: mitsuWariKuroMatsuBuild,
});

export const mitsuKuromatsu = defineCrest({
  id: "mitsu-kuromatsu",
  name: { en: "Three black pines", ja: "三つ黒松" },
  reading: "みつくろまつ",
  romaji: "mitsu kuromatsu",
  frame: "none",
  motifs: [{ motif: "pine", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッくろ松"],
  construction: {
    en: "Three oval sprays turn about the centre. Thirty ruled needles leave each round hub, which has three small paper eyes.",
    ja: "三つの楕円形の松葉を中心のまわりに配します。小さな白い目を三つ残した丸い根元から、三十本の松葉を定規で伸ばします。",
  },
  measured: "The three hubs, oval spread of the needles and openings between the sprays were measured from the 1892 cell. The three sprays use exact turns of one layout.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, second row, fourth column from the right: 三ッくろ松", ja: "左頁、二段目、右から四列目「三ッくろ松」" }, read: "2026-11-27", measured: true },
  build: mitsuKuromatsuBuild,
});
