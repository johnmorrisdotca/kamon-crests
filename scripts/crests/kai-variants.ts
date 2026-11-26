import { chuwaNiHitotsuItayagaiBuild, chuwaNiShiriawaseHamaguriBuild } from "./drawn/kai.ts";
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

export const chuwaNiShiriawaseHamaguri = defineCrest({
  id: "chuwa-ni-shiriawase-hamaguri",
  name: { en: "Back-to-back clams in a medium ring", ja: "中輪に尻合わせ蛤" },
  reading: "ちゅうわにしりあわせはまぐり",
  romaji: "chūwa ni shiriawase hamaguri",
  frame: "ring-medium",
  motifs: [{ motif: "shell", count: 3, arrangement: "triangle" }],
  families: [],
  source: cell(7, "left page, row 1, fourth column from the right: 中ワニ尻合蛤", "左頁、一段目、右から四列目「中ワニ尻合蛤」"),
  measured:
    "The cell shows three clams, with an outward arc in each group and three blunt backs pointing into the middle. The top clam is about 183 pixels wide and 99 high. Four curved growth marks show on either side of its middle, above a broad opening. The drawing regularises the three places and uses the package's medium ring.",
  construction: {
    en: "Three clams face outwards from a triangular opening inside a medium ring. The wide upper part of each shell is cut by four paired growth marks. A compound arc separates the two valves and a small arc marks the hinge.",
    ja: "中輪の中に蛤を三つ収め、三角の白を囲んで外を向けます。それぞれの殻の広い上側に、左右四本ずつ成長線を弧で入れます。弧をつないで二枚の殻を分け、小さな弧でちょうつがいを表します。",
  },
  build: chuwaNiShiriawaseHamaguriBuild,
});
