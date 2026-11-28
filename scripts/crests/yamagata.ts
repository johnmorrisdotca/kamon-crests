import { SHINSEN_MONCHO } from "./books.ts";
import { yamagataBuild } from "./drawn/yamagata.ts";
import { defineCrest } from "./util.ts";

export const yamagata = defineCrest({
  id: "yamagata",
  name: { en: "Mountain form", ja: "山形" },
  reading: "やまがた",
  romaji: "yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["山かた"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "left page, row 1, second column from the right: 山かた (measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から二列目「山かた」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "One band bends at a peak and ends on a level foot on each side. In the printed cell the outer feet are about 326 pixels apart and the peak stands about 196 above them. The inner feet are about 196 apart and the inner peak about 116 above them, so the legs run parallel at about 50 degrees. The drawing makes the two sides equal, with one slope of 6 to 5.",
  construction: {
    en: "Rule two sloping lines that meet at the peak and mirror them. Rule a level line under both feet, and a second pair of sloping lines inside the first, so that the band between the lines has legs of one width and each foot ends on the level line.",
    ja: "頂で合う斜めの線を二本引き、左右対称にします。足もとに水平な線を一本引き、内側にも斜めの線を二本引きます。脚の幅がそろった帯の両端を、水平な線で切ります。",
  },
  build: yamagataBuild,
});
