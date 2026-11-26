import { mitsuKurumiBuild } from "./drawn/kurumi.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuKurumi = defineCrest({
  id: "mitsu-kurumi",
  name: { en: "Three walnuts", ja: "三つ胡桃" },
  reading: "みつくるみ",
  romaji: "mitsu kurumi",
  frame: "none",
  motifs: [{ motif: "walnut", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッくるみ"],
  source: cell(27, "left page, row 4, third column from the right: 三ッくるみ", "左頁、四段目、右から三列目「三ッくるみ」"),
  measured: "Three lobed hulls alternate with three pointed leaves. A small round heart joins the stems. The paired seams inside each hull curl back towards its foot.",
  construction: {
    en: "Strike the round centre and alternate three lobed hulls with three narrow leaves. Leave the curved seams of the hulls and the ruled leaf veins white.",
    ja: "丸い中心を打ち、胡桃の実三つと細長い葉三枚を交互に置きます。実の曲がった筋と葉のまっすぐな葉脈を白く残します。",
  },
  build: mitsuKurumiBuild,
});
