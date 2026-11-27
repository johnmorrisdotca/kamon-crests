import { mitsuTsuruAoiBuild } from "./drawn/aoi-vine-leaves.ts";
import { itowaNiItsutsuUraAoiBuild } from "./drawn/aoi-variants.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const itowaNiItsutsuUraAoi = defineCrest({
  id: "itowa-ni-itsutsu-ura-aoi",
  name: { en: "Five reverse hollyhocks in a thread ring", ja: "糸輪に五つ裏葵" },
  reading: "いとわにいつつうらあおい",
  romaji: "itowa ni itsutsu ura aoi",
  frame: "ring-thread",
  motifs: [{ motif: "hollyhock", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワニ五ッうらあふひ"],
  construction: { en: "Five pointed leaves turn around a round centre, with twin curled cuts at each leaf’s base. Two fine stems connect each leaf to the centre, and a thread ring encloses the design.", ja: "先のとがった葉を五枚、丸い中心のまわりに回して置きます。葉の根元を内へ巻く形に二つずつ白く抜き、葉と中心を細い茎二本でつなぎ、全体を糸輪に収めます。" },
  measured: "The printed reverse leaves have little interior detail beyond paired curls and narrow stalks. Their pointed tips nearly touch the thin ring. The drawing evens their turns and uses the package’s thread ring.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, second row, first column from the right: 糸ワニ五ッうらあふひ", ja: "右頁、二段目、右から一列目「糸ワニ五ッうらあふひ」" }, read: "2026-11-26", measured: true },
  build(c) {
    itowaNiItsutsuUraAoiBuild(c);
  },
});

export const mitsuTsuruAoi = defineCrest({
  id: "mitsu-tsuru-aoi",
  name: { en: "Three vining hollyhocks", ja: "三つ蔓葵" },
  reading: "みつつるあおい",
  romaji: "mitsu tsuru aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッつるあふひ"],
  construction: { en: "Three pointed leaves face outwards around a round centre. Between each pair, a long curved vine ends in an open curl.", ja: "丸い中心のまわりに葵の葉を三枚置き、葉先を外へ向けます。となり合う葉の間から長い蔓を伸ばし、その先を輪のように巻きます。" },
  measured: "The three branches turn with the intervening leaves. Each has a long bowed reach and an open curl about one leaf’s shoulder wide. The drawing uses the older hollyhock leaf and turns the three vine units equally around the centre.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, fourth row, second column from the right: 三ッつるあふひ", ja: "左頁、四段目、右から二列目「三ッつるあふひ」" }, read: "2026-11-27", measured: true },
  build: mitsuTsuruAoiBuild,
});
