import { SHINSEN_MONCHO } from "./books.ts";
import { kasaneIgetaBuild, mitsuIgetaBuild, itowaMitsuwariIgetaBuild } from "./drawn/igeta-arrangements.ts";
import { defineCrest } from "./util.ts";
import { RING_GAP } from "../construct/builder.ts";

const READ = "2026-11-27";

export const kasaneIgeta = defineCrest({
  id: "kasane-igeta",
  name: { en: "Overlapping well frames", ja: "重ね井桁" },
  reading: "かさねいげた",
  romaji: "kasane igeta",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["重ねいげた"],
  construction: {
    en: "Two corner-up well frames overlap along one upright axis. Open three small lozenges along the centre. Rule two larger notched openings above and below.",
    ja: "隅を立てた井桁を縦の軸にそろえて二つ重ねます。中央には小さな菱を横に三つ抜き、上下には角を欠いた大きな空きを残します。",
  },
  measured: "The two well frames reuse the four ruled rails of the ordinary well, shifted equally about the centre. The book's width is about 1.1 times its height and its ruled slopes rise by about 7 for every 10 across. The two large openings in the print are notched. The three holes across the middle have half-widths of about 6 at the centre and 15 at the sides, with the side pair about 57 units from the centre.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, first row, fourth column from the right: 重ねいげた", ja: "右頁、一段目、右から四列目「重ねいげた」" }, read: READ, measured: true },
  build: kasaneIgetaBuild,
});

export const mitsuIgeta = defineCrest({
  id: "mitsu-igeta",
  name: { en: "Three well frames", ja: "三つ井桁" },
  reading: "みついげた",
  romaji: "mitsu igeta",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッいげた"],
  construction: {
    en: "Three open well frames share the corner of an isometric figure. Their straight rails overlap in three planes, with short ends extending past the crossings.",
    ja: "三つの開いた井桁で等角図の一つの角を分け合います。三つの面で材が交わり、その外に短い端が出ます。",
  },
  measured: "The ruled rails in the book follow the two slopes and the upright. The beams are about 10 units thick on the working layout, and narrow gaps distinguish their crossing edges. The front corner and opening in the top face are kept, and the protruding ends are set at equal distances on their respective planes.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, second row, fourth column from the right: 三ッいげた", ja: "右頁、二段目、右から四列目「三ッいげた」" }, read: READ, measured: true },
  build: mitsuIgetaBuild,
});

export const itowaNiMitsuwariIgeta = defineCrest({
  id: "itowa-ni-mitsuwari-igeta",
  name: { en: "Three-part well frame in a thread ring", ja: "糸輪に三つ割り井桁" },
  reading: "いとわにみつわりいげた",
  romaji: "itowa ni mitsuwari igeta",
  frame: "ring-thread",
  motifs: [{ motif: "well-frame", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワニ三ッ割いげた"],
  construction: {
    en: "Three broad stepped figures share a small hexagonal opening. Their matching edges interlock around the opening and a shallow angled seam separates each rounded edge at the thread ring.",
    ja: "段になった三つの形で小さな六角形の空きを囲みます。内側の辺はかみ合い、それぞれの外側は糸輪の近くまで広げ、浅い角形の白筋で分けます。",
  },
  measured: "Three stepped seams divide the circular field on equal axes. A second angle reaches from each circular edge to about 0.64 of its radius on the same axis. The thin outer lines and central proportions are read from the printed cell. The small hexagon is centred and fills the inner ends of the seams.",
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "right page, third row, fourth column from the right: 糸ワニ三ッ割いげた", ja: "右頁、三段目、右から四列目「糸ワニ三ッ割いげた」" }, read: READ, measured: true },
  build(c) {
    itowaMitsuwariIgetaBuild(c, c.ring("ring-thread") - RING_GAP);
  },
});
