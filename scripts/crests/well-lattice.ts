import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiKumiawaseIgetaBuild } from "./drawn/well-lattice.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const maruNiKumiawaseIgeta = defineCrest({
  id: "maru-ni-kumiawase-igeta",
  name: { en: "Combined well frames in a circle", ja: "丸に組合せ井桁" },
  reading: "まるにくみあわせいげた",
  romaji: "maru ni kumiawase igeta",
  frame: "ring-medium",
  motifs: [{ motif: "well-frame", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["丸に組合いげた"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, fourth row, third column from the right: 丸に組合いげた", ja: "右頁、四段目、右から三列目「丸に組合いげた」" }, read: READ, measured: true },
  measured: "Three enclosed central lozenges and the open lower notch fit inside the ring. Exposed crossing ends project around the outline. The two ruled directions are mirrored on the upright axis.",
  construction: {
    en: "Rule three beams in each of two crossing directions. Shorten the two beams beside the open lower eye and leave the projecting ends outside the other three eyes. Strike the ring around the lattice.",
    ja: "交わる二方向に三本ずつ梁を引きます。下の開いた目に沿う二本を短くし、残る三つの目の外に梁の端を突き出します。その周りに輪を打ちます。",
  },
  build: maruNiKumiawaseIgetaBuild,
});
