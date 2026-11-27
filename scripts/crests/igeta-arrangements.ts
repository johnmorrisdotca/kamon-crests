import { RING_GAP } from "../construct/builder.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { itowaMitsuwariIgetaBuild } from "./drawn/igeta-arrangements.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

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
