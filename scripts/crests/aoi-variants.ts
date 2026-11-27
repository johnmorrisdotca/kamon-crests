import { matsubaAoiBuild } from "./drawn/aoi-pine-needle.ts";
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
