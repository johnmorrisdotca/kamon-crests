import { kenMitsuAoiBuild } from "./drawn/aoi-three-swords.ts";
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

export const kenMitsuAoi = defineCrest({
  id: "ken-mitsu-aoi",
  name: { en: "Three hollyhock leaves with swords", ja: "剣三つ葵" },
  reading: "けんみつあおい",
  romaji: "ken mitsu aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }, { motif: "sword", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["けん三ッあふひ"],
  construction: { en: "Three pointed hollyhock leaves face outwards around a round centre. A flared blade projects between each pair of leaves.", ja: "丸い中心のまわりに葵の葉を三枚置き、葉先を外に向けます。となり合う葉の間には、先が広がった剣を一本ずつ伸ばします。" },
  measured: "The three point-out leaves surround a small hub. Between them are three blades with narrow necks and wide shoulders near their outer points. The drawing reuses the published hollyhock leaf and aligns the leaves and blade points at equal turns.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, first row, second column from the right: けん三ッあふひ", ja: "左頁、一段目、右から二列目「けん三ッあふひ」" }, read: "2026-11-27", measured: true },
  build: kenMitsuAoiBuild,
});
