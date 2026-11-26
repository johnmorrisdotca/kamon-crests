import { SHINSEN_MONCHO } from "./books.ts";
import { hanaKikyoBuild, musubiKikyoBuild } from "./drawn/kikyo-curled.ts";
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

export const hanaKikyo = defineCrest({
  id: "hana-kikyo",
  name: { en: "Flower balloon flower", ja: "花桔梗" },
  reading: "はなききょう",
  romaji: "hana kikyō",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 10, arrangement: "radial" }],
  families: [],
  aliases: ["花ききやう"],
  construction: {
    en: "The curved front flower covers five angled petals behind it. Seven rays fan out from a broad white bow low across its face. The two sides reflect about the upright ray.",
    ja: "弧で囲んだ手前の花を、角のある奥の花びら五枚に重ねます。花の下に引いた白い弧の上から、しべ七本を扇状に広げます。中央のしべを軸に左右を映します。",
  },
  measured: "The print is approximately 310 pixels wide by 251 tall. The upright petal rises about 109 pixels above the large side points, and the broad ray foot is about 130 pixels across. In the drawing the points are 190 apart, the top tip rises 63 above them and the ray foot spans 80. The angular rear tips keep a white gap from the curved foreground. The fan uses seven white rays in place of the source's dark brush lines.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 40,
    place: { en: "left page, first row, third column from the right: 花ききやう", ja: "左頁、一段目、右から三列目「花ききやう」" },
    read: "2026-11-26",
    measured: true,
  },
  build: hanaKikyoBuild,
});
