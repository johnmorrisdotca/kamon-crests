import { SHINSEN_MONCHO } from "./books.ts";
import { sumiTateWariYotsuHanabishiBuild } from "./drawn/hanabishi-corner-panels.ts";
import { defineCrest } from "./util.ts";

export const sumiTateWariYotsuHanabishi = defineCrest({
  id: "sumi-tate-wari-yotsu-hanabishi",
  name: { en: "Corner-up four split flower lozenges", ja: "隅立て割り四花菱" },
  reading: "すみたてわりよつはなびし",
  romaji: "sumi tate wari yotsu hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["角立ワリ四花びし"],
  construction: {
    en: "A lozenge has a broad inward petal at each corner. The scalloped shoulders meet along the ruled rim and leave an opening around the centre.",
    ja: "菱形の四隅から広い花弁を内向きに置きます。花弁の丸い張り出しが直線の縁でつながり、中央のまわりに空きが残ります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, third row, first column from the right: 角立ワリ四花びし", ja: "右頁、三段目、右から一列目「角立ワリ四花びし」" }, read: "2026-11-27", measured: true },
  measured: "The two side scallops, inner lobe and three short veins follow the top corner in frame 9. Equal quarter turns regularise the four printed panels and the ruled lozenge.",
  build: sumiTateWariYotsuHanabishiBuild,
});
