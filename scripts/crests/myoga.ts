import { hanadakiMyogaBuild } from "./drawn/myoga.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const hanadakiMyoga = defineCrest({
  id: "hanadaki-myoga",
  name: { en: "Two flowering ginger shoots", ja: "花抱き茗荷" },
  reading: "はなだきみょうが",
  romaji: "hanadaki myōga",
  frame: "none",
  motifs: [{ motif: "ginger", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["花抱めうが"],
  construction: { en: "Two arched ginger shoots frame an opening and carry round flowers low on either side.", ja: "弧を描く二本の茗荷で中央のあきを囲み、両側の低い位置に丸い花をつけます。" },
  measured: "Both flowers follow the same layout, reflected along with their stalks and broad bracts.",
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, third row, third column from the right: 花抱めうが", ja: "右頁、三段目、右から三列目「花抱めうが」" }, read: "2026-11-26", measured: true },
  build(c) {
    hanadakiMyogaBuild(c);
  },
});
