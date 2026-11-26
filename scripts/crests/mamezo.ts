import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/mamezo.ts";
import { defineCrest } from "./util.ts";

export const mitsuMamezo = defineCrest({
  id: "mitsu-mamezo",
  name: { en: "Three balancing dolls", ja: "三つ豆蔵" },
  reading: "みつまめぞう",
  romaji: "mitsu mamezō",
  frame: "none",
  motifs: [{ motif: "mamezo-doll", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッまめぞう", "三つ豆造"],
  construction: {
    en: "Three balancing dolls turn around the centre. Each has a triangular hat, a flared cloak and two curved arms carrying round weights.",
    ja: "三つの釣合い人形を中心のまわりに回して置きます。各人形に三角の笠と裾の広がる合羽を置き、弧を描く両腕の先に丸い重りを添えます。",
  },
  measured: "Three broad capes, three triangular hats and paired balancing weights are clear in the print. The drawing turns the figures at equal angles and shortens the outer curved arms, leaving wider gaps between them.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, third row, first column from the right: 三ッまめぞう", ja: "左頁、三段目、右から一列目「三ッまめぞう」" }, read: "2026-11-26", measured: true },
  build: drawn.mitsuMamezoBuild,
});
