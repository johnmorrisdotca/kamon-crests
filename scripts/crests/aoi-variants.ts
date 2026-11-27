import { itowaNiItsutsuUraAoiBuild, hosowaNiHanaTachiAoiBuild } from "./drawn/aoi-variants.ts";
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

export const hosowaNiHanaTachiAoi = defineCrest({
  id: "hosowa-ni-hana-tachi-aoi",
  name: { en: "Flowering upright hollyhock in a thin ring", ja: "細輪に花立ち葵" },
  reading: "ほそわにはなたちあおい",
  romaji: "hosowa ni hana tachi aoi",
  frame: "ring-thin",
  motifs: [{ motif: "hollyhock", count: 2, arrangement: "upright" }],
  families: [],
  aliases: ["細ワニ花立葵"],
  construction: { en: "Two heart-shaped leaves spread from bowed stems. The upright stem carries a five-point bloom and a taller cluster above it. A thin ring encloses the plant.", ja: "弓なりの茎から心形の葉を左右に広げます。中央の茎には先が五つにとがる花を置き、その上にもう一段の花を重ねます。全体を細輪に収めます。" },
  measured: "The paper shows a left and a right leaf beside an upright stem. Its central five-point blossom and the taller crown are distinct, and a thin white channel runs between each of the three stems at the foot.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, third row, second column from the right: 細ワニ花立葵", ja: "左頁、三段目、右から二列目「細ワニ花立葵」" }, read: "2026-11-26", measured: true },
  build(c) {
    hosowaNiHanaTachiAoiBuild(c);
  },
});
