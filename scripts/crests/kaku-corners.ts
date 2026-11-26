import { kakuiriKakuBuild } from "./drawn/kaku-corners.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const kakuiriKaku = defineCrest({
  id: "kakuiri-kaku",
  name: { en: "Square with stepped corners", ja: "角入り角" },
  reading: "かくいりかく",
  romaji: "kakuiri kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["角入角"],
  source: cell(19, "right page, row 2, fourth column from the right: 角入角", "右頁、二段目、右から四列目「角入角」"),
  measured: "An upright square makes one broad band. Each corner steps inward in the outer outline and in the opening. The little shoulders end in circular arcs. The square opening is about two thirds as wide as the outer square.",
  construction: {
    en: "Rule two concentric squares, one large and one small. Each corner steps in, with two short perpendicular sides and two round shoulders. The space between the two outlines makes a broad square band.",
    ja: "中心をそろえて大小の正方形を描きます。それぞれの角を二本の短い直線で内側に入れ、肩を二つの円弧で丸くします。二つの輪郭の間を太い四角の帯にします。",
  },
  build: kakuiriKakuBuild,
});
