import { SHINSEN_MONCHO } from "./books.ts";
import { musubiKikyoBuild } from "./drawn/kikyo-curled.ts";
import { defineCrest } from "./util.ts";

export const musubiKikyo = defineCrest({
  id: "musubi-kikyo",
  name: { en: "Knotted balloon flower", ja: "結び桔梗" },
  reading: "むすびききょう",
  romaji: "musubi kikyō",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["むすびききやう"],
  construction: {
    en: "Five pointed bands turn around the centre. Each band passes over the next and rolls in towards the heart, with white left between the two ends of its curl.",
    ja: "先のとがった帯を五本、中心のまわりに並べます。それぞれ次の帯の上を通り、花の中心に向かって巻きます。巻いた先と帯の間に白いすき間を残します。",
  },
  measured: "The five outside points stand at roughly equal intervals. Each band is about a tenth of the tip reach in width, and curls around an opening a little under a quarter of that reach across. The compass curls have radii 12 and 20 about centres about 38 from the heart. The book's loops are narrower and tilted. The drawing uses the same circular loop at each turn and makes the brush-outlined bands solid.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: { en: "right page, fourth row, third column from the right: むすびききやう", ja: "右頁、四段目、右から三列目「むすびききやう」" },
    read: "2026-11-26",
    measured: true,
  },
  build: musubiKikyoBuild,
});
