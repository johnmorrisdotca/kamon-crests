import { mutsuAoiGurumaBuild } from "./drawn/aoi-leaf-wheel.ts";
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

export const mutsuAoiGuruma = defineCrest({
  id: "mutsu-aoi-guruma",
  name: { en: "Six hollyhocks in a wheel", ja: "六つ葵車" },
  reading: "むつあおいぐるま",
  romaji: "mutsu aoi guruma",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["六ッ葵車"],
  construction: { en: "Six hollyhock leaves point outward around a round hub. Two slender stalks from each leaf form the spokes of the wheel.", ja: "六枚の葵の葉を、丸い軸のまわりに葉先を外へ向けて置きます。葉の根元から細い茎を二本ずつ伸ばし、車の輻のように軸へつなぎます。" },
  measured: "The print has six leaves at even turns and two narrow lines for each spoke. The leaf tips define the outer circle, with no enclosing ring. The drawing retains both stems for each of the six spokes.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, first row, first column from the right: 六ッ葵車", ja: "左頁、一段目、右から一列目「六ッ葵車」" }, read: "2026-11-27", measured: true },
  build: mutsuAoiGurumaBuild,
});
