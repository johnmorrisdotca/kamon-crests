import { mitsuwariKurusuBuild } from "./drawn/mitsuwari-kurusu.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuwariKurusu = defineCrest({
  id: "mitsuwari-kurusu",
  name: { en: "Three divided floral crosses", ja: "三つ割りクルス" },
  reading: "みつわりくるす",
  romaji: "mitsuwari kurusu",
  frame: "none",
  motifs: [{ motif: "cross", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリくるす"],
  source: cell(28, "left page, row 1, first column from the right: 三ッワリくるす", "左頁、一段目、右から一列目「三ッワリくるす」"),
  measured: "Three partial floral crosses point outwards. Each shows its small hub, two notched petals and a wide curved band. The fields between them carry three small points towards the centre and three along the rim.",
  construction: {
    en: "Strike the round field and draw three pairs of arcs about centres on its rim. Leave the petal seams, the three central darts and the three small rim darts white.",
    ja: "丸い地を打ち、その縁に置いた三つの中心からそれぞれ二本の弧を引きます。花弁の境、中央の三つの尖り、縁の三つの小さな尖りを白く残します。",
  },
  build: mitsuwariKurusuBuild,
});
