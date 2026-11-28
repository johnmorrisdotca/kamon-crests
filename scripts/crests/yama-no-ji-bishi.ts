import { SHINSEN_MONCHO } from "./books.ts";
import { yamaNoJiBishiBuild } from "./drawn/yama-no-ji-bishi.ts";
import { defineCrest } from "./util.ts";

export const yamaNoJiBishi = defineCrest({
  id: "yama-no-ji-bishi",
  name: { en: "Mountain character lozenge", ja: "山の字菱" },
  reading: "やまのじびし",
  romaji: "yama no ji bishi",
  frame: "none",
  motifs: [{ motif: "yama-no-ji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["山の字ひし"],
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "right page, row 1, third column from the right: 山の字ひし (measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から三列目「山の字ひし」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A lozenge with three white openings that leave the strokes of the character 山: two round openings with a bite taken from their lower inner side, high up on either side of the middle, and a small flat triangular opening below them. In the printed cell the lozenge is about 950 across and 770 high, the round openings are about 95 across the radius with their centres about 165 either side of the middle and 120 above it, and the triangle is about 260 wide and 130 high with its top bowed up. The printed lozenge and openings are a little uneven, and the drawing makes them symmetric.",
  construction: {
    en: "Rule a lozenge 96 to each side and 77 up and down. Cut two circles of 19.2 across the radius, centred 32 either side of the middle and 23.4 above it, and bite each with a circle of 41.2 centred 13.2 to the middle side and 28.8 below the middle. Cut a flat triangle below them, its top an arc and its point 39 below the middle.",
    ja: "左右96、上下77の菱形を引きます。中心から左右に32、上に23.4のところを中心に、半径19.2の円を二つ抜き、それぞれの下の内側を、中心側へ13.2、中心の28.8下を中心とする半径41.2の円で欠きます。その下に、上を弧にした平たい三角形を、先を中心の39下にして抜きます。",
  },
  build: yamaNoJiBishiBuild,
});
