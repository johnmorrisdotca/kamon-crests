import { SHINSEN_MONCHO } from "./books.ts";
import { hanagataSuhamaBuild, suhamaKirikuchiBuild } from "./drawn/suhama.ts";
import { defineCrest } from "./util.ts";

export const hanagataSuhama = defineCrest({
  id: "hanagata-suhama",
  name: { en: "Flower-shaped sandbar tray", ja: "花形州浜" },
  reading: "はながたすはま",
  romaji: "hanagata suhama",
  frame: "none",
  motifs: [{ motif: "sandbar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花がたすは濱"],
  construction: {
    en: "Three rounded crowns meet around a filled centre. Each crown has a large middle lobe and two smaller shoulders.",
    ja: "丸いふくらみのある形を三つ、墨を入れた中心のまわりで合わせます。それぞれ真ん中を大きく、両脇を小さくします。",
  },
  measured: "The print fits three rounded crowns into a triangular outline. Each crown has one main lobe with a smaller lobe at either side.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "left page, second row, third column from the right: 花がたすは濱", ja: "左頁、二段目、右から三列目「花がたすは濱」" }, read: "2026-11-26", measured: true },
  build: hanagataSuhamaBuild,
});

export const suhamaKirikuchi = defineCrest({
  id: "suhama-kirikuchi",
  name: { en: "Cut face of a sandbar tray", ja: "州浜切り口" },
  reading: "すはまきりくち",
  romaji: "suhama kirikuchi",
  frame: "none",
  motifs: [{ motif: "sandbar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["すはま切くち"],
  construction: {
    en: "Open a round centre in the black disc. Set twelve pairs of white ribs between the centre and rim, each pair spreading towards the rim.",
    ja: "黒い円の中心を丸く抜きます。中心と縁の間に白い筋を二本ずつ十二組抜き、縁に近づくほど広げます。",
  },
  measured: "The cell shows twelve pairs of grooves at regular intervals, midway between the upright and the next radius. On the 96-radius layout the centre opening is about 22 in radius, and the grooves run from about 25 to 91. The near ends sit about 1 to 3 units from each spoke axis, and the far ends about 3 to 9 units away. Both sides of each pair are made symmetric.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "left page, second row, fourth column from the right: すはま切くち", ja: "左頁、二段目、右から四列目「すはま切くち」" }, read: "2026-11-27", measured: true },
  build: suhamaKirikuchiBuild,
});
