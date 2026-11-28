import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kuyo-hosokawa.ts";
import { defineCrest } from "./util.ts";

export const hosokawaKuyo = defineCrest({
  id: "hosokawa-kuyo",
  name: { en: "Hosokawa nine luminaries", ja: "細川九曜" },
  reading: "ほそかわくよう",
  romaji: "hosokawa kuyō",
  frame: "none",
  motifs: [{ motif: "star", count: 9, arrangement: "ring" }],
  families: [],
  aliases: ["細川九よう"],
  construction: {
    en: "A large disc on the middle and eight smaller ones on a circle round it at eighths of a turn from the top, the eight standing clear of the middle disc and of each other. The middle disc's radius is 0.43 of the layout radius, each small disc's 0.21 and their centres 0.79 out, so the small discs' outer edges stand on the outer circle.",
    ja: "中心に大きな円を一つ置き、そのまわりの円周の上に、真上から八分の一回転ずつ、小さな円を八つ置きます。八つの円は中心の円からも、となり同士からも離れます。中心の円の半径は外円の半径の0.43、小さな円は0.21、その中心は中心から0.79のところにあり、小さな円の外側が外円に届きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "right page, third row, third column counted from the right: 細川九よう (a large disc with eight small ones round it; measured, and drawn with compass and ruler)", ja: "右頁、三段目、右から三列目「細川九よう」（大きな円と、そのまわりの小さな八つの円。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the middle disc is about 120 pixels across and the eight small ones about 58 across (read to the middle of the printed line), their centres 110 from the middle (the eight measure 105 to 114), so the figure is about 278 across. Each is drawn as one outline, read as a solid disc. The printed small discs are hand-set a few pixels off their eighths and a few off their size, and the drawing makes them even.",
  build: drawn.hosokawaKuyoBuild,
});
