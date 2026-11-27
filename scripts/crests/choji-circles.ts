import { mutsuChojiBuild, yatsuChojiBuild, kokonotsuChojiBuild, chuwaNiMutsuChojiBuild } from "./drawn/choji-circles.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mutsuChoji = defineCrest({
  id: "mutsu-choji",
  name: { en: "Six cloves", ja: "六つ丁子" },
  reading: "むつちょうじ",
  romaji: "mutsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["六ッ丁子"],
  construction: { en: "Six veined clove flowers radiate from a small round joint.", ja: "花脈のある丁子の花を、小さな丸い節から六方へ出します。" },
  measured: "Each clove has a pointed foot at the hub and three rounded petal lobes at its outer end.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, first row, first column from the right: 六ッ丁子", ja: "左頁、一段目、右から一列目「六ッ丁子」" }, read: "2026-11-26", measured: true },
  build(c) {
    mutsuChojiBuild(c);
  },
});

export const yatsuChoji = defineCrest({
  id: "yatsu-choji",
  name: { en: "Eight cloves", ja: "八つ丁子" },
  reading: "やつちょうじ",
  romaji: "yatsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["八ッ丁子"],
  construction: { en: "Eight veined cloves turn round a small circular joint, with outward three-lobed blossoms.", ja: "花脈のある丁子を、丸い節のまわりに八つ置きます。三つに分かれた花は外へ向けます。" },
  measured: "Eight bodies meet at the hub, and their rounded flower edges form the perimeter.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, third row, first column from the right: 八ッ丁子", ja: "左頁、三段目、右から一列目「八ッ丁子」" }, read: "2026-11-26", measured: true },
  build(c) {
    yatsuChojiBuild(c);
  },
});

export const kokonotsuChoji = defineCrest({
  id: "kokonotsu-choji",
  name: { en: "Nine cloves", ja: "九つ丁子" },
  reading: "ここのつちょうじ",
  romaji: "kokonotsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["九ッ丁子"],
  construction: { en: "Nine clove buds meet at a round centre, with grouped petals along the edge.", ja: "九つの丁子のつぼみを丸い中心に寄せ、花びらを外側にまとめます。" },
  measured: "The nine teardrop bodies meet their small central joint, while three petals mark the head of each bud.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, fourth row, first column from the right: 九ッ丁子", ja: "左頁、四段目、右から一列目「九ッ丁子」" }, read: "2026-11-26", measured: true },
  build(c) {
    kokonotsuChojiBuild(c);
  },
});

export const chuwaNiMutsuChoji = defineCrest({
  id: "chuwa-ni-mutsu-choji",
  name: { en: "Six cloves in a medium ring", ja: "中輪に六つ丁子" },
  reading: "ちゅうわにむつちょうじ",
  romaji: "chūwa ni mutsu chōji",
  frame: "ring-medium",
  motifs: [{ motif: "clove", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["中ワニ六ッ丁子"],
  construction: { en: "Six cloves form an even rosette within a medium ring. All their pointed feet meet around the joint.", ja: "中輪の内側に丁子を六つ均等に置きます。とがった根元は丸い節のまわりに集めます。" },
  measured: "The published plain clove supplies the shape of each of the six blooms. The ring leaves a narrow clearance at their outer petals.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, fourth row, fourth column from the right: 中ワニ六ッ丁子", ja: "右頁、四段目、右から四列目「中ワニ六ッ丁子」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuwaNiMutsuChojiBuild(c);
  },
});
