import { SHINSEN_MONCHO } from "./books.ts";
import { yuiwataBishiBuild } from "./drawn/yuiwata-bishi.ts";
import { defineCrest } from "./util.ts";

export const yuiwataBishi = defineCrest({
  id: "yuiwata-bishi",
  name: { en: "Knotted cotton lozenge", ja: "結綿菱" },
  reading: "ゆいわたびし",
  romaji: "yuiwata bishi",
  frame: "none",
  motifs: [{ motif: "cotton-bundle", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ゆひワたひし"],
  construction: {
    en: "Opposed cotton fans make a scalloped lozenge. Two curved folds rise on each half, and the paired side loops meet along the horizontal binding.",
    ja: "上下の結綿で、縁が波形の菱を作ります。各半分に二本ずつ弧を入れ、左右の細長い輪を中央の結びで合わせます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, fourth row, first column from the right: ゆひワたひし", ja: "右頁、四段目、右から一列目「ゆひワたひし」" }, read: "2026-11-27", measured: true },
  measured: "The printed outline is about 282 across and 255 high, with four fine flaring folds and two flattened side loops. The outline and fold arcs are measured on one half and mirrored. The binding reuses the package's cotton bands at the printed proportions.",
  build: yuiwataBishiBuild,
});
