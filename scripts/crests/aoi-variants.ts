import { kenMitsuAoiBuild } from "./drawn/aoi-three-swords.ts";
import { itowaNiItsutsuUraAoiBuild } from "./drawn/aoi-variants.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";
import { mutsuAoiGurumaBuild } from "./drawn/aoi-leaf-wheel.ts";
import { matsubaAoiBuild } from "./drawn/aoi-pine-needle.ts";

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

export const matsubaAoi = defineCrest({
  id: "matsuba-aoi",
  name: { en: "Pine-needle hollyhock", ja: "松葉葵" },
  reading: "まつばあおい",
  romaji: "matsuba aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["松葉あふひ"],
  construction: { en: "Two heart-shaped leaves face away from each other. Their crossing stems enclose a long pine-needle opening and spread into two short branches at the foot.", ja: "心形の葉を二枚、葉先を外に向けて置きます。交差する茎の間を松葉のように細長く白く抜き、根元から短い枝を二本広げます。" },
  measured: "The two leaves have different sizes in the print. The larger leaf points to the lower left, while the shorter one points to the lower right. The drawing retains that balance, the open space between the two curved stalks and the flared foot.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "left page, first row, first column from the right: 松葉あふひ", ja: "左頁、一段目、右から一列目「松葉あふひ」" }, read: "2026-11-27", measured: true },
  build: matsubaAoiBuild,
});
