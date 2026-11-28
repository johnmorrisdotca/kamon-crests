import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuKumiawaseYamagataBuild } from "./drawn/mitsu-kumiawase-yamagata.ts";
import { defineCrest } from "./util.ts";

export const mitsuKumiawaseYamagata = defineCrest({
  id: "mitsu-kumiawase-yamagata",
  name: { en: "Three mountain forms joined together", ja: "三つ組合せ山形" },
  reading: "みつくみあわせやまがた",
  romaji: "mitsu kumiawase yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ組合山がた", "三つ組合山形"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 1, third column from the right: 三ッ組合山がた (measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から三列目「三ッ組合山がた」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Three bent bands meet at one point, each lying beside the next with a narrow white gap, so that three double arms run up, down to the left and down to the right at about 30 degrees to the level. In the printed cell each band is about 62 wide measured along an arm's axis and the arms are about 163 long. The printed cell shows the arms' ends cut parallel to the neighbouring arm, and its two sides differ by a few degrees. The drawing makes the three bands one band turned a third of the way twice.",
  construction: {
    en: "Rule a band that bends at a corner of 120 degrees, with each arm's end cut parallel to the other arm. Turn it a third of the way round twice, so that the three bands meet at the centre with a narrow white gap between each pair.",
    ja: "120度に曲がった帯を引き、それぞれの端をもう一方の脚と平行に切ります。それを3分の1回転ずつ二回回して、中心で三つの帯を合わせ、帯と帯の間に細い白いすき間を残します。",
  },
  build: mitsuKumiawaseYamagataBuild,
});
