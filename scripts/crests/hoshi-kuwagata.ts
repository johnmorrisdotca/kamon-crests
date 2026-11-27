import { SHINSEN_MONCHO } from "./books.ts";
import { hoshiMitsuKuwagataBuild } from "./drawn/hoshi-kuwagata.ts";
import { defineCrest } from "./util.ts";

export const hosowaNiHoshitsukiMitsuKuwagata = defineCrest({
  id: "hosowa-ni-hoshitsuki-mitsu-kuwagata",
  name: { en: "Three starred helmet horns in a thin ring", ja: "細輪に星付き三つ鍬形" },
  reading: "ほそわにほしつきみつくわがた",
  romaji: "hosowa ni hoshitsuki mitsu kuwagata",
  frame: "ring-thin",
  motifs: [{ motif: "helmet-horn", count: 3, arrangement: "radial" }, { motif: "star", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["細ワニほし付三ッくわがた"],
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, third row, first column from the right: 細ワニほし付三ッくわがた", ja: "右頁、三段目、右から一列目「細ワニほし付三ッくわがた」" }, read: "2026-11-27", measured: true },
  measured: "Each broad horn has a rounded outer panel and a small circular star at its inward end. Three pointed pairs of tips meet around a triangular opening. The comparison used the same printed ほし in frame 10 to confirm the qualifier.",
  construction: {
    en: "Strike the arcs of the broad horn and its rounded panel. Leave a narrow white clearance around the panel and its round star. Turn the horn twice by a third of a turn so its points meet the other horns. Add the thin enclosing ring.",
    ja: "幅の広い鍬形と内側の丸い形を弧で引きます。内側の形と丸い星の周りに細い白筋を残します。鍬形を三分の一回転ずつ二度回し、となりの先を合わせます。外側に細輪を打ちます。",
  },
  build: hoshiMitsuKuwagataBuild,
});
