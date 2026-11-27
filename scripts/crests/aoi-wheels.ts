import { aoiGurumaBuild } from "./drawn/aoi-wheels.ts";
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
