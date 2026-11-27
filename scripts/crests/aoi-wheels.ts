import { aoiGurumaBuild, mitsuWariAoiBuild, mitsuWariTachiAoiBuild } from "./drawn/aoi-wheels.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const aoiGuruma = defineCrest({
  id: "aoi-guruma",
  name: { en: "Hollyhock wheel", ja: "葵車" },
  reading: "あおいぐるま",
  romaji: "aoi guruma",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["葵くるま"],
  construction: { en: "Six veined hollyhock leaves point toward the hub. Every stem bends through the channel between two leaves and turns back into a leaf at the outer edge.", ja: "葵の葉を六枚、葉先を軸に向けて置きます。茎をとなり合う葉の間に通し、外側で巻き返して葉の根元へつなぎます。" },
  measured: "The leaves have pointed inner tips and curled bases by the rim. Their six stalks curve in the same direction, leaving six open channels around a round centre. The leaf construction is the same as the published hollyhock.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, second row, fourth column from the right: 葵くるま", ja: "右頁、二段目、右から四列目「葵くるま」" }, read: "2026-11-26", measured: true },
  build(c) {
    aoiGurumaBuild(c);
  },
});

export const mitsuWariAoi = defineCrest({
  id: "mitsu-wari-aoi",
  name: { en: "Three-part split hollyhock", ja: "三つ割り葵" },
  reading: "みつわりあおい",
  romaji: "mitsu wari aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリあふひ"],
  construction: { en: "Three long halves of hollyhock leaves turn inside a circular edge. Each half has one eye at the broad end and a fan of veins toward its tapering tip.", ja: "葵の片葉を三枚、丸い輪郭の中で回して置きます。それぞれの広い根元に巻き目を一つ置き、細い葉先へ葉脈を広げます。" },
  measured: "Three elongated half-leaves follow the outer circle at their points, with the curled eyes set about a third of a turn apart. The curved open channels between them form one three-armed opening.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, first row, third column from the right: 三ッワリあふひ", ja: "左頁、一段目、右から三列目「三ッワリあふひ」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuWariAoiBuild(c);
  },
});

export const mitsuWariTachiAoi = defineCrest({
  id: "mitsu-wari-tachi-aoi",
  name: { en: "Three-part split standing hollyhock", ja: "三つ割り立ち葵" },
  reading: "みつわりたちあおい",
  romaji: "mitsu wari tachi aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリ立葵"],
  construction: { en: "Three hollyhock leaves meet at their points in the middle. The outer portions alternate clipped leaves with curved stalks inside the round edge.", ja: "葵の葉を三枚置き、葉先を中央で合わせます。丸い外縁の内側には切り分けた片葉と曲がった茎を交互に置きます。" },
  measured: "Three heart leaves occupy the centre of the print, with three small veined leaf portions tucked along the edge. Curved stems separate the broad outer openings.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, second row, fourth column from the right: 三ッワリ立葵", ja: "左頁、二段目、右から四列目「三ッワリ立葵」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuWariTachiAoiBuild(c);
  },
});
