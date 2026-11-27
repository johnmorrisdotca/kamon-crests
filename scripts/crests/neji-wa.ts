import { C0, Path, R, circle, polar } from "../construct/geo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const nejiWa = defineCrest({
  id: "neji-wa",
  name: { en: "Twisted ring", ja: "捻じ輪" },
  reading: "ねじわ",
  romaji: "neji wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ねぢ輪", "ねじ輪"],
  source: cell(15, "left page, row 4, second column from the right: ねぢ輪", "左頁、四段目、右から二列目「ねぢ輪」"),
  measured: "Sixteen slanted divisions appear on each side of a narrow concentric strip. The rounded ridges make the outside and inside edges scalloped, with the opening about two thirds of the diameter.",
  construction: {
    en: "Strike the narrow central strip. Set sixteen slanted, rounded folds on each side, with white breaks between the folds. The outer caps face out and the inner caps face the opening.",
    ja: "中央に細い輪を打ち、その両側に丸みを帯びた斜めのひだを十六ずつ配します。各ひだの間を細く白く残し、外のひだは外へ、内のひだは開口へ向けます。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.fill("plain-ring", circle(C0, 79.9).join(circle(C0, 76.6)), "evenodd");
    const outerFoot = 81.2;
    const innerFoot = 75.3;
    for (let angle = 12; angle < 372; angle += 22.5) {
      const a = angle + 0.9;
      const b = angle + 21.6;
      const outer = new Path()
        .M(polar(outerFoot, a + 2))
        .L(polar(93.2, a - 4))
        .A(31, 0, 1, polar(93.2, b - 4))
        .L(polar(outerFoot, b + 2))
        .A(outerFoot, 0, 0, polar(outerFoot, a + 2))
        .Z();
      const inner = new Path()
        .M(polar(innerFoot, a + 2))
        .A(innerFoot, 0, 1, polar(innerFoot, b + 2))
        .L(polar(66, b - 4))
        .A(27, 0, 1, polar(66, a - 4))
        .Z();
      c.group(() => {
        c.fill("plain-ring", outer);
        c.fill("plain-ring", inner);
      });
    }
  },
});
