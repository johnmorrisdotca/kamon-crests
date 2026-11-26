import { SHINSEN_MONCHO } from "./books.ts";
import { hanagataSuhamaBuild } from "./drawn/suhama.ts";
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
