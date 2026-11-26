import { chuwaNiHitotsuItayagaiBuild } from "./drawn/kai.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const chuwaNiHitotsuItayagai = defineCrest({
  id: "chuwa-ni-hitotsu-itayagai",
  name: { en: "One scallop in a medium ring", ja: "中輪に一つ板屋貝" },
  reading: "ちゅうわにひとついたやがい",
  romaji: "chūwa ni hitotsu itayagai",
  frame: "ring-medium",
  motifs: [{ motif: "shell", count: 1, arrangement: "single" }],
  families: [],
  source: cell(7, "right page, row 1, first column from the right: 中ワニ一ッいたや貝", "右頁、一段目、右から一列目「中ワニ一ッいたや貝」"),
  measured:
    "The cell has a ring about 295 pixels across, with an upright fan about 226 across at the shoulders. The fan has eight plain radial ribs about 15 degrees apart, two broad hanging ears and one rounded hinge below. The drawing uses the package's medium ring, eight ribs on a 15-degree pitch and three rounded grooves on each ear.",
  construction: {
    en: "Eight plain ribs spread upwards from a rounded hinge inside a medium ring. Each rib widens towards a rounded end. A grooved ear hangs below the ribs at either side, with three narrow arc-shaped cuts in each ear.",
    ja: "中輪の中に、丸いちょうつがいから上へ広がる八本のすじを収めます。すじは丸い先に向かって広がります。左右には耳が下がり、それぞれ三本の細い弧の溝を入れます。",
  },
  build: chuwaNiHitotsuItayagaiBuild,
});
