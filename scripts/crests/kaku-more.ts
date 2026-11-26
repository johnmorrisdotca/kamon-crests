import { komochiKakuBuild, teppoKakuBuild } from "./drawn/kaku-more.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const komochiKaku = defineCrest({
  id: "komochi-kaku",
  name: { en: "Parent and child squares", ja: "子持ち角" },
  reading: "こもちかく",
  romaji: "komochi kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["子持角"],
  source: cell(19, "right page, row 2, third column from the right: 子持角", "右頁、二段目、右から三列目「子持角」"),
  measured: "An outer square on its corner stands about 304 pixels high. Three smaller outlines inside it span about 178, 140 and 114 pixels. The drawing takes their corner radii as 96, 56, 44 and 36, keeping the outer band wide, the inner band narrow and a thin white space between them.",
  construction: {
    en: "Four concentric squares stand on their corners. The space between the outer two makes a broad band. The space between the inner two makes a second, narrower band inside it.",
    ja: "角を上下左右に向けた正方形を、中心をそろえて四つ描きます。外側の二つの間を太い帯にし、内側の二つの間を細い帯にします。",
  },
  build: komochiKakuBuild,
});

export const teppoKaku = defineCrest({
  id: "teppo-kaku",
  name: { en: "Square with a round opening", ja: "鉄砲角" },
  reading: "てっぽうかく",
  romaji: "teppō kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["鉄炮角"],
  source: cell(19, "right page, row 3, fourth column from the right: 鉄炮角", "右頁、三段目、右から四列目「鉄炮角」"),
  measured: "The outer square stands on its corner and is about 300 pixels across the opposite points. The central circle is about 191 across. The drawing gives the circle radius 62.5 and the square the full layout radius of 96 across each half diagonal.",
  construction: {
    en: "A square stands on its corner around a concentric circular opening. The circle nearly reaches the middle of each ruled side and leaves the four corners broad.",
    ja: "角を上下左右に向けた正方形の中心を丸く抜きます。白い円を四辺の中央近くまで広げ、四つの角は広く残します。",
  },
  build: teppoKakuBuild,
});
