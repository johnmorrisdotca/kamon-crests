import { mokkoNiUmeBachiBuild } from "./drawn/mokko-variants.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mokkoNiUmeBachi = defineCrest({
  id: "mokko-ni-ume-bachi",
  name: { en: "Plum bowl in a lobed frame", ja: "木瓜に梅鉢" },
  reading: "もっこうにうめばち",
  romaji: "mokkō ni umebachi",
  frame: "mokko",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["瓜に梅鉢", "瓜ニ梅ばち"],
  source: cell(28, "right page, row 2, second column from the right: 瓜ニ梅ばち", "右頁、二段目、右から二列目「瓜ニ梅ばち」"),
  measured: "Five circular petals sit around a small round heart with short filaments. The petals are about 60 pixels across, and their centres stand about 56 pixels out. Five broad lobes with curved shoulders surround them, and a band curls at both tips inside each lobe. The top lobe is centred above a round petal.",
  construction: {
    en: "Place five round petals around a small central disc. Short filaments stand in the gaps around the heart. Each petal has a rounded lobe and a hooked band beyond it, and the five outer pieces stand one fifth of a turn apart.",
    ja: "小さな円を囲んで丸い花びらを五枚置き、中心との間に短いしべを入れます。各花びらの外側に丸い裂片と両端を巻いた帯を置き、外の五組を5分の1回転ずつ離します。",
  },
  build: mokkoNiUmeBachiBuild,
});
