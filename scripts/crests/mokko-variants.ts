import { mokkoNiUmeBachiBuild, uriNiChigaiTakanohaBuild } from "./drawn/mokko-variants.ts";
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

export const uriNiChigaiTakanoha = defineCrest({
  id: "uri-ni-chigai-takanoha",
  name: { en: "Crossed hawk feathers in a melon", ja: "瓜に違い鷹の羽" },
  reading: "うりにちがいたかのは",
  romaji: "uri ni chigai takanoha",
  frame: "mokko",
  motifs: [{ motif: "hawk-feather", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["瓜ニ違鷹"],
  source: cell(28, "right page, row 1, second column from the right: 瓜ニ違鷹", "右頁、一段目、右から二列目「瓜ニ違鷹」"),
  measured: "The crossed feathers occupy just under half of the width of the five-lobed frame. The front shaft runs from the lower left toward the upper right. The five hooked bands follow the same arrangement as the plum bowl in the cell below.",
  construction: {
    en: "Set five lobes and their hooked bands around the centre. Inside them cross two ruled feathers at right angles, with the upper-right feather in front and the white shaft lines and chevrons kept narrow.",
    ja: "中心のまわりに丸い裂片を五つ置き、内側に両端が巻いた帯を添えます。その中で定規で引いた二枚の羽を直角に交差させ、右上へ向く羽を手前にし、羽軸と山形の白線を細く残します。",
  },
  build: uriNiChigaiTakanohaBuild,
});
